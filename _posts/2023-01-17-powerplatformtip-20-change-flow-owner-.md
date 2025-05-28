---
title: "#PowerPlatformTip 20 – 'Change Flow-Owner'"
date: 2023-01-17
categories:
  - Article
  - PowerPlatformTip
tags:
  - power automate
  - flow owner
  - permissions
  - solutions
  - automation
excerpt: "Change Power Automate flow owner directly in a solution using the hidden menu. Avoid export/import and keep all connections and history intact."
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

## 🛠️ FAQ
**1. Can I change ownership of flows that use premium connectors?**  
Yes, but the new owner must have appropriate licenses for any premium connectors used in the flow.

**2. What happens to the flow's run history when ownership changes?**  
The complete run history remains intact and accessible to the new owner after the transfer.

**3. Do I need special permissions to change flow ownership?**  
Yes, you need to be either the current flow owner, a co-owner, or have environment admin privileges.

---
