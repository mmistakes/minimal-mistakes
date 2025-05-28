markdown
---
title: "#PowerPlatformTip 96 – 'Scraping Web Data with Standard Connectors'"
date: 2023-12-21
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerAutomate
  - PowerPlatform
  - PowerPlatformTip
  - OneDrive
  - HTML
excerpt: "Cost-effectively fetch and store website content in Power Automate using the OneDrive connector, eliminating the need for premium connectors."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Fetching data from specific websites and storing it in Power Automate without premium connectors can be challenging. How to do this cost-effectively?

## ✅ Solution
Use the “Upload from URL” action in the OneDrive connector in Power Automate to fetch and store website content, eliminating the need for premium connectors.

## 🔧 How It's Done
Here's how to do it:
1. Fetch the Web Data  
   🔸 Employ the “Upload from URL” action in the OneDrive connector.  
   🔸 Input the URL of the website from which data is to be fetched.  
2. Store as HTML  
   🔸 Save the fetched content as an HTML file in OneDrive to keep the webpage’s full content, including its structure and text.  
3. Retrieve the Stored Data  
   🔸 Use the “Get file content” action in the OneDrive connector to access the HTML file.  
   🔸 This enables the retrieval of the entire webpage content as text for further processing or analysis.

## 🎉 Result
Achieve web data fetching, storing, and accessing using standard connectors in Power Automate. This method is cost-effective and bypasses the need for premium connectors.

## 🌟 Key Advantages
🔸 Cost-Efficient: Saves on costs by avoiding premium connectors.  
🔸 Versatile: Suitable for various websites.  
🔸 Integrated: Leverages OneDrive for easy data storage and access.

---

## 🎥 Video Tutorial
{% include video id="baBvK-764BU" provider="youtube" %}

---

## 🛠️ FAQ
**1. How can I fetch website data in Power Automate without premium connectors?**  
Use the OneDrive connector’s “Upload from URL” action to download the website content as a file, then retrieve it with “Get file content.”

**2. Can I fetch data from any website using this method?**  
Generally yes, but ensure you have permission and comply with the website’s terms of service to avoid being blocked or rate-limited.

**3. What file format will the web data be stored in?**  
The web data is stored as an HTML file in OneDrive, preserving the webpage’s structure and content for further analysis.

---
  
Filename: 2023-12-21-powerplatformtip-96-scraping-web-data-with-standard-connectors.md