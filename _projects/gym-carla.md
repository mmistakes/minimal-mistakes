---
title: "OpenAI Gym for Carla"
excerpt: "Walkthrough of the creation of a custom OpenAI Gym environment wrapper for the CARLA Simulator for Reinforcement Learning research."
tags:
  - Reinforcement Learning
  - Implementation
  - Autonomous Driving
  - Research
---

The CARLA Simulator provides a solid set of features for autonomous driving itself.
While trying to get some Deep Reinforcement Learning (DRL) agent to , I found it quite hard to spin up the Carla simulator as an environment for the agent to interact with.
There are indeed a few implementation available, such as ..., however, they are geared toward a specific use and were not necessarily suited for my interests.

Indeed, I needed to be able to control parameters of the simulation such as the car, the observation format of the agent, the spawning process and such directly from the Python API to streamline the training and testing process.
For the later, a nice UI is also desirable to get a better intuition on what is really happening in the simulation.
Finaly, parallelization of single agent environments would also be desirable when scaling the agents training.

Those are the main objectives I set off with when creating this wrapper.

##  OpenAI Gym and registering a custom environments

## Uploading to PyPi / installing directly from github actually faster

## Installation script

## Conda env requirements

## Using the wrapper

## Some agent learning

## Future works
