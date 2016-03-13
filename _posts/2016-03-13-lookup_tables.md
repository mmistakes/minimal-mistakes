---
title: "Lookup tables"
author: matt_gregory
comments: yes
date: '2016-03-13'
modified: 2016-03-13
layout: post
excerpt: "Using character matching for quick lookups"
published: true
status: publish
tags:
- R
- lookups
- education
categories: Rstats
---
 
{% include _toc.html %}
 
Character matching provides a powerful way to make lookup tables. There are more concise functions available in packages like `dplyr` that achieve the same end but it is useful to understand how they are implemented with basic subsetting.
 

{% highlight r %}
library(dplyr)
{% endhighlight %}
 
We start off by building an example dataframe.
 

{% highlight r %}
set.seed(1337)  # we use rnorm
 
pupil_data <- data.frame(
  studentid = 1:12,
  school = c("Park view", "Grange Hill", "Sweet valley"),
  superoutputarea = c("E01011949", "E01011105", "E01011333"),
  attainment = (rnorm(n = 12)),
  stringsAsFactors = FALSE  #  we can modify the class of variables later if required
)
{% endhighlight %}
 
If we look at the data, we notice the variable [`superoutputarea`](https://neighbourhood.statistics.gov.uk/HTMLDocs/nessgeography/superoutputareasexplained/output-areas-explained.htm) is a nine digit code that doesn't tell a human much.
We are interested in how the area relates to the socio-economic classification of typical people who live in that area or a measure of deprivation of the area.
We must convert this into the more informative proxy which can then be used in our machine learning tools later.
 

{% highlight r %}
pupil_data
{% endhighlight %}



{% highlight text %}
##    studentid       school superoutputarea attainment
## 1          1    Park view       E01011949  0.1924919
## 2          2  Grange Hill       E01011105 -1.4467018
## 3          3 Sweet valley       E01011333 -0.3231805
## 4          4    Park view       E01011949  1.6222961
## 5          5  Grange Hill       E01011105 -0.6890241
## 6          6 Sweet valley       E01011333  2.0421222
## 7          7    Park view       E01011949  0.9437791
## 8          8  Grange Hill       E01011105  2.0819269
## 9          9 Sweet valley       E01011333  1.9171173
## 10        10    Park view       E01011949 -0.4148122
## 11        11  Grange Hill       E01011105  1.0328535
## 12        12 Sweet valley       E01011333 -1.6785696
{% endhighlight %}



{% highlight r %}
str(pupil_data)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	12 obs. of  4 variables:
##  $ studentid      : int  1 2 3 4 5 6 7 8 9 10 ...
##  $ school         : chr  "Park view" "Grange Hill" "Sweet valley" "Park view" ...
##  $ superoutputarea: chr  "E01011949" "E01011105" "E01011333" "E01011949" ...
##  $ attainment     : num  0.192 -1.447 -0.323 1.622 -0.689 ...
{% endhighlight %}
 
What we need is a list which contains the necessary translation for `superoutputarea`. We define that here as `lookup`. A 7-point scale is used for deprivation with Sweet Valley High in a wealthy area and Park View in a deprived area.
 

{% highlight r %}
lookup <- c("E01011949" = 1, "E01011105" = 3, "E01011333" = 7)
{% endhighlight %}
 
To convert we simply:
 

{% highlight r %}
lookup[pupil_data$superoutputarea]
{% endhighlight %}



{% highlight text %}
## E01011949 E01011105 E01011333 E01011949 E01011105 E01011333 E01011949 
##         1         3         7         1         3         7         1 
## E01011105 E01011333 E01011949 E01011105 E01011333 
##         3         7         1         3         7
{% endhighlight %}



{% highlight r %}
#  if we don't want the names in the result
unname(lookup[pupil_data$superoutputarea])
{% endhighlight %}



{% highlight text %}
##  [1] 1 3 7 1 3 7 1 3 7 1 3 7
{% endhighlight %}
 
Thus we can use this to create a new variable called `depriv`. 
 

{% highlight r %}
pupil_data$depriv <- NULL
pupil_data$depriv <- unname(lookup[pupil_data$superoutputarea])
pupil_data
{% endhighlight %}



{% highlight text %}
##    studentid       school superoutputarea attainment depriv
## 1          1    Park view       E01011949  0.1924919      1
## 2          2  Grange Hill       E01011105 -1.4467018      3
## 3          3 Sweet valley       E01011333 -0.3231805      7
## 4          4    Park view       E01011949  1.6222961      1
## 5          5  Grange Hill       E01011105 -0.6890241      3
## 6          6 Sweet valley       E01011333  2.0421222      7
## 7          7    Park view       E01011949  0.9437791      1
## 8          8  Grange Hill       E01011105  2.0819269      3
## 9          9 Sweet valley       E01011333  1.9171173      7
## 10        10    Park view       E01011949 -0.4148122      1
## 11        11  Grange Hill       E01011105  1.0328535      3
## 12        12 Sweet valley       E01011333 -1.6785696      7
{% endhighlight %}



{% highlight r %}
str(pupil_data)  #  check variables are of appropriate class
{% endhighlight %}



{% highlight text %}
## 'data.frame':	12 obs. of  5 variables:
##  $ studentid      : int  1 2 3 4 5 6 7 8 9 10 ...
##  $ school         : chr  "Park view" "Grange Hill" "Sweet valley" "Park view" ...
##  $ superoutputarea: chr  "E01011949" "E01011105" "E01011333" "E01011949" ...
##  $ attainment     : num  0.192 -1.447 -0.323 1.622 -0.689 ...
##  $ depriv         : num  1 3 7 1 3 7 1 3 7 1 ...
{% endhighlight %}
 
Great, now we can use this dataframe for machine learning.
What if we have a large dataframe, are there more concise and faster ready made functions to use?
Probably but we won't elucidate that here, we just assume `dplyr` is fast as it passess to `C++`.
Plus I like `dplyr` with its nice chaining.
 

{% highlight r %}
mutate(pupil_data, depriv2 = unname(lookup[pupil_data$superoutputarea]))
{% endhighlight %}



{% highlight text %}
##    studentid       school superoutputarea attainment depriv depriv2
## 1          1    Park view       E01011949  0.1924919      1       1
## 2          2  Grange Hill       E01011105 -1.4467018      3       3
## 3          3 Sweet valley       E01011333 -0.3231805      7       7
## 4          4    Park view       E01011949  1.6222961      1       1
## 5          5  Grange Hill       E01011105 -0.6890241      3       3
## 6          6 Sweet valley       E01011333  2.0421222      7       7
## 7          7    Park view       E01011949  0.9437791      1       1
## 8          8  Grange Hill       E01011105  2.0819269      3       3
## 9          9 Sweet valley       E01011333  1.9171173      7       7
## 10        10    Park view       E01011949 -0.4148122      1       1
## 11        11  Grange Hill       E01011105  1.0328535      3       3
## 12        12 Sweet valley       E01011333 -1.6785696      7       7
{% endhighlight %}
 
Sometimes we might have a more complicated lookup table which has multiple columns of infomation.
Suppose we take our vector of attainment grades and round them to the nearest whole number.
 

{% highlight r %}
pupil_data <- mutate(pupil_data, grade = round(attainment, digits = 0))
 
grades <- pupil_data$grade
 
info <- data.frame(
  grade = -3:3,
  desc = c("Awful", "Rubbish", "Poor", "OK", "Satisfactory", "Good", "Awesome"),
  pass = c(F, F, F, T, T, T, T)
)
{% endhighlight %}
 
We want to duplicate the `info` table so that we have a row for each values in `grade`. We can do this in two ways either using `match()` and integer subsetting, or `rownames()` and character subsetting:
 

{% highlight r %}
# using match
id <- match(grades, info$grade)
info[id, ]
{% endhighlight %}



{% highlight text %}
##     grade         desc  pass
## 4       0           OK  TRUE
## 3      -1         Poor FALSE
## 4.1     0           OK  TRUE
## 6       2         Good  TRUE
## 3.1    -1         Poor FALSE
## 6.1     2         Good  TRUE
## 5       1 Satisfactory  TRUE
## 6.2     2         Good  TRUE
## 6.3     2         Good  TRUE
## 4.2     0           OK  TRUE
## 5.1     1 Satisfactory  TRUE
## 2      -2      Rubbish FALSE
{% endhighlight %}



{% highlight r %}
# using rownames
rownames(info) <- info$grade
info[as.character(grades), ]
{% endhighlight %}



{% highlight text %}
##      grade         desc  pass
## 0        0           OK  TRUE
## -1      -1         Poor FALSE
## 0.1      0           OK  TRUE
## 2        2         Good  TRUE
## -1.1    -1         Poor FALSE
## 2.1      2         Good  TRUE
## 1        1 Satisfactory  TRUE
## 2.2      2         Good  TRUE
## 2.3      2         Good  TRUE
## 0.2      0           OK  TRUE
## 1.1      1 Satisfactory  TRUE
## -2      -2      Rubbish FALSE
{% endhighlight %}
 
We have matched the `grade` of the student with its appropriate descriptor and pass / fail status using a more complicated lookup table.
 
## Conclusion
A named character vector can act as a simple lookup table. We could even read this in from a csv file. Lookup is simple in R.
 
## References
* Wickham, H. (2015). Advanced R.
 

{% highlight r %}
sessionInfo()
{% endhighlight %}



{% highlight text %}
## R version 3.2.3 (2015-12-10)
## Platform: x86_64-pc-linux-gnu (64-bit)
## Running under: Ubuntu 14.04.4 LTS
## 
## locale:
##  [1] LC_CTYPE=en_GB.UTF-8       LC_NUMERIC=C              
##  [3] LC_TIME=en_GB.UTF-8        LC_COLLATE=en_GB.UTF-8    
##  [5] LC_MONETARY=en_GB.UTF-8    LC_MESSAGES=en_GB.UTF-8   
##  [7] LC_PAPER=en_GB.UTF-8       LC_NAME=C                 
##  [9] LC_ADDRESS=C               LC_TELEPHONE=C            
## [11] LC_MEASUREMENT=en_GB.UTF-8 LC_IDENTIFICATION=C       
## 
## attached base packages:
## [1] methods   stats     graphics  grDevices utils     datasets  base     
## 
## other attached packages:
## [1] dplyr_0.4.3     testthat_0.11.0 knitr_1.12.3   
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.2     digest_0.6.8    crayon_1.3.1    assertthat_0.1 
##  [5] R6_2.1.1        DBI_0.3.1       formatR_1.2.1   magrittr_1.5   
##  [9] evaluate_0.8    stringi_1.0-1   lazyeval_0.1.10 tools_3.2.3    
## [13] stringr_1.0.0   parallel_3.2.3  memoise_0.2.1
{% endhighlight %}
