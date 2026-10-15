# Hot Potato Server

## Where instructional rules become API behavior

Hot Potato's backend is more than storage for a lesson website. It enforces teacher ownership of educational material, supplies a contextual AI tutor that encourages reasoning, and preserves public access for students who cannot or do not want to register. Public lesson reads and tutor calls use optional authentication. Signed-in users gain durable answer maps, visit history, and chat sessions; anonymous users supply a recent thread per request. The documentation explicitly rejects student AI quotas, using generous rate limiting only for abuse prevention.

## Request, content, and security design

The TypeScript/Express 5 service follows routes → authentication middleware → controllers → Mongoose models, with shared logic in `services/`. `app.ts` constructs an importable Express app; `index.ts` connects to MongoDB and listens. This split lets Vitest and Supertest exercise the HTTP surface without starting a real server. JWT sessions support email/password accounts and Google ID tokens; guards distinguish optional access, protected users, and admin routes. Lessons are stored as serialized TipTap documents with owner, collaborators, access level, metadata, and `agent_settings`. Access can be public, link-only, or private. Updates use optimistic concurrency so a stale editor write returns 409 instead of overwriting another change. Models also cover users, per-lesson answers, learning history, chat sessions, student memory, and Cloudinary image-library metadata.

## Tutor flow

`POST /api/chat/tutor` is a unified endpoint with `free_chat`, `question_feedback`, `write_evaluation`, and `followup` modes. A student request names the lesson and sends its current question/turn; `lessonContext.service.ts` loads and serializes the stored lesson into text and question context, cached by the lesson update time. The client does not provide the authoritative lesson text. Tutor services build the instruction from the lesson, teacher-specified response persona/directness/scope/custom rules, student personality, and—when enabled—memory. Gemini can return typed SSE token events or a plain JSON reply, both with up to three suggested follow-ups. Lightweight tasks route to a faster model, more involved coaching to a stronger model; transient AI network failures receive backoff retries.

The student's optional memory sketch records interests, strengths, growth areas, preferences, and recent topics and can be viewed and deleted. The README says automatic memory updates and injection are shelved by default, so this should be described as an implemented but disabled feature unless current deployment configuration is confirmed.

## Teacher copilot and operational care

`POST /api/creator/assist` serves eleven actions, including structure import from pasted materials, outline and section drafting, proofreading, question and distractor generation, guide answers, formula LaTeX, critique, metadata, and tutor-setting suggestions. The service asks Gemini for structured output, parses it tolerantly, and validates generated question blocks; malformed items are dropped. The browser's preview/accept step ensures teacher control before document changes. The API also supplies status endpoints, an in-memory error ring buffer and AI-health snapshot, sanitized public diagnostics, and admin-only internals. A mocked Gemini plus in-memory MongoDB enables an offline test suite. These facilities reveal an operational concern for latency, failure, and privacy, though the in-memory observability state resets on server restart.

## Evidence and open questions

- Sources: `project/hot-potato-server/README.md`, `src/app.ts`, `src/routes/`, `src/controllers/tutor.controller.ts`, `src/services/lessonContext.service.ts`, `src/services/tutor/`, `src/services/creator/`, `src/models/`, `src/middlewares/auth.middleware.ts`, `src/services/observability.service.ts`, and `project/hot-potato/docs/security-model.md`.
- Ask the owner: What deployment scale and error rates can be reported? Were tutor replies assessed with teachers/students, and what changed as a result? Is memory still disabled in the deployed instance?
