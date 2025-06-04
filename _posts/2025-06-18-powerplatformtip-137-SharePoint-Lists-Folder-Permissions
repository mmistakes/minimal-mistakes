---
title: "PowerPlatformTip 137 – SharePoint Lists Folder Permissions"
date: 2025-06-05
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerPlatform
  - PowerApps
  - PowerAutomate
  - SharePoint
  - FolderPermissions
excerpt: "Enable folder-based permissions in SharePoint lists to streamline access control without Power Automate flows."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## Sentences Summary
By enabling folders in your SharePoint list’s Advanced Settings, you can create department-level folders and assign permissions directly to them, so every item inside inherits those permissions automatically. This eliminates the need for complex Power Automate flows that grant access on an item-by-item basis. You’ll streamline security management and boost performance.

💡 Challenge  
Teams often need granular, department-specific permissions on list items and end up building elaborate Power Automate flows to assign rights per item, which is time-consuming and hard to maintain.

✅ Solution  
Activate the folder feature in your list’s Advanced Settings, create one folder per department, and set unique permissions at the folder level so that all contained items inherit them automatically.

🔧 How It’s Done  
1. Go to your SharePoint list, click the gear icon → List settings.  
2. Select Advanced settings → Folder: Enable “Make ‘New Folder’ command available” → OK.  
🔸 Return to the list and use **New → Folder** to create department-named folders.  
🔸 Click the folder’s “…” → Details pane → Manage access → Stop inheriting permissions.  
🔸 Remove existing groups and grant the supervisor or department group the appropriate rights.

🎉 Result  
You now have a folder-based structure where each department’s items automatically inherit the correct permissions, with no additional flows required—saving you setup and maintenance time and improving list performance.

🌟 Key Advantages  
🔸 Quick setup using built-in list settings (no extra tools needed)  
🔸 Automatic inheritance cuts down on manual effort and errors  
🔸 Clear separation of access by department  
🔸 Scales well for lists up to 100,000 items (beyond that, folder-level breaks in inheritance aren’t supported)

---

## 🛠️ FAQ
**1. How do I enable folders in a SharePoint list?**  
Go to **List settings → Advanced settings →** turn on “Make ‘New Folder’ command available” and save.

**2. Do items inherit folder permissions by default?**  
Yes, list items automatically inherit whatever permissions are set on their parent folder.

**3. Are there any limits to using folder-based permissions?**  
If a folder or list exceeds 100,000 items, you cannot break permission inheritance for that folder.
