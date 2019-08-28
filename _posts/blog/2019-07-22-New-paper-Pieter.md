---
layout: post
title: New paper published in PLoS Computational Biology
categories: blog
excerpt: Learning to synchronize: How biological agents can couple neural task modules for dealing with the
stability-plasticity dilemma
tags: [pieter-v, tom, new-paper]
image:
  feature:
link:
date: 2019-07-22
modified:
share: true
author: kobe_desender
---

Congrats to Pieter Verbeke et al for having their work accepted at PLoS Computational Biology!

In their paper, they present a computational framework on how biological and artificial agents can address the trade-off between being sufficiently adaptive to acquiring novel information (plasticity) and retaining older information (stability); known as the stability-plasticity dilemma. For this purpose, they combined two prominent computational neuroscience principles, namely Binding by Synchrony (Fries, 2005, 2015) and Reinforcement Learning (Sutton & Barto, 1998). The model learns to couple/synchronize task-relevant modules, while also learning to decouple/desynchronize currently task-irrelevant modules. As a result, old (but currently task-irrelevant) information is protected from overwriting (stability) while new information can be learned quickly in currently task-relevant modules (plasticity). In order to test the generalizability of their framework, learning to synchronize was combined with task modules that learn via one of three classical learning algorithms, namely Rescorla-Wagner (Widrow & Hoff, 1960), backpropagation (Rummelhart, Hinton & Williams, 1986) and Restricted Boltzmann machines (Hinton, 2012). 

The resulting models were tested on a reversal learning paradigm where the models had to learn to switch between three different task rules. The authors demonstrated how combining learning to synchronize with several classic learning algorithms resulted in significant computational advantages over networks without synchrony, in terms of both stability and plasticity. Crucially, the resulting models’ processing dynamics are also consistent with empirical data and provide empirically testable hypotheses for future MEG/EEG studies.

An online version of this paper can be found [here](https://www.biorxiv.org/content/biorxiv/early/2018/10/30/457150.full.pdf)

Reference:
- Verbeke, P., & Verguts, T. (2018). Learning to synchronize: How biological agents can couple neural task modules for dealing with the stability-plasticity dilemma. BioRxiv, 457150.
