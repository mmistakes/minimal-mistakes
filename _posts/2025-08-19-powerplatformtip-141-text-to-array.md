---
title: "#PowerPlatformTip 141 - Text to Array"
date: 2025-08-19
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - Expression
  - split
  - Array
  - DataProcessing
  - PowerPlatformTip
excerpt: "Convert multiline text into an array in Power Automate using split() — ideal for processing lists from Excel, emails or Power Apps."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
How do you process a copied multiline text block (each line representing a record — e.g., IDs, email addresses, URLs) in a Power Automate flow without manual splitting? Manual steps do not scale and are error-prone.

## ✅ Solution
Use the `split()` expression to turn the multiline string into an array. With a simple separator (a line break, comma, or any character), you get an array you can loop through using "Apply to each".

## 🔧 How It's Done
1. Add a Compose action and paste your multiline text into it. Name this action `DataInput`.  
2. Add a second Compose action containing only a line break (press Enter in the input). Name it `Separator`.  
3. Add an Apply to each control.  
4. Set the input of the loop to the expression:
```
split(outputs('DataInput'), outputs('Separator'))
```
5. Inside the loop, use `Current item` to process each line (for example: trim, validate, call an API, or create records).

## 🎉 Result
Your flow now accepts any multiline text block and processes each line as a separate item. No more copy-paste, no manual cleanup — just reliable automation that scales.

## 🌟 Key Advantages
- Saves time by automating repetitive data preparation  
- Flexible: works with lists from Excel, emails, Power Apps, or paste operations  
- Reduces human errors from manual handling  
- Scales to hundreds or thousands of lines without extra effort

## 🎥 Video Tutorial
{% include video id="spDM1XqmwuE" provider="youtube" %}

## 🛠️ FAQ

**What if my data is comma-separated instead of line breaks?**  
- Replace the `Separator` Compose content with a comma. The same `split()` expression will produce the array.

**Can the text originate from a Power App?**  
- Yes. Pass a multiline text input from Power Apps into the flow; the split logic remains identical.

**How to handle empty lines created by accidental extra newlines?**  
- Add a condition inside the loop to check if `trim(Current item)` is not empty before processing.
