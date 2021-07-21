---
title: "After Action Review for AI (AARfAI)"
excerpt: "Our visual analytics tool, enhanced with an AARfAI workflow, allows domain experts to navigate an AI's reasoning process in a systematic way to quickly find faults and convey actionable information and insights to engineers."
tags:
  - Analytics
  - Autonomy
  - Reinforcement Learning
  - Explanation Framework

submission_details:
  resources:
    papers:
      - title: After-Action Review for AI (AAR/AI)
        url: http://web.engr.oregonstate.edu/~burnett/Reprints/TIIS21_AARAI-accepted-preprint.pdf
      - title: Mental Models of Mere Mortals with Explanations of Reinforcement Learning
        url: https://dl.acm.org/doi/abs/10.1145/3366485
      - title: "Keeping It \"Organized and Logical\": After-Action Review for AI (AAR/AI)"
        url: http://web.engr.oregonstate.edu/~burnett/Reprints/iui20-AARAI.pdf
      - title: "Explaining Reinforcement Learning to Mere Mortals: An Empirical Study"
        url: http://web.engr.oregonstate.edu/~burnett/Reprints/ijcai-2019-XAIinRL-cameraReady.pdf
    demos:
      - title: Demo Video
        url: https://drive.google.com/file/d/1h1F-in-t3T9HCI0akPrVDNXqEdRRvHEf/view?usp=sharing

  version:
  size:
  license:

  authors:
    - Jed Irvine
    - Anita Ruangrotaskun
    - Delyar Tabatabai
    - Zeyad Shureih
    - Kin-Ho Lam
    - Jonathan Dodge
    - Andrew Anderson
    - Minsuk Kahng
    - Alan Fern
    - Margaret Burnett

  organizations:
    - Oregon State University
    
  point_of_contact:
    name: Jed Irvine
    email: jed.irvine@oregonstate.edu
---

## Overview
This tool is designed to help domain experts find bugs in an RL agent, where the domain is a custom StarCraft 2 (SC2) game. The agent uses multiple neural networks to achieve different predictive capabilities.  The tool exploits information persisted by the agent to help find issues with two of the learned models. The agent has to learn to operate in a huge action space, where there are a number of strategic concerns.  Two use cases are covered in the demo video:
1. finding the bad decision that caused the loss of a game, and
2. finding reasoning bugs by leveraging game-wide summaries of certain information.
   
## Intended Use
This demo video demonstrates that adding an After Action Review workflow can improve the usefulness of an analytics tool designed to help find bugs in a complex reinforcement learning agent's reasoning.  Though built around a particular domain, the AARfAI benefits are believed to be domain-independent.
   
## Model/Data
The state transistion model predicts game state at the next decision point, given the current game state, a friendly action, and an enemy action.  The state information includes which unit-generating buildings are possessed by the friendly and enemy agent, how many income-generating units are possessed by each agent, and what units are on the field in either battlezone lane, binned into four grid-squares per lane.  The action information includes which unit-generating buildings are purchased at each decision point (decision points every 30 seconds). Game action is otherwise controlled by the default SC2 engine.

The leaf evaluation model predicts the likelihood of an eventual win given a particular game state.  Inputs are the state information as described above.

The agent was trained by playing against another AI agent until it would usually win.  Then it would train against a copy of itself until it would usually win.  This process was iterated a number of times.
   
## Limitations
This analytics UI was developed to work specifically with the custom SC2 Tug-of-war game.
