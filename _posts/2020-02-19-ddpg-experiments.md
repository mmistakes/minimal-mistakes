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
classes: wide
---

# Introduction
In the last few years, Deep Reinforcement Learning has shown promising results when it comes to playing games from pixel (<a href="https://arxiv.org/abs/1312.5602">[1]</a>,<a href="https://arxiv.org/abs/2003.13350">[2]</a>), mastering quite a few board games such as Chess, Go, and Shogi (<a href="https://arxiv.org/abs/1712.01815">[3]</a>),as well as robotic control (<a href="https://arxiv.org/abs/1812.05905">[4]</a>, <a href="https://arxiv.org/abs/1707.06347">[5]</a>,  <a href="https://arxiv.org/abs/1802.09477">[6]</a>).

<figure class="third">
	<img src="{{ site.url }}{{ site.baseurl }}/assets/images/posts/ddpg_experiments/atari_2600_games.png" alt="">
	<img src="{{ site.url }}{{ site.baseurl }}/assets/images/posts/ddpg_experiments/alphago_lee_sedol.png" alt="">
	<img src="{{ site.url }}{{ site.baseurl }}/assets/images/posts/ddpg_experiments/roboschool_openai.gif" alt="" height="300px">
	<figcaption>From left to right: Atari 2600 games, AlphaZero vs Lee Sedol, Roboschool Humanoid robot control. All assets are property of the respective parties, not mine.</figcaption>
</figure>

[TODO Fix image resolutions]
{: .notice--warning}

In the later case, the control of the robot requires minutious and precise control of actuators. Depending on the complexity of the robot's frame, which can usually be reduced to its degree of  freedom, the complexity of the actuation rises exponentially, and it becomes hard to design a control system with classical control theory.
The appealing point of Deep Reinforcement Learning in this case, is that it would allow us to learn such control system with respect to a desired task from scratch, by having the agent interact in the context of the given task and find an "optimal way of doing things" (optimal policy in the Reinforcement Learning / Control Theory jargon) which achieves the given objective.

Easier said than done however, for now classical techniques such as policy gradients and (deep) Q-networks do not scale well to such high-dimensional tasks.
At the cost of repeating myself, the concern here is mainly the continuous nature of the action space, which makes learning an satisfactory enough policy really difficult.
Consequently, building on top of the Deep Q-Network (<a href="https://arxiv.org/abs/1312.5602">[1]</a>), the Deep Determinsitic Policy Gradients introduces a method which at least exhibits some learning in high-dimensional continuous action space case.

DDPG was applied to numerous environments, from control theory toy problems, robotic manipulation environments, to autonomous driving tasks (<a href="https://arxiv.org/abs/1509.02971">[7]</a>), and demonstrated "results" which raised some hope of seeing some Deep Reinforcement Learning based agents applied game AI and even robotics.
In my opinion, DDPG has became a fundamental pillar of more sophisticated and well performing off-policy reinforcement learning algorithms.
Namely, we can find its squeleton can be found in most of the off-policy algorithms, with a few modifications (<a href="https://arxiv.org/abs/1812.05905">[4]</a>, <a href="https://arxiv.org/abs/1802.09477">[6]</a>), which shall also be explored further in their respective, dedicated posts.

In this post, we first go over the theory of Reinforcement Learning, then introduce as intuitively as possible the core idea of the DDPG method.
Following this, we leverage the Pytorch machine learning framework and explain how the jump from the theory to practice is made, as well as all the compromises (and sacrifices) that we have to (unfortunately) make along the way.
We go over a simple implementation, starting from the neural networks definition, other helpers such as the experience replay buffer, how to implement the losses for the various components, and the overall training loop.

