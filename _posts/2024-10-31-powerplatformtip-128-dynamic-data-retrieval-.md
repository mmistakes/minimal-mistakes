---
title: "#PowerPlatformTip 128 – 'Dynamic Data Retrieval'"
date: 2024-10-31
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - PowerPlatform
  - JSON
  - ParseJSON
  - DynamicDataRetrieval
  - PowerPlatformTip
  - Marcel Lehmann
excerpt: "Use Parse JSON with dynamic keys in Power Automate to flexibly retrieve data without complex conditions."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
We often face the challenge of handling dynamic data in Power Automate without resorting to complex conditional structures like Switch or If statements. Whether it’s language variations, user roles, or specific message types, a flexible and scalable solution is needed.

## ✅ Solution
Using the Parse JSON action and dynamic keys, you can retrieve various information directly from a JSON structure. This allows you to pull different content (like greetings, settings, or user data) based on need, without additional effort.

## 🔧 How It's Done
Here's how to do it:
1. Create a JSON structure containing all possible data variations you need (e.g., for languages, roles, message types, etc.).  
   🔸 Define keys for each scenario such as greetings, permissions, and message types.  
   🔸 Store or reference the JSON in a variable or external file.  
2. Use a **Parse JSON** action in Power Automate to process this JSON data.  
   🔸 Provide the JSON content or variable to the action.  
   🔸 Generate or paste the schema using "Use sample payload to generate schema."  
3. With a dynamic query based on a key from the input (e.g., `triggerBody()['parameter']`), you can directly access the required value, eliminating the need for multiple If or Switch conditions.  
   🔸 Use `body('Parse_JSON')?[triggerBody()['parameter']]` to retrieve the value.  
   🔸 Handle missing keys with expressions like `coalesce()` for default values.

## 🎉 Result
Instead of complex conditions, you now have an agile, scalable solution that dynamically retrieves and processes data in real-time.

## 🌟 Key Advantages
🔸 No need for complex conditional logic  
🔸 Easily add new data variations by updating JSON  
🔸 Flexible integration across multiple workflows  

---

## 🎥 Video Tutorial
{% include video id="NuFd6myyUio" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I generate the JSON schema for the Parse JSON action?**  
You can copy a sample JSON payload and use the "Use sample payload to generate schema" button in the action to automatically create the schema.

**2. What happens if a key doesn't exist in the JSON?**  
The Parse JSON action will still run but return null for missing keys. Use expressions like `coalesce()` or conditional steps to provide default values.

**3. Can I use this approach for nested JSON objects?**  
Yes, dynamic queries can access nested objects by chaining property names, for example `body('Parse_JSON')?['data']?['key']`.
