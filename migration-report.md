# Migration Report

## Summary

- Migrated articles: 31 files representing 13 independent article topics
- Chinese articles: 13
- English articles: 7
- Japanese articles: 11
- Migrated images: 3 files representing 2 unique image payloads
- Source policy: prefer `source/_posts`; use `backup_posts` only when no current version exists; retain translations from `private-archive`
- Article body policy: body text was copied without rewriting, summarizing, translating, or stylistic editing

## Categories

Counts below are migrated files; the topic count is shown in parentheses.

- `research`: 9 files (3 topics)
- `projects`: 1 file (1 topic)
- `engineering`: 1 file (1 topic)
- `security`: 6 files (2 topics)
- `ctf`: 3 files (1 topic)
- `personal`: 11 files (5 topics)

Classification follows the article's main purpose rather than keyword matching. The FRC record is under `engineering`, the recent-projects update is under `projects`, and the control-team journey remains under `personal`. The InfoSec student/industry gap, medical-engineering reflection, and student-community article are observations and exploration, so they are under `research`.

## Article Mapping

| Original Path | New Path |
|---|---|
| `source/_posts/2026-security-conference.md` | `articles/security/2026-security-conference.md` |
| `source/_posts/2026-security-conference.en.md` | `articles/security/2026-security-conference.en.md` |
| `private-archive/languages/ja/posts/2026-security-conference.ja.md` | `articles/security/2026-security-conference.ja.md` |
| `source/_posts/ctf-meets-malware-analysis-windows.md` | `articles/ctf/ctf-meets-malware-analysis-windows.md` |
| `source/_posts/ctf-meets-malware-analysis-windows.en.md` | `articles/ctf/ctf-meets-malware-analysis-windows.en.md` |
| `private-archive/languages/ja/posts/ctf-meets-malware-analysis-windows.ja.md` | `articles/ctf/ctf-meets-malware-analysis-windows.ja.md` |
| `source/_posts/retail-work-sme-security-culture.md` | `articles/security/retail-work-sme-security-culture.md` |
| `source/_posts/retail-work-sme-security-culture.en.md` | `articles/security/retail-work-sme-security-culture.en.md` |
| `private-archive/languages/ja/posts/retail-work-sme-security-culture.ja.md` | `articles/security/retail-work-sme-security-culture.ja.md` |
| `source/_posts/infosec-taiwan-2026-student-industry-gap.md` | `articles/research/infosec-taiwan-2026-student-industry-gap.md` |
| `source/_posts/infosec-taiwan-2026-student-industry-gap.en.md` | `articles/research/infosec-taiwan-2026-student-industry-gap.en.md` |
| `private-archive/languages/ja/posts/infosec-taiwan-2026-student-industry-gap.ja.md` | `articles/research/infosec-taiwan-2026-student-industry-gap.ja.md` |
| `source/_posts/護理師讓我重新思考醫療資安.md` | `articles/research/nurse-made-me-rethink-medical-cybersecurity.md` |
| `source/_posts/護理師讓我重新思考醫療資安.en.md` | `articles/research/nurse-made-me-rethink-medical-cybersecurity.en.md` |
| `private-archive/languages/ja/posts/護理師讓我重新思考醫療資安.ja.md` | `articles/research/nurse-made-me-rethink-medical-cybersecurity.ja.md` |
| `private-archive/articles/taiwan-security-students/taiwan-student-cybersecurity-growing-apart.md` | `articles/research/taiwan-student-cybersecurity-growing-apart.md` |
| `private-archive/articles/taiwan-security-students/taiwan-student-cybersecurity-growing-apart.en.md` | `articles/research/taiwan-student-cybersecurity-growing-apart.en.md` |
| `private-archive/articles/taiwan-security-students/taiwan-student-cybersecurity-growing-apart.ja.md` | `articles/research/taiwan-student-cybersecurity-growing-apart.ja.md` |
| `source/_posts/frc-engineering-team.md` | `articles/engineering/frc-engineering-team.md` |
| `source/_posts/from-nihscsed-to-control-team.md` | `articles/personal/from-nihscsed-to-control-team.md` |
| `source/_posts/from-nihscsed-to-control-team.en.md` | `articles/personal/from-nihscsed-to-control-team.en.md` |
| `private-archive/languages/ja/posts/from-nihscsed-to-control-team.ja.md` | `articles/personal/from-nihscsed-to-control-team.ja.md` |
| `source/_posts/recent-projects-and-life-update.md` | `articles/projects/recent-projects-and-life-update.md` |
| `backup_posts/Not Everyone Has to Walk the Same Road.md` | `articles/personal/not-everyone-has-to-walk-the-same-road.md` |
| `private-archive/languages/ja/posts/Not Everyone Has to Walk the Same Road.ja.md` | `articles/personal/not-everyone-has-to-walk-the-same-road.ja.md` |
| `backup_posts/prologue-the-people-i-met-along-the-way.md` | `articles/personal/prologue-the-people-i-met-along-the-way.md` |
| `private-archive/languages/ja/posts/prologue-the-people-i-met-along-the-way.ja.md` | `articles/personal/prologue-the-people-i-met-along-the-way.ja.md` |
| `backup_posts/Ten years from now, please don't forget who you are now.md` | `articles/personal/ten-years-from-now-dont-forget-who-you-are-now.md` |
| `private-archive/languages/ja/posts/Ten years from now, please don't forget who you are now.ja.md` | `articles/personal/ten-years-from-now-dont-forget-who-you-are-now.ja.md` |
| `backup_posts/我再也不相信-Codex-但我還是會繼續用它.md` | `articles/personal/why-i-still-use-codex.md` |
| `private-archive/languages/ja/posts/我再也不相信-Codex-但我還是會繼續用它.ja.md` | `articles/personal/why-i-still-use-codex.ja.md` |

