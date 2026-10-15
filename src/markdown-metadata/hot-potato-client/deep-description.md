# Hot Potato Client

## The two-sided interface

The Hot Potato client serves students and teachers through different but connected workflows. For students, it is a Thai-first, phone-first place to find public lessons and start reading or asking the AI tutor without creating an account. For teachers, it is a desktop authoring environment that turns existing materials into lessons with interactive questions. The design aims to keep learning open to low-tech users while leaving curriculum and tutor direction with teachers.

The student path begins in Explore and a lesson viewer. The viewer renders rich text, tables, images, videos, drawings, and math from the same TipTap document format used in authoring. Embedded questions include multiple choice, written response, drag-to-fill, typed fill, and a free-form AI tutor block. The client can submit deterministic diagnostics for choice/blank questions or route writing to model evaluation; the server returns contextual feedback. AI answers stream through Server-Sent Events and finish with tappable follow-up suggestions. Each question can have a conversation thread, and users can choose among six tutor personalities. Anonymous threads remain client-side; signed-in users also gain saved answers, learning history, and profile controls to view/delete memory. Automatic memory updates are disabled by default on the server, even though the client exposes controls.

## Authoring a lesson

The teacher editor uses TipTap 3 with custom nodes and a block-oriented UI. It supports resizable images, a Fabric.js canvas drawing block, a visual formula builder that stores LaTeX for KaTeX rendering, and the question formats used by students. The TipTap document is the source of truth: question definitions, canvas state, and formula data live in node attributes, so autosave and read-only viewing share the same serialized content. Teachers can import pasted existing materials, request an outline or section draft, generate questions and guide answers, get distractor suggestions, proofread, critique a lesson, and fill publication metadata. The eleven server-backed AI actions display a preview before the teacher accepts a change; AI output is not silently inserted. Teachers choose public/link-only/private access, can add collaborators, and can specify per-lesson tutor persona, answer directness, scope, and custom guidance.

## Frontend structure and integration choices

`App.tsx` declares routes and guards. `ProtectedRoute` redirects when an account is required; `RequireLogin` offers a softer in-context prompt; `PublicRoute` handles auth-page navigation. Pages are route-lazy-loaded except the landing page. Zustand stores coordinate auth, content, answers, and other cross-page state, while TanStack Query handles server state. A configured Axios bridge reads the bearer token from the auth store for REST requests. Student AI requests use `tutorApi.ts`; streaming deliberately uses `fetch` for SSE and can fall back to plain JSON if the stream fails before the first token. Teacher AI calls use `creatorApi.ts`. Cloudinary unsigned uploads move image bytes directly from browser to Cloudinary while the server stores image metadata.

The README documents a Vercel client paired with the Render API, MongoDB, Gemini, and Cloudinary. Tests under `src/pages/__tests__/` and `src/__tests__/` cover routes, pages, SEO and other behavior. This summary describes code and documentation, not measured usability or accessibility outcomes.

## Evidence and open questions

- Sources: `project/hot-potato-client/README.md`, `src/App.tsx`, `src/pages/TiptapView.tsx`, `src/pages/TipTapCanvas.tsx`, `src/components/editor/`, `src/components/editor/extensions/tutorApi.ts`, `src/lib/creatorApi.ts`, `src/stores/`, `src/pages/__tests__/`, and `project/hot-potato/docs/ARCHITECTURE.md`.
- Ask the owner: Which student/teacher experiences were tested with real users, what changed after feedback, and what accessibility or performance measurements should appear in the portfolio?
