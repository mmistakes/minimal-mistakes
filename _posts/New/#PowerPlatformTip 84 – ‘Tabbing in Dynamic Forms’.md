markdown
---
title: "#PowerPlatformTip 84 – 'Tabbing in Dynamic Forms'"
date: 2023-10-31
categories:
  - Article
  - PowerPlatformTip
tags:
  - Marcel Lehmann
  - PowerApps
  - PowerPlatform
  - PowerPlatformTip
  - Dynamic Forms
  - TabKey
  - Gallery
  - Sequence
excerpt: "When creating dynamic forms with galleries in Power Apps, Tab key issues like flickering or non-functioning can occur when binding directly to a collection."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
When creating a dynamic form using a gallery in Power Apps, you may encounter issues with the Tab key causing flickering or not functioning correctly. This often happens when the gallery is directly bound to a collection.

## ✅ Solution
Instead of directly binding the gallery to the collection, use a sequence that matches the number of rows in the original collection. This will allow the Tab key to function correctly without causing flickering.

## 🔧 How It's Done
Here's how to do it:
1. Create a sequence using the Sequence function that matches the number of rows in your original collection.  
   🔸 Use `Sequence(CountRows(YourOriginalCollection))`
2. Bind this sequence to your gallery.  
   🔸 Set the **Items** property of the gallery to the sequence
3. Update your **OnChange** Patch and the **Default** properties to match this new setup.  
   🔸 Adjust the **OnChange** property to use `Patch` with the sequence-driven items  
   🔸 Update the **Default** property to reference the current item from the sequence
4. Additional Method  
   🔸 Use the `UpdateIf` function to modify specific elements in the gallery, effectively 'patching' the relevant data item as an alternative or complementary approach

## 🎉 Result
A more functional and user-friendly dynamic form in Power Apps, eliminating flickering and improving the usability of the Tab key.

## 🌟 Key Advantages
🔸 Improved usability: Tab key works as expected, enhancing user experience  
🔸 No flickering: Eliminates distracting flicker, making the form more stable  
🔸 Data integrity: Ensures accurate data handling while improving functionality

---

## 🎥 Video Tutorial
{% include video id="y1Zy-tckjV8" provider="youtube" %}

---

## 🛠️ FAQ
**1. Why does directly binding a gallery to a collection cause tabbing issues?**  
Direct binding resets the gallery context on each keystroke, leading to loss of focus and flickering.

**2. How do I determine the correct sequence length?**  
Use `Sequence(CountRows(YourOriginalCollection))` to generate a list that matches the number of records in your collection.

**3. When should I use the UpdateIf method?**  
Use `UpdateIf` when you need to patch specific items without rebuilding the entire record set, offering more granular control.


Filename: 2023-10-31-powerplatformtip-84-tabbing-in-dynamic-forms.md