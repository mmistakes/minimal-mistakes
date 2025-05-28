markdown
---
title: "#PowerPlatformTip 23 – 'Filter Blank'"
date: 2023-01-26
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - Gallery
  - Filtering
  - isblank
  - CanvasApp
  - UserInput
  - PowerPlatformTip
  - DataSource
excerpt: "Learn to show all gallery items when a PowerApps filter input is empty by using the isblank condition alongside your filtering logic."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Filtering galleries in PowerApps based on user input (like text input, dropdown, or combo box) is common. But what if you want to display all items when no input is provided?

## ✅ Solution
Use the `|| isblank(YOUR FILTERINPUT)` condition in your filter formula to show all items when the filter input is empty.

## 🔧 How It's Done
Here's how to do it:
1. Create a gallery and set up your filter inputs (e.g., text input, dropdown, or combo box).  
2. Apply the following formula to your gallery’s Items property:  
   
   Filter(YourDataSource, Condition || isblank(YOUR FILTERINPUT))
     
   🔸 YourDataSource is the source of your data.  
   🔸 Condition is your filtering condition (e.g., `TextInput.Text = ThisItem.Field`).  
   🔸 YOUR FILTERINPUT is the input control (e.g., TextInput, Dropdown).

## 🎉 Result
When the filter input is empty, the gallery will show all items. If an input is provided, the gallery will filter based on the specified condition.

## 🌟 Key Advantages
🔸 Simplifies gallery filtering logic.  
🔸 Enhances user experience by dynamically displaying all or filtered data.  
🔸 Reduces the need for multiple filtering conditions.

---

## 🎥 Video Tutorial
{% include video id="LsgqI7lM4qM" provider="youtube" %}

---

## 🛠️ FAQ
**1. Can I combine this with multiple filter conditions?**  
Yes. You can chain multiple conditions using logical operators (e.g., `&&` or `||`) alongside `isblank` to handle empty inputs for each filter.

**2. Does `isblank` handle both empty and null values?**  
Yes. The `isblank` function in PowerApps returns true for both empty strings and null values, ensuring your gallery displays all items when appropriate.

**3. Will this method work with dropdown or combo box controls?**  
Absolutely. The `isblank` check works with any input control, including dropdowns, combo boxes, and date pickers. Just reference the control name in your formula.

---


Filename: 2023-01-26-powerplatformtip-23-filter-blank.md