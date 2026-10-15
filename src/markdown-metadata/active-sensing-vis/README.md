# Active Sensing with a Visual Transformer

**Status: closed on September 10, 2026.** This repository records a research project on a visual model that chooses where to look, reads a limited number of high-resolution glimpses, and carries a useful latent state between them. The project did not produce that state. It produced a sequence of experiments that explains why the tested tasks and training setup did not ask for one.

The central question was:

> Can a differentiable visual attention loop learn both **what to inspect next** and **what to retain from previous inspections**, when it cannot read the whole image at full resolution?

The intended `h_t` was more than an extra token or a place to do additional computation. It was meant to route future input: after seeing something at step `t`, the model would carry information that changed its next `(location, scale)` choice. This motivation and the criteria for a meaningful latent state came from the author's [research direction](docs/passion/passion.md) and [mechanistic proposal](docs/passion/passion2.md).

This README follows the questions in the order they arose. For the claim-by-claim analysis, including the withdrawal ledger and precise scope, see [analyze.md](analyze.md). For numerical results, use [src/ref-result.md](src/ref-result.md), especially its section 8 on superseded numbers and interpretations.

## The research path

| Stage | Question that led to it | What changed |
| --- | --- | --- |
| [Task and instrument design](src-old/CLAUDE.md) | Can we build a visual task in which a second look is necessary and its value is measurable? | Several apparent baselines, certificates, and model comparisons needed correction before they could support a claim about a loop. |
| [First glimpse loop](src-loop/README.md) | Given a coarse view, can a differentiable loop learn to aim at a relational target? | It could not. The task's separation rule placed the target beyond the useful reach of the glimpse gradient. |
| [`N2` task design, `r01–r02`](src/analyze.md) | Can the need for multiple looks come from **more candidates than glimpses**, instead of long jumps? | Yes: a coarse map could point to candidates while revealing relatively little about their identities. |
| [`N2` loop, `r03–r03b`](src/rounds.md) | Does that map let a trained loop beat a policy that ignores the image? | Pointing became learnable, but only with a separate first phase for the pointing objective. |
| [Reading and causality, `r04`](src/r04/result.md) | Does better pointing make the answer more accurate? | Largely no. A weak reader and a misleading covered-versus-uncovered comparison had hidden the gap. |
| [State and sequentiality, `r04b–r05`](src/r05/result.md) | Is the carried token memory, and does the next decision need the previous glimpse? | A shuffled state worked as well as the original; a policy blind to its own glimpses worked better. |

### 1. Start with the task, not the model

The original idea was to make visual reasoning genuinely sequential. On COCO images, `hop2` asked for the category of the object nearest to the largest object. A coarse image was available first; the model would then choose small, high-resolution reads. A simpler `hop1b` question served as a control. The hope was that finding the anchor, moving to its neighbor, and answering would give `h_t` a necessary job.

Before training that loop, the project built label generators, read operators, shortcut screens, single-view models, and geometric baselines in [`src-old/`](src-old/). These were essential instruments, but they were **not tests of latent memory**: the COCO models in this stage had no recurrent carrier. An independent audit also changed several early readings. For example, the reported 10.3% shortcut ceiling was only a majority-class baseline; an oracle given the image's category inventory could do much better. Conversely, some shortcuts available in annotations were difficult for a pixel model to exploit. Several early accuracy gaps depended on evaluation choices or unfinished training. The [audit summary](src-old/analyze/summary/01-shortest-conclusion.md) and [withdrawal list](src/ref-result.md) record those corrections.

The practical lesson was to measure each part separately: whether a map can **locate** a target, whether it already **reveals** the answer, whether a glimpse can **read** it, and whether a policy beats a strong **blind** baseline. A high task score alone would not identify the intended mechanism.

### 2. The first loop could read, but could not learn to aim

The next tree, [`src-loop/`](src-loop/), built the differentiable glimpse loop. It received a coarse map, selected `(x, y, scale)` for `T = 4` glimpses, and used a reader and attention mixer to answer. The reader could recognize categories when placed correctly. The location policy, however, converged toward nearly the same central point on every step. Four reads behaved much like one.

The decisive comparison matched the number of reads: learned placement versus random placement with one read each. The measured value of aiming was **+0.15 ± 0.79 coverage points**, effectively zero at this precision. On this earlier task, accuracy was strongly associated with whether the target was covered; the measured slope was about **7.7 accuracy points per coverage point**. This was a property of that task and reader, not a law that could be carried into the later `N2` task.

