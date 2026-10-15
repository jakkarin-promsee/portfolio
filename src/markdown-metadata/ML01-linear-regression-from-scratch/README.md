# ML01 — Linear Regression and Backpropagation From Scratch

My first attempt to derive gradient descent and backpropagation by hand, then turn the equations into NumPy code. I started with a single affine layer, wrote out networks with one and three hidden layers, and finally built a small class that can compose dense and ReLU layers.

The point of this project is to show where each gradient comes from. The data is synthetic, and the notebook is an experiment in understanding training rather than a benchmark or a production library.

## What is in the repository

| Path | Purpose |
| --- | --- |
| [main.ipynb](main.ipynb) | Four experiments: no hidden layer, one hidden layer, three hidden layers, and a composable model. |
| [custom_library/models.py](custom_library/models.py) | Dense and activation layers, the model class, and training history. |
| [custom_library/utils.py](custom_library/utils.py) | Data splitting, activation functions, and regression metrics. |
| [requirements.txt](requirements.txt) | Python dependencies for running the notebook. |

The first experiment is linear regression. The later experiments are **feedforward neural networks for regression**: once ReLU hidden layers are added, the model is no longer linear regression in its input.

## Run the notebook

Use Python 3.11 or newer. From the repository root:

~~~bash
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
python -m pip install -r requirements.txt
jupyter notebook main.ipynb
~~~

Run the cells in order. The notebook generates its own data; it does not need an external dataset. Random initialization, noise, and the train/evaluation split mean exact curves can differ between runs. Later experiments train for hundreds of epochs and may take a while.

## Experiments

1. **No hidden layer:** learn $\hat Y=XW+b$ directly from two input features.
2. **One hidden layer:** compute $Z^{(1)}=XW^{(1)}+b^{(1)}$, $A^{(1)}=\operatorname{ReLU}(Z^{(1)})$, then a linear output.
3. **Three hidden layers:** write out forward and backward passes for several matrices. The third hidden layer in the notebook has an identity activation.
4. **Composable model:** assemble dense and optional ReLU layers with `Lr_Models`, then train with mini-batch gradient descent.

The synthetic targets are curved functions of an underlying scalar input. The first experiment uses that input and its square as features. A single affine layer cannot represent every target curve exactly; the later experiments explore how hidden activations change the function that can be fitted.

## Mathematical derivation

### Shapes and forward pass

Use row vectors for samples. For a batch of $m$ examples, layer $l$ has

$$
A^{(l-1)}\in\mathbb R^{m\times d_{l-1}},\quad
W^{(l)}\in\mathbb R^{d_{l-1}\times d_l},\quad
b^{(l)}\in\mathbb R^{1\times d_l}.
$$

The bias broadcasts across rows. Starting from $A^{(0)}=X$,

$$
Z^{(l)}=A^{(l-1)}W^{(l)}+b^{(l)},\qquad
A^{(l)}=f_l(Z^{(l)}).
$$

The output layer uses the identity activation for regression, so $\hat Y=A^{(L)}=Z^{(L)}$. Hidden layers can use ReLU:

$$
\operatorname{ReLU}(z)=\max(0,z),\qquad
\operatorname{ReLU}'(z)=
\begin{cases}1 & z>0,\\ 0 & z\leq 0.\end{cases}
$$

At zero, ReLU is not differentiable; the implementation chooses a subgradient of zero.

### Why an activation matters

Two affine layers without an activation collapse into one:

$$
(XW^{(1)}+b^{(1)})W^{(2)}+b^{(2)}
=X\underbrace{W^{(1)}W^{(2)}}_{W_{\mathrm{eff}}}
+\underbrace{b^{(1)}W^{(2)}+b^{(2)}}_{b_{\mathrm{eff}}}.
$$

The same holds for any stack of affine layers. ReLU changes this because different inputs can activate different units. For a fixed pattern of active units, the network is affine; across patterns, it is piecewise affine. More hidden units and layers can create more patterns, but the number of input regions is **not** generally $2^L$ for $L$ layers.

### Loss and output gradient

