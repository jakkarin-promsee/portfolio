# Portfolio website handoff

## Goal

This is Jakkarin Promsee's portfolio with GitHub-inspired profile and repository pages. Project explanations take the place of code browsing, commit history, and activity. Keep the profile Overview editorial; repository facts should be traceable to the cloned source and its Markdown metadata.

## Source and data hierarchy

1. `config/list.json` is the URL-only inventory with `complete`, `profile`, and `incomplete` arrays: 28 complete repositories, one GitHub profile, and eight incomplete repositories (including this portfolio site). Keep both complete and incomplete links so the list can be checked against the public GitHub profile. `config/list-detail.md` holds the original project descriptions, groups, and private priority tiers. **Never turn tiers into UI categories, labels, ranking, or ordering.**
2. `project/<repo-name>/` holds untouched local clones of the 28 complete repositories and `project/Jakkarin-Promsee/` holds the profile clone. They are reference inputs, not frontend code. Do not edit them as part of portfolio work.
3. `src/markdown-metadata/<repo-name>/` is the repository content source of truth for this site. The existing 28 folders contain `cover.md` (repository URL, GitHub description, topics), `README.md` (verbatim clone README), `short-description.md` (quick context), and `deep-description.md` (deeper context or clone pointer). Each folder also has `source.md` with the checked-out clone path, full Git commit, commit date, snapshot time, and README SHA-256. The profile clone currently has only `README.md` and `source.md` here; its site Overview is authored separately.
4. `src/data/` is the frontend-ready projection. `projects.ts` is a **six-project mock catalog**, with display fields, canonical repository URLs, and paths to metadata READMEs. It does not represent all 28 projects yet. `profile.ts` contains authored profile copy and avatar/contact data; it need not be extracted into repository metadata.

Flow: `config/list.json` names the expected sources; the Python audit compares that inventory with local clones and metadata, and optionally GitHub. `project/` → `src/markdown-metadata/` copies only root READMEs and records source commits automatically; the other metadata notes are prepared/reviewed manually. `src/markdown-metadata/` → `src/data/projects.ts` is manual editorial selection and is currently only six mock records. The website reads those objects directly and lazy-loads each record's metadata README through `readmePath`. `src/data/profile.ts` is authored directly and bypasses repository metadata for the profile Overview. Do not import project clones into the browser bundle or treat mock data as the complete inventory.

## Metadata refresh

- Start with `python scripts/check_repository_sync.py`. It validates the arrays in `config/list.json`, checks complete-link coverage in `config/list-detail.md`, and reports missing clones/metadata, `source_commit` differences, and README byte/hash differences against local clone HEADs. Incomplete repositories are inventory-only; they need no clone or metadata. This audit is read-only.
- Use `python scripts/check_repository_sync.py --remote` when you need the current GitHub state. It additionally compares all public repos on the GitHub profile with the JSON inventory and checks each complete/profile repo's remote HEAD against clone HEAD and metadata `source_commit`. A local clean result does not prove GitHub is current.
- If remote HEAD differs, update the clone through its own Git workflow. Before refreshing metadata, inspect `git -C project/<name> diff --stat <recorded-commit>..HEAD` and the full diff. Review `cover.md`, `short-description.md`, `deep-description.md`, and any affected frontend record. Do not treat an unchanged README as proof that those notes are still accurate.
- Then run `npm run sync:metadata`. It loops through local `project/` directories, copies changed root READMEs byte-for-byte, and updates `source.md` when a clone commit or README changes. It does not derive the 28 project summaries, edit `src/data/`, or change clone files.
- Verify with `python scripts/check_repository_sync.py`, `npm run check:metadata`, and `npm run build`. The metadata check confirms all 29 README snapshots and recorded commits match the clones. Sync and check reject a clone README with uncommitted changes.
- `source.md` records the clone commit inspected when the README was copied. It does **not** prove that separately written cover/description notes came from that same commit. GitHub description/topics may require manual refresh because they are not necessarily stored in the Git clone.
- Keep the raw README verbatim. Write portfolio-specific overview, category, highlights, and presentation copy in `src/data/`, not in the clone or README snapshot.

## Frontend architecture

- `src/main.tsx` mounts React, `BrowserRouter`, and global styles. `src/App.tsx` owns routes, persistent header/footer, and theme state.
- `src/pages/` contains `OverviewPage`, `RepositoriesPage`, `JourneyPage`, and `RepositoryDetailPage`.
- `src/components/layout/` contains shared navigation, header/footer, and profile layout. `src/components/projects/` contains cards, rows, topics, and the README renderer. `src/components/icons/` contains custom SVG icons.
- `src/data/projects.ts` is the current typed six-project preview. Its `readmePath` points into `src/markdown-metadata/`; `repositoryUrl` is explicit and should be used for source links. `src/data/profile.ts` supplies the profile Overview and sidebar copy directly.
- `RepositoryReadme` lazy-loads the referenced Markdown via Vite's raw import glob. It renders GitHub-flavored Markdown and sanitized inline HTML. Relative file links resolve to the project's canonical GitHub URL; relative images resolve to GitHub's raw content host using `HEAD`.
- `src/styles.css` holds theme and page styles. Keep class names stable when moving markup.

## Current routes

| Route | Current behavior |
| --- | --- |
| `/` | Authored profile Overview from `src/data/profile.ts` and four pinned mock projects. |
| `/repositories` | Search, category filter, sort, and list/category views over six mock projects. Category groups start collapsed. Global search navigates here with `?q=`. |
| `/journey` | Hand-written narrative linking four mock projects. |
| `/repositories/:slug` | GitHub-like detail shell. `OVERVIEW.md` and About share an upper two-column section; the metadata `README.md` renders in a separate full-width block below. Unknown slugs show a missing-repository message. |

The detail `OVERVIEW.md` is still hand-written JSX, not a file-backed document. Hot Potato has special-case overview/demo content. Theme choice persists in `localStorage` under `portfolio-theme`; `/` focuses global search.

## Next work

1. Build the complete frontend catalog deliberately from the 28 metadata folders. Verify each claim against `cover.md`, descriptions, README, and clone as needed. Decide how related client/server repositories appear. Keep canonical repository URLs explicit.
2. Move the detail overview and project highlights out of page JSX into typed frontend data or a Markdown content layer. Keep the profile Overview in `src/data/profile.ts`.
3. Review placeholder licenses, sample years, category labels, pinned order, journey order, and Hot Potato's special demo link. None should come from `config/list-detail.md` tiers.
4. Validate README relative links and images per repository; current links use GitHub `HEAD`. Review behavior for non-default paths/branches when the catalog expands.

After code changes, run `python scripts/check_repository_sync.py` for inventory/metadata changes and `npm run build` for TypeScript and Vite validation. Use `--remote` to audit GitHub when network access is available.
