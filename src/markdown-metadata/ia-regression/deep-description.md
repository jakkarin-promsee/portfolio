# IA Regression

## A quiz designed around incomplete answers

The user-facing idea is a Big Five personality quiz that remains useful when someone stops after a few questions. The shipped Streamlit app enables the early-result button after five answers. The result page contains the full 50-item picture: seven selected items become meme-style headline personalities, while 43 others provide supporting detail. The interface shows which values the user supplied and which were inferred. Question order is randomized by session, and the interface displays an approximate accuracy cue derived from offline per-K error anchors. The documentation discusses roughly 30 answers as a soft point of diminishing returns; the checked-in app does not appear to enforce or explicitly prompt that threshold.

The modeling problem underneath is matrix completion on 50 Likert responses. The project uses the IPIP Big Five Factor Markers, ten items for each of five traits, and trains on the public Kaggle Big Five Personality Test responses. The repository describes this as a data-modeling course project. It is a quiz and predictive demonstration, not a clinical assessment.

## Why the model sees both values and a mask

For a session with some answered questions, the input is a 100-dimensional vector: 50 answer positions with zero where an item is absent, followed by 50 binary indicators that mark which positions are observed. The indicators are essential bookkeeping. A padded zero should not be treated as a genuine low answer. The target is the original full vector of 50 responses. One multi-output Ridge regressor predicts all 50 at once, allowing cross-item and cross-trait correlations to contribute, especially at low answer counts.

At inference, the app builds the same value-plus-mask representation, predicts the full vector, restores known answers exactly, and clips inferred values to the valid `[1, 5]` range. Trait scores and the seven meme labels are derived for display. The model is intentionally simple enough to inspect, package with joblib, and serve from the Streamlit app.

## Data and training workflow

The notebook loads the public response data, explores item distributions and correlations, and filters likely low-engagement rows before dropping metadata: unique IP where available, completion time between 60 and 1,800 seconds, and non-flat responses with standard deviation above 0.3. The documentation says this leaves roughly 60–75% of the approximately one-million-row source, though exact retained counts should be taken from a particular notebook run.

Training uses a rank-based random mask. For each respondent it draws a random count `K` between 5 and 50, then a random subset of exactly `K` items. The unobserved values are replaced by zero while the full response remains the target. The checked-in notebook constructs one masked training view per respondent; the README also mentions multi-mask augmentation, but this was not found in that fit path, so it should be treated as a documented idea rather than a confirmed training step. Validation chooses Ridge regularization from an alpha grid using masked validation MAE at fixed K values. Test curves then compare Global Mean, Trait Mean, and Ridge over several K values and multiple random masks, measuring error on unobserved items, on five trait scores, and on the seven headline items.

The documentation describes Ridge as most useful at low K because it can use correlations beyond items within one trait. The claim that precision generally flattens around 30 answers motivates the written concept's optional stopping cue; the app instead permits stopping after five answers and continues to offer questions. The displayed accuracy percentage interpolates offline MAE anchors and should not be recast as a calibrated personal confidence interval. The public dataset, response-quality filters, random-subset assumption, and interpretation of personality scores are all material boundaries on the result.

## The application layer

`client/app.py` is a Streamlit interface with the 50 questions, five trait groups, selected meme metadata, answer-state handling, and result copy. The serialized bundle in `models/artifacts/big5_ridge.joblib` supplies the trained Ridge estimator and question metadata. The interface contains Thai user-facing text in the source; the portfolio summary here is in English. The quiz is the practical expression of the modeling choice: respondents can stop at any point and still see a complete layout, with measured versus inferred content kept distinct.

## Evidence and open questions

- `project/ia-regression/README.md` explains the quiz, model, baseline comparison, artifact, and run instructions.
- `project/ia-regression/Detail.md` gives the filters, random-mask algorithm, validation design, and interpretation.
- `project/ia-regression/models/main.ipynb` is the executable training/evaluation record; `models/usage.ipynb` illustrates artifact consumption.
- `project/ia-regression/client/app.py` implements the Streamlit experience; `models/artifacts/big5_ridge.joblib` is the saved model bundle.
- **Open question:** Confirm the final held-out metric values and whether the documented 30-answer nudge is intended to be added to the shipped app before putting such claims on a public card.
- **Open question:** Any personal motivation beyond the documented course context and quit-anytime quiz concept should come from the author.
