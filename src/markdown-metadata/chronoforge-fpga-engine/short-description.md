# ChronoForge FPGA Pure-Hardware Game Engine

Categories: [FPGA and Digital Design, Game Engine, Developer Tooling]

Summary: A 2D game engine that runs directly as Verilog logic on a Basys3 FPGA, with no CPU, operating system, or interpreted game script. Authors describe stages in Python; a compiler lowers them through JSON into packed `.mem` ROMs that drive event timelines, player physics, collisions, UI, and 640×480 VGA output. The project joins a hardware runtime with its own binary format, authoring classes, compiler, GUI previewer, and documentation, while openly documenting clock-domain and per-pixel timing constraints on a small Artix-7 board.

Highlights:
- Three ROM-driven timelines schedule attack, platform, and character events through hardware counters.
- Independent runtime cores coordinate through a compact handshake; per-object executors move, collide, and render in parallel.
- Python authoring supports procedural bullet patterns, stage/UI settings, and a compile/preview/flash workflow.
- The shipped Basys3 configuration reports 18,015 of 20,800 LUTs and 7,196 flip-flops, with LUTs the binding resource.

Tech stack: [Verilog, FPGA, Xilinx Basys3 Artix-7, Vivado, Python, JSON, Tkinter, VGA]
