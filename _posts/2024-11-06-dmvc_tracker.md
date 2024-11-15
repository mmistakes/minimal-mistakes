---
title: "(RA-L, submitted) Distributed Multi-Agent Trajectory Planning for Target Tracking Using Dynamic Buffered Voronoi and Inter-Visibility Cells"
categories:
 - Journal
tags:
 - Aerial Tracking
header:
  teaser: /assets/image/thumbnail/homepage_dmvc_tracker_2x_gif_comp.gif
journals: RA-L
authors: <u>Yunwoo Lee</u>, Jungwon Park, and H. Jin Kim
---



<br>
<br>
<br>


**Abstract:** This work presents a distributed trajectory planning method for multi-agent aerial tracking. The proposed method uses a Dynamic Buffered Voronoi Cell (DBVC) and a Dynamic Inter-Visibility Cell (DIVC) to formulate the distributed trajectory generation. Specifically, the DBVC and the DIVC are time-variant spaces that prevent mutual collisions and occlusions among agents, while enabling them to maintain suitable distances from the moving target. We combine the DBVC and the DIVC with an efficient Bernstein polynomial motion primitive-based tracking trajectory generation method, which has been refined into a less conservative approach than in our previous work. The proposed algorithm can compute each agent's trajectory within several milliseconds on an Intel i7 desktop. We validate the tracking performance in challenging scenarios, including environments with dozens of obstacles.