# CTerminalPlot (`ctplot`)

Categories: [systems programming, developer tools, data visualization]

Summary: A C11 plotting library and command-line tool that turns in-memory datasets or CSV files into readable terminal tables and charts. It implements table, scatter, line, bar, and histogram views with UTF-8 box drawing, ANSI color, monochrome markers, and an optional high-resolution Braille mode. The project also includes data operations, examples, tests, and golden output snapshots while keeping runtime dependencies to the C standard library and `libm`.

Highlights:
- Uses a shared dataset abstraction for plotting, column selection, filtering, sorting, and statistics.
- Renders curves on a 2 × 4-dot Braille grid per terminal cell for smoother lines.
- Supports `NO_COLOR`, explicit monochrome output, and a CSV-driven CLI suitable for pipes.
- Includes assertion tests and golden snapshots for examples and rendering output.

Tech stack: [C11, Make, UTF-8 terminal graphics, ANSI escape sequences, Braille glyphs, CSV]
