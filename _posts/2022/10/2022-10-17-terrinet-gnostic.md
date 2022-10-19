---
layout: single
title: "TERRINet 10th Call and Institut de Robòtica i Informàtica Industrial at Universitat Politècnica de Catalunya"
author: [ptak-bartosz, pieczynski-dominik, aszkowski-przemyslaw, kraft-marek]
modified: 2022-10-17
tags: [research, computer vision, smart surveillance, deep learning]
category: [article]
teaser: "/assets/images/posts/2022/10/terrinet-thumb.webp"
---

<p align="center">
    <img src="/assets/images/posts/2022/10/team.webp" height="300px" />
</p>

## TERRINet project and Host Institution

We were granted to participate in the TERRINet project, which is a part of the European Union’s Horizon 2020 research and innovation programme. We were hosted at the Institut de Robòtica i Informàtica Industrial at Universitat Politècnica de Catalunya, Spain. During the 7-day stay, Marek, Dominik, Przemyslaw, and Bartosz worked on the vision surveillance in the smart city project.

<p align="center">
    <img src="/assets/images/posts/2022/10/team-front.webp" height="300px" />
</p>

## GNOSTIC

Our research proposal called **GNOSTIC** (Graph Neural Networks for camera network spatial topology discovery and activity control) is mainly related to the research area of computer vision and deep learning. The main goal of the project is to develop a novel approach to the problem of camera network spatial topology discovery and activity control. The proposed approach will be based on the graph neural networks (GNNs) and will be able to discover the spatial topology of the camera network and control the activity of the cameras in the network. The method will enable automatic tuning of the system's parameters based on objects (e.g. humans) re-identified between cameras.

### Data collecting from multi-camera system

<p align="center">
    <img src="/assets/images/posts/2022/10/cameras.webp" height="300px" />
</p>

The host institution introduced us to their 13-camera outdoor system, and we started our work. We prepared a multi-threaded application to grab frames from cameras over RTSP protocol. Each camera delivered four images per second with 90% JPG compression.

When each image batch was collected, the anonymizing tool was performed on it. We used the state-of-the-art method named [DSFD](https://github.com/hukkelas/DSFD-Pytorch-Inference). It detects faces as bounding boxes in various rotations. After that, our pipeline blurred them with the adaptative kernel in order to minimalize the changes in images. 

### Human detection and re-identification

<p align="center">
    <img src="/assets/images/posts/2022/10/reid.webp" height="300px" />
</p>

We used a modified version of the [YOLOv7 algorithm](https://github.com/WongKinYiu/yolov7) for human detection and the [DeepSORT tracker](https://github.com/nwojke/deep_sort) for the between-frames association for each of the cameras.

### Future work and plans

Now, we plan to re-identify people between the cameras and provide this information to Graph Neural Networks. The upcoming research will determine the validity of our proposal and allow us to estimate future steps in the project.


## Off-topic

<p align="center">
    <img src="/assets/images/posts/2022/10/public-access.webp" height="300px" />
</p>

A really inspiring place for us was the spot of "open access publishing", where you can get and read the latest publications at the institute. We will definitely try to apply this idea at our PUT!

## Summary

Now, once the trip is over, we plan to combine the acquired knowledge and test data to prepare a research paper.

<p align="center">
    <img src="/assets/images/posts/2022/03/terrinet.webp"/>
</p>

> We acknowledge the support of the TERRINet project and would like to express our gratitude to the Institut de Robòtica i Informàtica Industrial team at Universitat Politècnica de Catalunya for their hospitality and help. Special thanks to Fernando, who supported us during our stay.
