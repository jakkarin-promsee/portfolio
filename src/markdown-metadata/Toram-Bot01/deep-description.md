# Toram-Bot01

## An automation experiment that evolved in public

Toram-Bot01 is a collection of Python scripts for automating repetitive farming actions in the Toram Online desktop game. The README names `Bow-bot04.py` as the latest version and explains what each earlier attempt added or failed to solve. `Magic-bot01.py` and `Bow-bot01.py` established timed keypress loops. `Bow-bot02.py` added randomized parameters to reduce fixed action patterns. `Bow-bot03.py` introduced datetime-based tracking for buff timing. The fourth bow script adds a selling routine and a mana check. The progression is itself useful evidence of iterative problem solving: the code changes in response to observed timing and inventory-management weaknesses rather than appearing as a single finished design.

## How the latest script operates

The main loop first activates or checks the `ToramOnline` window and acts only when it is the foreground window. PyAutoGUI sends attack and skill keys, with small random variations in repetitions and waits. A pixel at a coordinate relative to the game window is used as a rough mana indicator before a skill key is pressed. Datetime deltas count down two buff timers and a longer selling interval. When selling is due, scripted mouse movement and clicks navigate to a merchant, select grid positions in the inventory, confirm sales, and return. The script also makes occasional movement and mouse actions. `ReadMousePosition.py` helps inspect coordinates for setting up those scripted clicks.

This design depends on the game client being open and foregrounded. Mouse coordinates are calculated from the window origin but still assume a particular interface layout, screen geometry, loading time, and inventory pattern. The check for mana samples one pixel and compares it with a chosen dark color; it is not a semantic read of game state. The selling routine uses long fixed sleeps and a predetermined sequence. These are practical constraints of desktop input scripting and explain why the README explicitly warns that the game must remain visible.

## Failed ideas and scope

The repository retains two separate experiments: rapidly switching windows to allow other computer use and hiding the game window. The README marks both as not working for the intended purpose, citing switching delays and the fact that hiding a window does not free the user from foreground interaction. There is no evidence of a game API, computer-vision model, headless operation, or reliable performance measurement. The portfolio value lies in timed state handling, UI-coordinate automation, and documented iteration, with its fragility stated honestly.

## Evidence and open questions

- `project/Toram-Bot01/README.md` — version history, capabilities, weaknesses, and failed ideas.
- `project/Toram-Bot01/Bow-bot01.py` through `Bow-bot04.py` and `Magic-bot01.py` — progression of automation logic.
- `project/Toram-Bot01/Bow-bot04.py` — foreground checks, mana pixel, buffs, selling, and randomized actions.
- `project/Toram-Bot01/Idea1-FastSwap.py`, `Idea2-HideGame.py`, and `ReadMousePosition.py` — experiments and setup utility.
- Open questions for the owner: Which version did you actually use in play, for how long, and what problem first made you try automation? No measured farming gains are documented.
