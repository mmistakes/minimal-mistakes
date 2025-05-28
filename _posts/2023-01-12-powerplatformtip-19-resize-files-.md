---
title: "#PowerPlatformTip 19 – 'Resize files'"
date: 2023-01-12
categories:
  - Article
  - PowerPlatformTip
tags:
  - power automate
  - sharepoint
  - image resizing
  - file management
  - automation
excerpt: "Easily resize large images in Power Automate using SharePoint thumbnails and file management actions. Streamline image processing and automation."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Handling large images can be cumbersome, especially when you need them in a smaller size.

## ✅ Solution
Utilize the 'Upload file from URL' action combined with the thumbnail output for image files stored on SharePoint.

## 🔧 How It's Done
Here's how to do it:
1. Store your large image file on SharePoint.  
2. Use the 'Upload file from URL' action.  
3. Access the thumbnail output of the stored image, which will be a smaller version.

## 🎉 Result
Effortlessly resize large images to more manageable sizes without complex processes.

## 🌟 Key Advantages
🔸 Simplifies the resizing process  
🔸 Utilizes SharePoint’s storage and thumbnail feature  
🔸 Reduces the need for external image editing tools  

---

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. What image formats are supported for resizing in Power Automate?**  
Most common formats including JPEG, PNG, GIF, BMP, and TIFF are supported by the image processing actions.

**2. Can I resize multiple images in a single flow run?**  
Yes, use a loop (Apply to each) to process multiple images, but be mindful of flow execution time limits.

**3. Does resizing affect image quality?**  
Resizing can affect quality depending on the method used. Maintain aspect ratios and avoid excessive upscaling for best results.
