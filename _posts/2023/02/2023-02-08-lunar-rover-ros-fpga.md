---
layout: single
title: "Cognition: distributed data processing system for lunar activities"
author: [ptak-bartosz, pieczynski-dominik, kraft-marek]
modified: 2023-02-08
tags: [qgis, plugin, deepness, remote sensing]
category: [project]
teaser: "/assets/images/posts/2023/02/husky_thumb.webp"
---
<BR>

<iframe width="1280" height="720" src="https://www.youtube.com/embed/Cpln4hFDycI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<BR>

The project is a part of the European Space Agency's [Open Space Innovation Platform](https://www.esa.int/Enabling_Support/Preparing_for_the_Future/Discovery_and_Preparation/The_Open_Space_Innovation_Platform_OSIP) project called **Cognition**. Its goal is to evaluate the possibilities for advanced spacecraft onboard data processing, reducing the transmitted data payloads to the essential information and increasing the level of autonomy of rovers, landers, and other space vehicles. 

The research is performed by collaborating teams from the Poznań University of Technology (PUT) and [KP Labs](https://kplabs.space/). The project is funded by the European Space Agency. Its work organization is splitted into four main tasks:

* Creating a deep learning model for the detection of rocks on the lunar surface (KP Labs)
* Benchmarking models on various FPGA platforms (KP Labs)
* Creating a ROS2-based framework for the rover (PUT)
* Hardware integration (PUT)

**In this article, we will focus on the last two tasks.**

## Base platform and hardware

<p align="center">
    <img src="/assets/images/posts/2023/02/husky_diagram.webp" height="300px" />
</p>

The clue of our work is to move all [Husky rover](https://clearpathrobotics.com/husky-unmanned-ground-vehicle-robot/) software to the [Xilinx Versal VCK190 developer kit](https://www.xilinx.com/products/boards-and-kits/vck190.html). The kit is equipped with a Xilinx Versal ACAP (Adaptable Compute Acceleration Platform) and a Xilinx Versal AI Engine. The ACAP is a programmable chip that can be used as a general-purpose processor. The AI Engine is a dedicated hardware accelerator for deep learning models. 

The research is mainly related to creating a Petalinux image with ROS2 packages and integrating the AI Engine endpoint. Both ROS2 base and own packages are prepared as meta layers for the Petalinux. Additional efford was put into integrating drivers, libraries, startup scripts, and other software components. The final image is then deployed with extended hardware components such as the IMU sensor ([Xsens MTi-300](https://www.xsens.com/hubfs/Downloads/Leaflets/MTi-300.pdf)), RGB-D camera ([Luxonis OAK-D Lite](https://shop.luxonis.com/products/oak-d-lite-1)), and the rover itself.


## ROS2-based framework

First step is add ROS2 packages to the Petalinux image. We used the [meta-ros](https://github.com/ros/meta-ros) repository as a base and after some modifications, we were able to build the image with ROS2 packages. We perform sanity tests on both Foxy and Humble versions of ROS2 and both of them worked as expected. We chose the Foxy version as the final one, due to its better support for our hardware.

<p align="center">
    <img src="/assets/images/posts/2023/02/husky_wtf.webp" height="200px" />
</p>

### Husky rover integration

A lot of work goes into building meta layers for Husky rover packages. We had to modify the original packages to make them work with the Xilinx platform and additionally, configure kernel modules that provide communication via USB. 

<p align="center">
    <img src="/assets/images/posts/2023/02/husky_husky.webp" height="200px" />
</p>

### IMU sensor integration

The IMU sensor is used to provide odometry data to the robot. We created a ROS2-based meta layer that subscribes to the sensor's topic and publishes the odometry data. The node is based on the [xsens_driver](http://wiki.ros.org/xsens_driver).

<p align="center">
    <img src="/assets/images/posts/2023/02/husky_imu.webp" height="100px" />
</p>

### Visual and depth camera integration

The visual and depth camera is used to provide camera images and depth data to the robot. We created a ROS2-based meta layer that subscribes to the camera's topics and publishes the camera images and depth data. The node is based on the [depthai-ros](https://github.com/luxonis/depthai-ros) package. Its main advantage is that it provides a unified interface for both RGB and depth cameras and images are aligned. In addition to the meta-layers it is necessary to include additional drivers and activate kernel modules and interfaces.

<p align="center">
    <img src="/assets/images/posts/2023/02/husky_depth.webp" height="300px" />
</p>

### AI Engine endpoint integration

Finally, we integrated the AI Engine endpoint into the ROS2-based framework. The endpoint is a Python script prepared by KP Labs that receives the image and returns the segmentation map. The script utilizes a model which was quantized and compiled into the Xilinx format.

<p align="center">
    <img src="/assets/images/posts/2023/02/husky_inf.webp" height="300px" />
</p>

## Final remarks

At the end of the project, we created a fully functional ROS2-based framework for the rover. The rover can navigate remotely, detect obstacles, and perform camera segmentation. The rover is also equiped with a depth camera and an IMU sensor. We performed a series of real-world tests at [LunAres Research Station](https://lunares.space/) and everything worked as expected. Below you can see a few photos from the tests.

<p align="center">
    <img src="/assets/images/posts/2023/02/husky_0.webp" height="300px" />
</p>

<p align="center">
    <img src="/assets/images/posts/2023/02/husky_1.webp" height="300px" />
</p>

<p align="center">
    <img src="/assets/images/posts/2023/02/husky_2.webp" height="300px" />
</p>

<p align="center">
    <img src="/assets/images/posts/2023/02/husky_3.webp" height="300px" />
</p>
