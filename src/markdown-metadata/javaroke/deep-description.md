# Javaroke

## A karaoke player as a data-structure exercise

Javaroke is a desktop karaoke application with a concrete listening flow: select songs from a local library, reorder a session through queue operations, play MP3 audio, and follow lyrics line by line. It also contains a distinct graph-recommendation experiment. The two strands are related by the song domain, but the recommendation algorithm is currently separate from the graphical app; the selection screen's “Song Recommend!” label should not be interpreted as a working integration.

The JavaFX UI has home, selection, and playback screens defined by FXML and styled with CSS. On the selection screen, a double click transfers a song into or out of the chosen set. Starting playback populates `SongQueue`. On the playback screen, a `MediaPlayerService` loads audio and time-stamped lyric JSON, sorts lyric lines, and exposes playback state to the controller. Users can play/pause, seek, change volume, skip forward/backward, and inspect upcoming and played songs. End-of-media advances automatically. `DataSingleton` carries in-memory state between screens; there is no durable session queue or history.

## Structures and data flow

The queue and history are implemented with custom linked queue/stack types under `queue/`, `stack/`, and `songq/`, rather than merely relying on collection-library classes. Advancing removes the front song and records it in history; previous-song navigation moves a historical song back to the queue's front. `NodeSong` and related model classes carry song data. This provides a visible application of abstract data structures, with dedicated tests in `app/src/test/java/` for queue, stack, node, graph, and validation behavior.

A song's folder under `app/src/main/resources/songs/` contains a matching MP3 and JSON metadata/lyrics file, with optional JPG cover art. The player uses `mm:ss` timestamps; invalid times are skipped. An important packaging detail is that selection enumerates `src/main/resources/songs` on the filesystem while playback uses classpath resources. As documented, this depends on running from the `app/` working directory and would need refactoring for a standalone JAR. The selection screen accepts `.json` or `.JSON`, but the player expects uppercase `.JSON`, which can lose lyrics on case-sensitive filesystems.

## The separate recommendation experiment

Under `recommendation/`, a weighted song graph, JSON graph saves, a controller, and two algorithm versions explore how to rank related songs. Both versions transform graph weights and run Floyd–Warshall, but use different transformations. `RecommendSystem` presents an interface to `HashMapGraphController`; Gradle's `runRec` and `testRec` tasks exercise these paths separately from the JavaFX interface. `testRec` is a demonstration task that can change saved graph data, not a JUnit test. The repository makes the experimental status clear, so a portfolio should present this as algorithmic exploration rather than a shipped personalization feature.

## Evidence and open questions

- Sources: `project/javaroke/README.md`, `app/src/main/java/javaroke/Main.java`, `gui/`, `queue/`, `stack/`, `songq/`, `service/MediaPlayerService.java`, `recommendation/`, `app/src/main/resources/{home,search,play}.fxml`, `app/build.gradle`, and `app/src/test/java/` (paths after repository root).
- The README documents current run and packaging limitations; this summary does not claim a distributable desktop build or user study.
- Ask the owner: Was the main goal to teach data structures, build a usable karaoke player, or both? Was the graph experiment ever tested for recommendation quality, and was this solo or collaborative work?
