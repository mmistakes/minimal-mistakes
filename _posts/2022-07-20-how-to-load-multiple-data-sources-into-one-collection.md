---
title: "How to Load Multiple Data Sources into ONE Collection"
date: 2022-07-20
permalink: "/article/powerplatform/2022/07/20/how-to-load-multiple-data-sources-into-one-collection/"
updated: 2025-06-26
categories:
  - Article
  - PowerPlatform
excerpt: "Learn efficient techniques to combine multiple data sources into a single collection in PowerApps. This guide covers identical data sources, different data sources, and adding enriched data from lookups."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
  teaser: https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80
toc: true
toc_sticky: true
tags:
  - PowerApps
  - Collections
  - Data Sources
  - ClearCollect
  - AddColumns
  - PowerPlatform
  - Data Management
---

![Data Collections](https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80){: .align-center}

Often, data is not stored in just one place, but you need a combination of multiple data sources. While you could solve this with multiple collections, this is not always the most practical approach.

In the following examples, I'll show you how to combine identical data sources and different data sources, plus how to add enriched information from other data sources to your collection.

## ðŸš¨ Important Data Row Limit Consideration

**IMPORTANT**: Each data source has a Data Row Limit (default: 500 rows). With 2 data sources, you can load a maximum of 1,000 elements (500 from each data source).

**Note**: The following solutions only work if the columns of the tables match exactly by name. If you need only some identical columns, use `ShowColumns()`. If the data is identical but column names differ, use `RenameColumns()`.

## ðŸ’¡ Combine Two Identical Data Sources

When you have two data sources with the same structure:

```powerapps
ClearCollect(colTemp, DataBase1, DataBase2)
```

This will create a single collection containing all records from both data sources.

## ðŸ”€ Combine Two Different Data Sources

When combining different data sources into one collection:

```powerapps
ClearCollect(colTemp, DataBase1, 'Delegations Playground')
```

Both data sources must have matching column names for this to work properly.

## âž• Add Data from Other Data Sources (Lookup)

To enrich your collection with additional data from related sources:

```powerapps
ClearCollect(
    colTemp,
    AddColumns(
        DataBase2,
        "Animal",
        LookUp(
            DataBase1 As TEMP,
            TEMP.ID = ID
        ).Animal
    )
)
```

This formula:
1. Takes `DataBase2` as the base
2. Adds a new column called "Animal"
3. Populates it with data from `DataBase1` using a lookup based on matching ID

## ðŸŽ¯ Key Takeaways

- **Combine identical sources**: Use `ClearCollect(collection, source1, source2)`
- **Different sources**: Ensure column names match exactly
- **Enrich data**: Use `AddColumns()` with `LookUp()` for related data
- **Remember limits**: Each source contributes to the total row limit
- **Column matching**: Use `ShowColumns()` or `RenameColumns()` when needed

## ðŸ› ï¸ Best Practices

1. **Plan your data structure**: Ensure consistent naming across sources
2. **Consider performance**: Be mindful of the row limits per data source
3. **Use delegation**: Where possible, ensure your formulas are delegable
4. **Test with realistic data**: Verify your collections work with expected data volumes

This approach gives you powerful flexibility in combining and enriching your data sources within PowerApps collections.

*This article was originally published on Marcel Lehmann's blog and has been migrated to PowerPlatformTip for better accessibility and searchability.*


