---
title: "#PowerPlatformTip 108 – 'Double-Click Magic in PowerApps'"
date: 2024-04-05
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerApps
  - PowerPlatform
  - PowerPlatformTip
  - DoubleClick
  - UserExperience
  - Timer
  - Popup
excerpt: "Distinguish single and double clicks in PowerApps to trigger different functionalities, bringing desktop-like efficiency without clutter."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
How can we utilize both single and double clicks on the same button in PowerApps to perform separate actions, reflecting the state of interaction more accurately?

## ✅ Solution
Implement a method that leverages a combination of a click counter and a timer to differentiate between single and double clicks, executing actions accordingly.

## 🔧 How It's Done
Here's how to do it:
1. Click Tracking  
   🔸 Increment `locPopUp` variable to count clicks.  
   🔸 Use in OnSelect:  
   powerapps
   UpdateContext({locPopUp: locPopUp + 1})
   
2. Timer Initiation  
   🔸 Start the timer by setting `locPopUpTimer` to true.  
   🔸 Use in OnSelect:  
   powerapps
   UpdateContext({locPopUpTimer: true});
   
3. Timer Configuration  
   🔸 Set the timer’s Duration to 1000 (milliseconds).  
   🔸 Enable AutoStart on the timer control.  
4. Action Determination  
   🔸 In the timer’s OnTimerEnd, check the `locPopUp` count.  
   🔸 Reset `locPopUpTimer` to false:  
   powerapps
   UpdateContext({locPopUpTimer: false})
---