# Jakkarin's portfolio website

[Visit the portfolio](https://jakkarin-promsee.vercel.app/)

A GitHub-inspired portfolio that presents repositories as projects to explore. The familiar profile and repository layout stays, while project overviews and the original READMEs carry the explanation. Code browsing, commit history, and activity graphs are outside this site's intended experience.

The site is a React + TypeScript app built with Vite. Its 31 public routes are pre-rendered to static HTML during the production build, then hydrated by React for interaction. The catalog covers all 28 complete repositories; the eight incomplete repositories remain inventory-only.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. `npm run build` runs TypeScript checks, builds the browser and server bundles, and writes HTML for the home page, journey, catalog, and all 28 repository pages into `dist/`. Use `npm run preview` to inspect the production output locally.

## Project hierarchy

```text
config/list.json                URL arrays: complete, profile, incomplete
config/list-detail.md           Project descriptions and priority notes
project/<repo-name>/             Untouched Git clones: 28 projects + 1 profile
src/markdown-metadata/<name>/   Repository Markdown snapshot and context
  README.md                     Verbatim root README copied from the clone
  cover.md                      Repository URL, GitHub description, topics
  short-description.md          Quick project context
  deep-description.md           Deeper context / source pointers
  source.md                     Clone commit, dates, snapshot time, README hash
src/data/
  projects.ts                   Typed catalog and original ten records
  projectsAdditional.ts         Remaining 18 catalog records
  githubRepositoryAbout.ts      GitHub About description/topics from cover.md
  profile.ts                    Sidebar identity and contact
src/content/repository-overviews/
  <name>/OVERVIEW.md            Authored project explanation
src/content/profile-readme-extend.md  Extended profile story
docs/profile-readme-draft.md    Profile README displayed on the home page
src/pages/                     Route-level screens
src/components/                Shared layout and project presentation
src/styles.css                 Theme and page styles
scripts/sync-markdown-metadata.mjs  README snapshot/verification command
scripts/check_repository_sync.py   Inventory, commit, and README audit
```

The profile metadata folder currently contains only `README.md` and `source.md`; the website's profile copy is authored in `docs/profile-readme-draft.md`, `src/content/profile-readme-extend.md`, and `src/data/profile.ts`. The 28 project metadata folders retain the four prepared Markdown files. `config/list.json` has explicit `complete`, `profile`, and `incomplete` arrays for 28 complete repos, the GitHub profile repo, and eight incomplete repos including this website. The incomplete links help check public profile coverage but need no metadata yet. Tiers live only in `config/list-detail.md`; they prioritize writing work and must never determine UI categories or ordering.

## Data architecture

```mermaid
flowchart LR
  I[config/list.json] --> A[Python sync audit]
  G[GitHub public repos and HEADs] -->|optional --remote| A
  P[project/ local clones] --> A
  M[src/markdown-metadata/] --> A
  P -->|npm run sync:metadata: README + source.md| M
  M -->|manual review| D[src/data/projects.ts + projectsAdditional.ts: 28 records]
  D --> W[Pages and components]
  D -->|readmePath| R[README renderer]
  M --> R
  R --> W
  F[Authored profile README and sidebar data] --> W
```

`config/list.json` is the inventory for the audit, not the website's project catalog. The complete and profile arrays are expected to have clones and metadata; incomplete repos are tracked for GitHub profile coverage only. `config/list-detail.md` holds human notes and priority tiers. The audit checks its complete-project links, but neither config file feeds UI categories or ordering.

The clones are the primary reference and remain unchanged by these scripts. `src/markdown-metadata/` is the source of truth for repository content used by this portfolio. `source.md` records the checked-out Git commit, commit date, snapshot timestamp, and SHA-256 of the copied README. The cover and description files are separately prepared notes; the sync script copies **only README.md and source.md**. A matching commit and README hash do not prove those notes are current.

`src/data/` holds frontend-ready TypeScript objects. `projects.ts` and `projectsAdditional.ts` form the 28-record catalog; records are **not generated automatically** from metadata. Each record has a canonical `repositoryUrl`, a `readmePath` into metadata, and an authored `overviewPath`. `githubRepositoryAbout.ts` imports each `cover.md` at build time for the About description and topics. Editorial list summaries, categories, status, and source snapshot labels are separate from GitHub About fields. The profile Overview is authored in the two Markdown files above, while `profile.ts` provides sidebar identity and contact data.

## Check and refresh repository data

1. Run `python scripts/check_repository_sync.py` for an offline audit. Add `--remote` to compare against current GitHub HEADs and all public repos on the profile; that mode needs network access. The audit reads the JSON arrays directly, checks `config/list-detail.md` coverage, and reports missing clones/metadata, commit differences, and README byte/hash differences. It never edits files. An offline clean result only means the metadata matches the **local checked-out clones**.
2. If GitHub is ahead, update the relevant clone through its normal Git workflow, then rerun the audit. For each changed commit, inspect the suggested `git -C project/<name> diff --stat <recorded-commit>..HEAD` and the full diff. Decide whether `cover.md`, `short-description.md`, `deep-description.md`, and the frontend record need revision, or whether the README alone changed.
3. After that review, run `npm run sync:metadata`. It copies changed root READMEs byte-for-byte and updates `source.md` when a clone commit or README changes. It does **not** update the other Markdown notes or `src/data/`. Clones remain untouched.
4. Run `python scripts/check_repository_sync.py`, `npm run check:metadata`, and `npm run build` to verify the resulting local snapshot and frontend. Use `--remote` again if the update was meant to catch up with GitHub.

The sync script and `check:metadata` reject a clone README with uncommitted changes. Both scripts use only the local clones; only the Python audit's `--remote` mode contacts GitHub.

To add a project to the website, inspect its metadata and clone, add a typed catalog record with its real URL, README path, and authored overview path, then write its `OVERVIEW.md` under `src/content/repository-overviews/`. The build pre-renders that route with its README and overview. The README renderer supports GitHub-flavored Markdown, sanitized inline HTML, and relative GitHub links/images pinned to the recorded source commit.

## Frontend structure

- `src/App.tsx` defines routes, shared chrome, and theme state.
- `src/pages/OverviewPage.tsx` displays the authored profile README, its extension, and selected project stories.
- `src/pages/RepositoriesPage.tsx` offers search, category filtering, sorting, a list view, and collapsible category groups.
- `src/pages/RepositoryDetailPage.tsx` places a portfolio `OVERVIEW.md` beside About, then shows the original README in a full-width block.
- `src/pages/JourneyPage.tsx` presents the research path and separate stories for the other repositories.
- `src/components/projects/RepositoryReadme.tsx` renders the selected metadata README. Other shared UI lives under `src/components/layout/` and `src/components/projects/`.

All 28 detail pages have authored `OVERVIEW.md` documents. The unfinished Causal World narrative is marked provisional. See `AGENTS.md` and the audit in `docs/repository-overview-final-check.md` for source limits.

## Deploy on Vercel

`vercel.json` pins the Vite framework, `npm run build`, and the `dist/` output directory. Every public route has its own `index.html` under `dist/`; Vercel redirects extensionless route URLs to their trailing-slash form so direct links serve the pre-rendered page. Set the Vercel project root to this repository root.

No custom Vercel environment variables are required by the current site. GitHub About data and repository READMEs are bundled from checked metadata at build time; the browser does not need a GitHub token or backend API. Do not add credentials to `VITE_*` variables, since Vite exposes those values in the client bundle. Local `.vercel/` linking state and the private reflection notes in `docs/myself/` are ignored by Git.
