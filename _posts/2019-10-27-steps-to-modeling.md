---
published: false
title: Steps for Creating an Optimization Model
date: 2019-10-27
---
I am on a bit of a quest to bring Mathematical Optimization to the masses, or at least to Software Developers. I often come across problems where people are wanting to find the best plan for their problem but they lack to tools to express the problem. Typically the way this is "solved" is by some domain expert coming up with a laborious heuristic in Excel which involves outrageous amount of copying and pasting. I have seen this is take place in tiny companies all the way up to multi-billion dollar enterprises. What really breaks my heart when I see this is that I know there is a better way, but people are just are not aware of it. This is why I am pushing for more training on Mathematical Optimization at my company and why I am starting a blog series on Mathematical Modeling.

## The Goal
My hope with these blog posts is to start from a barebones introduction to the concepts which undergird mathematical modeling and slowly introduce newer and more advanced modeling techniques. I don't think I will ever finish because I am always across new and interesting problems. What I will emphasize is the beautiful interplay between Machine Learning and Mathematical Optimization. I have been blessed to work on several projects where we were able to marry these tools to great effect. If you have any problems that you would like me to look at and write a blog post on, I would be happy to. My hope is to give examples which help people with their own work.

## Ingredients for an Optimization Problem
There are three things you need to have before you are reading to apply Mathematical Optimization. You need 1) A Quantifiable Objective 2) Decisions you control and 3) Rules to follow. When you have these three things, you have a problem ripe for Mathematical Optimization. Let me unpack them a little to make sure you understand what I am talking about as we move forward.

### A Quantifiable Objective
For you to apply Mathematical Optimization to a problem you need a way to measure how succesful you are. Without this, a Solver will not have a way to check if the solutions that it is finding are actually an improvement or not. You are typically trying to maximize some value or minimize it. Common Objectives are Maximize Revenue, Minimize Waste, Maximize User Engagement, Minimize Energy Use, or Minimize Cost. What you are trying to achieve could really be anything, the key is that you have the ability to quantify it.

### Decisions You Control
When you create a Mathematical Model of your problem you are going to define the Decisions which need to be made. This is often something like how many people you assign to a task, how much water to put where, where to place a warehoes, which ad to show where. These are all examples of decisions you will be making in your business. The import thing is that you actually have control over them. When you solve the Optimization Model, you will get answers for what values you should use for your Decisions.

## The Food Cart Problem
One of the example problems I like to use is that of a Food Cart. I am from Portland, OR originally and we had food trucks everywhere. In this example we are running a food truck and we have to decide what items to pack for the day. We sell Hamburgers and Tacos. Hamburgers sell for $5.00 and Burritos sell for $7.50 (they are big Burritos). Each Hamburger requires us to carry 1.0 Lb. of ingredients on the truck and each Burrito requires 1.5 Lbs. (I told you they are big). We have a small Food Cart so we can only carry up to 450 Lbs. of ingredients. We also forgot to go to Costco the day before so we only have 200 Hamburger buns on hand and only 300 tortillas for Burritos. Since we run an awesome Food Cart, we always sell out of everything we bring. The question now becomes, how much Hamburgers do we pack for and how many Burritos so that we maximize our profit?

> **Note:** This example problem is meant to be simple. I am mostly concerned with introducing the vocabulary of Optimization Modeling. Future problems will be much more complex.