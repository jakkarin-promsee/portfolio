## A repetitive game routine became one of my first experiments with Python automation.

I wanted to see how far timed keyboard and mouse actions could take a Toram Online farming routine. The earliest scripts were fixed loops: press a skill, attack, wait, repeat. They worked only under narrow conditions, so each later version tried to remove one source of friction rather than starting from a complete bot design.

## Adding just enough awareness to the loop

The bow scripts gradually added varied timing, buff renewal tracked by wall-clock time, a rough mana check from one screen pixel, and a scripted trip to sell inventory. The latest routine calculates clicks relative to the game window and checks that Toram is in the foreground before acting. Separate files record attempts to switch away from or hide the window so the computer could be used for something else; the README marks those approaches as unsuccessful.

Those revisions made the script more capable but also exposed its limit. One pixel is only a fragile proxy for game state. Fixed coordinates, loading delays, and the need for an active window make the selling route dependent on a particular screen layout and timing. The repository is a personal automation experiment with a readable progression of attempts, not an unattended or general-purpose game agent.

I keep it as an early record of learning to turn an observed routine into code, then noticing what the code still could not see. The successive versions and failed side experiments are more revealing than a claim that the final script solved automation completely.
