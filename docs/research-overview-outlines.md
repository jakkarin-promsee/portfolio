# Research-path overview outlines

These seven repositories form the owner's research path on `/journey`, even when their browsing categories differ. Each `OVERVIEW.md` should lead with the idea the owner actually had, show the attempt that changed it, then explain the result. Do not project a late benchmark backward onto the first question. Personal chronology comes from the owner's account; implementations and results must match the pinned sources. The owner has **not** verified the Causal World narrative.

## ML01-linear-regression-from-scratch

- **Start:** I could apply derivative recipes but could not see how numbers in weights came to hold learned behavior. The goal was to build that intuition from zero, not show that I could code ML.
- **Path:** Derive prediction, error, and each weight update by hand. Carry the chain rule from one affine layer into deeper networks, then implement the arithmetic in NumPy. ReLU and nonlinear targets reveal why affine layers alone are insufficient.
- **Result:** The code and plots check the paper reasoning. The achievement is being able to explain every step by which weights encode an input-output relationship; curve fitting does not equal intelligence.
- **Next / media:** The update itself becomes the object of study in Discretization. No overview image.

## discretization-of-gradient-flow

- **Start:** After ML01, studying optimization and initialization led through Hessians to a Gram-matrix connection in the squared-error linear case. Eigenvalues and eigendirections made the geometry of an update something to explore directly. Do not call every Hessian a Gram matrix.
- **Path:** Derive explicit gradient descent, an implicit update, and Newton's method on paper. Implement gradients, Hessians, linear solves, and comparable runs in NumPy to see whether the algebra works computationally.
- **Result:** The curves expose tradeoffs between early speed, stability, and the cost of curvature-aware computation in this setup. The main achievement is mathematical manipulation backed by an implementation, not a universal optimizer ranking.
- **Next / media:** Use the pinned convergence figure, explain its scope, then bridge to the separate hardware exploration in ChronoForge.

## chronoforge-fpga-engine

- **Start:** Play with a ROM counter that emits event commands. Ask how far that mechanism can grow into a game made of hardware logic. This was not an ML question.
- **Path:** One timeline grows into event streams, object executors, movement, collision, and VGA output. Packed ROM values become hard to author, so Python stage objects, a compiler, and a previewer grow alongside the Verilog runtime.
- **Result:** The Basys3 runs the game without a CPU or OS, within a tight resource budget. The story is learning to expand a working system and seeing how the substrate shapes timing and communication.
- **Next / media:** Show the source-traceable board video and poster. The confidence to design a substrate opens Bio-Analog CPU.

## bio-analog-cpu

- **Start:** Gradient descent's global backward pass seemed wrong for the learner I wanted. ChronoForge made a self-designed substrate plausible. Begin with resident weights and a local contribution rule; continual-learning retention was a late test, not the founding question.
- **Corrections:** Contribution size failed to specify update direction, and summation cost defeated the shortcut. Forward-Forward gave a local route, but early blocks did not yield useful stacked depth. The objective and neighboring-layer coordination changed. A classifier comparison then favored closed-form SLDA over the gradient-trained head I expected to need.
- **Result:** Briefly explain the roughly 80% SCFF structure learner and 20% SLDA labeler, gate, and small prototype memory, so the reader knows which version was tested. It uses no gradient descent. Put the frozen-design rapid-switch figure **after** that arc. Explain steadier worst-point retention alongside similar final accuracy, longer-schedule recovery by replay, static-accuracy losses, and modeled rather than measured analog energy.
- **Belief / boundary:** My failed rule made me less certain that gradient descent was simply wrong. This is behavioral simulation, not a fabricated chip or an explanation of how a learner understands an unfamiliar world. That gap leads to the harness and later research.

## my-harness

- **Start:** Between ML questions, I wanted to know how a coding-agent harness was made. A small model/tool/permission loop was the MVP. Do not invent an initial ML hypothesis.
- **Path:** Run local and API models on a limited budget; try prompt structures, including studying a prompt shared online, context-window sizes, what history to keep, and how to make tool output lighter. Provider adapters, sessions, context estimates and compaction, roles, and permissions grow from those experiments. The final backbone is not a copy of that shared prompt.
- **Result:** A working terminal agent makes prompts, tools, permissions, and history inspectable. Useful behavior around a fixed model does not prove that the model learned. The side project draws my attention toward transformer context and latent state.
- **Next / media:** Bridge to Active Sensing without presenting the harness as an ML result. Use a short verbatim README terminal excerpt, identified as example output, instead of an invented image.

## active-sensing-vis

- **Start:** Harness experiments and study of transformer context, associative memory, and vision prompted a suspicion that many image tasks can be solved from static views without forcing evidence from one look to guide another. This is the owner's motivation, not a universal claim about images or models.
- **Corrections:** The first relational two-look task required a target beyond the reachable location gradient. Replace it with more candidates than glimpses. A staged schedule makes pointing learnable, but more seeds weaken an early coverage claim and same-slot controls show that an apparent gain can come from selecting easier objects rather than reading better.
- **Result:** Shuffling the carried state between images performs about as well as the true state; a glimpse-blind policy points better. This dataset, model, and training loop did not demonstrate experience-updating latent memory. It is a scoped negative result.
- **Decision / media:** Continuing would require new or cleaned data, staged pretraining, and model redesign, mostly repeated diagnosis with no clear route to the larger intelligence question. Explain why I stopped and turned to learning from interventions. No image.

## causal-world-learning-and-transfer

**Provisional editorial outline.** The owner said this project is unfinished and has not verified its narrative. Keep that status visible.

- **Current question:** Investigate how an agent with limited actions could choose evidence, revise beliefs about an unfamiliar world's rules, and eventually pass knowledge to another agent. The proposed bridge from Active Sensing is not owner-verified.
- **Current instrument:** Finite deterministic Boolean worlds, interventions, and an exact elimination oracle give a checkable answer key. Random and information-gain policies are baselines.
- **Current result / boundary:** The repository supplies a controlled testbed and early experiments. It has not demonstrated a learned policy for learning or agent-to-agent transfer. The oracle is exact only inside its finite world family.
- **Media:** The authored intervention diagram illustrates the mechanism; it is not an experiment result. Revisit the story as research and owner review advance.
