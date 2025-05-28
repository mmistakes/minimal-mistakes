markdown
---
title: "#PowerPlatformTip 20 – 'Change Flow-Owner'"
date: 2023-01-17
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - PowerPlatform
  - PowerPlatformTip
  - flow-owner
  - solution
  - permissions
excerpt: "Change Power Automate flow owner directly within a solution via a hidden menu option, avoiding export/import."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Power Automate hides the Change Owner feature for flows outside a solution. Without this option, you must export, adjust permissions, and re-import, which is time-consuming and error-prone.

## ✅ Solution
Access the hidden Change Owner option by working with your flow inside a solution, allowing direct reassignment of ownership.

## 🔧 How It's Done
Here's how to do it:
1. Navigate to Solutions in the Power Automate portal.  
   🔸 Select the solution containing your flow.  
   🔸 Ensures the ellipsis menu shows additional actions.  
2. Locate the target flow.  
   🔸 Click the three dots (ellipsis) next to the flow name.  
   🔸 Choose Change Owner from the menu.  
3. Assign a new owner.  
   🔸 Pick the user account to transfer ownership.  
   🔸 Click Save to apply changes.

## 🎉 Result
The flow's ownership is updated instantly without exporting or interrupting service, maintaining all connections and history intact.

## 🌟 Key Advantages
🔸 Quickly reassign flow ownership without export/import.  
🔸 Preserves flow connections and run history.  
🔸 No downtime or permission lapses during transfer.

---

## 🎥 Video Tutorial
{% include video id="2C_yw1aouXU" provider="youtube" %}

---

## 🛠️ FAQ
**1. Can I change the owner of any flow?**  
Direct owner change is only available for flows within a solution. Stand-alone flows require export and re-import.

**2. Do I need special permissions to change flow ownership?**  
Yes, you need Solution Maker or Environment Admin permissions to modify flow ownership in a solution.

**3. Can I revert to the original owner?**  
Absolutely. Follow the same Change Owner steps and select the previous owner to restore original assignment.

