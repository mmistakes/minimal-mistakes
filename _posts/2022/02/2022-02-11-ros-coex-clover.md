---
layout: single
title: "Aerial robot for autonomous missions is here!"
author: [ptak-bartosz]
modified: 2022-01-04
tags: [edge-ai, uav]
category: [article]
teaser: "/assets/images/posts/2022/02/clover-thumb.webp"
---

<p align="center">
    <img src="/assets/images/posts/2022/02/clover.webp" height="300px" />
</p>

## COEX Clover - an educational kit

[COEX Clover](https://clover.coex.tech/en/) is an educational drone designed for indoor operation. Its proper frame allows for comfortable testing of vision algorithms, and plastic covers take care of safety. We purchased it as part of [CopterHack 2022](https://clover.coex.tech/en/copterhack2022.html), in which we participated.

## A newly unlocked robotic opportunity

<p align="center">
    <img src="/assets/images/posts/2022/02/diagram.webp" height="300px" />
</p>

In our view, this is an interesting solution to testing machine learning vision algorithms and active control techniques. The aerial robot has a PX4 flight computer and is also equipped with a Raspberry Pi 4. The combination of these components enables using the Robot Operating System (ROS) via the MAVROS bridge. The authors also provide a simulator that enables the use of a realistic drone model. Thus, we can develop the algorithms consecutively: in the simulation, on the Clover, and finally on a fully operational UAV.

## The first autonomous flight!

Manual flights adjusted PID values enough - flying is stable. Now it is time for an autonomous mission launched from the console! The task is simple: takeoff, hover, check for stability, and landing. Spatial stabilization is provided by the optical flow from the camera. What is the final effect? You can look at the video below:

<iframe width="1280" height="720" src="https://www.youtube.com/embed/jG_cteZ-Gwc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>