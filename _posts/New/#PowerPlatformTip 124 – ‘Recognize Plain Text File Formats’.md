---
title: "#PowerPlatformTip 124 – 'Recognize Plain Text File Formats'"
date: 2024-09-18
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerAutomate
  - PowerPlatform
  - PowerPlatformTip
  - JSON
  - CSV
  - PlainText
  - OneDriveForBusiness
excerpt: "Learn how to use plain text file formats in Power Automate’s Get File Content action to simplify processing by avoiding Base64 decoding."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Using the “Get File Content” action in Power Automate often results in file contents being displayed as Base64, complicating further processing. However, some file formats display content directly as plain text, making things much simpler!

## ✅ Solution
Use plain text file formats such as JSON, HTML, CSV, TXT, XML, Markdown, YAML, CSS, JavaScript, and log files to retrieve content directly without Base64 decoding.

## 🔧 How It's Done
Here's how to do it:
1. Use the “Get File Content” action to retrieve the file contents.  
   🔸 Configure the connector (OneDrive for Business, SharePoint, etc.).  
   🔸 Select the target file in your flow.
2. Identify formats that are output as plain text.  
   🔸 JSON, HTML, CSV, TXT, XML, Markdown (.md), YAML (.yaml, .yml), CSS, JavaScript (.js), and .log files.  
   🔸 Ensure the file has the correct extension for plain text.
3. Process the content directly without decoding.  
   🔸 Use variables, Compose actions, or expressions on the plain text.  
   🔸 Eliminate actions needed for Base64 decoding.
4. Validate with CSV files on OneDrive for Business.  
   🔸 Test a CSV file retrieval to confirm plain text output.  
   🔸 Adjust flow logic based on direct CSV content.

## 🎉 Result
Using plain text formats saves time and reduces complexity in your automation processes. You can work directly with the contents, making your flow more efficient and straightforward.

## 🌟 Key Advantages
🔸 No Base64 decoding needed, allowing for immediate use of file contents.  
🔸 Simplifies and speeds up further processing.  
🔸 Ideal for common automation tasks and working with data.

---

## 🎥 Video Tutorial
{% include video id="ZUywICtR4Vo" provider="youtube" %}

---

## 🛠️ FAQ
**1. Which file formats are recognized as plain text in Power Automate?**  
JSON, HTML, CSV, TXT, XML, Markdown (.md), YAML (.yaml/.yml), CSS, JavaScript (.js), and .log files are output as plain text by “Get File Content.”

**2. Do all connectors support plain text output?**  
Plain text output depends on the connector and the file type. “Get File Content” in OneDrive for Business and SharePoint supports these text formats directly.

**3. How do I handle formats that output as Base64?**  
For Base64 outputs, use a “Compose” action or the “base64ToString()” expression to decode the content before processing.

---

**Filename:** 2024-09-18-powerplatformtip-124-recognize-plain-text-file-formats.md