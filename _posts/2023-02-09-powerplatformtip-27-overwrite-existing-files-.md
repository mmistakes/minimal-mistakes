---
title: "#PowerPlatformTip 27 – 'Overwrite existing files'"
date: 2023-02-09
categories:
  - Article
  - PowerPlatformTip
tags:
  - power automate
  - sharepoint
  - file overwrite
  - file management
  - onedrive
excerpt: "Prevent duplicate files in SharePoint and OneDrive by configuring Power Automate flows to overwrite existing files. Keep your workspace organized."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Got a case of the duplicates in your SharePoint? It happens to the best of us. You’re rolling along, using ‘Create File’ in your flows, and bam – you’re swimming in files with the same name.

## ✅ Solution
Configure your flow to overwrite existing files by checking for existing files and deleting them before creation in SharePoint, or simply toggle overwrite in the OneDrive for Business connector.

## 🔧 How It's Done
Here's how to do it:
1. For the SharePoint Aficionados:  
   🔸 Use **Get files (properties only)** or **Get file metadata** to find existing files.  
   🔸 Add a **Condition** to delete the file if it exists before using **Create File** again.  
2. For the OneDrive for Business Crew:  
   🔸 In the **Create File** action, enable the **Overwrite** toggle.  
   🔸 New versions replace the old file automatically without extra steps.

## 🎉 Result
Your SharePoint and OneDrive libraries stay clean without duplicates, making file management smoother and more reliable.

## 🌟 Key Advantages
🔸 Prevent duplicate file buildup in SharePoint and OneDrive.  
🔸 Keep your digital workspace organized and clutter-free.  
🔸 Utilize built-in connector settings to streamline your flows.

---

## 🛠️ FAQ
**1. What happens to the original file when it gets overwritten?**  
The original file is replaced completely. Consider enabling versioning in SharePoint to maintain backup copies if needed.

**2. Can I use this setting with all file types?**  
Yes, the overwrite setting works with most file types including documents, images, and other common file formats.

**3. Does overwriting files affect sharing permissions?**  
No, overwriting a file maintains the same sharing permissions and links as the original file.

---