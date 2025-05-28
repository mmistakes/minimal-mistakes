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
---