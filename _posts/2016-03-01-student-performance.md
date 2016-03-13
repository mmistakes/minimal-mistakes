---
title: "Student performance in Portugal"
author: matt_gregory
comments: yes
date: '2016-03-01'
modified: 2016-03-13
layout: post
excerpt: "Predicting student performance using CART"
published: true
status: publish
tags:
- R
- machine learning
- education
categories: Rstats
---
 
{% include _toc.html %}
 
Education is a key factor affecting long term economic progress. Success in the core languages provide a linguistic and numeric scaffold for other subjects later in students' academic careers.The growth in school educational databases facilitates the use of Data Mining and Machine Learning practises to improve outcomes in these subjects by identifying factors that are indicative of failure. Predicting outcomes allows educators to take corrective measures for weak students mitigating the risk of failure. 
 
## The Data  
 
The [data](https://archive.ics.uci.edu/ml/datasets/Student+Performance) was downloaded from the UCI Machine Learning database and inspired by Cortez *et al*., 2008. We use maths results data only. We start off by clearing the workspace, then setting the working directory to match the location of the student maths data file. A caveat, note that the data is not comma-seperated but semi-colon seperated, be sure to specify this in the `sep` argument in the `read.table()` function. Normally you should refer to the `sessionInfo()` output at the foot of this blog-post to determine which packages are installed and loaded for this, however as there are quite a few, this time we detail them here.
 

{% highlight r %}
knitr::opts_chunk$set(
  dev = "svg"
  )
 
library(dplyr)
library(C50)
library(gmodels)
library(rpart)
library(rpart.plot)
 
#INPUT
 
mydata <- "data/2016-03-01_student_performance.csv" 
 
mydata <- read.table(
  mydata, sep = ";",
  header = TRUE
  )
{% endhighlight %}
 
Let's have a look at our data using the convenient `glimpse` courtesy of the `dplyr` package. Notice how the range of the numeric variables is different.
 

{% highlight r %}
glimpse(mydata)
{% endhighlight %}



{% highlight text %}
## Observations: 395
## Variables: 33
## $ school     (fctr) GP, GP, GP, GP, GP, GP, GP, GP, GP, GP, GP, GP, GP...
## $ sex        (fctr) F, F, F, F, F, M, M, F, M, M, F, F, M, M, M, F, F,...
## $ age        (int) 18, 17, 15, 15, 16, 16, 16, 17, 15, 15, 15, 15, 15,...
## $ address    (fctr) U, U, U, U, U, U, U, U, U, U, U, U, U, U, U, U, U,...
## $ famsize    (fctr) GT3, GT3, LE3, GT3, GT3, LE3, LE3, GT3, LE3, GT3, ...
## $ Pstatus    (fctr) A, T, T, T, T, T, T, A, A, T, T, T, T, T, A, T, T,...
## $ Medu       (int) 4, 1, 1, 4, 3, 4, 2, 4, 3, 3, 4, 2, 4, 4, 2, 4, 4, ...
## $ Fedu       (int) 4, 1, 1, 2, 3, 3, 2, 4, 2, 4, 4, 1, 4, 3, 2, 4, 4, ...
## $ Mjob       (fctr) at_home, at_home, at_home, health, other, services...
## $ Fjob       (fctr) teacher, other, other, services, other, other, oth...
## $ reason     (fctr) course, course, other, home, home, reputation, hom...
## $ guardian   (fctr) mother, father, mother, mother, father, mother, mo...
## $ traveltime (int) 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 3, 1, 2, 1, 1, 1, ...
## $ studytime  (int) 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 3, 1, 2, 3, 1, 3, ...
## $ failures   (int) 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ...
## $ schoolsup  (fctr) yes, no, yes, no, no, no, no, yes, no, no, no, no,...
## $ famsup     (fctr) no, yes, no, yes, yes, yes, no, yes, yes, yes, yes...
## $ paid       (fctr) no, no, yes, yes, yes, yes, no, no, yes, yes, yes,...
## $ activities (fctr) no, no, no, yes, no, yes, no, no, no, yes, no, yes...
## $ nursery    (fctr) yes, no, yes, yes, yes, yes, yes, yes, yes, yes, y...
## $ higher     (fctr) yes, yes, yes, yes, yes, yes, yes, yes, yes, yes, ...
## $ internet   (fctr) no, yes, yes, yes, no, yes, yes, no, yes, yes, yes...
## $ romantic   (fctr) no, no, no, yes, no, no, no, no, no, no, no, no, n...
## $ famrel     (int) 4, 5, 4, 3, 4, 5, 4, 4, 4, 5, 3, 5, 4, 5, 4, 4, 3, ...
## $ freetime   (int) 3, 3, 3, 2, 3, 4, 4, 1, 2, 5, 3, 2, 3, 4, 5, 4, 2, ...
## $ goout      (int) 4, 3, 2, 2, 2, 2, 4, 4, 2, 1, 3, 2, 3, 3, 2, 4, 3, ...
## $ Dalc       (int) 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ...
## $ Walc       (int) 1, 1, 3, 1, 2, 2, 1, 1, 1, 1, 2, 1, 3, 2, 1, 2, 2, ...
## $ health     (int) 3, 3, 3, 5, 5, 5, 3, 1, 1, 5, 2, 4, 5, 3, 3, 2, 2, ...
## $ absences   (int) 6, 4, 10, 2, 4, 10, 0, 6, 0, 0, 0, 4, 2, 2, 0, 4, 6...
## $ G1         (int) 5, 5, 7, 15, 6, 15, 12, 6, 16, 14, 10, 10, 14, 10, ...
## $ G2         (int) 6, 5, 8, 14, 10, 15, 12, 5, 18, 15, 8, 12, 14, 10, ...
## $ G3         (int) 6, 6, 10, 15, 10, 15, 11, 6, 19, 15, 9, 12, 14, 11,...
{% endhighlight %}
 
From the [codebook](https://archive.ics.uci.edu/ml/datasets/Student+Performance#) we know that G3 is the final grade of the students. We can inspect it's distribution using a historgram or the `hist()` function.
 

{% highlight r %}
hist(mydata$G3)
{% endhighlight %}

![plot of chunk 2016-03-01_histogram](/figures/2016-03-01_histogram-1.svg)
 
## Make the final grade binary (pass and fail)
 
`G3` is pretty normally distributed, despite the dodgy tail. To simplify matters converted G3 marks below 10 as a fail, above or equal to 10 as a pass. Often a school is judged by whether students meet a critical boundary, in the UK it is a C grade at GCSE for example. Notice how we first set the `final` variable to the `NULL` object then use the logical `ifelse` to convert `G3` into the binary `final` (see [here](http://www.r-bloggers.com/r-na-vs-null)).
 

{% highlight r %}
mydata$final <- NULL
 
mydata$final <- factor(
  ifelse(mydata$G3 >= 10, 1, 0), 
  labels = c("fail", "pass")
  ) 
{% endhighlight %}
 
## Normalising the data
 
The numeric variables cover different ranges. As we want all variables to be treated the same we should convert them so that they range between zero and one, thus operating on the same scale. We are interested in relative differences not absolute.  
Our custom `normalise()` function takes a vector x of numeric values, and for each value in x subtracts the min value in x and divides by the range of values in x. A vector is returned.
 

{% highlight r %}
normalise <- function(x) {
  return((x - min(x)) / (max(x) - min(x)))
}
{% endhighlight %}
 
## Objectives  
 
- is it possible to predict student performance?    
- can we identify the important variables in determining intervention?   
 
## Decision tree advantages  
 
- Appropriate as students and parent will want to know why a student has been selected for intervention. The outcome is essentially a flowchart.  
- Widely used.  
- Decent performance.  
- There arn't too many variables in this problem.  
 

 
## Training and test datasets.
 
We need to split the data so we can build the model and then test it, to see if it generalises well. This gives us confidence in the external validity of the model. The data arrived in a random order thus we don't need to worry about sampling at random.
 

{% highlight r %}
data_train <- data_interest[1:350, ]
data_test <- data_interest[351:395, ]
{% endhighlight %}
 
Now we need to train the model using the data.
 

{% highlight r %}
#Build the classifier
m <- C5.0(x = data_train[-13], y = data_train$final) 
#  final is the class variable so we need to exclude it from training
summary(m)
{% endhighlight %}



{% highlight text %}
## 
## Call:
## C5.0.default(x = data_train[-13], y = data_train$final)
## 
## 
## C5.0 [Release 2.07 GPL Edition]  	Sun Mar 13 21:08:40 2016
## -------------------------------
## 
## Class specified by attribute `outcome'
## 
## Read 350 cases (13 attributes) from undefined.data
## 
## Decision tree:
## 
## G2 > 0.4736842: pass (224/8)
## G2 <= 0.4736842:
## :...G2 <= 0.368421: fail (53)
##     G2 > 0.368421:
##     :...Fjob in {at_home,health,services,teacher}: fail (33/5)
##         Fjob = other:
##         :...G2 <= 0.4210526: fail (18/3)
##             G2 > 0.4210526:
##             :...goout > 0.75: pass (4)
##                 goout <= 0.75:
##                 :...failures > 0: fail (2)
##                     failures <= 0:
##                     :...G1 <= 0.375: pass (10/2)
##                         G1 > 0.375: fail (6/1)
## 
## 
## Evaluation on training data (350 cases):
## 
## 	    Decision Tree   
## 	  ----------------  
## 	  Size      Errors  
## 
## 	     8   19( 5.4%)   <<
## 
## 
## 	   (a)   (b)    <-classified as
## 	  ----  ----
## 	   103    10    (a): class fail
## 	     9   228    (b): class pass
## 
## 
## 	Attribute usage:
## 
## 	100.00%	G2
## 	 20.86%	Fjob
## 	  6.29%	goout
## 	  5.14%	failures
## 	  4.57%	G1
## 
## 
## Time: 0.0 secs
{% endhighlight %}
 
Only 5% error rate, and the model has described an obvious relationship between most recent test score, `G2`, but has also identified the father's job, `Fedu`, as being a useful indicator which may not have been revealed in a human expert analysis.  
Let's see how generalisable the model is by comparing it's predicted student math `G3` outcomes to real pass or fail status.
 

{% highlight r %}
#PREDICT
p <- predict(m, data_test)
CrossTable(data_test$final, p, prop.chisq = FALSE,
           prop.c = FALSE, prop.r = FALSE, dnn = c("actual pass",
                                                   "predicted pass"))
{% endhighlight %}



{% highlight text %}
## 
##  
##    Cell Contents
## |-------------------------|
## |                       N |
## |         N / Table Total |
## |-------------------------|
## 
##  
## Total Observations in Table:  45 
## 
##  
##              | predicted pass 
##  actual pass |      fail |      pass | Row Total | 
## -------------|-----------|-----------|-----------|
##         fail |        17 |         0 |        17 | 
##              |     0.378 |     0.000 |           | 
## -------------|-----------|-----------|-----------|
##         pass |         3 |        25 |        28 | 
##              |     0.067 |     0.556 |           | 
## -------------|-----------|-----------|-----------|
## Column Total |        20 |        25 |        45 | 
## -------------|-----------|-----------|-----------|
## 
## 
{% endhighlight %}
93.4% model accuracy, not bad, 3 students proved us wrong and passed anyway! Seems like a useful model for identifying students who need extra intervention and importantly it can be applied and interpreted by a human.
 
## Seeing the trees for the...
 
Let's finish by improving the way we visualise the tree diagram. We use this type of algorithm as it is very intuitive and easy to interpret, if we plot it appropriately! Here we use the `rpart` package to specify an identical model to pass to plot.
 

{% highlight r %}
#create tree using rpart, so we can plot it
m2 <- rpart(final ~ . , data = data_train, method = 'class')
#Plot it
plot(m2)
text(m2, pretty = 0, cex = 0.65)
{% endhighlight %}

![plot of chunk 2016-03-01_plot_m2](/figures/2016-03-01_plot_m2-1.svg)
 
OK, but not great, we need a pretty interfce if people are expected to use this tool. Let's use the `rpart.plot` package and the `prp()` function therein.
 

{% highlight r %}
prp(m2,varlen = 4, extra = 2)  # plot with shortened abrreviated variable names
{% endhighlight %}

![plot of chunk 2016-03-01_plot_prp](/figures/2016-03-01_plot_prp-1.svg)
 
This function is much better for plotting trees with huge customisation options. Here we display the classification rate at the node, expressed as the number of correct classifications and the number of observations in the node.
 
## Conclusion
 
This tool can now be implemented as policy at the school to determine where interventions should be targeted pending model validation.
 
## References
 
* Cortez and Silva (2008). Using data mining to predict secondary school performance.
* Crawley (2004). Statistics an introduction using R.
* James et al., (2014). An introduction to statistical learning with applications in R.
* https://archive.ics.uci.edu/ml/datasets/Student+Performance
 

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
## [1] rpart.plot_1.5.3 rpart_4.1-10     gmodels_2.16.2   C50_0.1.0-24    
## [5] dplyr_0.4.3      testthat_0.11.0  knitr_1.12.3    
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.2     magrittr_1.5    splines_3.2.3   MASS_7.3-44    
##  [5] R6_2.1.1        stringr_1.0.0   tools_3.2.3     parallel_3.2.3 
##  [9] grid_3.2.3      DBI_0.3.1       gtools_3.5.0    lazyeval_0.1.10
## [13] survival_2.38-3 assertthat_0.1  digest_0.6.8    crayon_1.3.1   
## [17] formatR_1.2.1   memoise_0.2.1   evaluate_0.8    gdata_2.17.0   
## [21] stringi_1.0-1   partykit_1.0-5
{% endhighlight %}
