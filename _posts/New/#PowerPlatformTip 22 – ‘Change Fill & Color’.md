markdown
---
title: "#PowerPlatformTip 22 – 'Change Fill & Color'"
date: 2023-01-24
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - PowerPlatform
  - CanvasApps
  - Themes
  - UI
  - Color
  - Fill
excerpt: "There are 2 ways to change the colors of an app if you haven't used a modified template."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Changing the colors and fill of a Canvas App when using the default template can be cumbersome, as there is no straightforward UI for overriding the theme.

## ✅ Solution
Leverage the ReplaceAll function or the built-in Theme settings to quickly adjust your app’s color scheme without a custom template.

## 🔧 How It's Done
Here's how to do it:
1. ReplaceAll  
   🔸 Use the ReplaceAll function in your App’s **OnStart** property to override default colors.  
   🔸 Provide a mapping table of old to new color values, e.g. `ReplaceAll(ColorTable, "OldColor", "NewColor")`.  
2. Theme  
   🔸 Go to **App > Theme** and pick a predefined theme or customize one.  
   🔸 Adjust primary, secondary, and accent colors directly in the theme editor.

## 🎉 Result
You can instantly update the color scheme across all screens and controls in your app, ensuring a consistent and branded UI without manual edits.

## 🌟 Key Advantages
🔸 Fast, centralized color updates across the entire app.  
🔸 No need to rebuild or apply a separate custom template.  
🔸 Easily maintain consistency when adding new controls or screens.

---

## 🎥 Video Tutorial
{% include video id="5P722KclIsk" provider="youtube" %}

---

## 🛠️ FAQ
**1. What is the ReplaceAll function and how does it work?**  
The ReplaceAll function iterates over a table or string, replacing all occurrences of specified values with new ones—ideal for bulk-updating color references.

**2. When should I use the Theme approach over ReplaceAll?**  
Use the Theme editor when you want a visual interface to change colors globally without writing formulas, perfect for quick branding tweaks.

**3. Can I combine both methods in the same app?**  
Yes. Use Theme for overall color branding and ReplaceAll for fine-tuning or overriding specific control colors as needed.

---
