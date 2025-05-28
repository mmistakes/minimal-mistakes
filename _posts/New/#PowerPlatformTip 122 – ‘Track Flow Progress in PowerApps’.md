markdown
---
title: "#PowerPlatformTip 122 – 'Track Flow Progress in PowerApps'"
date: 2024-08-28
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - PowerAutomate
  - PowerPlatform
  - StateLog
  - FlowProgress
  - Monitoring
  - RealTime
excerpt: "Monitor Power Automate flow progress in PowerApps by creating a StateLog and using a timer to fetch real-time updates."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
You want to monitor the progress of a flow (Power Automate) that you started from a PowerApp. Unfortunately, Power Automate doesn’t support updating the status directly in PowerApps using the “Respond to PowerApps” action multiple times. So how can you track the flow’s progress within your app?

## ✅ Solution
Use a StateLog table to record each milestone of your flow and employ a timer in your PowerApp to poll the StateLog for real-time progress updates.

## 🔧 How It's Done
Here's how to do it:
1. Set Up StateLog Table  
   🔸 Create a Dataverse table (StateLog) with fields for Status, Timestamp, and FlowID.  
   🔸 Grant Power Automate and PowerApps necessary permissions to read/write entries.  
2. Create Flow  
   🔸 Add actions in your flow to write milestone entries to the StateLog.  
   🔸 Use "Add a new row" or "Update a row" at each important step.  
3. Implement in PowerApp and Display Progress  
   🔸 Add a gallery or label in your app bound to StateLog entries filtered by FlowID.  
   🔸 Insert a Timer control to refresh the data every few seconds for live updates.  

## 🎉 Result
By setting up the StateLog and regularly polling it with a timer, you can see live updates of each flow milestone directly within PowerApps, improving transparency and user experience.

## 🌟 Key Advantages
🔸 Real-time monitoring of flow progress  
🔸 Flexible display options in PowerApps (text, icons, gauges)  
🔸 Improved user engagement and transparency

---

## 🎥 Video Tutorial
{% include video id="" provider="youtube" %}

---

## 🛠️ FAQ
**1. How do I set up the StateLog table?**  
To set up the StateLog, create a Dataverse (or SharePoint) table with fields like Status, Timestamp, and FlowID. Ensure your flow and app both have permissions to read and write entries.

**2. What polling interval should I use for the timer in PowerApps?**  
A polling interval of 1–5 seconds strikes a good balance between real-time feedback and performance. Adjust based on app complexity to avoid excessive API calls.

**3. Can I monitor multiple flows concurrently?**  
Yes. Include a unique FlowID in each StateLog entry and filter your PowerApp controls by FlowID to track multiple flows in parallel.


Filename: 2024-08-28-powerplatformtip-122-track-flow-progress-in-powerapps.md