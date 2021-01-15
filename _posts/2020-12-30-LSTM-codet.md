---
title: "Predicting Manipulation Force on deformable Linear Objects Using LSTM"
categories:
  - Post Formats
tags:
  - link
  - Post Formats
link: https://colab.research.google.com/gist/DomMcKean/c19b8f8a3b2f77cfd6fb8d836b8a19db/trainer.ipynb
---

This code uses an LSTM network to predict the contact forces between flexible linear objects like wiring, hoses and seals and their environmental 
obstacles while being manipulated by a Universal Robots' UR10.
The model is able to predict the manipulation forces over full 1000 sample trajectories by using a novel approach to data manipulation.
Robot trajectories are sliced in to chunks and fed into the LSTM in turn but while also maintaining corrolation between chunks but not between training and testing trajectories that could otherwise corrupt the LSTM's hidden state during training. 
The code then stitches the slices the chunks back together to form full trajectories that can then be evaluated. 

The model is capable of predicting manipulation force even when the flexable object passes through a multitude of obstacles to reach a goal position. 

[View on Google Colab](https://colab.research.google.com/gist/DomMcKean/c19b8f8a3b2f77cfd6fb8d836b8a19db/trainer.ipynb) .

