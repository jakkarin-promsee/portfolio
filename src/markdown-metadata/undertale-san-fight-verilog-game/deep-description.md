# UnderTale: Sans Fight on FPGA

## A game built as a circuit

This is an unofficial educational hardware interpretation of the Sans battle from *Undertale*. The visible player character is a heart; the player navigates an arena, jumps onto moving platforms, and avoids Gaster Blaster laser attacks. The challenge of the project is that all gameplay and rendering are described in Verilog for a Digilent Basys 3, rather than implemented as a program on a CPU. The design targets a 640 × 480 VGA display, takes input from board buttons, and produces four bits per RGB channel plus horizontal and vertical sync.

`Top.v` joins several relatively independent hardware blocks. `vga640x480.v` supplies the scan coordinates, active-video indication, sync outputs, and nominal pixel clock. Each sprite module decides whether it covers the current coordinate and produces a palette index; `Top` chooses the first active sprite in its state-specific layer order, looks up a 24-bit palette color, and sends the high four bits of each component to VGA. Sprite images and digits are stored as `.mem` files, usually with index zero treated as transparent. This is direct pixel generation rather than a stored full-frame image. The registered outputs of some ROMs create latency that has to be considered when adding artwork.

## Round and hazard logic

The `Top` state machine moves between `START`, `GAMEPLAY`, and `END`. Up starts play from the title screen. Gameplay begins with a roughly two-second preparation overlay; then laser attacks are enabled. When the ten-point health bar reaches zero, results show both the round score and best score. Up returns to the title screen; center resets game state, HP, and scores. The score increments at laser activation and saturates at 99. `BestScoreMemory` holds the maximum between rounds in a register, so it does not survive power loss.

`HeartSprite` stores the 24 × 24 player's position, applies left/right movement, jumping, gravity, downward input, and play-area clamps. Two 64-pixel platforms move horizontally and reverse at arena edges. `PlatformCollision` checks horizontal overlap and a narrow landing tolerance. Laser pattern selection comes from a fixed-seed LFSR in `prime_random_gen`: it chooses among three laser rows and two blaster sides. `BlasterLaserSprite` schedules laser activation after a synchronized timing event and delay. An axis-aligned overlap from `HeartHitDetection` enters `HealthBar`, which rate-limits accepted damage and triggers the red hit flash. Several counters derive real-time effects from assumed clock rates, making video timing accuracy central to gameplay speed.

## Engineering status and constraints

The repository includes a Vivado project, board constraints, Verilog modules, sprite/palette memories, a basic simulation top, and a linked demonstration video. It does not contain a committed bitstream, timing report, or DRC result. The README identifies concrete unfinished engineering work: `vga640x480.v` updates scan counters while a divided clock is high instead of once per pixel edge or enable; active-video blanking is incomplete; `Top` does not deterministically reset `init_done`; the Vivado project still references absent simulation files; and raw buttons need synchronization and debouncing. `TopSim.v` supplies a debugging clock and reset but does not verify a complete game. Accordingly, the documented display resolution is a design target, not a measured 60 Hz hardware result.

## Evidence and open questions

- Sources: `project/undertale-san-fight-verilog-game/README.md`, `UpperTale.srcs/sources_1/new/Top.v`, `HeartSprite.v`, `PlatformSprite.v`, `PlatformCollision.v`, `BlasterLaserSprite.v`, `HeartHitDetection.v`, `HealthBar.v`, `ColorPaletteRom.v`, `vga640x480.v`, `prime_random_gen.v`, and `UpperTale.srcs/sim_1/new/TopSim.v` (paths after repository root).
- The linked video shows a system demonstration, but the repository does not establish the precise board performance or whether the current checkout synthesizes successfully.
- Ask the owner: What motivated the Undertale choice, which modules were personally built versus contributed by teammates, and what was demonstrated on physical hardware?
