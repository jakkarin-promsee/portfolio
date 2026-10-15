# Active Sensing with a Visual Transformer

## The intended perception loop

The research started from a specific ambition: a model should decide **where to inspect** an image, read only a small number of high-resolution glimpses, and retain information from earlier inspections in a latent state `h_t` that changes later choices. A carried token alone would not count as memory; earlier visual evidence had to alter future `(location, scale)` decisions. The project therefore needed tasks where a coarse image could guide search without already revealing the answer, the reader could extract useful information at a chosen location, and repeated glimpses offered genuine sequential value.

The repository closed on September 10, 2026. Its result is a carefully scoped negative finding about the tested differentiable coordinate policy, task designs, reader, and training setup—not a theorem that active sensing or memory is impossible. A defining quality of the work is that each initially promising interpretation was tested against a more direct control, and several were withdrawn.

## First task: a relational hop whose gradient could not reach

The early COCO-derived `hop2` task asked for the category of the object nearest the largest object, with a simpler `hop1b` control. Before the first recurrent glimpse model, the project built annotation-derived labels, read operators, shortcut screens, single-view models, and geometric baselines in `src-old/`. These measured whether the task had an answer shortcut or useful sensor geometry; they were not evidence about latent memory because those models had no recurrent carrier. Later auditing corrected early baseline and training interpretations, including the mistaken reading of a majority-class baseline as a shortcut ceiling.

`src-loop/` then implemented a differentiable four-glimpse loop. A coarse view fed a location-and-scale chooser; each chosen high-resolution crop passed through a reader and attention mixer. The reader could classify objects when correctly placed, but the learned policy repeatedly looked near the same center point. On a matched one-read comparison, learned versus random placement gained only `+0.15 ± 0.79` coverage points. In this task, coverage strongly predicted answer accuracy, so failure to aim mattered.

The geometric diagnosis was more revealing than the raw score. A `min_sep` rule prevented an easy shortcut where seeing the anchor also included the answer, but it pushed the target roughly 145 pixels away. The effective glimpse arm was 44.8 pixels and the maximum under budget about 112 pixels. Beyond that window, the location gradient was zero. Making one glance insufficient also removed the local training signal needed to move to the next glance. This closed that task/loop combination and motivated a different source of sequential necessity.

## N2: many candidates, few glimpses

The revised `N2` task made the number of candidate slots `K` larger than the glimpse budget `T`. The coarse map should say **where** slots are while revealing little about **what** is in them. The `r01–r02` task studies identified an operating region with roughly 16–128 pixel objects and a `learned@16` map: it improved pointing by about 24 points while improving direct category readout by only about 1.7 points. That separation justified running a loop, but did not prove it could answer or remember.

The first `r03` three-seed full-loop result appeared to beat a strong image-blind four-point policy by 1.13 coverage points. More seeds in `r03b` reduced the gap to `+0.03`; the positive reading was withdrawn. Simply adding a pointing auxiliary objective throughout training did not solve it. Using the same signal as a first training **phase**, then switching to answer training, raised coverage to `0.2713`, 6.02 points above the `0.2111` blind bar over five seeds. Pointing was learnable under the new task, and the training schedule mattered. This was a result about location policy, not yet about answer accuracy or memory.

## Why better pointing did not establish better answers

`r04` separated placement and reading. Across arms spanning roughly 0.06–0.59 coverage, answer accuracy moved by only about 2.66 points. Covered slots originally looked about four points easier to answer than uncovered ones; matching the **same slot in the same image** across placements changed that contrast to `−0.03 ± 0.02` points. Selection of easier slots had created a misleading association. The earlier task's coverage-to-accuracy slope could not be carried over to `N2`.

The reading channel was weak. The loop retained about 17% of the signal a standalone reader could extract from the same pixels; a large share of the reading gap was associated with the stem trained under the pointing-first regime. Relearning a reader on identical saved glimpses improved covered-slot accuracy by 3.49 points (SE 0.28), indicating a fixable component. The follow-up end-to-end reader program was not run, so this was not an end-to-end solution.

## The decisive memory and sequentiality controls

Adding a carried latent token gave a large pointing gain, and zeroing it lost that gain. That initially suggested memory. In `r04b`, however, replacing the state with one from another image performed statistically like the original. Detaching the real state preserved the gain. The token was useful as a nondegenerate **attention register**, but the measured benefit did not require information from this image's earlier glimpses. The memory interpretation was withdrawn.

`r05` then tested whether the task required the policy to read its own history at all. A control received the coarse map and register but no glimpse tokens; in the same run it reached `0.3114` coverage versus `0.2880` for the policy that saw its latest glimpse, a 2.34-point disadvantage for seeing it (SE 0.65). The coarse map re-entered the location and attention paths each step, and even the task oracle could be computed from that map alone. The remaining placement gap was therefore compatible with a perception/training problem, rather than evidence for sequential memory.

## Closure, reusable methods, and limits

The final conclusion is narrow and useful: this tested pipeline did not create the intended `h_t`. A credible next attempt would require a task in which later decisions cannot recover earlier information from a repeated global map, a true architectural bottleneck, and a stronger reader so successful inspection affects the answer. Proposed `N4_find`, map bottleneck, learned-register, and further reader work were open branches, not failed experiments. The repository explicitly chose to stop rather than pretend the current task was one model tweak away from the goal.

The methodological output is substantial: test state with cross-image shuffling before calling it memory; use a glimpse-blind sequential baseline; match image and slot before assigning a causal effect to coverage; and measure locating, revealing, reading, and answering separately. Numerical comparisons across independent runs need care: the project found about ±1.7 coverage points of cross-run variation even with matched configuration and seed, so decisive controls were run together.

## Evidence and open questions

- `project/active-sensing-vis/README.md` provides the research chronology and corrected headline results.
- `project/active-sensing-vis/analyze.md` is the final claim/withdrawal ledger; `src/ref-result.md` records numeric results and superseded interpretations.
- `project/active-sensing-vis/src-old/`, `src-loop/`, and `src/` hold the successive task/loop implementations and experiments; `src/r04/result.md`, `src/r04b/result.md`, and `src/r05/result.md` support the key causal controls.
- `project/active-sensing-vis/docs/passion/passion.md` and `docs/passion/passion2.md` state the original research direction and latent-state criteria.
- **Open question:** The closed repository explains why this line stopped; how the author wants this negative result positioned among their broader research interests should be confirmed with them.
