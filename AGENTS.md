# Portfolio website handoff

## Goal

This is Jakkarin Promsee's portfolio with GitHub-inspired profile and repository pages. Project explanations take the place of code browsing, commit history, and activity. Keep the profile Overview editorial; repository facts should be traceable to the cloned source and its Markdown metadata.

## Source and data hierarchy

1. `config/list.json` is the URL-only inventory with `complete`, `profile`, and `incomplete` arrays: 28 complete repositories, one GitHub profile, and eight incomplete repositories (including this portfolio site). Keep both complete and incomplete links so the list can be checked against the public GitHub profile. `config/list-detail.md` holds the original project descriptions, groups, and private priority tiers. **Never turn tiers into UI categories, labels, ranking, or ordering.**
2. `project/<repo-name>/` holds untouched local clones of the 28 complete repositories and `project/Jakkarin-Promsee/` holds the profile clone. They are reference inputs, not frontend code. Do not edit them as part of portfolio work.
3. `src/markdown-metadata/<repo-name>/` is the repository content source of truth for this site. The existing 28 folders contain `cover.md` (repository URL, GitHub description, topics), `README.md` (verbatim clone README), `short-description.md` (quick context), and `deep-description.md` (deeper context or clone pointer). Each folder also has `source.md` with the checked-out clone path, full Git commit, commit date, snapshot time, and README SHA-256. The profile clone currently has only `README.md` and `source.md` here; its site Overview is authored separately.
4. `src/data/` is the frontend-ready projection. `projects.ts` combines the original ten records with `projectsAdditional.ts` into a **28-repository catalog**, with editorial list summaries, canonical repository URLs, paths to metadata READMEs, and authored overview paths. `githubRepositoryAbout.ts` reads the GitHub description and topics from each `cover.md` at build time for the detail About, list tags, and search. The 28 covers matched live public GitHub metadata on 2026-10-30. `profile.ts` contains sidebar identity and contact data; profile README copy is authored in `docs/profile-readme-draft.md` and `src/content/profile-readme-extend.md`.

Flow: `config/list.json` names the expected sources; the Python audit compares that inventory with local clones and metadata, and optionally GitHub. `project/` → `src/markdown-metadata/` copies only root READMEs and records source commits automatically; the other metadata notes are prepared/reviewed manually. `src/markdown-metadata/` → `src/data/projects.ts` and `src/data/projectsAdditional.ts` is manual editorial selection for all 28 complete repositories. The website reads those objects directly and lazy-loads each record's metadata README through `readmePath`. The authored profile README and extension bypass repository metadata. Do not import project clones into the browser bundle or put the eight incomplete inventory links into the catalog before they have verified metadata. `docs/myself/` contains private reflection notes and must stay out of Git.

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
- `src/data/projects.ts` defines the typed catalog and combines ten original records with 18 records in `projectsAdditional.ts`. Each `readmePath` points into `src/markdown-metadata/`; `repositoryUrl` is explicit and should be used for source links. Every `overviewPath` points into `src/content/repository-overviews/`. `githubRepositoryAbout.ts` imports each metadata `cover.md` as raw text to supply GitHub's description and topics without runtime API calls or duplicated copy in catalog records. `src/data/profile.ts` supplies sidebar identity and contact data; the home page renders the authored profile README and extension.
- `RepositoryReadme` lazy-loads the referenced Markdown via Vite's raw import glob. It renders GitHub-flavored Markdown and sanitized inline HTML. Relative file links resolve to the project's canonical GitHub URL; relative images resolve to GitHub's raw content host using the recorded `sourceCommit` when available, otherwise `HEAD`.
- `src/styles.css` holds theme and page styles. Keep class names stable when moving markup.

## Current routes

| Route | Current behavior |
| --- | --- |
| `/` | Authored profile README and extension, followed by nine selected-work cards; sidebar data comes from `src/data/profile.ts`. |
| `/repositories` | Search, category filter, snapshot-date sort, and list/category views over all 28 complete repositories. Category groups start collapsed. Global search navigates here with `?q=`. |
| `/journey` | Authored six-chapter research path and separate stories covering the other complete repositories. All complete repositories link to local detail pages. |
| `/repositories/:slug` | GitHub-like detail shell. `OVERVIEW.md` and About share an upper two-column section; the metadata `README.md` renders in a separate full-width block below. Unknown slugs show a missing-repository message. |

All 28 detail `OVERVIEW.md` documents are authored in `src/content/repository-overviews/`. Each begins with a one-sentence summary heading and uses normal body text for the explanation. The editorial story outlines and final local-source audit are in `docs/research-overview-outlines.md`, `docs/other-repo-overview-outlines.md`, and `docs/repository-overview-final-check.md`. Repository media is configured in `src/data/repositoryOverviewMedia.ts`. Theme choice persists in `localStorage` under `portfolio-theme`; `/` focuses global search.

## Next work

1. The 28-page source, remote, and outline audit is recorded in `docs/repository-overview-final-check.md`. All 28 complete project remote HEADs matched their pinned local commits on 2026-10-30; the separate `Jakkarin-Promsee` profile clone was behind GitHub and needs its own diff review before refresh. Causal World's unfinished narrative still needs owner verification; refine other personal details when the owner reviews the prose. Keep the profile README and its extension in their authored Markdown files.
2. Review category labels, pinned order, journey order, and Hot Potato's special demo link. None should come from `config/list-detail.md` tiers. License and date fields should be omitted or explicitly identified as source snapshots where appropriate.
3. Continue validating README relative links and images per repository; all current records use pinned source commits. The renderer routes the calisthenics client/server README sibling links to local detail pages. The pinned source READMEs still reference missing `causal-world-learning-and-transfer/ideas/stage-3-experiment-phase-1.md` and `ia-regression/models/main.pdf`; fix those in their source repositories before a metadata refresh. Review behavior for non-default paths/branches.

After code changes, run `python scripts/check_repository_sync.py` for inventory/metadata changes and `npm run build` for TypeScript and Vite validation. Use `--remote` to audit GitHub when network access is available.

## Deployment

`vercel.json` configures the Vite build, `dist/` output, and SPA fallback for direct links to `/journey` and `/repositories/:slug`. The current site uses no custom Vercel environment variables or runtime GitHub API. Keep `.vercel/` local and never expose secrets through `VITE_*` variables.
