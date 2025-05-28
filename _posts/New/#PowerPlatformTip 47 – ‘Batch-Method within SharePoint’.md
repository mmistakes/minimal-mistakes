markdown
---
title: "#PowerPlatformTip 47 – 'Batch-Method within SharePoint'"
date: 2023-04-25
categories:
  - Article
  - PowerPlatformTip
tags:
  - SharePoint
  - PowerAutomate
  - Batch
  - Performance
  - API
  - Flow
  - PowerPlatformTip
excerpt: "Use the SharePoint batch method in Power Automate to create up to 1,000 items in a single call, boosting performance and reducing API calls."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Creating SharePoint list items one by one in Power Automate can be slow and consumes many API actions, especially when dealing with hundreds of items.

## ✅ Solution
Leverage the SharePoint REST batch endpoint to bundle up to 1,000 create-item requests into a single HTTP call.

## 🔧 How It's Done
Here's how to do it:
1. Add an HTTP request action in Power Automate.  
   🔸 Site Address: Your SharePoint site URL.  
   🔸 Method: POST  
   🔸 URL: `_api/$batch`  
2. Configure headers and body.  
   🔸 Headers:  
     - Accept: `application/json;odata=verbose`  
     - Content-Type: `multipart/mixed; boundary="batch_12345"`  
   🔸 Body: Construct a batch payload with multiple subrequests for creating items.  
3. Parse the response.  
   🔸 The HTTP action returns a multipart response containing each subresponse.  
   🔸 Use a “Parse JSON” action to read success or failure for each item.  
4. Handle errors and logging.  
   🔸 Loop through responses to identify and retry failed creations.  
   🔸 Log results or send notifications as needed.

## 🎉 Result
By batching requests, you can create up to 1,000 SharePoint list items in a single operation, dramatically improving flow performance and reducing the number of API calls.

## 🌟 Key Advantages
🔸 Significantly enhanced performance for large item creations.  
🔸 Drastically reduced Power Automate API action usage.  
🔸 Simplified flow maintenance and error handling.

---

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. What is the SharePoint batch method?**  
The batch method uses the `_api/$batch` endpoint to combine multiple REST requests into one HTTP call, enabling up to 1,000 operations at once.

**2. How many items can I create in a single batch?**  
You can include up to 1,000 create-item requests in one batch payload.

**3. Do I need special permissions to use the HTTP action?**  
Yes, your connection in Power Automate must have permission to call the SharePoint REST API and create items in the target list.


Filename: 2023-04-25-powerplatformtip-47-batch-method-within-sharepoint.md