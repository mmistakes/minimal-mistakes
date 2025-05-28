---
title: "#PowerPlatformTip 48 – 'Sharing of Flows & Power Apps'"
date: 2023-04-27
categories:
  - Article
  - PowerPlatformTip
tags:
  - Power Automate
  - Power Apps
  - Sharing
  - Collaboration
  - Permissions
  - Security
  - Power Platform
  - Teamwork
  - PowerPlatformTip
excerpt: "Easily share Power Automate flows and Power Apps with colleagues. Learn best practices for secure sharing, permissions, and collaboration in the Power Platform ecosystem."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Manually sharing flows and Power Apps across environments is error-prone and time-consuming, especially when dealing with dependencies and connected flows.

## ✅ Solution
Use export/import via make.powerautomate.com and make.powerapps.com, automate permission assignments with a flow, and package apps and flows into a solution to ensure all dependencies are included.

## 🔧 How It's Done
Here's how to do it:
1. Export flows  
   🔸 On make.powerautomate.com, export the desired flows.  
   🔸 Use make.powerapps.com for import instead of the legacy import site.
2. Automate sharing  
   🔸 Create a flow to grant permissions automatically (see #PowerPlatformTip 8).  
   🔸 Eliminate manual permission steps.
3. Package into a solution  
   🔸 Include Power Apps, Power Automate flows, connection references, tables, etc.  
   🔸 Verify all dependencies to avoid errors during import.
4. Export Power App with connected flows  
   🔸 Export the app including all connected flows.  
   🔸 After import, re-enable and re-add each flow to the app.

## 🎉 Result
You can seamlessly share flows and Power Apps between environments with all dependencies intact, automate permission assignments, and reduce manual errors.

## 🌟 Key Advantages
🔸 Centralized solution package with complete dependencies.  
🔸 Reduced manual effort through automated sharing.  
🔸 Export and re-enable connected flows in Power Apps for full app consistency.

---

## 🛠️ FAQ
**1. Can I share flows with external users outside my organization?**  
Yes, but external users need appropriate Power Platform licenses and must be added as guest users in your Azure AD tenant first.

**2. What happens to the flow run history when I share or move flows?**  
Flow run history stays with the original environment. Only the flow definition and settings are shared or moved to the new environment.

**3. Do shared users get the same permission level as the flow owner?**  
No, you can assign different permission levels (co-owner, editor, or viewer) when sharing flows, allowing granular access control.

---
