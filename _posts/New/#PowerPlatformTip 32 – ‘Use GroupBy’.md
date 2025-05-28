markdown
---
title: "#PowerPlatformTip 32 – 'Optimize with GroupBy'"
date: 2023-03-02
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - PowerPlatform
  - Performance
  - DataManagement
  - GroupBy
  - Optimization
  - Delegation
  - CanvasApps
excerpt: "Load all data once and use GroupBy to organize it for dependent filters, reducing repeated data loads and improving app performance."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Ever feel like your app is on a treadmill, constantly reloading the same data source for different filters like categories and subcategories in dropdowns or comboboxes? This not only wears out the virtual sneakers of your app but can seriously lag your performance.

## ✅ Solution
Load all data once and use GroupBy to organize it for dependent filters, avoiding repeated data calls and boosting responsiveness.

## 🔧 How It's Done
Here's how to do it:
1. Step 1: Gather all your data—categories, subcategories, you name it—in one go.  
   🔸 Include categories, subcategories, and related items in a single collection.  
   🔸 Retrieve data from the source only once.  
2. Step 2: Use GroupBy to categorize this data based on your filtering needs.  
   🔸 Apply `GroupBy` to segment records by the chosen field.  
   🔸 Feed grouped results into dropdown or combobox controls.

## 🎉 Result
Your app now delivers faster responses and smoother interactions by eliminating redundant data loads and leveraging pre-grouped collections.

## 🌟 Key Advantages
🔸 Efficient data handling with no repeated calls.  
🔸 Simplified dependent filtering via grouped tables.  
🔸 Streamlined data structure for cleaner app logic.

---

## 🎥 Video Tutorial
{% include video id="pRI657NjPXQ" provider="youtube" %}

---

## 🛠️ FAQ
**1. What does GroupBy actually do?**  
GroupBy constructs a new table by grouping records based on a specified column, producing a key column and a nested table of grouped records.

**2. Is GroupBy delegable?**  
No, GroupBy is non-delegable. For larger datasets, load a limited subset into a collection before using GroupBy to avoid delegation warnings.

**3. How do I use the grouped results in dropdown controls?**  
Set the `Items` property to the grouped table (or its Key column) and reference the nested tables for subsequent dependent filters.