The failure had a geometric explanation. `min_sep` was introduced to prevent a shortcut in which looking at the anchor also captured the answer. Yet the same rule pushed the answer away from the current read. At the operating point, the glimpse's effective arm was **44.8 px**, the budget-limited maximum reach was **112 px**, and the required hop was about **145 px**. Outside the read window, `∂L/∂location` was exactly zero. Expanding the window enough to bridge the gap conflicted with the read budget and degraded the useful aiming signal. The condition that made one glimpse insufficient also removed the local learning signal needed to reach the next one.

This closed the first loop design, not active sensing in general. It suggested a new question: **could multiple reads be necessary for a reason that does not cut the gradient's reach?** See the [loop synthesis](src-loop/README.md) and the quantitative record in [src/ref-result.md](src/ref-result.md).

### 3. Replace distance with too many candidates

The revised task, `N2`, used `K` candidate slots and only `T` glimpses, with `K > T` in the cases of interest. The model received a cheap coarse map, chose which slots to inspect, and reported their categories. A good task for this experiment needed the map to indicate **where** a candidate was without already revealing **what** it was. `r01` measured that tradeoff over object-size bands and map representations. `r02` checked the pointing head and compared the viable settings.

This yielded a real operating region: objects around **16–128 px** with a `learned@16` coarse map. In that region the map's gain in pointing was roughly **24 points**, while its gain in revealing category was about **1.7 points**. The distinction made a high-resolution glimpse potentially useful. It was a reason to run the loop, not yet evidence that the loop would answer well or use memory. The experiments and their qualifications are in [`r01`](src/r01/analyze.md) and [`r02`](src/r02/analyze.md).

### 4. Pointing finally worked; the first positive result did not survive

`r03` put the new map into the full loop. Its initial three-seed result appeared to beat the best image-blind, four-point policy by **1.13 coverage points**. More seeds in `r03b` reduced that difference to **+0.03 points**: the claimed gain was a fluke and was withdrawn.

The negative result prompted a more useful experiment. A pointing auxiliary loss added to the answer loss throughout training did not lift the policy off the blind bar. The **same teaching signal used as a first training phase**, followed by answer training, did: coverage reached **0.2713**, or **6.02 points above the 0.2111 blind bar** (`n = 5`, 10.3 SEM against that fixed bar). Thus the revised task did make pointing learnable. The training objective and its schedule mattered more than another increase in model capacity. This is a positive result about **pointing**, with the result and confirmation in [`r03b`](src/r03b/analyze.md).

It also created the next question. If the model now reaches useful slots, **does reaching them improve its answers?**

### 5. Better coverage was not better reading

`r04` separated placement from reading. On `N2`, moving coverage across arms from roughly **0.06 to 0.59** changed overall answer accuracy by only about **2.66 points**. An oracle that covered far more targets did not improve covered-slot accuracy over the learned policy within the measured uncertainty. The earlier task's `accuracy ≈ floor + 7.7 × coverage` relationship therefore could not be used here.

There was a more subtle error. Covered slots initially looked about **4 points easier to answer** than uncovered slots. When the comparison matched the **same slot in the same image** across placements, the difference became **−0.03 ± 0.02 points**. Much of the apparent benefit was selection of easier slots, not an effect of visiting them. Routing an actually readable signal can have value, but this observational gap did not establish that the trained loop was doing so.

The reading path was the larger bottleneck. The loop retained only about **17%** of the signal that a standalone reader could extract from the same pixels; roughly **70%** of the measured reading gap was associated with the stem trained under the pointing-first regime. Relearning the reader on **identical saved glimpses** improved covered-slot accuracy by **3.49 points** (SE 0.28). That showed the reader was repairable. It did not establish an end-to-end solution, because the follow-up reader-training program was not run. See the [stage results](src/r04/result.md) and [interpretation](src/r04/analyze.md).

### 6. The apparent state was a register

`r04b` asked whether a carried latent token supplied the missing history. Adding one produced a large pointing gain, and removing it caused a large drop. Initially this looked like causal evidence for memory. The control that mattered was to replace it with a state from **another image**. Performance was statistically indistinguishable from the original state. A zero token did not reproduce the gain, and detaching the original state did not remove it.

Those controls narrowed the interpretation: the model benefited from a nondegenerate token to which attention could attach, but the token did not need to carry information about this image's previous glimpses. It functioned as an **attention register** in the tested architecture. The original “latent state is memory” claim was withdrawn. The full controls are in [`r04b/result.md`](src/r04b/result.md).

