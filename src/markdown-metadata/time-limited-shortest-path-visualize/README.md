# Implementation

- ## Run:

```bash
./gradlew.bat run
```

- ## Build:

```bash
./gradlew build
```

- ## Test:

```bash
./gradlew test
```

- ## Clean:

```bash
./gradlew clean
```

# Project Structure

```bash
src/
└── main/
    ├── java/
    │   └── org/the/maze/runner/
    │       ├── App.java    #JavaFX main file
    │       │
    │       ├── controller/
    │       │   ├── GridController.java
    │       │   ├── InputController.java
    │       │   └── MainController.java
    │       │
    │       ├── algorithm/
    │       │   ├── BFS.java
    │       │   ├── Dijkstra.java
    │       │   ├── AStar.java
    │       │   └── GA/
    │       │       ├── GeneticAlgorithm.java
    │       │       └── Chromosome.java
    │       │
    │       ├── model/
    │       │   ├── Grid.java
    │       │   ├── Node.java
    │       │   └── PathResult.java
    │       │
    │       ├── io/
    │       │   ├── MapLoader.java
    │       │   └── SaveManager.java
    │       │
    │       └── utils/
    │           ├── TimerUtil.java
    │           └── RandomUtil.java
    │
    └── resources/
        └── org/the/maze/runner/
        ├── /maze_example
        ├── grid-view.fxml
        ├── input-view.fxml
        └── main-view.fxml
```

## License

Original code and documentation authored by Jakkarin Promsee are licensed under the [MIT License](LICENSE). Third-party code, assets, datasets, and other materials are not covered by this license; their original terms apply.
