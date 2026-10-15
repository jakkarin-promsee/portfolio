# Discretization of Gradient Flow

## The question behind the experiment

Gradient flow describes continuous movement downhill on a loss surface. This project asks how three discrete training rules behave when that movement is approximated differently. It is both a mathematical study and a from-scratch implementation: the repository derives the updates, computes gradients and Hessians with its own NumPy code, trains comparable small models, and plots validation-loss trajectories.

## Three update rules

- **Explicit gradient descent** evaluates the current gradient and takes `theta_next = theta - eta * gradient`. It is simple and first order, but a poorly chosen step can make it slow or unstable in stiff directions.
- **Implicit/backward-Euler-style descent** solves a local quadratic model. The implementation constructs `I + eta * H` and solves a linear system for the next parameter vector, using the current gradient and Hessian. This introduces curvature into the update and avoids an explicit matrix inverse.
- **Newton's method** solves a damped Hessian system for `-H^-1 * gradient`, aiming for the local quadratic optimum in one step. The checked-in `newtonLrModel.py` adds a small diagonal damping term; a separate optimized Newton strategy exists. The methods should be described as the repository's implementations, not as universally superior algorithms.

The README develops why a Hessian is a matrix of second derivatives, why its symmetric eigendirections matter, and how the quadratic form describes local curvature. The theoretical account is substantial: it is not merely a collection of optimizer calls.

## Implementation and experiment flow

`custom_library/core/` holds base model behavior and the loss, gradient, and Hessian machinery. `layers/` implements dense and activation layers. `models/` isolates each training strategy. `utils/` provides metrics, data handling, and training history. `main.ipynb` is the experiment lab and produces the comparisons. Each training strategy flattens parameters for vector/Hessian operations, applies an update, restores layer shapes, records training and validation metrics, and preserves history for plots.

The reported early validation-loss ordering is Newton, then implicit, then explicit. Over longer training, the README reports the implicit method as the stable faster curve; explicit descent eventually improves more slowly, while Newton becomes erratic when the loss is very low. The described cause is sensitivity of Hessian-based steps to noise/ill-conditioning. These are observations from this setup, not a general convergence guarantee. The README discusses damping and line search, but the plain `NewtonLrModel` shown in source applies damping and a direct solve; claims about line search should be tied to the optimized variant or a specific experiment configuration.

## What this project demonstrates

The value lies in connecting equations to running code. The same regression model and measurement path make the update rule the main variable of interest. A reader can see why second-order information changes the shape and cost of a step, and why rapid first steps do not necessarily imply best long-run behavior. Numerical Hessian computation and linear solves are expensive relative to simple gradient steps, so the experiment is about understanding optimizer behavior at small scale rather than presenting a production training method.

## Evidence and open questions

- `project/discretization-of-gradient-flow/README.md` contains the mathematical derivations and reported early/late experiment conclusions.
- `project/discretization-of-gradient-flow/main.ipynb` is the experiment lab.
- `project/discretization-of-gradient-flow/custom_library/core/baseLrModelsImplementHessain.py` contains gradient/Hessian computation; `custom_library/models/` contains each update implementation.
- `project/discretization-of-gradient-flow/docs-src/result/` contains the published convergence figures.
- **Open question:** The repository does not establish whether the observed ordering holds over other architectures, datasets, and hyperparameter budgets; those should not be presented as tested results.
