markdown
---
title: "#PowerPlatformTip 118 – 'Copy Actions in Switch/Condition'"
date: 2024-07-23
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - Switch
  - Condition
  - CopyActions
  - DynamicContent
  - Workflow
  - PowerPlatformTip
excerpt: "Copy actions or scopes within a Switch or Condition in Power Automate without errors caused by unresolved references."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
In Power Automate, copying actions or scopes within a Switch or Condition can sometimes fail due to unresolved references or dependencies in the new location.

## ✅ Solution
Copy the action or scope outside the Switch/Condition, move it to the desired location, and update the dynamic content references to ensure they point to accessible elements.

## 🔧 How It's Done
Here's how to do it:
1. Identify the action or scope to copy  
   🔸 If you encounter errors when copying an action or scope within a Switch or Condition, it might be due to dependencies.
2. Copy and paste outside the Switch/Condition  
   🔸 Paste the copied action or scope outside the Switch or Condition, preferably at a higher level in the flow.
3. Move the action or scope to the desired location  
   🔸 Drag and drop the action or scope into the specific location within the Switch or Condition where you want it.
4. Update dynamic content references  
   🔸 After moving the action or scope, ensure that all dynamic content references are updated to point to elements that are accessible in the new context. This is essential to avoid errors when saving.

## 🎉 Result
By following this process, you can successfully copy actions or scopes within Switches or Conditions without encountering errors related to unresolved dependencies, ensuring a smoother workflow in Power Automate.

## 🌟 Key Advantages
🔸 Avoid errors when copying elements within complex structures.  
🔸 Ensure dynamic content references are correctly updated.  
🔸 Streamline the organization and structure of your flows.

---

## 🎥 Video Tutorial
{% include video id="9lMRvMHqR0g" provider="youtube" %}

---

## 🛠️ FAQ
**1. Why does copying an action directly within a Switch or Condition cause errors?**  
Copying directly often breaks internal references because the copied action retains dependencies on elements not yet available in the new context.

**2. Can I copy multiple actions or scopes at once using this method?**  
Yes, you can group multiple actions or a scope and follow the same process: copy outside, paste at a higher level, then move them together back and update references.

**3. What happens if I forget to update dynamic content references?**  
You may encounter save or runtime errors because the action cannot resolve references to variables or outputs in the new location.
