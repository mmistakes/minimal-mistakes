---
title: "#PowerPlatformTip 95 – 'Optimized SharePoint Queries'"
date: 2023-12-19
categories:
  - Article
  - PowerPlatformTip
tags:
  - Power Automate
  - SharePoint
  - OData
  - Query Optimization
  - Data Filtering
  - Workflow Automation
  - Power Platform
excerpt: "Optimize SharePoint queries in Power Automate using OData filter options—improve data filtering, workflow efficiency, and minimize processing for large lists."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Filtering data within SharePoint via Power Automate can be cumbersome, particularly with large lists and intricate filter conditions.

## ✅ Solution
Employ OData query options in Power Automate’s standard SharePoint connectors to refine and streamline your queries.

## 🔧 How It's Done
Here’s how to do it:
1. Configure the SharePoint action filter  
   🔸 Use the **Filter Query** option in **Get items**  
   🔸 Or in **Get files (properties only)**
2. Build your OData query using operators  
   🔸 **eq** (Equal): Filters items where a field equals a value  
   🔸 **ne** (Not Equal): Excludes items where a field equals a value  
   🔸 **gt** (Greater Than): Includes items where a field’s value is greater than a value  
   🔸 **ge** (Greater Than or Equal): Includes items where a field’s value is ≥ a value  
   🔸 **lt** (Less Than): Includes items where a field’s value is less than a value  
   🔸 **le** (Less Than or Equal): Includes items where a field’s value is ≤ a value  
   🔸 **and** (And): Combines conditions; all must be true  
   🔸 **or** (Or): Combines conditions; any can be true  
   🔸 **not** (Not): Negates a condition  
   🔸 **startswith** (Starts With): Field value begins with a substring  
   🔸 **endswith** (Ends With): Field value ends with a substring  
   🔸 **substringof** (Substring Of): Field value contains a substring

## 🎉 Result
This method enables more sophisticated and efficient queries, ensuring your workflows are optimized and only the necessary data is retrieved.

## 🌟 Key Advantages
🔸 Precision: Exact data retrieval with specific OData filters.  
🔸 Efficiency: Minimize data processing and server load by fetching only needed data.  
🔸 Flexibility: Craft complex queries by mixing various OData options to meet your needs.

---

## 🎥 Video Tutorial
{% include video id="hXg9JrMqi0c" provider="youtube" %}

---

## 🛠️ FAQ
**1. What is the Filter Query option in Power Automate?**  
The Filter Query option lets you apply an OData expression directly in SharePoint actions like Get items or Get files, so only matching records are retrieved.

**2. Which OData operators can I use in Power Automate?**  
Power Automate supports common OData operators such as eq, ne, gt, ge, lt, le, and, or, not, startswith, endswith, and substringof for flexible filtering.

**3. How do I format date or text values in an OData query?**  
Enclose text values in single quotes (e.g., Title eq 'Report') and format dates in ISO 8601 (e.g., Created ge 2023-12-01T00:00:00Z) to avoid errors.