### 7. The task did not require sequential sensing

`r05` then tested the task itself. Its control policy received the coarse map and a register but **never received its own glimpse tokens**. In the same run, it reached **0.3114 coverage**, while the policy that did see its latest glimpse reached **0.2880**: a **2.34-point disadvantage** for seeing the glimpse (SE 0.65). The register's gain was large; the information in the sequential reads was not required for this pointing task.

The architecture explains why this could happen. The coarse map was supplied again at every step through the location path and the attention context. The policy could form successive locations from that map and the register without retaining scene information from a previous read. The `N2` oracle could also be computed from the map alone. In this setup, the remaining room for coverage was largely a **perception and training** problem, not a demonstrated memory problem. The [`r05` result](src/r05/result.md) is the strongest direct test of that distinction.

## What the project concludes

The tested differentiable loop never developed the intended `h_t`. First, the relational task blocked the learning signal needed to move between targets. Redesigning the task removed that obstacle and made **pointing** work, but exposed a poor **reading** channel. The apparent memory gain then failed an image-shuffle control, and the final task passed a stronger test with a policy blind to its own reads. Several promising interpretations were withdrawn because the project's later controls contradicted them.

This is a **scoped negative result**, not an impossibility theorem for active sensing or visual latent state. It directly concerns the tested soft-attention coordinate policy, reader, training procedures, and tasks, especially an architecture that reintroduces global context at every step. It does not test every hard-attention or reinforcement-learning policy, every pretraining scheme, or a task and architecture with a genuine information bottleneck. The precise [scope](analyze.md) matters more than a universal claim.

### Why the project stopped here

A credible new attempt would start at **task design**, not with another small change to the current loop. The dataset would have to make information from earlier reads genuinely unavailable later unless `h_t` carries it. The architecture would then need a real bottleneck. At the same time, the reader and its pretraining would need enough visual competence for a successful visit to matter to the answer.

That shifts most of the work away from inventing a single algorithm. It becomes an expensive cycle of designing a dataset, pretraining a model, diagnosing whether a failure comes from the data, reader, objective, optimizer, or policy, changing one of them, and running the controls again. Each dataset and model iteration takes substantial time, and fixing one failure point does not guarantee that the next gate will pass. After a redesign, the entire causal chain would need to be re-established step by step. The current results give no warrant that this investment would produce the intended state.

There were concrete next experiments: end-to-end reader work in `r04b`'s **R** branch, the proposed [`N4_find` task](src/phase-h.md), a map bottleneck after `t = 0`, and a learned-register control. **They were not run, so they are open questions rather than failed experiments.** Closing the project was a decision about the evidence, the changed nature of the remaining work, its cost, and its uncertain payoff. The [closing analysis](analyze.md) records those open branches.

## What remains useful

- **A state-shuffle test:** substitute another sample's state before calling a carried token “memory.”
- **A blind sequential-policy baseline:** compare a purportedly sequential policy with one that never sees its own reads.
- **Causal matching within a sample:** compare the same slot and image before attributing an accuracy gap to coverage.
- **Separate measures for locating, revealing, reading, and answering:** each can move without the others.
- **Predeclared arms, metrics, and stopping criteria:** several of the project's own positive readings failed the controls specified for them.
- **A record of measurement corrections:** especially the distinction between a within-run seed error and a larger cross-run replicate band. The same configuration and seed could vary by about **±1.7 coverage points** across runs, so decisive controls were run together.

## Repository and reproducibility

| Path | Role |
| --- | --- |
| [analyze.md](analyze.md) | Final claim-by-claim synthesis, withdrawals, scope, and open work. |
| [CLAUDE.md](CLAUDE.md) | Navigation and evidence hierarchy for the closed repository. |
| [src-old/](src-old/) | Frozen early task, sensor, and loop-free model work. Start at its [guide](src-old/CLAUDE.md). |
| [src-loop/](src-loop/) | Frozen first glimpse loop and its geometric diagnosis. Start at its [summary](src-loop/README.md). |
| [src/](src/) | Frozen `N2` experiments, `r01–r05`. Use its [guide](src/CLAUDE.md), [round log](src/rounds.md), and [result ledger](src/ref-result.md). |
| [docs/](docs/) | Original research direction, plans, and literature notes. |
| [archive/](archive/) | Superseded directions retained for provenance. |