# Background
## The MDP Framework
The RL problem is usually formulated as a <a href="https://en.wikipedia.org/wiki/Markov_decision_process">Markov Decision Process</a>, which is composed of 5 elements:
  - $S$ is the state space, and each state $s \in S$ describe the current "situation" of the environment / agent.
  - $A$ is the action space.
  - The dynamics $P$ of the system, which maps from state-action pairs space $S \times A$ to a corresponding "arrival" state, which is also a member of $S$. More formally, we write $P: S \times A \rightarrow S$.
  - The reward function $R$, which attributes a scalar reward (in the standard case anyway) to a given state-action pair, or sometimes even taking into account the arrival state. Formally, the reward function is defined as $R: S \times A \rightarrow \mathbb{R}$.
  - The discount factor $\gamma \in [0,1]$. This coefficient defines how much the agent should care about long term reward, at the cost of forsaking the short term gratification. Set it to one, and the agent will act as to maximize the long term reward. Set it close to zero, and the agent shall do the opposite, and aim toward short term reward instead. This coefficent is often kept in the neighborhood of $0.99$ in practice, and the reason is should transpire from the following paragraph where the objective of the agent is formulated.

## RL Agent's objective
During its execution, an RL agent is tasked to maximize the expected cummulative reward it receives while interacting with the environment.
Denoting the agent as $\mu_{\theta}$, its objective is formally expressed as follows:

$$
J(\mu_{\theta}) = \mathbb{E}_{s_t \sim P(\cdot \vert s_{t-1}, a_{t-1}), a_t \sim \mu_{\theta}(\cdot \vert s_t)} \left[ \sum_{t=0}^{\infty} \gamma ^ t r(s_t,a_t)\right]
$$

Next, we go over how the maximization of this objective is tied with the neural networks.
Namely, given that agent is represented by a neural network, how do we get the latter to output action that will result in a maximal cummulative result.

# DDPG Algorithm: From theory to practice

As the names gives it away, a crucial element of the DDPG is the policy gradient method.
The later consist in updating the policy's weights to make actions that correspond to the highest value more likely.
Moreover, this optimization rule will also make actions that correspond to low value less likely to be output by the policy network.
Formally, the policy gradient can be obtained as follow:

$$
 \nabla_{\theta}J(\mu_{\theta}) = \mathbb{E}_{(s_t,a_t) \sim \rho_{\mu_\theta}} \left[
    \sum_{t=0}^{T} \nabla_\theta \mathrm{log}\mu_\theta(a_t \vert s_t) Q^{\mu_\theta}(s_t,a_t)
  \right],
$$

where $\rho_{\mu_{\theta}}$ state-action pair distribution induced by the policy $\mu_{\theta}$ and $Q^{\mu_\theta}$ is the action value function, which tells us how good it is to take action $a_t$ given the state $s_t$.

[TODO: Add the note that policy gradient should actually be computed with respect to the advantage function but we go for simplicity here with the Q function instead.]
[TODO: Any more simple way to introduce the concept of iteration when computing the gradient ?]
{: .notice--warning}

Once the gradient is computed, we update the weights of the policy network for each iteration using the rule

$$
  \theta_{i+1} \leftarrow \alpha \theta_{i} + \alpha \nabla_{\theta_{i}}J(\mu_{\theta_{i}}),
$$

[TODO: This part is probably too early. Also separate the weights of policy and q value with different greek letters]
{: .notice--warning}

where $\theta_i$ represents the weights of the policy at the iteration $i$ and $\alpha$ is the learning rate.
Intuitively, this will nudge the overall policy so as to (1) output action that achieve higher rewards more often while (2) avoid action that result in low rewards.

Consequently, we need a good way to approximate the action-value.
To do so, the paper proposes to use "deep" neural networks as function approximator, which we shall refer to as Q-Value network from now on.
The Q-Value network is formally defined as $Q: S \times A \rightarrow \mathbb{R}$
More pragmatically, it takes a state-action pair $(s_t,a_t)$ as input and outputs a real value which represents how good the action $a_t$ was given the state $s_t$.
Of course, to properly guide the actor's policy, we need the Q-Value network as accurate as possible.
To update the Q-Value network, we use the Temporal Difference combined with the Q-learning method and adapted to the continuous action space:

The part above concerning the Q learning is not that clear. What is the theory behind it ? Where are the weights ?
{: .notice--warning}

$$
 Q^{\mu}(s_t,a_t) = \mathbb{E}_{\rho_{\mu}}
$$

TODO: TD / Bellman update + Loss equation for critic network
{: .notice--warning}

