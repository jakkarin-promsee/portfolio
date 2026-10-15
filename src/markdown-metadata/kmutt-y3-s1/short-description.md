# KMUTT Year 3, Semester 1

Categories: [Knowledge Systems, AI Workflows, Education]

Summary: An Obsidian coursework vault designed so an AI agent can navigate a semester without being rebriefed every session. Four course folders combine lecture material, assignments, personal notes, course-specific instructions, and annotated indexes; PDFs receive durable Markdown reading copies when conversion is trustworthy. Python checks and an ingest command keep the file map and links aligned with the vault, while a checkpoint command stages and records work with little daily friction.

Highlights:
- Three-layer context protocol: vault rules, course rules, and annotated file index before source material.
- PDF caching path that chooses cheap text extraction or page-by-page transcription, while `.pdfignore` prevents misleading conversions.
- Link checker validates Obsidian wiki links and Markdown paths; PDF cache checker finds missing reading copies.
- One-command index maintenance and Git checkpoint workflows, with `temp/` intentionally excluded from documentation.

Tech stack: [Markdown, Obsidian, Python, Claude Code workflows, Git]
