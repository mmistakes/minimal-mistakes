---
title:  "Skip Top N Rows from a table in Sql Server" 
categories: dev 
description: Skip Top N Rows from a table in Sql Server
tag:  
  - sql
--- 

What if you want to skip Top `N` rows while doing a `select` statement in `sql server`?
Try this

``` sql
DECLARE @count INT = 5

SELECT *
FROM <<Table>>
WHERE <condition>
ORDER BY <<column>>
OFFSET @count ROWS
```

Hope this helped.
