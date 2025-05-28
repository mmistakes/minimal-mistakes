markdown
---
title: "#PowerPlatformTip 64 – 'Comparing Lookup vs. First(Filter)'"
date: 2023-06-27
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - PowerPlatform
  - PowerPlatformTip
  - Lookup
  - Filter
  - First
  - Consistency
  - Performance
  - DataSource
excerpt: "Retrieve the first matching record with First(Filter()) for consistency and simplicity in Power Apps."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
In Power Apps, when you need to retrieve the first record that meets certain criteria from a data source, you have two functions—Lookup() and First(Filter())—which can cause confusion over which to use.

## ✅ Solution
Use First(Filter(Source, Condition)) consistently instead of Lookup(Source, Condition) to keep your code simple, uniform, and maintainable.

## 🔧 How It's Done
Here's how to do it:
1. Identify your criteria  
   🔸 Determine the data source (`Source`) and the filter condition.  
   🔸 Write `Filter(Source, Condition)` to narrow down records.  
2. Retrieve the first match  
   🔸 Wrap the filter in `First()`:  
     
     First( Filter( Source, Condition ) )
       
   🔸 Use this expression in variables, galleries, or formulas.  
3. Standardize across your app  
   🔸 Replace existing `Lookup(Source, Condition)` calls with `First(Filter(...))`.  
   🔸 Maintaining a single pattern improves readability and eases future updates.

## 🎉 Result
You now have a uniform approach to fetching the first matching record, making your Power Apps formulas more consistent and easier to read—without any performance penalty.

## 🌟 Key Advantages
🔸 Consistent coding pattern throughout your app.  
🔸 Improved readability and maintainability.  
🔸 No difference in performance compared to `Lookup()`.

---

## 🎥 Video Tutorial
{% include video id="3-FAa9GZgqQ" provider="youtube" %}

---

## 🛠️ FAQ
**1. What’s the difference between Lookup() and First(Filter())?**  
There is no functional or performance difference; both issue the same query. Using `First(Filter())` aligns with the common Filter pattern.

**2. When might I still use Lookup()?**  
You can use `Lookup()` interchangeably, but for consistency—and to leverage complex filtering scenarios—`First(Filter())` is preferred.

**3. Does switching to First(Filter()) impact performance?**  
No. Both functions generate the same server call, so performance remains identical.


Filename: 2023-06-27-powerplatformtip-64-comparing-lookup-vs-firstfilter.md