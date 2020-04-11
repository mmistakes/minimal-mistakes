---
layout: single
title: "Deep Determinsitic Policy Gradients"
tags:
  - Reinforcement Learning
  - Implementation
  - Research
  - Policy Gradients
toc: true
toc_sticky: true
author_profile: true
---

# Introduction
In the last few years, Deep Reinforcement Learning has shown promising results when it comes to playing games from pixel [TODO Insert Atari Reference], basically mastering boardgame [TODO Insert GO and Chess references] as well as robotic control [TODO Mujoco and alike references].

[TODO Add a few pictures]
{: .notice--warning}

In the later case, the control of the robot requires minutious and precise control of actuators. Depending on the complexity of the robot's frame, which can usually be reduced to its degree of  freedom, the complexity of the actuation rises exponentially, and it becomes hard to design a control system with classical control theory.
The appealing point of Deep Reinforcement Learning in this case, is that it would allow us to learn such control system with respect to a desired task from scratch, by having the agent interact in the context of the given task and find an "optimal way of doing things" (optimal policy in the Reinforcement Learning / Control Theory jargon) which achieves the given objective.

Easier said than done however, for now classical techniques such as policy gradients and (deep) Q-networks do not scale well to such high-dimensional tasks.
At the cost of repeating myself, the concern here is mainly the continuous nature of the action space, which makes learning an satisfactory enough policy really difficult.
Consequently, building on top of the Deep Q-Network [TODO Insert refernece], the Deep Determinsitic Policy Gradients introduces a method which at least exhibits some learning in high-dimensional continuous action space case.

DDPG was applied to numerous environments, from control theory toy problems, robotic manipulation environments, to autonomous driving tasks [TODO Insert ref.], and demonstrated "results" which raised some hope of seeing some Deep Reinforcement Learning based agents applied game AI and even robotics.
In my opinion, DDPG has became a fundamental pillar of more sophisticated and well performing off-policy reinforcement learning algorithms

[TODO SAC and TD3 refs.], which shall also be explored further in their respective, dedicated posts.
{: .notice--warning}

In this post, we first go over the theory of Reinforcement Learning, then introduce as intuitively as possible the core idea of the DDPG method.
Following this, we leverage the Pytorch machine learning framework and explain how the jump from the theory to practice is made, as well as all the compromises (and sacrifices) that we have to (unfortunately) make along the way.
We go over a simple implementation, starting from the neural networks definition, other helpers such as the experience replay buffer, how to implement the losses for the various components, and the overall training loop.

# Background
## The MDP Framework
The RL problem is usually formulated as a Markov Decision Process [TODO Add link], which is composed of 5 elements:
  - $S$ is the state space, and each state $s \in S$ describe the current "situation" of the environment / agent.
  - $A$ is the action space.
  - The dynamics $P$ of the system, which maps from state-action pairs space $S \times A$ to a corresponding "arrival" state, which is also a member of $S$. More formally, we write $P: S \times A \rightarrow S$.
  - The reward function $R$, which attributes a scalar reward (in the standard case anyway) to a given state-action pair, or sometimes even taking into account the arrival state. Formally, the reward function is defined as $R: S \times A \rightarrow \mathbb{R}$.
  - The discount factor $\gamma \in [0,1]$. This coefficient defines how much the agent should care about long term reward, at the cost of forsaking the short term gratification. Set it to one, and the agent will act as to maximize the long term reward. Set it close to zero, and the agent shall do the opposite, and aim toward short term reward instead. This coefficent is often kept in the neighborhood of $0.99$ in practice, and the reason is should transpire from the following paragraph where the objective of the agent is formulated.

## RL objective
During its execution, an RL agent is tasked to maximize the expected cummulative reward it receives while interacting with the environment.
Denoting the agent as $\pi_{\theta}$, its objective is formally expressed as follows:

$$
J(\pi_{\theta}) = \mathbb{E}_{s_t \sim P(\cdot \vert s_{t-1}, a_{t-1}), a_t \sim \pi_{\theta}(\cdot \vert s_t)} \left[ \sum_{t=0}^{\infty} \gamma ^ t r(s_t,a_t)\right]
$$

Next, we go over how the maximization of this objective is tied with the neural networks.
Namely, given that agent is represented by a neural network, how do we get the latter to output action that will result in a maximal cummulative result.

