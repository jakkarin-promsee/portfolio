# Bio-Analog CPU

Categories: [AI Research, Continual Learning, Neuromorphic and Analog Computing]

Summary: A behavioral-simulation research program designing a continual learner around the constraints of a possible analog compute-in-memory substrate: resident weights, local forward-only learning, and realistic noise and energy costs. Draft 6.0 combines a 12-layer self-contrastive unsupervised bulk with a small closed-form SLDA classifier, a drift gate, and periodic prototype-memory consolidation; the system contains no global backpropagation. Eleven phases and about 70 controlled experiments map where this frozen design preserves information under shifting streams and noise, where tuned replay backprop wins, and where the data or the simulation model limits any claim. No chip or circuit has been built.

Highlights:
- Built and froze a two-part learner before comparing it with a tuned, memory-matched experience-replay baseline.
- On a lifelong stream, reported similar final accuracy but roughly tenfold less worst-case forgetting; tested order and schedule changes separately.
- Measured held-out noise behavior, static-accuracy losses, same-substrate energy losses, real-data drift, and scaling in one limit map.
- Treats the current “baby neocortex” as the first organ in a broader, explicitly unbuilt recurrent-mind research direction.

Tech stack: [Python, NumPy, scikit-learn, behavioral simulation, continual-learning experiments, analog energy/noise models]
