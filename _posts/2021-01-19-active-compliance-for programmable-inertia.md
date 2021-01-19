---
title: "Active Compliance: Programmable Inerta of a Rotating Disc"
comments: true
categories:
  - Videos
tags:
  - MATLAB
  - Simulink
  - Active Compliance
  - Impedance Control
  - Admittance Control
  - Labview
  - Softmotion
  - Control
---

<p style='text-align: justify;'>
In this video I have used impedance and admittance control to develop a rotating disc that has programable inertia using MATLAB and Simulink  
for design and modelling, and LabView Softmotion for physical implementation. <br> 
The physical setup was a brushless DC motor controlled using a National Instrument's CompactRio and a aluminum disc attached to the rotor.  

Without control the disc cannot be moved. Once the system is activated, the desired inertia can be set.  
Setting the inertia low means one can rotate the disc very easily,  
as if the disc has very little mass. Once speed has built up, you can let go of the disc and it will continue to spin but slowly reducing its speed as it losses apparent momentum. - But this is also controlled. 

  
Likewise, setting the inertia to high means you will need to apply considerable force constantly on the disc in order to get it moving, as if you were now trying to rotate a much larger haver disc such as a flywheel. 
Once moving, the programmed momentum again determines the time taken to return the disc to rest .   

Force control was achieved by observing the change in the motor current and using this data to determine the torque.  
Despite there being no force/torque sensor on the system, the disc was able to resolve external forces as low as 0.2 newtons. 
This was part of my Electrical & Electronics Engineering BSc final year project.  

Any questions or feedback on how you think I could improve, please leave a comment.  
</p>



<iframe width="560" height="315" src="https://www.youtube.com/embed/FR_2sNqHVMA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
