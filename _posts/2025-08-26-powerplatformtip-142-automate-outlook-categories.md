---
title: "#PowerPlatformTip 142 - Automate Outlook Categories"
date: 2025-08-26
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerAutomate
  - Outlook
  - MicrosoftGraph
  - Automation
  - Productivity
  - PowerPlatformTip
excerpt: "Learn how to automatically set categories for Outlook meetings using a standard, non-premium Power Automate action. Save time and stay organized with this simple tip."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

Tired of manually categorizing your Outlook meetings? This simple tip shows how to use Power Automate to automatically set categories for calendar events. This keeps you organized with almost no effort.

## 💡 Challenge
How can you ensure all important meetings in your Outlook calendar are consistently categorized without doing it by hand? Manually adding categories takes time and you might forget sometimes, especially when you have a busy schedule. This can lead to an unorganized calendar.

## ✅ Solution
Use a Power Automate flow with the standard Office 365 Outlook connector to find and update your calendar events automatically. This flow can be triggered on a schedule or by a button. It will loop through your meetings and apply a new category, ensuring everything is perfectly organized without you having to think about it.

## 🔧 How It's Done
1.  Start your flow with a trigger, like a manual button or a schedule.
2.  Use a 'Compose' action to define the new category you want to add (e.g., "NewCategory").
3.  Add the 'Get calendar view of events (V3)' action to fetch meetings within a specific date range.
4.  Insert a 'For each' loop to process every event found.
5.  Inside the loop, add the 'Send an HTTP request' action from the Office 365 Outlook connector.
6.  Set the Method to `PATCH` and the URI to:
https://graph.microsoft.com/v1.0/me/events/@{items('For_each')?['id']}

7.  In the Body, add the following JSON to set the category:

{ 
  "categories": @{outputs('Compose_-_New_Category')} 
}

8.  Save and test the flow to see your meeting categories get updated automatically.

## 🎉 Result
Your Power Automate flow now runs in the background, applying your designated category to all relevant meetings. Your calendar is instantly more organized and easier to filter. You can now find specific types of meetings with just a click, all without needing a premium license.

## 🌟 Key Advantages
- Accessibility: This solution uses only standard connectors, so no premium Power Automate license is required.
- Time-Saving: It frees you from the boring task of manually updating calendar entries.
- Powerful Customization: Using the Graph API through this action allows for more advanced updates than standard actions permit.

## 🛠️ FAQ

**Is this really not a premium feature?**  
- That's correct. While the general 'HTTP' connector is premium, the 'Send an HTTP request' action found within the Office 365 Outlook connector is included with standard M365 licenses and is designed to interact with the Microsoft Graph API for Outlook.

**How can I add a category without removing existing ones?**  
- Before your PATCH action, add another 'Send an HTTP request' (from the Outlook connector) with the GET method to the same URI to read the event's current categories. Then, use expressions to combine the existing categories with your new one and use that result in your PATCH request.

**Can I update other details besides the category?**  
- Yes. The `PATCH` method can update many properties of an event. For example, you could change the 'showAs' status (like from "Free" to "Busy"), modify the body, or update the subject by including those fields in the JSON body of your request.
