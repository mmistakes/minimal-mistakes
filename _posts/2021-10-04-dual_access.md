---
title: "(ACCESS) Autonomous Aerial Dual-Target Following Among Obstacles"
categories:
 - 2ndAuthor
tags:
 - Aerial Tracking
header:
  teaser: /assets/image/thumbnail/tro2023.gif
authors: Boseong Jeon, <u>Yunwoo Lee*</u>, Jeongjun Choi, Jungwon Park, and H. Jin Kim
links:
- paper:
  link: https://ieeexplore.ieee.org/document/9557293
  name: "Paper"
- bibtex:
  name: "Bibtex"
---
{% include video id="zxpBws6kxNI" provider="youtube" %}

**Abstract:** In contrast to recent developments in online motion planning to follow a single target with a drone among obstacles, a multi-target case with a single chaser drone has been hardly discussed in similar settings. Following more than one target is challenged by multiple visibility issues due to the inter-target occlusion and the limited field-of-view in addition to the possible occlusion and collision with obstacles. Also, reflecting multiple targets into planning objectives or constraints increases the computation load and numerical issues in the optimization compared to the single target case. To resolve the issues, we first develop a visibility score field for multiple targets incorporating the field-of-view limit and inter-occlusion between targets. Next, we develop a fast sweeping algorithm used to compute the field for the suitability of real-time applications. Last, we build an efficient hierarchical planning pipeline to output a chasing motion for multiple targets ensuring key objectives and constraints. For reliable chasing, we also present a prediction algorithm to forecast the movement of targets considering obstacles. The online performance of the proposed algorithm is extensively validated in challenging scenarios, including a large-scale simulation, and multiple real-world experiments in indoor and outdoor scenes. The full code implementation of the proposed method is released here: https://github.com/icsl-Jeon/dual_chaser.

## Bibtex <a id="bibtex"></a>
```
@ARTICLE{9557293,
  author={Jeon, Boseong Felipe and Lee, Yunwoo and Choi, Jeongjun and Park, Jungwon and Kim, H. Jin},
  journal={IEEE Access}, 
  title={Autonomous Aerial Dual-Target Following Among Obstacles}, 
  year={2021},
  volume={9},
  number={},
  pages={143104-143120},
  keywords={Drones;Planning;Cameras;Trajectory;Safety;Reliability;Prediction algorithms;Collision avoidance;cinematography;motion planning;trajectory optimization},
  doi={10.1109/ACCESS.2021.3117314}}

```