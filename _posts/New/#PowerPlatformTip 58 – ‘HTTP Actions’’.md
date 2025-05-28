markdown
---
title: "#PowerPlatformTip 58 – 'HTTP Actions'"
date: 2023-06-06
categories:
  - Article
  - PowerPlatformTip
tags:
  - HTTP
  - API
  - Webhooks
  - PowerAutomate
  - PowerPlatform
  - PowerPlatformTip
  - MicrosoftGraph
excerpt: "Harness HTTP actions in PowerAutomate to interact with web services via HTTP requests."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
You need to integrate and automate tasks across various web services and APIs within PowerAutomate, but standard connectors don’t cover all scenarios.

## ✅ Solution
Leverage the built-in HTTP actions in PowerAutomate to send and receive HTTP requests, enabling flexible integration with REST APIs and custom services.

## 🔧 How It's Done
Here's how to do it:
1. Create and configure a flow  
   🔸 Open PowerAutomate, select a trigger (e.g., Manual, Scheduled, or HTTP request).  
   🔸 Name your flow and set initial parameters.
2. Add the HTTP action  
   🔸 Click **New step** and search for **HTTP**.  
   🔸 Choose from the available HTTP actions:  

   | Action                              | Description                                           | Type           | ActionType |
   |-------------------------------------|-------------------------------------------------------|----------------|------------|
   | HTTP to SharePoint                  | Manage SharePoint list items and files                | Standard 🌟    | Action     |
   | HTTP – Office 365 Outlook           | Send emails, schedule events, manage contacts         | Standard 🌟    | Action     |
   | HTTP – Office 365 Users             | Manage user profiles, group memberships               | Standard 🌟    | Action     |
   | HTTP – Office 365 Groups            | Create groups, manage members and settings            | Standard 🌟    | Action     |
   | HTTP – Office 365 Groups Mail       | Send group emails, manage group mail settings         | Standard 🌟    | Action     |
   | HTTP – Teams                        | –                                                     | Standard 🌟    | Action     |
   | HTTP + Swagger                      | Interact with any web API supporting HTTP             | Premium 💎     | Action     |
   | HTTP Webhook                        | Create event-driven workflows                         | Premium 💎     | Action     |
   | HTTP Response                       | Send a response to an HTTP request                    | Premium 💎     | Action     |
   | HTTP with Azure AD                  | Interact with web services using Azure AD authentication | Premium 💎  | Action     |
   | HTTP – PREMIUM                      | Execute high-performing HTTP requests                 | Premium 💎     | Trigger    |
   | HTTP Webhook – PREMIUM              | Create premium event-driven workflows                 | Premium 💎     | Trigger    |
   | HTTP + Swagger – PREMIUM            | Interact with premium APIs supporting HTTP            | Premium 💎     | Trigger    |
   | When an HTTP request is received   | Trigger your flow with an HTTP request                | Premium 💎     | Trigger    |

3. Configure the request details  
   🔸 Select the HTTP method (GET, POST, PUT, DELETE).  
   🔸 Enter the URI, headers, and body as required.  
   🔸 Set authentication type (None, Basic, OAuth via Azure AD).
4. Handle and parse the response  
   🔸 Add **Parse JSON** to extract returned data.  
   🔸 Use subsequent actions (e.g., Condition, Create item) to process results.

## 🎉 Result
By using HTTP actions, you can connect to any REST endpoint, extend your automations beyond built-in connectors, and streamline data exchange across platforms.

## 🌟 Key Advantages
🔸 Extend Your Reach: Connect to any REST API, including Microsoft Graph and third-party services.  
🔸 Granular Control: Define headers, methods, and authentication to suit complex scenarios.  
🔸 Efficiency & Flexibility: Build custom integrations without premium connector limitations.

---

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I authenticate an HTTP action using Azure AD?**  
Set the authentication type to “OAuth 2.0” in the HTTP action and provide your Azure AD app’s client ID, tenant ID, and secret under the connection settings.

**2. What’s the difference between standard and premium HTTP actions?**  
Standard HTTP actions (e.g., HTTP to SharePoint) are included in common plans, while premium actions (e.g., HTTP + Swagger) require a premium license for advanced API support.

**3. Can I trigger a flow via an incoming HTTP request?**  
Yes. Use the **When an HTTP request is received** trigger to expose an endpoint that starts your flow when called from external services.  
