---
title: "#PowerPlatformTip 100 – 'Bypassing Complexity in PowerAutomate'"
date: 2024-06-18
categories:
  - Article
  - PowerPlatformTip
tags:
  - Power Automate
  - JSON
  - Workflow Optimization
  - No-Code
  - Automation
  - Dynamic Data
  - PowerPlatform
  - Marcel Lehmann
excerpt: "Streamline Power Automate flows by replacing complex Switch and Condition actions with dynamic JSON objects and formulas for faster, more maintainable automation."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Standard use of Switch or Condition in Power Automate can often be bypassed for more streamlined processes.

## ✅ Solution
Pass a simple identifier to Power Automate. Use a dynamic formula to retrieve corresponding data, avoiding complex structures.

## 🔧 How It's Done
Here's how to do it:
1. Add a Compose action in Power Automate with a structured JSON object.  
   🔸 Use a JSON object with keys "A", "B" and "C".  
   🔸 Example:

{
  "A": {
    "Title": "Ok",
    "Description": "Text"
  },
  "B": {
    "Title": "Confirmed",
    "Description": "Approved"
  },
  "C": {
    "Title": "Denied",
    "Description": "Rejected"
  }
}

2. Use a dynamic formula to retrieve the desired value.  
   🔸 To get the Title: `outputs('Compose')?[InputValue]?['Title']`
   🔸 To get the Description: `outputs('Compose')?[InputValue]?['Description']`

## 🎉 Result
This method allows fetching specific data ('Title' or 'Description') for different entries ('A', 'B', 'C') without needing complex conditions or switches.

## 🌟 Key Advantages
🔸 Streamlines data retrieval  
🔸 Reduces workflow complexity  
🔸 Enhances performance  

---

## 🎥 Video Tutorial
{% include video id="RXQuxgn6xAY" provider="youtube" %}

---

## 🛠️ FAQ
**1. What are the benefits of using a structured JSON object instead of Switch or Condition?**  
Using structured JSON avoids multiple branches, simplifies maintenance, and speeds up data retrieval.

**2. Can this approach handle more than three cases?**  
Yes, you can add as many keys and values to the JSON object as needed.

**3. How do I handle missing or invalid input values?**  
Implement default values or wrap the expression with error handling, e.g. using `coalesce` or condition checks before accessing the value.

---