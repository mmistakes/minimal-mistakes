---
title: "#PowerPlatformTip 107 – 'Last Item from SharePointList'"
date: 2024-06-06
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - SharePoint
  - Data Retrieval
  - Delegation
  - List Sorting
  - Latest Item
  - PowerPlatform
  - Marcel Lehmann
excerpt: "Efficiently retrieve the latest item from a SharePoint list in PowerApps using delegable sorting and the First function for reliable, scalable data access."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
You need the latest entry from a SharePoint list in PowerApps, but the direct approach seems out of reach.

## ✅ Solution
Use SortByColumns on the SharePoint list to order by ID descending, then retrieve the top item using the First function.

## 🔧 How It's Done
Here's how to do it:
1. Utilize `SortByColumns` on the SharePoint data source, targeting the ID column with a descending sort order.  
   🔸 Ensures the list is sorted from newest to oldest.  
   🔸 Places the most recent item first.  
2. Apply the `First` function around `SortByColumns` to grab the top-most item.  
   🔸 Retrieves the latest entry efficiently.  
   🔸 Bypasses the non-delegable `Last` function.

## 🎉 Result
You can reliably access the most recent item from your SharePoint list in PowerApps, bypassing the limitations of the Last function.

## 🌟 Key Advantages
🔸 Simplicity and efficiency in retrieving the most recent list item.  
🔸 Versatile sorting approach adaptable to other columns.  
🔸 Seamless PowerApps integration without complex workarounds.

## 🛠️ FAQ

**Q: Why can't I use the Last function directly on SharePoint lists?**
The Last function is not delegable for SharePoint data sources in PowerApps, which means it can only work with the first 500 records. Using SortByColumns with First ensures you get the actual latest item regardless of list size.

**Q: Can I use this approach with columns other than ID for sorting?**
Yes, you can sort by any column that supports ordering, such as Created, Modified, or custom date/number fields. For example: `First(SortByColumns(YourList, "Created", Descending))`.

**Q: Will this method work with large SharePoint lists?**
Yes, this approach is delegable to SharePoint, meaning it will work efficiently even with lists containing thousands of items, as the sorting and filtering happen on the SharePoint server.

---

## 🎥 Video Tutorial
{% include video id="8fIiREiIBNM" provider="youtube" %}

---
