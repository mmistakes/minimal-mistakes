---
title: "Driverless SLAM"
author: "Jack McRobbie"
categories: mapping
tags: [documentation,slam]
image: mur19e.jpg
published: true
---
# Slam
The purpose of slam is to simulateneously generate the map of cones and localise the car within that track. The control team will take as an input to race along the track. 

This post outlines the basic interfaces, steps and definitions needed to achieve EKFSlam.

The first slam technique we will use will be ekfslam based - this was selected as the first technique as  it is simpler than most other algorithms and is well known and widely used. If we expect better performance can be achieved later, then we may expand the scope slightly to use more advanced techniques.
## Extended Kalman Filters 

Extended kalman filters are _extensions_ of the regular linearised kalman filtering method that attempts to account for non-linear models. Whereas regular kalman filtering uses a linear model, if that model is not truly linear then error will creep in and the model may diverge if the non-linear components are not negligible. 

Good examples and explainations of EKF and EKFSLam can be found in Probabalistic Robotics (Sebastian Thrun, Wolfram Burgard, Dieter Fox) and [Python Robotics](https://github.com/AtsushiSakai/PythonRobotics/blob/master/SLAM/EKFSLAM/ekf_slam.ipynb)

<figure>
  <img src="/assets/img/slam/ekf_slam_example.png" alt="EKF slam path from Python Robotics"/>
  <figcaption>EKF slam path from Python Robotics, Bladk = DR, Blue = True, Red = estimated, green = landmark est</figcaption>
</figure>

## Definition of interfaces
In order to define the problem more exactly we define a precise state vector that will be passed from the perception team to the control team. 
Based on discussions with the control team the pose of the car and the list of x-y coordinates will be sufficient. 

The inputs to the SLAM system will be from:

* Internal car state sensors: IMU, GPS
* The control inputs: Desired angular velocity, Desired acceleration 
* Lidar/Camera cone estimation algorithms 

The outputs will be in the form:

Pose + cone list: $$ X = 
\begin{bmatrix}
x \\
y \\
\theta \\
v \\
\dot{\theta} \\
x_1 \\ 
y_1 \\
... \\
x_n \\
y_n
\end{bmatrix}
$$ 
## Model Update step
In order for a extended kalman filter to predict the future state during the apriori step we use a dynamical model of state. 
After this step the posteriori step integrates sensor measurements. 

$$x_{t+1} = x_t + \delta_t v_t \cos(\theta_t)$$

$$y_{t+1} = y_t + \delta_t  v_t \sin(\theta_t)$$

$$ \theta_{t+1} = \theta_t + \delta_t  \dot{\theta} $$

The control effort input will be in the form $u = [ \dot{v}_u, \dot{\theta}_u ]$ therefore:  

$$ v_{t+1} = v_t +\delta_t \dot{v} $$ 

$$ \dot{\theta} = \dot{\theta}_u$$


Each of the landmark cones denoted by $r_i = \{x_i,y_i}$ should not be moved at all. Therefore:

$$ r_{i,t+1} = r_{i,t} \quad \forall \quad i $$

Defining this total state vector update step as: 

$$ X_{t+1} = f(X_t) $$

## Data association 
Data association will be achieved by repeatedly selecting the smallest mahalanobis distance between measurements and already known landmarks. 
If the distance exceeds a tuneable parameter that will be tailored based on testing and modelling, the measurement is said to be of a new landmark, and it is added to the state.

### Mahalanobis distance
Mahalanobis works by computing the distance in terms of standard deviations across the parameter space. This should allow for the data association step to use the covariance matrix to choose the _most likely_ nearest landmark to associate to the new measurement, rather than the nearest in spatial terms - these are not necessarily the same thing as the cone detection algorithm may end up being accurate in measuring cone range but poor in measuring anglular position. 
It is mathematically defined as the following. 

$$D = \sqrt{r_{ab}^TC^{-1}r_{ab}}$$

A good explaination is found [here](https://www.statisticshowto.com/mahalanobis-distance/) 

## Code under development

Current state of the code is open sourced and available [here](https://github.com/MURDriverless/slam/tree/feature/efkSlam)