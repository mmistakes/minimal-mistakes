---
title: "Power Apps Combo Box DefaultSelectedItems from Shane Young"
date: 2021-04-26
permalink: "/article/powerplatform/2021/04/26/power-apps-combo-box-defaultselecteditems/"
updated: 2025-06-26
categories:
  - Article
  - PowerPlatform
excerpt: "Learn how to properly set DefaultSelectedItems in PowerApps ComboBox controls using tables, lookups, and manually-created records. A comprehensive guide by Shane Young."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
  teaser: https://img.youtube.com/vi/AXAbmy9zYTU/0.jpg
toc: true
toc_sticky: true
tags:
  - Shane Young
  - PowerApps
  - ComboBox
  - DefaultSelectedItems
  - Controls
  - PowerPlatform
  - Tables
  - Lookup
  - YouTube
---

A great summary of how to deal with DefaultSelectedItems in a ComboBox and how to set them using a table/lookup or a manually-created record.

{% include video id="AXAbmy9zYTU" provider="youtube" %}

## Mastering ComboBox DefaultSelectedItems by Shane Young

This comprehensive tutorial by **Shane Young** tackles one of the most common challenges PowerApps developers face: properly configuring **DefaultSelectedItems** in ComboBox controls.

### The DefaultSelectedItems Challenge

ComboBox controls in PowerApps offer powerful multi-select capabilities, but setting default selections can be tricky. Common issues include:
- **Type mismatches** between data sources and default values
- **Collection formatting** problems
- **Lookup complexities** when working with related data
- **Performance issues** with large datasets

## ðŸŽ¯ Shane's Comprehensive Approach

### Three Key Methods Covered

**1. Table-Based Defaults**
- Using existing data tables as the source
- Filtering records for default selection
- Maintaining data consistency

**2. Lookup-Based Defaults**
- Referencing related records
- Cross-table relationships
- Dynamic default selection

**3. Manually-Created Records**
- Building custom default collections
- Static default configurations
- Flexible data structures

## ðŸ’¡ Understanding DefaultSelectedItems Property

### Data Type Requirements
The DefaultSelectedItems property expects:
```powerapps
// Correct format - collection of records
[
    {ID: 1, Title: "Option 1"},
    {ID: 2, Title: "Option 2"}
]

// NOT a simple text list
["Option 1", "Option 2"]  // âŒ Wrong format
```

### Common Patterns

**Pattern 1: Filter from Data Source**
```powerapps
Filter(
    YourDataSource,
    SomeCondition = true
)
```

**Pattern 2: Lookup Related Records**
```powerapps
LookUp(
    RelatedTable,
    ID = CurrentRecord.RelatedID
)
```

**Pattern 3: Manual Record Creation**
```powerapps
Table(
    {ID: 1, Value: "Default Option 1"},
    {ID: 2, Value: "Default Option 2"}
)
```

## ðŸ”§ Implementation Strategies

### Strategy 1: Dynamic Defaults Based on User Context

```powerapps
// Set defaults based on current user's department
Filter(
    DepartmentOptions,
    Department = Office365Users.MyProfile().Department
)
```

### Strategy 2: Cascading ComboBox Defaults

```powerapps
// Child ComboBox defaults based on parent selection
Filter(
    ChildOptions,
    ParentID = ParentComboBox.Selected.ID
)
```

### Strategy 3: Multi-Table Lookup Defaults

```powerapps
// Combine data from multiple sources
ForAll(
    UserPreferences,
    LookUp(AvailableOptions, ID = PreferenceID)
)
```

## ðŸš€ Advanced Techniques

### Performance Optimization

**Technique 1: Pre-loaded Collections**
```powerapps
// On app start, create optimized collections
ClearCollect(
    DefaultSelections,
    AddColumns(
        UserDefaults,
        "FullRecord",
        LookUp(MasterData, ID = DefaultID)
    )
)
```

**Technique 2: Conditional Loading**
```powerapps
// Load defaults only when needed
If(
    !IsBlank(CurrentUser),
    Filter(Defaults, UserID = CurrentUser.ID),
    Blank()
)
```

### Error Handling

**Robust Default Setting**
```powerapps
// Handle missing or invalid defaults gracefully
IfError(
    Filter(DataSource, IsDefaultSelection),
    Table({ID: 0, Title: "No Default Available"})
)
```

## ðŸ“Š Real-World Use Cases

### Business Applications

**Employee Department Selection**
- Default to user's current department
- Allow selection of additional departments
- Maintain organizational hierarchy

**Project Assignment**
- Default to user's active projects
- Enable multi-project selection
- Filter by project status

**Product Categories**
- Default based on user preferences
- Support category hierarchies
- Enable bulk selection

### Technical Considerations

**Data Consistency**
- Ensure default records exist in the data source
- Handle deleted or archived records
- Validate record structure matches ComboBox items

**User Experience**
- Provide clear visual feedback for defaults
- Allow easy modification of selections
- Maintain selection state across sessions

## ðŸŽ¯ Best Practices from Shane's Tutorial

### Development Guidelines

1. **Always validate data types** between defaults and ComboBox items
2. **Use collections** for complex default logic
3. **Test with realistic data volumes** to ensure performance
4. **Implement error handling** for missing or invalid defaults
5. **Consider user context** when setting defaults

### Performance Tips

- **Pre-load static defaults** in collections
- **Use delegation-friendly** filtering where possible
- **Avoid complex lookups** in DefaultSelectedItems when possible
- **Cache frequently used** default configurations

## ðŸ”„ Troubleshooting Common Issues

### Issue 1: Type Mismatch Errors
**Solution**: Ensure DefaultSelectedItems returns the same record structure as ComboBox Items

### Issue 2: Performance Problems
**Solution**: Use collections and pre-filtered data instead of complex real-time queries

### Issue 3: Empty Defaults
**Solution**: Implement fallback logic with proper error handling

### Issue 4: Delegation Warnings
**Solution**: Move complex logic to collections created on app start

## ðŸ’¼ Enterprise Implementation

### Scaling Considerations
- **Centralized default logic** in component libraries
- **Configuration-driven** default settings
- **User preference** management systems
- **Audit trails** for default selections

### Security Aspects
- **Row-level security** for default records
- **User permission** validation
- **Data governance** compliance
- **Privacy considerations** for user defaults

## ðŸŽ–ï¸ About Shane Young

Shane Young continues to demonstrate expertise in:
- **Practical PowerApps development** techniques
- **Real-world problem solving**
- **Performance optimization** strategies
- **User experience** improvements

This DefaultSelectedItems tutorial showcases Shane's ability to break down complex concepts into actionable, implementable solutions.

## ðŸŽ¯ Key Takeaways

- **Understand data type requirements** for DefaultSelectedItems
- **Use appropriate patterns** based on your data structure
- **Implement proper error handling** for robust applications
- **Consider performance implications** of default selection logic
- **Test thoroughly** with realistic data scenarios
- **Follow delegation best practices** for scalable solutions

This comprehensive guide ensures developers can confidently implement DefaultSelectedItems in any ComboBox scenario, from simple static defaults to complex dynamic multi-table lookups.

---

*You can see this video here on my blog because I have rated this video with 5 stars in my YouTube video library. This video was automatically posted using PowerAutomate.*


