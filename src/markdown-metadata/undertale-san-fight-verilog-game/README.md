# UnderTale: Sans Fight on FPGA

An unofficial, educational Verilog project inspired by the final Sans fight in _Undertale_. It targets the Digilent Basys 3 FPGA board and renders a game through its VGA connector. The player moves a heart, avoids Gaster Blaster lasers, and sees the current and best scores after losing all HP.

**Display target:** 640 × 480 VGA at approximately 60 Hz. The source does **not** currently prove that it produces this timing on hardware; see [Implementation priorities](#implementation-priorities). The resolution in the RTL is 640 × 480, not 680 × 480.

## Demo video

<div align="center">

<video src="https://github.com/user-attachments/assets/a90ca825-816f-44bb-8f4a-fe2e0b19cddf" controls width="640"></video>

**▶ [Watch the full system demo](https://github.com/user-attachments/assets/a90ca825-816f-44bb-8f4a-fe2e0b19cddf)**

</div>

## Hardware and project setup

| Item                        | Current design                                                          |
| --------------------------- | ----------------------------------------------------------------------- |
| Board / FPGA                | Digilent Basys 3 / Artix-7 `xc7a35tcpg236-1`                            |
| Tool                        | Vivado; [`UpperTale.xpr`](UpperTale.xpr) was created with Vivado 2015.4 |
| Input clock                 | 100 MHz onboard clock                                                   |
| Video                       | VGA, 4 bits per RGB channel, HSYNC and VSYNC                            |
| Controls                    | Basys 3 directional buttons and center reset button                     |
| Design top / simulation top | `Top` / `TopSim`                                                        |

To build the project:

1. Clone this repository without changing its directory structure, then open `UpperTale.xpr` in Vivado. Newer Vivado versions may request a project upgrade.
2. Check that `Top` is the design top, `xc7a35tcpg236-1` is the selected part, and [`basys3.xdc`](UpperTale.srcs/constrs_1/new/basys3.xdc) is enabled.
3. Check the source set for all required `.v` and `.mem` files in `UpperTale.srcs/sources_1/new/`. Sprite modules load their data by filename with `$readmemh`; missing memory files can break simulation or synthesis.
4. Run **Synthesis**, **Implementation**, and **Generate Bitstream**. Inspect DRC and timing reports before programming the Basys 3.
5. Connect a VGA display, program the board, and use the buttons below.

| Button      | Behavior                                                                             |
| ----------- | ------------------------------------------------------------------------------------ |
| BTNC        | Reset game state, HP, score, and best score                                          |
| BTNU        | Start on the title screen; jump during play; return to the title screen from results |
| BTND        | Move the heart down                                                                  |
| BTNL / BTNR | Move the heart left / right                                                          |

## Architecture guide

### System overview

`Top.v` wires the subsystems together and makes the final color decision for each pixel. There is no CPU or framebuffer: the design generates pixels directly from coordinates, sprite ROMs, geometry checks, and game state.

```text
100 MHz board clock ──> vga640x480 ──> pixel clock, x/y, active, HSYNC/VSYNC
        │                                      │
        └──> clk_div_player_control ──> 1 Hz ─┼──> attack timing / pattern selection
                                               │
buttons ──> HeartSprite ──> heart position ───┼──> collisions ──> HP / game state
                                               │
*.mem ──> sprite/ROM modules ──> palette index ┼──> Top layer priority
pal24bit.mem ──> ColorPaletteRom ──> RGB table ┘         │
                                                         └──> VGA RGB[3:0]
```

Most gameplay and rendering modules receive `pix_clk` from `vga640x480`. `clk_div_player_control` derives a 1 Hz square wave from the 100 MHz board clock. `prime_random_gen` samples that wave in the pixel-clock domain to choose one of six blaster patterns. `BlasterLaserSprite` synchronizes the 1 Hz signal before detecting its rising edge.

### Clock, coordinates, and frame updates

- [`vga640x480.v`](UpperTale.srcs/sources_1/new/vga640x480.v) derives a nominal 25 MHz pixel clock and drives horizontal and vertical scan counters. It exposes `x`, `y`, and `active` to the rest of the design.
- The intended visible area is `x = 0..639`, `y = 0..479`. `Top` forces RGB to black outside `active` or before palette initialization.
- `HeartSprite` and `PlatformSprite` update their positions when they observe `(x, y) == (639, 479)`. That coordinate acts as a once-per-frame update event; movement speed therefore depends on the actual frame timing.
- `Top` uses pixel-clock counters for the roughly two-second preparation delay. `BlasterLaserSprite` uses a 20,000,000-cycle delay (nominally 0.8 s at 25 MHz), and `HealthBar` limits damage to roughly one hit every 5,000,000 cycles (nominally 0.2 s).

The current scan-counter implementation needs correction before the target frame rate can be claimed. See [Implementation priorities](#implementation-priorities).

### Game state and scoring

`Top` has three states:

| State      | Entry and behavior                                                               | Exit                          |
| ---------- | -------------------------------------------------------------------------------- | ----------------------------- |
| `START`    | Draws the start image; hazards are frozen                                        | BTNU enters `GAMEPLAY`        |
| `GAMEPLAY` | Shows a preparation overlay for the configured delay, then enables laser attacks | HP reaching zero enters `END` |
| `END`      | Shows the result image, current score, and best score                            | BTNU returns to `START`       |

The hazard-free preparation interval is controlled by `gameplay_active` and `freeze_hazards`. `HeartSprite` and `PlatformSprite` are instantiated continuously, so their updates are not gated by this state machine. `HealthBar` starts at 10 HP, loses one HP on an accepted hit, and refills when the state returns to `START` from another state.

The score increases on a rising edge of `blaster_laser_active` during `GAMEPLAY` and saturates at 99. `BestScoreMemory` keeps the maximum score in a register. It persists between rounds while the FPGA remains powered, but resets on BTNC and is not stored in nonvolatile memory.

### Player, platforms, and damage

- [`HeartSprite.v`](UpperTale.srcs/sources_1/new/HeartSprite.v) stores the heart's 24 × 24 top-left position. Left/right move by 3 pixels per frame. BTNU starts or sustains a jump when allowed; BTND moves down. The module also applies gravity and clamps movement to the play area.
- [`PlatformSprite.v`](UpperTale.srcs/sources_1/new/PlatformSprite.v) initializes two 64-pixel platforms and moves them horizontally, reversing direction at the arena boundaries. [`PlatformCollision.v`](UpperTale.srcs/sources_1/new/PlatformCollision.v) checks horizontal overlap and a 3-pixel landing tolerance, then reports whether the heart is standing on a platform and at what height.
- [`prime_random_gen.v`](UpperTale.srcs/sources_1/new/prime_random_gen.v) is an LFSR-based pattern selector. Its output chooses one of three laser rows and one of two Gaster Blaster sides. This is pseudo-random and starts from a fixed seed after reset.
- [`BlasterLaserSprite.v`](UpperTale.srcs/sources_1/new/BlasterLaserSprite.v) places a 365 × 42 laser in the chosen row. After the first synchronized 1 Hz rising edge and a delay, it asserts `o_active`; `i_freeze` clears the timer and disables damage during preparation.
- [`HeartHitDetection.v`](UpperTale.srcs/sources_1/new/HeartHitDetection.v) registers an axis-aligned rectangle overlap between the 24 × 24 heart and the active laser. `HealthBar` consumes this hit signal and applies its damage cooldown. The same hit signal causes a red-screen flash in `Top`.

### Rendering and assets

Sprite `.mem` files contain 8-bit palette indices. Index zero is treated as transparent by most sprite modules. A typical image sprite checks whether the current pixel lies inside its rectangle, converts `(x, y)` to a row-major ROM address (`local_y * width + local_x`), and outputs `sprite_on` plus an index. Several sprite and ROM outputs are registered, so their data arrives after one or more pixel-clock edges; additions must account for this latency.

[`ColorPaletteRom.v`](UpperTale.srcs/sources_1/new/ColorPaletteRom.v) reads 192 bytes from `pal24bit.mem`, representing 64 RGB colors. `Top` copies those bytes into its local palette and converts each 8-bit color channel to the upper 4 bits sent to VGA. `Top` chooses the first active layer for the current state. In `GAMEPLAY`, the effective order is: preparation overlay (during preparation), hit flash, Sans, HP decoration, bottom bar, HP/score digits, HP bar, Gaster Blaster, arena border, heart, platforms, laser, and background. `START` and `END` have their own layer choices.

The arena border comes from `GroundSprite`; the moving platforms have both a tile ROM and collision geometry. The current top-level renderer uses a fixed palette index for platform pixels, even though `PlatformSprite` also provides ROM data. To replace or add art, update the relevant `.mem` file and its sprite dimensions/addressing, then check the layer priority and read latency in `Top`.

### Source map

```text
UpperTale.xpr                         Vivado project (created with 2015.4)
UpperTale.srcs/
  sources_1/new/
    Top.v                             state machine, wiring, compositing, score
    vga640x480.v                      scan timing and pixel clock
    clk_div_second.v                  1 Hz square-wave generator
    prime_random_gen.v                blaster pattern selection
    HeartSprite.v, HeartRom.v         player movement and artwork
    PlatformSprite.v, PlatformCollision.v, platform_rom.v
    BlasterLaserSprite.v, GasterBlasterSprite.v, GasterBlasterRom.v
    HeartHitDetection.v, HealthBar.v, BestScoreMemory.v
    ColorPaletteRom.v, NumberSprite.v, *Sprite.v
    *.mem                              image, digit, and palette data
  constrs_1/new/basys3.xdc            board pin and clock constraints
  sim_1/new/TopSim.v                   basic simulation stimulus
```

`BeeSprite`, `BeeRom`, `Debounce`, and `gaster_laser_collision` exist in the source directory but are not instantiated by `Top`. `Debounce` is a potential starting point for button conditioning, though its output is a pulse and movement currently depends on held button levels.

## Extending the design

1. Choose the owner of the new behavior: `Top` for state and final layer order, a gameplay module for movement/collision, or a sprite module plus `.mem` for artwork.
2. Keep gameplay positions in the same visible-pixel coordinate system (`0..639`, `0..479`). Define sprite bounds and collision bounds together so art and hitboxes stay aligned.
3. Update motion on a single frame event or a clock enable. Keep counters and cross-domain signals synchronized to the clock domain that consumes them.
4. For a new image, add its `.mem` to the Vivado source set, compute the row-major address, define whether index zero is transparent, and align its registered output with the current pixel.
5. Instantiate the module in `Top`, connect reset and clocks, and place it deliberately in the state-specific layer priority. Check whether its color indices fit the 64-color palette.
6. Add a focused simulation check for the new behavior, then run synthesis, implementation, DRC, and timing checks before testing on hardware.

## Simulation and validation

Select `TopSim` as simulation top and run **Behavioral Simulation** in Vivado. The existing [`TopSim.v`](UpperTale.srcs/sim_1/new/TopSim.v) supplies clock/reset stimulus and exposes internal signals for waveform inspection. It does not press BTNU, assert expected results, or verify a full round. Its `#1` clock period is also not a 100 MHz board-clock model. Treat it as a debugging scaffold rather than a passing gameplay test.

A useful validation sequence for continued work is: verify one 640 × 480 frame and sync periods; start the game; measure the preparation interval; confirm pattern changes and laser activation; test collisions and the HP cooldown; reach `END`; restart; and check both score displays. Repeat the video and control checks on a Basys 3 with a VGA monitor.

## Implementation priorities

1. **Correct and measure VGA timing.** `vga640x480.v` updates scan counters inside a 100 MHz clocked block while `o_pix_clk` is high, rather than once per pixel-clock edge or clock-enable pulse. Its active flag also checks only the start of the visible region. Fix the scan timing and blanking, then measure HSYNC, VSYNC, and frame rate before describing the output as 640 × 480 @ 60 Hz.
2. **Make initialization deterministic.** `Top.v` uses `init_done` to gate video but does not reset or initialize that register. Reset it explicitly, then verify that the 192 palette bytes load before RGB output begins.
3. **Clean project references.** The `.xpr` simulation file set still references missing files (`BlasterLaserRom.v`, `heart_collisions.v`, `heartCollision.v`, and `platform_collision.v`). Remove stale references and check that every active sprite `.mem` is included in the correct source set.
4. **Condition physical button inputs.** `Top` currently wires raw button levels into gameplay and state transitions. Add appropriate synchronization/debouncing, preserving held levels for movement and using press events where a single transition is intended.
5. **Verify the rendering pipeline.** Several sprite ROMs and `sprite_on` signals are registered while other layers are combinational. Check pixel alignment, transparency, and overlay priority in simulation after changing video timing or artwork.

No bitstream or timing/DRC results are included in this repository. Vivado build directories are excluded by `.gitignore`; keep the RTL, constraints, and required `.mem` assets under version control.

This is an unofficial fan-made educational project and is not affiliated with or endorsed by the creators of _Undertale_.

## License

Original code and documentation authored by Jakkarin Promsee are licensed under the [MIT License](LICENSE). Third-party code, assets, datasets, and other materials are not covered by this license; their original terms apply.
