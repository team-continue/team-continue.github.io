# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

This repository is **pre-implementation**: it contains only requirement/spec documents and no source code, build config, or content data yet. There is no `_config.yml`, `Gemfile`, `package.json`, `src/`, or `content/` directory. Before writing any code, check what (if anything) has been added since these docs were written — don't assume the structures below already exist.

## Spec documents — read order and relationship

Two specs describe **different, conflicting projects**. Determine which one the current task belongs to before touching anything:

1. **`SPEC.md`** — an earlier, minimal spec: a single-page Jekyll site (`index.md` + `_layouts/default.html` + `assets/css/style.scss` + `_config.yml`/`Gemfile`) with a light 90s-retro/GeoCities taste, no JavaScript, animations done purely in CSS `@keyframes` (with `prefers-reduced-motion` support).
2. **`01_site_structure_requirements.md`** + **`02_design_ui_implementation_requirements.md`** — a newer, much larger spec for a multi-page ロボコン (robotics competition) team site with routing, content collections, a hamburger + left drawer menu, client-side search, and GitHub Actions deploy. This pair supersedes the simple Jekyll concept in `SPEC.md` in scope and direction; `01_` defines site structure/content data, `02_` defines UI/design/implementation requirements. Read both together — `01_` §6.3 (project section ↔ blog category mapping) and `02_`'s drawer menu (§6) must stay in sync with `01_`'s nav tree (§2).

If asked to implement "the site," confirm with the user which spec is authoritative rather than guessing; do not silently merge them.

## Key structural rules from the robocon spec (01_/02_)

These are easy to get wrong because they cut across multiple files/pages:

- **Content collections**: `projects`, `projectSections`, `members`, `blog` — each frontmatter + Markdown body (except `members`, which is fields-only, no body). Filename must equal the `slug` frontmatter value exactly (e.g. `blog/core2026-report.md` → `slug: core2026-report`).
- **`others` project is not a content collection entry** — `/projects/others` is a hand-written fixed page, kept out of the `projects` collection so it isn't double-generated from both collection routing and a static page.
- **Draft exclusion is global**: `blog.draft: true` must be filtered out of every listing surface — blog index, home page's latest-posts, search results, project/section related-posts, member's authored posts, related articles, and prev/next navigation. When adding a new blog-listing surface, add the draft filter there too.
- **Project section ↔ blog category linkage**: a `projectSections` page's related posts are filtered by both `blog.project === project.slug` AND `blog.category` matching the section's mapped category (`mechanical`→メカ, `electrical`→回路・電装, `software`→ソフトウェア). The project *top* page instead just filters on `blog.project` (no category filter).
- **Member ↔ blog linkage** uses `member.slug === blog.authorSlug`, not the display name.
- **Header/nav constraint**: no horizontal global nav in the Header — navigation is hamburger → left-sliding drawer only. A local tab nav *within* a project's subpages (top/mechanical/electrical/software) is allowed and is a separate component from the drawer.
- **Base path awareness**: internal links/asset paths must work under either `/` (user/org site) or `/repo-name/` (project site) — don't hardcode absolute root paths if the chosen framework supports a configurable base path.
