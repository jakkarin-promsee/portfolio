# Manga Shelf

## The problem it addresses

This is a personal reading tracker for the small but recurring question of which manga a reader was following and where they stopped. It keeps a shelf of titles, chapter progress, reading URLs, notes, categories, card order, and covers on the user's computer. The repository's own closing statement describes its purpose as remembering ongoing series and the last finished chapter. The UI is currently in Thai; the README is in English.

## What the reader can do

The shelf displays manga cards grouped into categories. A reader can add a title with a starting chapter, optional reading URL and note, and either an uploaded cover or a cover image URL. Clicking a card opens its reading link; without one, it opens the editor. From there the reader can change metadata or delete the record. The card offers immediate one-chapter progress changes and an inline exact-number entry. Chapter `0` represents unknown progress rather than a negative count.

The top bar adds categories and filters titles by search. Main is permanently first and cannot be deleted. Custom categories can be renamed, reordered by their headers, and deleted; deletion moves their cards back to Main. Cards can be dragged within and between categories, with edge scrolling during dragging. Reordering is intentionally disabled during search, because a filtered list does not represent the full persisted order. A saved slider changes card width.

## Local architecture and data ownership

The React application in `src/main.jsx` and styling in `src/style.css` talk to the local API in `server.mjs`. The server runs without a separate database or account system. `data/manga.txt` holds JSON records, including progress, URLs, notes, category membership, and order. `data/config.json` holds category order and card width. Used covers live under `data/covers/`; upload staging is separate and stale or unused files are cleaned up. The server also copies covers supplied by URL locally, so the displayed cover need not rely on the original host. `dist/` is checked in as a ready-to-run frontend, while `dev.mjs` and Vite support editing the source.

The repo includes collection data. A new user can preview `scripts/reset-data.mjs`, then deliberately erase the local collection with a second command. The erase path requires an interactive deletion phrase and full project path and refuses to run while the app port is occupied. Backing up or moving the collection means keeping `manga.txt`, `config.json`, and `covers/` together. Because these are Git-tracked, saved personal collection data can be visible in repository history; that is a material privacy consideration for this design.

## Design character and boundaries

The project favors a quiet personal tool over a hosted service: a single local process, plain files, no user accounts, and no database provisioning. The UI supports direct manipulation of reading progress and ordering, while the storage model remains inspectable and portable. Browser tabs returning after being hidden briefly refresh to pick up local changes, except when an editor or chapter edit is open. This is local persistence, not multiuser synchronization or a cross-device account service.

## Evidence and open questions

- Sources: `project/manga-shelf-interface/README.md`, `project/manga-shelf-interface/src/main.jsx`, `project/manga-shelf-interface/server.mjs`, `project/manga-shelf-interface/scripts/reset-data.mjs`, and `project/manga-shelf-interface/data/`.
- The repository states the practical use case, but does not establish the author's personal reading habits, user count, or adoption. Ask the owner what specific frustration started the project and which interaction mattered most in daily use.
