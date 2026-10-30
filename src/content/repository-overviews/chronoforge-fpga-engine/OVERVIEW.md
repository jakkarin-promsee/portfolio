## A ROM counter grew into a game engine that runs entirely in FPGA logic.

ChronoForge began with me playing with a small hardware idea: a counter could step through event commands stored in ROM. I wanted to see how far that simple mechanism could go if a game ran as circuits rather than instructions on a CPU. There was no ML hypothesis behind the first counter. The project grew because each new thing I wanted the game to do exposed another piece of system design.

## Growing the runtime and the authoring tools

One counter could schedule an event, but a game needed attacks, platforms, characters, player movement, collisions, UI, and video to happen together. I split the event stream into three ROM-driven timelines and built hardware executors that react to those records. The design had to account for timing between modules and the short deadline for choosing each VGA pixel. The result is a runtime that can pace object patterns, respond to the board's buttons, and draw a 640×480 game without an operating system or instruction loop.

Then I ran into a usability problem: specifying every event as packed numbers by hand would make the engine painful to author for. I added Python classes for stages, objects, and timing; a compiler turns them through JSON into the ROM files the Verilog reads. A previewer lets me inspect a stage before programming the board. The project became both a game engine and the toolchain needed to create games for it.

<!-- overview-media -->

## What the board made real

The showcase above is the engine running on a Basys3 FPGA. It is a working, board-specific system, and its resources are not unlimited: the documented build uses 18,015 of 20,800 LUTs. Growing it from one counter taught me how much the hardware layout changes the cost of timing, communication, and parallel work. It also gave me confidence that designing a new computational substrate was something I could attempt, not just speculate about.

That experience widened the question I was willing to ask next. If I could build a game around the operations that FPGA logic makes natural, could I design a substrate where resident weights and local updates made a different kind of learning practical? That became [Bio-Analog CPU](/repositories/bio-analog-cpu).
