markdown
---
title: "#PowerPlatformTip 3 – 'Advanced Filtering Array'"
date: 2022-12-12
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - FilterArray
  - AdvancedMode
  - Expressions
  - WorkflowOptimization
  - PowerPlatformTip
excerpt: "Supercharge your flows by unlocking the true potential of the ‘Filter Array’ action using Advanced Mode in PowerAutomate."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
At first glance, the ‘Filter Array’ action in PowerAutomate seems limited to basic filtering, making complex scenarios difficult to address. Users often find themselves chaining multiple actions or writing lengthy workarounds to achieve precise results.

## ✅ Solution
Enable the Advanced Mode in ‘Filter Array’ and craft custom expressions to perform sophisticated, precise filtering within a single action—simplifying your flow and reducing steps.

## 🔧 How It's Done
Here's how to do it:
1. Activate Advanced Mode:  
   🔸 Open the ‘Filter Array’ action in your flow.  
   🔸 Toggle on **Advanced Mode** to reveal the expression editor.  
2. Enter Custom Logic:  
   🔸 Use the expression editor to write bespoke filtering criteria (e.g., equals, contains, nested conditions).  
   🔸 Reference dynamic content and functions to match complex requirements.  
3. Execute Flow:  
   🔸 Save and run your flow.  
   🔸 Observe how ‘Filter Array’ applies your custom logic to return only the desired items.

## 🎉 Result
Harnessing Advanced Mode transforms ‘Filter Array’ into a powerful tool capable of handling intricate filtering tasks—reducing action count, improving performance, and increasing accuracy.

## 🌟 Key Advantages
🔸 Enhanced Flexibility: design any logical condition without UI limitations.  
🔸 Greater Efficiency: combine multiple filters into one action for faster runs.  
🔸 Exact Customization: tailor filters to specific data structures and scenarios.

---

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. What is Advanced Mode in Filter Array?**  
Advanced Mode unlocks the expression editor within the ‘Filter Array’ action, letting you write custom Power Automate expressions for complex filtering scenarios.

**2. How can I test my custom expressions before running the full flow?**  
Use a **Compose** action or the **Peek code** feature to evaluate your expression logic with sample data, ensuring it returns the expected output.

**3. Can Advanced Mode handle nested arrays or objects?**  
Yes—by leveraging functions like `item()`, `body()`, and nested indexing, you can filter deep structures (nested arrays/objects) directly in the ‘Filter Array’ action.


Filename: 2022-12-12-powerplatformtip-3-advanced-filtering-array.md