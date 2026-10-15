# Javaroke

Javaroke is a desktop karaoke project built with Java and JavaFX. It explores custom data structures and a graph based song recommendation system. Users can choose songs from a local library, build a queue, play MP3 files, and follow time synchronized lyrics. The recommendation module currently runs separately from the graphical interface.

## Contents

- [Getting started](#getting-started)
- [Using the app](#using-the-app)
- [Adding songs](#adding-songs)
- [Architecture guidebook](#architecture-guidebook)
- [Recommendation system](#recommendation-system)
- [Testing and development](#testing-and-development)
- [Current limitations and troubleshooting](#current-limitations-and-troubleshooting)

## Getting started

You need **JDK 23** and a desktop environment that supports JavaFX and audio playback. The project uses Gradle 8.13 through the Gradle Wrapper. The first run needs internet access to download Gradle and the dependencies. The toolchain resolver in `settings.gradle` may also download JDK 23 if it is not installed locally.

Open a terminal at the **repository root** and run:

```powershell
# Windows PowerShell
.\gradlew.bat :app:run
```

```bash
# macOS / Linux
./gradlew :app:run
```

The `app` Gradle task uses `app/` as its working directory. This matters because the song selection screen and recommendation module use relative `src/main/...` paths. If you launch the application another way, set its working directory to `app/`.

## Using the app

1. On the home screen, click **Let's sing a song** to open the song selection screen.
2. Double click a song in **เพลงในระบบ** (available songs) to move it to **เพลงที่เลือก** (selected songs). Double click a selected song to remove it from the selection.
3. Click **Let's Sing!** to start playing the first song. The button is enabled once at least one song is selected.
4. Use **Play/Pause**, **Prev**, **Next**, the seek slider, and the volume slider on the playback screen. The screen also shows the queue and song history. The next song starts automatically when the current song ends.
5. Click **Go back** to stop playback and return to song selection.

Lyrics appear one line at a time according to timestamps in the song's JSON file. Cover art appears only when a song has a matching JPG file. The queue and history exist in memory for the current app session.

## Adding songs

Create a folder under `app/src/main/resources/songs/` with a unique ID that contains no spaces:

```text
app/src/main/resources/songs/my-song/
├── my-song.mp3
├── my-song.JSON
└── my-song.jpg       # Optional
```

Example `my-song.JSON`:

```json
{
  "id": "my-song",
  "title": "Example Song",
  "artist": "Example Artist",
  "language": "English",
  "duration": 180,
  "lyrics": [
    { "time": "00:05", "line": "First lyric line" },
    { "time": "00:12", "line": "Second lyric line" }
  ]
}
```

- `title` and `artist` appear on the selection screen. The app uses the **folder name** as the song ID, regardless of the JSON `id` field.
- The MP3 and optional JPG filenames must match the folder name.
- The player looks for `<id>.JSON` with an **uppercase extension**. The selection screen accepts both `.json` and `.JSON`, but on case sensitive file systems lyrics only load from `.JSON` with the current code.
- Lyric timestamps use `minutes:seconds`, such as `01:23`. The player sorts lines by time; lines with nonnumeric timestamps are skipped.
- Restart the app after adding files so Gradle copies the new resources onto the classpath.

The example metadata includes `language` and `duration`, but the current GUI does not use them to search for songs or determine the displayed playback duration. The player gets the duration from the audio file.

## Architecture guidebook

### Data flow

```text
Main → GUI → home.fxml
                 ↓
            search.fxml ── Item ──► songs/<id>/<id>.json or .JSON (metadata)
                 │
                 └──► DataSingleton → SongQueue → QueueSong / StackSong
                                      │
                                      ▼
                                  play.fxml → MediaPlayerService
                                                   ├──► songs/<id>/<id>.mp3
                                                   └──► songs/<id>/<id>.JSON (lyrics)

Recommendation module (separate from the GUI):
RecommendSystem → HashMapGraphController → HashMapGraphV1/V2
                   ├──► JSON graph files through HashMapGraphIO
                   └──► weight transform → Floyd–Warshall → song IDs
```

### Main components

| Location | Responsibility |
| --- | --- |
| `app/src/main/java/javaroke/Main.java` | Application entry point; starts the JavaFX `GUI` |
| `gui/`, `app/src/main/resources/{home,search,play}.fxml`, `styles.css` | Three screens and their controllers; `SceneController` handles navigation |
| `gui/search/Item.java` | Reads song JSON files from the source resource directory and builds the song list |
| `gui/DataSingleton.java`, `songq/SongQueue.java` | Share the queue and history across screens during one session |
| `queue/`, `stack/`, `models/Node.java` | Custom linked queue and stack implementations; `NodeSong` stores song information |
| `service/MediaPlayerService.java`, `models/LyricLine.java` | Play MP3 files with JavaFX Media, load and sort lyric timestamps, and expose playback state to the GUI through JavaFX properties |
| `recommendation/` | Song graph, algorithms, JSON persistence, versions, and evaluation utilities |
| `app/src/test/java/` | JUnit 4 tests for data structures and graphs |

### Playback lifecycle

When the user clicks **Let's Sing!**, the search controller fills `SongQueue` with the selected songs and opens `play.fxml`. The playback controller reads the front song with `getCurrentSong()`. `MediaPlayerService` then loads its MP3 and JSON from the classpath and matches lyric lines to playback time. Clicking Next, or reaching the end of a song, advances the queue and records the previous song in history. Prev moves a song from history back to the front of the queue.

Song selection reads files directly from `app/src/main/resources/songs/` at runtime, while playback reads resources from the classpath. As a result, the app depends on its working directory, and packaging it as a standalone JAR would require changes to song discovery.

## Recommendation system

This module is experimental and **not connected to the current GUI**. Although `search.fxml` displays “Song Recommend!”, its controller lists songs from the folder and does not call `RecommendSystem`.

- `HashMapGraph` represents songs as vertices and weighted relationships as edges in an adjacency list. Updates accept pairs of song IDs through `Queue<MyPair<String, String>>`.
- `HashMapGraphController` loads and saves graphs, selects an algorithm version, and tracks metrics. `RecommendSystem` provides a simpler interface to the controller.
- `v1` applies an exponential weight transformation before running Floyd–Warshall. `v2` uses a different weight transformation. Both rank songs using paths in the graph.
- Data and configuration live in `app/src/main/java/javaroke/recommendation/data/saves/` and `app/src/main/java/javaroke/recommendation/controllers/config.json`. Paths in the configuration are relative to the `app/` working directory.

To run the module's demonstration entry points:

```powershell
.\gradlew.bat :app:runRec   # Print graph matrices and recommendations
.\gradlew.bat :app:testRec  # Load graph.json and process the graph
```

On macOS/Linux, use `./gradlew` instead of `.\gradlew.bat`. `testRec` is a JavaExec demonstration task, not a JUnit test. It may overwrite graph files under `data/saves/`, so back up any changes to those files before running it.

## Testing and development

```powershell
.\gradlew.bat :app:test
.\gradlew.bat :app:build
```

Gradle uses JUnit 4 for tests and sets the test task's maximum heap size to 1 GB. Application code is in `app/src/main/java/`. FXML, CSS, audio, and song metadata are in `app/src/main/resources/`. The main dependencies declared in `app/build.gradle` are JavaFX controls/FXML/media, Gson, Jackson, Guava, and JLayer.

For recommendation work, start with `recommendation/controllers/RecommendSystem.java` and `HashMapGraphController.java`, then follow the code into `core/models/graphs/`, `core/version/HashMapGraph/`, `core/algorithms/`, and `core/saves/`. Older module notes are in `app/src/main/java/javaroke/recommendation/docs.md`; some directory names there no longer match the current tree.

## Current limitations and troubleshooting

| Symptom or limitation | What to check |
| --- | --- |
| The song selection list is empty | Run the `app` Gradle task or set the working directory to `app/`. This screen reads `src/main/resources/songs` from the file system. |
| A song plays but its lyrics do not appear | The player requests `<id>.JSON` with an uppercase extension. Some sample songs have lowercase `.json` filenames, which causes a mismatch on case sensitive file systems. |
| Audio does not play or cover art is missing | Check that `<id>.mp3` and optional `<id>.jpg` match the folder name, then inspect terminal errors. |
| Prev, Next, or the queue behaves unexpectedly | Queue and history are held only in memory. Edge cases in the controller and `SongQueue` need more testing before production use. |
| No recommendations appear in the GUI | The recommendation module is not connected to the GUI. Use `:app:runRec` to explore it separately. |
| The app cannot start without desktop or audio support | JavaFX needs a graphical environment, and JavaFX Media needs MP3 support from the platform's media backend. |

## License

Original code and documentation authored by Jakkarin Promsee are licensed under the [MIT License](LICENSE). Third-party code, assets, datasets, and other materials are not covered by this license; their original terms apply.
