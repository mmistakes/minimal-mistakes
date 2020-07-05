---
layout: single
title: "Exploring MADE: Masked Autoencoder for Distribution Estimation"
tags:
  - Unsupervised Learning
  - Distribution Estimation
  - Implementation
  - Research
toc: true
toc_sticky: true
author_profile: true
---

# Introduction
Motivation: A tangent into UL.
Under the guise of numerous encounters with models imported from the deep unsupervising learning field, namely variational auto-encoders (World MOdel Paper **TODO: Add ref**), distribution estimaters (DIAYN **TODO: Add paper ref**), or RealNVP (Latent Space Policy for Hierarchical Reinforcement Learning **TODO: Add ref**), I started looking into said field.
An additional motivation would be need for reinforcement learning to be even more autonomous, and make better used of its experience, which seemingly requires better representation learning, which again, is also deeply tied with unsupervised learningf field.

Following the **TODO: Insert course denomination** of the University of Berkeley, I gave a go at my maybe second or third reproduction of a deep unsupervised learning algorithm, namely the Masked Autoencoder for Distribution Estimation (MADE) **TODO: Insert paper ref**.
While it was advertised as a simple enough algorithm, it might not be necessarily the case, especially for a freshman in the sub-field.
Without further delay, let us dive into the content of the paper and the step-by-step process of re producing the proposed method.

# MADE: Problem statement and proposed method
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

# Background

## Standard VAE
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