Committed result JSON is the source of numerical truth; training caches, checkpoints, and feature dumps are not committed. The round directories contain scripts, raw results, and the plans written before runs. Three checkers verify documentation references and recompute the recorded headline numbers from committed JSON:

```powershell
.venv/Scripts/python.exe src/check_docs.py
.venv/Scripts/python.exe src/check_numbers.py
.venv/Scripts/python.exe src/r04/07_check.py
```

For reruns, follow each round's script instructions and rebuild its ignored caches as needed. The original development machine had a 4 GB GPU; silent GPU-to-system-memory spill could make a run much slower without an out-of-memory error. The glimpse loop also uses `grid_sample`, whose backward path prevented full deterministic replay in the tested setup. Treat comparisons across separate runs accordingly; the [methodological notes](analyze.md) explain the measured replicate band.

## Project hierarchy

`src/` is the final research tree. Each `r*` directory is a round with a distinct question; the `b` suffix marks a follow-up round, not a separate model generation. The earlier [`src-old/`](src-old/) and [`src-loop/`](src-loop/) trees are frozen predecessors, not subfolders of this tree.

```text
src/
├── common/       Shared data, sensor, model, and training code
├── data/         COCO annotations; generated image and feature caches are ignored
├── r01/          Find a coarse map that points without revealing category
├── r02/          Verify the spatial pointer and choose a viable map/size cell
├── r03/          Build N2 slots, blind bars, and the first full-loop run
├── r03b/         Separate address from offset; test objectives and replicate r03
├── r04/          Diagnose the reading path and test coverage causally
├── r04b/         Test carried-state and reader hypotheses with controls
└── r05/          Test whether the policy needs its previous glimpses at all
```

| Round | What is inside and where to start |
| --- | --- |
| [`r01/`](src/r01/) | Object-size bands, coarse-map sweeps, and glimpse-reader ceilings. Start with its [question and interpretation](src/r01/analyze.md); [`result.md`](src/r01/result.md) holds measurements. |
| [`r02/`](src/r02/) | Pointer gradient and capacity gates, then the 54-cell map/band/`T` comparison. Start with [`analyze.md`](src/r02/analyze.md). |
| [`r03/`](src/r03/) | [`00_labels.py`](src/r03/00_labels.py) constructs the raster-ordered `N2` slots and recomputes blind bars on that exact row set; [`n2.py`](src/r03/n2.py) defines the task loss, matching loss, and coverage ruler; [`02_loop.py`](src/r03/02_loop.py) trains the first loop. |
| [`r03b/`](src/r03b/) | [`n2b.py`](src/r03b/n2b.py) extends the task wrapper with independent `off_scale` and alternative objectives. [`01_run.py`](src/r03b/01_run.py) runs the controlled grid; [`03_combo.py`](src/r03b/03_combo.py) checks whether promising settings combine. |
| [`r04/`](src/r04/) | Scripts `00`–`06` rederive earlier comparisons, measure reader ceilings, save fixed-policy features, train diagnostic heads, match slots across placements, and replay reads. [`07_check.py`](src/r04/07_check.py) checks its reported numbers against JSON. Start with [`analyze.md`](src/r04/analyze.md). |
| [`r04b/`](src/r04b/) | [`01_htrack.py`](src/r04b/01_htrack.py) varies glimpse history and carry; [`02_reader_on_h.py`](src/r04b/02_reader_on_h.py) probes the reader and state; [`03_carry_controls.py`](src/r04b/03_carry_controls.py) runs shuffle, zero, and detach controls. The planned **R** branch was not run. |
| [`r05/`](src/r05/) | [`01_oneshot.py`](src/r05/01_oneshot.py) compares policies with and without access to their own glimpse tokens, rerunning the controls in the same script. Its [result](src/r05/result.md) closes the sequentiality question for `N2`. |

The round-local `n2.py`, `heads.py`, and `score.py` files are **snapshots or extensions for that round**. They preserve exactly what an experiment used; they should not be read as a single interchangeable “latest” implementation. Each round's `analyze.md` records its planned test and later interpretation, `result.md` records measurements, and `out/` contains the committed result JSON. For the configuration selected at each step, see [`src/model.md`](src/model.md).

## Architecture guidebook

The shared implementation is [`common/loop.py`](src/common/loop.py), with the differentiable crop in [`common/sensor.py`](src/common/sensor.py). The following describes the final `N2` experimental path and the switches used to test it. It is a guide to the **measured code**, not a proposal for a replacement architecture.

