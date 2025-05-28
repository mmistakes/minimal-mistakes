---
title: "#PowerPlatformTip 66 – 'Load Data Source Structure'"
date: 2023-07-07
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - Data Source Structure
  - Collections
  - Patch
  - Data Integrity
  - App Performance
  - Power Platform
excerpt: "Load the structure of a data source into a Power Apps collection to prepare for patch operations, ensure data integrity, and boost app performance with efficient schema alignment."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
You need to load a data source structure into a collection, especially if you plan to patch the collection back to the data source later on.

## ✅ Solution
Use the Filter function in Power Apps to load the structure of the data source into your collection efficiently.

## 🔧 How It's Done
Here's how to do it:
1. Use Filter to load the data source structure  
   🔸 Apply `Filter(COLLECTION, Defaults(Source))` to create a blank record schema in your collection.  
   🔸 Ensures your collection matches the data source fields for smooth patch operations.  
2. Populate the collection with the proper structure  
   🔸 Use `ClearCollect(MyCollection, Filter(COLLECTION, Defaults(MyDataSource)))`.  
   🔸 Replace `MyDataSource` with your actual data source name.  

## 🎉 Result
You've set up a structured collection that ensures smoother data handling and an enhanced app experience.

## 🌟 Key Advantages
🔸 Validation & Data Integrity: Minimizes risks of data mismatches and validation errors by matching the data source schema.  
🔸 Performance Boost: Improves app performance by working with in-memory collections, reducing direct calls to the data source.  
🔸 Data Preparation: Simplifies data transformation and preparation in a structured collection before sending it back.

---

## 🛠️ FAQ
**1. Why use Defaults(MyDataSource) in the Filter function?**  
Defaults(MyDataSource) returns a blank record with the correct schema for the data source. By filtering with that, you create a collection that matches the data source structure without retrieving actual data.

**2. Will this method retrieve any existing records from the data source?**  
No. `Filter(COLLECTION, Defaults(MyDataSource))` only uses the Defaults record to shape your collection's schema. To load actual data, use other functions like `Filter(MyDataSource, ...)` or `Collect(MyCollection, MyDataSource)`.

**3. How do I patch data back to the data source using this structured collection?**  
After setting up the structured collection, use `Patch(MyDataSource, Defaults(MyDataSource), MyCollection)` or loop through the collection to update or create records. Having matching fields ensures smooth data operations.

---
