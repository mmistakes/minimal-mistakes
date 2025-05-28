markdown
---
title: "#PowerPlatformTip 87 – 'Licensing –  Sharing Canvas Apps with Guests'"
date: 2023-11-21
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerApps
  - PowerPlatform
  - PowerPlatformTip
  - Canvas Apps
  - Licensing
  - Guests
excerpt: "Understanding licensing requirements for guest users is crucial when sharing Canvas Apps externally."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Understanding how to share a Canvas App with external users is not enough; you must also grasp the licensing requirements to ensure guests can access the app.

## ✅ Solution
Guest users need a Power Apps license matching the app’s functionality, provisioned by the hosting tenant for Dataverse apps or by either tenant for non-Dataverse apps.

## 🔧 How It's Done
Here's how to do it:
1. Configure licensing  
   🔸 Use Microsoft 365 Admin Center or Azure Portal.  
   🔸 Assign appropriate Power Apps license (non-Dataverse from either tenant, Dataverse from hosting tenant).  
2. Share the Canvas App  
   🔸 In Power Apps, open the app and choose “Share.”  
   🔸 Enter guest user email addresses and set permissions.

## 🎉 Result
Guests have the correct licenses, enabling seamless, legally compliant collaboration on Canvas Apps.

## 🌟 Key Advantages
🔸 Complements the sharing process outlined in PowerPlatformTip 76.  
🔸 Clarifies licensing requirements for guest users.  
🔸 Facilitates legal and efficient sharing of Canvas Apps with external parties.

---

## 🎥 Video Tutorial
{% include video id="UnMKjrhddzc" provider="youtube" %}

---

## 🛠️ FAQ
**1. What license do external guests need to access a Canvas App?**  
They need a Power Apps license that matches the app’s requirements: for non-Dataverse apps, from either the hosting or guest tenant; for Dataverse-connected apps, from the hosting tenant.

**2. Can guests use their own organization’s license for non-Dataverse apps?**  
Yes. Guests can use a Power Apps license from their own tenant for non-Dataverse apps. Dataverse apps typically require licenses assigned in the hosting tenant.

**3. Where do I assign Power Apps licenses to guest users?**  
In the Microsoft 365 Admin Center or Azure Portal: locate the guest user account and assign the appropriate Power Apps license under licensing settings.
