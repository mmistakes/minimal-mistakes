---
layout: single
title: "Messing around with MADE: Masked Autoencoder for Distribution Estimation"
tags:
  - Unsupervised Learning
  - Distribution Estimation
  - Implementation
  - Research
toc: true
toc_sticky: true
author_profile: true
classes: wide
---

# Introduction
Motivation: A tangent into UL.
Under the guise of numerous encounters with models imported from the deep unsupervising learning field, namely variational autoencoders (World Model Paper **TODO: Add ref**), distribution estimaters (DIAYN **TODO: Add paper ref**), or RealNVP (Latent Space Policy for Hierarchical Reinforcement Learning **TODO: Add ref**), I started looking into said field.
An additional motivation would be need for reinforcement learning to be even more autonomous, and make better used of its experience, which seemingly requires better representation learning, which again, is also deeply tied with unsupervised learningf field.

Following the **TODO: Insert course denomination** of the University of Berkeley, I gave a go at my maybe second or third reproduction of a deep unsupervised learning algorithm, namely the Masked Autoencoder for Distribution Estimation (MADE) **TODO: Insert paper ref**.
While it was advertised as a simple enough algorithm, it might not be necessarily the case, especially for a freshman in the sub-field.
Without further delay, let us dive into the content of the paper and the step-by-step process of re producing the proposed method.

# MADE: Core concept
In unsupervised reinforcement learning, the focus is to recover the distribution of the data we are provided, to use on downstream tasks such as new sample generation or **TODO: there is at least one more use that seems to escape me**.
A simple example would be the autoencoder, which aims at learning a **compressed representation** $z \in \mathbb{R}^K$ from a set of observed variables ${X}, X \in \mathbb{R^D}$, which serves as an approximation for the original unobserved variable that was used to generate said data.
Once we have approximated that latent variable, we can sample from the corresponding latent space to generate new, but related samples, or just use the decoder part to improve the performance in a classification task (?).
**TODO: Add probabilistic graph of data generation with the flower picture justaposed as an example ?**

The core idea of MADE builds on top of that concept.
It leverages potential relationship that exist among the elements of the input variable $X$ to build a prediction model for each element of said input variable.
Indeed, if you consider the *red pixel in the flower picture*, we might say that its value is dependent on that of the previous pixels for example, or maybe some pixel that represent the root or the leaves of the flower itself.
This property if formally refered to as "auto-regression" (dependence on itself), and is implemented in MADE by introducing masks for the weights of the neural network that is used to estimate the distribution of the variable's element.
The distribution of an arbitrary pixel becomes depend of a few other pixels.
More formaly **TODO: Introduces the proper formulas**.

# Technical details

## Standard VAE

Before actually diving into the method proposed in the paper, let us first quickly review the inner workings of a really dumbed down, standard autoencoder.
as per Figure 1. **TODO: Actually add the figure**

For simplicity, we thus define the input $X$ of the neural network as a vector of 3 real variables such as: $X = \left( \matrix{x_1 & x_2 & x_3} \right)$.

To compute the unique layer, or in this case the latent $H = \left( \matrix{h_1 & h_2 & h_3 & h_4} \right)$, we will define the "input-to-hidden" weight matrix $W$ and the "input bias" vector $B$ as follows:

$$
  W = \left( \matrix {
    w_{11} & w_{12} & w_{13} & w_{14} \\
    w_{21} & w_{22} & w_{23} & w_{24} \\
    w_{31} & w_{32} & w_{33} & w_{34}
  }\right) \mathrm{and} \enspace B = \left( \matrix{ b_1 & b_2 & b_3 & b_4} \right)
$$

$H$ is thus obtain as follows:

$$
H = \left(\matrix{h_1 \\ h_2 \\ h_3 \\ h_4} \right) = g( \left( \matrix{
    x_1 w_{11} + x_2 w_{21} + x_3 w_{31} + b_1 \\
    x_1 w_{12} + x_2 w_{22} + x_3 w_{32} + b_2 \\
    x_1 w_{13} + x_2 w_{23} + x_3 w_{33} + b_3 \\
    x_1 w_{14} + x_2 w_{24} + x_3 w_{34} + b_4 \\
  } \right)) \mathrm{,} \enspace (1)
$$

where $g$ is an non-linear activation function.
It is worth keeping in mind, however, that (1) in general the latent dimension is set to be smaller than the input, otherwise the neural network can just learn to "copy" the inputs, which defeats the original purpose, and (2) that the column vector $H$ was transposed for better readibility.
We do this to make the explanation of MADE's core idea more intuitive later on.

Then, to map from the latent $H$ to the output vector, in this case, the **reconstructed input** $\hat{X} = \left( \matrix{ \hat{x}_1 & \hat{x}_2 & \hat{x}_3} \right)$, we also declare the "hidden-to-output" weight matrix $V$ and the corresponding bias bector $C$ as below:

$$
  V = \left( \matrix {
    v_{11} & v_{12} & v_{13} \\
    v_{21} & v_{22} & v_{23} \\
    v_{31} & v_{32} & v_{33} \\
    v_{41} & v_{42} & v_{43}
  }\right) \mathrm{and} \enspace C = \left( \matrix{ c_1 & c_2 & c_3} \right)
$$

The output $\hat{X}$ is then explicitly computed as follows:

$$
\hat{X} = \left( \matrix{ \hat{x}_1 \\ \hat{x}_2 \\ \hat{x}_3 } \right) = \sigma ( \left(
  \matrix{
    h_1 v_{11} + h_2 v_{21} + h_3 v_{31} + h_4 v_{41} + c_1 \\
    h_1 v_{12} + h_2 v_{22} + h_3 v_{32} + h_4 v_{42} + c_2 \\
    h_1 v_{13} + h_2 v_{23} + h_3 v_{33} + h_4 v_{43} + c_3}
  \right)), \enspace (2)
$$

where $\sigma$ represents the activation of the output layer.
When dealing with binary variables, $\sigma$ is effectively understood as the *sigmoid* function, which squashed whatever raw output is computed between $0$ and $1$.
From Equations (1) and (2), we already start seeing how element of the output $\hat{x}_1$, $\hat{x}_2$, and $\hat{x}_3$ is related to the inputs $x_1$, $x_2$ and $x_3$.
Namely, we can write each of them as function of the inputs:

$$
 \hat{x}_1 = f_1(x_1,x_2,x_3) \\
 \hat{x}_2 = f_2(x_1,x_2,x_3) \\
 \hat{x}_3 = f_3(x_1,x_2,x_3)
$$

The goal of MADE is to change the inner workings of the autoencoder neural network so that every element of the output is only dependent on a subset of the original inputs:

$$
  \hat{x}_1 = f_1'() \\
  \hat{x}_2 = f_2'(x_1,) \\
  \hat{x}_3 = f_3'(x_1,x_2)
$$

The relations above assume we are following a *natural ordering* of the input variables

**TODO**
- Define the NN structure of the AE as well as training in the case of a binary variable ( NLL and such...

## Autoregressive VAE
- Reintroduce the motivate of the MADE VAE, add the customized intuive schema
- introduce the method proposed to for the masking
- Show how the masking works with the colored plots and equationaas

# Implementation
## MNIST MADE
- Simple AE implementation first ?
- Mask generation and layer connectivity generation too ? Also consider the memeory / computed trade off and reference Sir Karpathy's thecnique for mask generation
- Customizing Pytorch's layer and defining the model
- Defining the loss

## Exercise 2 from the Course and MADE customization
- Output can be softmax this time
- First we naively use the input data without normalization
- Then try to normalized but does not work for some reasons
- Then tryied the one hot version for the nest results

ACtually that might be too heavy for this part, since it basically corresponds to 2 models

# Training loop and sampling process

# Discussion and Conclusion

# Additional remarks and observations
Some potential point that might be worthy to stress
- When just using fixed input ouput and m_l masks, the model capacity cannot be leveraged to the fullest.
It therefore gave us really bad results (loss stagnating at 0.27 and still need to acutally implement it, but likely also gives bad generated pictures.)
- Turns even with the loss at 0.27 we actually managed to get it right and the outputs were being reconstructed !
- Followed up by investigating the range of values that the compoennts of the latent dim took with histograms and trying to generate more variety in the test sample. Also got the intuition that there might be something like mode collapse going on, hence looked a bit into L2 Norm and such.
- Adding a little bit of stochsticity would not be bad either I guess, but ...
- When adding the shuffling and weights "randomization" at each epoch for example, we should have better learning behavior, or so I hypotherised as of 2020-04-21

- After adding just input order shuffling, managed to reduce the loss even more. The pictures generated also had more variety straight from the beginning.
- After adding the connectivity agnoscism however, the network did not generate that good of a result, at least in the beginning.
Therefore, running some experiments overnight to see how it progresses.

- Found a potential probably in the layer connect counts generation.
1. Assume input orderings is [3 1 2]
2. Next layer count is something like [2 1 2 2]
3. The next one is [2 2 2 2], then the next is [1 2 1 1], and finally the last one which is again the input ordering.
This kind of mask actually makes the data, as well as the autoregressive property being really under exploited,
especially in lower dimension.
Henceforth the need for a better sampling scheme than Uniform, which is too dangerous, especially in low dimensions.

Especially in high dimensional input task, what gives us the certainty that the network will model an appropriate auto regression, just by randomly trusting the masks ?
Maybe this is where the universal approximation theorem's benefit comme in play ?a
