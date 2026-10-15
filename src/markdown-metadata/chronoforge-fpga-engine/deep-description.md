# ChronoForge FPGA Pure-Hardware Game Engine

## A game engine made from state transitions

ChronoForge asks what a 2D game runtime looks like when game events are implemented as direct hardware logic rather than instructions executed by a processor. It targets the Xilinx Basys3 Artix-7 board and generates 640×480 VGA at 60 Hz. The repository describes a personal exploration that grew from a counter indexing ROM event commands into a complete authoring-to-display system. Game logic is compiled before deployment; the FPGA reads packed object records, advances timelines, reacts to input/collisions, and renders pixels without a CPU or OS.

The scope is larger than one RTL circuit. The project contains an authoring language built from Python classes, a staged compiler, a binary ROM format, an optional Tkinter layout/timing preview, Verilog runtime cores and object executors, font tooling, pin constraints, a Vivado project, documentation, and a showcase video. The README credits “Night” for the end-to-end work; that attribution should be retained as documented rather than inferred from the portfolio owner's GitHub account alone.

## The meaning stack from stage script to BRAM

An author writes a Python function returning a `GameStage` or `GameUIStage`. Classes represent a stage manager, attack objects, platform objects, player/game properties, UI, and character/glyph elements. Objects can specify position, size, one of eight movement directions, speed levels, waiting time, destruction timing, and other runtime controls. Ordinary Python loops can generate repeated or varied bullet patterns. The game stage and UI stage also configure play area, gravity, display bounds, HP readout, and health bar.

The toolchain lowers this expressive source in stages: Python objects to per-stage JSON, JSON decoding/folding to bit-packed `.mem` files, then BRAM initialization in Vivado. The separately generated font ROM completes the six loaded ROMs. This “meaning stack” keeps game authors out of raw hex while giving the hardware a flat deterministic format. The previewer lets a stage be inspected before programming the board. The exact authoring API, fields, compiler sequence, and ROM layouts are described in `docs/python-guide.md` and implemented in `tools/`.

## Three hardware timelines and cooperating cores

Attack, platform, and character timelines are independent ROM index counters. Each advances when the current row's `wait_time` expires. The Attack timeline is the global epoch: reaching its terminal header resets the game. A zero-size null object still consumes its wait time, so pauses and wave pacing can be encoded without drawing anything. The hardware has no central script interpreter; the ROM row and counter state together define the next event.

The architecture puts decisions into three main runtimes: `game_runtime` for non-player gameplay and stage timelines, `game_ui_runtime` for HUD and visual character events, and `player_position_controller` for buttons, physics, and collisions. ROM readers and numerous per-object executors do narrower work. Hardware instances for triggers, colliders, and characters operate in parallel, with small synchronization handshakes connecting runtime responsibilities. The top-level RTL, game runtime, ROM readers, object controllers, renderer, and player modules implement the design; the architecture guide traces their interfaces and explains clock-domain crossing.

The default object pool is 56 dynamic attack objects, 25 dynamic platform objects, and 79 character slots. ROM capacity is a different number: the README estimates up to 25,000 attack records, 28,125 platform records, or 75,000 character records from the Basys3's approximate 225 KB BRAM budget at 9, 8, or 3 bytes per record. Those are storage maxima, not simultaneous live executor counts.

## Engineering constraints that shaped the design

The 100 MHz input is divided into a 25 MHz VGA pixel clock, 1 kHz calculation/synchronization clock, and several 100 Hz behavior/time clocks. A 25 MHz pixel period gives only about four 100 MHz cycles for pixel selection. The workload cannot afford deep chains across all live objects. The renderer therefore bitwise-ORs object pixel-presence signals and uses a fixed-priority color choice, rather than a long serial decision chain. This is the documented response to the display deadline; it also makes priority rules explicit.

Independent runtime cores made event coordination difficult. Earlier, more autonomous modules produced redundant decisions and nonlinear communication timing. The documented redesign concentrates decisions into three “mother” runtimes and leaves other modules as simpler executors. Handshakes originally run at 100 Hz could cost several checks per spawn and create visible lag near 0.03 seconds; raising the calculation/synchronization domain to 1 kHz reduced that latency while retaining cheap 100 Hz movement clocks. Clock-domain crossings and multi-cycle handshakes remain core design concerns, not incidental implementation details.

In the shipped Basys3 configuration the README reports 18,015/20,800 LUTs (87%), 7,196/41,600 flip-flops (17%), and six of 32 BUFG resources. LUTs are the binding resource, making the “parallel object instances” design a real capacity trade-off. The documentation also acknowledges code and naming inconsistency from feature-by-feature growth; the guides were written to make the actual RTL contracts readable.

## What can be made and how it runs

The player can use four on-board directional buttons and reset with switch `SW0`. The engine can draw dynamic attack and platform objects, character glyphs/text, a configurable game area, gravity, hitbox-sensitive player damage, HP bar, and live `HP ###/###` text. A normal workflow compiles Python stages to JSON, optionally previews them, compiles the ROM images, generates a Vivado bitstream, programs the Basys3 over USB, and connects VGA. The showcase asset demonstrates the running system; the repository does not claim portability to every FPGA without retiming or resource work. Its guide says board pin changes are needed for a non-Basys3 target, while the actual RTL resource and clock constraints still matter.

## Evidence and open questions

- `project/chronoforge-fpga-engine/README.md` states the end-to-end purpose, features, resource figures, challenges, workflow, and credits.
- `project/chronoforge-fpga-engine/docs/hardware-architecture.md` traces the runtime, timeline, handshake, module, and clock-domain architecture from RTL.
- `project/chronoforge-fpga-engine/docs/python-guide.md` documents stage authoring and the compiler; `docs/hardware-guide.md` documents building and configuring the board.
- `project/chronoforge-fpga-engine/tools/` contains the Python authoring/compiler/preview implementation; `verilog/sources/` contains the RTL; `mem/` contains compiled images; `vivado/ChronoForge.xpr` is the board project.
- `project/chronoforge-fpga-engine/assets/ChronoForge-FPGA-Showcase.mp4` is the demonstration artifact.
- **Open question:** The README uses “we” in several engineering passages but credits Night with the end-to-end design. Confirm the relationship between that name, the portfolio owner, and any collaborators before making personal-contribution claims.
