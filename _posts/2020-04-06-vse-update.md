---
title: "Vehicle State Estimation Beginnings"
author: "Michelle Keane"
categories: localisation
tags: [vehicle state estimation, gps, imu, spatial]
image: vse/arduinogps.jpg
published: true
---

The Vehicle State Estimation (VSE) subsystem’s role is to gather data on the vehicle’s current state through odometry and pose readings, mainly based upon its current position, heading, and velocity. This information is fed to the mapping/localisation and control systems, allowing decisions to be made based on the vehicle’s current state in the world. 

<figure>
  <img src="/assets/img/vse/systemmap.JPG" alt="systemmap"/>
  <figcaption>Vehicle State Estimation Subsystem</figcaption>
</figure>

## Solving the Problem
There are many devices we can utilise to solve the problem of VSE. A few suggestions are GPS/GNSS, IMU, or Speed Sensors such as Wheel Speed Sensors or Ground Speed Sensors.

### GPS/GNSS vs IMU
The main contenders are GPS and IMU sensors. GPS has the ability to calculate global position with high accuracy by using satellite signals, but due to this method, it is slower than an IMU. It also does not possess the ability to calculate heading reliably, without using dual antennas placed at either end of the vehicle. However, typically it can produce relative position and velocity readings accurately. GNSS is also preferred over GPS due to its more extensive coverage by using multiple satellite systems.

IMU, on the other hand, relies upon a gyroscope, an accelerometer, and often a magnetometer. The magnetometer alone allows it to be proficient at producing heading readings to 1 - 2.5 degrees. With the accelerometer, its acceleration data can be integrated to produce velocity and relative position readings, however, due to this method, it is susceptible to drift errors.

### Wheel/Ground Speed Sensors
Sensors based entirely on velocity data, like the Wheel Speed and the Ground Speed Sensors are a good way to add redundancy, but do not provide access to all the data we need and so should not be a first choice to solving the problem of Vehicle State Estimation.
### GPS/GNSS + IMU Combination
Ideally, GPS and IMU should be used together. Despite the added complexity compared to using the GPS or IMU on its own due to the integration of both hardware and software, as the GPS counters the IMU drift, and there is higher accuracy and redundancy for the position, heading and velocity data.

### GPS/GNSS + IMU Hybrid Device
Reducing the complexity of the integration of the devices is ideal for the infancy of the project. So to do this, we could use a hybrid GPS/IMU device that has both components already integrated into one device. These are typically more expensive than putting together two separate devices.

### Base Station Potential
The global position data could also be improved upon by adding a base station to the design. This creates additional complexity and cost, and due to our application relying more heavily on relative position rather than global position, is an unlikely design choice.

## Potential Devices

This led to 3 options:
- A hybrid option with base station potential
- A hybrid on its own
- And a combination of GPS and IMU components

The first option was the use of the [Piksi Multi Evaluation Kit](https://www.swiftnav.com/store/piksi-multi-evaluation-kit/piksi-multi-evaluation-kit-2.4ghz), which consists of two Piksi Multi Modules and their boards, plus two survey antenna amongst other things.This would allow us to explore using base stations for increased position accuracy, but is the most expensive option.

<figure>
  <img src="/assets/img/vse/piksieval.jpg" alt="piksieval"/>
  <figcaption>Piksi Multi Evaluation Kit</figcaption>
</figure>

The second was to use the [Piksi Multi Receiver Kit](https://www.swiftnav.com/store/receiver-packs/piksi-multi-gnss-receiver-pack), which consists of the basic components you need to use the Piksi Multi. This is the cost and time effective option without compromising performance, as it still utilises a hybrid device, where the GNSS and IMU are combined into one device.

<figure>
  <img src="/assets/img/vse/piksireciever.jpg" alt="piksireciever"/>
  <figcaption>Piksi Multi Reciever Kit</figcaption>
</figure>

The third was to combine a GPS and an IMU together. In early March we had a meeting with a professor, Dr Amir, that our supervisors had suggested we talk to as he was able to achieve cm global position accuracy through GPS. We discovered he was using a [U-Blox GNSS C099-F9P-1](https://www.u-blox.com/en/product/c099-f9p-application-board) (which he also suggested we use) as well as the AUSCORS stations to correct his global positioning. His applications are in infrastructure and have been entirely static, but he mentioned that as we should only need relative positioning for our applications, we should be able to use this U-Blox device to achieve relative position with cm accuracy. The only issue is that this device does not have an inbuilt IMU so one would have to be added to the system, for which I have chosen an [Adafruit BNO055 IMU model](https://www.adafruit.com/product/2472).

<figure>
  <img src="/assets/img/vse/ublox.png" alt="ublox"/>
  <figcaption>U-Blox GNSS C099-F9P-1</figcaption>
</figure>

<figure>
  <img src="/assets/img/vse/adafruit.jpg" alt="adafruit"/>
  <figcaption>Adafruit 9-DOF Absolute Orientation IMU Fusion Breakout - BNO055</figcaption>
</figure>

|   Criteria   | U-Blox GNSS C099-F9P-1 + Adafruit BNO055 | Piksi Multi Reciever Kit |          Piksi Multi Evaluation Kit         |
|--------------|------------------------------------------|--------------------------|---------------------------------------------|
|  Description |         GNSS only with added IMU         |    GNSS and IMU hybrid   |     GNSS and IMU hybrid with Base Station   |
|     Cost     |                $465 - $487               |    $1139 ($695 US)       |              $3761  ($2,295 USD)            |
| Base Station | Software has capabilties with 2 devices  | Software compatible w/ 2 |                     Yes                     |
| Integration  | GPS and IMU need to be synched           | GPS/IMU already combined | GPS/IMU done but need to setup Base Station |
| Familiarity  | Suggested by unimelb Proffessor, Dr Amir | Supervisor has experience|          No base station experience         |
| Position     |   Global: 1-3m, Relative: cm accuracy    | Global: 0.75m, Relative: cm accuracy | Global: cm accuracy, Relative: cm accuracy |
| Heading      | Magnetometer: 2.5 degrees                | Magnetometer: 2.5 degrees | Magnetometer: 2.5 degrees, capable of GPS heading with two antennas |
| Velocity     |               0.05 m/s                   |        0.03 m/s          |                  0.03 m/s                   |
| Footprint Dimenstions | 53.3 x 101.5 mm                 | 110 x 110 mm             | 110 x 110 mm + (1 or 2) 152 mm diameter antenna (and base station) |

Main differences are the cost and difficulty of integrating the parts. The Piksi Multi and Adafruit BNO055 have very similar specs in regards to IMU which are both made by BOSCH. Monash Motorsports has reported issues with the Piksi Multi's IMU due to extreme drift errors, which has been taken into consideration. While Piksi Multi has better GPS position accuracy, its relative accuracy, which is more important to us, is similar to the U-blox alternative. Although, the Piksi Multi again beats the U-blox in regards to velocity accuracy.

At this stage, the Piksi Multi Reciever Kit seems the most viable option for our application, despite its cost and issues with drift. It provides the most simplicity with respect to the integration of hardware and software, and can be used in future MUR Driverless vehicles, with options to upgrade the design with Swift Navigation Survey Antennas and base station capibilties.

## Unforeseen Difficulties

However due to COVID-19, our physical resources are somewhat limited. As such, the component selection has been put on hold, with the project focusing on its research and simulation aspects. Current available avenues are performing simulation testing through various programs, including the [ffsim by AMZ](https://github.com/MURDriverless/fssim), and testing a u-blox NEO-M8N GPS module with an Arduino Uno which are in my possession.

