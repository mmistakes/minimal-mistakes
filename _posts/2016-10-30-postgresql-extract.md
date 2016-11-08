---
layout: single
title: Extract Data - Data Warehouse
description: Dealing with large files - Part 2
tags: 
    - Big Data
    - R 
    - PostgreSQL
    - Pentaho ~ BI
---

# Storing data

Computing in parts is a good choice but we can optimize our reading process storing the data in a database system.
Spliting our file on many smaller parts makes the process of reading the file to memory RAM hard - 
for each file we call a reading function. It really slows down the whole process.

There are others advantages on storing data on databases:

* Simultaneos access
* Security
* Integrity
* Atomicity

# PostgreSQL

My choice of relational database management systems (RDBMS) is PostgreSQL.
PostgreSQL is open-source and free, yet a very powerful relational database management system and
is not just a relational database management system but an objective one - with support for nesting, and more.


# How does it work?

The procedures are simple:

1. Store big data in a data warehouse.
2. Pass subsets of data from warehouse to R.
3. Transform R code, pass to warehouse.

## The history of parsing a file

First of all, it's necessary to create the table where you are going to write the file. 
Every file field needs to have a column and type, just like this:


``` SQL
CREATE TABLE rais 2015
(var1 char(2),
var2 integer,
var3 numeric,
var4 varchar);
```

But ... I don't know those parameters. How many chars the field have? I could have determined as varchar every field and 
update my table inside PostgreSQL. But, for big data it's not good to let the transfomation happens later. So I decided to
read some rows in **R** of one file and predict the whole structure.

To read my file I'll use **data.table**:

``` R
library(data.table)
readLines(readLines('~/Documents/Database/RAIS/2015/vinc/BA2015.txt', 1, 
          encoding = 'latin1')
[1] "Bairros SP;Bairros Fortaleza;Bairros RJ;Causa Afastamento 1;Causa Afastamento 2;
Causa Afastamento 3;Motivo Desligamento;CBO Ocupação 2002;CNAE 2.0 Classe; ... "

fread(input = '~/Documents/Database/RAIS/2015/vinc/BA2015.txt',
      sep = ';', header = T, encoding = 'Latin-1',
      nrows = 10000, stringsAsFactors = F) -> rais_samp
```

To discover the maximum of chars number of every field in the file apply a function that returns the maximum chars number:
``` R
sapply(rais_samp, FUN = function(x) {max(nchar(x))} )
		Bairros SP	  Bairros Fortaleza                Bairros RJ       Causa Afastamento 1 
                        4                         4                         4                         2 
      Causa Afastamento 2       Causa Afastamento 3       Motivo Desligamento       CBO Ocupacacao 2002 
                        2                         2                         2                         6 
          CNAE 2.0 Classe            CNAE 95 Classe              Distritos SP       Vinculo Ativo 31/12
                        5                         5                         9 			      1
```

I will list some problems I had:

* PostgreSQL don't seems to understand numeric entries with "," decimal.
* Distritos_SP have empty spaces before the text entry and R trims in reading.
* Each columns have a different *null* entry.

So... some fields I called as *varchar* and Distritos_SP as char(20). Reading the file is easy:

``` SQL
COPY rais2015 FROM '/home/mrabetti/Documents/Database/RAIS/2015/vinc/BA2015.txt' 
	ENCODING 'Latin-1'
	DELIMITER ';' 
```

Inside Postgresql I altered the table to correct the problems:

``` SQL
ALTER TABLE rais2015
ALTER COLUMN Vl_Rem_Janeiro_CC TYPE NUMERIC USING CAST(REPLACE(Vl_Rem_Janeiro_CC, ',', '.') AS NUMERIC);

UPDATE rais2015
	SET
	bairros_sp = NULLIF(bairros_sp, '{ñ c'),
	bairros_fortaleza = NULLIF(bairros_fortaleza, '{ñ c'),
	bairros_rj = NULLIF(bairros_sp, '{ñ c'),
	distritos_sp = NULLIF(distritos_sp, '{ñ class}'),
	regioes_adm_df = NULLIF(regioes_adm_df, '0000');

ALTER TABLE rais2015
ALTER COLUMN distritos_sp TYPE CHAR(9) USING TRIM(distritos_sp);
```

