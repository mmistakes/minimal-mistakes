markdown
---
title: "#PowerPlatformTip 53 – 'Launch function'"
date: 2023-05-16
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerApps
  - PowerPlatform
  - PowerPlatformTip
  - Launch Function
  - App Integration
excerpt: "Use Launch function in PowerApps to easily open URLs, integrate with apps like Teams or SharePoint, and personalize user experiences based on roles."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
In PowerApps, guiding users to external websites, emails, phone calls, collaborations, or personalized dashboards can require custom connectors or manual prompts.

## ✅ Solution
Leverage the Launch function to open URLs, start emails or calls, integrate with other apps, and direct users to customized content.

## 🔧 How It's Done
Here's how to do it:
1. Open essential external resources using Launch  
   🔸 Example: Launch("https://www.example.com")  
   🔸 Example: Launch("mailto:info@example.com")  
   🔸 Example: Launch("tel:+1234567890")
2. Seamlessly integrate with other applications  
   🔸 Example: Launch("msteams://teams.microsoft.com/l/channel/...")  
   🔸 Example: Launch("onenote:https://example-my.sharepoint.com/personal/...")  
   🔸 Example: Launch("https://example.sharepoint.com/sites/...")
3. Personalize user experience based on user roles  
   🔸 Example:  
     If(User().Email = "manager@example.com",  
         Launch("https://www.example.com/manager-dashboard"),  
         Launch("https://www.example.com/employee-dashboard"))

## 🎉 Result
Users can instantly access relevant external resources, collaborate seamlessly, and receive a personalized in-app experience without additional configuration.

## 🌟 Key Advantages
🔸 Immediate access to websites, email and phone calls  
🔸 Seamless integration with Teams, OneNote, and SharePoint  
🔸 Customized user journeys based on roles

---

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. What is the Launch function in PowerApps?**  
The Launch function is a formula in PowerApps Canvas Apps that opens external URLs, initiates emails or calls, or launches other applications directly.

**2. Can I launch non-HTTP protocols (like mailto or tel) in PowerApps?**  
Yes, the Launch function supports various URI schemes including https, mailto, tel, msteams, onenote, and more.

**3. How do I personalize the Launch function for different users?**  
Use conditional expressions (e.g., If(User().Email = "...", ...)) to check user properties and direct them to different destinations accordingly.
---
