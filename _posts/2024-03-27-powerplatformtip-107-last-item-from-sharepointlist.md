---
title: "#PowerPlatformTip 107 – 'Last Item from SharePointList'"
date: 2024-03-27
categories:
  - Article
  - PowerPlatformTip
tags:
  - SharePoint
  - PowerApps
  - PowerPlatformTip
  - SortByColumns
  - First
  - DataRetrieval
  - Functions
excerpt: "Retrieve the latest entry from a SharePoint list in PowerApps using SortByColumns and First functions."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
You need the latest entry from a SharePoint list in PowerApps, but the direct approach seems out of reach.

## ✅ Solution
Employ SortByColumns to order the list by ID in descending order, then use First to select the top item.

## 🔧 How It's Done
Here's how to do it:
1. Utilize `SortByColumns` on the SharePoint data source to order by ID descending.  
   🔸 Use `SortByColumns(DataSource, "ID", Descending)`.  
   🔸 This arranges items so the latest entry appears first.  
2. Wrap the sorted result with `First` to grab the top item.  
   🔸 Apply `First(...)` around the `SortByColumns` expression.  
   🔸 Retrieves the most recent list entry efficiently.

## 🎉 Result
This method ensures you access the most recent item from your SharePoint list in PowerApps, bypassing the Last function limitation.

## 🌟 Key Advantages
🔸 Simplicity and efficiency: straightforward access to the newest list items.  
🔸 Versatility: adapt the sort by any column for different scenarios.  
🔸 Native PowerApps integration: enhances logic without complex workarounds.

---

## 🎥 Video Tutorial
{% include video id="8fIiREiIBNM" provider="youtube" %}
---