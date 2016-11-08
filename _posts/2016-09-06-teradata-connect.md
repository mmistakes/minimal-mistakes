---
layout: simple
title: Using JDBC connection to access Teradata
tags: 
  -Teradata
  -SQL
  -R
---

# FIRST POOOST!

This is my first post, how exciting! Finally I took my first step towards making a website to record my trajectory on becoming a **Data Scientist**. Here I will be presenting some of my current works and studies. Hope you enjoy!

Actually I have been working along a Business Intelligence team that works with Teradata. Since R is my favourite tool and SQL is very limited, I searched and found a way to connect to the database. 

Before I show how I did this, it's cool having a first look on ODBC and JDBC connections (my case).

# Accessing the database

ODBC and JDBC are a standard interface between a database (like Teradata) and an application (like R) that accesses the data in the database. Having a standard enables any application front end to access any database back end by using SQL. The code that forms this interface is a driver. A JDBC driver is a software component enabling a Java application to interact with a database. 

# Teradata

Unfortunatly, I always have a lot of adversities doing my analisies because of the IT sector from the companies I worked. After some tries, I could have the *ENORMOUS PRIVILEGE* of having a Teradata Studio on my machine, a client based graphical interface used to perform database administration tasks on the Teradata Database.

Teradata Studio really helped me along many basic analytics tasks. But, as always, I end up doing my analysis in R. For this, I had to stabilish a JDBC connection with Teradata Database.

# JDBC Connection

First step! Find the JDBC driver that Teradata Studio already use or download [here](http://downloads.teradata.com/download/connectivity/jdbc-driver) 

``` r
# Ubuntu - Conexao JDBC
library(RJDBC)
drv = JDBC("com.teradata.jdbc.TeraDriver",
           classPath = "/media/matheusrabetti/Sistema/teradatajbc/terajdbc4.jar")
drv = JDBC("com.teradata.jdbc.TeraDriver",
           classPath = "/media/matheusrabetti/Sistema/teradatajbc/tdgssconfig.jar")
```

And easy as it seems we just connect.

``` r 
conn = dbConnect(drv,
                 "jdbc:teradata://DatabaseServerName/TMODE=ANSI/CHARSET=UTF-8",
                 "user",
                 "password")
```

Obviously you are doing all this to connect to a specific data. So this is how you find it:

``` r 
db_list_tables(conn)
``` 

Now ... have fun sending your SQL queries.

``` r
dbGetQuery(conn, 
          "SELECT ano_Base, subsetor_ibge, setor_ibge, MUNICIPIO,
            SUM(ESTOQUE) AS estoque
          from DEV_ODS.rais_cnae  
          group by ano_Base, subsetor_ibge, setor_ibge, MUNICIPIO;")
```
