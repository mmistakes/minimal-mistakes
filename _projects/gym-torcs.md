---
title: "OpenAI Gym Wrapper for the Torcs Racing Car Simulator"
excerpt: "An automation friendly custom OpenAI Gym environment wrapper for the Torcs Racing Car Simulator for Reinforcement Learning research."
tags:
  - Reinforcement Learning
  - Implementation
  - Autonomous Driving
  - Research
  - Torcs Racing Car Simulator
---

## Motivation

When first working with the original wrapper, it always required to have the window opened and rendering (slow for training), and the computer could not be used for anything else, since the race selection was done by using xautomation to "virtually" input the keys to start the race etc.
Hence, I developed this wrapper to automate the starting of the race and also remove the need for rendering, which speeds up the training incredibly.

Another worthy update is that this wrapper allows for parallelization of the environments (namely by playing with the port of the socket each simulator instance uses).

This require quite some lifting on the C++ side for the Torcs Binaries as well as the Python side, but it was a good learning experience overall, I would say.

The poor support of 2D picture for the agent training, however, made me switch to the Carla Simulator, for which another wrapper was unfortunately required.

##  OpenAI Gym and registering a custom environments

## Uploading to PyPi / installing directly from github actually faster

## Installation script

## Conda env requirements

## Using the wrapper

## Some agent learning

## Future works
