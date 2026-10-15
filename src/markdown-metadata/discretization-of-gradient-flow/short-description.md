# Discretization of Gradient Flow

Categories: [Machine Learning Research, Numerical Optimization, From-Scratch Implementation]

Summary: A pure-NumPy comparison of explicit gradient descent, an implicit backward-Euler-style update, and Newton's method as different ways to step through a loss landscape. The project builds its own dense layers, gradients, Hessian calculation, update strategies, training history, and experiment notebook. It pairs mathematical derivations of the updates and Hessian properties with validation-loss curves that show fast early Newton steps, steadier implicit convergence, and slower explicit convergence in the reported setup.

Highlights:
- Implements explicit, implicit, Newton, and an optimized Newton variant without an automatic-differentiation framework.
- Derives the update rules from local Taylor approximations and explains Hessian symmetry, quadratic forms, and eigendirections.
- Compares early and long-run validation-loss behavior, including late Newton instability in the reported experiment.
- Separates shared model/layer machinery from the update strategies for direct comparison.

Tech stack: [Python, NumPy, Jupyter Notebook, Matplotlib]
