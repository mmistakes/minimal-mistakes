markdown
---
title: "#PowerPlatformTip 103 – 'Quick Setup Guide'"
date: 2024-02-14
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerApps
  - PowerPlatform
  - PowerPlatformTip
  - Dataverse
  - SharePoint
excerpt: "Quickly set up dropdown menus or ComboBoxes in PowerApps using Lookup and Choice columns in SharePoint or Dataverse."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Achieving a quick setup for dropdown menus or ComboBoxes in PowerApps, especially when under time constraints or needing a temporary solution.

## ✅ Solution
Leverage Lookup and Choice columns in SharePoint or Dataverse to manage data sources for dropdown menus or ComboBoxes efficiently.

## 🔧 How It's Done
Here's how to do it:
1. Prepare your data source  
   🔸 Create a Lookup column in Dataverse or SharePoint for relational data.  
   🔸 Use a Choice column for simple picklists.
2. Configure the control in PowerApps  
   🔸 Add a Dropdown or ComboBox control to your canvas.  
   🔸 Set its `Items` property to:  
     `Choices([@Tests].cr0a0_LookupAccount)`

## 🎉 Result
This strategy enables a swift and effective way to manage data for user inputs in PowerApps, ensuring a balance between speed and data integrity. It's particularly beneficial for projects that require immediate results or for developers working within tight deadlines.

## 🌟 Key Advantages
🔸 Speed: Facilitates rapid application development and deployment.  
🔸 Efficiency: Streamlines the process of integrating data into PowerApps.  
🔸 Practicality: Offers a viable solution for managing data in scenarios where time or resources are limited.

---

## 🎥 Video Tutorial
{% include video id="1w8ifafAQus" provider="youtube" %}

---

## 🛠️ FAQ
**1. What is the "quick and dirty" approach in PowerApps?**  
The "quick and dirty" approach involves using Lookup and Choice columns in SharePoint or Dataverse to populate dropdowns or ComboBoxes quickly without detailed configuration steps.

**2. Can this method be used with both SharePoint and Dataverse?**  
Yes, it works with both platforms. Use SharePoint Lookup or Choice columns or Dataverse Lookup columns to source values for the control.

**3. Are there any limitations when using the `Choices()` function?**  
`Choices()` retrieves all values from a Lookup or Choice column but may not support advanced filtering or custom formatting. Ensure delegation limits are considered and test performance for large datasets.

---
