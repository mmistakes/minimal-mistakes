---
layout: single
title: "An Indoor RGB-D Dataset for the Evaluation of Robot Navigation Algorithms"
author: [fularz-michal, kraft-marek]
modified: 2014-01-24
tags: [rgbd, navigation, database]
category: [dataset]
teaser: "/assets/images/posts/2014/01/wifibot.webp"
---

<BR>
<iframe width="1007" height="755" src="https://www.youtube.com/embed/XIJvHiWisAc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Below, we provide the links for downloading the RGB-D dataset for development and evaluation of mobile robot navigation systems. The dataset was registered using a WiFiBot robot equipped with a Kinect sensor. 

Unlike the presently available datasets, the environment was specifically designed for the registration with the Kinect sensor – we placed some objects in the environment, so that useful depth data is available all throughout the sequence. Moreover, we took great care to properly synchronize the registration process. The samples for ground truth registration using overhead cameras were collected simultaneously every 100 ms,  and the data coming from the robot-mounted sensors is in sync with the ground truth to under 1ms accuracy.  The presented dataset is be made publicly available for research purposes.

You are free to use the data for research/hobby purposes. If you plan to use the database or its fragments as a part of a commercial application, please contact the Authors, so that further agreements can be made. If the posted data is useful to you, the Authors would be really grateful if you cite the following article:

An Indoor RGB-D Dataset for the Evaluation of Robot Navigation Algorithms, Adam Schmidt, Michał Fularz, Marek Kraft, Andrzej Kasiński, Michał Nowicki, Prof. of Int. Conf. on Advances Concepts for Intelligent Vision Systems, Lecture Notes in Computer Science Vol. 8192, pp. 321-329 [link]

The acquisition of the data was  supported by the Polish National Science Centre grant  “The generalized, multi-robot framework for the augmented, visual simultaneous localization and mapping system” funded according to the decision DEC-2011/01/N/ST7/05940, which is gratefully acknowledged.

## Download

* [A short manual](http://fpga.cie.put.poznan.pl/PUT_RGBD_database/PUT_RGBD_database.pdf)
* [trajectory_1](http://fpga.cie.put.poznan.pl/PUT_RGBD_database/trajectory_1.zip)
* [trajectory_2](http://fpga.cie.put.poznan.pl/PUT_RGBD_database/trajectory_2.zip)
* [trajectory_3](http://fpga.cie.put.poznan.pl/PUT_RGBD_database/trajectory_3.zip)
* [trajectory_4](http://fpga.cie.put.poznan.pl/PUT_RGBD_database/trajectory_4.zip)
* [The camera parameters](http://fpga.cie.put.poznan.pl/PUT_RGBD_database/camera_data.txt)
