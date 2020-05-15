---
title: "Tensorflow 1.0 Tensorboard Wrapper with WANDB Logging"
excerpt: "A wrapper that handles creating of log directory for your runs. Also add painless logging support for Tensorboard, Pytorch and WanDB support."
tags:
  - Deep Learning
  - Python
  - Tensorflow
  - Pytorch
  - WanDB
  - Logging
---

## Motivation

In TF1, TB logging would require summaries and such. What a pain. Also folder logging and such would be complex.
Here, expands on a logger that handles most of the logging related tasks in a single object class.

One might argue that just having the results printed in console is good enough, to which I would instead formualte two arguments:
1. Plots enables us to get insights that a barrage of numbers in the terminal can not transmit, at least to a simple mortal such as me.
2. Who can resist having multiple tabs of Tensorboard plots opened ? You can use it to pretend you are doing something interesting (hahaha ?).
