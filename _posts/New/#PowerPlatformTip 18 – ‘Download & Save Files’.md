markdown
---
title: "#PowerPlatformTip 18 – 'Download & Save Files'"
date: 2023-01-10
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerAutomate
  - PowerPlatformTip
  - PowerPlatform
  - PowerApps
  - File Download
  - File Management
  - HTTP Request
  - PasswordProtected
excerpt: "Downloading public and password-protected files can present accessibility and security challenges."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Downloading files, whether public or password-protected, can present unique challenges in terms of accessibility and security.

## ✅ Solution
Employ different methods for public downloads and password-protected files to ensure secure and efficient file handling.

## 🔧 How It's Done
Here's how to do it:
1. For public downloads  
   🔸 Use the 'Upload file from URL' action.  
   🔸 This method is straightforward for openly accessible files.  
2. For password-protected files  
   🔸 Use the 'HTTP Request & Create File' action.  
   🔸 This approach handles files that require authentication.

## 🎉 Result
Streamlined and secure process for downloading and saving files, regardless of their accessibility status.

## 🌟 Key Advantages
🔸 Ensures secure handling of sensitive, password-protected files  
🔸 Provides a straightforward method for accessing public files  
🔸 Optimizes the file management process in your PowerPlatform solutions

---

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I download and save a publicly accessible file?**  
Use the 'Upload file from URL' action, provide the file URL and specify the destination path in your flow.

**2. How can I authenticate when downloading a secured file?**  
Use the 'HTTP Request & Create File' action and configure the necessary authentication headers (e.g., basic auth or API key) to access and save the secured file.

**3. Can I handle both public and secured files in a single flow?**  
Yes. Add a condition or switch in your flow to check the file’s accessibility and branch to use 'Upload file from URL' for public files or 'HTTP Request & Create File' for secured files.



Filename: 2023-01-10-powerplatformtip-18-download-save-files.md