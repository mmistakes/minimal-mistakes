---
title: "#PowerPlatformTip 103 – 'Quick Setup Guide'"
date: 2024-06-20
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerPlatform
  - PowerApps
  - PowerAutomate
  - PowerBI
  - Technology
  - Marcel Lehmann
excerpt: "Achieve a quick dropdown or ComboBox setup in PowerApps by leveraging Lookup and Choice columns in SharePoint or Dataverse."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Achieving a quick setup for dropdown menus or ComboBoxes in PowerApps, especially when under time constraints or in need of a temporary solution, often requires bypassing the more detailed setup processes associated with SharePoint or Dataverse.

## ✅ Solution
The “quick and dirty” approach involves leveraging Lookup and Choice columns in SharePoint or Dataverse to manage data sources for dropdown menus or ComboBoxes efficiently. This method is key for developers looking to streamline data integration without sacrificing functionality.

## 🔧 How It's Done
Here's how to do it:
1. Use the Choices function in PowerApps  
   🔸 Apply the expression `Choices([@Tests].cr0a0_LookupAccount)` to pull all values from the lookup column  
   🔸 Replace `Tests` and `cr0a0_LookupAccount` with your table and lookup column names

## 🎉 Result
This strategy enables a swift and effective way to manage data for user inputs in PowerApps, ensuring a balance between speed and data integrity. It’s particularly beneficial for projects that require immediate results or for developers working within tight deadlines.

## 🌟 Key Advantages
🔸 Speed: Facilitates rapid application development and deployment.  
🔸 Efficiency: Streamlines the process of integrating data into PowerApps.  
🔸 Practicality: Offers a viable solution for managing data in scenarios where time or resources are limited.

---

## 🎥 Video Tutorial
{% include video id="1w8ifafAQus" provider="youtube" %}

---

## 🛠️ FAQ
**1. What does the Choices function do in PowerApps?**  
The Choices function retrieves all possible values from a Choice or Lookup column, enabling you to populate dropdowns or ComboBoxes effortlessly.

**2. Can I use this method with both SharePoint and Dataverse?**  
Yes. The approach works with Lookup and Choice columns in SharePoint lists as well as tables in Dataverse.

**3. Is this quick setup suitable for production applications?**  
While ideal for rapid prototyping and scenarios with tight deadlines, consider more robust configurations for long-term production solutions to ensure maintainability and security.