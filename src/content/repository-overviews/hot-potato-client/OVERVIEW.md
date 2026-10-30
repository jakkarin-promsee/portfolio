## The Hot Potato client had to make one lesson work for both its teacher and its students.

The broader [Hot Potato](/repositories/hot-potato) story began with a teacher's need and my interest in a substantial full-stack build. In this repository, the first hard problem was the interface: how could a teacher build a flexible lesson and have a student read the same content on a phone? A static form would not cover drawings, formulas, media, and different kinds of questions, so the editor grew into a document system with custom blocks.

## One document, two ways to use it

Teacher tools edit a TipTap document; the student viewer renders that same structure. Question definitions and drawing state live in the document's nodes so saving, reopening, and viewing do not depend on a second hidden copy in React state. The teacher can bring in existing text, ask AI to suggest an outline or question, inspect a preview, and accept only what belongs in the lesson. The screen below shows that approval step in the authoring flow.

<!-- overview-media -->

The student side needed a different pace. Public lessons open without a sign-in wall, and the interface is Thai-first and phone-first. Students can answer several question types, receive feedback, and continue a conversation with the tutor. Streaming replies, follow-up suggestions, and optional account history make that conversation feel like part of the lesson rather than a separate AI page. The client sends requests to the companion server; it does not decide the trusted lesson text used by the tutor.

This repository owns the React interface, routes, state, editor, viewer, and browser-side API calls. The [server](/repositories/hot-potato-server) owns persistence, access rules, and AI context. The useful result is a working two-sided experience; the client code and screenshots do not by themselves measure learning outcomes or usability with students.