## Historical Versions

The following source files were classified as historical versions and were not migrated. They remain untouched.

| Historical Path | Selected Current Path |
|---|---|
| `backup_posts/2026-security-conference.md` | `source/_posts/2026-security-conference.md` |
| `backup_posts/from-nihscsed-to-control-team.md` | `source/_posts/from-nihscsed-to-control-team.md` |
| `backup_posts/護理師讓我重新思考醫療資安.md` | `source/_posts/護理師讓我重新思考醫療資安.md` |
| `backup_posts/taiwan-student-cybersecurity-growing-apart.md` | `private-archive/articles/taiwan-security-students/taiwan-student-cybersecurity-growing-apart.md` |

Translations were not treated as duplicate articles.

## Metadata Changes

- Removed `canonical_url` from 26 migrated files because it pointed to the retiring `seraphforge.github.io` site.
- Removed Hexo-specific `permalink` from the same 26 files.
- Original route values are recorded exactly below. They also remain available in the untouched source files.

| Original Path | Removed `permalink` | Removed `canonical_url` |
|---|---|---|
| `source/_posts/2026-security-conference.md` | `zh/2026/05/09/2026-security-conference/` | `https://seraphforge.github.io/zh/2026/05/09/2026-security-conference/` |
| `source/_posts/2026-security-conference.en.md` | `2026/05/09/2026-security-conference/` | `https://seraphforge.github.io/2026/05/09/2026-security-conference/` |
| `private-archive/languages/ja/posts/2026-security-conference.ja.md` | `ja/2026/05/09/2026-security-conference/` | `https://seraphforge.github.io/ja/2026/05/09/2026-security-conference/` |
| `source/_posts/ctf-meets-malware-analysis-windows.md` | `zh/2026/07/08/ctf-meets-malware-analysis-windows/` | `https://seraphforge.github.io/zh/2026/07/08/ctf-meets-malware-analysis-windows/` |
| `source/_posts/ctf-meets-malware-analysis-windows.en.md` | `2026/07/08/ctf-meets-malware-analysis-windows/` | `https://seraphforge.github.io/2026/07/08/ctf-meets-malware-analysis-windows/` |
| `private-archive/languages/ja/posts/ctf-meets-malware-analysis-windows.ja.md` | `ja/2026/07/08/ctf-meets-malware-analysis-windows/` | `https://seraphforge.github.io/ja/2026/07/08/ctf-meets-malware-analysis-windows/` |
| `source/_posts/retail-work-sme-security-culture.md` | `zh/2026/07/18/retail-work-sme-security-culture/` | `https://seraphforge.github.io/zh/2026/07/18/retail-work-sme-security-culture/` |
| `source/_posts/retail-work-sme-security-culture.en.md` | `2026/07/18/retail-work-sme-security-culture/` | `https://seraphforge.github.io/2026/07/18/retail-work-sme-security-culture/` |
| `private-archive/languages/ja/posts/retail-work-sme-security-culture.ja.md` | `ja/2026/07/18/retail-work-sme-security-culture/` | `https://seraphforge.github.io/ja/2026/07/18/retail-work-sme-security-culture/` |
| `source/_posts/infosec-taiwan-2026-student-industry-gap.md` | `zh/2026/07/07/infosec-taiwan-2026-student-industry-gap/` | `https://seraphforge.github.io/zh/2026/07/07/infosec-taiwan-2026-student-industry-gap/` |
| `source/_posts/infosec-taiwan-2026-student-industry-gap.en.md` | `2026/07/07/infosec-taiwan-2026-student-industry-gap/` | `https://seraphforge.github.io/2026/07/07/infosec-taiwan-2026-student-industry-gap/` |
| `private-archive/languages/ja/posts/infosec-taiwan-2026-student-industry-gap.ja.md` | `ja/2026/07/07/infosec-taiwan-2026-student-industry-gap/` | `https://seraphforge.github.io/ja/2026/07/07/infosec-taiwan-2026-student-industry-gap/` |
| `source/_posts/護理師讓我重新思考醫療資安.md` | `zh/2026/06/23/nurse-made-me-rethink-medical-cybersecurity/` | `https://seraphforge.github.io/zh/2026/06/23/nurse-made-me-rethink-medical-cybersecurity/` |
| `source/_posts/護理師讓我重新思考醫療資安.en.md` | `2026/06/23/nurse-made-me-rethink-medical-cybersecurity/` | `https://seraphforge.github.io/2026/06/23/nurse-made-me-rethink-medical-cybersecurity/` |
| `private-archive/languages/ja/posts/護理師讓我重新思考醫療資安.ja.md` | `ja/2026/06/23/nurse-made-me-rethink-medical-cybersecurity/` | `https://seraphforge.github.io/ja/2026/06/23/nurse-made-me-rethink-medical-cybersecurity/` |
| `private-archive/articles/taiwan-security-students/taiwan-student-cybersecurity-growing-apart.md` | `zh/2026/06/23/taiwan-student-cybersecurity-growing-apart/` | `https://seraphforge.github.io/zh/2026/06/23/taiwan-student-cybersecurity-growing-apart/` |
| `private-archive/articles/taiwan-security-students/taiwan-student-cybersecurity-growing-apart.en.md` | `2026/06/23/taiwan-student-cybersecurity-growing-apart/` | `https://seraphforge.github.io/2026/06/23/taiwan-student-cybersecurity-growing-apart/` |
| `private-archive/articles/taiwan-security-students/taiwan-student-cybersecurity-growing-apart.ja.md` | `ja/2026/06/23/taiwan-student-cybersecurity-growing-apart/` | `https://seraphforge.github.io/ja/2026/06/23/taiwan-student-cybersecurity-growing-apart/` |
| `source/_posts/from-nihscsed-to-control-team.md` | `zh/2026/05/16/from-nihscsed-to-control-team/` | `https://seraphforge.github.io/zh/2026/05/16/from-nihscsed-to-control-team/` |
| `source/_posts/from-nihscsed-to-control-team.en.md` | `2026/05/16/from-nihscsed-to-control-team/` | `https://seraphforge.github.io/2026/05/16/from-nihscsed-to-control-team/` |
| `private-archive/languages/ja/posts/from-nihscsed-to-control-team.ja.md` | `ja/2026/05/16/from-nihscsed-to-control-team/` | `https://seraphforge.github.io/ja/2026/05/16/from-nihscsed-to-control-team/` |
| `source/_posts/recent-projects-and-life-update.md` | `zh/2026/09/04/recent-projects-and-life-update/` | `https://seraphforge.github.io/zh/2026/09/04/recent-projects-and-life-update/` |
| `private-archive/languages/ja/posts/Not Everyone Has to Walk the Same Road.ja.md` | `ja/2026/04/18/not-everyone-has-to-walk-the-same-road/` | `https://seraphforge.github.io/ja/2026/04/18/not-everyone-has-to-walk-the-same-road/` |
| `private-archive/languages/ja/posts/prologue-the-people-i-met-along-the-way.ja.md` | `ja/2026/06/23/prologue-the-people-i-met-along-the-way/` | `https://seraphforge.github.io/ja/2026/06/23/prologue-the-people-i-met-along-the-way/` |
| `private-archive/languages/ja/posts/Ten years from now, please don't forget who you are now.ja.md` | `ja/2026/06/23/ten-years-from-now-dont-forget-who-you-are-now/` | `https://seraphforge.github.io/ja/2026/06/23/ten-years-from-now-dont-forget-who-you-are-now/` |
| `private-archive/languages/ja/posts/我再也不相信-Codex-但我還是會繼續用它.ja.md` | `ja/2026/06/25/why-i-still-use-codex/` | `https://seraphforge.github.io/ja/2026/06/25/why-i-still-use-codex/` |

