# Time-Limited Shortest Path Visualize

## What a user can explore

The repository contains a JavaFX desktop application for experimenting with paths through a maze. The user can type a grid, load a text file, select from six bundled examples ranging from 15 × 15 to 100 × 100, or generate a maze. The input view previews the text as a tile grid. After moving to the solver view, the user chooses a search algorithm and sees the resulting route highlighted with a distinct color. Labels report elapsed milliseconds, path cost, number of steps, and visited or evaluated nodes. This makes differences between search methods visible in the same maze instead of leaving them as console output.

The grid model stores `Node` objects with coordinates and properties such as wall, start, goal, void, and weight. The view parses text into that model, creates rectangles and weight labels, and keeps a node-to-rectangle map so paths can be colored without searching through all JavaFX children. Traversal is four-directional. The common `PathFindingAlgorithm` interface lets each algorithm accept the same grid, start, and end nodes and return a node path.

## Search methods and their differences

BFS explores unweighted reachability, while Dijkstra and A* use cell weights. A* combines the accumulated weight with Manhattan distance, matching the grid's four-direction movement. Search implementations reconstruct routes through predecessor maps and expose counters used by the UI. The genetic search takes a different approach: it creates a population of candidate walks, biases random steps toward the goal, ranks paths using cost, distance and loop penalties, keeps survivors, and performs crossover and mutation. Its configuration in the controller sets population, mutation, generation, and path-length limits. The GA handler uses a JavaFX `Task` and a background thread; the BFS, Dijkstra, and A* handlers are invoked synchronously from the controller.

This is an algorithm exploration rather than a proven benchmark. Runtime and visited-count labels are useful for inspecting a run, but the code does not establish controlled comparisons or algorithmic optimality for the genetic method. The repository also contains a `GaComplex` class whose `findPath` method is a placeholder returning start and end; the solver UI invokes `GaSimple`. The README's structure section includes some planned class names that do not match the current source tree, so the source is the better guide to actual behavior.

## Scope and open interpretation

The repository name and GitHub description mention a time-limited challenge. In the inspected application controllers, no countdown or deadline controls whether a search succeeds. The current demonstrable result is a visual maze solver with timing measurements, not a verified time-limited navigation game. That distinction should stay visible in a portfolio description until the owner explains the title or additional context.

## Evidence and open questions

- `project/time-limited-shortest-path-visualize/app/src/main/java/org/the/maze/runner/controller/InputController.java` — maze input, examples, file loading, generation, and preview.
- `project/time-limited-shortest-path-visualize/app/src/main/java/org/the/maze/runner/controller/GridController.java` — algorithm actions, UI metrics, and GA task.
- `project/time-limited-shortest-path-visualize/app/src/main/java/org/the/maze/runner/ui/GridView.java` and `model/Grid.java` — parsing, rendering, node mapping, and four-way neighbors.
- `project/time-limited-shortest-path-visualize/app/src/main/java/org/the/maze/runner/algorithm/` — BFS, Dijkstra, A*, genetic search, and common interface.
- Open questions for the owner: Was a deadline mechanic intended or implemented in a different revision? Which algorithm comparison or lesson mattered most to you?
