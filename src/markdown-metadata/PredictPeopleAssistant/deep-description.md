# PredictPeopleAssistant

## The hackathon idea and the surviving prototype

This first-year university hackathon project started with a decision-support idea: staff would see how many people were in different areas, inspect future density, and ask an assistant what to do. The proposed system included a people-count dataset, a forecasting model, a database, a web dashboard, and AI advice. The actual working path is smaller and more revealing as a prototype. An Express server reads saved JSON files for Areas 1–5, renders EJS pages with a Chart.js graph, and requests text from Upstage Solar. A separate question route shows an answer to user input. The repository keeps data-preparation scripts, a saved `.h5` model, and older HTML mockups, but the web server does not run the model or query MongoDB.

## What happens in a request

`app.js` configures static assets, EJS, routes, and the local server. `GET /data` chooses an area and starting record index, reads its `density_of_people_Area*.json` file, takes up to five people-count records, and renders `areaN.ejs`. A Chart.js chart displays those numbers. The `idx` parameter advances by record rather than by measured minutes, even though the UI's labels read like future intervals. The route waits for an Upstage API call and puts the returned text on the page. `GET /q` accepts an area, index, and question and renders the answer in `search.ejs`. The root route only returns a simple server message; it is not a complete dashboard landing page.

The advice call is an integration experiment, not data-grounded operational guidance. The prompt includes hardcoded people counts that are independent of the selected JSON window, so advice can disagree with the chart. If the external call fails, the route renders an error string. Older `area1.html`–`area4.html` screens use hardcoded data. The data-preparation folder includes CSV transformation and MongoDB upload scripts, but no live database read occurs in the Express routes. The saved Keras model is likewise disconnected from the site. The included deployment configuration and earlier notes show an attempt to host the prototype; a working production deployment is not established by the repository.

## What this work demonstrates

The project joins UI, charting, server routes, saved data, and an external language-model API around one concrete workflow. It also shows the importance of separating a compelling concept from what a demo actually proves. The README has been updated to explain this boundary in detail, including broken or misleading parts of the request flow. A portfolio can show both the ambition and the implementation experience without presenting sample charts as live forecasts or a model file as integrated inference.

## Evidence and open questions

- `project/PredictPeopleAssistant/README.md` — project history, route guide, architecture, and detailed limitations.
- `project/PredictPeopleAssistant/app.js`, `routers/router.js`, and `views/` — current server and page behavior.
- `project/PredictPeopleAssistant/public/density_of_people_Area*.json` — runtime chart data.
- `project/PredictPeopleAssistant/UploadCSVtoMongoDB/`, `models_AI/`, and `vercel.json` — experimental data, model, and hosting artifacts outside the working request path.
- Open questions for the owner: What was your specific contribution within the hackathon team? What was actually demonstrated to judges or users, and what feedback did it receive?
