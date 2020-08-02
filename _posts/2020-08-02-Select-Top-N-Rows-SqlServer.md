---
title:  "Select Top N Rows from a table in Sql Server" 
categories: dev 
description: Select Top N Rows from a table in Sql Server
tag:  
  - sql
--- 

Selecting Top 10 rows is easy. Just do  
``` sql
SELECT TOP 10 * FROM PERSON
```

But what if the number of rows you want to get is dynamic? What if you have a variable `N` for the number of rows to return?  
Try this

``` sql
DECLARE @count INT = 5

SELECT *
FROM <<Table>>
WHERE <condition>
ORDER BY <<column>>
OFFSET 0 ROWS
FETCH FIRST @count ROWS ONLY
```

Hope this helped.
