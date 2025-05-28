---
title: "#PowerPlatformTip 21 – 'Use Triggeroutput'"
date: 2023-01-19
categories:
  - Article
  - PowerPlatformTip
tags:
  - power automate
  - triggeroutputs
  - error handling
  - notifications
  - automation
excerpt: "Use triggerOutputs() in Power Automate to notify flow starters, extract header info, and handle errors for robust automation."
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

---

## 🛠️ FAQ
**1. Does triggerOutputs() work with all trigger types?**  
Most trigger types support triggerOutputs(), but the available data varies. Manual triggers and HTTP requests typically provide the most header information.

**2. What other header information can I extract besides user email?**  
You can access user agent, IP address, authorization tokens, and custom headers depending on the trigger type and source.

**3. How do I handle cases where the user email is not available?**  
Use conditional logic or the Coalesce function to provide fallback values when header information is missing or null.

---
