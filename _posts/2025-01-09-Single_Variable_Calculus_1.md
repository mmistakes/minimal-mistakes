---
layout: single
title: "single variable calculus_1"
categories: [MIT_Challenge]
tag: 18.01SC, Single_Variable_Calculus, Differentiation
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

$f'(x_0) = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}.$ <br>
it name is difference quotient.

This works because the derivative is the slope of the tangent line, and the tangent line is the limit of the secant line as \(\Delta x\) approaches zero.

### 1.4 My solution in this section
[My solution](https://drive.google.com/drive/folders/1Cu6ZK2tf6CqR8lATkw5DeT05PbkEHO3Y?hl=ko)<br>
[Actual solution](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/1.-differentiation/part-a-definition-and-basic-rules/session-1-introduction-to-derivatives/)


### 2.1 Example 1: $y = \frac{1}{x}$
It example is just have to substitute the formula.<br>

![pic1](/images/2026-01-09/pic1.jpeg) <br>
if $\displaystyle \lim_{x \to \infty} $, then the slope is appoximate 0. <br>
Therfore, $-\frac{x^2}{1}$ is true 


### 2.2 Area of a triangle
![pic2](/images/2026-01-09/pic2.jpeg)<br>

### 2.3 Binomial Theroem
![pic3](/images/2026-01-09/pic3.jpeg)<br>
This formula is for $f(x) = x^n$.


e.g. <br>
If we differentiate $f(x) = x^3$
![pic4](/images/2026-01-09/pic4.jpeg)<br>

### 2.4 My solution in this section


### END 
This blog is a compilation of what I studied and learned in the MIT OCW course(https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/).<br> 
<br>
[Prof. David Jerison]. [Single Variable Calculus]. [Fall 2010]. <br>
Massachusetts Institute of Technology: MIT OpenCouseWare, https://ocw.mit.edu/. <br>
License: Creative Commons BY-NC-SA.

해당 게시물에 저작권 문제나 궁금하신 내용이 있다면 알려주싶시요.(ks.hwang.0313@gmail.com)