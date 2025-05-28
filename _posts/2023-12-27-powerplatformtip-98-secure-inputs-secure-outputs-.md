---
title: "#PowerPlatformTip 98 – 'Secure Inputs / Secure Outputs'"
date: 2023-12-27
categories:
  - Article
  - PowerPlatformTip
tags:
  - Power Automate
  - Secure Inputs
  - Secure Outputs
  - Data Security
  - Compliance
  - Workflow Security
  - Flow Logs
excerpt: "Protect sensitive data in Power Automate by enabling Secure Inputs and Secure Outputs—mask confidential information in flow logs, enhance compliance, and secure workflows."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
In the digital world, data security is paramount. When creating Flows in Power Automate, sensitive data such as personal information and confidential details are often processed and passed between actions. Without proper safeguards, this data could be exposed to unauthorized access or leaks.

## ✅ Solution
Utilize "Secure Inputs" and "Secure Outputs" in Power Automate to hide the inputs and outputs of specific actions in your Flow logs, ensuring sensitive data doesn’t get exposed in the run history.

## 🔧 How It's Done
Here's how to do it:
1. Go to the action you want to secure in your Flow.  
   🔸 Open your Flow in the Power Automate portal.  
   🔸 Click the target action to expand its options.
2. In the new designer select 'Settings'.  
   🔸 Click the ellipsis (…) on the action.  
   🔸 Choose 'Settings' from the dropdown menu.
3. Toggle on 'Secure Inputs' and/or 'Secure Outputs' to mask the data in logs.  
   🔸 Turn on the switch for Secure Inputs.  
   🔸 Turn on the switch for Secure Outputs as needed.
4. Save your changes to ensure these settings are applied.  
   🔸 Click 'Save' in the Flow designer.  
   🔸 Run a test to verify the settings are active.

## 🎉 Result
By enabling Secure Inputs and Secure Outputs, all sensitive data processed by the secured actions will be hidden in the Flow run history. Anyone reviewing the logs will see masked placeholders instead of actual values, significantly reducing the risk of data leakage or unauthorized access.

## 🌟 Key Advantages
🔸 Enhanced Security: Ensures sensitive data is not visible in Flow logs, protecting against unauthorized access.  
🔸 Compliance Friendly: Helps maintain compliance with data protection regulations by safeguarding personal and confidential information.  
🔸 Peace of Mind: Adds an extra layer of security to your automated processes, allowing you to focus on building workflows without compromising data integrity.

---

## 🎥 Video Tutorial
{% include video id="xEmk4Ka5SlE" provider="youtube" %}

---

## 🛠️ FAQ
**1. Why should I use Secure Inputs and Secure Outputs?**  
They hide sensitive data in the Flow run history and logs, preventing unauthorized access to confidential information.

**2. Will enabling Secure Inputs/Outputs affect my Flow's performance?**  
It has minimal impact on execution speed; it only changes how data is logged, not how it’s processed.

**3. Can I toggle Secure Inputs and Secure Outputs individually?**  
Yes, you can enable Secure Inputs, Secure Outputs, or both for each action based on your security needs.
