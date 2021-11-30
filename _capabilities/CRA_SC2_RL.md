---
title: "Counterfactual Explanations for Enhancing Human-Machine Teaming"
excerpt: "This contribution provides a framework for generating counterfactual explanations for AI agents in the domain of StarCraft2."
tags: # Select from this set
  - Analytics
  - Autonomy
  - Reinforcement Learning
  - Human-Machine Teaming
  - Data Poisoning
  - Explanation Framework
   
submission_details:
  resources: # List any resources associated with the contribution. Not all sections are required
    papers:
      - title: Brittle AI, Causal Confusion, and Bad Mental Models: Challenges and Successes in the XAI Program
        url: https://arxiv.org/abs/2106.05506
    software:
      - title: CAMEL Software
        url:  https://data.kitware.com/api/v1/item/6179b5a22fa25629b9bc8daf/download
      - title: Another software link text
        url: Another software link url
    demos:
      - title: Demo video
        url: https://cra.com/xai/
   
  # Optional information describing artifact. Leave blank if unused
  version: Version Number
  size: Size
  license: Link to license
   
  authors:
    - Jeff Druce, James Niehaus, Joseph Campolongo
    # Optional for multiple authors and organizations
    - Author Name <sup>1</sup>
  organizations:
    - Charles River Analytics
    # Optional for multiple authors and organizations
    - 1. Organization
  point_of_contact:
    name: Jeff Druce
    email: jdruce@cra.com 
---
   
## Overview
[comment]: <> (What is the main purpose of the contribution?)
   The purpose of this contribution is provide a framework for explaining AI agents in a Human-Machine Teaming (HMT) scenario in the domain of StarCraft 2. The contribution incldes a custom StarCraft2 map that allows a human to either take control over a squad of marines, or allow an AI to take control in defending a central base. Explanations in the form of narrative statments for the AI's actions are produced by using a Causal Model. The statements are received via a Expalnation User Interface (XAI) in the form of an After Action Review (AAR) following an episode.
## Intended Use
[comment]: <> (What is the intended use case for this contribution?)
The intedned use of this contribution is to provide user's of an AI a better sense of the driving factors behind an AI's actions, and a better sense of what scenarios an AI is sufficiently performant and can be reasonable trusted. 

[comment]: <> (What domains/applications has this contribution been applied to?)
   This contribution can be applied to our custom map in StarCraft2. 
   
## Model/Data
[comment]: <> (If a model is involved, what are its inputs and outputs?)
The model which provides explanation is graphical causal model. In effect, it is a joint probability model over derived variables and the outpuf of the AI; derived variables are high-level, human understandable variables that can be derived from the low leveel variables (e.g., we provide a variable called "number of enemies in the top half of the screen which can be computed from a feature map showing the locatins of the enemies). At inference time, our variable takes in the full set of derived variables, and finds out what values of the derived variables could be perturbed to change the action of the AI; this produces a counterfactual statement for the AI (e.g., "The AI would have moved to location A3, if the number of enemeies in the top half was greater than 2."). 

[comment]: <> (If the model was learned/trained, what data was used for training/testing?)
   The model was trained on a corpus of data providing the derived variables and actions for the AI over a collection of several hundred episodes of the AI. This data allowed us to produce a model that was over 99% accurate on a held-out testing set. 
   
## Limitations
[comment]: <> (Are there any additional limitations/ethical considerations for use of this contribution?)
   
[comment]: <> (Are there known failure modes?)
   
## References
[comment]: <> (Any additional information, e.g. papers \(cited with bibtex\) related to this contribution.)
