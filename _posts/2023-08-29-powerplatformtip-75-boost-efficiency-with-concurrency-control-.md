---
title: "#PowerPlatformTip 75 – 'Boost Efficiency with Concurrency Control'"
date: 2023-08-29
categories:
  - Article
  - PowerPlatformTip
tags:
  - Power Automate
  - Concurrency Control
  - Parallelism
  - Flow Optimization
  - Child Flows
  - Efficiency
  - Power Platform
  - Automation
excerpt: "Enable Concurrency Control in Power Automate to process 'For Each' loops in parallel, dramatically improving flow speed, scalability, and automation efficiency."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
By default, "For each" loops in Power Automate execute actions sequentially, which can be time-consuming when dealing with a large number of items.

## ✅ Solution
Use the "Concurrency Control" feature in Power Automate to customize the degree of parallelism, allowing multiple actions to run simultaneously.

## 🔧 How It's Done
Here's how to do it:
1. Navigate to the "Settings" of the "For each" loop.  
2. Enable "Concurrency Control" and set the desired degree of parallelism (up to 50).  
3. Offload actions to a child flow when processing more than 50 items.  
   🔸 Set degree to 50 in the parent flow.  
   🔸 Use a child flow to handle individual user actions (e.g., adaptive card responses).

## 🎉 Result
You’ve optimized the execution of your flow, allowing for faster processing of items.

## 🌟 Key Advantages
🔸 Speed & Efficiency: Parallel processing reduces the overall execution time, especially for large data sets.  
🔸 Scalability: By offloading to child flows, you can handle a larger number of parallel tasks without hitting the limit.  
🔸 Individual Responses: Using child flows for each user ensures personalized processing and responses.

---

## 🎥 Video Tutorial
{% include video id="qyFAtpnek-w" provider="youtube" %}

---

## 🛠️ FAQ
**1. What is Concurrency Control in Power Automate?**  
Concurrency Control is a feature that lets you configure the number of parallel threads for a loop, so multiple iterations run simultaneously instead of sequentially.

**2. What is the maximum degree of parallelism I can set?**  
You can set up to 50 parallel threads in a For each loop. For processing more items in parallel, use a child flow and set the parent to 50.

**3. Will setting a high degree of parallelism cause throttling?**  
Excessive parallelism can lead to throttling by connectors or the Power Platform, potentially slowing down your flow. Test different settings to find the optimal balance.
