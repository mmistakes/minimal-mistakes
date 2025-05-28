---
title: "#PowerPlatformTip 3 – 'Advanced Filtering Array'"
date: 2022-12-13
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerPlatform
  - PowerAutomate
  - Array
  - Filtering
  - Expressions
  - Marcel Lehmann
  - FlowTips
  - Logic
excerpt: "Filter arrays with advanced logic in Power Automate—learn how to use expressions like 'and', 'equals', or 'greater' in a single step."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Filtering an array in Power Automate can be tricky when multiple conditions need to be met. The default filter action might not support advanced logic like combining `and`, `equals`, or `greater` easily.

## ✅ Solution
Use the **Filter array** action with custom expressions written directly in the advanced editor to filter complex arrays based on multiple conditions.

## 🔧 How It's Done
Here's how to do it:

1. Add a “Filter array” action.  
   🔸 Choose the array you want to filter.  
   🔸 Go to “Edit in advanced mode”.

2. Write the expression.  
   🔸 Example:
   ```plaintext
   @and(greater(item()?['age'], 25), equals(item()?['country'], 'Switzerland'))
   ```  
   🔸 This filters for people older than 25 and located in Switzerland.

3. Use outputs in subsequent actions.  
   🔸 The filtered result can now be looped or used in further actions.  
   🔸 Helps streamline complex logic handling.

## 🎉 Result
Efficiently filtered arrays, improved readability, and more precise logic control in your flows—without cluttering with multiple conditions.

## 🌟 Key Advantages
🔸 Combine multiple conditions in a single filter  
🔸 Leverage built-in expressions for dynamic filtering  
🔸 Keep flows lean and easy to maintain

---

## 🎥 Video Tutorial
{% include video id="t07UQRcMN8k" provider="youtube" %}

---

## 🛠️ FAQ
**1. Can I filter arrays using OR conditions as well?**  
Yes! Use the `or()` function just like `and()`. Example:  
```plaintext
@or(equals(item()?['status'], 'Active'), equals(item()?['status'], 'Pending'))
```

**2. Can I nest conditions?**  
Absolutely. Combine `and()`, `or()`, `not()`, and others as needed to form advanced logic.

**3. What if a field is missing in some array items?**  
Use the `?` operator (`item()?['field']`) to avoid runtime errors due to null values.

---
