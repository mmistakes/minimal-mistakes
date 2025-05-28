---
title: "#PowerPlatformTip 44 – 'Calculate the Distance'"
date: 2023-04-13
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - PowerAutomate
  - Distance Calculation
  - Geolocation
  - Haversine
  - Location Services
  - Marcel Lehmann
excerpt: "Learn how to calculate the distance between two locations in PowerApps and Power Automate using geolocation and the Haversine formula for accurate results."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
How can you calculate the distance between two points (e.g., addresses or coordinates) in Power Platform apps?

## ✅ Solution
Use the Haversine formula or built-in geolocation services in PowerApps/Power Automate to determine the distance between two locations. This is useful for logistics, field service, or travel apps.

## 🔧 How It's Done
1. Collect latitude and longitude for both locations (e.g., via user input or device location).
2. Apply the Haversine formula in PowerApps or a custom Power Automate step to calculate the distance.
3. Display or use the result in your app or flow.

## 🎉 Result
You can now provide users with real-time distance calculations for a variety of business scenarios.

---

## 🌟 Key Advantages
- Accurate distance measurement
- Supports logistics, travel, and field service scenarios
- Can be automated or used interactively

---

## 🛠️ FAQ
**1. What is the Haversine formula?**
A mathematical formula to calculate the great-circle distance between two points on a sphere given their longitudes and latitudes.

**2. Can I use this in both PowerApps and Power Automate?**
Yes, you can implement the logic in both platforms using formulas or expressions.

**3. Are there built-in connectors for geolocation?**
PowerApps and Power Automate support geolocation via device sensors or external APIs.
