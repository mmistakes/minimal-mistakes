markdown
---
title: "#PowerPlatformTip 19 – 'Resize files'"
date: 2023-01-12
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - SharePoint
  - Images
  - Thumbnail
  - File Management
  - PowerPlatformTip
excerpt: "Handling large images can be cumbersome, especially when you need them in a smaller size."
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
**1. What does the 'Upload file from URL' action do?**  
The 'Upload file from URL' action retrieves a file from a specified URL (such as a SharePoint link) and allows you to access its properties, including thumbnails, within the flow.

**2. How do I obtain the resized image?**  
After using 'Upload file from URL', use the 'Thumbnail' property in the action output, which provides a URL to the automatically generated smaller version.

**3. Can I customize the thumbnail size?**  
No, SharePoint generates thumbnails at predefined sizes. If you need a specific size, consider additional processing or custom functions.


Filename: 2023-01-12-powerplatformtip-19-resize-files.md