# DDPG Algorithm: The Theory
As the names gives it out, DDPG is based on the policy gradient method.
The later consist in updating the policy's weights to make actions that correspond to the highest value more likely.
Moreover, this optimization rule will also make actions that correspond to low value less likely to be output by the policy network.
Formally, the policy gradient can be obtained as follow:

$$
 \nabla_{\theta}J(\pi_{\theta}) = \mathbb{E}_{(s_t,a_t) \sim \rho_{\pi_\theta}} \left[
    \sum_{t=0}^{T} \nabla_\theta \mathrm{log}\pi_\theta(a_t \vert s_t) Q^{\pi_\theta}(s_t,a_t)
  \right],
$$

where $\rho_{\pi_{\theta}}$ state-action pair distribution induced by the policy $\pi_{\theta}$ and $Q^{\pi_\theta}$ is the action value function, which tells us how good it is to take action $a_t$ given the state $s_t$.

[TODO: Add the note that policy gradient should actually be computed with respect to the advantage function but we go for simplicity here with the Q function instead.]
[TODO: Any more simple way to introduce the concept of iteration when computing the gradient ?]
{: .notice--warning}

Once the gradient is computed, we update the weights of the policy network for each iteration using the rule

$$
  \theta_{i+1} \leftarrow \alpha \theta_{i} + \alpha \nabla_{\theta_{i}}J(\pi_{\theta_{i}}),
$$

where $\theta_i$ represents the weights of the policy at the iteration $i$ and $\alpha$ is the learning rate.
Intuitively, this will nudge the overall policy so as to (1) output action that achieve higher rewards more often while (2) avoid action that result in low rewards.

Consequently, we need a good way to approximate the action-value.
To do so, the paper proposes to use ``deep'' neural networks as function approximator, which we shall Q-network from now on.
The Q-network is formally defined as $Q: S \times A \rightarrow \mathbb{R}$
More pragmatically, it takes a state-action pair $(s_t,a_t)$ as input and outputs a real value which represents how good the action $a_t$ was given the state $s_t$.
Of course, to properly guide the actor's policy, we need the Q-network as accurate as possible.
To update the Q-network, we use the Bellman update taken from the Q-learning method and adapted to the continuous action space:

$$
 WIP
$$

[TODO: Bellamn update _+ MSE Loss equation for critic network]
{: .notice--warning}

Now, we expand on how the actor, or in other words, the policy is updated.
We extend the previous definition of an RL agent (or to be more specific, its ``policy'') as $\pi_{\theta}: S \rightarrow A$.
In other words, the function $\pi_{\theta}$ maps a given state $s_t$ to the action is ```knows'' as being the best.
Refering to the equation of the policy gradient presented before [TODO: Add equation of Policy gradient reference], we cannot however compute the probability of an action given a state $\pi_{\theta}(s_t,a_t)$ since the policy is determinsitic to begin with.
Fortunately, the differentiable nature of the Q-network allows us to back-propagate the value of an action output by the policy directly.

[TODO: Remove the \theta from agent's policy before this step, then introduce it back only when we talk about neural networks.]
{: .notice--warning}
Before going further, and as for the Q-network, the policy is also represented by a neural network, which we denote as $\pi_{\theta}$.

Then, combining the chain rule to compute the gradient of the action-value with respect to the parameter of the policy network, we obtain the following update rule:

$$
  WIP
$$

[TODO: Insert the equation of policy update + a more intuitive explanation.
{: .notice--warning}

In DDPG, the policy is course deterministic, instead of talking probility, let's instead consider the policy as a determinsitic function that directly maps fron the state observation to the action.

In the original paper, the advantage function $A^{\pi_\theta}$ is instead replaced
[TODO: More clearer explanation please.]


- Exploration stategies

# DDPG Implementation

## Q-Value Function

## Agent's policy

## Losses

Note: Exploration strategies

# Experiments

## Mujoco

## BulletEnv

## Others

## Ablations studies and other detailed experiments
1. Noise method and their impact

a. Normal with std

b. Ornstein Ulhenbeck

c. Parameter Space Noise

d. Target Mus Noising impact

- % Note to self: Naive version where only a single one is sampled, as well as proper version where the weight for each matrix is sampled

2. Starting steps

3. Update Interval effect

4. Layer normalization for actor ( TODO: Layer norm for value function too)

Any other optim you can think of ?

# Discussion and Conclusion
