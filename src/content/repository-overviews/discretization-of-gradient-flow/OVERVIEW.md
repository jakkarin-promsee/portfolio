## The Hessian let me explore training as a problem in algebra and geometry.

[ML01](/repositories/ML01-linear-regression-from-scratch) gave me an intuition for how a gradient reaches an individual weight. While studying optimization and initialization, I became interested in the *shape* around that gradient. For squared-error linear models, the Hessian connects to the Gram matrix of the inputs; more generally, its eigenvectors and eigenvalues describe directions of local curvature. I wanted to work through that algebra myself and see whether the steps I calculated on paper could actually train a model. This project is as much an exploration of what the mathematics lets me do as it is a comparison of optimizers.

## From a local surface to three update rules

I derived three ways to move on the same loss landscape. **Explicit gradient descent** uses the slope at the current point. An **implicit update** solves for the next point using a local quadratic approximation. **Newton's method** uses curvature to aim toward the local quadratic optimum. Working through Hessian symmetry, quadratic forms, and eigendirections gave me a way to reason about these moves instead of treating each rule as a formula to memorize.

I then wrote the gradient and Hessian calculations, linear solves, model layers, and update strategies in NumPy. The implementations matter because they test whether the derivations survive contact with actual calculations. They also expose the extra work required by curvature-aware methods; a more informed step is not free.

<!-- overview-media -->

## What the curves taught me

The repository's validation-loss plots show Newton moving fastest early in the reported setup, while the implicit method becomes the steadier long-run curve. Newton's later steps can become erratic near low loss. These figures show the behavior of these implementations on this experiment, not a universal ranking. The useful result for me was a more concrete feel for the trade between step size, curvature, stability, and computation.

I could now follow a weight update from individual derivatives into higher-dimensional geometry, but that still left the larger question of what a learning system understands. Later, [ChronoForge](/repositories/chronoforge-fpga-engine) gave me a separate, hands-on way to explore how the physical architecture doing the computation changes a design.
