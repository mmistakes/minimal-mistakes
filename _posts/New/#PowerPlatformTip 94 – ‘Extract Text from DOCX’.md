---
title: "#PowerPlatformTip 94 – 'Extract Text from DOCX'"
date: 2023-12-13
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerPlatformTip
  - PowerAutomate
  - PowerPlatform
  - DOCX
  - TextExtraction
  - DocumentProcessing
  - Marcel Lehmann
excerpt: "Extract text from DOCX files in Power Automate using native actions, eliminating third-party dependencies."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Extracting text from a Microsoft Word (DOCX) file using Power Automate can be challenging, especially when avoiding third-party tools.

## ✅ Solution
Leverage Power Automate to extract text directly from a DOCX file, understanding that it’s essentially a ZIP archive containing various XML files.

## 🔧 How It's Done
Here's how to do it:
1. Recognize that a DOCX file is a ZIP archive.  
   🔸 Rename the `.docx` extension to `.zip` to inspect its structure.  
   🔸 Identify the `document.xml` file inside the `word` folder.  
2. Use Power Automate to extract the archive.  
   🔸 Use the "Extract archive to folder" action on the DOCX file stored in OneDrive or SharePoint.  
   🔸 Store the extracted files in a temporary folder.  
3. Read and parse the `document.xml` file.  
   🔸 Use "Get file content using path" to retrieve `document.xml`.  
   🔸 Use a "Compose" or "Parse XML" action to extract the text nodes.

## 🎉 Result
A streamlined method to extract text from Word documents using standard Power Automate features, keeping the process simple and entirely within the platform.

## 🌟 Key Advantages
🔸 No need for third-party tools.  
🔸 Utilizes native Power Automate actions.  
🔸 Directly parses XML for accurate text extraction.

---

## 🎥 Video Tutorial
{% include video id="uH4JAagKKd4" provider="youtube" %}

---

## 🛠️ FAQ
**1. Do I need premium connectors to extract the DOCX archive?**  
No, the archive extraction actions are available with standard OneDrive or SharePoint connectors.

**2. How can I automate this for multiple files?**  
Use an "Apply to each" loop over the list of DOCX files, then repeat the extraction steps for each file.

**3. How do I strip XML tags to get only plain text?**  
After parsing the XML, use the "Html to text" action or string expressions in "Compose" to remove any residual markup.