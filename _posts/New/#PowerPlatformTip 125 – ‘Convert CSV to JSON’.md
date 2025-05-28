markdown
---
title: "#PowerPlatformTip 125 – 'Convert CSV to JSON'"
date: 2024-09-25
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerAutomate
  - PowerPlatform
  - PowerPlatformTip
  - CSV
  - JSON
  - DataTransformation
excerpt: "Convert CSV data into JSON in Power Automate using only standard actions without premium connectors or external services."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Need to convert CSV data into JSON in Power Automate without using premium connectors or external services?

## ✅ Solution
Use standard Power Automate actions to split CSV data and map it into JSON format quickly and directly, without relying on premium or other services.

## 🔧 How It's Done
Here's how to do it:
1. Split CSV into Lines  
   🔸 Use the Compose action with `@split(outputs('CSV_File'), outputs('NewLine'))` to break the CSV content into individual lines.  
2. Extract Field Names  
   🔸 Add another Compose action to split the first line (headers) using `@split(first(outputs('SplitByLines')), ',')`.  
3. Map Fields to JSON  
   🔸 Use the Select action to map each subsequent line to JSON format. Reference field names with `@{outputs('FieldNames')?[0]}` and map values with `@split(item(), ',')?[1]`, continuing for each required field.  
4. Count Fields  
   🔸 Add a Compose action to count the fields using `@length(outputs('FieldNames'))`.  
5. Parse to JSON  
   🔸 Finally, use the Parse JSON action with the mapped data to complete the transformation into JSON.

## 🎉 Result
Effortlessly convert CSV data into JSON within Power Automate using only standard actions. No premium connectors or external services required!

## 🌟 Key Advantages
🔸 Fully utilize standard Power Automate tools  
🔸 Fast and direct conversion without extra costs  
🔸 Simplifies data handling and integration

---

## 🎥 Video Tutorial
{% include video id="hCMduE19pDw" provider="youtube" %}

---

## 🛠️ FAQ
**1. Do I need premium connectors to convert CSV to JSON?**  
No, this approach uses only built-in Power Automate actions—no premium connectors or external services required.

**2. How can I handle CSV files with different delimiters?**  
Simply adjust the `split` function to use your delimiter, for example `@split(item(), ';')` for semicolon-separated files.

**3. What if header names contain spaces or special characters?**  
Use string functions like `replace()` to sanitize header values before mapping, ensuring valid JSON property names.


Filename: 2024-09-25-powerplatformtip-125-convert-csv-to-json.md