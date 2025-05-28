---
title: "#PowerPlatformTip 100 – 'Bypassing Complexity in PowerAutomate'"
date: 2024-01-18
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - JSON
  - ComposeAction
  - DynamicFormulas
  - WorkflowOptimization
  - Performance
  - ComplexityReduction
  - PowerPlatformTip
excerpt: "Simplify Power Automate flows by using a structured JSON object in a Compose action and dynamic expressions to replace complex switches or conditions."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Standard use of Switch or Condition actions in Power Automate can lead to complex, hard-to-maintain flows when handling many cases.

## ✅ Solution
Use a single Compose action with a structured JSON object and dynamic expressions to fetch data based on an input identifier, avoiding multiple branches.

## 🔧 How It's Done
Here's how to do it:
1. Add a **Compose** action with a structured JSON object:  
   🔸 Define keys (e.g. "A", "B", "C") and map each to an object containing properties like Title and Description.  
   🔸 Ensure the JSON is valid and all entries are included.  
   
   ```json
   {
     "A": { "Title": "Ok",        "Description": "Text"     },
     "B": { "Title": "Confirmed", "Description": "Approved" },
     "C": { "Title": "Denied",    "Description": "Rejected" }
   }
   ```
   
2. Fetch the required value using a dynamic expression:  
   🔸 To get the Title based on an input variable (e.g. `variables('InputValue')`), use:  
     `outputs('Compose')?[variables('InputValue')]?['Title']`  
   🔸 To get the Description, use:  
     `outputs('Compose')?[variables('InputValue')]?['Description']`

## 🎉 Result
You can retrieve specific data (Title or Description) for any case (A, B, C) with a single Compose action and expression, eliminating complex switches and reducing action count.

---
