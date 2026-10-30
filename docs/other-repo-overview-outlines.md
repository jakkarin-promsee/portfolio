# Other repository overview outlines

These 21 complete repositories sit outside the seven-project research path. Lead with the first use, curiosity, or course opportunity, then show how the work grew and what actually exists. Most need a compact story; Hot Potato, Rebirth, and Era Odyssey warrant more room. The owner says they led much of the work on TokTickIT, the cinema project, the FPGA fight, PredictPeopleAssistant, and Era Odyssey, but shared projects should still credit collaborators. Keep client, server, and system-map repositories distinct. Repository facts come from the pinned README, metadata, and clone; personal motives below come from the owner where stated. Private tiers never determine placement or tone.

## manga-shelf-interface

- **Start:** A small recurring annoyance: losing track of a manga's link, notes, and last chapter. Build a personal shelf without accounts or database setup.
- **Growth:** Cards and chapter controls lead to search, categories, ordering, and local copies of covers when remote images prove unreliable.
- **Result / limit:** A usable local React and Node tool with file-backed data, not a synchronized reading service. Show the actual shelf screen.

## toktickit

- **Start:** Use a software-engineering course final project to see how far a service-desk workflow can grow beyond a ticket form under a deadline. The owner led much of the build with a team.
- **Growth:** Requester, IT, and admin journeys force role and ownership rules, status transitions, comments, attachments, and a shared API contract. Issues, tests, branches, pull requests, and peer review become part of building the product.
- **Result / limit:** A functioning course service desk and documented engineering process, without claiming use by a real IT department. Make the disciplined collaboration as visible as the UI.

## kmutt-y3-s1

- **Start:** Re-explaining course context and image-heavy PDFs to each new agent chat was costly. Make one semester navigable by people and an agent.
- **Growth:** Vault, course, and file-level instructions and indexes require ingest, PDF reading copies, link checks, and easy checkpoints to stay useful.
- **Result / limit:** A real coursework vault and reusable context workflow. Do not claim measured token or time savings.

## hot-potato

- **Start:** A teacher the owner knew had a real need; the owner also wanted a demanding full-stack experiment with a dynamic editor, AI API, and complex data flow. Give both motives their proper weight.
- **Growth:** An editable online lesson becomes a document that survives saving and renders for students on phones. Questions and feedback require accounts, storage, and access rules. One-off AI replies become a lesson-grounded conversation; AI drafts for teachers require preview and explicit acceptance.
- **Result / limit:** This repository is the system map for the deployed teacher/student product. Teachers control material; students can read, answer, and ask without signing in. Do not claim measured learning impact. Place the teacher and student images after the development arc.

## hot-potato-client

- **Start:** The system's dynamic editor and phone-first student reader have to share one lesson without divergence.
- **Growth:** TipTap blocks carry questions, drawings, media, and formulas through editing, saving, and viewing. Teacher AI suggestions need approval; student answers and chat need a different pace and accessible mobile flow.
- **Result / limit:** The React interface delivers the two-sided journey. Server-owned context, persistence, and access rules belong to the companion repo; the screenshot shows a real authoring step, not evidence of student outcomes.

## hot-potato-server

- **Start:** A continuing tutor cannot rely on one-off AI routes or browser-supplied lesson text. Move trusted lesson context and conversation rules to the API.
- **Growth:** Persist lessons and accounts, enforce roles and ownership, serialize teacher-approved content for Gemini, stream replies, and reject conflicting edits. Teacher draft data needs validation before the client accepts it.
- **Result / limit:** A deployed product backend, not an independent chatbot. Do not imply automatic student-memory updates are enabled or educational impact measured.

## ia-regression

- **Start:** In a data-modeling course, ask whether a Big Five result can become useful before all 50 questions are answered.
- **Growth:** Represent missingness with an answer mask, train multi-output Ridge on partly hidden responses, compare mean baselines, and connect the saved model to a Streamlit quiz.
- **Result / limit:** An interactive partial-response prediction demonstration. Its offline error curve is not a calibrated individual or clinical assessment.

## calisthenic-outdoor-design

- **Start:** Explore an outdoor exercise layout for an adult and child; a Blender render alone cannot answer spacing, fall, material, or foundation questions.
- **Growth:** Turn the model into dimensions, research, preliminary load and assembly checks, and Thai/English handover material. Transport and corrosion concerns motivate shop-welded, field-bolted sections.
- **Result / limit:** A draft design package for professional review, not a built or certified gym. Caption the render as a proposal.

## calisthenics-course-booking-client

- **Start:** Explore a friend's coaching idea through frontend UX/UI, and use the low-stakes build to play with coding agents.
- **Growth:** Connect plan choice to sample checkout, payment, booking, trainer view, and skill progression so the service can be discussed as a journey rather than disconnected screens.
- **Result / limit:** A clickable React prototype. Prices, payment, availability, bookings, balances, and progress are examples; a click does not reserve a real slot. The booking screenshot should make that boundary explicit.

## calisthenics-course-booking-server

- **Start:** The UX prototype needed one real backend boundary: who signs in as user, trainer, or admin.
- **Growth:** Add account persistence, password handling, role-aware login, session checks, and admin-created trainers.
- **Result / limit:** An account API experiment paired with the client, not a booking or payment backend. State the absent server models plainly.

