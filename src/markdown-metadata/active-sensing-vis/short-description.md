# Active Sensing with a Visual Transformer

Categories: [AI Research, Computer Vision, Sequential Perception]

Summary: A closed research investigation into whether a visual model that receives only a coarse map and a few high-resolution glimpses can learn where to look next and carry useful information between looks. The project built COCO-derived tasks, differentiable glimpse loops, readers, visual-attention policies, and unusually strong controls that separated locating, covering, reading, and answering. It found a learnable pointing policy after changing the task and training schedule, but the tested loop did not develop the intended memory: shuffled state worked as well as real state, and a policy blind to its own glimpses pointed better.

Highlights:
- Diagnosed why the first relational task made the useful location gradient unreachable under its glimpse budget.
- Redesigned the task around more candidate objects than available glimpses, with a map useful for location but weak on category identity.
- Used same-image/slot causal matching to overturn an apparent coverage-to-accuracy gain.
- Withdrew early positive claims after more seeds, state-shuffle controls, and a glimpse-blind policy comparison.

Tech stack: [Python, PyTorch, Visual Transformers, differentiable grid sampling, COCO, NumPy]
