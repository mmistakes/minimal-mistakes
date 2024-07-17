---
title: "MySQL for Oracle Developers"
tags:
  - Oracle
  - MySQL
---
{:right: style="float: right" width="200px"}
![mysql](https://www.mysql.com/common/logos/powered-by-mysql-167x86.png){:width="200px"}\\
*Not MariaDB*
{:right}

I've been using Oracle DBMS for years, and sometimes it's hard to differentiate what is an "Oracle built-in" and a standard SQL feature.

In teaching a Database Modeling course at RIT in MySQL I have found out that there are some differences between Oracle and MySQL:

- MySQL comparisons are case-insensitive, so `SELECT * FROM table WHERE name='ABC';` returns the same results as `SELECT * FROM table WHERE name='abc';`

- MySQL table names *are* case-sensitive but only on Linux.

- MySQL has a richer set of datatypes, especially for integer types: `tinyint`, `smallint`, `mediumint`, `int`, and `bigint`, but is missing `BLOB`/`CLOB` and native(-ish) XML.

- Single and double-quotes are allowed for string literals (but cannot be mixed).

- Executing queries in an Oracle database are done by specifying the database name in the connect string. MySQL supports the `USE` command to choose a database to run.

- There are a lot fewer functions available than in Oracle (which someone could write a an-oracle-function-a-day series and have a year's worth of material).

- `CHECK` constraints are "supported" in DDL but before MySQL 8 are only verified to be syntatically correct.

- `MINUS` is not supported, but can be simulated with `NOT IN (<subquery>)`

- Concatenation operator `||` isn't supported, must use `CONCAT()`. 
  MySQL allows string literals to be concatenated without operators (`SELECT 'foo' 'bar';`).
  
- tables can be aliased by backticks with or without the `AS` keyword because " and ' are both allowed for string literals.
Oracle lets you use a `"quoted"` value for a table alias without `AS`, for example `SELECT 'foo' AS foo_col, 'bar' "bar_col" FROM dual;`

- nested queries must have a table alias in MySQL even if table name isn't referenced. For instance, `AS my_sales` is mandatory in this statement: `SELECT count(*) from (SELECT distinct * from sales) AS my_sales;`

- Joins inside nested queries need to have unique column names in MySQL. Oracle will rename the columns (generally by appending "\_1" to the duplicate column name) but an error is returned.
For instance, given tables **STOCKTRADES(cusip, price, trade_date, commission)** and **BONDTRADES(cusip, price, trade_date, commission)**.
In Oracle, `SELECT count(*) FROM (SELECT * FROM stocktrades UNION SELECT * FROM bondtrades) AS all_trades;`

- `NVL()` is not supported, use `COALESCE()` instead

- Good summary is at [this SlideShare][1] but it's sometimes not clear what the original Oracle analog would be and it's a little dated.

[1]: https://www.slideshare.net/ronaldbradford/mysql-for-oracle-developers
