## The Hot Potato server turns a saved lesson into trusted context for a conversation.

The [Hot Potato](/repositories/hot-potato) interface lets a teacher publish a lesson and a student ask about it. This repository handles what has to remain true behind those screens. Early AI routes answered one request at a time; a continuing tutor needed the stored lesson, its questions, teacher guidance, and the student's recent turns to meet in one place. That moved the core of the conversation to the API.

## Drawing the boundaries on the server

A tutor request identifies a lesson and the current turn. The server loads the authoritative lesson document, serializes its content and questions, applies the teacher's response settings, and asks Gemini for a reply. One tutor flow handles free chat, question feedback, writing evaluation, and follow-ups, with streaming or a plain response. Signed-in students can keep answer and chat history; anonymous students can still read public lessons and use the tutor, carrying their recent thread in the request.

The same service stores accounts, lessons, access levels, collaborators, answers, and image metadata. It checks roles and lesson ownership at the API boundary. Stale edits return a conflict rather than silently overwriting another version. Teacher AI can propose outlines, sections, questions, and reviews, but generated question data is validated and the client requires a preview and acceptance before changing a lesson. Operational checks and offline tests cover failure paths as well as the happy path.

The result is the backend for the deployed learning product, not a standalone chatbot. Its important design choice is that the server owns both the lesson context and the access rules while the teacher keeps control of instructional content. Automatic student-memory updates exist in code but are disabled by default, and this repository does not establish measured educational impact.
