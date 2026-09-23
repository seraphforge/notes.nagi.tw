import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import config from '../astro.config.mjs';

const basePath = `${config.base.replace(/\/$/, '')}/`;
const baseUrl = (process.env.NAGI_TEST_URL ?? `http://127.0.0.1:4321${basePath}`).replace(/\/$/, '');
const chromeCandidates = process.platform === 'win32'
  ? [
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    ]
  : ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'];
const chrome = chromeCandidates.find(existsSync);
if (!chrome) throw new Error('Chromium browser not found for runtime language validation');

const profile = mkdtempSync(join(tmpdir(), 'nagi-language-runtime-'));
const processHandle = spawn(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--disable-extensions',
  '--no-first-run',
  '--remote-debugging-port=0',
  `--user-data-dir=${profile}`,
  `${baseUrl}/`,
], { stdio: 'ignore' });

const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
let socket;

try {
  const portFile = join(profile, 'DevToolsActivePort');
  for (let attempt = 0; attempt < 100 && !existsSync(portFile); attempt++) await delay(50);
  if (!existsSync(portFile)) throw new Error('Chromium DevTools endpoint did not start');
  const [port] = readFileSync(portFile, 'utf8').split(/\r?\n/);
  let targets = [];
  for (let attempt = 0; attempt < 100 && targets.length === 0; attempt++) {
    try {
      targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((response) => response.json());
    } catch {}
    if (!targets.length) await delay(50);
  }
  const target = targets.find((item) => item.type === 'page');
  if (!target) throw new Error('Chromium page target not found');

  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  let messageId = 0;
  const pending = new Map();
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
  });
  socket.addEventListener('close', () => {
    for (const { reject } of pending.values()) reject(new Error('Chromium DevTools connection closed'));
    pending.clear();
  });
  const command = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++messageId;
    const timeout = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`Chromium command timed out: ${method}`));
    }, 5000);
    pending.set(id, {
      resolve: (value) => { clearTimeout(timeout); resolve(value); },
      reject: (error) => { clearTimeout(timeout); reject(error); },
    });
    socket.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async (expression) => {
    const result = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  await command('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  const waitForPage = async (pathname) => {
    for (let attempt = 0; attempt < 100; attempt++) {
      const ready = await evaluate(`location.pathname === ${JSON.stringify(`${new URL(baseUrl).pathname.replace(/\/$/, '')}${pathname}`)} && document.readyState === 'complete'`);
      if (ready) return;
      await delay(50);
    }
    throw new Error(`Timed out waiting for ${pathname}`);
  };
  const navigate = async (pathname) => {
    await command('Page.navigate', { url: `${baseUrl}${pathname}` });
    await waitForPage(pathname);
  };
  const switchLanguage = async (language) => {
    await evaluate(`document.querySelector('[data-language-select="${language}"]').click()`);
    await delay(80);
  };
  const groupState = (key) => evaluate(`(() => {
    const group = document.querySelector('[data-group-key="${key}"]');
    if (!group) return null;
    const visible = [...group.querySelectorAll('[data-language-variant]')]
      .filter((variant) => getComputedStyle(variant).display !== 'none');
    return {
      requested: document.documentElement.dataset.articleLanguage,
      stored: localStorage.getItem('nagi-article-language'),
      actual: group.dataset.actualLanguage,
      fallback: group.hasAttribute('data-language-fallback'),
      fallbackPrefix: getComputedStyle(group.querySelector('[data-actual-language]'), '::before').content,
      actualLabel: visible[0]?.querySelector('[data-actual-language]')?.textContent.trim(),
      visibleLanguages: visible.map((variant) => variant.dataset.languageVariant),
      visibleTitles: visible.map((variant) => variant.querySelector('h2, h3, a')?.textContent.trim()),
    };
  })()`);
  const expect = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const expectSingleLanguage = (state, requested, actual, fallback) => {
    expect(state, `missing test group for ${requested}`);
    expect(state.requested === requested, `requested state did not become ${requested}`);
    expect(state.stored === requested, `stored state did not become ${requested}`);
    expect(state.actual === actual, `expected actual ${actual}, received ${state.actual}`);
    expect(state.fallback === fallback, `fallback state for ${requested} was ${state.fallback}`);
    if (fallback) {
      expect(state.fallbackPrefix.includes('Fallback ·'), `fallback label is not visibly announced for ${requested}`);
      expect(state.actualLabel === '中文', `fallback label did not identify 中文 for ${requested}`);
    }
    expect(state.visibleLanguages.length === 1, `${requested} rendered ${state.visibleLanguages.length} editions: ${state.visibleLanguages.join(', ')}`);
    expect(state.visibleLanguages[0] === actual, `${requested} visibly rendered ${state.visibleLanguages[0]} instead of ${actual}`);
  };
  const expectTypography = async (selector, expected, role) => {
    const styles = await evaluate(`[...document.querySelectorAll(${JSON.stringify(selector)})].map((element) => {
      const style = getComputedStyle(element);
      return [style.fontSize, style.lineHeight, style.fontWeight, style.letterSpacing].join('|');
    })`);
    const unique = [...new Set(styles)];
    expect(unique.length === 1, `${role} has inconsistent computed typography: ${unique.join(', ')}`);
    expect(unique[0] === expected, `${role} typography is ${unique[0]}, expected ${expected}`);
  };

  await waitForPage('/');
  expect(await evaluate(`document.querySelector('h1')?.textContent`) === 'Nagi Notes', 'Notes homepage identity missing');
  expect(await evaluate(`document.querySelectorAll('.latest-notes [data-language-group]').length`) === 3, 'Notes homepage must show three recent groups');
  await expectTypography('.latest-notes .article-row h2', '43.2px|50.112px|500|-0.864px', 'Latest Notes titles');
  await switchLanguage('en');
  expectSingleLanguage(await groupState('frc-engineering-team'), 'en', 'zh', true);
  await navigate('/articles/');
  const transitions = [];
  for (const language of ['zh', 'en', 'ja', 'zh']) {
    await switchLanguage(language);
    const state = await groupState('nurse-made-me-rethink-medical-cybersecurity');
    expectSingleLanguage(state, language, language, false);
    transitions.push(`${language}:${state.visibleTitles[0]}`);
  }

  for (const [category, count] of [['life', 9], ['security', 3], ['projects', 0], ['research', 0], ['all', 12]]) {
    await evaluate(`document.querySelector('[data-category-filter="${category}"]').click()`);
    const visible = await evaluate(`[...document.querySelectorAll('[data-article-group]')].filter((group) => !group.hidden).map((group) => group.dataset.category)`);
    expect(visible.length === count, `${category}: expected ${count} groups, found ${visible.length}`);
    expect(category === 'all' || visible.every((value) => value === category), `${category}: wrong category visible`);
    expect(await evaluate(`document.querySelector('#empty').hidden`) === (count > 0), `${category}: incorrect empty state`);
  }
  await command('Page.navigate', { url: `${baseUrl}/articles/?category=security` });
  await waitForPage('/articles/');
  expect(await evaluate(`document.querySelector('[data-category-filter=security]').getAttribute('aria-pressed')`) === 'true', 'category deep link was not selected');
  await navigate('/articles/');

  await switchLanguage('en');
  const fallbackState = await groupState('frc-engineering-team');
  expectSingleLanguage(fallbackState, 'en', 'zh', true);

  await navigate('/articles/');
  expectSingleLanguage(await groupState('nurse-made-me-rethink-medical-cybersecurity'), 'en', 'en', false);
  await expectTypography('.article-row h2', '43.2px|50.112px|500|-0.864px', 'Articles listing titles');
  expect(await evaluate(`document.querySelector('input[type="search"]') === null`), 'Articles must not show a search input');
  expect(await evaluate(`document.querySelector('[data-category-filter="all"]').getAttribute('aria-pressed')`) === 'true', 'ALL must be the default category');
  await evaluate(`document.querySelector('[data-category-filter="security"]').click()`);
  await switchLanguage('ja');
  expect(await evaluate(`[...document.querySelectorAll('[data-article-group]')].filter((group) => !group.hidden).every((group) => group.dataset.category === 'security')`), 'Language switching lost the category selection');
  expect(await evaluate(`document.querySelector('[data-category-filter="security"]').getAttribute('aria-pressed')`) === 'true', 'Language switching lost the active category');
  await switchLanguage('en');
  await navigate('/topics/medical-cybersecurity/');
  expectSingleLanguage(await groupState('nurse-made-me-rethink-medical-cybersecurity'), 'en', 'en', false);
  await navigate('/archive/');
  expectSingleLanguage(await groupState('nurse-made-me-rethink-medical-cybersecurity'), 'en', 'en', false);

  await navigate('/articles/frc-engineering-team/');
  expect(await evaluate(`localStorage.getItem('nagi-article-language')`) === 'en', 'fallback article route overwrote the English preference');
  expect(await evaluate(`document.querySelector('[data-language-select="zh"]').getAttribute('aria-pressed')`) === 'true', 'article route must select its actual language');
  expect(await evaluate(`document.documentElement.hasAttribute('data-language-fallback')`) === false, 'direct article route should not expose fallback state');
  expect(await evaluate(`document.querySelector('.article .eyebrow [data-actual-language]')?.textContent.trim()`) === '中文', 'fallback article route did not identify the Chinese edition');

  await switchLanguage('zh');
  await navigate('/articles/nurse-made-me-rethink-medical-cybersecurity/');
  await switchLanguage('ja');
  await waitForPage('/articles/nurse-made-me-rethink-medical-cybersecurity/ja/');
  expect(await evaluate(`localStorage.getItem('nagi-article-language')`) === 'ja', 'article route did not persist Japanese preference');

  await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await navigate('/');
  expect(await evaluate(`document.querySelector('h1')?.textContent`) === 'Nagi Notes', 'Mobile Notes identity missing');
  expect(await evaluate(`document.documentElement.scrollWidth <= innerWidth`), 'Mobile Notes homepage overflows');
  expect(await evaluate(`document.querySelectorAll('.notes-topics nav a').length`) === 4, 'Mobile Notes categories missing');
  await navigate('/articles/');
  for (const width of [390, 320]) {
    await command('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile: true });
    expect(await evaluate(`document.documentElement.scrollWidth <= innerWidth`), 'Mobile Articles page overflows');
    expect(await evaluate(`document.querySelectorAll('[data-category-filter]').length`) === 5, 'Mobile article categories missing');
    await evaluate(`document.querySelector('[data-category-filter="life"]').click()`);
    expect(await evaluate(`document.querySelectorAll('[data-article-group]:not([hidden])').length`) === 9, 'Mobile category filtering failed');
    expect(await evaluate(`(() => { const style = getComputedStyle(document.querySelector('[data-category-filter="life"]')); return style.borderBottomWidth === '1px' && style.borderBottomColor !== 'rgba(0, 0, 0, 0)' && style.borderRadius === '0px'; })()`), 'Active category must have a thin underline without rounded corners');
  }
  console.log('Articles category navigation, language persistence, and mobile wrapping: PASS');
  console.log(`Runtime language transitions: ${transitions.join(' -> ')}`);
  console.log('Desktop and mobile Notes homepage: PASS');
  console.log('Runtime fallback, navigation persistence, indexes, topic, archive, and article routing: PASS');
  await navigate('/');
  await waitForPage('/');
  await switchLanguage('zh');
  await navigate('/articles/2026-security-conference/en/');
  expect(await evaluate(`document.documentElement.dataset.currentArticleLanguage`) === 'en', 'Direct English URL must not be overridden by stored Chinese preference');
  const groups = JSON.parse(readFileSync(new URL('../dist/search-index.json', import.meta.url), 'utf8'));
  let switches = 0;
  for (const group of groups) {
    for (const variant of Object.values(group.variants)) {
      for (const requested of ['zh', 'en', 'ja']) {
        const route = variant.url.slice(basePath.length - 1);
        await navigate(route);
        await switchLanguage(requested);
        const target = group.variants[requested] ?? variant;
        await waitForPage(target.url.slice(basePath.length - 1));
        expect(await evaluate(`document.documentElement.dataset.currentArticleLanguage`) === target.language, `Wrong edition for ${group.key}: ${requested}`);
        switches++;
      }
    }
  }
  for (const path of ['/about/', '/experience/', '/topics/']) {
    await navigate(path);
    expect(await evaluate(`[...document.querySelectorAll('[data-language-select]')].every(button => button.disabled)`) === true, `${path}: untranslated page has active language controls`);
  }
  console.log(`Browser article language switches and fallbacks: ${switches} PASS`);
  await command('Page.addScriptToEvaluateOnNewDocument', { source: `Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } });` });
  await navigate('/articles/2026-security-conference/');
  await switchLanguage('ja');
  await waitForPage('/articles/2026-security-conference/ja/');
  console.log('Direct language URLs and switching with blocked storage: PASS');
} finally {
  socket?.close();
  processHandle.kill();
  await Promise.race([
    new Promise((resolve) => processHandle.once('exit', resolve)),
    delay(2000),
  ]);
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
  } catch {
    // Chromium may release a profile lock slightly after the process exits.
  }
}
