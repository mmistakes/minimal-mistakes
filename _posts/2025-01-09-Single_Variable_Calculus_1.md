---
layout: single
title: "single variable calculus_1"
categories: MIT_Challenge
tag: 18.01SC
toc: true
author_profile: false
sidebar:
  nav: "docs"
use_math: false
---


### 1.1 Geometric interpretation of the derivative

The slope of the tangent line at the point $(x, y)$ represents the derivative of $f(x)$ geometrically.

### 1.2 Tangent line
A tangent is the line obtained by taking the limit of a secant line
as the second point Q (with Q > P) approaches the point P, making their difference tend to zero.

![graph_1](/images/2026-01-09/graph_1.jpeg)

equation of tangent line at $(x, y)$ is $y - y_0 = m(x - x_0)$ by the equation of line passing through.

The equation of the tangent line at the point $(x_0, y_0)$ is $y - y_0 = m(x - x_0)$,
because it is the straight line with slope $m$ passing through that point.

### 1.3 Formula for the derivative

![graph_2](/images/2026-01-09/graph_2.jpeg)

Using the graph above, we can derive the formula for the derivative.
The points $P$ and $Q$ are $(x_0, f(x_0))$ and $(x_0 + \Delta x, f(x_0 + \Delta x))$, respectively,
so by the definition of the derivative we obtain

$f'(x_0) = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}.$

This works because the derivative is the slope of the tangent line, and the tangent line is the limit of the secant line as \(\Delta x\) approaches zero.



### Try that $f(x) = \frac{1}{x}$ and $f(x) = x^n$ where $n = 1, 2, 3...$


### END 
This blog is a compilation of what I studied and learned in the MIT OCW course.<br>
[Prof. David Jerison]. [Single Variable Calculus]. [Fall 2010]. <br>
Massachusetts Institute of Technology: MIT OpenCouseWare, https://ocw.mit.edu/. <br>
License: Creative Commons BY-NC-SA.