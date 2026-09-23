import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import config from '../astro.config.mjs';
const dist = new URL('../dist/', import.meta.url);
const base = `${config.base.replace(/\/$/, '')}/`;
const groups = JSON.parse(readFileSync(new URL('search-index.json', dist), 'utf8'));
let transitions = 0;
let editions = 0;
function fileFor(url) {
  assert.ok(url.startsWith(base), `Outside base: ${url}`);
  const file = new URL(`${url.slice(base.length)}index.html`, dist);
  assert.ok(existsSync(file), `Missing language route: ${url}`);
  return file;
}
for (const group of groups) {
  for (const [current, variant] of Object.entries(group.variants)) {
    editions++;
    const html = readFileSync(fileFor(variant.url), 'utf8');
    const links = new Map([...html.matchAll(/<a\b[^>]*data-article-language-link="[^"<>]+"[^>]*>/g)].map(([tag]) => [tag.match(/data-article-language-link="([^"]+)"/)[1], tag.match(/href="([^"]+)"/)[1]]));
    assert.deepEqual([...links.keys()].sort(), [...group.languages].sort());
    for (const requested of ['zh', 'en', 'ja']) {
      const actual = group.variants[requested] ? requested : current;
      assert.equal(links.get(actual), group.variants[actual].url);
      fileFor(links.get(actual));
      transitions++;
    }
    assert.ok(html.includes(`data-current-article-language="${current}"`));
    assert.ok(html.includes(`rel="canonical" href="${new URL(variant.url, config.site)}"`));
  }
}
console.log(`Language URLs: PASS (${groups.length} articles, ${editions} editions, ${transitions} switch/fallback targets)`);
