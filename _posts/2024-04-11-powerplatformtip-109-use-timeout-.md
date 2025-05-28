---
title: "#PowerPlatformTip 109 – 'Use TimeOut'"
date: 2024-04-11
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - Flow
  - Timeout
  - Approval
  - ErrorHandling
  - LongRunningTasks
excerpt: "Extend action timeouts and add error handling to ensure long-running Power Automate tasks complete without disruption."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Approvals or other long-running tasks may take more time than your flow’s default timeout period, risking interruptions and unintended cancellations.

## ✅ Solution
Adjust action timeout settings and implement error handling so that long-running tasks have sufficient time to complete and flows handle timeouts gracefully.

## 🔧 How It's Done
Here's how to do it:
1. Adjust the Timeout Setting:  
   🔸 In the settings of your approval action (or any long-running action), set the "Timeout" duration to a value that accommodates expected delays  
   🔸 P2W stands for two weeks  
   🔸 P1D represents one day  
   🔸 PT2H denotes two hours  
   🔸 PT30M for thirty minutes  
   🔸 PT45S represents forty-five seconds
2. Implement Error Handling:  
   🔸 Use the "Configure run after" feature to manage actions that should occur if the previous action times out. This might involve starting an alternative flow, sending a notification, or initiating a new approval process.
3. Test and Refine:  
   🔸 Testing your flow under various conditions will help fine-tune your timeout settings and error-handling logic, ensuring they meet real-world needs.

## 🎉 Result
Your flows remain operational and adaptable, effectively managing long-running tasks without falling victim to unnecessary timeouts or disruptions.

## 🌟 Key Advantages
🔸 Reliability: Ensures that your flows can handle tasks that take longer than expected without crashing or stopping.  
🔸 Flexibility: Provides options for how to proceed if a long-running task does indeed timeout.  
🔸 Efficiency: Keeps your automation process moving forward by automatically addressing potential hiccups.

---

## 🎥 Video Tutorial
{% include video id="VKWl_LJfLTE" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I specify custom timeout values in Power Automate?**  
Use ISO 8601 duration format (e.g., P2W, P1D, PT2H, PT30M, PT45S) in the Timeout field of the action's settings.

**2. Will my flow still fail if an action times out?**  
If you don’t configure error handling, a timeout will fail the run. Use "Configure run after" to catch timeouts and continue handling.

**3. Can I use timeouts with all actions in Power Automate?**  
Most built-in actions allow timeout configuration. For unsupported actions, consider wrapping them in scopes or alternative logic.

---