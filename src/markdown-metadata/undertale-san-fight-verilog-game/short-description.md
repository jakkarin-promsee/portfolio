# UnderTale: Sans Fight on FPGA

Categories: [FPGA, digital design, game development]

Summary: An unofficial Undertale-inspired survival game expressed as Verilog hardware for the Basys 3 FPGA board. Directional buttons move a heart around an arena of shifting platforms while patterned Gaster Blaster lasers threaten its health; VGA output draws the scene directly from pixel coordinates and sprite ROMs. The prototype brings together video timing, game state, collision, scoring, and palette-based graphics without a CPU or software framebuffer.

Highlights:
- Three-state title, gameplay, and results flow, with a preparation interval before hazards activate.
- Heart movement and jumping, moving-platform landing checks, pseudo-random laser patterns, hit cooldown, and HP display.
- Palette-indexed sprite memory and explicit layer priority drive a 12-bit VGA RGB output.
- Current score and an in-memory best score survive round restarts while the board remains powered.

Tech stack: [Verilog, Digilent Basys 3, Artix-7 FPGA, VGA, Vivado]