Local image metadata changes:

- `/images/cybersec-2026.jpg` → `/assets/images/cybersec-2026.jpg`
- `/images/seraph.png` → `/assets/images/seraph.png`
- `/images/casper.png` → `/assets/images/casper.png`
- Both `banner` and `cover` were changed wherever the original frontmatter contained them.

No `author` metadata was added. Existing `title`, `date`, `published`, `tags`, `categories`, and `description` fields were preserved.

## Image Recovery

- `cybersec-2026.jpg` copied from `source/images/cybersec-2026.jpg`.
- `seraph.png` copied from `source/images/seraph.png`.
- `casper.png` recovered from `backup_source/images/casper.png` because `source/images/casper.png` does not exist.
- `seraph.png` and `casper.png` have identical payloads but both filenames are retained for historical path compatibility.
- No unreferenced images were migrated.

## Unpublished Articles

The following source values were preserved exactly:

- `articles/personal/from-nihscsed-to-control-team.md`: `published: false`
- `articles/personal/from-nihscsed-to-control-team.en.md`: `published: false`
- `articles/personal/from-nihscsed-to-control-team.ja.md`: `published: false`

The Japanese translation was explicitly set to `published: false` during final human classification review so that all three language variants share the unpublished state. Its article body was not modified.

## Multilingual Articles

### Chinese, English, and Japanese

- `2026-security-conference`
- `ctf-meets-malware-analysis-windows`
- `retail-work-sme-security-culture`
- `infosec-taiwan-2026-student-industry-gap`
- `nurse-made-me-rethink-medical-cybersecurity`
- `taiwan-student-cybersecurity-growing-apart`
- `from-nihscsed-to-control-team`

### Chinese and Japanese

- `not-everyone-has-to-walk-the-same-road`
- `prologue-the-people-i-met-along-the-way`
- `ten-years-from-now-dont-forget-who-you-are-now`
- `why-i-still-use-codex`

### Chinese only

- `frc-engineering-team`
- `recent-projects-and-life-update`

## Needs Human Review

- Metadata review: four backup-only Chinese articles have less complete metadata than their Japanese translations. Their original metadata was preserved instead of synthesizing missing `site_lang`, `translation_key`, or `slug` fields.
- No filename collision was detected. Same-topic multilingual slug values are intentional translation relationships and must not be treated as duplicate content.
