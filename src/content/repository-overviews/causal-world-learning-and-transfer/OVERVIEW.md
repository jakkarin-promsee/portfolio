## A small causal world makes the question of how an agent learns testable.

> **Editorial draft:** This page describes work in progress. Its repository facts have been checked against the current source snapshot, but the owner has not verified this project's narrative yet.

After closing [Active Sensing](/repositories/active-sensing-vis), I wanted to ask a more basic question: when an agent enters an unfamiliar world, how should it choose what to try and revise its explanation from what happens? A future agent might also need to pass something useful to another agent, but I first need to understand the policy that gathers and uses evidence. This repository is a controlled place to study that question while the research is still taking shape.

## Building an answer key before a learned agent

The current testbed defines small, deterministic Boolean worlds with hidden AND, OR, and NOT rules. An agent chooses an intervention, observes the result, and has only a limited number of actions. An exact oracle keeps the worlds still consistent with those observations. Random action choice and information-gain choice provide baselines for asking whether a particular intervention was informative.

<!-- overview-media -->

That setup lets me distinguish uncertainty that no available observation has resolved from a poor choice of action. The oracle is exact only inside this finite world family and its assumptions. It is a measurement tool for later experiments, not a learned world model and not a solution to open-ended real-world reasoning.

The repository currently contains the world generator, intervention and inference machinery, and initial action-selection experiments. A reusable **learned policy for learning** has not been demonstrated here, and the content of a useful agent-to-agent message is still an open question. This page will need another editorial pass as those experiments develop.
