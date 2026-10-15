# Causal World Learning and Transfer

## The research program and its current boundary

The motivating question has two parts: how can an agent learn a hidden causal world through a small number of deliberate interventions, and how can it pass what it learned to another agent through limited bandwidth? The repository explicitly starts with finite deterministic Boolean worlds so every candidate hypothesis can be enumerated and the quality of action choices can be measured against an exact baseline. The checked-in work implements the world generator, interaction model, exact inference oracle, policies, and initial experiment infrastructure. A compact learned internal representation and knowledge transfer between agents are longer-term aims, not shipped mechanisms.

## What counts as a world

A `WorldSpec(d, m)` contains `d` exogenous binary inputs `x` and `m` endogenous binary variables `y`. Each `y_i` receives a structural rule: `AND` or `OR` of two distinct earlier variables, or `NOT` of one earlier variable. Parents may be inputs or earlier outputs, which fixes a topological order and rules out cycles. Commutative parent pairs are canonicalized to avoid duplicate representations. A node with `k` candidate parents has `k²` legal rules; multiplying over all output nodes gives `16 × 25 × 36 × 49 = 705,600` worlds at `d=4, m=4`. The reference dataset stores them as eight compressed JSONL shards with a manifest.

An intervention assigns every input and may force some outputs. When an output is forced, the evaluator substitutes that value and downstream structural equations see the substituted result. Stage A permits input assignments only (16 actions in the reference setting). Stage B adds a single forced output (144 total actions). Stage C allows any subset of outputs to be forced (1,296 total). Catalog IDs are stable prefixes as stages expand, making comparisons and caching consistent.

## Exact inference after each action

An episode's environment alone owns the true hidden world. A policy receives the current oracle state and available action IDs, never the hidden world. The oracle starts with every enumerated world alive; after an intervention and observed output, it retains only worlds whose predicted response matches. Observation history is canonical evidence. The survivor mask is a derived cache that can be reconstructed by replay, and response columns are computed lazily for each action and cached in world order. The dataset's deterministic iteration order is thus an important correctness invariant.

For any proposed action the oracle counts outcomes across survivors to form a uniform posterior-predictive distribution. Because the worlds and observations are deterministic under a uniform prior, outcome entropy equals expected information gain about the exact world. The runner records survivor counts, predictive entropy, observed surprisal, realized information gain, and remaining uncertainty after each step. This is **exact only within** the finite world family, deterministic observation model, and uniform prior; adding noise or a nonuniform prior would require a richer posterior than a Boolean survivor mask.

## Baselines, experiments, and cost

`RandomPolicy` chooses available actions uniformly. `GreedyInformationGainPolicy` scores candidate actions by predicted outcome entropy and chooses the best, with a stable action-ID tie break. With no candidate limit it evaluates all actions and is exact greedy search; with a finite limit it samples a subset first, so its action choice is approximate even though the oracle evaluation of each sampled action remains exact. The experiment runner enforces stage and budget rules, prevents repeated actions, and records the full episode as structured data.

The first stage-comparison script exposes stage, policy, episode, budget, seed, and candidate-limit controls and writes JSONL without silently overwriting an existing result. A companion graph script plots compatible worlds, posterior uncertainty, and expected versus realized information gain, including episode paths and uncertainty bands. Cost is a central experimental constraint: a new response column evaluates an action on all 705,600 worlds, and Stage C has 1,296 possible actions. One reference response column is about 0.7 MB; all Stage-A columns about 11.3 MB. Research notes emphasize pilots, frozen conditions, multiple seeds, and the distinction between exact inference, full-candidate greedy policy, and sampled policy.

## What the repo establishes today

This is a rigorous baseline and instrument-building phase. It establishes a reproducible causal-world language, exact elimination under its assumptions, intervention semantics, and action-selection comparisons that can be run. The README states that current experiment work is still deciding episode counts, candidate limits, and world-size scaling. It does **not** establish that a learned agent can compress causal knowledge or transfer it to another agent. The value of the current work is a controlled ground truth against which such future representations could be judged.

## Evidence and open questions

- `project/causal-world-learning-and-transfer/README.md` states the research question, current implementation, and future scope.
- `project/causal-world-learning-and-transfer/src/ARCHITECTURE_OVERVIEW.md` specifies the world language, intervention stages, oracle invariants, policies, and cost.
- `project/causal-world-learning-and-transfer/src/core/` implements generation, evaluation, storage, and exact inference; `src/tests/` tests those contracts.
- `project/causal-world-learning-and-transfer/src/experiments/` contains policy, runner, stage comparison, and plotting code.
- `project/causal-world-learning-and-transfer/ideas/stage-3-actual-experiment-1.md` records the intended experimental discipline and still-developing design.
- **Open question:** What personal insight or prior experience led to the causal-learning/communication question is not fully recoverable from the implementation.
- **Open question:** The repository should be checked for a frozen multi-episode results set before describing any policy as empirically superior.
