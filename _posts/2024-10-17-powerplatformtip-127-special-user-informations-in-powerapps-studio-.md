---
title: "#PowerPlatformTip 127 – 'Special User-Informations in PowerApps Studio'"
date: 2024-10-17
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - PowerPlatformTip
  - PowerPlatform
  - TestEnvironment
  - StudioMode
  - Email
  - UserContext
  - Development
  - Production
  - AppSecurity
  - Environment Switching
  - Security
excerpt: "Automatically switch between test and production user emails in PowerApps Studio using environment detection for secure, automated app testing and deployment."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
While developing apps in Power Apps Studio mode, we often use test values like a test email address. However, it’s easy to forget to remove these values before deploying the app to production.

## ✅ Solution
Detect when the app is in Studio Mode and use a test email for development, switching to the user’s actual email in production.

## 🔧 How It's Done
Here's how to do it:
1. Define the Studio Mode variable  
   🔸 fxIsStudioMode = StartsWith(Host.Version, "PowerApps-Studio")  
   🔸 Checks if the app is running in Power Apps Studio.  
2. Define the user email variable  
   🔸 fxUserEmail = If(fxIsStudioMode, "testaccount@company.com", User().Email)  
   🔸 Uses the test account in Studio Mode and the user’s email in production.

## 🎉 Result
Automatically uses test email during development and correct user email in production, eliminating manual changes and reducing deployment errors.

## 🌟 Key Advantages
🔸 Prevents accidental deployment of test data  
🔸 Saves time by automating email assignment  
🔸 Enhances app security and consistency

---

## 🎥 Video Tutorial
{% include video id="640i6HAngNU" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I determine if my app is in Studio Mode?**  
Use the StartsWith function on Host.Version to check for "PowerApps-Studio".

**2. Can I apply this pattern to other test values?**  
Yes, you can use similar logic to switch between development and production values for any parameter.

**3. Where should I place these formulas in my app?**  
Include them in the App.OnStart property so that the variables are set when the app initializes.
