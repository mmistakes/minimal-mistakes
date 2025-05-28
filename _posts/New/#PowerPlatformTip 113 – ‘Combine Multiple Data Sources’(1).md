markdown
---
title: "#PowerPlatformTip 113 – 'Combine Multiple Data Sources'"
date: 2024-05-10
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - PowerPlatform
  - PowerPlatformTip
  - StaticData
  - DataIntegration
  - Ungroup
  - CanvasApps
  - Delegation
  - Collections
  - TableFunction
excerpt: "Simplify merging static and dynamic data in Power Apps by ungrouping mixed data sources into a single flat table for improved management."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Combining multiple data sources, including static data, into a single Power Apps project can be challenging. Merging multiple data sources with static data in Power Apps can create complexity in your app’s data management.

## ✅ Solution
Use the `Ungroup` function to merge different data types into a unified, flat table structure, enhancing data interaction and usability.

## 🔧 How It's Done
Here's how to do it:
1. Combine Data Sources: Mix static and dynamic data in an array.  
   🔸 Create an array including objects with local static entries and tables from sources.  
   🔸 Ensure the property name (e.g., locItem) is common across objects.  
2. Simplify Structure: Apply the `Ungroup` function to flatten complex data arrays into a single manageable format.  
   🔸 Specify the common nested property as the target to ungroup (e.g., locItem).  
   🔸 Confirm results return a flat table with all items.

powerapps
Ungroup(
   [
      // Object 1
      {locItem:[{Date: Today(), ID:0}]},

      // Object 2
      {locItem: DelegationPlayground}
   ],
   // The 'locItem' property is specified as the common property to ungroup
   locItem
)


## 🎉 Result
A streamlined, efficient data structure that is easier to manage and query, boosting app performance and user experience.

## 🌟 Key Advantages
🔸 Facilitates the integration of disparate data sources.  
🔸 Simplifies querying and data manipulation within the app.  
🔸 Enhances overall application efficiency and maintainability.

---

## 🎥 Video Tutorial
{% include video id="DAWOoWicDH8" provider="youtube" %}

---

## 🛠️ FAQ
**1. What is the main purpose of the Ungroup function in Power Apps?**  
It flattens nested tables or collections into a single level by ungrouping a specific nested property, making mixed data sources easier to work with.

**2. Can I use other functions to merge static and dynamic data?**  
Yes, you can also use the `Table` function, but `Ungroup` provides more flexibility when combining different data sources into one structure.

**3. Is Ungroup delegable with large data sets?**  
Ungroup itself isn’t delegable; however, it works effectively on locally loaded collections or static data after data is retrieved from delegable sources.


2024-05-10-powerplatformtip-113-combine-multiple-data-sources.md
