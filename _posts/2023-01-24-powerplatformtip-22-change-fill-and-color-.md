---
title: "#PowerPlatformTip 22 – 'Change Fill & Color'"
date: 2023-01-24
categories:
  - Article
  - PowerPlatformTip
tags:
  - powerapps
  - canvas apps
  - themes
  - ui customization
  - color
excerpt: "Quickly change fill and color in PowerApps Canvas Apps using ReplaceAll or Theme settings for consistent, branded UI."
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

## 🛠️ FAQ
**1. Can I apply custom themes to existing apps without losing my current design?**  
Yes, but test the theme changes carefully as some custom formatting may be overridden by the new theme settings.

**2. Does the ReplaceAll function method work with all control types?**  
ReplaceAll works with most controls, but some complex controls may require individual color property adjustments.

**3. Can I save my custom theme for use in other apps?**  
Yes, you can export your custom theme and apply it to new Canvas Apps, ensuring brand consistency across multiple applications.

---

## 🎥 Video Tutorial
{% include video id="5P722KclIsk" provider="youtube" %}
