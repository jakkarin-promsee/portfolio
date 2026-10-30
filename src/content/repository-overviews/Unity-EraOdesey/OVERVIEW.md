## Our high-school game used combat and progression to invite players into geological history.

Era Odyssey was the first game I made with friends in grade 11, for a learning-technology competition. We learned Unity and game development ourselves and wrote the game by hand with textbooks and experimentation, at a time before AI coding tools were useful to us. We wanted geological history to sit inside a game people would keep playing: move through Earth's periods, meet their creatures, fight, collect materials, grow stronger, and answer questions about the era. This repository preserves the Unity/C# side of that effort; the [companion website](/repositories/Era-Odyssey) introduces its world and download paths.

## Connecting the game loop to the lesson

Stages in the Cambrian, Ordovician, and Silurian periods organize encounters and bosses. Defeated enemies award experience and materials; crafting and equipment feed the next stage. Fire, Water, Frost, and Earth skills add another progression layer. A Book of Era lets players read topic material, while a timed true/false activity turns part of that material into a play task. JSON save data ties progress, inventory, equipment, and skills across sessions.

The game became more than one combat scene because those systems had to support each other. A stage needed creatures and rewards; rewards needed inventory and crafting; progression needed a reason to return; the educational material needed a place in the loop. The source shows those connections through its controllers and data classes, while the original presentation is recorded in the README.

This checkout is a **partial source archive** of scripts and selected assets. It does not contain the complete Unity project settings and packages needed to verify a fresh build directly from this folder. The repository records a game that ran for its presentation, but this page does not claim that the archived checkout is a ready-to-open release or that its educational effect was measured.
