---
layout: single
title: "Increasing the quality of fiber hemp seed by robotization (POIR.01.01.01-00-0662/20)"
author: [kraft-marek, pieczynski-dominik, ptak-bartosz, piechocki-mateusz]
modified: 2022-01-01
tags: [ncbir, hemp, robotics, vision]
category: [project]
teaser: "/assets/images/posts/2022/01/hemp_thumb.webp"
---
<BR>

# Scope

> Increasing the quality of fiber hemp seed by robotization. (POIR.01.01.01-00-0662/20)  
In original:   
Robotyzacja procesu zwiększania jakości materiału siewnego konopi włóknistej. (POIR.01.01.01-00-2271/20-00)

## Aim

The objective of the project is to develop an intelligent agricultural robot to increase the quality of fiber hemp seed. The developed solution will consist of a mobile robot equipped with a specialized arm and a set of cameras. The software uses dedicated neural networks to analyze images to detect a male's individual plant and then precisely control the arm to neutralize the detected individual.

<p align="center">
    <img src="/assets/images/posts/2022/01/hemp.webp" height="300px" />
</p>

## Our contribution


Our team worked on a computer vision algorithm that provides hemp stalk coordinates for the robotic arm tool. An efficient neural network segmentation model was developed to extract stalks on the image. The information is fused with depth information from the RGB-D sensor. Next, it is shared by the Robot Operating System node as a transformation between tool and goal.

<p align="center">
    <img src="/assets/images/posts/2022/01/hemp_mask.webp" height="300px" />
</p>