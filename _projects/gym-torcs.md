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

# Motivation

While experimenting with Deep Reinforcement Learning (RL) and Autonomous Driving, as part of my Master Thesis' research project, I was recommended to use the Torcs Racing Car Simulator as environment for the agent to interact.
Torcs is a great highly portable multi platform car racing simulation, which provides a solid simulation, and allows for in-depth customization of system mechanics and racing scenarios, provided one has the time to dig into it.

At that time, being not only a Python, but also a reinforcement learning beginner, I cannot help but reminisce the struggles of first even getting the simulator to work.
Most of the Deep Learning library being written in Python at the time, there was also a need for an additional Python wrapper to provided an interface between the RL agents I was planning to develop and the simulator itself, which is mainly based on the C language and self-contained.

Fortunately, I was happened to stumble upon Sir <a href="https://www.wantedly.com/users/17818471">Naoto Yoshida</a>'s <a href="https://github.com/ugo-nama-kun/gym_torcs">gym_torcs</a> implementation of a Python interface for Torcs.
While extremely handy to prototype and test the agents, it was a bit difficult to efficiently train the agent at scale.
For example, the simulator would need to have full focus and control over the keyboard to start races.
Also, agents could not be trained in parallel and the simulator would always be rendering, which happened to greatly slow down the training.
I basically could not use the computer while the agent was training.
Being still fresh (naive, to be more precise) and motivated, I challenged myself to further improve the wrapper to enable highly efficient training and scalabitlity.

# customization

1. Enabling file based, automatic race configuration and start, and rendering toggle feature for training speed up.

After immersing myself into the C++ code of the original simulator , a work around to start the race without the need to automatize key presses as a human would need to do before starting a race for the RL agents.
Furthermore, this happened to coincide with the feature of allowing the user to directly set the race configuration from the Python wrapper (actually, it just needed an xml file to setup the race configuration, which was then passed directly via the Python Wrapper), as well as the feature which allowed to either enabled or disable de rendering inside the simulation.
While it still required a blank window to be opened from time to time, the race could be started directly, saving around 5s for each run, which was non-negligible, considering that an RL agent would require sometimes tens of thousands runs.
Disabling the rendering itself would further speed up the training up to forty times (!) on the computer I was using back then.
Of course, the rendering could be switch on or off directly from the Python wrapper when needed be.
Using `xvfb-run`, training scripts could be run even faster on a headless server, which was unfortunately not possible before, since the wrapper require the GUI interface to start the race.

2. Enabling parallel training

The original wrapper would be limited to one instance running at the same time.
Namely, the exposition of the Torcs' simulator internal is done via sockets, and the wrapper would be listened on a fixed ports.
By relaxing this componenet, and enabling parameterization of said port directly from the Python interface, it became possible to train multiple agents in parallel on the same computer.

3. Added driving data recording
4.
At some point, there was a need to combine Imitation Learning with RL.
The former, however, required further customization as it would require to save the state of the agent inside the simulation at every simulation step.
This was probably the most challenging part, since it required to strike the balance given the limitation of the machine that would be running the simulator.
Namely, holding all the data in memory and waiting for the human expert to finish playing would incur a high cost, and very likely to crash. On the other hand, writing to disk too frequently would instead be an overhead and slow down the simulation itself. Fortunately, it was possible to obtain a good compromise by "hiding" only keeping the data of a single race in memory at the time, while hiding the saving to the hard drive in between loading and cleanup phases inside the simulator, which I had to rework as in 1.

The poor support of 2D picture for the agent training, however, made me switch to the Carla Simulator, for which another wrapper was unfortunately required.

# Repository and usage

# Limitations

# Demonstration

##  OpenAI Gym and registering a custom environments

## Uploading to PyPi / installing directly from github actually faster

## Installation script

## Conda env requirements

## Using the wrapper

## Some agent learning

## Future works
