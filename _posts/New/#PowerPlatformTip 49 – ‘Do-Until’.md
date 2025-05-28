markdown
---
title: "#PowerPlatformTip 49 – 'Do-Until'"
date: 2023-05-02
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerAutomate
  - PowerPlatform
  - PowerPlatformTip
  - loops
  - do-until
  - error-handling
  - flows
  - variables
excerpt: "You don't need a true/false variable in a Do Until loop; directly evaluate the action that might fail."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
In Power Automate, using a boolean variable to control a "Do Until" loop adds extra overhead and complexity when handling transient failures like locked or unavailable files.

## ✅ Solution
Directly evaluate the action that might fail in the loop's condition, eliminating the need for an additional true/false variable.

## 🔧 How It's Done
Here's how to do it:
1. Add a "Do Until" control to your flow.  
   🔸 In the loop's condition, insert the action you expect may fail (e.g., "Get file content") directly.  
   🔸 Use the action's success status or output expression as the loop condition.
2. Configure loop settings.  
   🔸 Set the maximum number of iterations or timeout under "Timeout" and "Count."  
   🔸 Optionally add a delay between retries to allow external resources to become available.
3. Handle errors after the loop.  
   🔸 After the loop completes, add your next action or error-handling steps.  
   🔸 Apply additional controls or notifications if all retries fail.

## 🎉 Result
Your flow retries the action until it succeeds without managing extra variables, simplifying logic and reliably handling locked or unavailable resources.

## 🌟 Key Advantages
🔸 Simplifies loop conditions by removing extra variables.  
🔸 Improves flow readability and maintenance.  
🔸 Handles transient failures automatically with built-in retry logic.

---

## 🎥 Video Tutorial
{% include video id="w7x_b0X3JEU" provider="youtube" %}

---

## 🛠️ FAQ
**1. Do I ever need a separate variable with this approach?**  
Only if you need to aggregate or reuse the result beyond the loop condition; for simple retry logic, the direct evaluation is sufficient.

**2. What if the action never succeeds?**  
Configure a maximum retry count or timeout on the "Do Until" to exit the loop, then handle the failure with error-handling or notifications.

**3. Can I use expressions directly in the loop condition?**  
Yes, you can use any valid expression based on action outputs (e.g., checking the status code) to control the loop.

---
