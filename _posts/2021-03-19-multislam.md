---
title: "(T-RO) Multirobot Collaborative Monocular SLAM Utilizing Rendezvous"
categories:
 - 2ndAuthor
tags:
 - Multi Robot System
header:
  teaser: /assets/image/thumbnail/tro2023.gif
authors: Youngseok, Changsuk Oh, <u>Yunwoo Lee*</u>, and H. Jin Kim
links:
- paper:
  link: https://ieeexplore.ieee.org/document/9381949
  name: "Paper"
- bibtex:
  name: "Bibtex"
---
{% include video id="zxpBws6kxNI" provider="youtube" %}

**Abstract:** Multirobot simultaneous localization and mapping (SLAM) requires technical ingredients such as systematic construction of multiple SLAM systems and collection of information from each robot. In particular, map fusion is an essential process of multirobot SLAM that combines multiple local maps estimated by team robots into a global map. Fusion of multiple local maps is usually based on interloop detection that recognizes the same scene visited by multiple robots, or robot rendezvous where a member(s) of a robot team is observed in another member's images. This article proposes a collaborative monocular SLAM including a map fusion algorithm that utilizes rendezvous, which can happen when multirobot team members operate in close proximity. Unlike existing rendezvous-based approaches that require additional sensors, the proposed system uses a monocular camera only. Our system can recognize robot rendezvous using nonstatic features (NSFs) without fiducial markers to identify team robots. NSFs, which are abandoned as outliers in typical SLAM systems for not supporting ego-motion, can include relative bearing measurements between robots in a rendezvous situation. The proposed pipeline consists of the following: first, a feature identification module that extracts the relative bearing measurements between robots from NSFs consisting of anonymous bearing vectors with false positives, and second, a map fusion module that integrates the map from the observer robot with the maps from the observed robots using identified relative measurements. The feature identification module can operate quickly using the proposed alternating minimization algorithm formulated by two subproblems with closed-form solutions. The experimental results confirm that our collaborative monocular SLAM system recognizes rendezvous rapidly and robustly, and fuses local maps of team robots into a global map accurately.

## Bibtex <a id="bibtex"></a>
```
@ARTICLE{9381949,
  author={Jang, Youngseok and Oh, Changsuk and Lee, Yunwoo and Kim, H. Jin},
  journal={IEEE Transactions on Robotics}, 
  title={Multirobot Collaborative Monocular SLAM Utilizing Rendezvous}, 
  year={2021},
  volume={37},
  number={5},
  pages={1469-1486},
  keywords={Robots;Simultaneous localization and mapping;Robot kinematics;Collaboration;Cameras;Sensors;Robot vision systems;Alternating minimization;collaborative monocular simultaneous localization and mapping (SLAM);map fusion (MF);multirobot systems;robot rendezvous},
  doi={10.1109/TRO.2021.3058502}}
```