The notebook predicts one scalar per example. For a batch of $m$ examples it trains with mean squared error:

$$
\mathcal L=\frac{1}{m}\sum_{i=1}^{m}(\hat y_i-y_i)^2.
$$

Differentiate with respect to each prediction separately. For the identity output activation,

$$
\frac{\partial\mathcal L}{\partial\hat y_i}
=\frac{2}{m}(\hat y_i-y_i),\qquad
\Delta^{(L)}:=\frac{\partial\mathcal L}{\partial Z^{(L)}}
=\frac{2}{m}(\hat Y-Y).
$$

There is no sum over examples inside $\Delta^{(L)}$: it has the same shape as $\hat Y$. The summation happens when computing parameter gradients. For an output activation $f_L$, multiply this output gradient elementwise by $f_L'(Z^{(L)})$. If each example had $q$ outputs and the loss averaged over **all** $mq$ values, the factor would instead be $2/(mq)$.

### Backpropagation by the chain rule

For one layer, $z_{ij}^{(l)}=\sum_k a_{ik}^{(l-1)}w_{kj}^{(l)}+b_j^{(l)}$. Therefore

$$
\frac{\partial\mathcal L}{\partial w_{kj}^{(l)}}
=\sum_{i=1}^{m}a_{ik}^{(l-1)}\Delta_{ij}^{(l)},\qquad
\frac{\partial\mathcal L}{\partial b_j^{(l)}}
=\sum_{i=1}^{m}\Delta_{ij}^{(l)}.
$$

In matrix form, with $\Delta^{(l)}=\partial\mathcal L/\partial Z^{(l)}$:

$$
\boxed{\nabla_{W^{(l)}}\mathcal L=(A^{(l-1)})^\top\Delta^{(l)}}
\qquad
\boxed{\nabla_{b^{(l)}}\mathcal L=\sum_{i=1}^{m}\Delta_{i,:}^{(l)}}.
$$

To continue toward an earlier layer, first propagate through the affine map, then through its activation:

$$
\frac{\partial\mathcal L}{\partial A^{(l-1)}}
=\Delta^{(l)}(W^{(l)})^\top,\qquad
\boxed{\Delta^{(l-1)}=
\bigl[\Delta^{(l)}(W^{(l)})^\top\bigr]
\odot f_{l-1}'(Z^{(l-1)})}.
$$

Here $\odot$ is elementwise multiplication. The weight matrix in this expression must be the one used in the forward pass; update parameters **after** calculating the gradient to pass backward.

Finally, gradient descent applies

$$
W^{(l)}\leftarrow W^{(l)}-\eta\nabla_{W^{(l)}}\mathcal L,
\qquad
b^{(l)}\leftarrow b^{(l)}-\eta\nabla_{b^{(l)}}\mathcal L,
$$

where $\eta$ is the learning rate. Each mini-batch uses its **actual** number of rows $m$, including the last batch.

### Single-layer special case

For $\hat Y=XW+b$, there is no hidden activation. The entire backward pass reduces to

$$
E=\frac{2}{m}(XW+b-Y),\qquad
\nabla_W\mathcal L=X^\top E,\qquad
\nabla_b\mathcal L=\sum_{i=1}^{m}E_{i,:}.
$$

This is the starting point for the manually expanded networks in the notebook.

## Reading the results

Training minimizes **MSE**, while the notebook reports **MAE** for easier interpretation:

$$\operatorname{MAE}=\frac{1}{n}\sum_i|y_i-\hat y_i|.$$

MAE is an error, so **lower is better**. The evaluation split is used for monitoring and comparing epochs, not for gradient updates. Plots compare predicted and true values and show the error history. Since the data is generated randomly, compare the trend rather than expecting one fixed score.

## Scope

This is an educational reconstruction of the chain rule and mini-batch training using NumPy. It supports dense layers, optional ReLU activations, a linear regression output, and synthetic scalar regression targets. It does not attempt to be a general neural-network framework.

## License

Original code and documentation authored by Jakkarin Promsee are licensed under the [MIT License](LICENSE). Third-party code, assets, datasets, and other materials are not covered by this license; their original terms apply.
