## Making a game bot challenging took more than giving it a state machine.

I wanted to make a game and find out how its bots actually worked. A finite state machine could tell an enemy when to patrol, chase, or attack; the harder question was how to make it demanding enough that the player had to stay alert without making every fight frustrating or impossible. Rebirth began with a sample map and a shooting system. From there, the game grew as I worked out both sides of a fight: what the player could do and how an opponent should respond.

## Making combat more than a firing loop

Movement, a dash, knockback, and different guns gave the player ways to act, but enemies needed more than a straight chase to make those choices matter. Regular enemies gained patrol, pursuit, circling, short repositioning, dodging, attacks, and recovery. Five enemy types tune that shared controller with different weapons, ranges, speeds, and timings. The hard part was tuning those choices and timings: I wanted enemies that kept pressure on the player while leaving enough room to react. The seven player weapons also do different jobs, from sword reflection and shotgun spread to piercing magic and a rocket's burn effect. With only three inventory slots, picking up another weapon means giving one up.

Then the fights needed a shape beyond individual encounters. Entering a room closes its doors; waves spawn on valid floor tiles, and clearing them opens the route again. Treasure rooms change what the player can carry into the next fight. The Spirit King required a separate design: navigation, visible warnings before attacks, six special moves, and three phases as its health falls. A dialogue choice earlier in the prison escape changes the ending. The game became a route through escalating encounters rather than a collection of combat mechanics.

<!-- overview-media -->

## What came together in the playable game

The showcase above gives a quick view of those systems in motion. Rebirth is a playable browser game built in Unity and C#, with rooms, weapon decisions, distinct regular enemies, a boss fight, and an ending. The repository contains the scenes, prefabs, configurations, and scripts behind that experience. It was made with collaborators; the source and game are the team's work. For me, the project made game AI a design problem as well as a coding problem: the bot's behavior had to serve the pace and fairness of the whole game.