Now, we expand on how the actor, or in other words, the policy is updated.
We extend the previous definition of an RL agent (or to be more specific, its "policy") as $\mu_{\theta}: S \rightarrow A$.
In other words, the function $\mu_{\theta}$ maps a given state $s_t$ to the action is "knows" as being the best.
Refering to the equation of the policy gradient presented before [TODO: Add equation of Policy gradient reference], we cannot however compute the probability of an action given a state $\mu_{\theta}(s_t,a_t)$ since the policy is determinsitic to begin with.
Fortunately, the differentiable nature of the Q-Value network allows us to back-propagate the value of a action output by the policy directly.

[TODO: Remove the $\theta$ from agent's policy before this step, then introduce it back only when we talk about neural networks.]
{: .notice--warning}

Before going further, as for the Q-Value network, the policy is also represented by a neural network parameterized this time by the weights $\theta$, which we denote as $\mu_{\theta}$.

Then, combining the chain rule to compute the gradient of the action-value with respect to the parameter of the policy network, we obtain the following update rule:

$$
  WIP
$$

TODO: Insert the equation of policy update + a more intuitive explanation.
{: .notice--warning}

In DDPG, the policy is course deterministic, instead of talking probility, let's instead consider the policy as a determinsitic function that directly maps fron the state observation to the action.

In the original paper, the advantage function $A^{\mu_\theta}$ is instead replaced with the Q function $Q^{\mu}(s_t,a_t)$.
[TODO: care to elaborate why maybe ?]
In practice, that function is also parameterized.
We thus define the Q-Value network $Q_{\phi}^{\mu_{\theta}}$ parameterized by the weights $\phi$, which serves as an approximation for the Q function introduce earlier.

Following the Bellman update equation, we can get the gradient for the weights of the Q network as follows:

$$
  \mathrm{[TODO: Gradient of the Bellman update]}.
$$

Applying a gradient step using the rule $\phi_{i+1} \leftarrow \phi_{i} -\alpha \nabla_{\phi}J_Q(\phi)$, we obtain a more precise estimation of the Q function, which in turns, helps us guide the agent to take better actions.

One last aspect we need to consider is the **exploration**.
Recall that the agent we are training is deterministic, this means for a given state, it will always output a specific action its internal define as being the best.
Obviously, especially at the early phase of the training, the action believed to be the best by the agent is not actually the best (a more formal word would be "optimal").
So one might ask: how do we make an agent try out new things, so as to discover potentially better actions than the one it consider optimal ?

To this end, the authors introduced a straight forward approach, which consist in apply some noise to the action output by the agent's policy before applying it to the environment.
This "force" the agent to be exposed to various part of the state space it would have likely never stumbled upon, had it not been encouraged to do so by this exploration trick.

More formaly, for each step we want the agent to take in the environment, we first sample the corresponding action $a_t \sim \mu_{\theta}(s_t,a_t)$, then apply the noise $\epsilon$ such as $a_t \leftarrow a_t + \epsilon, \epsilon \sim \mathcal{N}(\mu,\sigma^2)$.
The noise itself is sampled from a Normal distribution defined by the mean and variance parameter $\mu$ and $\sigma^2$.
For simplicity, $\mu$ is usually set to $0$, while the standard deviation $\sigma$ is set in the neighborhood of $0.2$, depending on the task's specification.
More intuitively, this defines the magnitude much the original action $a_t$ output by the agent is changed.

With most of the theory out of the way, let's proceed to the actual implementation of the algorithm.

# DDPG Implementation

From here onward, we shall leverage the `python` scripting langage, as well as the `pytorch` deep learning library.

We first start by creating importing the necessary libraries and dependencies.
```python
import os
import gym
import random
import numpy as np
import pybullet_envs

# Pytorch support
import torch as th
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F

# DRL Forge imports
from drlforge.buffers import SimpleReplayBuffer
from drlforge.common import TBXLogger as TBLogger
from drlforge.common.helpers import update_target_network
from drlforge.common import generate_args, get_arg_dict
from drlforge.common.noise_processes import NormalActionNoise

# Helpers
from drlforge.common import preprocess_obs_space, preprocess_ac_space

# Controls and debugs
from gym.spaces import Box, Discrete
from gym.wrappers import Monitor
```
Beside the really basic libraries in the first block (`numpy`, `gym`, `pybullet_envs`, etc...),
the `pytorch` dependencies are imported in the second block.

Next, for convenience, we use some helpers fucntion defined in the `drl-forge` library, the most important being :
- `SimpleReplayBuffer` which stores the experience of the agent as it interacts with the environment.
- `TBXLogger` which is used to log various metrics during the training. This is independent of the algorithm itself.
- `NormalActionNoise`, `AdaptiveParamNoiseSpec`, `OrnsteinUhlenbeckActionNoise`, each of those being a specific noise process we use for the exploration aspect of the algorithm. While the defualt is the `NormalActionNoise`, we also experimented with the Ornstein-Uhlenbeck noise process introduced in [TODO: add reference] as well as the "Parameter Space Noise" technique developped in [TODO: Add reference to Param Space Noise paper] and alledgedly achieving better results than the standard noise functions.

Next, we define the various hyper parameters which will allows us to control and tweak various aspect of the algorithm.

```python
CUSTOM_ARGS = [
    # Default overrides
    get_arg_dict("total-steps", int, int(1e5)), # How many interactions with the env. the agent will ultimately make
    get_arg_dict("episode-length", int, 1000),

    get_arg_dict("policy-lr", float, 1e-3),
    get_arg_dict("value-lr", float, 1e-3),

    # The following blogs allows us to select different initialization schemes for the neural net.'s weights'
    get_arg_dict("weights-init", str, "xavier", meta_type="choice",
        choices=["xavier","uniform"]),
    get_arg_dict("bias-init", str, "zeros", meta_type="choice",
        choices=["zeros","uniform"]),

    # DDPG Specific
    get_arg_dict("updates-per-step", int, 1), # How many times do we update the policy for every step sampled ?
    get_arg_dict("start-steps", int, int(5e3)),
    get_arg_dict("tau", float, .005),
    get_arg_dict("target-update-interval", int, 1),

    # Eval related
    get_arg_dict("eval-interval", int, 20), # Every epoch
    get_arg_dict("eval-episodes", int, 3),
    get_arg_dict("save-interval", int, 20), # Every epoch too
]
args = generate_args(CUSTOM_ARGS)

```

The following section just instanciates a `TBLogger` object, which is a custom wrappers around not only the `Tensorboard` **TODO: Add link** logger but also the `Wandb` **TODO: Add link** logger in a single one.
This allows me to have a cleaner workflow without worrying about the logging mechanisms once it is setup.
Along side the logger, we also setup the behavior of the Pytorch library, as well as the seeding, which will allow the agent to work with (mostly) the same context whenever we run the script.

```python
# Logging helper
if not args.notb:
    tblogger = TBLogger( exp_name=args.exp_name, args=args)

# Pytorch config
device = th.device( "cuda" if th.cuda.is_available() and not args.cpu else "cpu")
th.backends.cudnn.deterministic = args.torch_deterministic # Props to CleanRL
th.manual_seed(args.seed)

# Seeding
random.seed(args.seed)
np.random.seed(args.seed)
```

One more that we might want to do is to instanciate the environment the agent will be interacting with from the get go.
Namely, we do it so we can access the various properties of the environment that we will need when creating the neural networks for example.
```python
# Environment setup
env = gym.make( args.env_id)
# The environment is also seeded so we can "fix" the context
# the agent will be faced with every time we run the script
env.action_space.seed(args.seed)
env.observation_space.seed(args.seed)

assert isinstance( env.action_space, Box), "discrete action only"
obs = env.reset()
d = False

# We recover the shapes of the observations and the action,
# which we need to define the neural network structures later on.
obs_shape, preprocess_obs_fn = preprocess_obs_space(env.observation_space, device)
act_shape = preprocess_ac_space(env.action_space)
act_limit = env.action_space.high[0]
```

<!-- TODO: We provide a streamlined project contained the final code that is easily setup, run and customized.
For a more complex implementation, however, feel free to refer to either this (DRL-Forge) library or even this (CleanrRL) library.
{: .notice--warning} -->

## Neural Networks: Q-Value function and Policy Network

In the following section, we provide the source code for basic neural network that are require for the DDPG algorithm.

### Q-Value Function

The following is a simple implementation of a Q-Value network for continuous action spaces.

```python
class QNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.ModuleList()

        # This network takes as input the concatenation of the state vector and the action vector at a given timestep, or in other words, a state-action pair (s,a)
        current_dim = obs_shape + act_shape

        # We iterate over the number of hidden sizes to populate the neural network layers
        for hsize in args.hidden_sizes:
            self.layers.append(nn.Linear(current_dim, hsize))

            current_dim = hsize

        # At the end of the network, we append a single node that will give us the estimate Q-Value for a given state-action pair
        self.layers.append(nn.Linear(args.hidden_sizes[-1], 1))

        # This calls a special function we defined which initializes the weights of
        # the neural network following a specific scheme.
        # The function is omitted in the article, but available in the provided source file of the DRL-Forge repository.
        self.apply(weights_and_bias_init_)

    def forward(self, s, a):
        # Simply check that the state and action passed are in the appropriate format
        if not isinstance(s, th.Tensor):
            x = preprocess_obs_fn(x)

        if not isinstance(a, th.Tensor):
            a = preprocess_obs_fn(a)

        x = th.cat([s,a], 1) # Concatenates the state and the action

        # We iterate over all the layers of the neural network and process the state-action pair
        # Note however, that we DO NOT use the last layer yet.
        # This is the forward pass.
        for layer in self.layers[:-1]:
            x = layer(x)

            x = F.relu(x) # Activation function over the current hidden layer's output

        return self.layers[-1](x) # The last layer is not passed through any activation function
```
Instanciate a Q-Value network using the class defined above gives us the following object:
```python
q_value_network = QValueNetwork()
print(q_network)
```
and we get
```python
QValueNetwork(
  (layers): ModuleList(
    (0): Linear(in_features=18, out_features=256, bias=True)
    (1): Linear(in_features=256, out_features=256, bias=True)
    (2): Linear(in_features=256, out_features=1, bias=True)
  )
)
```
This was run with the `HopperBulletEnv-v0`, which has an observation space of dimension $15$ and and action space of $3$.
We can see that the Q-Network value thus expects an input `[observation,action]` of dimension $15 + 3 = 18$, and will output a scalar value which corresponds to its estimate of the Q-value for that pair of state-action.

### Agent's policy
Similarly to the Q-Value network, we also declare the policy network, which is determinsitic in this case.

```python
class Policy(nn.Module):
    def __init__(self):
        # Custom
        super().__init__()
        self.layers = nn.ModuleList()

        # Takes in the the observation vector which shape we obtained from the environment earlier
        current_dim = obs_shape

        # We iterate over the number of hidden sizes to populate the neural network layers
        for hsize in args.hidden_sizes:
            self.layers.append(nn.Linear(current_dim, hsize))

            current_dim = hsize

        # One more layer corresponding to the final output of the policy
        self.fc_mu = nn.Linear(args.hidden_sizes[-1], act_shape)

        # We use the tanh activation function to squeeze the action between [-1,1]
        # This way, we can use it across various environments by adjusting the scale of the actions themselves
        # with the `act_linit` scalar.
        self.tanh_mu = nn.Tanh()

        self.apply(weights_and_bias_init_)

    def forward(self, x):
        # Again simply check that the observations are passed in the appropriate format
        if not isinstance(x, th.Tensor):
            x = preprocess_obs_fn(x)

        # Forward pass to obtain the deterministic actions
        for layer in self.layers:
            x = F.relu(layer(x))

        mus = self.fc_mu(x)

        return self.tanh_mu( mus)
```
Again, in the `HopperBulletEnv-v0` case, the policy network will map the 15-dimensional vector that is fed to is as input (observation from the environment) and output the corresponding 3-dimensional action.

For the sake of completeness, we also instanciate it really quick here to show its structure with:
Instanciate a Q-Value network using the
class defined above gives us the following object:

```python
policy = Policy()
print(policy)
```
and we get

```python
Policy(
  (layers): ModuleList(
    (0): Linear(in_features=15, out_features=256, bias=True)
    (1): Linear(in_features=256, out_features=256, bias=True)
  )
  (fc_mu): Linear(in_features=256, out_features=3, bias=True)
  (tanh_mu): Tanh()
)
```

### Target Networks

One important aspect that we have skipped when detailed the theory, because it is actually more relevant in the practical implementation of the DDPG algorithm is the `target networks`.
To put it simply, the theory assumes every time we do an update, we have an accurate representation of the Q-Value function which indicates exactly to the agent how well it is doing.
In practice, however, due to the limited amout of empirical data we are working with, the Q-Value function, and even the policy network itself are actually change intermitently.
This gives rise to an unstability in the training process.
More intuitively, let's assume we are a driver of a Rally car, and our counting on our co-pilot to give us accurate description of the road ahead to make good turns.
A good co-pilot would tell us the corners and straight lines to come as succinctly as possible, thus sparring us useless information that might instead confuse us and finish with a bad time.
A bad co-pilot, however, would do just that, namely flood us with so many information at any given time that we would be unable to drive cool-headed and drive properly.

This is unfortunately what happens when we just *naively* use our Q-Value network defined earlier, as was highlighted in the DQN paper [TODO: Add reference].
To palliate this problem, Mnih et al. [TODO: Again ref. to DQN paper] introduced the concept of `target networks`, which was consequently integrated to the DDPG algorithm (and all those that followed later).
For each of the two neural network we have defined above, we create a "delayed copy".
This "copy network" will slowly be updated to match the current network, so as to reduce the variance in the estimation provided by the Q-Value network for example.
As a result, the training process will become relatively stable, and our agent will exhibit some learning.

Creating those copy of network is actually as easy as it sounds:

```python
# Instanciating the neural networks for the policy
policy = Policy().to(device) # The main network

policy_target = Policy().to(device) # The copy, a.k.a target network
policy_target.requires_grad_(False) # Just a small detail to make it slightly more efficient

policy_target.load_state_dict(policy.state_dict()) # Setting the weight of the target net to the main one's.

# Instanciating the neural network for the q-value network
qf = QValue().to(device) # Also, the main network

qf_target = QValue().to(device) # The copy, a.k.a target network
qf_target.requires_grad_(False)

qf_target.load_state_dict(qf.state_dict()) # Setting the weight of the target net to the main one's.
```

Because we instanciate a new network for each of the previously defined Q-Value network and policy network respectively, we copy the weights from each main network to the newly created target network with Pytorch's `load_state_dict()` method.

We shall expand on how we make sure those target networks are lagging behind their respective main network in section **[TODO: Add the section hyperlink once done]**.

Last but not least, we define the optimizers for each neural network.
An optimizer is a tool which will automatically handle the update of the weights of the neural network it is in charge of
with respect to the appropriate objective function.
Namely, it removes the need for us to manually go over every single weight of every neural network we are using and apply the weight update by gradient descent / ascent as defined at **TODO: Insert gradient update equation reference**..

```python
# Defining the respective weight optimizers for policy and Q function network
q_optimizer = optim.Adam(list(qf.parameters()),
    lr=args.policy_lr)
p_optimizer = optim.Adam(list(policy.parameters()),
    lr=args.policy_lr)

# We also predefine the Mean Square Error loss function provided by Pytorch, which
# will be used to regress out Q Value network estimate to the target computed based on the reward sampled.
mse_loss_fn = nn.MSELoss()

# Noise function for the exploration
# This following is the a Noise process will be sampled and the result added to the action output by the policy network
# to encourage the agent toward previously unexplored (or just less explored in general).
# While it's declaration might be overwhelming at first sight, let's just keep in mind that when we call that `noise_fn`
# funcion, it just gives us some random data already formated to the shape of the action vector so we can easily add it
# to the later when sampling the environment.
noise_fn = lambda: NormalActionNoise( np.ones( act_shape) * args.noise_mean, np.ones(act_shape) * float(args.noise_std))()

```

## Sampling

One of the indispensable part of any RL algorithm would be the sampling, where the agent, represented by the policy network in this case, actually interacts with the environment as per Figure **[TODO: Insert figure of env and agent interaction way back in the background section I guess]**.
More specifically, in the DDPG algorithm, we alternate between the (1) policy sampling and the (1) policy update phase until we obtain an agent that can solve the task (sometimes it just cannot though).

The one we are interested in this section is obviously the (1) policy sampling phase.
We already setup the environment earlier, namely in the **TODO: Add link to section**.

While the agent interacts with the environment, we need to store the various transitions that will be consequently formed in what can be thought of as the memory of the agent.
We use the previously imported `SimpleReplayBuffer` class to instanciate said "memory" component.

```python
buffer = SimpleReplayBuffer( env.observation_space, env.action_space, args.buffer_size, args.batch_size)
```

Following this, we enter the training loop itself, which namely consists in having the agent interact with the environment (sampling), then update its weight so it performs better, alternatively.

```python

## A few variables to track some training stats
global_step = 0 # How many steps has the agent done so far.
global_update_iter = 0 # How many weights update did we do so far.
global_episode = 0 # How many episode has the agent completed so far.

while global_step < args.total_steps:
  ## Reset the environment to the starting position
  obs = np.array(env.reset())
  done = False

  # Some variable to keep track of the episode return and length
  train_episode_return = 0.
  train_episode_length = 0

  # Sample a full episode
  for _ in range(args.episode_length):

    # At the very beginning, we instead randomly samples action instead of using the policy.
    # This allows the agent to get a better exposure to the dynamics of the environment before actually
    # starting to interact with it.
    if global_step < args.start_steps:
      # Sampling uniformly from the action space
      action = env.action_space.sample()

    else:
      with th.no_grad():
        action = policy.forward([obs]).tolist()[0] # Use the neural network to sample the actions

      action += noise_fn() # Add the noise for exploration
      action = np.clip( action, -act_limit, act_limit) # Make sure the actions are still in the proper range

    next_obs, rew, done, _ = env.step(action) # Apply the action in the environment
    next_obs = np.array(next_obs)

    buffer.add_transition(obs,action,rew,done,next_obs) # Save the transition to the memory (exprience buffer)

    obs = next_obs

    # Tracking the training statisitics
    global_step += 1
    train_episode_return += rew
    train_episode_length += 1

    ##### Updating the policy and q networks #####
    if global_step >= args.start_steps: # Once we have enough data in the buffer.

      for update_iteration in range(args.updates_per_step):
        global_update_iter += 1

        # Sample random transitions from the exprience buffer.
        observation_batch, action_batch, reward_batch, \
                    terminals_batch, next_observation_batch = buffer.sample(args.batch_size)

        # Q function losses and update
        with th.no_grad():
          next_mus = policy_target.forward( next_observation_batch) # sample action with respect to the next observation

          # Compute the target to be used to update the Q Value network
          q_backup = th.Tensor(reward_batch).to(device) + \
              (1 - th.Tensor(terminals_batch).to(device)) * args.gamma * \
              qf_target.forward( next_observation_batch, next_mus).view(-1)

        # Sample the current estimate of the Q Value.
        q_values = qf.forward( observation_batch, action_batch).view(-1)

        q_loss = mse_loss_fn( q_values, q_backup)
        # Mean Square Error between the target network and the current estimate:
        # By minimizing the error that occurs when our current Q Value network
        # outputs estimates, we get better and better accuracy as we do the updates

        # The Optimizer component provided by Pytorch automatically computes the gradient
        # for each weight when calling the `backward()` function.
        q_optimizer.zero_grad()
        q_loss.backward()
        q_optimizer.step() # Actually update the weights as per Equation [TODO: Add equation]

        # Next, we update the policy network
        resampled_mus = policy.forward( observation_batch) # Get the current `optimal` actions
        q_mus = qf.forward( observation_batch, resampled_mus).view(-1) # Evaluate how good they are

        # Our original objective is to be maximized. However, pytorch's
        # AdamOptimizer considers whatever objective function it is fed with to be minimized !
        # Fortunately, we can transform our original, maximization objective
        # into a minimization objective by simply multiplying by -1.
        policy_loss = - q_mus.mean()

        p_optimizer.zero_grad()
        # Computes the gradient of each weight ( or in other words, their respective contribution to our estimate q_mus of how good the actions are)
        policy_loss.backward()
        p_optimizer.step() # Again, actually update the weights of the neural network as per Equation [TODO: Add equation ref.]

        # Slowly updating the target networks
        if global_update_iter > 0 and global_update_iter % args.target_update_interval == 0:
            update_target_network(qf, qf_target, args.tau)
            update_target_network(policy, policy_target, args.tau)


      # Logging the training statisitics, namely the losses
      if not args.notb:
        train_stats = {
          "q_loss": q_loss.item(),
          "policy_loss": policy_loss.item()
        }
        tblogger.log_stats( train_stats, global_step, "train")
    #### End of update section ###################

    if done:
      global_episode += 1

      # Again. some other stat. logging
      if not args.notb:
        eval_stats = {
          "train_episode_return": train_episode_return,
          "train_episode_length": train_episode_length,
          "global_episode": global_episode
        }
        tblogger.log_stats(eval_stats, global_step, "eval")

      #  We also output something to the terminal
      if global_step >= args.start_steps:
        print("Episode %d -- Tot. Steps: %d -- PLoss: %.6f -- QLoss: %.6f -- Train Return: %.6f"
          % (global_episode, global_step, policy_loss.item(), q_loss.item(), train_episode_return))

      break;

# When reached, the training is basically done. We then clean up.
if not args.notb:
    tblogger.close()
env.close()
```

This concludes a really basic implementation of the DDPG algorithm.
An additional, more complete file is also provided at **TODO: Insert link to stable DRL Forge DDPG. Or even cleanrl. Also, separate the replay buffers and other deps into the dep folder ? Or link based on the current working commit**.

An important thing to note however, is that we actually implemented a few more "tricks" for the experiments, namely:
- More complex exploration startegies such as the <a href="https://en.wikipedia.org/wiki/Ornstein%E2%80%93Uhlenbeck_process">*Ornstein Uhlenbeck*</a> noise process, and the <a href="https://arxiv.org/abs/1706.01905">*Adaptive Parameter Space Noise*</a>.
- Target noise smoothing, which consists in also applying some noise method to the actions sampled based on the `next observations`, which are used to compute the target for the Q-Value network
- **TODO:** Support for multiple Q-Value network function, which is mainly inspired from the Twin Delayed DDPG (<a href="https://arxiv.org/abs/1707.06347">[5]</a>). This was used to experimentally investigate the reduction of the overestimation bias by using multiple Q-Value network. A potential future experiment would be to train multiple different Q-Value networks over different subsets of the state-action space and use their average as the Q-Value network used to update the policy network itself.
- Normalization for the policy and Q-Value network's network layers. In some __yet to determine conditions__, layer normalization seems to drastically improve the value learned by the Q-Value network, and helps achieve better performance than the standard neural network especially in complex environments.

# Experiments

We first start with some basic continuous action environments namely CartPole-v0, InvertedPendulum-v0 and MountainCarContinuous-v0 of the OpenAI Gym basic environments.

## Basic control tasks
Here, we investigate how well a basic implementation of the DDPG algorithm fares on toy problems, namely the `Pendulum-v0` and the `MountainCarContinuous-v0`, which are considered toy problems for RL agents.

**TODO: Embed Wandblogs**

## Toy problems

## Mujoco

## BulletEnv

## Ablations studies and other detailed experiments

1. Noise method and their impact

a. Normal with std

b. Ornstein Ulhenbeck

c. Parameter Space Noise

d. Target Mus Noising impact

2. Starting steps

3. Update Interval effect

4. Layer normalization for actor ( TODO: Layer norm for value function too)

Any other optim you can think of ?

# Discussion and Conclusion

# Aknowledgment
- Costa's CleanRL for the clean approach to source code. My own usually tend to become too complex.
- OpenAI Baselines for the various helper function such as the noise, etc...
- The numerous creators of the various libraries used for this article.
