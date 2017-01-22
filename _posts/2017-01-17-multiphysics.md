---
layout: single
title: "Multiphysics"
tags: [physics, multiphysics]
---
## Libraries:
* [Trilinos](https://trilinos.org/). Sandia (Energy Department USA) Multiphysics library.

Used in CASL Vera (Nuclear Physics software).

Big, legacy code. Check for TPetra, and PackageName2 for modern usage.

Kokkos is really interesting as an abstraction for parallel architectures (including, openMP, MPI, GPU/CUDA accelerator).

For including in project... Trilinos is huge.

Think on using Docker for releasing. There is nvidia-docker for GPU.

## Videos:
[An Introduction to Computational Multiphysics II: Theoretical Background Part I](https://www.youtube.com/watch?v=wbWlOZ3KWuw)

In coarse-graining we reduce number of variables at the cost of more complicated relationship between them.

Non-linearities (and further non-linearities on derivatives) provoke this explosion of complexity.

Non-linearities generates:

* Memory (Markov -> Non-Markov)
* Noise (Deterministic -> Stochastic)
* Feedback loops and blurring of cause/effect relationships.

[An Introduction to Computational Multiphysics II: Theoretical Background Part II](https://www.youtube.com/watch?v=2SR7F-c6GBY)
Bottom system is the most simple/abstract posible:

$$\dv{x}{t} = f(x)$$

where $f$ is the driver of the system, analogous to a force.

$$ X = x +\xi, <\xi> = 0 $$

where $X$ is the coarse grained variable from $x$ and $\xi$ is the fluctuation

Moments of fluctuation $<\xi^k>$ couples with the 'landscape':
$\frac{\text{d}^k f(x)}{\text{d}x^k}\vert_{x=X}$

The statistics of the correlation are defined as kinetic moments:
$$\mu_p  = \int_{t-h}^{t+h}\xi^p dt$$

where h is the window of the filter (analysis).

Hierarchy of correlations: dynamic closures.

$$\dv{\mu_p}{t} = \frac{f'(X)}{p}\mu_p + \frac{1}{p}\sum_n \frac{f^{(n)}(X)}{n!}(\mu_p,\mu_n - \mu_{p+n})$$

Extended Self-similarity (Dynamic closure):

$$\mu_p = c_{p/q}(\mu_q)^{p/q}$$ where $p>q$.

The constants $c_{p/q}$ contains the statistics of the problem, and can be explored.

Min 10:
Statistical mechanics, two main frameworks: Boltzmann, where trajectories and velocities are involved, and Gibbs, which is useful for equilibrium states.

Both are equivalent if system is *ergodic*, where time average can be replaced by statistical average of states.

```cpp
#include <string>
void f(){
  return 1;
}
```
