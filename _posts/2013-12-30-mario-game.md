---
title: "Simply Autonomous Mario Game in Python"
excerpt: "This post shows the code used to build a simple autonomous game where mario has to find and rescue Pincess Peach."
last_modified_at: 2018-01-03T09:45:06-05:00
header:
  teaser: "assets/images/markup-syntax-highlighting-teaser.jpg"
tags: 
  - Code
  - Colab
  - Python
  
toc: true
---

This post shows the code used to build a simple autonomous game where mario has to find and rescue Pincess Peach.

## Colab Implimentation

[Try in Google Colab](https://colab.research.google.com/drive/17zBhqsNGks0me8LRGJH6_fqgv2aZCexh?usp=sharing)

## Python Code
```python

'''
Rescue The Princess Mase
------------------------
Dom McKean 2015
---------------
Princess 'P' can be anywhere in the maze. 
Mario 'M' must find her before its too late.

This is a simple excerise to show how to automate the
updating of a variable sized array based on conditions. 

'''
## Imports
!pip install Jupyter-Beeper
import numpy as np                         ## for matrix manipulation.
import random                              ## for random number generation.
import time                                ## used for delays between frames.
from os import system, name                ## used to clear consol.
from IPython.display import clear_output   ## used to clear output in colab
from google.colab import output            ## needed for move beep. 
import jupyter_beeper

b = jupyter_beeper.Beeper()

# Default config is frequency=440 Hz, secs=0.7 seconds, and
# blocking=False (b.beep() will return when the sound begins)
#b.beep()

# We have to put a sleep statement, since the previous call 
# for b.beep() is non blocking, and then it will overlap with
# the next call to b.beep()
#time.sleep(2)

# This will not return until the beep is completed
#b.beep(frequency=530, secs=0.7, blocking=True)



m = 1              ## This is mario
p = 2              ## This is Princess Peach
n = 3              ## Size of Maze
sleep = 2          ## Time between moves so that moves can be seen.
num_episodes = 10  ## Number of games Mario plays.

for i in range(num_episodes):
    a = np.zeros([n,n])                                     ## Make a grid of zero of size n*n.
    a[random.randint(0, n-1)][random.randint(0, n-1)] = m   ## Randomly select a start position for Mario.
    a[random.randint(0, n-1)][random.randint(0, n-1)] = p   ## Randomly select a start position for Princess peach.
    _ = system('clear')                                     ## Clear the consol output so each new move replaces the last. 
    clear_output()         ## Clear the consol.
    print(a)               ## Print the maze.
    time.sleep(sleep)      ## Delay before maze updates.
        
    M = np.where(a == m)   ## Find where mario is in the maze.
    P = np.where(a == p)   ## as above for Princess peach.

    Mx = M[1][0]           ## Get the x coordinate for Mario in the maze.
    My = M[0][0]           ## Get the y coordinate.

    Px = P[1][0]           ## Get x and y coordinates for princess Peach.
    Py = P[0][0]


    while True: 

        if Mx == Px and My == Py:    ## If Mario is in the same place as the Princess- Job done! Break out of while loop.
            _ = system('clear')      ## Clear consol.
        
            print("################\n##            ##\n##  Success!  ##\n##            ##\n################")
            b.beep(frequency=630, secs=0.1) 
            time.sleep(0.2)
            b.beep(frequency=740, secs=0.1)
            time.sleep(0.2)
            b.beep(frequency=850, secs=0.1)
            time.sleep(0.2)
            b.beep(frequency=1060, secs=0.5)

            time.sleep(3)

            break 
            
        while Mx != Px: 
                        ## While Mario's x coordinate if not equal to the Princess' x coordinate-
            if Mx > Px:                         ## if Mario is to the right of the Princess- 
                a[My][Mx-1], a[My][Mx] = m, 0   ## move Mario one space left and set mario's privious x position to 0.
                clear_output()
                print(a)                        ## Print the new maze observation. 
                b.beep(frequency=630, secs=0.1) ## Mke a beep on each move.
                time.sleep(sleep)               ## small delay in rendering. 
                M = np.where(a == m)            ## reset 
                Mx = M[1][0]                    ## Update Mario's x position in variable Mx.
                
            elif Mx < Px:                       ## As above for Mario's position being left of Princess. 
                a[My][Mx+1], a[My][Mx] = m, 0
                clear_output()
                print(a)
                b.beep(frequency=630, secs=0.1)
                time.sleep(sleep)
                M = np.where(a == m)
                Mx = M[1][0] 


        while My != Py:                         ## as above for the y position. 

            if My > Py:
                a[My-1][Mx], a[My][Mx] = m, 0
                clear_output()
                print(a)
                b.beep(frequency=630, secs=0.1)
                time.sleep(sleep)
                M = np.where(a == m)
                My = M[0][0] 

            elif My < Py:
                a[My+1][Mx], a[My][Mx]  = m, 0
                clear_output()
                print(a)
                b.beep(frequency=630, secs=0.1)
                time.sleep(sleep)
                M = np.where(a == m)
                My = M[0][0]
            
 ```
	


