---
title: "(ICRA) Integrated Motion Planner for Real-time Aerial Videography with a Drone in a Dense Environment"
categories:
 - 2ndAuthor
tags:
 - Aerial Tracking
header:
  teaser: /assets/image/thumbnail/homepage_boseong-icra_gif.gif
authors: Boseong Jeon, <u>Yunwoo Lee*</u>, and H. Jin Kim
links:
- paper:
  link: https://ieeexplore.ieee.org/document/9196703
  name: "Paper"
- bibtex:
  name: "Bibtex"
---
{% include video id="_JSwXBwYRl8" provider="youtube" %}

**Abstract:** This work suggests an integrated approach for a drone (or multirotor) to perform an autonomous videography task in a 3-D obstacle environment by following a moving object. The proposed system includes 1) a target motion prediction module which can be applied to dense environments and 2) a hierarchical chasing planner. Leveraging covariant optimization, the prediction module estimates the future motion of the target assuming it efforts to avoid the obstacles. The other module, chasing planner, is in a bi-level structure composed of preplanner and smooth planner. In the first phase, we exploit a graph-search method to plan a chasing corridor which incorporates safety and visibility of target. In the subsequent phase, we generate a smooth and dynamically feasible trajectory within the corridor using quadratic programming (QP). We validate our approach with multiple complex scenarios and actual experiments. The source code and the experiment video can be found in https://github.com/icsl-Jeon/traj_gen_vis and https://www.youtube.com/watch?v=_JSwXBwYRl8.

## Bibtex <a id="bibtex"></a>
```
@INPROCEEDINGS{9196703,
  author={Jeon, Boseong and Lee, Yunwoo and Kim, H. Jin},
  booktitle={2020 IEEE International Conference on Robotics and Automation (ICRA)}, 
  title={Integrated Motion Planner for Real-time Aerial Videography with a Drone in a Dense Environment}, 
  year={2020},
  volume={},
  number={},
  pages={1243-1249},
  keywords={Drones;Trajectory;Safety;Optimization;Measurement;Shape;Real-time systems},
  doi={10.1109/ICRA40945.2020.9196703}}
```