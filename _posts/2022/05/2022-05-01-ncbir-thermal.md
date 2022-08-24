---
layout: single
title: "Visual face sensing with a thermal imaging camera"
author: [aszkowski-przemyslaw, ptak-bartosz, kraft-marek]
modified: 2022-05-1
tags: [thermal, vision]
category: [project]
teaser: "/assets/images/posts/2022/05/thermal_thumb.webp"
---
<BR>

# Scope

Computer vision system for accurate measurement of regions of interest in thermal camera images, supported by the RGB and depth camera sensors, which can be integrated with a public space device to be used for detecting sickness symptoms.

# Our contribution

Our team prepared two stages algorithm to determine thermal regions of interest. At first, convolutional neural networks were used to detect and extract areas in the visual image. In the second part, multi-camera calibration and classical vision algorithms were applied for transformation ROIs between RGB and thermal images.

<p align="center">
    <img src="/assets/images/posts/2022/05/thermal.webp" height="300px" />
</p>

