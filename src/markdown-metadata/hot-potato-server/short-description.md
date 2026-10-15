# Hot Potato Server

Categories: [backend, AI systems, education technology]

Summary: The Express and MongoDB API behind Hot Potato's teacher-authored lessons and contextual study companion. It owns authentication, lesson access and persistence, answer/history records, image metadata, and Gemini-powered tutor and teacher-assistance flows. The backend keeps lesson context and teacher guidance on the server so AI responses can be grounded in trusted material while anonymous students retain full access to public learning.

Highlights:
- Unified tutor endpoint serves free chat, question feedback, writing evaluation, and follow-up through SSE or JSON.
- Server-side lesson serialization, per-lesson teacher controls, model routing, retries, and up to three suggestions.
- Eleven-action teacher copilot with generated question validation and a client-side preview/accept workflow.
- JWT/email and Google auth, public/link-only/private lessons, collaborator permissions, and conflict-safe edits.
- Offline API tests with mocked Gemini and in-memory MongoDB.

Tech stack: [Node.js, TypeScript, Express 5, MongoDB, Mongoose 9, Google Gemini, JWT, Cloudinary, Vitest, Supertest]
