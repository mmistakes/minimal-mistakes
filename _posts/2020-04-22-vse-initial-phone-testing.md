---
title: "COVID-19 GPS/IMU Alternative"
author: "Michelle Keane"
categories: localisation
tags: [vehicle state estimation, gps, imu, spatial, phone sensors, sensors]
image: vse/22_04_2020/cover.jpg
published: true
---

<figure>
  <img src="/assets/img/vse/22_04_2020/cover.JPG" alt="cover"/>
  <figcaption>android_sensors_driver in action</figcaption>
</figure>

As concluded in my previous post, the Piksi Multi Receiver Kit was our most favourable solution to the problem of Vehicle State Estimation (VSE) and the gathering of position, heading, and velocity data. However, due to the effects of the Australian lockdown, there has been a degree of flexibility required with our plans. In terms of this subsystem, acquisition of the Piksi Multi has been put on hold indefinitely until the university reopens, as has the purchasing of any other devices that are not currently in our possession. Due to this, I have been exploring the avenue of using what I have available in terms of a GPS/IMU module for my initial programming of the data processing and testing required. When the Arduino and GPS module mentioned in my last post failed me, I looked to one of the most common computer devices in the world: the smartphone.

## Android VSE
This project has relied upon the framework and phone application presented in the [ROS android_sensors_driver package](http://wiki.ros.org/android_sensors_driver "ROS: android_sensors_driver") (Thanks to Jack McRobbie for originally suggesting it!) and my current github repository for this project can be found [here](https://github.com/mfkeane/avse.git) and is still very much in its early development stages. ROS is still very new to me, but it has been rewarding to learn.

### Initial Steps
Following the android_sensors_driver [Connecting to ROS Master](http://wiki.ros.org/android_sensors_driver/Tutorials/Connecting%20to%20a%20ROS%20Master) tutorial, the first steps were familiarising myself with `roscore` and and `rostopic` system, as well as configuring the phone app to communicate on the same IP address and port as my Linux Virtual Machine was using for `roscore`.

<figure>
  <img src="/assets/img/vse/22_04_2020/roscore.JPG" alt="roscore"/>
  <figcaption>Starting roscore</figcaption>
</figure>

Once this was successfully set up, I was able to see which sensors I had access to from the app. Please note that “fix” refers to the GPS.

<figure>
  <img src="/assets/img/vse/22_04_2020/rostopiclist.JPG" alt="rostopiclist"/>
  <figcaption>rostopics available from the app</figcaption>
</figure>

Furthermore, I could use `rostopic echo <topic>` to see what sort of data was available to me. `rostopic info <topic>` was also useful in determining the format of the message used and the data types of each variable.

The three topics I was interested in are shown below:

<figure>
  <img src="/assets/img/vse/22_04_2020/gps.JPG" alt="gps"/>
  <figcaption>GPS Topic /android/fix</figcaption>
</figure>

<figure>
  <img src="/assets/img/vse/22_04_2020/imu.JPG" alt="imu"/>
  <figcaption>IMU Topic /android/imu</figcaption>
</figure>

<figure>
  <img src="/assets/img/vse/22_04_2020/magnetic_field.JPG" alt="magnetic_field"/>
  <figcaption>Magnetometer Topic /android/magnetometer</figcaption>
</figure>

### Basic Publisher/Subscriber Framework
Once satisfied I had familiarised myself with the idea of `rostopics` sufficiently, I began to research Publisher and Subscribers and how to implement a basic subscriber in `rospy` that I could use to subscribe to the topics of the sensors I required. My plan was to eventually create a program that would subscribe to the sensors I required, process the data to compute position, heading and velocity, and write it to a message that would be published for the SLAM implementation and Autonomous Control systems to access. For now, I wanted to start small and create a subscriber that would log the latitude readings from the GPS. The [final implementation](https://github.com/mfkeane/avse/blob/NavSatFix/avse/src/avse_playground/gpslistener.py) can be found in the `NavSatBranch` of the `avse` repository.

<figure>
  <img src="/assets/img/vse/22_04_2020/18042020_gpssubscribed.JPG" alt="18042020_gpssubscribed"/>
  <figcaption>Successfully Subscribed to GPS through /android/fix</figcaption>
</figure>

<figure>
  <img src="/assets/img/vse/22_04_2020/18042020_gpssubscribedrqt_graph.JPG" alt="18042020_gpssubscribedrqt_graph"/>
  <figcaption>RQT Graph</figcaption>
</figure>

### Expanding to Include IMU and Magnetometer
The next challenge was to expand the original code to also accommodate the IMU and Magnetometer topics. This section is very much still a work in progress, but I have tried two separate avenues so far:
* Using the `message_filters` library to [synchronise the data](https://github.com/mfkeane/avse/blob/computevse_sub_trials/avse/src/avse_playground/messagelistener.py)
* Using a [server](https://github.com/mfkeane/avse/blob/computevse_sub_trials/avse/src/avse_playground/serverlistener.py) to create three separate subscribers that operate independently
The server implementation is further along at this stage, and is currently my prefered option as it allows more redundancy in the readings. It also means that the system is not operating at its slowest update rate, and can estimate its current state via the IMU in between the GPS updates. 
The `message_filters` option will allow the implementation of sensor fusion, but is the slower option as the updates can only be as fast as the GPS updates.
However, despite this, both are equally viable options and I will be developing both further as well as researching other alternatives.

### Computing Position, Velocity, and Heading
The server implementation also has the beginnings of the calculations required to compute position, velocity, and heading data. However, this is currently incomplete and requires more research. Ideally, the system will be able to calculate this data from a variety of sources to increase the accuracy. As aforementioned, whether this is simply done by combining the data together or through relying on the fastest updating source and applying corrections from the other sensors, I have yet to finalise.

## Accuracy Testing 
Since falling back on using an android phone as our sensor suite for the meantime, the question has come up in regards to the accuracy of this device. The application of an autonomous vehicle requires reliable sensors that can either produce data to a high accuracy, or the data can be processed in a way to achieve this. Due to this, I have organised a series of tests. The first was to leave the device in a stationary location in clear view of the sky from a wide angle and record the GPS latitude and longitude readings over the period of an hour. Despite being stationary, the GPS still recorded fluctuations in its position, up to a maximum absolute value of 0.000030 from the mean in the latitude measurements, and 0.000036 in the longitude measurements. 

| Reading | Mean | Fluctuation | Fluctuation (meters) |
|---------|------|-------------|-----------------|
|Latitude | -38.23833949 | 0.00003017631 | 3.353764465 |
|Longitude| 145.0560592  | 0.00003561111 | 3.957783032 |

<figure>
  <img src="/assets/img/vse/22_04_2020/stationarygpsplot.JPG" alt="stationarygpsplot"/>
  <figcaption>Stationary GPS Data</figcaption>
</figure>

As our application depends heavily on relative position, I was unsure of how this would affect the accuracy of the data. If the measurements were fluctuating that much randomly, the data would be near unusable. I then charted the latitude and longitude data by order of occurrence, and determined that there was a pattern to the change in readings, most likely due to the movement of the satellites. This effect will need to be further researched.

<figure>
  <img src="/assets/img/vse/22_04_2020/latcount.JPG" alt="latcount"/>
  <figcaption>Stationary GPS Data, Latitude in order of occurrence</figcaption>
</figure>

<figure>
  <img src="/assets/img/vse/22_04_2020/longcount.JPG" alt="longcount"/>
  <figcaption>Stationary GPS Data, Longitude in order of occurrence</figcaption>
</figure>

My next avenue of GPS accuracy testing will be in terms of relative accuracy. This will likely involve taking the readings between two points with a known distance between them with a small time period. Other options also involve creating known paths, traversing along them, and recording the data to see how it would perform in conditions similar to low speed track conditions. As the COVID-19 situation does not seem to be lessening anytime soon, I believe it is important to ensure this avenue of research and testing is up to the task of handling the vehicle state estimation of an autonomous vehicle.





