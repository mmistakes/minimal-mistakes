---
title: "#PowerPlatformTip 2 – 'Transfer PowerApp Ownership'"
date: 2022-12-13
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerPlatform
  - PowerApps
  - Ownership
  - Administration
  - PowerAutomate
  - Marcel Lehmann
  - Microsoft 365
  - Governance
excerpt: "Transferring ownership of a PowerApp is easier than you think—follow these steps to ensure smooth handover and continuity."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
When someone leaves your company or changes roles, transferring PowerApp ownership becomes crucial. But PowerApps doesn’t have a direct “Transfer Ownership” button—so how do you handle it?

## ✅ Solution
Use Azure Active Directory and Power Platform Admin Center to assign the app to a new owner securely and effectively.

## 🔧 How It's Done
Here's how to do it:

1. Add the new owner as a co-owner in PowerApps Studio.  
   🔸 Open the app details.  
   🔸 Share it with the new user and give them Co-owner access.

2. Use Power Platform Admin Center.  
   🔸 Navigate to https://admin.powerplatform.microsoft.com  
   🔸 Select the correct environment and app.

3. Update environment roles.  
   🔸 Assign “Environment Maker” role if not already set.  
   🔸 Confirm that the new user has edit rights.

4. Remove the previous owner (optional).  
   🔸 Only once the new owner confirms access and functionality.  
   🔸 Reassign any related flows or connections if needed.

## 🎉 Result
Ownership transitions are smooth, secure, and don’t disrupt app users. This ensures business continuity and proper administrative control.

## 🌟 Key Advantages
🔸 Maintain control and visibility over your apps  
🔸 Ensure seamless user experience and support  
🔸 Avoid risks tied to orphaned apps and flows

---

## 🎥 Video Tutorial
{% include video id="oW1i0bDOExI" provider="youtube" %}

---

## 🛠️ FAQ
**1. Can I directly transfer ownership in PowerApps?**  
Not directly. You must assign co-owner rights and remove the original owner once everything is confirmed.

**2. What if the original owner has left the company?**  
Admins can manage apps and users via Power Platform Admin Center to take over the app.

**3. Do I need premium licenses for this?**  
Basic ownership changes do not require premium licenses, but admin actions might require admin roles in Microsoft 365.

---
