---
title: "Simply Autonomous Mario Game in Python"
excerpt: "This post shows the code used to build a simple autonomous game where mario has to find and rescue Pincess Peach."
last_modified_at: 2018-01-03T09:45:06-05:00
header:
  teaser: "assets/images/markup-syntax-highlighting-teaser.jpg"
tags: 
  - Code
  - Colab
  -Python
  
toc: true
---

## Colab Implimentation

[Try in Google Colab](https://colab.research.google.com/drive/17zBhqsNGks0me8LRGJH6_fqgv2aZCexh?usp=sharing)

## Python Code
```python

'''
Rescue The Princess Mase
------------------------
Dom McKean 2018
---------------
Princess 'P' can be anywhere in the mase. 
Mario 'M' must find her before its too late.
'''

## Imports
import numpy as np
import random
import time
from os import system, name

m = 1              ## This is mario
p = 2              ## This is Princess Peach
n = 9              ## Size of Maze
sleep = 1          ## Time between moves so that moves can be seen.
num_episodes = 10  ## Number of games Mario plays.

for i in range(num_episodes):
	a = np.zeros([n,n])                                     ## Make a grid of zero of size n*n.
	a[random.randint(0, n-1)][random.randint(0, n-1)] = m   ## Randomly select a start position for Mario.
	a[random.randint(0, n-1)][random.randint(0, n-1)] = p   ## Randomly select a start position for Princess peach.
	_ = system('clear')                                     ## Clear the consol output so each new move replaces the last. 

	print(a) ## Print the maze.
	time.sleep(sleep) ## Delay before maze updates.
	  
	M = np.where(a == m)   ## Find where mario is in the maze.
	P = np.where(a == p)   ## as above for Princess peach.

	Mx = M[1][0]           ## Get the x coordinate for Mario in the maze.
	My = M[0][0]           ## Get the y coordinate.

	Px = P[1][0]           ## Get x and y coordinates for princess Peach.
	Py = P[0][0]


	while True: 
		if Mx == Px and My == Py:  ## If Mario is in the same place as the Princess- Job done! Break out of while loop.
			_ = system('clear')      ## Clear consol.
      
			print("################\n##            ##\n##  Success!  ##\n##            ##\n################")
			break 
		    
		while Mx != Px:                     ## While Mario's x coordinate if not equal to the Princess' x coordinate-
			if Mx > Px:                       ## if Mario is to the right of the Princess- 
				a[My][Mx-1], a[My][Mx] = m, 0   ## move Mario one space left and set mario's privious x position to 0.
				_ = system('clear')             ## clear the consol.
				print('\r{0}'.format(a))        ## Print the new maze observation. 
				time.sleep(sleep)               ## small delay in rendering. 
				M = np.where(a == m)            ## reset 
				Mx = M[1][0]                    ## Update Mario's x position in variable Mx.
		        
			elif Mx < Px:                     ## As above for Mario's position being left of Princess. 
				a[My][Mx+1], a[My][Mx] = m, 0
				_ = system('clear') 
				print('\r{0}'.format(a))
				time.sleep(sleep)
				M = np.where(a == m)
				Mx = M[1][0] 

		while My != Py:                      ## as above for the y position. 
			if My > Py:
				a[My-1][Mx], a[My][Mx] = m, 0
				_ = system('clear') 
				print('\r{0}'.format(a))
				time.sleep(sleep)
				M = np.where(a == m)
				My = M[0][0] 

			elif My < Py:
				a[My+1][Mx], a[My][Mx]  = m, 0
				_ = system('clear') 
				print('\r{0}'.format(a))
				time.sleep(sleep)
				M = np.where(a == m)
				My = M[0][0]
 ```
	


