## A classroom need gave my full-stack experiment a real direction.

I knew a teacher who needed a better way to turn teaching material into something students could question and discuss. That gave Hot Potato a real use case. I also wanted to push myself through a substantial full-stack build: a dynamic editor, an AI API woven into authoring and discussion, and data that had to move reliably between authoring, storage, and learning. The first practical step was to make a lesson editable online. As soon as someone else had to read and respond to it, the project grew beyond an editor.

## From an editor to a student experience

The editor grew from text into a document that could hold drawings, media, formulas, and several kinds of question. Getting those pieces onto a canvas was only part of the problem: they had to survive saving and reopening, then render as the same lesson on a student's phone. That pushed me across the client, API, and database. The lesson document became the common source for editing and viewing; the server had to manage access, answers, and later conversations around it. A teacher could now publish a lesson, while a student could find it, answer in it, and get feedback.

But feedback alone still ended the interaction too quickly. The first AI routes answered individual requests; they did not make a sustained conversation about the teacher's lesson. I rebuilt that path around one tutor flow that loads the published lesson on the server, keeps the conversation in context, and lets the student ask another question. Teacher-facing AI took a different shape: it can propose a draft from existing notes or worksheets, but the teacher previews and accepts what enters the lesson. Those decisions kept the teacher responsible for the material while making the AI useful on both sides of it.

<!-- overview-media -->

## What the finished product lets people do

Teachers can author, preview, guide the tutor for each lesson, and publish. Students can read public lessons, try questions, and talk with the tutor without signing in; an account adds saved answers and history. The student path is Thai-first and designed for phones and people with little technical experience. The two screens above show the teacher's workspace and the student's discussion, which only make sense together as one learning flow.

This repository is the **system map** for that flow. The separately deployable [client](/repositories/hot-potato-client) contains the editor and student interface; the [server](/repositories/hot-potato-server) stores lessons and owns the tutor's trusted lesson context. The product was deployed, and a teacher's need helped shape it. The source shows what was built and how it connects, while actual classroom use and measured effects on learning remain open questions.
