---
title: "#PowerPlatformTip 24 – 'Merge arrays or tables'"
date: 2023-01-31
categories:
  - Article
  - PowerPlatformTip
tags:
  - power automate
  - arrays
  - tables
  - data manipulation
  - concat
excerpt: "Merge arrays or tables in Power Automate while preserving duplicates using concat and split functions. Simplify data manipulation workflows."
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

```text
split(
  concat(
    join(outputs('Compose_-_2_arrays')?['array1'], '||'),
    '||',
    join(outputs('Compose_-_2_arrays')?['array2'], '||')
  ),
  '||'
)
```

## 🎉 Result
You can now merge arrays or tables in Power Automate and keep all duplicates, giving you full control over your data.

## 🌟 Key Advantages
🔸 Preserves duplicates when merging arrays.  
🔸 Simple, no-code solution using built-in functions.  
🔸 Flexible for arrays or tables of any size.

---

## 🛠️ FAQ
**1. What happens if my array contains values that include the delimiter '||'?**  
Choose a unique delimiter that doesn't appear in your data, or use a more complex delimiter like '###DELIMITER###'.

**2. Can this method handle arrays with different data types?**  
Yes, but ensure all values can be converted to strings for the join operation, then convert back to appropriate types if needed.

**3. Is there a performance impact when merging large arrays?**  
For very large arrays, consider using the union() function for simple merging without duplicates, or batch processing for better performance.

---
