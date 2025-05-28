markdown
---
title: "#PowerPlatformTip 67 – 'App-to-App Redirection'"
date: 2023-07-11
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - PowerPlatform
  - LaunchFunction
  - AppToAppRedirection
  - UserExperience
  - Efficiency
  - Control
excerpt: "Use Power Apps' Launch function to seamlessly redirect users from an older app to a new one across environments."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Managing multiple apps on different environments can be a daunting task. You want to ensure a seamless user transition from an older app to a revamped one hosted elsewhere.

## ✅ Solution
Use the Launch function in Power Apps to redirect users from the old app to the new one, ensuring a smooth transition.

## 🔧 How It's Done
Here's how to do it:
1. Launch Function  
   🔸 Use the `Launch` function to create a redirection from the old app to the new one.  
   🔸 Place it in the `OnStart` property or an `OnVisible` event on a screen.
2. User Communication  
   🔸 Inform users about the change and share the new app URL.  
   🔸 Collect URL requests and questions via Teams.

## 🎉 Result
A seamless transition for users to the new app version or environment, while maintaining access to the older app.

## 🌟 Key Advantages
🔸 Enhances user experience by minimizing disruption.  
🔸 Improves efficiency by avoiding broken links across locations.  
🔸 Maintains control over the migration process.

---

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I trigger the redirection?**  
Use the `Launch` function in Power Apps and set it in the `OnStart` or `OnVisible` property with the new app URL.

**2. Can I still access the old app?**  
Yes. The redirection allows the old URL to continue working while users move to the new app.

**3. How should I inform users about the new URL?**  
Communicate via Teams or in-app notifications, providing the new link and guidance on the change.


Filename: 2023-07-11-powerplatformtip-67-app-to-app-redirection.md