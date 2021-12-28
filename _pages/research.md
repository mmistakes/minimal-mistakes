---
# layout: page
# title: Research
permalink: /research/
---

# **MR Pulse Sequence Programming**

----
### Asymmetric-Echo Radial Sampling (i.e. Partial Fourier)

![](/assets/research/seq_asym-echo.png)

- Asymmetric-echo readout shortens echo time (TE), and is beneficial in combination with flow-compensation and -encoding gradients.

- Overlapping of flow gradients with pre-dephasing and/or slice-rewinder gradients further reduces TE. 

----
### Multi-Echo Radial Sampling

![](/assets/research/seq_multi-echo.png)

- In analogy with the famous echo-planar imaging (EPI), multi-echo radial samples multiple echoes at different k-space radial spokes per radio frequency (RF) excitation. 

- It is applicable to water/fat separation, functional MRI, quantitative T2* mapping, and even diffusion/susceptibility imaging (under developments).

---
### Stack-of-Stars Volumetric Sampling

- The above 2D radial sampling schemes have been integrated with [stack-of-stars](http://www.koreascience.or.kr/article/JAKO201430754387343.page) acquisition for volmetric and multi-dimensional imaging.

- Here is an example of [the stack-of-stars acquisition on the NIST phantom and NUFFT reconstruction](/assets/research/NIST_cor_loop.gif):

----
# **Model-based Reconstruction**

----
### Real-Time Phase-Contrast Flow MRI

![](/assets/research/recon_flow.png)

- The model-based reconstruction directly and jointly estimate the magnitude and the phase-difference image from acquired *k*-space data.

- With proper regularization on the phase-difference map, the model-based reconstruction largely removes random phase noise in the background, which appears from the conventional phase difference calculation between two images.

----
### Water/Fat Separation, R2* and B0 Field Inhomogeneity Mapping

![](/assets/research/recon_multi-echo_liver-all-subjects.png)

- Joint estimation based on [iteratively regularized Gauss Newton method (IRGNM)](https://onlinelibrary.wiley.com/doi/full/10.1002/mrm.21691) and [alternating direction method of multipliers (ADMM)](https://stanford.edu/~boyd/papers/pdf/admm_distr_stats.pdf) to allow for generalized regularization.

- For joint R2* mapping, temporal TV regularization is incorporated.

- Free-breathing liver fat and R2* mapping in 15 seconds for 2D acquisition and in 2 minutes for 3D acquisition.

- Respiratory motion is resolved with the [SSA-FARY](https://ieeexplore.ieee.org/document/9057630) self-gating technique.