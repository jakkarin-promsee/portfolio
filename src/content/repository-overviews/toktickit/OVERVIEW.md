## An IT ticket system became an exercise in building and reviewing software as a team.

TokTickIT was a software engineering course project with a final-project deadline. I used that space to see how far a support workflow could be taken beyond a ticket form. The visible product lets people report problems, IT staff work a shared queue, and administrators manage accounts. The other challenge was how to keep a growing team codebase coherent: a ticket could look finished in one screen while its access rules, status transitions, attachments, or tests were still wrong elsewhere.

## Turning a workflow into a contract

The three roles led to different views of the same record. Requesters can create tickets and see their own comments and attachments. IT staff can triage, claim, prioritize, and move work through allowed states, with internal notes kept separate. Administrators can manage users and inspect tickets without becoming another support agent. The client hides irrelevant actions, but the API enforces ownership and role rules independently; the interface is not the security boundary.

As the lab releases grew, the team wrote specifications and API contracts, broke work into issues and feature branches, and used peer-reviewed pull requests. Tests covered server routes, client behavior, and browser journeys for the different roles. Separate test data kept those checks from changing development records. Review comments and acceptance criteria became part of how the product was designed, not just a final cleanup step.

The result is a functioning course service desk with a documented issue-to-PR trail. I led much of the build, and the value here is both the user workflow and the discipline of specifying, testing, and reviewing a system that several people change. The repository does not establish use by a real IT department; the deadline framed how far this experiment could go.
