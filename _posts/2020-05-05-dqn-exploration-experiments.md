---
title: "Exploration schemes in Deep Q-Networks (DQN)"
excerpt: "Investigating the impact of various exploration schemes on the DQN performance and learnign efficiency."
tags:
  - Reinforcement Learning
  - Implementation
  - Research
  - DQN
  - Exploration
classes: wide
---

Reimplementing well-known and successful Deep Reinforcement Learning (DRL) is probably well recommended, if not necessary step for any research in that field.
One of the simplest DRL algorithm would be the Deep Q-Networks **[TODO: Insert paper reference]** developped at DeepMind.
This algorithm was one of the first to demonstrate some learning on the domains of the Atari 2600 system provided by the Arcade Learning Environment.

While reimpleminting this algorithm, a quite troublesome point I came accross was the exploration mechanism used.
Indeed, depending on the environment, some exploration schemes would work better than others.

In the following section, we present a handful of exploration scheme that can be combined with DQN and investigate their respective impact on the learning of the agent, as well as the speed of its convergence.

# Impact of the exploration scheme on the DQN

## Exploration schemes
First, we present the 4 exploration schemes we investigated in this little side experiment.

### 1. Greedy exploration:


### 2. Boltzman-based exploration:

This method consist in using Categorical distribution (in this case, the one provided by the Pytorch framework) parameterized by the output of the Multilayer Perceptron that represents the agents policy.

To the best of my knowledge, the Categorical distribution already incoporates some randomness through the use of the `sample()` function we use to sample the actions during the training.
This enables the agent to sample sub-optimal action sometimes. While this technique is not "greedy", it is still quite close to it due to the fact that the parameterized network quickly becomes biased toward the action it evaluated as "best" in the early phase of the training, which is not always optimal, especially in harder tasks where it is hard to discover the optimal action in the first place.

The appeal of this method is namely the ease of it implementation (matches this one's lazyness).

### 3. $\epsilon$-greedy exploration

This exploration schemes consits in sampling with random action once in a while, instead of alwasy using the greedy (and likely biased) sampling method described at 1.
More specifically, we define a relatively small value $\epsilon < 1.0$, then, before sampling an action, randomly sample from the uniform distribution on the interval $[0,1]$.
If the randomly sampled value happens to fall below the predefined $\epsilon$, we take a random action, instead of taking the action that would maximize the expected discounted reward (according to the agent's policy, i.e. the Q-Network).
This ensures the agent keeps wandering in parts of the state space it would not explore if it were to blindly follow its "greedy", and helps the agent to escape the local optima (at least on simple enough task).
Furthermore, we experimented with tow variants of the $\epsilon$-greedy exploration.

### 3-a. Fixed $\epsilon$

As the name indicates, the epsilon stays during the whole training process.
This can result in wasteful sampling, especially as the training progresses.
Namely, as the number of environment interaction increases, the agent is likely to have learned a satisfactory enough policy, and can thus rely on its sampling method for the rest of the training and focus on the relevant part of the state space.
This allows for a better fine-tuning and higher final performance overall.

### 3-b. Linearly annealed $\epsilon$

To mitigate the "wasteful" sampling that is likely to occur when the $\espilon$ is a constant, annealing the latter as training progress was proposed.
As the number of environment interaction increases, the agent is made to rely more and more on the policy it actually learned, reducing the random actions.

## Experiments and Results

We initially investigated the impact of each exploration scheme in 4 toy problems provided by the OpenAI Gym package.

### 1. CartPole-v0

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/posts/dqn_exploration/dqn_exploration_cartpole.png" alt="">

### 2. MountainCar-v0

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/posts/dqn_exploration/dqn_exploration_mountaincar.png" alt="">

### 3. Acrobot-v0

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/posts/dqn_exploration/dqn_exploration_acrobot.png" alt="">

### 4. LunarLander-v2

<img src="{{ site.url }}{{ site.baseurl }}/assets/images/posts/dqn_exploration/dqn_exploration_lunarlander.png" alt="">


Next, we also investigated the impact of each exploration scheme on some basic Atari 2600 environments.

### 5. PongNoFrameskip-v4

### 6. BreakoutNoFrameskip-v4

Comming next:
- The source code.
- Link to the full wandb log
- Experimenting with some kind of temperature to boltzman / regularization ?
