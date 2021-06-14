---
title: "Cognitive Models for Common Ground Modeling"
excerpt: "We model both the AI and the human performer in a common modeling framework and use cognitive salience to reveal their respective mental models"
tags: # Select from this set
  - Autonomy
  - Computer Vision
  - Reinforcement Learning
  - Human-Machine Teaming
  - Saliency
   
submission_details:
  resources: # List any resources associated with the contribution. Not all sections are required
    papers:
      - title: ICCM '19
        url: https://iccm-conference.neocities.org/2019/proceedings/papers/ICCM2019_paper_53.pdf
      - title: ICCM '20
        url: https://iccm-conference.neocities.org/2020/papers/Contribution_255_final.pdf
      - title: BAICS '20
        url: https://baicsworkshop.github.io/pdf/BAICS_36.pdf
    software:
      - title: pyactup
        url: https://halle.psy.cmu.edu/pyactup/
    demos:
      - title: Google Colab
        url: https://colab.research.google.com/drive/1tf5gYVab3GSpPsTUxp34PVxNCIbA19FC?usp=sharing
      
  license: https://bitbucket.org/dfmorrison/pyactup/src/master/LICENSE 
  
  authors:
    - Sterling Somers<sup>1</sup>
    - Constantinos Mitsopolous<sup>1</sup>
    - Christien Lebiere<sup>1</sup>
    - Peter Perolli<sup>2</sup>
    - Joel Schooler<sup>2</sup>
    - Robert Thomson<sup>3</sup>
  organizations:
    - 1. Department of Psychology, Carnegie Mellon University
    - 2. Institute for Human and Machine Cognitive (IHMC)
    - 3. Department of Psychology, United States Military Academy West Point
  
  point_of_contact:
    name: Sterling Somers
    email: sterling@sterlingsomers.com
---
   
## Overview
We demonstrate the use of cognitive architectures as a common framework for modeling AIs and human performers in a task. The mental model of each performer is revealed using cognitive salience, which is intended as a basis for explanation.

At it's simplest you can use a memory model and instance-based learning in `pyactup`
```bash
   pip install pyactup
```
The [demo](https://colab.research.google.com/drive/1tf5gYVab3GSpPsTUxp34PVxNCIbA19FC?usp=sharing) has full tutorials and examples. 

## Intended Use
This approach is intended for human-machine teaming where a human participant is invested in or participates in a task. The method adapts as the participant learns the task.
It can be used to infer if an explanation is needed, the differences between AI and participant mental models, tailored to the individual. 

We have applied this method in RL game context (gridworld) but more complex models could be developed for more complex environments. 
   
## Model/Data
The model is non-parametric (k-Nearest Neighbor) with terms to capture cognitive effects. It takes states (slot/value pairs) and maps to values (or actions). 

The model is not "trained" but uses behavioral traces to supervise-learn behavior. 
   
## Limitations
Normal k-Nearest Neighbor limitations. 
   
