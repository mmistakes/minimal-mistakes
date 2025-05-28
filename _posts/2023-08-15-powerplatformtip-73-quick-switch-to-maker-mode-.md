---
title: "#PowerPlatformTip 73 – 'Quick Switch to Maker Mode'"
date: 2023-08-15
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - Maker Mode
  - Productivity
  - Bookmarklet
  - App Editing
  - Low Code
  - Power Platform
excerpt: "Instantly switch from play mode to maker mode in Power Apps using a bookmarklet—speed up app editing, boost productivity, and streamline your development workflow."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
You’re using a Power App in play mode and realize you need to make some adjustments. Typically, you’d have to navigate back to the environment, locate the app, and then click on “Edit.” This process can be time-consuming and disrupts your workflow.

## ✅ Solution
Use a simple bookmarklet—a small JavaScript snippet—to swiftly switch from play mode to maker mode without closing or reloading the app.

## 🔧 How It's Done
Here's how to do it:
1. Create a bookmarklet containing the JavaScript code.  
   🔸 Open your browser’s bookmark manager and create a new bookmark.  
   🔸 Copy the JavaScript snippet from: https://github.com/MarceLehmann/CodeSnippets/blob/main/PowerAppsPlayToMake.js into the bookmark’s URL field.
2. Activate the bookmarklet while in play mode.  
   🔸 Ensure you are viewing the app in play mode.  
   🔸 Click the bookmark you just created to run the script.
3. Switch instantly to maker mode.  
   🔸 The app reloads in maker mode while keeping your session active.  
   🔸 You can begin editing immediately without further navigation.

## 🎉 Result
You’ve streamlined the process of transitioning between play and maker modes in Power Apps, boosting your efficiency and keeping your development flow uninterrupted.

## 🌟 Key Advantages
🔸 Time-Saving: Eliminates multiple navigation steps to edit your app.  
🔸 Seamless Workflow: Switch modes without disrupting your focus.  
🔸 Enhanced Productivity: Enables rapid iterations and a smoother development experience.

---

## 🎥 Video Tutorial
{% include video id="vfciorDH6bM" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I add this bookmarklet to my browser?**  
To add the bookmarklet, open your browser’s bookmark manager, create a new bookmark, and paste the JavaScript code from the GitHub link into the URL field. Save the bookmark and you’re ready to use it.

**2. Which browsers support this bookmarklet?**  
Most modern desktop browsers support bookmarklets, including Chrome, Edge, Firefox, and Safari. Mobile browsers may have limitations with executing custom scripts.

**3. Is this an official Microsoft feature?**  
No, this is a user-created workaround using a bookmarklet. It’s not an officially supported Microsoft feature, so use it at your own discretion.
