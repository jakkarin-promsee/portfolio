# Javaroke

Categories: [desktop application, data structures, graph algorithms]

Summary: A JavaFX karaoke app in which users choose locally stored songs, build a play queue, control MP3 playback, and read lyrics synchronized to the audio. Its implementation uses custom linked queue and stack structures for upcoming songs and playback history. A separate experimental recommendation module models songs as a weighted graph and explores Floyd–Warshall-based ranking; that module is present in code but is not wired into the current GUI.

Highlights:
- Three-screen workflow for choosing songs, playing them, and navigating queue/history.
- Time-stamped lyric lines, optional cover art, seeking, volume control, and automatic next-song playback.
- Custom queue and stack implementations with JUnit tests.
- Graph recommendation experiments with two weight-transform versions and JSON graph persistence.

Tech stack: [Java 23, JavaFX, FXML, Gradle, JSON, JUnit 4]
