# ML01 — Linear Regression and Backpropagation From Scratch

Categories: [Machine Learning, Numerical Computing, Learning Project]

Summary: An educational reconstruction of gradient descent and backpropagation, starting with affine linear regression and expanding into feedforward regression networks with one and three hidden layers. The notebook derives the chain rule and matrix shapes by hand, then turns those steps into NumPy implementations and a small composable dense/ReLU model. Synthetic curved targets make it possible to see what a linear model can and cannot fit, and how hidden activations change the result.

Highlights:
- Four progressively more general experiments: no hidden layer, one hidden layer, three hidden layers, and a composable model.
- Explicit derivations of output gradients, weight and bias gradients, and backward propagation through ReLU.
- Mini-batch training, MSE optimization, MAE evaluation, and plotted prediction/error histories.
- Clear separation between linear regression and nonlinear neural-network regression.

Tech stack: [Python, NumPy, Jupyter Notebook, Matplotlib]