```text
COCO image and object annotations
    ├─> 448 px canvas ────────────────────────────────┐
    ├─> learned@16 coarse map -> ResNet stem -> 4×4    │
    │                               context tokens     │
    └─> N2: up to 12 position-ordered category slots   │
                                                     │
context tokens -> Transformer readout u₀              │
   for t = 1..4:                                      │
       uₜ₋₁ + coarse tokens -> spatial pointer -> (x,y,s)
       (x,y,s) + canvas -> 64×64 bilinear glimpse -> fine stem/token
       context + allowed glimpse tokens [+ carried uₜ₋₁]
                    -> Transformer readout uₜ -> slot-category logits
   final logits -> masked category loss on occupied slots
```

1. **Data and task.** [`common/coco.py`](src/common/coco.py) and [`common/labels.py`](src/common/labels.py) handle COCO objects and the earlier relational labels. For `N2`, [`r03/00_labels.py`](src/r03/00_labels.py) selects candidates in the 16–128 px band, orders them by position rather than size, caps them at `K_max = 12`, and stores category labels, centers, and a validity mask. Empty slots carry no loss. The model predicts `12 × 80` category logits, reshaped into one distribution per slot by [`n2_loss()`](src/r03/n2.py).

2. **Coarse observation.** The selected `learned@16` map is produced by the position-supervised [`LearnedCompressor`](src/common/nets.py), not by the answer classifier. [`CoarseBank`](src/common/train_loop.py) loads the cached map. [`GlimpseLoop.context_tokens()`](src/common/loop.py) passes it through a ResNet-18 stem, pools it to `coarse_grid = 4` (16 tokens), projects each feature, and attaches its cell center. This context is supplied without charging the fine-glimpse budget, and it remains available on **every** loop step.

3. **Choose a location.** The Transformer reads the context into `u₀`. At each step, [`SpatialLocHead`](src/common/loop.py) queries the coarse tokens using the current readout `u`. A softmax-weighted average of token centers gives `(x,y)`; a bounded offset refines it within the chosen region. The scale head emits `s`, constrained by [`to_loc()`](src/common/loop.py). `r03b` separated the offset range from the coarse-token grid because the original `coarse_grid` setting controlled both. The location is differentiable, but an answer gradient through the crop has no information about a target outside its current window.

4. **Read and answer.** [`bilinear_read()`](src/common/sensor.py) uses `affine_grid` and `grid_sample` to extract a 64×64 fine glimpse from the 448 px canvas. [`fine_token()`](src/common/loop.py) applies a ResNet stem, pools its features, projects them, and appends `(x,y,s)`. The Transformer mixes the coarse tokens and whichever glimpse tokens the arm allows. Its readout `u_t` feeds both the next location decision and [the answer head](src/common/loop.py). The `N2` task scores the **last step's** masked slot predictions.

5. **Train the pointer, then the answer.** [`aux_matched()`](src/r03b/n2b.py) matches each glimpse step to a candidate coarse cell without reusing a slot, then applies cell cross-entropy to the pointer's attention logits. The effective `aux_first` schedule starts with the pointing objective alone and then uses answer loss **plus** that objective. Validation coverage selects the model state; test is read afterward. [`coverage()`](src/r03b/n2b.py) always scores with a fixed `s = 0.20` ruler, even if the model emitted a different scale, so a change in scale alone cannot improve the pointing metric.

6. **Expose the state hypothesis.** In [`GlimpseLoop.forward()`](src/common/loop.py), `mixer_window` sets how many recent glimpse tokens the Transformer may see; `carry=True` appends the preceding readout `u_{t-1}` as one token. There is no separately trained recurrent memory module in this test. [`r04b`](src/r04b/03_carry_controls.py) alters that token's contents to test whether it carries image-specific history. [`r05`](src/r05/01_oneshot.py) sets `mixer_window=0` to remove the glimpse tokens altogether. The context still arrives at every step; that detail is central to the final interpretation.

The main code-reading route is [`r03/00_labels.py`](src/r03/00_labels.py) → [`r03b/n2b.py`](src/r03b/n2b.py) → [`common/loop.py`](src/common/loop.py) → [`r05/01_oneshot.py`](src/r05/01_oneshot.py). Read the [model configuration ledger](src/model.md) alongside it: defaults in the shared class include historical alternatives, while each round's constructor selects the configuration actually measured.

## License

Original code and documentation authored by Jakkarin Promsee are licensed under the [MIT License](LICENSE). Third-party code, assets, datasets, and other materials are not covered by this license; their original terms apply.
