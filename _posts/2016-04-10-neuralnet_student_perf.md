---
title: "The magic of neural networks"
author: matt_gregory
comments: yes
date: '2016-04-10'
modified: 2016-04-11
layout: post
excerpt: "Student attainment prediction with neural networks"
published: true
status: publish
tags:
- R
- machine learning
- education
categories: Rstats
---
 
{% include _toc.html %}
 

 
Education is a key factor affecting long term economic progress. Success in the core subjects provide a linguistic and numeric scaffold for other subjects later in students' academic careers.The growth in school educational databases facilitates the use of Data Mining and Machine Learning practises to improve outcomes in these subjects by identifying factors that are indicative of failure (or success). Predicting outcomes allows educators to take corrective measures for weak students mitigating the risk of failure. 
 
## The Data  
The [data](https://archive.ics.uci.edu/ml/datasets/Student+Performance) were downloaded from the UCI Machine Learning database and inspired by Cortez *et al*., 2008. We used the maths results data only.
 
## The Approach  
 
_"Any sufficently advanced technology is indistinguishable from magic."_ - Arthur C. Clarke    
  
As a scientist I find any computational methodology that is loosely based on how the brain works inherently interesting. Although somewhat derided for its complexity and computational expense, this approach has seen a resurgence in popularity with deep learning problems, such as Youtube [cat video identification](http://www.wired.com/2012/06/google-x-neural-network/). We tackle a simpler problem here that I previously approached with the decision tree method. Let's see how the default methods compare to the 95% classification accuracy of the decision tree, which also had the benefit of being readily intelligible.  
 
Neural networks use concepts borrowed from an understanding of animal brains in order to model arbitary functions. We can use multiple hidden layers in the network to provide deep learning, this approach is commonly called the Multilayer Perceptron.
 

{% highlight r %}
#PACKAGES
library(dplyr)
library(neuralnet)
library(RItools)
library(devtools)
 
source_url('https://gist.github.com/fawda123/7471137/raw/cd6e6a0b0bdb4e065c597e52165e5ac887f5fe95/nnet_plot_update.r')
 
set.seed(1337)
 
#INPUT
mydata <- "data/2016-04-10-neuralnet_student_perf.csv" 
mydata <- read.table(mydata, sep = ";",
                     header = TRUE)
#mydata <- tbl_df(mydata)
{% endhighlight %}
 
From the codebook we know that `G3` is the final grade of the students. We can inspect it's distribution using a `hist`. It has been standardised to range from 0-20.
 

{% highlight r %}
hist(mydata$G3)
{% endhighlight %}

![plot of chunk 2016-04-10_hist](/figures/2016-04-10_hist-1.svg)
 
## The magical black box that is the neural networks
`G3` is pretty normally distributed, despite the dodgy tail. Previously we converted it into a binary output and then used a decision tree approach to make predictions from associated student characteristics. We use the neural network approach here while maintaining `G3` as an integer variable with a range of 1-20.
 
First we start off by identifying variables we think will be useful based on expert domain knowledge. We then [normalise](http://www.machinegurning.com/rstats/student-performance/) the continuous variables to ensure equal weighting when measuring distance and check for missing values.
 

 
## Training and test datasets.
We need to split the data so we can build the model and then test it, to see if it generalises well. The data arrived in a random order so we split it in an analagous way to how we did it with the [decision tree](http://www.machinegurning.com/rstats/student-performance/) method.
 

{% highlight r %}
data_train <- data_interest[1:350, ]  # we want to compare to decision tree method!
data_test <- data_interest[351:395, ] # all the columns or variables are selected
 
#data_train <- sample_frac(data_interest, 0.8)  # 80% train, 20% test
#data_test <- setdiff(data_interest, data_train)
{% endhighlight %}
 
Now we need to train the model on the data using the `neuralnet()` function using backpropogation from the package of the same name using the default settings. We specify a linear output as we are doing a regression not a classification. First we fit a model using relevant continuous normalised variables, omitting the non-numeric encoded factors, such as gender for now.
 

{% highlight r %}
#TRAIN the model on the data
#n <- names(data_train)
#f <- as.formula(paste("G3 ~", paste(n[!n %in% "G3"], collapse = " + ")))
# as pointed out by an R bloggers post, we mustwrite the formula and pass it as an argument
# http://www.r-bloggers.com/fitting-a-neural-network-in-r-neuralnet-package/
 
 
net_model <- neuralnet(G3 ~ G1 + G2 + goout + 
       absences + failures + Fedu + Medu,
                            data = data_train, hidden = 1, linear.output = TRUE)
print(net_model)
{% endhighlight %}



{% highlight text %}
## Call: neuralnet(formula = G3 ~ G1 + G2 + goout + absences + failures +     Fedu + Medu, data = data_train, hidden = 1, linear.output = TRUE)
## 
## 1 repetition was calculated.
## 
##         Error Reached Threshold Steps
## 1 1.594919534    0.008259923976   710
{% endhighlight %}



{% highlight r %}
plot.nnet(net_model)
{% endhighlight %}

![plot of chunk 2016-04-10_net1](/figures/2016-04-10_net1-1.svg)
 
Generally, the input layer (I) is considered a distributor of the signals from the external world. Hidden layers (H) are considered to be categorizers or feature detectors of such signals. The output layer (O) is considered a collector of the features detected and producer of the response. While this view of the neural network may be helpful in conceptualizing the functions of the layers, you should not take this model too literally as the functions described can vary widely. Bias layers (B) aren't all that informative ,  they are analogous to intercept terms in a regression model.
 
## Evaluating the neural network model
Note how we use the `compute()` function to generate predictions on the testing dataset (rather than `predict()`). Also rather than assessing whether we were right or wrong (compared to classification) we need to compare our predicted G3 score with the actual score, we can acheive this by comparing how the predicted results covary with the real data.
 

{% highlight r %}
model_results <- compute(net_model, data_test[c("G1", "G2", "goout", "absences", 
                                                "failures", "Fedu", "Medu")])
predicted_G3 <- model_results$net.result
 
cor(predicted_G3, data_test$G3)[ , 1]  # can vary depending on random seed
{% endhighlight %}



{% highlight text %}
## [1] 0.9216071625
{% endhighlight %}



{% highlight r %}
plot(predicted_G3, data_test$G3, 
     main = "1 hidden node layers", ylab = "Real G3")  # line em up, aid visualisation
abline(a = 0, b = 1, col = "black") 
{% endhighlight %}

![plot of chunk 2016-04-10_net2](/figures/2016-04-10_net2-1.svg)
 
Here we compare to a 1:1 abline in black. It would be interesting to compare how this approach fares against a standard linear regression. Let's add some extra complexity by adding some more hidden nodes.
 

{% highlight r %}
net_model2 <- neuralnet(G3 ~ G1 + G2 + goout + 
       absences + failures + Fedu + Medu,
                            data = data_train, hidden = 5, linear.output = TRUE)
print(net_model2)
{% endhighlight %}



{% highlight text %}
## Call: neuralnet(formula = G3 ~ G1 + G2 + goout + absences + failures +     Fedu + Medu, data = data_train, hidden = 5, linear.output = TRUE)
## 
## 1 repetition was calculated.
## 
##         Error Reached Threshold Steps
## 1 1.183841225    0.009654936966  6281
{% endhighlight %}



{% highlight r %}
plot.nnet(net_model2)
{% endhighlight %}

![plot of chunk 2016-04-10_net3](/figures/2016-04-10_net3-1.svg)
 
Now we evaluate as before.
 

{% highlight r %}
#now evaluate as before
 
model_results2 <- compute(net_model2, data_test[c("G1", "G2", "goout", "absences", 
                                                "failures", "Fedu", "Medu")])
predicted_G3_2 <- model_results2$net.result
 
cor(predicted_G3_2, data_test$G3)[ , 1]  # can vary depending on random seed
{% endhighlight %}



{% highlight text %}
## [1] 0.9591425577
{% endhighlight %}



{% highlight r %}
plot(predicted_G3_2, data_test$G3,
     main = "5 hidden node layers", ylab = "Real G3")  # line em up, aid visualisation
abline(a = 0, b = 1, col = "black") 
{% endhighlight %}

![plot of chunk 2016-04-10_net4](/figures/2016-04-10_net4-1.svg)
 
A slight improvement, on parr with the Decision Tree approach, even though some variables that we know to be useful were excluded from this modelling exercise. We can improve things by incoporating them into the model. Furthermore, this is not just a pass or fail classification, this provides a predicted exam score in `G3` for any student.    
 
A caveat, prior to any conclusions the model should be validated using cross-validation which provides some protection against under or over-fitting (the risk of overfitting increases as we increase the number of hidden nodes). Furthermore interpretability is an issue, I have a prediction but limited understanding of what is going on.
 
***
 
## References
* Cortez and Silva (2008). Using data mining to predict secondary school performance.
* Crawley (2004). Statistics an introduction using R.
* James et al., (2014). An introduction to statistical learning with applications in R.
* Machine Learning with R, Chapter 7  
* Rumelhart et al, (1986). Nature 323, 533-536  
* Yeh, (1998). Cement and Concrete Research 28, 1797-1808  
* [R-bloggers](http://www.r-bloggers.com/fitting-a-neural-network-in-r-neuralnet-package/)  
* [Neuralyst](http://www.cheshireeng.com/Neuralyst/nnbg.htm#nnstruct)  
 

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
## [1] grid      stats     graphics  grDevices utils     datasets  methods  
## [8] base     
## 
## other attached packages:
##  [1] reshape_0.8.5   scales_0.3.0    devtools_1.9.1  RItools_0.1-13 
##  [5] neuralnet_1.32  MASS_7.3-45     magrittr_1.5    dplyr_0.4.3    
##  [9] testthat_0.11.0 knitr_1.12     
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.3        munsell_0.4.2      colorspace_1.2-6  
##  [4] xtable_1.8-0       R6_2.1.1           plyr_1.8.3        
##  [7] stringr_1.0.0      httr_1.0.0         tools_3.2.3       
## [10] parallel_3.2.3     DBI_0.3.1          lazyeval_0.1.10   
## [13] abind_1.4-3        assertthat_0.1     digest_0.6.9      
## [16] crayon_1.3.1       formatR_1.2.1      rsconnect_0.4.1.11
## [19] svd_0.3.3-2        curl_0.9.4         memoise_0.2.1     
## [22] evaluate_0.8       stringi_1.0-1      SparseM_1.7
{% endhighlight %}
