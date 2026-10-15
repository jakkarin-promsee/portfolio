# Manga Shelf

Categories: [Personal Tools, Local-First Web Apps, Reading]

Summary: A personal manga shelf for remembering titles, reading links, notes, and the last chapter finished, without creating an account or setting up a database. Its Thai-language React interface lets a reader organize cards into custom categories, update chapters directly on the shelf, search titles, and adjust card size. A small local Node server persists the collection and copies uploaded or remote covers into local storage, so the collection travels as files rather than depending on an external service.

Highlights:
- One-click chapter increments and decrements, plus exact chapter entry and an explicit unknown state.
- Drag cards within or across categories, reorder categories, and move cards to Main when a category is deleted.
- Manage uploaded or URL-sourced covers locally, with temporary staging and cleanup.
- Ship a ready-to-run `dist/` build and an interactive reset script with safeguards against accidental data loss.

Tech stack: [React, JavaScript, Tailwind CSS, Vite, Node.js, local JSON files]
