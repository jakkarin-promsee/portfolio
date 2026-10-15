# PredictPeopleAssistant

Categories: [hackathon, web prototype, AI-assisted decision support]

Summary: A first-year university hackathon prototype exploring how staff might inspect crowd density by area and ask an AI assistant for next-step advice. The surviving Express/EJS site plots saved people-count JSON for five areas and calls Upstage Solar for generated responses; older static area mockups, MongoDB preparation scripts, and a saved Keras model show the broader concept. Runtime forecasting, database integration, and a reliable hosted deployment were not completed, so the charts should be read as sample data rather than live predictions.

Highlights:
- Area pages display a movable five-record chart window and AI advice.
- A question page sends user input to Upstage Solar through the server.
- Repository artifacts document the intended data-to-model-to-dashboard pipeline and the gap from the working prototype.
- The README explicitly audits unfinished features and known UI/request-flow issues.

Tech stack: [Node.js, Express, EJS, Chart.js, Upstage Solar API, Python, pandas, PyMongo, Keras]
