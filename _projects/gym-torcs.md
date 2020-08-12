---
title: "GymTorcs"
excerpt: "An automation-friendly, custom OpenAI Gym environment wrapper of the Torcs Racing Car Simulator for Reinforcement Learning research."
header:
  teaser: assets/projects/gym_torcs/Torcs1.png

tags:
  - Reinforcement Learning
  - Implementation
  - Autonomous Driving
  - Research
  - Torcs Racing Car Simulator
comments: true
classes: wide
---

# Motivation

<figure style="width: 440px" class="align-right">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/projects/gym_torcs/Torcs1.png" alt="">
  <figcaption>A screenshot of the Torcs Racing Cart Simulator in action. <a href="https://sourceforge.net/projects/torcs/">Source</a></figcaption>
</figure>

While experimenting with Deep Reinforcement Learning (RL) and Autonomous Driving, as part of my Master Thesis research project, I was recommended to use the <a href="https://sourceforge.net/projects/torcs/">Torcs Racing Car Simulator</a> as the environment for the agent to interact with and learn.
Torcs is a great highly portable multi-platform car racing simulation, which provides a solid simulation, and allows for in-depth customization of system mechanics and racing scenarios, provided one has the time to dig into it.
{: .text-justify}

At that time, being not only a Python but also a reinforcement learning beginner, it is hard not to reminisce about the struggles of first even getting the simulator to work.
Most of the Deep Learning library being written in Python at the time, there was also a need for an additional Python wrapper to provided an interface between the RL agents being developed and the simulator itself, which is mainly based on the C language and self-contained.
{: .text-justify}

Fortunately, Sir <a href="https://www.wantedly.com/users/17818471">Naoto Yoshida</a>'s <a href="https://github.com/ugo-nama-kun/gym_torcs">gym_torcs</a> implementation of a Python interface for Torcs provided a great jump start to get same learning done.
While extremely handy to prototype and test the agents, it was a bit difficult to efficiently train the agent at scale.
For example, the simulator would need to have full focus and control over the keyboard to start races.
Also, agents could not be trained in parallel and the simulator would always be rendering, which happened to greatly slow down the training.
The machine on which the simulator and agent were training
Being still fresh (naive, to be more precise) and motivated, it was quite a challenge to further improve the wrapper to enable highly efficient training and scalability.
{: .text-justify}

# Overview of the customizations

## 1. File-based, automatic race configuration and start, and toggling rendering for training speed up

After immersing myself into the C++ code of the original simulator, a workaround to start the race without the need to automatize key presses as a human would need to do before starting a race for the RL agents.
Furthermore, this happened to coincide with the feature of allowing the user to directly set the race configuration from the Python wrapper (actually, it just needed an XML file to set up the race configuration, which was then passed directly via the Python Wrapper), as well as the feature which allowed to either enabled or disable de rendering inside the simulation.
While it still required a blank window to be opened from time to time, the race could be started directly, saving around 5s for each run, which was non-negligible, considering that an RL agent would require sometimes tens of thousands of runs.
Disabling the rendering itself would further speed up the training up to forty times (!) on the machine that was used at that time.
Of course, the rendering could be switch on or off directly from the Python wrapper when needed be.
Using `xvfb-run`, training scripts could be run even faster on a headless server, which was unfortunately not possible before, since the wrapper require the GUI interface to start the race.
{: .text-justify}

## 2. Multiple parallel instance for training

The original wrapper would be limited to one instance running at the same time.
Namely, the exposition of the Torcs' simulator internal is done via sockets, and the wrapper would be listening on fixed ports.
By relaxing this component, and enabling parameterization of said port directly from the Python interface, it became possible to train multiple agents in parallel on the same computer.
{: .text-justify}

## 3. Recording driving data

At some point, there was a need to combine Imitation Learning with RL.
The former, however, required further customization as it would require to save the state of the agent inside the simulation at every simulation step.
This was probably the most challenging part, since it required to strike the balance given the limitation of the machine that would be running the simulator.
Namely, holding all the data in memory and waiting for the human expert to finish playing would incur a high cost, and very likely to crash. On the other hand, writing to disk too frequently would instead be an overhead and slow down the simulation itself. Fortunately, it was possible to obtain a good compromise by "hiding" only keeping the data of a single race in memory at the time, while hiding the saving to the hard drive in between loading and cleanup phases inside the simulator, which had to be reworked as in 1.
{: .text-justify}

The poor support of 2D pictures for the agent training, however, makes alternative such as the Carla Simulator is much more tempting.
The latter, however, would also require a custom wrapper to fit the OpenAI Gym format and abstract the inconvenient part of setting up the simulation, and focus on the training itself.
{: .text-justify}

# Repository and usage

The GymTorcs wrapper is hosted as a <a href="https://github.com/dosssman/GymTorcs">Github Repository</a>, and is provided with a script for automating the installation of the Torcs simulator binaries and required dependencies.
The script was tested on 3 different distribution of the
{: .text-justify}

# Demonstration

Provided below (for show...) is a demonstration of a self-driving racing car trained via Reinforcement Learning, namely the Deep Deterministic Policy Gradients, which is being examined and a post written up at the time of this writing.
{: .text-justify}

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/vn2jltMvs54?controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>

# Limitations

Nevertheless, this wrapper was put together in quite a rush, and once a desired feature was made to work even in the simplest sense of the term, it would likely never be touched again later.
{: .text-justify}

There is thus quite a few limitations, namely:
- the lack of support for multiples agents: this would require an even more elaborate rewrite of simulator's binaries to support multiple ports for different agents for each instance of the simulator.
- the lacking support for pixel data.
- the simulator being specialized for racing cars, it is not suited for more general autonomous driving research.
- the wrapper does not support choosing a race track, and requires instead to dig around the simulator files to identify the track, then create the appropriate configuration file. The same thing also applies to the instantiation of opponents bots' vehicle and AIs.
{: .text-justify}

# Remarks

In retrospect, customizing the simulator and writing helpers and libraries to get the objective of the research to work in the first place took quite some time.
It was very easy to get lost in the implementation details, instead of advancing on the research itself.
In a sense, it was an excuse for procrastinating.
{: .text-justify}

A lesson learned would be that for future projects, a more thorough assessment of the environment requirements, as well as the effort to develop the necessary features would be more efficient overall.
Similarly, avoiding dwelling on non-critical, and especially non-research related implementation details would be preferable.
{: .text-justify}

Nevertheless, fiddling around the simulator and the Gym wrapper was probably an invaluable experience after all, but some part of me cannot help but think there was a better and more efficient method in the first place.
{: .text-justify}
