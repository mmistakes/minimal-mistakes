---
layout: simple
title: Big Data solutions - Computing on parts
description: Dealing with large files - Part 1
tags: 
    - Big Data
    - R
    - Unix
---

# Oh my God, please don't explain what is big data

Nowadays the internet have a big data of explanations about big data. 
Probably you have already faced the 3, 4 or 5 V's to explain Big Data:

![v4](/assets/posts/bigdata/bigdata-4v.jpg)

I will move fast and tell my particularly problem on dealing with big data on my greatest tool on earth **R**.

> Data is larger then RAM

That's it! I told you it would be fast. So, how I learned to deal with this kind of "problem".

# How to approach big data

There are three classes of aproaches that can be choosen. Let's have a look on them.

## 1. Extract Data

Problems that require you to extract a subset, sample, or summary from a Big Data source. 
You may do further analytics on the subset, as you aren't interesested on every granularity and fields of the data.

Since your subset is smaller than your RAM ... Pretty easy! 

## 2. Compute on the parts

Problems that require you to repeat computation for many subgroups of the data.
You may combine the results once finished.

## 3. Compute on the whole

Problems that require you to use all of the data at once. These problems are irretrievably big. 

> That'll sort out the men from the boys.

# Exploring on parts analysis

On my current project I'm dealing with a 30 GB yearly data called RAIS. 
It's a administrative report issued by all brasilian companies that the Ministry of Labor manages. 
It's known as the labor market census.

To reproduce this analysis the file is stored in this [ftp](ftp://ftp.mtps.gov.br/pdet/microdados/RAIS/2015/).

The data is already partitioned in 27 Federation Unities files. The directory I saved the files is:

``` r
dir.file <- "/Base de Dados/RAIS FTP/"
```
Let's show it off in a very simple example. I will take the mass of workers in Brazil building a loop function.

But first, if you believe life is beautiful learn everything about the **data.table** package. Seriously! 
To not overload this post check this [post](https://www.analyticsvidhya.com/blog/2016/05/data-table-data-frame-work-large-data-sets/)
from the Analytics Vidhya and get convinced.

Moving on, I have many years of data organized like this:

![raisfiles](/assets/posts/bigdata/rais-files.png)

I will list all files inside each year directory. The regex pattern is to not read one particular file *ESTAB.TXT*

``` r
year.files = list.files(paste0(dir.file,'/', ano,'/'), 
                        pattern = '^[A-Z]{2}[0-9]{4}.*')
``` 
Now I read one file summarise the total of workers of the Federal Unity file and throw it away from Memory RAM.

Summing in data.table works like this:

``` r
library(data.table)

uf.file[,sum(`Vínculo Ativo 31/12`)]
``` 
*Vínculo Ativo 31/12* is the field that indicates if that the worker was on the company in the end of the year.

Doing it recursively we reach our result. The function looks like this:

``` r

sum_workers <- function(ano){
  total_workers = 0
  year.files = list.files(paste0(dir.file,'/', ano,'/'), 
                          pattern = '^[A-Z]{2}[0-9]{4}.*')
  for(i in 1:27) {
    
    uf <- gsub('([A-Z]{2})[0-9]{4}.*', '\\1', year.files[i])
    print(paste(i, ': Reading', uf))
    
    assign('uf.file', 
           fread(paste0(dir.file,'/',ano,'/', year.files[i]), 
                 select = c('Vínculo Ativo 31/12'),
                 colClasses = 'integer',
                 sep = ';', header = T, dec = ','))
                 
    # Mass of workers
    total_workers = uf.file[,sum(`Vínculo Ativo 31/12`)] + total_workers
    invisible(gc())
  }
  return(total_workers)
  beepr::beep(2)
}

```
Not that easy! This works for every file ... except *SP2015.txt*. This file have 9,2 GB.

## Splitting into smaller parts

Linux has a great little utility called split, which can take a file and split it into chunks 
of whatever size you want. In the Ubuntu terminal, let's count the number of rows in the file.

``` bash
$ wc -l SP2015.txt
20604436 SP2015.txt
```
20 million lines! I'll split in files with 2 million.

``` bash
$ split -l 2000000 SP2015.txt 
```

You can also split a file by size:``` split -b 700m SP2015.txt```

The result is my original file and all the partitions in the folder:

``` bash
$ ls
SP2015.txt  xaa  xab  xac  xad  xae  xaf  xag  xah  xai  xaj  xak
```
Terrible file names and the files have no extension. Changing it...

``` bash
$ for file in xa*;  do mv "$file" "${file/xa/SP2015-part-}"; done
$ find . -type f -exec bash -c 'mv "$0" "$0.txt"' {} \;
$ ls
SP2015-part-a.txt  SP2015-part-c.txt  SP2015-part-e.txt  SP2015-part-g.txt  SP2015-part-i.txt  SP2015-part-k.txt
SP2015-part-b.txt  SP2015-part-d.txt  SP2015-part-f.txt  SP2015-part-h.txt  SP2015-part-j.txt  SP2015.txt
```
Only the first partition - *part-a* - have the header row. 
Unfortunately the split command doesn’t have an option for keeping up for all files. 
However with a little bit more code you can achieve it.

``` bash
$ for file in SP2015-part-[b-z].txt; do head -n 1 SP2015.txt > tmp_file; cat $file >> tmp_file; mv -f tmp_file $file; done
```
In case you forgot that the first part already had a header and now you have a file with two headers don't freak out.
Pass this simple command line,

``` bash
$ tail -n +2 SP2015-part-a.txt > SP2015-part-a.txt
```
After that, one small change on the **R** script to loop on all files: 

``` r
for(i in lenght(year.files))
```
The new function is almost the same. Have a look:

``` r

sum_workers <- function(ano){
  total_workers = 0
  year.files = list.files(paste0(dir.file,'/', ano,'/'), 
                          pattern = '^[A-Z]{2}[0-9]{4}.*')
  for(i in lenght(year.files)) {
    
    uf <- gsub('([A-Z]{2})[0-9]{4}.*', '\\1', year.files[i])
    print(paste(i, ': Reading', uf))
    
    assign('uf.file', 
           fread(paste0(dir.file,'/',ano,'/', year.files[i]), 
                 select = c('Vínculo Ativo 31/12'),
                 colClasses = 'integer',
                 sep = ';', header = T, dec = ','))
                 
    # Mass of workers
    total_workers = uf.file[,sum(`Vínculo Ativo 31/12`)] + total_workers
    invisible(gc())
  }
  return(total_workers)
  beepr::beep(2)
}
```

Next posts I'll show the problem with extracting data and more command line tools. 

### Dive deeper

*  Start learning data.table [here](https://s3.amazonaws.com/assets.datacamp.com/img/blog/data+table+cheat+sheet.pdf).
*  Beepr is a package that allow you to do another things while the code runs. It emits a sound when you call it.
