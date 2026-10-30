## A C11 library draws useful charts without leaving the terminal.

Ctplot began as a first-year C final project: I tried hand-built object-like structures, a dynamic array, and a terminal plotter before AI coding help was useful. I wanted to see data where I was already working. I later returned to the course experiment, fixed correctness and memory-safety problems, and turned it into a linkable library and command-line tool for in-memory datasets or CSV input.

## From data structure to visible output

A shared dataset model keeps rows, columns, selected axes, and style choices together. The renderer maps numbers onto a character canvas, then uses UTF-8 box drawing, ANSI color, and optional Braille cells for smoother curves. The CLI makes the same plotting path available to a shell workflow without writing a C program. Runtime dependencies stay within the C standard library and `libm`.

<!-- overview-media -->

The current version draws tables, scatter plots, line charts, bar charts, and histograms. Reworking the early experiment helped me carry a design from data abstraction through an API and parser to something a person can read on screen. Examples, assertions, and golden output snapshots cover its main behavior. The README documents Windows MinGW testing and a portability goal; the repository does not establish exhaustive testing on every platform.
