---
title: "#PowerPlatformTip 69 – 'Optimize Loading with Fullscreen Reference'"
date: 2023-07-25
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - Fullscreen
  - App Loading
  - Performance
  - Canvas Apps
  - App.width
  - App.height
  - Optimization
excerpt: "Speed up Power Apps loading by using App.width and App.height for fullscreen dimensions—improve performance, user experience, and deliver faster app startup times."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
In a world where every second counts, speeding up your Power Apps loading process can be a real game-changer. You’re looking for ways to make your Power Apps load faster.

## ✅ Solution
Reference App.width and App.height for fullscreen dimensions instead of Parent to make dimensions available immediately and reduce loading time.

## 🔧 How It's Done
Here's how to do it:
1. Use 'App' for dimensions  
   🔸 'App' loads immediately, whereas 'Parent' follows a sequential loading process.  
   🔸 Ensures fullscreen dimensions are available right away.
2. Optimize loading time  
   🔸 Significantly reduce your Power App's loading time.  
   🔸 Deliver a smoother and more efficient user experience.

## 🎉 Result
You’ve significantly reduced your Power App’s loading time, delivering a seamless and efficient user experience!

## 🌟 Key Advantages
🔸 Performance Boost: Improve app performance and reduce loading time by using 'App' references.  
🔸 User Experience: Faster loading leads to a smoother and more efficient user experience.  
🔸 Efficiency: This simple change enhances overall app efficiency, saving valuable time for users.

---

## 🛠️ FAQ
**1. Why should I use App.width and App.height instead of Parent.width and Parent.height?**  
Because 'App' loads immediately, making dimensions available faster, whereas 'Parent' relies on a sequential loading process.

**2. Will this change affect my existing app layouts?**  
No, switching the reference to 'App' only changes how dimensions are retrieved; your layout remains the same but loads faster.

**3. Can I use this optimization for other components in Power Apps?**  
Yes, referencing 'App' properties can be applied whenever you need immediate global app context to improve performance.
