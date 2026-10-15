# Causal World Learning and Transfer

Categories: [AI Research, Causal Inference, Active Learning]

Summary: A research testbed for asking how an agent can identify a hidden causal system when it can perform only a limited number of interventions, and eventually communicate useful knowledge to another agent under a bandwidth limit. The current implementation enumerates finite deterministic Boolean worlds, simulates interventions, and maintains the exact set of worlds still consistent with every observation. Random and information-gain action policies provide controlled baselines across progressively richer intervention stages; compact learned representations and agent-to-agent transfer remain research goals rather than completed results.

Highlights:
- A canonical `d=4, m=4` world family contains 705,600 acyclic AND/OR/NOT systems.
- Stage A/B/C action catalogs progressively allow input assignments, one forced output, and arbitrary forced-output subsets.
- An exact elimination oracle records evidence, posterior uncertainty, predictive outcomes, and information gain.
- On-demand response caching and sampled candidate search make controlled experiments possible while exposing their computational cost.

Tech stack: [Python, NumPy, Matplotlib, unittest, JSONL]
