# KMUTT Year 3, Semester 1

## A semester as an agent workspace

This repository is both third-year Computer Engineering coursework at KMUTT and the system for working with that coursework. It currently organizes Operating Systems (CPE333), Software Engineering (CPE334), Machine Learning (CPE342), and Engineering Economy (PRE380). Course folders contain lecture files, assignment briefs and work, notes, a course-specific `CLAUDE.md`, and an annotated `INDEX.md`. The consistent shape means an agent can enter an unfamiliar course and find the right material without a fresh verbal tour. The vault is also usable in Obsidian, with its configuration committed.

The motivation is unusually explicit in the README: repeatedly pasting and explaining slides, policies, deadlines, and course context to a new chat wastes effort, and image-heavy PDFs can be expensive or inaccurate for machine reading. The design pays the extraction and indexing cost once per document, then lets later questions read a small map and the relevant cached text. This is a context engineering project as much as a note collection.

## The context protocol and ingest path

At the root, `CLAUDE.md` explains the vault-wide method; each course's `CLAUDE.md` holds its facts and policies; its `INDEX.md` is an annotated map that says what each document contains; only then does an agent read an individual source. The index is deliberately more than a filename list. It can answer location questions directly and steer detailed questions to one file.

The `/update-index` command is the ingest workflow. After a user drops a file into `lecture/`, `assignment/`, or `note/`, it scans for missing PDF caches, creates reading copies, updates the index and relevant course facts, and checks links. For prose-heavy PDFs, text extraction is cheap. For math and figures, the documented procedure uses a temporary subagent to read pages and transcribe formulas into LaTeX. The original PDF remains authoritative when exact values, equations, figures, or wording matter; the Markdown is a lossy working copy. A `.pdfignore` can exclude PDFs such as tabular interest-factor sheets whose extracted columns would be dangerously wrong.

Obsidian wiki links connect actual files and create backlinks. `check-links.py` checks links and anchors, ignoring code and math examples so syntax demonstrations do not become false errors. `check-pdf-cache.py` detects uncached PDF/PPTX reading copies and honors exclusions. The separate `save-checkpoint.py` stages and commits the vault, optionally pushing; its purpose is to keep Git aligned with a messy but real daily workflow. `temp/` is intentionally outside the indexes and instruction files so scratch work does not create documentation overhead.

## The values visible in the implementation

The repo favors durable plain text, discoverable structure, and low-friction commands. It treats machine-readable summaries as caches with a fidelity hierarchy: source PDF first, Markdown cache second, index last. It also encodes academic boundaries in per-course instructions: the agent should teach and reason with the student rather than generate submission-ready answers against class policies. The README openly calls the system overengineered for homework, but the extra structure serves the author's desire to avoid repeated context setup and drift.

## Evidence and open questions

- Sources: `project/kmutt-y3-s1/README.md`, `project/kmutt-y3-s1/CLAUDE.md`, `project/kmutt-y3-s1/.claude/commands/update-index.md`, `project/kmutt-y3-s1/check-pdf-cache.py`, `project/kmutt-y3-s1/check-links.py`, `project/kmutt-y3-s1/save-checkpoint.py`, and the four course `INDEX.md` files.
- The README documents the author's own motivation. It does not measure time or token savings, the number of documents ingested, or how often the workflow was used. Ask the owner for a concrete before-and-after study session or failure that shaped the design.
