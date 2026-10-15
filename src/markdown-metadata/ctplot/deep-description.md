# CTerminalPlot (`ctplot`)

## A plotting workflow inside the terminal

CTerminalPlot is a C11 library with a `ctplot` command-line front end. It is intended for inspecting numeric data where opening a GUI plotting environment would interrupt the workflow: a C program can populate a `DataSet`, and a shell user can give the CLI a CSV file or piped input. The output is text-based but deliberately visual, using boxed tables, axes, plot symbols, Unicode Braille, and optional ANSI colors. Its runtime dependency target is the standard C library plus `libm`.

The data model stores numeric rows and columns, display names, selected X and Y axes, and style options. Callers can add rows or columns, select data for a chart, filter or search by comparisons, sort, and compute per-column mean, population standard deviation, or mean absolute deviation. The same data object feeds five output types: formatted table, scatter, line, bar chart, and histogram. The CLI parses chart and axis choices and reads CSV, so the library is usable without embedding it in another C program.

## Rendering design

Charts are rasterized onto an internal character canvas. The renderer scales numeric values into terminal coordinates, lays out axes and labels, and then draws points, line segments, bars, or histogram bins. Because ordinary character cells make diagonal lines look coarse, the optional Braille path addresses a 2-by-4 dot matrix within each cell, effectively providing eight addressable dots per terminal character. Braille masks are encoded as UTF-8 at output time. Multi-series plots can use colors; monochrome mode distinguishes series by marker shape and fill. The implementation recognizes the `NO_COLOR` environment convention, while the CLI also offers explicit color control and detects redirected output.

The code treats terminal behavior as part of the engineering problem: UTF-8 rendering, ANSI escapes, table widths, and platform initialization all affect whether a chart is legible. Most logic is plain C; the platform-specific setup is isolated in a small shim. A single library header exposes the public API, while the implementation contains the dataset, data tools, parser, and renderers.

## Verification and boundaries

The repository includes small example programs for setup, adding data, style changes, selecting axes, every major chart type, CSV, monochrome output, and Braille. Assertion tests cover data operations, and golden files capture expected textual output from the examples. The roadmap records future work separately from implemented features. The README says it was developed and tested with MinGW GCC on Windows and is designed to be portable; this should not be read as evidence of exhaustive runtime testing on every platform.

## Evidence and open questions

- `project/ctplot/README.md` — use cases, public features, API, and design explanation.
- `project/ctplot/src/include/CTerminalPlotLib.h` — public data structures and function signatures.
- `project/ctplot/src/CTerminalPlotLib.c` — dataset tools, canvas, Braille rasterization, color behavior, and CSV parsing.
- `project/ctplot/src/ctplot.c` — CLI options and stdin/CSV workflow.
- `project/ctplot/tests/test_ctp.c`, `tests/golden/`, `examples/`, and `Makefile` — examples and verification approach.
- Open question for the owner: Which real workflow first motivated the library, and has it been used outside the included examples?
