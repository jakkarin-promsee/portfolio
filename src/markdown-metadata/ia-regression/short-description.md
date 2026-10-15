# IA Regression

Categories: [Machine Learning, Data Modeling, Interactive Application]

Summary: A Big Five personality quiz that can return a complete 50-item result once a user has answered at least five questions, instead of forcing every respondent through all 50. Its indicator-augmented Ridge model predicts missing responses from 100 features: the answers given plus a binary mask showing which questions were actually asked. A training notebook cleans a large public IPIP response dataset, compares simple baselines across answer counts, and exports a model bundle consumed by a Streamlit quiz with randomized question order and meme-style headline traits.

Highlights:
- One multi-output model handles different answer counts through random-K masking during training.
- Explicit observation indicators distinguish missing, zero-padded values from real responses.
- Evaluation compares global mean, within-trait mean, and Ridge on missing-item, trait-score, and seven headline-item error.
- The UI allows early results from five answers onward, labels known versus inferred answers, and presents all 50 items.

Tech stack: [Python, pandas, NumPy, scikit-learn, Streamlit, Jupyter Notebook, joblib, Matplotlib, seaborn]
