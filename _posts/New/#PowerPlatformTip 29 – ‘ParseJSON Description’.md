markdown
---
title: "#PowerPlatformTip 29 – 'ParseJSON Description'"
date: 2023-02-15
categories:
  - Article
  - PowerPlatformTip
tags:
  - ParseJSON
  - PowerAutomate
  - DynamicContent
  - JSONSchema
  - FlowDesign
  - PowerPlatformTip
  - PowerPlatform
  - Automation
excerpt: "Organize and distinguish similar Dynamic Content entries in Power Automate by adding custom descriptions in the Parse JSON action."
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
A more intuitive and manageable way to work with Dynamic Content in Power Automate, significantly reducing the risk of errors when dealing with multiple occurrences of the same name.

## 🌟 Key Advantages
🔸 **Improved Clarity:** Custom descriptions make it easier to understand the context and purpose of each piece of Dynamic Content.  
🔸 **Enhanced Organization:** Keeps your flow design tidy and well-documented, facilitating easier maintenance and updates.  
🔸 **Increased Accuracy:** Minimizes confusion and improves the accuracy of your flow's logic by clearly identifying each data element.

---

## 🎥 Video Tutorial
{% include video id="sh2QDZouFU0" provider="youtube" %}

---

## 🛠️ FAQ
**1. Can I include descriptions for nested JSON properties?**  
Yes, you can add the "Description" property to any level of the schema, including nested objects and arrays, to clarify complex structures.

**2. Will these descriptions appear when sharing the flow with others?**  
Yes, custom descriptions are part of the schema and visible to anyone editing the flow, ensuring consistency across teams.

**3. Does the "Description" property impact the schema validation?**  
No, Power Automate ignores unknown properties during schema validation, so adding "Description" has no adverse effects.


Filename: 2023-02-15-powerplatformtip-29-parsejson-description.md