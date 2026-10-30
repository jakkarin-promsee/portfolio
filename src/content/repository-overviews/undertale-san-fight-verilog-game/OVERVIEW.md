## I tried to make an Undertale-inspired fight run as FPGA logic instead of software.

I used a course project to play with a familiar survival challenge under a hardware constraint: what would an Undertale-inspired fight look like if the board itself handled play and video? A heart moves around an arena, jumps onto moving platforms, and avoids patterned laser attacks. There is no CPU executing a game loop or framebuffer holding a finished image; Verilog modules update state and decide what color each VGA pixel should be.

## Building a round from independent circuits

Board buttons control the heart. Other modules move platforms, select laser patterns, detect overlaps, count health and score, and move between title, gameplay, and results states. The renderer uses sprite memories and palette indices, then chooses a visible layer for each scan coordinate. A short preparation interval gives the player time before hazards start. Reaching zero health ends the round, while the best score remains in a register until power is lost.

Putting these pieces together exposes a different kind of game-design constraint. Video timing, sprite-memory latency, button input, and collision logic have to agree at hardware speed; a visual bug may be a clock or layer-alignment problem rather than a drawing error. The repository includes the Verilog source, Vivado project, board constraints, and a linked demonstration.

This is a hardware-game prototype, not a verified finished release. Its README documents timing, reset, blanking, and button-conditioning work that still needs validation. The 640 × 480 display is a design target in the source, while a measured frame rate and a clean current synthesis report are not established by this checkout.
