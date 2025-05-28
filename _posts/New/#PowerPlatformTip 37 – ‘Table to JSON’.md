markdown
---
title: "#PowerPlatformTip 37 – 'Table to JSON'"
date: 2023-03-21
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerAutomate
  - PowerPlatform
  - PowerPlatformTip
  - JSON
  - ParseJSON
  - TableToJSON
  - DataTransformation
excerpt: "Working with two-column 'Name'/'Value' tables in Power Automate can be tedious when accessing individual entries efficiently."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Working with two-column tables, specifically 'Name' and 'Value' pairs, in Power Automate can be tedious when trying to access individual entries efficiently.

## ✅ Solution
A simple method to streamline the selection of individual entries within such tables by converting the data into a JSON record and utilizing the "Parse JSON" action.

## 🔧 How It's Done
Here's how to do it:
1. Convert your 'Name' and 'Value' table into a JSON record.  
   🔸 This transformation allows for more flexible data manipulation.  
   🔸 Prepares data for the Parse JSON action.
2. Use the "Parse JSON" action in Power Automate.  
   🔸 You define a JSON schema to enforce structure.  
   🔸 Enables straightforward access to any entry within your flow.

## 🎉 Result
An enhanced Power Automate experience where accessing and selecting data from two-column tables becomes seamless, saving time and reducing complexity.

## 🌟 Key Advantages
🔸 Efficiency: Quickly convert tabular data into a manipulable format.  
🔸 Simplicity: Access individual data points easily without complex expressions.  
🔸 Flexibility: Adapt and extend this method for various data structures beyond simple name-value pairs.

---

## 🎥 Video Tutorial
{% include video id="Oxf1mnN6k0M" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I generate the JSON record from my table?**  
In Power Automate, use a Compose action or variable assignment to map each 'Name'/'Value' pair into a JSON object, then pass it to the Parse JSON action.

**2. Can this method handle tables with dynamic rows?**  
Yes. Once converted to JSON, the Parse JSON action uses the schema to recognize all properties, so you can access entries even if the number of rows changes.

**3. What if I need to process multiple entries at once?**  
You can loop through the JSON properties or use an Apply to each action on an array of objects, allowing you to handle multiple entries in your flow.


Filename: 2023-03-21-powerplatformtip-37-table-to-json.md