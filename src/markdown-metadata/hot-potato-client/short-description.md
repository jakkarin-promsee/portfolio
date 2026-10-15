# Hot Potato Client

Categories: [frontend, education technology, AI interface]

Summary: The React client for Hot Potato turns teacher material into interactive web lessons and lets students read, answer, and converse with an AI study companion. It combines a desktop lesson editor with a Thai-first, phone-first student experience, including public access without sign-in. The client owns the editor/viewer, route and state flow, accessible AI conversation surfaces, and the browser-side boundary to the separate server.

Highlights:
- TipTap lesson editor and viewer share custom question, drawing, image, and formula blocks.
- Teacher AI hub offers eleven actions with preview and explicit acceptance before document changes.
- Student questions and free chat stream tutor replies over SSE with follow-up suggestions and six personalities.
- Anonymous learning works alongside signed-in answer persistence, history, and memory controls.
- Lazy-loaded routes and vendor chunks keep the initial app payload smaller.

Tech stack: [React 19, TypeScript, Vite 7, Tailwind CSS 4, TipTap 3, Fabric.js, KaTeX, Zustand, TanStack Query]