## cpe241-booking-website-client

- **Start:** Use a database-course final project to connect staff scheduling and customer seat selection under a deadline. The owner drove the build while exploring how far the system could grow.
- **Growth:** Admin movie, hall, showing, report, and dashboard screens meet the customer search, seat-map, checkout, and confirmation flow. Each screen raises state questions for the other side.
- **Result / limit:** A connected course application and booking demonstration. SQL transaction rules are on the server; no real payment processor or cinema deployment is established.

## cpe241-booking-website-server

- **Start:** Put the cinema workflow's hard rules in the database: no overlapping shows and no double-held seats.
- **Growth:** A preliminary booking is distinct from checkout. Transactions lock free seats, advance their state, complete or cancel bookings, and roll back failures; reporting queries then summarize activity.
- **Result / limit:** A concrete MySQL transaction model under a course deadline. Generated checkout proof is not a payment receipt.

## undertale-san-fight-verilog-game

- **Start:** Use a course project to see whether a familiar survival fight can run directly as FPGA logic. The owner did the main implementation.
- **Growth:** Buttons, heart movement, platforms, laser patterns, collisions, health, game states, and VGA sprite layers must agree on hardware timing.
- **Result / limit:** A board-oriented game prototype with a linked demo, not a verified polished release. The target display resolution is not a measured frame-rate claim.

## time-limited-shortest-path-visualize

- **Start:** Make search algorithms easier to inspect by watching them solve the same maze.
- **Growth:** Typed, loaded, and generated grids feed BFS, Dijkstra, A*, and an experimental genetic search through one JavaFX view and per-run metrics.
- **Result / limit:** A visual comparison tool, not a general benchmark. Despite the repo name, the checked application does not enforce a time limit.

## javaroke

- **Start:** Give queue and history data structures a concrete job inside a local karaoke session.
- **Growth:** Song selection becomes playback, timed lyrics, next/previous controls, and custom queue/stack behavior. A weighted-graph recommendation experiment branches off separately.
- **Result / limit:** A working desktop learning app plus separate algorithm code; the graph recommender is not wired into the current GUI.

## ctplot

- **Start:** A first-year C final project tested hand-built object-like structures, a dynamic array, and a terminal plotter before AI coding help was useful. The practical destination was seeing numeric data without leaving the terminal.
- **Growth:** Later refactoring repairs correctness and memory safety, turns the code into a linkable C11 library, and adds chart types, a CSV CLI, portable output, and documentation.
- **Result / limit:** A useful terminal plotting tool with tests, not a claim of exhaustive portability. Show genuine terminal output and distinguish the original course experiment from its later portfolio revision.

## rebirth

- **Start:** Curiosity about building a game bot: a finite-state machine is easy to write, but how can enemies feel threatening without making the game unfair? The owner also wanted to make a game.
- **Growth:** Tune patrol, chase, circle, dodge, attack, and recovery against player movement and weapon choices. Room waves, rewards, a telegraphed multi-phase boss, and an ending choice give the fights a full-game shape.
- **Result / limit:** A playable team-made Unity browser game. Explain the game-design judgment behind bot behavior and credit collaborators. Use the README-linked gameplay video; do not turn the page into a list of weapons.

## PredictPeopleAssistant

- **Start:** First full-stack build and first experience deploying a web demo, under a hackathon deadline. Explore a crowd dashboard, forecasting, and AI advice; the owner drove much of the build and remembers it as rough but substantial. The historical deployment is owner-reported; the checked source does not verify a working hosted backend.
- **Growth:** Data scripts, a saved model, web charts, and an AI API develop in parallel, but the deployed demo's request path reaches only saved JSON and an AI text call.
- **Result / limit:** An important first integration and historical deployment milestone. The current app does not run the forecast or database in the request path, and the advice is not grounded in the selected chart. Do not imply live crowd monitoring or a currently working hosted service.

## Toram-Bot01

- **Start:** One of the owner's first Python experiments: automate repetitive Toram farming with timed inputs.
- **Growth:** Fixed loops gain variable timing, buff clocks, a one-pixel mana proxy, and a scripted selling route; failed window-switching attempts stay visible.
- **Result / limit:** A record of incremental automation learning, not a robust unattended bot. The latest script still depends on foreground focus and layout-specific coordinates.

## Era-Odyssey

- **Start:** In grade 11, the owner and friends taught themselves to make their first game by hand and from textbooks, without useful AI coding tools. A companion website gave that game a public face and became the owner's first website.
- **Growth:** Story, creatures, geological information, animation, galleries, team context, and downloads become browsable pages beyond a bare game file.
- **Result / limit:** A static presentation layer for a self-taught team game, not the Unity runtime. Historical downloads need separate availability checking.

## Unity-EraOdesey

- **Start:** The same grade-11, self-taught team wanted geological history inside a game people would keep playing. Credit the friends and the owner's leading contribution without turning it into a solo claim.
- **Growth:** Period stages require enemies and rewards; rewards lead to inventory, crafting, equipment, skills, saves, and educational reading and quiz tasks.
- **Result / limit:** A game that ran for its presentation, preserved here as scripts and selected assets. This checkout is not a complete ready-to-build Unity project, and learning impact was not measured.
