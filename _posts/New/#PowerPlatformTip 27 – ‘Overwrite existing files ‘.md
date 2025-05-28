markdown
---
title: "#PowerPlatformTip 27 – 'Overwrite existing files'"
date: 2023-02-09
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - SharePoint
  - OneDrive
  - DuplicateFiles
  - FileOverwrite
  - PowerPlatform
  - PowerPlatformTip
excerpt: "Stop SharePoint duplicate file chaos by configuring your flow to overwrite existing files, ensuring a tidy workspace."
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

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. Why do duplicate files appear in SharePoint when using 'Create File'?**  
Because the 'Create File' action does not overwrite existing files automatically, leading to duplicates when the same file name is used.

**2. How can I check if a file exists before creating a new one in SharePoint?**  
Use the 'Get files (properties only)' or 'Get file metadata' action to search for the file by path or name, then use a Condition to decide whether to delete it before creating a new one.

**3. Can I overwrite files directly in SharePoint without deleting them?**  
Not directly; SharePoint's 'Create File' action requires a delete workaround. However, the OneDrive for Business connector supports an Overwrite toggle to replace files without manual deletion.
