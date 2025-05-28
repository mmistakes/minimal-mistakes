---
title: "#PowerPlatformTip 29 – 'ParseJSON Description'"
date: 2023-02-15
categories:
  - Article
  - PowerPlatformTip
tags:
  - power automate
  - parsejson
  - dynamic content
  - json schema
  - automation
excerpt: "Add custom descriptions in Power Automate's Parse JSON action to organize and distinguish similar Dynamic Content entries. Improve flow clarity."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
When utilizing the Parse JSON action in Power Automate, distinguishing between multiple occurrences of the same name in Dynamic Content can be challenging, leading to confusion about which value corresponds to which name.

## ✅ Solution
Enhance clarity and organization of Dynamic Content by incorporating a custom description within the Parse JSON schema.

## 🔧 How It's Done
Here's how to do it:
1. Update the Parse JSON schema  
   🔸 After the `"type": "string"` line in your field definition, add `"Description": "This is the description for FieldName"`.  
   🔸 The schema snippet will look like this:  
   
   {
     "properties":
     {
       "FieldName":
       {
         "type": "string",
         "Description": "This is the description for FieldName"
       }
     }
   }
   
2. Apply and Test  
   🔸 Save your flow and refresh the Dynamic Content pane.  
   🔸 The custom description appears under the corresponding entry, helping you select the correct value.

## 🎉 Result
You can now easily distinguish between similar Dynamic Content entries, reducing errors and improving flow design clarity.

## 🌟 Key Advantages
🔸 Improved clarity in Dynamic Content selection.  
🔸 Reduces confusion and errors in flow design.  
🔸 Simple enhancement for better usability.

---

## 🛠️ FAQ
**1. Can I add descriptions to all field types in Parse JSON schema?**  
Yes, descriptions can be added to any field type (string, number, boolean, array, object) in your JSON schema.

**2. Do these descriptions affect the actual JSON parsing process?**  
No, descriptions are metadata that only affect the Power Automate interface and don't impact the parsing functionality.

**3. Is there a character limit for field descriptions?**  
While there's no strict limit, keep descriptions concise for better readability in the Dynamic Content pane.

---
