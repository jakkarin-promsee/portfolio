## Bio-Analog CPU began as a search for a learning rule that could live inside an analog substrate.

After working through gradient descent by hand, I thought its global backward pass was the wrong way to build the kind of learner I had in mind. I wanted to try making an alternative, not just argue for one. Building ChronoForge had convinced me that designing a substrate myself was possible, so I imagined weights held near the computation, with local updates that could happen while it ran. I began with a rule that would change each weight according to its contribution to an output. At that point I was testing a learning rule and a possible substrate, not aiming at a continual-learning score. The repository records the mathematical designs and **behavioral simulations**; no chip was fabricated.

## The first rule could not tell a weight where to go

The attribution rule could estimate *how much* a weight contributed, but that did not tell it *which direction* to move. Calculating contributions across the system also ran into the summation cost I had hoped the substrate would avoid. This was the first major correction to my thinking: placing weights in an analog design did not solve the learning problem by itself. I abandoned the rule and looked for a method that could learn through local forward passes.

Self-Contrastive Forward-Forward gave me a new starting point. The first local block showed an early continual-learning advantage, but it picked up broad input structure more readily than class distinctions. Stacking more blocks did not produce useful depth. Instead of simply making the model larger, I changed the learning objective and let nearby layers coordinate. I still expected the small classifier that attached labels to the learned structure to need gradient descent; a comparison of classifiers favored a closed-form solution instead. Each step changed the design in response to a specific failure or test.

## What the finished design showed

The final version paired a roughly **80% Self-Contrastive Forward-Forward (SCFF)** learner, which finds structure without labels through local forward updates, with a roughly **20% closed-form SLDA** classifier that puts labels on that structure. A gate limits classifier updates, and a small prototype memory helps realign it as the learner changes. The tested design uses no gradient descent. I froze it before comparing it with a tuned backpropagation model using experience replay and a matched memory budget.

<!-- overview-media -->

In the five-domain rapid-switch simulation pictured above, the final design stayed steadier through changes: its worst-point accuracy was **0.490 versus 0.350**, though the two finished close (**0.490 versus 0.504**). That is the success the figure shows: retention during rapid changes, not better accuracy everywhere. When each domain lasted longer, replay had time to recover and could finish ahead. The design also lost on plain static accuracy and on estimated energy when both models were priced as digital computation. Any analog energy advantage is still a model estimate, not a chip measurement.

I came away less certain that gradient descent was simply the wrong road: my own rule had failed at a problem it solves, the direction of an update. Bio-Analog CPU gave me a way to train and maintain a learner under particular constraints, but it did not explain how that learner comes to understand an unfamiliar world. That gap led me to inspect the system around a fixed model in [my-harness](/repositories/my-harness), then to ask more directly what an agent learns from experience.
