# Hot Potato

## The learning problem and product stance

Hot Potato addresses the gap between having a worksheet to read and having someone available to ask “why?” or test an idea with. The project combines teacher-authored interactive lessons with an AI study companion that encourages reasoning beyond a right/wrong verdict. Its own documentation explicitly frames access for learners with limited teacher or tutoring support and for users with little tech experience. The interface is Thai-first and phone-first. Public lessons and AI tutoring do not require an account; signing in adds persistence rather than permission to learn.

Teacher control is central. A teacher can write a lesson, import pasted material from notes, worksheets, or documents, add questions and media, preview AI suggestions, and decide what enters the published document. The same teacher can configure each lesson's tutor persona, direct-answer policy, discussion scope, and custom guidelines. The AI is a study partner and drafting assistant; the teacher owns instructional direction.

## The complete user journeys

Students browse and search public lessons, bookmark locally, read a rich document, and answer multiple choice, writing, drag-to-fill, or typed-fill questions. A question can return contextual feedback, suggestions, and a conversation thread. The unified tutor also supports free chat, writing evaluation, and follow-up. Students select among six tutor personalities. Signed-in learners can recover answers, recently opened lessons, and chat sessions. The tutor-memory sketch can be viewed and erased, but automatic updates are disabled by default in the server configuration.

Teachers use a desktop-oriented editor with rich text, images, drawings, formulas, and question blocks. Existing teaching text can be pasted for AI structure and draft suggestions; the flow does not scan paper. Every AI proposal passes through preview and explicit acceptance. Publication offers public, link-only, or private access; collaborators can maintain lessons. The lesson's TipTap JSON is the authoritative document shared by editing, autosave, and read-only viewing.

## Three-repository architecture

This root repository holds the integration guide and docs; `hot-potato-client` owns the React SPA; `hot-potato-server` owns the Express/MongoDB API and AI orchestration. In the documented deployment, Vercel serves the client, Render runs the API, MongoDB stores data, Cloudinary holds images, and Google Gemini generates replies. The browser normally calls REST endpoints through Axios; tutor token streaming uses `fetch` and SSE. The server loads and serializes the trusted lesson from MongoDB for every tutor call, rather than accepting client-supplied lesson text. It caches the context by lesson update time. AI results include up to three follow-up suggestions. Teacher copilot returns markdown or validated typed question data so model output is not inserted as raw editor document JSON.

The root documentation records cross-cutting product rules: no login wall for public learning or AI; bot-abuse rate limiting rather than student quotas; teacher acceptance before AI writes into a lesson; server ownership of tutor context; and per-lesson teacher guidance. `docs/data-flow.md`, `docs/security-model.md`, `docs/testing.md`, and `docs/operations.md` explain how those rules are implemented and maintained. `graphify-out/` is a checked-in code knowledge graph that links concepts across the independently deployable repositories; its report records provenance and can become stale as code changes.

## Evidence and open questions

- Sources: `project/hot-potato/README.md`, `docs/ARCHITECTURE.md`, `docs/data-flow.md`, `docs/security-model.md`, `docs/testing.md`, `docs/operations.md`, and `graphify-out/GRAPH_REPORT.md`; implementation in `project/hot-potato-client/` and `project/hot-potato-server/`.
- The source documents intent and implementation, but does not establish measured educational outcomes or user reach.
- Ask the owner: What initial experience led to the product idea, which design iterations were driven by learner/teacher feedback, and are there adoption or learning results that can be stated accurately?
