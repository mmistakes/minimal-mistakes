---
layout: single
title: "TERRINet 8th Call and Universidad de Sevilla GRVC laboratory"
author: [ptak-bartosz, piechocki-mateusz, pieczynski-dominik]
modified: 2022-03-28
tags: [edge-ai, uav, deep learning]
category: [article]
teaser: "/assets/images/posts/2022/03/terrinet-thumb.webp"
---

<p align="center">
    <img src="/assets/images/posts/2022/03/terrinet-we.webp" height="300px" />
</p>

In October 2021 we applied a proposal in the TERRINet project developing a vision- and deep learning-accelerated landing system for Unmanned Aerial Devices (UAV) equipped with PX4 autopilot and Edge AI device. The idea was approved and a fellowship was granted.

In half of March, Dominik Pieczyński, Mateusz Piechocki and Bartosz Ptak flied to Sevilla, Spain with the task of developing system during 12 days' stay.

## The short story about TERRINet

<p align="center">
    <img src="/assets/images/posts/2022/03/terrinet-safearea.webp" height="300px" />
</p>

[The European Robotics Research Infrastructure Network (TERRINet)](https://www.terrinet.eu/project/) is the robotics project granted by European Union’s Horizon 2020 research and innovation programme. It provides easy access to various high-quality robotics infrastructures and research services for PhD, PhD students and other researchers. Project's filers are: ideas exploration, boosting scientific research and sharing knowledge with experts.

## It's time to work!

<p align="center">
    <img src="/assets/images/posts/2022/03/terrinet-workspace.webp" height="300px" />
</p>

Our host was the [GRVC laboratory](https://grvc.us.es/), which has published many interesting papers related to UAVs and robotics. For example, the latest was analyzed [an ornithopter under high-amplitude flapping](https://www.sciencedirect.com/science/article/pii/S1270963822000050?via%3Dihub). Their laboratory is a safe place for developing steering algorithms for aerial robotics. As you can see above, it is equipped with a roll cage. Additionally, the whole roll cage is covered by the OptiTrack system.

After familiarizing ourselves with the infrastructure and safety information, we started working on the project. Based on a PX4 simulator, with EDGE AI devices such as the Jetson Xavier NX and Raspberry Pi 4 with Neural Compute Stick 2, we began to assemble a robotic node executing our algorithm. 

## Vision methods for UAVs safety

<p align="center">
    <img src="/assets/images/posts/2022/03/terrinet-gazebo.webp" height="300px" />
</p>

Developing a robotic algorithm requires a lot of time and a large amount of annotated data. Moreover, active control of aerial robots demands sensitive testing of behavior in edge cases. Therefore, we have used the "simulation in the loop" of the PX4 autopilot, simultaneously executing the algorithm directly on the embedded device through ROS topic transmission.

### Concept

Systems that support the real-life landing of flying robots are of critical importance if precise docking to a base station is required. The combination of GPS positioning and RTK corrections allows for accurate action to the landing point, but the accuracy of the measurement, the noise and interference make it difficult to accurately target the base station if it is mobile.

Current vision-based unmanned aerial vehicle **landing systems** are mainly based on Aruco marker detection. The current development of **edge devices** and miniaturisation of resources allows performing **neural network inference on-board** the drone. Building a system based on deep learning would generalise such systems and improve their effectiveness in uncontrolled conditions. Additionally, the algorithm allows for the implementation of **safety features**, such as the ability to detect a human in the neighborhood and hold up the landing process.

The ultimate aim of the research visit is to determine if it is pussible lo use edge devices tu build a vision-hased system using deep neural networks to improve precision UAV landing. If not, we will try to answer how current constraints prevent the use of modern technology and indicatc possible  evelopments and pitfalls of cxisting approachcs.

### Deep Computer Vision

We designed the algorithm split into two deep learning subtasks. Both utilise UNet-style architectures and meet the following tasks:
* the first network was designed as the gaussian density estimator with two output channels: one for the landing pad and the second for people instances,
* the second network was developed to regress defined keypoints of the landing pad; the clue of the approach is to add a self-criticised metric that provides the standard deviation of predictions.  

### Devices

One of the aims of the project is to perform inference on the edge ai devices with time requirements of steering offboard mode. The utilisation of offboarding steering provided by the device connected to the flight computer limits it to guarantee at least 2 Hz of a signal. Due to this, we defined two cases to check:

* NVIDIA Jetson Xavier NX - the goal was to achieve near-real-time performance (20+ frames per second),
* Raspberry Pi 4 + Neural Computer Stick 2 - the goal was to break the barrier of 2 Hz.

### Summary

Now, after the finish of travel, we plan to merge all benchmarks and knowledge boosts in order to prepare a conference paper.


<p align="center">
    <img src="/assets/images/posts/2022/03/terrinet.webp"/>
</p>

> We acknowledge the support of the TERRINet project and would like to express our gratitude to the GRVC team at Sevilla for their hospitality and help.