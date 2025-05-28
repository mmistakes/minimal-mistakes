markdown
---
title: "#PowerPlatformTip 74 – 'Elevated Permissions'"
date: 2023-08-22
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - PowerAutomate
  - ElevatedPermissions
  - Impersonation
  - DataConnections
  - SharePoint
  - Security
excerpt: "Use Power Automate to run PowerApps data connections with elevated permissions, allowing users to perform actions beyond their normal access rights."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
You want to run data connections in PowerApps with elevated permissions, allowing users with limited access to perform actions they normally couldn’t, like creating items in a SharePoint list they only have read access to.

## ✅ Solution
Use Power Automate flows to run data connections in PowerApps with elevated permissions. This approach allows you to impersonate as an admin or a different user, similar to the Impersonation Step action in SharePoint designer workflows.

## 🔧 How It's Done
Here's how to do it:
1. PowerApps Security  
   🔸 Understand how PowerApps security works with data connections and sharing.  
   🔸 Ensure connectors and app sharing roles are configured correctly.
2. Power Automate Integration  
   🔸 Call a Power Automate flow from Power Apps using the V2 connector.  
   🔸 Build the flow to connect to data sources with elevated permissions.
3. Impersonation  
   🔸 Use the “Run-only users” setting in your flow to specify an admin or service account.  
   🔸 Grant only the intended users permission to trigger the flow.

## 🎉 Result
You’ve successfully set up PowerApps to run data connections with elevated permissions, allowing users to perform actions beyond their normal permissions!

## 🌟 Key Advantages
🔸 Enhanced User Experience: Users can perform actions in PowerApps beyond their normal permissions, improving their experience and productivity.  
🔸 Security & Flexibility: This approach maintains security while providing flexibility in how data connections are run in PowerApps.  
🔸 Seamless Integration: PowerApps and Power Automate work together seamlessly, opening up new possibilities for app functionality.

---

## 🎥 Video Tutorial
{% include video id="ts-ggDAy7IQ" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I grant elevated permissions without exposing credentials?**  
Use the ‘Run-only users’ setting in Power Automate: the flow runs under its owner's credentials, so app users don’t need to know service account details.

**2. Can any user trigger the flow with elevated rights?**  
Only users explicitly added as run-only users can trigger the flow; the Power Apps V2 connector enforces this access control.

**3. Are there any licensing requirements for elevated flow execution?**  
The flow executes under the owner’s license; ensure the owner has the required connector and premium licenses so the flow can run with elevated permissions for all users.

---
