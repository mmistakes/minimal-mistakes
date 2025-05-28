markdown
---
title: "#PowerPlatformTip 86 – 'Free Power Apps Icons'"
date: 2023-11-16
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - Icons
  - SVG
  - UI
  - UserExperience
  - SVGRepo
  - MatthewDevaney
  - FreeResources
  - Customization
excerpt: "Leverage free Power Apps icons and SVGRepo’s extensive library for easy, customizable SVG icon integration."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Incorporating visually appealing icons into Power Apps is key to enhancing user experience. However, finding and effectively using suitable icons can often be a challenge.

## ✅ Solution
Utilize the 2,000 free Power Apps icons from Matthew Devaney’s website and explore SVGRepo for an extensive collection of customizable, open-licensed SVG icons.

## 🔧 How It's Done
Here's how to do it:
1. Visit Matthew Devaney’s website or www.svgrepo.com.  
2. Select an icon that suits your needs and customize its color.  
3. Right-click the icon and copy the SVG code.  
4. In Power Apps, go to the Image property of the control you want to customize.  
5. Paste the SVG code into the property, enclosed in double quotes ("").  
6. If using SVGRepo:  
   🔸 Prefix the SVG code with `"data:image/svg+xml;utf8," & EncodeUrl("YourSVGCodeHere")`.  
   🔸 Replace all double quotes in the SVG code with single quotes for compatibility.  

## 🎉 Result
Your Power App now features customized, visually appealing icons, significantly enhancing both aesthetics and user experience.

## 🌟 Key Advantages
🔸 Vast selection of free, ready-to-use icons.  
🔸 Easy color customization to match your app theme.  
🔸 Simple integration by copying and pasting SVG code.  

---

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. Where can I find free Power Apps icons?**  
You can download 2,000 free Power Apps icons from Matthew Devaney’s website and browse over 500,000 open-licensed SVG vectors on SVGRepo.

**2. How do I change the color of SVG icons?**  
Customize icon colors on the source website before copying the SVG code, or edit the SVG fill attributes directly in the code after pasting.

**3. Why use SVG icons in Power Apps?**  
SVG icons are scalable, lightweight, and easily customizable, ensuring crisp visuals and better performance across devices.

---


Filename: 2023-11-16-powerplatformtip-86-free-power-apps-icons.md