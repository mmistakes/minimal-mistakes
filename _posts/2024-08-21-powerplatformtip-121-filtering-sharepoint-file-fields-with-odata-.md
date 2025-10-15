---
title: "#PowerPlatformTip 121 – 'Filtering SharePoint File Fields with OData'"
date: 2024-08-21
modified: 2025-10-15
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - SharePoint
  - OData
  - FileLeafRef
  - FileRef
  - FileDirRef
  - PowerPlatformTip
excerpt: "Quickly and efficiently filter SharePoint files in Power Automate by using FileLeafRef (file name), FileRef (full path), and FileDirRef (folder) fields with simple OData filter expressions – even if you don’t know how these fields work yet."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
In Power Automate, you often need to find specific files in SharePoint. But you can't use normal file names or folders directly in filter queries, which makes it hard to select only the files you really want. Many users are also unsure which SharePoint fields work for filtering: What is FileLeafRef, FileRef, or FileDirRef – and how do you use them in OData queries to save time and speed up flows?

## ✅ Solution
Use the FileLeafRef, FileRef, and FileDirRef fields in combination with OData filtering to streamline your SharePoint queries.

## 🔧 How It's Done
Here's how to do it:
1. Use FileLeafRef to filter by file name  
   🔸 Filter by specific file names without the path.  
   🔸 e.g., `FileLeafRef eq 'document.pdf'`
2. Use FileRef to filter by full path  
   🔸 Filter by the full path to a file.  
   🔸 e.g., `FileRef eq '/sites/demo/Shared Documents/document.pdf'`
3. Use FileDirRef to filter by directory  
   🔸 Filter by files within a specific directory.  
   🔸 e.g., `startswith(FileDirRef, '/sites/demo/Shared Documents')`

## 🎉 Result
Using these OData filters drastically reduces the amount of data returned and results in faster, more efficient query processing, saving time and system resources.

## 🌟 Key Advantages
🔸 Faster access to desired files  
🔸 Minimal data retrieval for maximum efficiency  
🔸 Seamless integration with existing SharePoint processes

---

## 🎥 Video Tutorial
{% include video id="2DmwfItne0Q" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I apply these OData filters in Power Automate?**  
In the "Get files (properties only)" action, enter your OData filter expression into the **Filter Query** field to limit results based on FileLeafRef, FileRef, or FileDirRef.

**2. Can I combine multiple OData filter conditions?**  
Yes. Use logical operators like `and` or `or` in your filter query, for example:  
`FileLeafRef eq 'document.pdf' and startswith(FileDirRef, '/sites/demo/Shared Documents')`.

**3. Are these fields supported in SharePoint on-premises?**  
OData filtering with FileLeafRef, FileRef, and FileDirRef works in SharePoint Online and on-premises (2013+). Ensure your environment and connector version support OData queries.

**4: What does FileLeafRef mean?**  
It's the file name itself – for example, 'Invoice.pdf'.

**5: What does FileRef mean?**  
It's the full path of a file, including folders – for example, '/sites/demo/Shared Documents/Invoice.pdf'.

**6: What does FileDirRef mean?**  
It refers to a folder path only. Example: '/sites/demo/Shared Documents/'.