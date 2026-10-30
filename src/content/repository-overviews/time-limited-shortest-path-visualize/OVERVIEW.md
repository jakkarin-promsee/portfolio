## A maze interface let me watch different search algorithms solve the same problem.

Pathfinding is easier to reason about when the visited space and final route are visible. I built a JavaFX application where a maze can be typed, loaded, generated, or selected from examples, then solved with several methods on the same grid. The point was to inspect what each algorithm did, not to treat a timing number from one run as a benchmark.

## Giving each method a common stage

The grid records walls, weights, a start, and a goal. A shared pathfinding interface lets BFS, Dijkstra, A*, and an experimental genetic search return routes that the UI can color. The result panel shows elapsed time, steps, path cost, and visited or evaluated nodes. BFS explores unweighted reachability; Dijkstra and A* account for cell weights; the genetic method evolves candidate walks using a different set of tradeoffs.

Once the algorithms were visible together, implementation details mattered. The view keeps a map from model nodes to screen tiles so it can color a path directly. The genetic search runs in a background task so its longer computation need not freeze the window. The other handlers run directly from the controller, which is part of this version's boundary rather than a polished performance claim.

The repository title mentions a time-limited challenge, but the checked application does not enforce a countdown or search deadline. What this source actually offers is a visual maze solver and comparison tool. Its metrics help someone inspect particular runs; they do not prove a general ranking or optimality for the genetic approach.
