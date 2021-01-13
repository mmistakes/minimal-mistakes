---
title: "Autonomous-DLO-Manipulation"
comments: true
categories:
  - Post Formats
tags:
  - Post Formats
---

<p style='text-align: justify;'>
In this video I have combined impedance with admittance control to produce a hybrid controller. <br>
The arm is initiated with a small tap and it starts to spin. On detection of an environmental object the arm will stop, 
reverse a small distance and then test to see if the environmental object has gone. This is impedance control -
for a velocity or position input we get a force output. If the external object has gone, the arm will continue either to its setpoint or indefinitely, 
depending on the configuration. The arm can also be driven backwards, this is admittance control - for a force input we get a position/velocity output. <br>

The motor senses the torque on the arm by the slight increase in current and drives the arm in that direction until the torque drops back to zero.
This was part of my Electrical & Electronics Engineering BSc final year project. 
Any questions or feedback on how you think I could improve, please leave a comment. 
</p>



<iframe width="560" height="315" src="https://www.youtube.com/embed/4LNv0Oby1rw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
