---
title: "Support vector machines for forest fire prediction"
author: matt_gregory
comments: yes
date: '2016-03-15'
modified: 2016-03-21
layout: post
excerpt: "Predicting forest fire scale using support vector machines"
published: true
status: publish
tags:
- R
- machine learning
- weather
- forest fires
categories: Rstats
---
 
{% include _toc.html %}
 

## Introduction
This post is based on a paper by Cortez & Morais (2007). Forest fires are a major environmental issue, creating economical and ecological damage while endangering human lives. Fast detection is a key element for controlling such phenomenon. To achieve this, one alternative is to use automatic tools based on local sensors, such as microclimate and weather data provided by meteorological stations.
 
All this data holds valuable information, such as trends and patterns, which can be used to improve decision making. Yet, human experts are limited and may overlook important details. Moreover, classical statistical analysis breaks down when such vast and/or complex data is present. Hence, the alternative is to use automated machine learning tools to analyze the raw data and extract high-level information for the decision-maker.
 
This is a very difficult regression task. We got the forest fire data from the UCI machine [learning repository](http://archive.ics.uci.edu/ml/datasets/Forest+Fires). Specifically we want to predict the burned area or size of the forest fires in the northeast region of Portugal. We demonstrate the proposed solution of Cortez which includes only four weather variables (i.e. rain, wind, temperature and humidity) in conjunctionwith a support vector machines (SVM) and it is capable of predicting the burned area of small fires, which constitute the majority of the fire occurrences.
 

{% highlight r %}
set.seed(1337)
 
#PACKAGES
library(dplyr)
library(kernlab)
library(ROCR)
library(caret)
library(e1071)
 
#INPUT
mydata <- "data/2016-03-21-fires_cortez.csv" 
mydata <- read.table(mydata, sep = ",",
                     header = TRUE)
mydata <- tbl_df(mydata)  # observed data set
{% endhighlight %}
 
A SVM uses a nonlinear mapping to transform the original training data into a higher dimension. Within this new dimension, it searches for the linear optimal separating hyperplane.
 
## Objective
* Perform a support vector regression.
* Assess the accuracy of the model.
* Demonstrate the work flow for fitting a SVM for classification in R.
 
## The data
 
Upon `glimpse()`ing the data, we notice the `area` of the burn has a lot of zeroes. We investigate further with a histogram. We may want to `log(area+1)` transform the area due to the heavy skew and many zeroes (fires that burnt less than a hectare). The variables are fully explained in the original paper.
 

{% highlight r %}
hist(mydata$area)
rug(mydata$area)
{% endhighlight %}

![plot of chunk 2016-03-21_hist2](/figures/2016-03-21_hist2-1.svg)
 
We transform `area` into the new response variable `y`, this would be useful if we wanted to use the SVM for regression.
 

{% highlight r %}
mydata <- mutate(mydata, y = log(area + 1))  # default is to the base e, y is lower case
hist(mydata$y)
{% endhighlight %}

![plot of chunk 2016-03-21_hist1](/figures/2016-03-21_hist1-1.svg)
 
We start at an advantage, as we know what model structure for the SVM was most effective for prediction based on the findings of the paper. Thus we can limit our data preparation to a few variables.The proposed solution, which is based in a SVM and requires only four direct
weather inputs (i.e. temperature, rain, relative humidity and wind speed) is capable of predicting small fires, which constitute the majority of the fire occurrences.
 
We also need to normalise the continuous variables between zero and one to control for different ranges. However, the function we use does this for us! We show what it would look like if we wanted to set this up manually but we don't evaluate it.
 

{% highlight r %}
normalise <- function(x) {
  return((x - min(x)) / (max(x) - min(x)))  # subtract the min value in x and divide by the range of values in x.
}
 
mydata$temp <- normalise(mydata$temp)
mydata$rain <- normalise(mydata$rain)
mydata$RH <- normalise(mydata$RH)
mydata$wind <- normalise(mydata$wind)
{% endhighlight %}
 
## Classification
SVM is better suited to a classification problem. Let's pretend we're interested in the weather conditions that give rise to small fires (arbitary set to < 5 hectares), compared to larger fires. Can we classify the type of fire we might expect to see if we send a fireman out with remote meterological data? This may help them bring the right gear.
 

{% highlight r %}
# note, our earlier transformation was redundant, $area gives the same results
sum(mydata$area < 5)  # ln(0 + 1) = 0
{% endhighlight %}



{% highlight text %}
## [1] 366
{% endhighlight %}



{% highlight r %}
sum(mydata$area >= 5)
{% endhighlight %}



{% highlight text %}
## [1] 151
{% endhighlight %}
 
These fires are split unevenly.
 

{% highlight r %}
mydata$size <- NULL
mydata$size <- factor(ifelse(mydata$area < 5, 1, 0),
                       labels = c("small", "large"))
#tail(mydata[, c("size", "area")])  #  checks out
{% endhighlight %}
 
## Splitting the data
As usual, we need a training and testing data set to assess how well the model predicts data it hasn't seen before.
 

{% highlight r %}
train <- sample(x = nrow(mydata), size = 400, replace = FALSE)  # sample takes place from 1:x, convenience
#test, not train, use - selection
{% endhighlight %}
 
## Method
We use the `kernlab` package and the `ksvm()` function therein to fit an SVM using a non-linear kernel. We can use the argument `kernel = "polydot"` to set it to polynomial or `"rbfdot"` for a radial basis and `"tanhdot"` for the complicated sounding hyperbolic tangentsigmoid. Note the hugh amount of parameter customisation that is possible at this stage. For simplicity we use the default settings which will be far from optimal.
 

{% highlight r %}
m.poly <- ksvm(size ~ temp + RH + wind + rain,
          data = mydata[train, ],
          kernel = "polydot", C = 1)
{% endhighlight %}



{% highlight text %}
##  Setting default kernel parameters
{% endhighlight %}



{% highlight r %}
m.poly
{% endhighlight %}



{% highlight text %}
## Support Vector Machine object of class "ksvm" 
## 
## SV type: C-svc  (classification) 
##  parameter : cost C = 1 
## 
## Polynomial kernel function. 
##  Hyperparameters : degree =  1  scale =  1  offset =  1 
## 
## Number of Support Vectors : 253 
## 
## Objective Function Value : -233.2554 
## Training error : 0.29
{% endhighlight %}



{% highlight r %}
m.rad <- ksvm(size ~ temp + RH + wind + rain,
          data = mydata[train, ],
          kernel = "rbfdot", C = 1)
m.rad
{% endhighlight %}



{% highlight text %}
## Support Vector Machine object of class "ksvm" 
## 
## SV type: C-svc  (classification) 
##  parameter : cost C = 1 
## 
## Gaussian Radial Basis kernel function. 
##  Hyperparameter : sigma =  0.707154731369717 
## 
## Number of Support Vectors : 277 
## 
## Objective Function Value : -221.0374 
## Training error : 0.265
{% endhighlight %}



{% highlight r %}
m.tan <- ksvm(size ~ temp + RH + wind + rain,
          data = mydata[train, ],
          kernel = "tanhdot", C = 1)
{% endhighlight %}



{% highlight text %}
##  Setting default kernel parameters
{% endhighlight %}



{% highlight r %}
m.tan
{% endhighlight %}



{% highlight text %}
## Support Vector Machine object of class "ksvm" 
## 
## SV type: C-svc  (classification) 
##  parameter : cost C = 1 
## 
## Hyperbolic Tangent kernel function. 
##  Hyperparameters : scale =  1  offset =  1 
## 
## Number of Support Vectors : 189 
## 
## Objective Function Value : -1746.213 
## Training error : 0.4675
{% endhighlight %}
 
Using the simple defaults, the radial basis non-linear mapping for the SVM appears equivalent to the polynomial, based on the lower training error; with the polynomial slightly better. We should evaulate the model performance using the `predict()` function. In order to examine how well our classifier performed we need to compare our predicted `size` of the fire with the actual size in the test dataset.
 
## Test with training data
 

{% highlight r %}
pred <- predict(m.rad, newdata = mydata[-train, ], type = "response")
 
table(pred, mydata[-train, "size"][[1]])  #  [[]] gives the contents of a list
{% endhighlight %}



{% highlight text %}
##        
## pred    small large
##   small     1     2
##   large    33    81
{% endhighlight %}



{% highlight r %}
confusionMatrix(table(pred, mydata[-train, "size"][[1]]), positive = "small")  # from the caret package, also need e1071 package
{% endhighlight %}



{% highlight text %}
## Confusion Matrix and Statistics
## 
##        
## pred    small large
##   small     1     2
##   large    33    81
##                                          
##                Accuracy : 0.7009         
##                  95% CI : (0.6093, 0.782)
##     No Information Rate : 0.7094         
##     P-Value [Acc > NIR] : 0.6248         
##                                          
##                   Kappa : 0.0073         
##  Mcnemar's Test P-Value : 3.959e-07      
##                                          
##             Sensitivity : 0.029412       
##             Specificity : 0.975904       
##          Pos Pred Value : 0.333333       
##          Neg Pred Value : 0.710526       
##              Prevalence : 0.290598       
##          Detection Rate : 0.008547       
##    Detection Prevalence : 0.025641       
##       Balanced Accuracy : 0.502658       
##                                          
##        'Positive' Class : small          
## 
{% endhighlight %}
 
## Conclusion
A basic introduciton to SVM in R showing the workflow. Bear in mind we have some way to go in optimising and validating this model! Changing parameters is likely to improve our 70% accuracy achieved with the default settings.
 
 
## References
* Cortez, P., & Morais, A. (2007). A Data Mining Approach to Predict Forest Fires using Meteorological Data. New Trends in Artificial Intelligence, 512-523. Retrieved from http://www.dsi.uminho.pt/~pcortez/fires.pdf
* Crawley (2004). Statistics an introduction using R.
* James et al., (2014). An introduction to statistical learning with applications in R.
 

{% highlight r %}
sessionInfo()
{% endhighlight %}



{% highlight text %}
## R version 3.2.3 (2015-12-10)
## Platform: x86_64-w64-mingw32/x64 (64-bit)
## Running under: Windows >= 8 x64 (build 9200)
## 
## locale:
## [1] LC_COLLATE=English_United Kingdom.1252 
## [2] LC_CTYPE=English_United Kingdom.1252   
## [3] LC_MONETARY=English_United Kingdom.1252
## [4] LC_NUMERIC=C                           
## [5] LC_TIME=English_United Kingdom.1252    
## 
## attached base packages:
## [1] stats     graphics  grDevices utils     datasets  methods   base     
## 
## other attached packages:
##  [1] kernlab_0.9-23  boot_1.3-17     e1071_1.6-7     caret_6.0-64   
##  [5] ggplot2_2.0.0   lattice_0.20-33 ROCR_1.0-7      gplots_2.17.0  
##  [9] dplyr_0.4.3     testthat_0.11.0 knitr_1.12     
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.3        nloptr_1.0.4       formatR_1.2.1     
##  [4] plyr_1.8.3         class_7.3-14       bitops_1.0-6      
##  [7] iterators_1.0.8    tools_3.2.3        lme4_1.1-10       
## [10] digest_0.6.9       evaluate_0.8       memoise_0.2.1     
## [13] gtable_0.1.2       nlme_3.1-122       mgcv_1.8-9        
## [16] Matrix_1.2-3       foreach_1.4.3      DBI_0.3.1         
## [19] yaml_2.1.13        parallel_3.2.3     SparseM_1.7       
## [22] stringr_1.0.0      MatrixModels_0.4-1 gtools_3.5.0      
## [25] caTools_1.17.1     stats4_3.2.3       nnet_7.3-11       
## [28] grid_3.2.3         R6_2.1.1           rmarkdown_0.9.2   
## [31] minqa_1.2.4        gdata_2.17.0       reshape2_1.4.1    
## [34] car_2.1-1          magrittr_1.5       splines_3.2.3     
## [37] scales_0.3.0       codetools_0.2-14   htmltools_0.3     
## [40] MASS_7.3-45        pbkrtest_0.4-4     rsconnect_0.4.1.11
## [43] assertthat_0.1     colorspace_1.2-6   quantreg_5.19     
## [46] KernSmooth_2.23-15 stringi_1.0-1      lazyeval_0.1.10   
## [49] munsell_0.4.2      crayon_1.3.1
{% endhighlight %}
