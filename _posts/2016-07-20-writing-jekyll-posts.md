---
title: "Basics of Extreme Learning Machines"
excerpt: "Why learng weights when you can guess them?"
categories: [work, machine learning, neural networks]
tags: [elm, machine learning, neural networks]
classes: wide
---

> I based my post on [Extreme learning machine: Theory and applications, by Guang-Bin Huang, Qin-Yu Zhu, Chee-Kheong Siew](http://axon.cs.byu.edu/~martinez/classes/678/Presentations/Yao.pdf). That means that we will focus on neural networks with one hidden layer. Further advances have been made - for example using multiple hidden layers. If you are interested in that, you can visit [this site](http://www.ntu.edu.sg/home/egbhuang/). It is definetly worth it. 

## What is Extreme Learning Machine?

Before we can understand ELMs brief remainder of how Single hidden Layer Feedforward Networks (SLFNs) look like.

### Single hidden Layer Feedforward Networks

As the name suggets SLFN is a neural net that has a single hidden layer. What makes them interesting is that they are simple, which makes them easier to understand, imagine, represent and reason about. We will start with very simple example.

![Single layer Feedforward Network](/assets/img/slfn.jpg "SLFN")

There are two _neurons_ in input layer, three in hidden layer and one in output layer. Usually, we are most concerned about hidden layer and that is why this type of neural network is called _single layer_. By _feedforward_ we mean that data during actual usage (not during training) flows only forward, from left to right. We can represent input to this network as a two dimensional vector $x \in R^{2}, x = [x_{1}, x_{2}]$, hidden layer as a three dimensional vector $l \in R^{3}, l = [l_{1}, l_{2}, l_{3}]$ and output simply as a number $y \in R, y = y_{1}$.

We will be more interested in connections, which are represented by arrows in the image. Every arrow represents weight of that connection. In order to calculate value $l_{1}$ we need to do the following:

$$l_{1} = g(x_{1} * w_{11} + x_{2} * w_{12} + b_{1})$$

Let's unpack this equation. $w_{11}, w_{12}$ are aformentioned weights connecting $x_{1}, x_{2}$ to to $l_1$ and $g$ is an [activation function](https://en.wikipedia.org/wiki/Activation_function). If you do not know why bother with an activation function - it helps neural net learn learn complicated dependencies. You can read about this on [this stackexchange post](https://ai.stackexchange.com/questions/5493/what-is-the-purpose-of-an-activation-function-in-neural-networks). What is $b_{1}$? It is a parameter called bias. It "moves" our function in proper direction if needed. My intuition goes as follows: We can have whole family of functions $x^{2} + b$, but in order to precisely identify which one I am talking about I need to pinpoint $b$ parameter which is a bias. In function $x^{2} + 4$ 4 represent the bias.

### Matehmatical Interlude: Pseudoinverse and Least Squares Solution

## Sample Implementation and Tests

