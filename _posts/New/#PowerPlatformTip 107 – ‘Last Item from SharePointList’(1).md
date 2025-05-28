---
title: "#PowerPlatformTip 107 – 'Last Item from SharePointList'"
date: 2024-06-06
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerPlatform
  - PowerApps
  - PowerAutomate
  - PowerBI
  - Technology
  - Marcel Lehmann
excerpt: "Retrieve the latest item from a SharePoint list in PowerApps by sorting the list and selecting the first record."
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

---

## 🎥 Video Tutorial
{% include video id="8fIiREiIBNM" provider="youtube" %}

---

## 🛠️ FAQ
**1. Why not use the Last function directly on the SharePoint list?**  
Last returns the last record in the local table rather than the highest ID from the source. Sorting ensures you retrieve the actual latest item.

**2. Can I sort by a different column (e.g., Created date) instead of ID?**  
Yes. Change the SortByColumns column parameter to the desired field (e.g., "Created") and ensure it supports delegation.

**3. How does this approach handle delegation and large lists?**  
SortByColumns and First are delegable for supported columns in SharePoint. Verify your column and data source settings to avoid delegation issues.