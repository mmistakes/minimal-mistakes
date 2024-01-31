---
layout: single
title: "Python turtle"
categories: note
tags: [python, turtle]
author_profile: false
search: true
---

### Introduction

turtle is pre-installed Python library that enables users to create pictures with a virtual canvas.
For the programmer who needs to produce some graphical output it can be a way to do that.

### Code

#### import

```python
from turtle import *
```

#### Basic drawing

These are the basic drawing syntax

```python
up()  # sets the pen state to be up
down()  # sets the pen state to be down
left(degrees)  # facing left by the amount indicated by degrees
right(degrees)  # facing right by the amount indicated by degrees
forward(distance)  #  Moves the turtle forward
circle(radius):  # Draws a circle of the indicated radius.
color(color)  # Change the color of the pen
.
.
.
```

#### Using for loop

You can also use it with loop

e.g.

```python
for n in range(20):
    if n % 2 == 0:
        color('red')

    else:
        color('blue')
    right(n * 18 - (n - 1) * 18)
    circle(50)
```

[More information](https://docs.python.org/3/library/turtle.html)
