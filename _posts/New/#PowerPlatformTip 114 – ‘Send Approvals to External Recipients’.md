markdown
---
title: "#PowerPlatformTip 114 – 'Send Approvals to External Recipients'"
date: 2024-05-17
categories:
  - Article
  - PowerPlatformTip
tags:
  - marcel-lehmann
  - microsoft
  - power-automate
  - power-platform
  - powerautomate
  - powerplatform
  - powerplatformtip
excerpt: "Send approval requests to external recipients using simple email options or Adaptive Cards in Power Automate."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
The standard approval process in Power Automate doesn’t support external recipients out-of-the-box.

## ✅ Solution
Use either the "Send email with options" action for a quick approach or leverage Approvals + Adaptive Cards + Outlook for a richer experience.

## 🔧 How It's Done
Here's how to do it:

_Simple Method:_
1. Use the "Send email with options" action in your flow  
2. Define the options (e.g., "Approve", "Reject")  
3. Send the email to the external recipients  
4. Process the response in your flow  

_Advanced Method:_
1. Start an approval process in your flow  
2. Create an Adaptive Card with approval options  
3. Send the Adaptive Card via the Outlook action to external recipients  
4. Process the response from the Adaptive Card in your flow  
   🔸 You can find the step-by-step process here: https://lehmann.ws/2021/03/19/power-automate-tutorial-approvals-adaptive-cards-outlook-awesome-from-yash-agarwal/

## 🎉 Result
External stakeholders can now participate in your approval processes, either by email response or interactively via an Adaptive Card in Outlook.

## 🌟 Key Advantages
🔸 Enables inclusion of external stakeholders in approval processes  
🔸 Provides flexibility in designing the approval experience  
🔸 Enhances collaboration across organizational boundaries  

---

## 🎥 Video Tutorial
{% include video id="rQSWzLiPRec" provider="youtube" %}

---

## 🛠️ FAQ
**1. Can I send approval requests to recipients outside my Office 365 tenant?**  
Yes. Using the "Send email with options" action or Adaptive Cards via Outlook, you can send emails to any valid external address.

**2. Are responses from the "Send email with options" action secure and trackable?**  
Responses are tracked within your flow run history. However, they provide only basic text options and aren’t managed in the Approvals center.

**3. When should I use the Adaptive Card method?**  
Use the Advanced Method with Adaptive Cards when you need a richer, interactive experience in Outlook and want to track approvals within Microsoft 365 services.

---


Filename: 2024-05-17-powerplatformtip-114-send-approvals-to-external-recipients.md