# Notes taxonomy implementation plan

Goal: Use Life, Security, Projects, and Research as the only primary article categories; remove the requested article in all languages.

Architecture: Validate one category in frontmatter and use it consistently across translations and UI. Keep folder identities and existing article routes stable. Derive detailed topic indexes from tags, retaining compatibility for old topic routes. Keep Experience separate from articles.

Spec: User-approved mapping in this conversation, amended by removal request. Life: eight public groups plus the unpublished community/team article. Security: conference overview, malware analysis, and retail security. Projects/Research: currently empty.

Constraints: No body rewrites, shared asset removal, edits outside Notes, commits, pushes, deployment edits, or workspace relocation. Work directly on the existing dirty project to preserve its uncommitted Astro implementation.

- [x] Add regression checks for removal, category mapping/counts, multilingual grouping, unpublished routes, encoding, and local links. Run against current collection to demonstrate failure.
- [x] Delete only the three requested Markdown editions; change remaining frontmatter categories without changing body bytes. Retain useful secondary labels as tags. Clean obsolete current-inventory references in migration-report.md.
- [x] Add category helpers and schema validation; propagate category through article/group normalization, lists, archive, article header, search, RSS, and homepage. Keep topic compatibility separate.
- [x] Build detailed tag/topic indexes with multilingual aliases; retain all six existing topic routes. Add Articles category filters with empty states and URL selection.
- [x] Add Experience navigation and a chronological page using only publicly documented events, without inventing dates or results. Update About with the specified motto and personal focus.
- [x] Update existing validators for the new contract; run Astro check/build, build/UI/runtime validators, removal/link/encoding audit, and compare all surviving article body hashes to the pre-edit baseline. Review final Git status without staging or committing.

Verification: Astro check: 0 errors/warnings/hints. Production build: 83 pages, including 25 public article editions. Build, editorial UI, taxonomy/removal/link, and runtime language/filter validators pass. All 28 surviving article bodies match pre-edit SHA-256 hashes. In-app Browser was unavailable; automated Chromium runtime checks passed. No commits or deployment changes.
