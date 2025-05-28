markdown
---
title: "#PowerPlatformTip 6 – 'formatDateTime in utcNow'"
date: 2022-12-15
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerPlatform
  - PowerPlatformTip
  - PowerAutomate
  - DateFormatting
  - utcNow
  - formatDateTime
  - FlowOptimization
excerpt: "Simplify date formatting in Power Automate by leveraging utcNow's direct formatting, reducing functions and improving flow efficiency."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Working with dates and times often requires using formatDateTime with utcNow to format values, adding unnecessary complexity and extra steps in your flow.

## ✅ Solution
Format the date directly within utcNow by passing your desired format string, eliminating the separate formatDateTime function.

## 🔧 How It's Done
Here's how to do it:
1. Use utcNow with format parameter  
   🔸 Instead of using `formatDateTime(utcNow(), 'your-format')`, call `utcNow('your-format')`.  
2. Apply your date-time format  
   🔸 Use the same format string you need directly inside `utcNow`.  
3. Test your flow  
   🔸 Run and verify your flow in a non-production environment to ensure it works as expected.

## 🎉 Result
By directly formatting dates within utcNow, you simplify and streamline your flows, reducing steps and improving readability and performance.

## 🌟 Key Advantages
🔸 Simplicity: Eliminates the need for an additional `formatDateTime` function.  
🔸 Efficiency: Reduces the number of steps in your flow, boosting performance.  
🔸 Clarity: Makes your flow easier to read and maintain.

---

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I format dates directly within utcNow?**  
You can pass your format string as an argument to `utcNow`, for example:  

utcNow('yyyy-MM-dd')


**2. Does this replace all uses of formatDateTime?**  
This technique applies when formatting the current UTC time. You may still use `formatDateTime` for other date expressions.

**3. What if I need a different time zone?**  
Use the `convertTimeZone` function before or after formatting to adjust the date-time value to your desired time zone.

