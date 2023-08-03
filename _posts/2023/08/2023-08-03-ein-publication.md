---
layout: single
title: "Unraveling Induction Motor State through Thermal Imaging and Edge Processing: A Step towards Explainable Fault Diagnosis"
author: [piechocki-mateusz, kraft-marek]
modified: 2023-08-03
tags: [thermal imaging, fault diagnosis, squirrel-cage induction motor, convolutional neural networks, explainability, edge processing]
category: [publication]
teaser: "/assets/images/posts/2023/08/workswell_post_img.webp"
---

<p align="center">
    <img src="/assets/images/posts/2023/08/workswell_full_heatmap.webp" height="300px" />
</p>

## Abstract:

> Equipment condition monitoring is essential to maintain the reliability of the electromechanical systems. Recently topics related to fault diagnosis have attracted significant interest, rapidly evolving this research area. This study presents a non-invasive method for online state classification of a squirrel-cage induction motor. The solution utilizes thermal imaging for non-contact analysis of thermal changes in machinery. Moreover, used convolutional neural networks (CNNs) streamline extracting relevant features from data and malfunction distinction without defining strict rules. A wide range of neural networks was evaluated to explore the possibilities of the proposed approach and their outputs were verified using model interpretability methods. Besides, the top-performing architectures were optimized and deployed on resource-constrained hardware to examine the system's performance in operating conditions. Overall, the completed tests have confirmed that the proposed approach is feasible, provides accurate results, and successfully operates even when deployed on edge devices.

You can find more about this research in our paper in _Eksploatacja i Niezawodność – Maintenance and Reliability_ journal [http://doi.org/10.17531/ein/170114](http://doi.org/10.17531/ein/170114).

<p align="center">
    <img src="/assets/images/posts/2023/08/acc_infer_size_comparison.webp" height="300px" />
</p>


## Code repository

In addition to the article, we have prepared a code repository with the implementation of the proposed research - [https://github.com/MatPiech/motor-fault-diagnosis](https://github.com/MatPiech/motor-fault-diagnosis).


## Dataset

The dataset used in this research is available on Zenodo ([https://doi.org/10.5281/zenodo.8203070](https://doi.org/10.5281/zenodo.8203070)) under _Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International_ license.
