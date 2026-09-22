# Nagi Notes Site Implementation Plan

**Goal:** Build a static, multilingual Astro reading site over the migrated Markdown collection.

**Architecture:** A typed Astro content collection normalizes legacy metadata without editing article bodies. Static pages share one published-content selector; only the article list search hydrates minimal client-side JavaScript.

**Tech Stack:** Astro, TypeScript, native CSS, Astro's native GFM-capable Markdown processor, Astro sitemap and RSS.

## Tasks

- [x] Define Astro project, content schema, normalized multilingual article model, and public filtering.
- [x] Build global editorial design system, semantic layouts, responsive navigation, and accessible focus behavior.
- [x] Build homepage, searchable article list, topic indexes, archive, article routes, translation navigation, and article typography.
- [x] Add SEO metadata, canonical URLs, sitemap, RSS, robots.txt, and static search index.
- [x] Install dependencies, type-check, build, inspect every generated route, and verify drafts and assets are absent/present as required.

## Constraints

- Do not edit article body text.
- Never generate production routes or indexes for `published: false` entries.
- Preserve multilingual variants as distinct routes in a shared translation group.
- Do not commit or push before review.
