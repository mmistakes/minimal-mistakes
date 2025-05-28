---
title: "#PowerPlatformTip 105 – 'PowerApps – EnvironmentVariables Without Premium'"
date: 2024-02-27
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerApps
  - PowerAutomate
  - PowerPlatform
  - PowerPlatformTip
excerpt: "Access environment variables in PowerApps without premium by retrieving them via Power Automate at app start."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
Accessing environment variables in PowerApps requires a premium license, despite being freely available in Power Automate. This limitation contradicts the core advantage of environment variables: their ability to be used universally across platforms.

## ✅ Solution
Implement a straightforward Power Automate flow that retrieves environment variables at the PowerApp’s startup and transfers them into a local variable within the PowerApp.

## 🔧 How It's Done
Here's how to do it:
1. Create a flow within a solution to access environment variables, requiring only a trigger and a response.  
   🔸 Use the **When a HTTP request is received** trigger inside a Solution.  
   🔸 Define the response schema to include your environment variable.
2. Use a simple action to store and return the needed environment variable as a response.  
   🔸 Add the **Get environment variable** action and select your variable.  
   🔸 In the response action, return the variable in the JSON body.
3. Integrate this flow into your PowerApp, triggered by the OnStart event, to load the environment variable into a PowerApp variable.  
   🔸 In PowerApps, go to **OnStart** and call `YourFlow.Run()`.  
   🔸 Store the result: `Set(envVarValue, YourFlow.Run().variableName)`.

## 🎉 Result
Enables the use of environment variables in PowerApps without a premium license, enhancing flexibility and efficiency in app development.

## 🌟 Key Advantages
🔸 Universal Applicability: Environment variables can be used consistently across different platforms.  
🔸 Centralized Changes: Modifications to environment variables need to be made in only one place, simplifying maintenance.  
🔸 Cost Efficiency: Avoids the need for a premium license to access environment variables in PowerApps.

---

## 🎥 Video Tutorial
{% include video id="P5oEaxd3ARs" provider="youtube" %}
---