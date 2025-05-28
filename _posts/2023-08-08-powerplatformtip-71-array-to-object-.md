---
title: "#PowerPlatformTip 71 – 'Array to Object'"
date: 2023-08-08
categories:
  - Article
  - PowerPlatformTip
tags:
  - Power Automate
  - Data Transformation
  - Array to Object
  - JSON
  - Select Action
  - Replace Action
  - Low Code
  - Automation
excerpt: "Convert arrays to objects in Power Automate using Select and Replace actions for efficient data transformation, automation, and integration with downstream systems."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
You’re dealing with data that arrives as an array, but you need it in an object format. How can you efficiently transform this data?

## ✅ Solution
Use Power Automate’s Select and Replace actions to transform the data format without manually restructuring it.

## 🔧 How It's Done
Here's how to do it:
1. Select Action  
   🔸 Create a new array extracting keys and values from the original array.  
2. Replace Action  
   🔸 Use `@{replace(replace(replace(string(body('Select')),'},{',','),']',''),'[','')}` to transform the array into an object.

## 🎉 Result
You’ve successfully transformed array data into an object format!

## 🌟 Key Advantages
🔸 Efficiency: Transform data formats quickly, saving time and effort.  
🔸 Data Integrity: Maintain accuracy and ensure correct formatting for downstream processes.  
🔸 Versatility: Apply this technique to various data transformation scenarios.

---

## 🎥 Video Tutorial
{% include video id="Q0dQQ72AmO8" provider="youtube" %}

---

## 🛠️ FAQ
**1. Why use the Select and Replace actions in Power Automate?**  
Select helps extract key-value pairs into a new array, and Replace quickly converts that array string into an object without complex loops.

**2. Can this approach handle nested arrays or objects?**  
Yes, by adjusting the Select mapping and nested Replace patterns, you can tailor the method to more complex data structures.

**3. What happens if the array contains duplicate keys?**  
Duplicate keys will overwrite earlier entries in the resulting object. Ensure unique keys or handle duplicates before transformation.
