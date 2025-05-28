---
title: "#PowerPlatformTip 55 – 'Picking colors'"
date: 2023-05-25
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerApps
  - PowerPlatform
  - PowerPlatformTip
  - Microsoft Edge
  - CSS Overview
  - Colors
  - Corporate Design
excerpt: "Pick and apply colors efficiently in Power Apps. Use this tip to streamline UI design, maintain brand consistency, and speed up app development with color best practices."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Maintaining a consistent corporate design—especially colors—in PowerApps can be tedious. How can you quickly grab all the colors used on a webpage?

## ✅ Solution
Use Microsoft Edge’s built-in CSS Overview in DevTools to extract a site’s color palette instantly.

## 🔧 How It's Done
Here's how to do it:
1. Open up the webpage in Edge.  
   🔸 Navigate to the site whose colors you want to capture.  
2. Right-click, select ‘Inspect Element’.  
   🔸 Open Edge DevTools on the current page.  
3. Go to ‘CSS Overview’.  
   🔸 Click the CSS Overview tab in DevTools.  
4. Review the extracted data.  
   🔸 You’ll see all colors, fonts, and font sizes used on the website.  

## 🎉 Result
Copy the listed color values and paste them into your PowerApps template (as shown in PowerPlatformTip #50). Voila—your app now matches your website’s color scheme, ensuring brand consistency!

## 🌟 Key Advantages
🔸 Quickly gather a full color palette without manual sampling.  
🔸 Ensure uniform branding across web and app.  
🔸 No extra extensions needed—built into Edge DevTools.

---

## 🎥 Video Tutorial
{% include video id="B5P8-3Tuxuc" provider="youtube" %}

---

## 🛠️ FAQ
**1. What is CSS Overview in Edge?**  
CSS Overview is a feature in Microsoft Edge DevTools that analyzes a page's CSS and summarizes key data—colors, fonts, media queries, and more.

**2. Can I use this on any website?**  
Yes. As long as the page is accessible in Edge, CSS Overview will scan and list the styling details for you.

**3. Do I need any browser extensions or add-ons?**  
No – CSS Overview is built into Edge’s developer tools; no additional installations are required.
