# Time-Limited Shortest Path Visualize

Categories: [desktop application, algorithms, visualization]

Summary: A JavaFX maze application for entering, loading, generating, and visually solving weighted grids. It offers BFS, Dijkstra, A*, and a genetic-algorithm experiment, colors the resulting path, and displays runtime, path length, cost, and visited-node counts. The repository title mentions a time-limited challenge, but the inspected UI code establishes a solver and comparison interface rather than an enforced time limit.

Highlights:
- Previews typed mazes and includes file loading, six example grids, and maze generation.
- Uses one grid/node model and pathfinding interface across several search approaches.
- Shows weighted cells, walls, start/goal positions, colored paths, and run metrics.
- Runs the genetic search in a JavaFX background task while the other algorithm handlers run directly.

Tech stack: [Java, JavaFX, FXML, Gradle, graph search, genetic algorithms]
