---
title: "PowerPlatformTip 138 – Graph API HTTP"
date: 2025-06-25
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - GraphAPI
  - HTTP
  - MicrosoftEntraID
  - PowerPlatformTip
excerpt: "Learn how to use the preauthorized HTTP with Microsoft Entra ID connector in Power Automate to call Microsoft Graph without custom app registration."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Calling Graph APIs in Power Automate traditionally meant registering an Azure AD app, setting up client secrets or certificates, and configuring complicated OAuth flows – slows you down and breaks sometimes.

## ✅ Solution
Use the built-in “HTTP with Microsoft Entra ID (preauthorized)” action, sign in once, and point both the Base Resource URL and the Application ID URI to `https://graph.microsoft.com`.

## 🔧 How It's Done
Here's how to do it:
1. Add the “HTTP with Microsoft Entra ID (preauthorized)” action to your flow  
   🔸 Authentication type is already set to “Log in with Microsoft Entra ID”.  
2. Base Resource URL:  
   🔸 `https://graph.microsoft.com`  
3. Microsoft Entra ID Resource URI:  
   🔸 `https://graph.microsoft.com`  
4. Choose your HTTP method and endpoint (e.g. `GET /v1.0/me`)  
5. Run the flow – the connector fetches and injects the token for you  

## 🎉 Result
You get JSON responses from Graph in seconds, no app registration, secrets, or manual token handling needed.

## 🌟 Key Advantages
🔸 Zero custom app setup in Azure AD  
🔸 Automatic token acquisition and renewal  
🔸 Easily extend to any Graph endpoint  

---

## 🛠️ FAQ
**1. What permissions does it use?**  
It leverages your own delegated permissions (e.g. `User.Read`).

**2. Can I use POST or PATCH methods?**  
Yes – just pick the method and supply your body/headers as usual.

**3. How do I fetch Teams data?**  
Change the endpoint to `/v1.0/teams/{team-id}`; the base URL stays the same.
