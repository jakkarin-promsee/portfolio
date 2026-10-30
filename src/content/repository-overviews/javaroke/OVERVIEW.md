## A karaoke player gave queue, history, and graph algorithms something concrete to do.

Javaroke is a JavaFX desktop app for choosing local songs, playing them, and following lyrics in time with the audio. I used the familiar session flow to work through data structures rather than leaving a queue or stack as an isolated exercise. What should happen when a song ends, the listener skips back, or the next song is added? Those actions gave the structures visible behavior.

## From a listening session to an algorithm experiment

Songs move through a custom linked queue, while a stack records what has already played. The playback screen can seek, change volume, and advance automatically; timestamped lyric data follows the current position in the MP3. Song files, metadata, and optional cover art live together in local folders. The application has home, selection, and playback screens, with in-memory state carrying a session between them.

I also explored a different question with the same song domain: could a weighted graph rank related tracks? The repository contains graph storage and two Floyd–Warshall-based transformations for that experiment. It is separate from the graphical player; a “recommend” label in the interface does not mean the algorithm is serving live suggestions there.

The result is a working local karaoke flow plus a distinct recommendation experiment. The current loading paths assume a particular project-directory layout, and queue/history state is not saved between launches. Those limits help explain its character as a desktop learning project rather than a packaged music service.
