---
title: "#PowerPlatformTip 129 – 'Case-sensitive SharePoint Filtering'"
date: 2024-11-06
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - SharePoint
  - OData
  - FilterArray
  - CaseSensitivity
  - DataFiltering
excerpt: "Combine OData filtering with Filter array in Power Automate for precise, case-sensitive SharePoint queries."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
SharePoint OData filtering is case-insensitive, leading to inaccurate results when exact letter casing matters.

## ✅ Solution
First use an OData filter for performance, then apply a case-sensitive Filter array action to refine the data.

## 🔧 How It's Done
Here's how to do it:
1. Apply OData filtering in your SharePoint query for an initial selection.  
   🔸 Use a filter expression (e.g., `Title eq 'Value'`)  
   🔸 Quickly reduces the dataset before further processing  
2. Add a Filter array action to the flow.  
   🔸 Configure it to match items with exact casing  
   🔸 Use an expression like `equals(item()?['Field'], 'Value')`  

## 🎉 Result
You get fast initial filtering with OData and precise, case-sensitive verification with Filter array, ensuring accurate data retrieval.

## 🌟 Key Advantages
🔸 Fast initial queries with OData  
🔸 Precise case-sensitive validation  
🔸 Combined efficiency and accuracy

---

## 🎥 Video Tutorial
{% include video id="a7Hendredjs" provider="youtube" %}

---

## 🛠️ FAQ
**1. Why is OData filtering case-insensitive?**  
SharePoint’s OData endpoint applies string comparisons without distinguishing letter casing.

**2. Can I perform case-sensitive filtering directly in OData?**  
No, SharePoint OData does not support native case-sensitive comparisons in the query.

**3. Does using Filter array impact performance?**  
When used after OData pre-filtering, Filter array processes a smaller set in-memory, maintaining good performance.
