---
title: "#PowerPlatformTip 21 – 'Use Triggeroutput'"
date: 2023-01-19
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - triggerOutputs
  - trigger condition
  - error handling
  - Flow
  - Headers
  - PowerPlatformTip
excerpt: "Use triggerOutputs() to notify flow starters of success, provide information, and handle errors via headers."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
By default, flows don’t inform the user of success, details, or errors. How can you notify the flow initiator and handle potential errors within your flow?

## ✅ Solution
Use the triggerOutputs() expression in trigger conditions to extract header information, send notifications to the flow starter, and manage errors.

## 🔧 How It's Done
Here's how to do it:
1. Add a trigger condition to capture the user’s email.  
   🔸 Use the expression:  
     text
     triggerOutputs()?['headers']?['x-ms-user-email']
       
2. Include additional header information as needed.  
   🔸 Use the expression:  
     text
     triggerOutputs()?['headers']
       
3. Configure subsequent actions (e.g., send an email) using these outputs.

![Trigger Header](https://lehmann.ws/wp-content/uploads/2023/01/triggerheader-1.png)

## 🎉 Result
The flow now notifies the flow initiator upon success with relevant header information and handles errors gracefully using trigger conditions.

## 🌟 Key Advantages
🔸 Provides real-time notifications to the flow initiator.  
🔸 Extracts header data easily with built-in expressions.  
🔸 Simplifies error handling through trigger conditions.

---

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I retrieve the user’s email in a trigger condition?**  
Use the expression `triggerOutputs()?['headers']?['x-ms-user-email']` in your trigger condition.

**2. What if I need more header information?**  
Use `triggerOutputs()?['headers']` to inspect and extract additional header values.

**3. Can I use triggerOutputs() for error handling?**  
Yes, you can set trigger conditions based on output values (e.g., status codes) to route your flow logic when errors occur.