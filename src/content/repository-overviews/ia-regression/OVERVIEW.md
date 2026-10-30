## A personality quiz became a test of what can be inferred from only a few answers.

For a data-modeling course project, I wanted a Big Five quiz that would not force someone to finish all 50 questions before seeing a result. The practical question was what the unanswered items could reasonably be predicted from the answers already given. I built a Streamlit quiz around that idea and trained a model to fill the missing responses, while keeping supplied and inferred answers visibly different.

## Making partial answers into a learning problem

A missing answer cannot be treated as a real low score. The model therefore receives both the values entered so far and a mask marking which questions were actually answered. During training, each complete response is partly hidden at a random answer count, and a multi-output Ridge model learns to predict the full 50-item vector. The notebook compares it with simpler global-mean and within-trait-mean baselines across different numbers of visible answers. This tests whether relationships between items help when the quiz is short.

In the app, question order changes between sessions and a result becomes available after five answers. Known answers are restored exactly; predicted values are clipped to the allowed scale. The result shows all five traits and the full item set, with a lighter, meme-style headline for seven selected items. The model and quiz are connected through a saved artifact, so the interface is an actual use of the trained regression rather than a static mockup.

The result is a working demonstration of partial-response prediction. Its accuracy cue comes from offline error curves, not a calibrated promise about an individual's personality. The public dataset, response filters, and random missing-answer pattern limit what the comparison establishes; this is a course project and interactive modeling exercise, not a clinical assessment.
