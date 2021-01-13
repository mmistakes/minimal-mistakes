---
title: "Learned kinematics Model for UR10 Robot"
categories:
  - Post Formats
tags:
  - link
  - Post Formats
link: https://github.com/DomMcKean/LSTM_model/blob/main/D-H_matrix_for_joint_to_Cartisian_conversion.ipynb
---

This notebook converts the UR10 joint angles into Cartesian position and orientation using the Denavit-Hartenberg (D-H) parameters.
It then uses this new data as a feature set for learning a model of the inverse 
kinematics and recovering the robot's joint angles for any Cartesian position. 