Unfortunatly it's not that simple. My file have 57 fields and 18 numeric fields with "." decimal.
This formula resulted in a SQL code of 151 lines. Have a look on the *create table* command:
``` SQL
CREATE TABLE rais2015
(Bairros_SP char(4),
Bairros_Fortaleza char(4), 
Bairros_RJ char(4), 
Causa_Afastamento_1 integer,
Causa_Afastamento_2 integer,
Causa_Afastamento_3 integer, 
Motivo_Desligamento char(2),
CBO_Ocupacao_2002 char(6),
CNAE20_Classe char(5),
CNAE95_Classe char(5), 
Distritos_SP char(20), 
Vinculo_Ativo_3112 integer, 
Faixa_Etaria integer,
Faixa_Hora_Contrat integer, 
Faixa_Remun_DezemSM integer, 
Faixa_Remun_MediaSM integer, 
Faixa_Tempo_Emprego integer,
Escolaridade_apos2005 integer, 
Qtd_Hora_Contr integer,
Idade integer,
Ind_CEI_Vinculado integer,
Ind_Simples integer,
Mes_Admissao integer, 
Mes_Desligamento integer, 
Mun_Trab char(6), 
Municipio char(6), 
Nacionalidade integer,
Natureza_Juridica char(4),
Ind_Portador_Defic integer,
Qtd_Dias_Afastamento integer, 
Raca_Cor integer,
Regioes_Adm_DF char(4),
Vl_Remun_Dezembro_Nom varchar,
Vl_Remun_DezembroSM varchar,
Vl_Remun_Media_Nom varchar,
Vl_Remun_MediaSM varchar, 
CNAE20_Subclasse char(7), 
Sexo_Trabalhador integer,
Tamanho_Estabelecimento integer,
Tempo_Emprego varchar, 
Tipo_Admissao integer, 
Tipo_Estab integer, 
Tipo_Estab_Desc varchar, 
Tipo_Defic integer,
Tipo_Vinculo integer, 
IBGE_Subsetor char(2),
Vl_Rem_Janeiro_CC varchar,
Vl_Rem_Fevereiro_CC varchar,
Vl_Rem_Marco_CC varchar,
Vl_Rem_Abril_CC varchar,
Vl_Rem_Maio_CC varchar,
Vl_Rem_Junho_CC varchar,
Vl_Rem_Julho_CC varchar,
Vl_Rem_Agosto_CC varchar,
Vl_Rem_Setembro_CC varchar, 
Vl_Rem_Outubro_CC varchar,
Vl_Rem_Novembro_CC varchar);
```

Just saying that in the SQL code file this occupied just 6 lines. Sorry ... it'll get worse. 
The sadest part is that there is no recursive or looping way of parsing the 27 files that compounds my rais2015 file.
I started reading one by one and inserting into my first readed file:

``` SQL
INSERT INTO rais2015
SELECT * FROM rais2015_tmp;
```

In the third file I was sure that there was some other way of doing this!

# Pentaho - PDI

Working along a BI team I learned that this process was known as a ETL (Extract Transform Load). This is my simple exercise flow:

1. The extraction of my origin flat files (*txt*).
2. Transform the columns types correctly and set as null where it should be done.
3. Load and pile those transformed files on a database - Postgresql.

I discovered a great open source ETL tool, Pentaho Data Integration (or Kettle). 

Heading on the pratice, on PDI you can set some steps. The picture shows the steps running.

![etl-running](/assets/posts/bigdata/etl-tansformation.png)

This is a basic and pretty fast ETL procedure. The speed is 16.258 rows per second. Let's have a look deeper on what's going on each step. First the *Leitura RAIS 2015* is a reading setup. I'm defining the directory where my 27 files are and a regular expression to capture only the files I want on this folder.

![etl-input](/assets/posts/bigdata/etl-fileinput.png)

On the *Fields* tab I can define the type, mask, lenght, decimal, when is null and even trim my variable. That comes in handy! Just what I was looking for. Clicking on *Get Fields*, PDI will sample your file and give you a hint on those classifiers entries.

![etl-fields](/assets/posts/bigdata/etl-fields.png)

Next, I want to load this on a PostgreSQL table. PostgreSQL Bulk Loader is the faster way to make this happen and it's easily definable. 

![etl-load](/assets/posts/bigdata/etl-load.png)

The transformation process took **1h:14** to complete. It read 72 millions of lines 

![etl-end](/assets/posts/bigdata/etl-finished.png)

In the end I created a simple primary key, a new column storing the State - *UF* - and indexed this column as I normally do my analysis by states:

``` SQL
ALTER TABLE rais_vinc15 ADD COLUMN id_rais15 SERIAL PRIMARY KEY;

ALTER TABLE rais_vinc15 ADD UF SMALLINT;

UPDATE rais_vinc15
SET UF = CAST(SUBSTRING("município", 1, 2) AS SMALLINT);

CREATE INDEX uf_index on rais_vinc15 (UF);
```

This is how I built the infrastructure to extract data and analyse it. I'll continuous to the analysis process on R, just showing a start.

``` R

library(dplyr)
library(data.table)
library(ggplot2)
library(RpostgreSQL)

# Create connection to the database
db.rais <- dplyr::src_postgres(
  dbname = 'db_rais2015', 
  host = '127.0.0.1', 
  port = '5432', 
  user = 'postgres', 
  password = 'postgres')
 
# List table names
dplyr::src_tbls(db.rais)

```

``` txt
## [1] "rais_vinc15"
```

``` R
# Create a table reference with tbl
rais15 <- dplyr::tbl(db.rais, "rais_vinc15")

rais15 %>% 
  filter(mês_admissão != 0 | mês_desligamento != 0) %>% 
  group_by(uf, sexo_trabalhador) %>% 
  summarise(desligados = sum(ifelse(mês_desligamento != 0, 1, 0)),
            admitidos = sum(ifelse(mês_admissão != 0, 1, 0))) -> adm_deslig
	  
# To see the SQL that dplyr will run.
show_query(adm_deslig)
```

``` txt
## <SQL>
## SELECT "uf", "sexo_trabalhador", SUM(CASE WHEN ("mês_desligamento" != 0.0) THEN (1.0) ELSE (0.0) END) AS "desligados", SUM(CASE WHEN ("mês_admissão" != 0.0) THEN (1.0) ELSE (0.0) END) AS "admitidos"
## FROM (SELECT *
## FROM "rais_vinc15"
## WHERE ("mês_admissão" != 0.0 OR "mês_desligamento" != 0.0)) "rxiywvumme"
## GROUP BY "uf", "sexo_trabalhador"
```

To load as a data.frame on R you use the *collect* command:
``` R
adm_deslig <- collect(adm_deslig)
```
