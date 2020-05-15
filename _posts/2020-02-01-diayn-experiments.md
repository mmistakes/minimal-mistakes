---
title: "Diversity Is All You Need (DIAYN)"
tags:
  - Reinforcement Learning
  - Implementation
  - Research
---

We re-implement the DIAYN algorithm for both discrete and continuous action space case based on the SAC algorithm.

Furthemore, we extend the reward generation mechanism by enabling support with categorical as well as continuous valued vector of skill.

Last but not least, we propose a hierarhical agent with intrinsic reward based on the DIAYN method for the low-level agent and a simple SAC agent as a high level policy.
The goal was to solve long horizon tasks but ... what happened in the end ? Gotta dig in the experiments

# Introduction
- Sparse reward are hard to solve. DIAYN propose a method for the agent to create is own reward based on how much of the state space it has already covered.

# Background

## Posterior distribution estimation ?

## Soft Actor Critic

# Implementation

## Discrete Skill Case

## Categorical Skill Case

## Continuous Skill Case
- Note the caveat of slower convergence as well as the ambiguous nature of what the agent learn.
- Note that it only works satsifactory enough for low dimension of the skill vector.

# Experiments

## Simple Grid World
- Show how the state space is separates with each type of skill

## Door-Key-like problems
- Show how DIAYN can help reach multiple objective
- Show how adding one hierarchical layer actually helps "mixing" the skills

## Mujoco's AntGather-like tasks

# Discussion and concluding remarks
