## Deriving learning from individual numbers gave me an intuition I could trust.

When I first tried to learn machine learning, I could follow a recipe for taking derivatives but could not picture what the numbers were *doing*. I wanted to understand how a model stores a relationship in its weights, down to the contribution and update of one number. So I started with linear regression and worked through the prediction, error, and gradient by hand, without beginning from a matrix formula or an automatic differentiation library. The point was to build the intuition myself, not to show that I could write another ML implementation.

## Making each step explainable

In the notebook, I first follow a single affine layer: how its inputs and weights produce a prediction, and how the error gives each weight a direction to move. I then carry the same chain rule through networks with one and three hidden layers. Writing out the backward calculations before packaging them into NumPy code let me check that I understood each operation, rather than memorizing the final derivative.

The later experiments add ReLU and a small reusable layer system. Synthetic curved targets make an important distinction visible: a stack of affine operations alone is still affine, while hidden activations let the network represent different shapes. The code and plots are checks on the reasoning. They are not the main result, a benchmark, or a general-purpose library.

What changed for me was that a trained model stopped feeling like unexplained numbers. I could trace how repeated updates made a weight encode part of a useful input-output relationship. That gave me an intuition about *how numerical learning works*; it did not establish that fitting examples is the same as understanding an unfamiliar world. From there I wanted to examine the update step itself. [Discretization of Gradient Flow](/repositories/discretization-of-gradient-flow) took me into Hessians and different ways to move across a loss landscape.
