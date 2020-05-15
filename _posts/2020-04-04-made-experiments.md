---
layout: single
title: "Deep Dive into MADE: Masked Autoencoder for Distribution Estimation"
tags:
  - Unsupervised Learning
  - Implementation
  - Research
toc: true
toc_sticky: true
author_profile: true
---

# Introduction
Motivation: A tangent into UL.
Motivated by talks of Yann LeCunn, and how in general, RL is still restricted to how the human have formalized the framework itself.
Entry in unsup learning, following that Berkeley course.
Adertised as simple? Boy, I do not think so

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


# Background

## Standard VAE

## Autoregressive VAE

# Implementation

# Discussion and Conclusion
