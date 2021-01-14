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


m = 1
p = 2

n = 9
sleep = 1
num_episodes = 10

for i in range(num_episodes):
	a = np.zeros([n,n])
	a[random.randint(0, n-1)][random.randint(0, n-1)] = m
	a[random.randint(0, n-1)][random.randint(0, n-1)] = p
	_ = system('clear')  

	print(a)
	time.sleep(sleep)
	  
	M = np.where(a == m)
	P = np.where(a == p)

	Mx = M[1][0] ## m location in x
	My = M[0][0] ## m location in y

	Px = P[1][0]
	Py = P[0][0]


	while True: 
		if Mx == Px and My == Py:
			_ = system('clear')
			print("################\n##            ##\n##  Success!  ##\n##            ##\n################")
			break 
		    
		while Mx != Px:
			if Mx > Px:
				a[My][Mx-1], a[My][Mx] = m, 0
				_ = system('clear')
				print('\r{0}'.format(a))
				time.sleep(sleep)
				M = np.where(a == m)
				P = np.where(a == p)
				Mx = M[1][0] 
		        
			elif Mx < Px:
				a[My][Mx+1], a[My][Mx] = m, 0
				_ = system('clear') 
				print('\r{0}'.format(a))
				time.sleep(sleep)
				M = np.where(a == m)
				P = np.where(a == p)
				Mx = M[1][0] 

		while My != Py:
			if My > Py:
				a[My-1][Mx], a[My][Mx] = m, 0
				_ = system('clear') 
				print('\r{0}'.format(a))
				time.sleep(sleep)
				M = np.where(a == m)
				P = np.where(a == p)
				My = M[0][0] 

			elif My < Py:
				a[My+1][Mx], a[My][Mx]  = m, 0
				_ = system('clear') 
				print('\r{0}'.format(a))
				time.sleep(sleep)
				M = np.where(a == m)
				P = np.where(a == p)
				My = M[0][0]
 ```
	


