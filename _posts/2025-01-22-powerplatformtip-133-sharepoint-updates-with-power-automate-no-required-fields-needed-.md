---
title: "#PowerPlatformTip 133 – 'SharePoint Updates with Power Automate – No Required Fields Needed'"
date: 2025-01-22
categories:
  - Article
  - PowerPlatformTip
tags:
  - SharePoint
  - PowerAutomate
  - PowerPlatformTip
  - JSON
  - variables
  - flows
  - update-item
  - automation
  - Field Mapping
excerpt: "Update specific SharePoint fields in Power Automate without HTTP requests or required fields."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Updating only specific fields in SharePoint items can be tricky. Often, it feels like you’re forced to manage unnecessary required fields or rely on HTTP requests. Wouldn’t it be easier to simply update the fields you need?

## ✅ Solution
Leverage dynamic JSON data from variables to update only the necessary fields in SharePoint items—quickly and efficiently—without extra overhead.

## 🔧 How It's Done
Here's how to do it:
1. Define the Trigger  
   🔸 Choose a suitable trigger, like “When an item is created or modified in SharePoint.”  
2. Prepare JSON Data  
   🔸 Initialize a variable or Compose action (e.g., `UpdateData`) containing a JSON object.  
   🔸 Specify only the fields to update:  
   
   {
       "Status": "Completed"
   }
     
3. Update Item with Dynamic Data  
   🔸 Add the “Update Item” action.  
   🔸 Set the Site URL as usual, and for the list, use the display name via the expression `string('List Name')`.  
   🔸 For fields, directly embed the JSON variable `UpdateData` to apply all desired updates in one step.  
4. Test the Flow  
   🔸 Ensure that only the specified fields are updated and that required fields don’t cause any issues.

## 🎉 Result
Your flow is now streamlined and flexible—it updates only the fields you need, saving time and reducing manual effort.

## 🌟 Key Advantages
🔸 No hassle with unnecessary required fields  
🔸 Flexible updates using dynamic JSON data  
🔸 Clean and maintainable flow structure

---

## 🎥 Video Tutorial
{% include video id="Nco3uk7q7yY" provider="youtube" %}

---

## 🛠️ FAQ
**1. Can I update multiple fields simultaneously?**  
Yes, by including multiple key-value pairs in the JSON variable, you can update several fields at once.

**2. What happens to required fields not included in JSON?**  
Required fields not included remain unchanged; the flow will not prompt for them when using dynamic JSON updates.

**3. Can this approach be used for other data sources?**  
While designed for SharePoint, the JSON dynamic update concept can be adapted to other connectors that support JSON payloads.
