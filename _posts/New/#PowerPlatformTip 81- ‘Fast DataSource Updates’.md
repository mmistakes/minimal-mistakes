markdown
---
title: "#PowerPlatformTip 81 – 'Fast DataSource Updates'"
date: 2023-10-10
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerPlatform
  - PowerPlatformTip
  - PowerApps
  - SharePoint
  - DataSource
  - ClearCollect
  - UpdateIf
  - Patch
excerpt: "Use ClearCollect, UpdateIf on a local collection, then Patch to efficiently update large data sets in Power Apps."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
You have a large data set in a data source (it could be SharePoint, SQL, or any other data source), and you need to update a significant portion of it. Using UpdateIf directly on the data source is not efficient and can take a long time to process.

## ✅ Solution
Combine ClearCollect, UpdateIf on a local collection, and Patch to perform efficient bulk updates to the data source.

## 🔧 How It's Done
Here's how to do it:
1. ClearCollect a local collection from the data source.  
   🔸 Use `ClearCollect(LocalCollection, DataSource)` to load up to 500-2000 items into a local collection.  
   🔸 Note: By default, ClearCollect has a limit of 500-2000 items based on your app settings.
2. Update the local collection.  
   🔸 Use `UpdateIf(LocalCollection, Condition, Changes)` to apply your changes locally.  
   🔸 Modify or transform only the records you need before sending them back.
3. Patch back to the data source.  
   🔸 Use `Patch(DataSource, LocalCollection)` to update the original data source with the modified collection.  
   🔸 This batch update is much faster than updating each record directly.

## 🎉 Result
You can efficiently update a large number of items in any data source without hitting performance bottlenecks.

## 🌟 Key Advantages
🔸 Speed – faster than using UpdateIf directly on the data source.  
🔸 Flexibility – perform complex updates on the local collection before patching.  
🔸 Scalability – handle large data sets efficiently, especially when extending item limits.

---

## 🎥 Video Tutorial
{% include video id="vxDPFM2gFM4" provider="youtube" %}

---

## 🛠️ FAQ
**1. What is the purpose of ClearCollect in this method?**  
ClearCollect creates a local collection of records from your data source, allowing you to perform updates locally without repeatedly calling the data source.

**2. Why shouldn’t I use UpdateIf directly on the data source?**  
Using UpdateIf on the server-side data source is slower and can hit performance limits when processing large data sets.

**3. How can I work around the default item limit of 500–2000 records?**  
You can use ForAll in combination with Collect to fetch and process records in batches, circumventing the default delegation limit.

---
