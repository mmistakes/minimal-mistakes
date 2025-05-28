markdown
---
title: "#PowerPlatformTip 24 – 'Merge arrays or tables'"
date: 2023-01-31
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - PowerPlatform
  - Arrays
  - Tables
  - concat
  - split
  - duplicates
  - DataManipulation
  - PowerPlatformTip
excerpt: "Learn to merge two arrays in Power Automate while preserving duplicates by combining concat and split functions with a unique delimiter."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Ever find yourself wanting to merge two arrays in Power Automate but need to keep those duplicates? The `union` function removes duplicates, preventing you from retaining all elements.

## ✅ Solution
Concatenate the arrays with a unique delimiter and then split the resulting string back into an array, preserving duplicates.

## 🔧 How It's Done
Here's how to do it:
1. Conjure Your Arrays Together  
   🔸 Use the `concat` function to merge both arrays into one.  
   🔸 Includes duplicates in the merged array.
2. Add a Unique Delimiter ‘||’  
   🔸 Use `'||'` to mark the boundary between arrays.  
   🔸 Ensures you can split back correctly.
3. Split to Reveal  
   🔸 Apply the `split` function with `'||'` to recreate the array.  
   🔸 Duplicates are preserved in the final output.

text
split(
  concat(
    join(outputs('Compose_-_2_arrays')?['array1'], '||'),
    '||',
    join(outputs('Compose_-_2_arrays')?['array2'], '||')
  ),
  '||'
)


## 🎉 Result
You can now merge arrays in Power Automate without losing duplicates, enabling richer data manipulation in your flows.

## 🌟 Key Advantages
🔸 Inclusivity: All elements, including duplicates, are retained.  
🔸 Flexibility: Easily adapt the approach for simple lists or complex data structures.  
🔸 Power: Extends data manipulation capabilities beyond standard functions.

---

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. Why use concat and split instead of union?**  
Union removes duplicates by default; concat and split preserve duplicates.

**2. What delimiter should I use?**  
Use a unique delimiter (e.g., ‘||’) not present in your data to avoid accidental splits.

**3. How does this handle empty or nested arrays?**  
Empty arrays result in empty elements between delimiters; you may need to filter out empty items. Nested arrays require additional handling.

---
