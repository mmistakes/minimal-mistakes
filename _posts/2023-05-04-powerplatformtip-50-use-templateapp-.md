---
title: "#PowerPlatformTip 50 – 'Use TemplateApp'"
date: 2023-05-04
categories:
  - Article
  - PowerPlatformTip
tags:
  - Power Platform
  - Template App
  - App Templates
  - Deployment
  - Customization
  - Productivity
  - Power Apps
  - Power Automate
  - PowerPlatformTip
excerpt: "Kickstart your Power Platform projects with Template Apps. Discover how to use, customize, and deploy ready-made solutions to save time and accelerate app development."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Starting a new canvas app often results in inconsistent styling and missing UI components, slowing down development.

## ✅ Solution
Use the PnP PowerApps Material Design Template App to jumpstart your app with ready-made components, documentation, and icons.

## 🔧 How It's Done
Here's how to do it:
1. Download the TemplateApp  
   🔸 Visit the PnP GitHub repository: https://github.com/pnp/powerapps-designtoolkit  
   🔸 Clone the repo or download the ZIP file  
2. Open the app in Power Apps Studio  
   🔸 Import the TemplateApp package into your environment  
   🔸 Verify that all assets (components, SVGs) are loaded correctly  
3. Customize your app styles  
   🔸 Edit the OnStart property to apply theme colors and fonts  
   🔸 Use the 16+ Material Design components in your screens  
4. Leverage documentation and assets  
   🔸 Refer to the provided documentation for component usage  
   🔸 Browse the 5000+ SVG icons for UI enhancements  

## 🎉 Result
You now have a fully configured Material Design template app with consistent styling, reusable components, and a library of SVG icons, enabling faster and more reliable canvas app development.

## 🌟 Key Advantages
🔸 Accelerates app development with prebuilt components  
🔸 Ensures consistent styling and user experience  
🔸 Saves time with reusable assets and documentation

## 🛠️ FAQ

**Q: Can I modify the Material Design components to match my organization's branding?**
Yes, all components are fully customizable. You can modify colors, fonts, and styling in the OnStart property and component definitions to align with your brand guidelines while maintaining the Material Design structure.

**Q: Are the 5000+ SVG icons free to use in commercial applications?**
The SVG icons included in the template are typically based on Material Design icons which are free for commercial use. However, always verify the license terms for your specific use case and organization policies.

**Q: What happens if I update the template app - will I lose my customizations?**
Your customizations will be preserved in your app instance. The template serves as a starting point - once imported, your app becomes independent. You can selectively adopt updates from newer template versions by manually importing specific components.

---
