## I made a local shelf to remember what I was reading and where I stopped.

The problem was small but persistent: a manga title, its reading link, and the last chapter I finished were easy to lose track of across different sites. I wanted a shelf I could open on my own computer and change as quickly as I read, without making an account or setting up a database. That simple need became a React interface backed by a small local Node server and plain files.

## Making the shelf useful day to day

I started with cards for titles and chapter progress. One-click chapter changes are convenient when reading in order, while exact entry and an “unknown” state handle the times I cannot remember where I stopped. Search and custom categories make a larger collection manageable. Dragging cards or categories changes their saved order; deleting a category returns its titles to Main instead of losing them.

Covers brought in another practical problem. A remote image can disappear, so the server copies uploaded and URL-sourced covers into local storage and cleans unused files. The collection, ordering, notes, and covers can travel together as files. The app stays a personal, local tool rather than pretending to be a synchronized reading service.

<!-- overview-media -->

The screenshot shows the actual shelf: categories and cards are the main interface, with chapter progress available without opening a separate detail page. This repository includes the frontend, the local API, and a ready-to-run build. It also includes a deliberately guarded reset command for someone who wants a blank collection; the saved example data is part of the repository snapshot.
