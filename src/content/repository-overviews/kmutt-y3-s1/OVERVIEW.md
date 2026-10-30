## A semester vault became a way to give an AI agent context once and keep it findable.

In coursework, I kept running into the same setup cost: each new chat needed the slides, assignment rules, deadlines, and course background explained again. Image-heavy PDFs made that slow and sometimes unreliable. I organized my third-year semester as an Obsidian vault that a person can browse and an agent can enter without a fresh tour each time.

## Building a map before asking for an answer

The structure has three levels. Root instructions explain how to use the vault; each course has its own rules and facts; an annotated index says what individual files contain. The agent can start with a small map and open only the relevant source. Four courses share that shape, while lecture files, assignments, notes, and scratch work have different places.

Adding a document created the next problem: an index becomes stale unless it is maintained. An ingest command updates course maps and checks links. PDFs can receive Markdown reading copies, using text extraction where it works and page-by-page transcription for math or figures. Those copies are caches, not replacements for the original PDF; files that would convert misleadingly can be excluded. Python checks catch broken Obsidian links and missing reading copies, and a checkpoint command makes saving the vault to Git less cumbersome.

The repository is real coursework as well as a context-engineering workflow. It shows how I tried to make information discoverable and reusable across sessions without treating an agent's summary as the authoritative source. The structure is intentionally more elaborate than a folder of notes; its benefit is easier navigation, while actual time or token savings have not been measured here.
