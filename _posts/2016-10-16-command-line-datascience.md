---
layout: single
title: Using Unix commands for data science
tags: 
    - Unix
    - Big Data
---

# The Amazing Unix Shell

Hilary Mason and Chris Wiggins wrote about the importance of any data scientist being familiar with the command line. So...
it's enough to you start it! Often people use Hadoop and other so-called Big Data tools for real-world processing and analysis jobs that can be done faster with simpler tools and different techniques.

One especially under-used approach for data processing is using standard shell tools and commands. The benefits of this approach can be massive, since creating a data pipeline out of shell commands means that all the processing steps can be done in parallel. You can pretty easily construct a stream processing pipeline with basic commands that will have extremely good performance compared to many modern Big Data tools.

An additional point is the batch versus streaming analysis approach. Getting short on memory. This is because all data is loaded into RAM for the analysis. However, considering the problem for a bit, it can be easily solved with streaming analysis that requires basically no memory at all. The resulting stream processing pipeline we will create will be over faster than the Hadoop implementation and use virtually no memory.

The command line is essential to my daily work, so I wanted to share some of the commands I've found most useful.

As we have seen in my last post ([Computing on Parts](https://matheusrabetti.github.io/2016-10-14-bigdata-onparts)) 
the file **SP2015.txt** have 9,2 GB. If you really want to reproduce this commands check the last post.

Here you'll see some nice commands on the Unix shell from basic information on the data to analysis.

## General syntax

Pipe | The next command will use the previous result ``` result | use result ```
Saving object |  ``` result > file.txt ```
Stop | **Control+C** - stops running the command.
Help | Explanation and parameters overview ``` head --help ```

## Head & Tail - First look

Sometimes you just need to inspect the structure of a huge file. That's where *head* and *tail* come in. 
*Head* prints the first ten lines of a file, while *tail* prints the last ten lines. 
Optionally, you can include the -N parameter to change the number of lines displayed.

``` shell
$ head -n 3 random-data.csv 
id,first_name,last_name,city,gender,shirt_size
1,Paula,Bryant,Purut,Female,2XL
```

``` shell
$ tail -n 3 random-data.csv 
998,Albert,James,Raphoe,Male,XL
999,Cheryl,Day,Hengjie,Female,L
1000,Tina,Hart,Kanye,Female,2XL
```

## Shuf - Sampling 

*Shuf* shuffles its input by outputting a random permutation of its input lines. This command loads on the memory RAM and isn't that fast. Why it is here? It's just good to know that exists!

``` shell
$ shuf -n 2 ES2015.txt
{� c;{� c;{� c;99;99;99;00;914420;45200;50202;  ...
{� c;{� c;{� c;99;99;99;11;513435;62091;72907;  ...
```

## Cut - Column extracter

Unix command *cut* is used for text processing.
You can use this command to extract portion of text from a file by selecting columns.

``` shell
$ cut -d';' -f1,2,3,4,5 SP2015.txt | head -n4
Bairros SP;Bairros Fortaleza;Bairros RJ;Causa Afastamento 1;Causa Afastamento 2
0590;{� c;{� c;99;99
9999;{� c;{� c;99;99
9999;{� c;{� c;99;99
```

## Sort - Ordering

*Sort* is a simple and very useful command which will rearrange the lines in a text file so that they are sorted, numerically and alphabetically. 
Column 30 is the number os days that the worker have been away from work.

``` shell
$ cut -d';' -f30 SP2015.txt | sort -n -r | head -n5
 365
 365
 365
 365
 365
```

## WC - word count 

By default, *wc* will quickly tell you how many lines, words, and bytes are in a file. 
If you're looking for just the line count, you can pass the -l parameter in.
I use it most often to verify record counts between files or database tables throughout an analysis.

``` shell
$ wc -l SP2015.txt
20604436 SP2015.txt
```

## Unique - Distinct entries

Sometimes you want to check for duplicate records in a large text file - that's when *uniq* comes in handy. By using the -c parameter, uniq will output the count of occurrences along with the line. You can also use the -d and -u parameters to output only duplicated or unique records.

``` shell
$ sort ES2015.txt | cut -d';' -f4 | uniq -c
      1 Causa Afastamento 1
   4743 10
    675 20
   2256 30
 105262 40
  21762 50
    139 60
   7434 70
1312266 99
```

Count the number of unique lines

``` shell
$ sort ES2015.txt | uniq -u | wc -l
1433372
$ wc -l ES2015.txt
1454538 ES2015.txt
```


## Iconv - File encoding

The *iconv* program converts the encoding of characters in inputfile from one coded character set to another. 

``` shell
$ cut -d';' -f1,2,3 SP2015.txt | head -n3 | iconv -f iso-8859-1 -t UTF-8
Bairros SP;Bairros Fortaleza;Bairros RJ
0590;{ñ c;{ñ c
9999;{ñ c;{ñ c
```

If I have a bunch of text files that I'd like to convert from any given charset to UTF-8 encoding. Just use this bash magic.

``` shell
$ for file in *.txt; do iconv -f ascii -t utf-8 $file; done
```

## Grep - Find pattern

*Grep* allows you to search through plain text files using regular expressions. 
There's an assortment of extra parameters you can use with *grep*, but the ones I tend to use the most are -i (ignore case),
-r (recursively search directories), -B N (N lines before), -A N (N lines after).

``` shell
$ cut -d';' -f2,3 SP2015.txt |head -n4 | grep {
{� c;{� c
{� c;{� c
{� c;{� c
```

In case I want to find a entry in the first column that don't starts with 9:

``` shell
$ cut -d';' -f1 SP2015.txt | head -n100 | grep '[^9].*'
Bairros SP
0590
1067
```

## Sed

Sed is similar to grep and awk (next) in many ways, however I find that I most often use it when needing to do some find and replace magic on a very large file. 

*  ```s``` is used to replace the found expression.
*  ```g``` stands for *global*, meaning to do this for the whole line. If you leave off the g and the expression appears twice on the same line, only the first is changed.
*  ```-i``` option is used to edit in place on filename.
*  ```-e``` option indicates a command to run.

``` shell
$ cut -d';' -f2,3 SP2015.txt |head -n4| iconv -f iso-8859-1 -t UTF-8| sed -e 's/{ñ c//g'
Bairros Fortaleza;Bairros RJ
;
;
;
```

## AWK - Powerful

### Sum

Just like we did in the **Computing on parts** post, I'm going to sum the *Vínculo ativo 31/12* field. It's the 12th column!

``` shell
$ cat SP2015.txt | awk -F ";" '{sum += $12} END {printf "%.0f\n", sum}'
13697471
```
The above line says:

1.  Use the cat command to stream (print) the contents of the file to stdout.
2.  Pipe the streaming contents from our cat command to the next one - awk.
3.  With awk:
    1. Set the field separator to the pipe character (-F ";"). 
    2. Increment the variable sum with the value in the twelfth column ($12). Since we used a pipeline in point #2,
    the contents of each line are being streamed to this statement.
    3. Once the stream is done, print out the value of sum, using printf to format the value with none decimal places.

Time to run the command: **1 min 34 sec**

### List the column number

The next command is essential to manipulate a data with many columns.

``` shell
$ awk 'BEGIN {FS=";"} {for(fn=1;fn<=NF;fn++) {print fn" = "$fn;}; exit;}' SP2015.txt | iconv -f iso-8859-1 -t UTF-8
1 = Bairros SP
2 = Bairros Fortaleza
3 = Bairros RJ
4 = Causa Afastamento 1
5 = Causa Afastamento 2
6 = Causa Afastamento 3
7 = Motivo Desligamento
8 = CBO Ocupação 2002
9 = CNAE 2.0 Classe
10 = CNAE 95 Classe
11 = Distritos SP
12 = Vínculo Ativo 31/12
13 = Faixa Etária
14 = Faixa Hora Contrat
15 = Faixa Remun Dezem (SM)
16 = Faixa Remun Média (SM)
17 = Faixa Tempo Emprego
18 = Escolaridade após 2005
19 = Qtd Hora Contr
20 = Idade
21 = Ind CEI Vinculado
22 = Ind Simples
23 = Mês Admissão
24 = Mês Desligamento
25 = Mun Trab
26 = Município
27 = Nacionalidade
28 = Natureza Jurídica
29 = Ind Portador Defic
30 = Qtd Dias Afastamento
31 = Raça Cor
32 = Regiões Adm DF
33 = Vl Remun Dezembro Nom
34 = Vl Remun Dezembro (SM)
35 = Vl Remun Média Nom
36 = Vl Remun Média (SM)
37 = CNAE 2.0 Subclasse
38 = Sexo Trabalhador
39 = Tamanho Estabelecimento
40 = Tempo Emprego
41 = Tipo Admissão
42 = Tipo Estab
43 = Tipo Estab
44 = Tipo Defic
45 = Tipo Vínculo
46 = IBGE Subsetor
47 = Vl Rem Janeiro CC
48 = Vl Rem Fevereiro CC
49 = Vl Rem Março CC
50 = Vl Rem Abril CC
51 = Vl Rem Maio CC
52 = Vl Rem Junho CC
53 = Vl Rem Julho CC
54 = Vl Rem Agosto CC
55 = Vl Rem Setembro CC
56 = Vl Rem Outubro CC
57 = Vl Rem Novembro CC
```

### Char count

This command counts the maximum character length of each column in SP2015.txt file. Very nice command to look at your data and parse correctly the text file to a database:

``` shell
$ tail -n10000 SP2015.txt | awk -F';' 'NR > 1 {for (i=1; i <= NF; i++) max[i] = (length($i) > max[i]?length($i):max[i])}
             END {for (i=1; i <= NF; i++) printf "%d%s", max[i], (i==NF?RS:FS)}'
4;3;3;2;2;2;2;6;5;5;20;1;2;2;2;2;2;20;4;4;1;1;2;2;6;6;2;4;1;4;2;4;13;9;13;9;7;20;2;8;2;2;4;2;2;2;15;15;15;15;15;15;15;15;15;15;16
$ head -n10000 SP2015.txt | awk -F';' 'NR > 1 {for (i=1; i <= NF; i++) max[i] = (length($i) > max[i]?length($i):max[i])}
             END {for (i=1; i <= NF; i++) printf "%d%s", max[i], (i==NF?RS:FS)}'
4;3;3;2;2;2;2;6;5;5;20;1;2;2;2;2;2;20;4;4;1;1;2;2;6;6;2;4;1;4;2;4;13;9;13;9;7;20;2;8;2;2;4;2;2;2;15;15;15;15;15;15;15;15;15;15;16
```  

### Mean

It makes possible to calculate the mean of the whole file. 
In the below example I want the average salary (column 35) for the workers that are still employed in december 31 (column 12).

``` shell
$  awk -F';' '($12)=="1" {sum+=$35; count+=1} END {print sum/count}' SP2015.txt
2739.44
```

Time to run the command: **1 min 10 sec**

### Standard Deviation - population

Also, *awk* can bring some position measures like the standard deviation.

``` shell
$ awk -F';' 'pass==1 {sum+=$35; n+=1} pass==2 {mean=sum/n; 
     ssd+=($1-mean)*($1-mean)} END {print sqrt(ssd/n)}' pass=1 SP2015.txt pass=2 SP2015.txt
6074.84
```

Time to run the command: **1 min 43 sec**

### Split file by some rule

You can also split your file filtered by a rule. 

``` shell
$ gawk -F';' '{x=($12==1)?"SP2015-estoque.txt":"SP2015-desligado.txt"; print > x}' SP2015.txt
```

### Dive Deeper

* [AWK in 20 minutes](http://ferd.ca/awk-in-20-minutes.html)
* [Command line tools vs Hadoop](http://aadrake.com/command-line-tools-can-be-235x-faster-than-your-hadoop-cluster.html)
