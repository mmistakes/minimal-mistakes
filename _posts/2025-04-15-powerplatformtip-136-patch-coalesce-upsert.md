---
title: "#PowerPlatformTip 136 – Patch Coalesce Upsert"
date: 2025-04-15
categories:
  - Article
  - PowerPlatformTip
tags:
  - PowerApps
  - PowerPlatform
  - Patch
  - Coalesce
  - Upsert
  - Efficiency
  - BestPractices
excerpt: "Learn how to use Patch() with Coalesce() in Power Apps to perform creates and updates in a single call, simplifying your code."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
toc: true
toc_sticky: true
---

## 💡 Challenge
In Power Apps, maintaining separate logic branches for “Create” and “Update” can bloat your formulas and introduce bugs. How can you streamline this into a single operation?

## ✅ Solution
Use a single `Patch()` call combined with `Coalesce()`. If `LookUp()` finds no record, `Coalesce()` falls back to `Defaults(DataSource)`, so the same call either updates an existing record or creates a new one.

## 🔧 How It’s Done
Here’s the step-by-step approach:
1. Define your data source (e.g., Contacts)  
   🔸 Make sure you have a collection or table connection, such as `Contacts`.  
2. Retrieve any existing record:  
   🔸 `varRecord = LookUp(Contacts, Email = varEmail)`  
   (This returns the record if it exists, otherwise Blank.)  
3. Use `Patch()` with `Coalesce()`:  
   🔸 
   Patch(
     Contacts,
     Coalesce(
       varRecord,
       Defaults(Contacts)
     ),
     {
       Email: varEmail,
       FullName: txtName.Text,
       Phone: txtPhone.Text
     }
   )  
   🔸 `Coalesce(varRecord, Defaults(Contacts))` ensures that if `varRecord` is Blank, the `Defaults(Contacts)` record template is used—resulting in a new record.  
4. Publish and test:  
   🔸 When a matching record exists, it’s updated. If not, a new record is created with the field values you provided.

## 🎉 Result
You’ve consolidated two code paths into one: your form logic is cleaner, easier to maintain, and less error-prone. Now “upsert” (update or insert) happens seamlessly with a single `Patch()`.

## 🌟 Key Advantages
🔸 One unified call instead of separate Create/Update branches  
🔸 No extra variables or `If()` checks needed  
🔸 Cleaner maintenance and improved performance  
🔸 Consistent behavior across SharePoint, Dataverse, or any Power Apps data source  

---

## 🛠️ FAQ
**1. Do I still need `If()` conditions to check for existing records?**  
Coalesce() handles the check for you. If `LookUp()` returns Blank, it automatically uses `Defaults()`, so `If()` is unnecessary.

**2. Will this approach work with Dataverse tables?**  
Yes. Both `Patch()` and `Coalesce()` behave identically in Dataverse. Just replace `Contacts` with your table name (e.g., `Accounts`).

**3. What if `LookUp()` returns more than one record?**  
Ensure your lookup criteria are unique (for example, use a primary key or unique field). Otherwise, `LookUp()` returns the first match and may lead to unexpected updates.
