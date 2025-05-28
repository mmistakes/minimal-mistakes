---
title: "#PowerPlatformTip 79 – 'Retrieve Record Details Post-Update'"
date: 2023-09-26
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - Record Retrieval
  - Patch Function
  - Form.LastSubmit
  - Workflow Automation
  - Canvas Apps
  - Data Integration
excerpt: "Retrieve details of newly created or updated records in Power Apps using Patch or Form.LastSubmit—access record IDs instantly for seamless workflow automation and data integration."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
When working with Power Apps, you often need to retrieve details of a record that has just been created or updated. This information might include the ID of the new/updated record, which is essential for further processes or user notifications.

## ✅ Solution
You can obtain the details of the newly created or updated record by wrapping a variable around the Patch function or using the Form.LastSubmit property to immediately access record details post-update.

## 🔧 How It's Done
Here's how to do it:
1. Using a Variable with Patch Function:  
   🔸 Syntax: `Set(RecordDetails, Patch(DataSource, BaseRecord, ChangeRecord))`  
   🔸 Example: `Set(NewRecord, Patch(Products, Defaults(Products), {Title:"New Product"}))`  
   🔸 Retrieval: Use `NewRecord.ID` to retrieve the ID of the newly created record.
2. Using Form.LastSubmit Property:  
   🔸 Setup: Ensure the form is properly linked to your data source.  
   🔸 Submission: Submit the form using `SubmitForm(FormName)`.  
   🔸 Retrieval: Use `FormName.LastSubmit.ID` to access the ID of the last submitted record.

## 🎉 Result
You have a straightforward method to retrieve essential details of records right after they are created or updated, facilitating seamless workflows and enhanced app functionalities.

## 🌟 Key Advantages
🔸 Streamlined Workflows: Quickly access new or updated record details, allowing for immediate follow-up actions.  
🔸 Enhanced User Experience: Provide users with instant feedback or next steps by leveraging the retrieved record details.  
🔸 Error Handling: Allows validating the success of record creation or update before proceeding, improving reliability.

---

## 🎥 Video Tutorial
{% include video id="nRE4IR19-cE" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I retrieve the ID of a newly created record using Patch?**  
Use a Set variable around your Patch function, for example: `Set(NewRecord, Patch(Table, Defaults(Table), {...}))`, then use `NewRecord.ID`.

**2. Can I use Form.LastSubmit with any form control?**  
Yes, as long as the form is linked to a data source and you use `SubmitForm(FormName)`, you can access `FormName.LastSubmit`.

**3. What if record creation fails?**  
Implement error handling by checking if the Patch returns a valid record or use `IfError` and `Notify` functions to inform users of failures.
