# Bio-Analog CPU

## The question and the boundary

Despite its working title, Bio-Analog CPU is not an instruction-set CPU and not a fabricated analog chip. It is a mathematical and behavioral-simulation research program asking what kind of lifelong learner could fit an analog compute-in-memory substrate. The desired operating properties are online learning, resident weights, local updates, a single forward sweep, sparse memory, and noise tolerance. Analog circuit ideas constrain the architecture; the current evidence comes from NumPy simulation with ideal-valued computation plus modeled noise and a literature-calibrated ADC-centered energy meter. There is no SPICE/device-physics validation, silicon, or measured hardware energy.

The personal research direction is unusually explicit in the repository. The author asks how a system might learn a sense of correctness and sustain an internal loop of holding a thought, recalling memory, comparing, rejecting, and trying again. The present model does **not** do that. It is deliberately the first “baby neocortex” organ: an unsupervised representation learner plus a small “namer” that maps representations to human labels. Later ideas about a real hippocampus, multiple specialized organs, and a recurrent thinking loop are a compass for research, not shipped capabilities. Five earlier drafts were discarded to earn a stable anchor; draft 6.0 is the validated one.

## The substrate-shaped learning design

The core bet is that on an analog crossbar, the magnitude of multiply-accumulate computation can be cheap physical current, while determining the direction of a global gradient is costly. The project separates roles accordingly, often described as about 80% unsupervised bulk and 20% precise label interface. In the final draft even the “precise” part is not gradient descent.

- **Bulk:** twelve layers of Self-Contrastive Forward-Forward (SCFF), trained label-free and forward-only on every incoming input. A sharpened contrastive objective, two views, a two-layer coordination window, and noise augmentation make depth useful under the tested conditions. The bulk is not rewritten by the downstream classifier.
- **Namer:** streaming linear discriminant analysis (SLDA), a closed-form class-prototype/shared-covariance head over bulk features. The Phase 7 comparison selected this over gradient-trained heads on its accuracy/cost trade-off; the repository reports it was about 69 times cheaper than the runner-up while tying gradient heads on accuracy in that test.
- **Gate:** a drift signal controls when the namer updates. Updating more often was measured to cause more forgetting, so the gate is also a safety brake. The implemented frozen object uses an error-EMA gate; a more directional signal remains future work.
- **Sleep:** every four stream segments in the committed `grid-4` configuration, a closed-form refit over a small class-balanced prototype memory reanchors the namer as the unsupervised bulk changes. The “hippocampus LUT” name denotes a memory role, not a biological claim or a full hippocampal learner.

The proposed physical picture is capacitor-held synaptic magnitude plus an SRAM sign bit, with crossbar current implementing multiply-accumulate in place and positive/negative views sharing the same crossbar. These are architecture constraints and circuit concepts. Leakage, write precision, process/voltage/temperature effects, and device-level validation remain deferred.

## How the design was reached

Draft 6.0 was developed through eleven phases, roughly 70 controlled experiments. Phases 1–6 established the cheap representation learner: an initial local block showed a continual-learning advantage but organized density more readily than class; simply stacking blocks did not make useful depth. Changing the learning **objective** to a contrastive one and adding a short coordination window did. Later phases mapped strengths and failures against tuned backprop, repaired depth decay with a sharper objective, and hardened the bulk with noise augmentation.

Phases 7–9 chose the closed-form namer, measured the update gate and two-part energy, and tested whether the bulk rotates while retaining information so periodic refitting could work. The recipe and code were frozen at a commit before the final comparison. Phases 10–11 then raced that frozen object against a tuned experience-replay baseline and mapped limits on synthetic streams, real data, noise, order, width, and input size. The repository keeps phase reports, predeclared designs, raw arrays, and regenerable figures; the sequence matters because later comparisons were meant to judge a locked design rather than tune it after seeing the opponent.

## What the frozen model did and did not win

On the lifelong stream, final accuracy tied the tuned replay baseline within a predeclared `0.02` band: `0.494` versus `0.498`. The standout metric was worst-case forgetting during the stream, `−0.028` versus `−0.272`, about a tenfold gap by that measure. This is different from ordinary end-of-stream forgetting, where the replay learner can recover. On a five-domain rapid-switch gauntlet, worst-point retention was `0.490` versus `0.350`; reversing the order left the model near `0.494` but reduced replay from `0.504` to `0.343`. Batch-level views showed replay repeatedly crashing and relearning at domain changes while the frozen model stayed steadier. When domains were much longer, replay had enough time to reconverge and finished higher; the retention advantage is therefore tied to rapid shifts, not all stream schedules.

The model retained `0.92–1.10` of its clean accuracy across the reported held-out noise channels versus `0.23–0.61` for the replay comparator. On plain natural-digit accuracy it lost (`0.879` versus `0.950`). On a same-digital-substrate energy estimate its deeper bulk also lost by roughly 1.5 times; the reported approximately 3.4-times energy advantage arises only when its MACs are priced on the analog crossbar and conventional gradient learning on digital hardware. Those numbers are from a behavioral macro-model, not measured joules on a chip. A smaller tuned replay model dominates the simple accuracy-versus-energy Pareto; the model's value is on safety, noise, order, and substrate fit.

Phase 11 extended the frozen model beyond the synthetic showcase. Its limit map spans eight real-data arenas and five capability channels, including a gas-sensor drift stream, MNIST and Fashion, cross-dataset type shifts, scaling, and streams where persistence (“predict yesterday”) is already a strong floor. The report records wins, losses, and uninformative floors rather than combining them into a single universal score. The learned bulk adds value where structure is nonlinear, but the closed-form namer is responsible for much of the continual safety. CIFAR-gray at native resolution is reported as a low-ceiling floor; the autocorrelated streams cannot support a meaningful learner superiority claim. Wider bulk models increased the projected analog substrate factor in the tested sweep, but also increased computation on a digital substrate.

## What remains open

The repository calls this a beginning. A stronger hippocampus-like organ, a bulk that can recover clean structure from an all-noisy arrival order, SPICE-grade analog-constraint simulations, and eventually a recurrent internal loop are future research gates. The current results support a scoped continual-learning architecture and its behavioral limit map. They do not show a thinking machine, biological fidelity, a working analog circuit, or guaranteed gains outside the tested regimes.

## Evidence and open questions

- `project/bio-analog-cpu/README.md` is the public research narrative, scorecard, scope, and north star.
- `project/bio-analog-cpu/docs/essence/the-essence2.md` develops the author's motivation and intended longer-term mind architecture.
- `project/bio-analog-cpu/draft6.0/src/phase9-final-architecture.md` specifies the frozen four-part model.
- `project/bio-analog-cpu/draft6.0/src/stage1-report.md`, `stage2-report.md`, and `validation-report.md` record the eleven-phase development and validation story.
- `project/bio-analog-cpu/draft6.0/src/phase10/phase10-report.md` and `phase11/phase11-report.md` support the race and limit map; per-experiment folders contain designs, arrays, and figures.
- **Open question:** The repository describes the personal north star directly; confirm how much of that intimate motivation the author wants exposed on a public portfolio page.
