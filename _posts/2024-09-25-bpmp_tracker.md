---
title: "(RA-L, accepted) BPMP-Tracker: A Versatile Aerial Target Tracker
Using Bernstein Polynomial Motion Primitives"
categories:
 - Journal
tags:
 - Aerial Tracking
header:
  teaser: /assets/image/thumbnail/homepage_bpmp-tracker_2x_gif.gif
journals: RA-L
authors: <u>Yunwoo Lee</u>, Jungwon Park, Boseong Jeon, Seungwoo Jung, and H. Jin Kim
links:
- paper:
  link: https://arxiv.org/pdf/2408.04266
  name: "Paper"
---
{% include video id="rTf4HyOwnOA" provider="youtube" %}

**Abstract:** This work presents a distributed trajectory planning method for multi-agent aerial tracking. The proposed method uses a Dynamic Buffered Voronoi Cell (DBVC) and a Dynamic Inter-Visibility Cell (DIVC) to formulate the distributed trajectory generation. Specifically, the DBVC and the DIVC are time-variant spaces that prevent mutual collisions and occlusions among agents, while enabling them to maintain suitable distances from the moving target. We combine the DBVC and the DIVC with an efficient Bernstein polynomial motion primitive-based tracking trajectory generation method, which has been refined into a less conservative approach than in our previous work. The proposed algorithm can compute each agent's trajectory within several milliseconds on an Intel i7 desktop. We validate the tracking performance in challenging scenarios, including environments with dozens of obstacles.

## Bibtex <a id="bibtex"></a>
```
@ARTICLE{bpmp_tracker2024,
  author={Lee, Yunwoo and Park, Jungwon and Jeon, Boseong and Jung, Seungwoo and Kim, H. Jin},
  journal={IEEE Robotics and Automation Letters}, 
  title={BPMP-Tracker: A Versatile Aerial Target Tracker Using Bernstein Polynomial Motion Primitives}, 
  year={2024},
  volume={9},
  number={12},
  pages={10938-10945},
  keywords={Trajectory;Drones;Polynomials;Target tracking;Trajectory planning;Planning;Pipelines;Ellipsoids;Cameras;Aerodynamics;Reactive and sensor-based planning;visual servoing;motion and path planning},
  doi={10.1109/LRA.2024.3475879}}
```
