---
title: "#PowerPlatformTip 110 – 'Protect SharePoint Data'"
date: 2024-04-17
categories:
  - Article
  - PowerPlatformTip
tags:
  - SharePoint
  - PowerApps
  - PowerPlatform
  - Security
  - Permissions
excerpt: "Use a SharePoint custom permission level to block direct access to lists and enforce interactions through Power Apps for improved data security."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
How do we ensure that users interact with SharePoint data strictly through Power Apps, preventing direct access and potential data integrity issues?

## ✅ Solution
The creation of a custom permission level for Power Apps users in SharePoint blocks direct access to SharePoint's application pages while maintaining necessary data interaction capabilities.

## 🔧 How It's Done
Here's how to do it:
1. Creating a Custom Permission Level:  
   🔸 Navigate to **Site Permissions** and select **Permission Levels** on the ribbon.  
   🔸 Choose the **Contribute** permission level to open its settings.  
   🔸 At the bottom, click **Copy Permission Level**.  
   🔸 Name the new level “Power Apps – Custom Permission” and add a description.  
   🔸 Remove or uncheck the **View Application Pages** permission under **List Permissions**.  
   🔸 Click **Create** to finalize the custom permission level.  
2. Assigning Custom Permissions to a New Group:  
   🔸 In **Site Permissions**, click **Create Group** on the ribbon.  
   🔸 Name the group (e.g., “Power App Users”) and assign a Site Owners group as its owner if desired.  
   🔸 Select the custom permission level you just created.  
   🔸 Click **Create** to establish the group.  
3. Adding Users:  
   🔸 Add users to the “Power App Users” group. They will interact with data through Power Apps without direct GUI access to SharePoint lists or application pages.  

## 🎉 Result
This approach strategically limits Power Apps users’ access, directing interactions through the app and enhancing data security. Users cannot directly access SharePoint lists via the GUI, aligning with best practices for data integrity and security.

## 🌟 Key Advantages
🔸 Data Security: Restricts unauthorized direct access to SharePoint data, ensuring interactions are filtered through Power Apps.  
🔸 Controlled Access: Empowers administrators to finely tune access permissions, fitting various operational needs without compromising security.  
🔸 Flexibility: Allows seamless integration of SharePoint as a data source while maintaining strict access controls.
---