---
layout: single
title: Maths for Machine Learning

categories:
    - Maths
    - Linear ALgebra
    - Introduction

header: 
    teaser: /assets/images/posts/linear_algebra_header.png
    overlay_image: /assets/images/posts/linear_algebra_header.png
    overlay_filter: 0.5
---

{% include toc title="Contents" %}

# Maths for Machine Learning 

Machine Learning uses a variety of branches from mathematics. Infact machine learning is nothing but **Applied Mathematics**!

In this post we will have a look at some of the main branches of mathematics that we use in Machine Learning very briefly. For more details, you can go into the Math category in the blog.

## Linear Algebra
- Linear Algebra is the branch of mathematics that generally deals with data.
- It is also known as **The Mathematics of Data**.
- Linear Algebra deals with abstract objects in the form of vectors and matrices.
- Data used in Machine Learning can be modelled using abstract Linear Algebra concepts such as matrices and vectors.
- Linear Algebra is extensively used in Machine Learning from handling data, preprocessing data to dimensionality reduction and algorithm design.


## Probability and Statistics
- **Probability** is the branch of mathematics that deals with chances.
- **Statistics** is the branch of mathematics that can be used to describe the data elegantly. We can also use statistic measures to learn features and derive equations to predict new unknown data based on previous learning.
- In machine learning, we never get results in absolutes, instead we **get a probability of the result being some class**, say A. <br/>  For ex - In image classification problems, we generally look at a top-5 accuracy measurement. This means that we consider the top-5 classes (read probabilities) that the algorithm has predicted and use that to calculate the top-5 accuracy score.
- It is often **useful to represent data using a central measure** such as mean, mode or median. This helps in better understanding of data, better readability and if used correctly can be used to find out correlation b/w target and independent variables.
- However, it is very important to keep in mind that ***correlation does not imply causalty***.

## Mathematical Optimization
- Mathematical Optimization is the selection of a best element, with regard to some critetrion, from some set of available alternatives.
- In Machine Learning terms, we select the **best weight**, with respect to a **loss function** using recorded data.
- Some famous optimization methods include *Gradient Descent* and *Adam Optimization*.

## Calculus
- Calculus is the mathematical study of continous change.
- We use calculus extensively for optimization techniques, especially differential calculus.


That's it for today!
Cheers and have a great day ahead.
