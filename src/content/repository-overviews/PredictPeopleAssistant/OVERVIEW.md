## My first hackathon project aimed to turn crowd data into a decision-support dashboard.

This was my first full-stack attempt and my first experience deploying a web demo, made under a hackathon deadline. The idea was ambitious: show how many people occupied several areas, forecast where the crowd might go, and let staff ask an AI assistant what to do next. I pushed a demo online at the time, but the system was rough and the gap between the proposed pipeline and the working path was large. This repository preserves both.

## What reached the web prototype

The surviving Express and EJS app reads saved people-count JSON for five areas and displays a small window of records with Chart.js. A question page sends text to Upstage Solar and renders its response. Other folders hold data-preparation scripts, a saved Keras model, and earlier static page mockups. They show directions the team explored, but the current web request path neither runs the forecasting model nor queries MongoDB.

That distinction changes how the result should be read. The chart is sample historical data, not a live density feed or a verified future forecast. The assistant call also does not use the selected chart values as its trusted context, so its advice should be seen as an API integration experiment rather than operational guidance. The repository documents these mismatches and the unfinished deployment path.

For me, the project marks the first time I connected data, a model experiment, a web interface, and an external AI service around one problem and tried to put that experience on the web. The useful lesson is visible in the boundary between a compelling proposal and the narrower prototype we could actually demonstrate. My memory of deploying a demo does not establish that the current link works, that the complete backend was hosted, or that the system ever managed a real crowd.
