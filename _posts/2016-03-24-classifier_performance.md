---
title: "Assessing classifier performance"
author: matt_gregory
comments: yes
date: '2016-03-24'
modified: 2016-03-28
layout: post
excerpt: "Evaluating performance of supervised learning tools"
published: true
status: publish
tags:
- R
- machine learning
- education
categories: Rstats
---
 
{% include _toc.html %}
 

 
 
## Introduction
 
* Actual class values  
* Predicted class values  
* Estimated probability of the prediction  
 
These are three main types of data that are used to evaluate a classifier. We have used the first two types in previous [blogs](http://rpubs.com/mammykins/svm_fires) where we constructed a confusion matrix to compare the actual class values and the predicted class when applying the trained model on the test data with a support vector machines classifier model.
 
## The Data  
The [data](https://archive.ics.uci.edu/ml/datasets/Student+Performance) was downloaded from the UCI Machine Learning database and inspired by Cortez *et al*., 2008. We use maths results data only. We start off by clearing the workspace, then setting the working directory to match the location of the student maths data file. A caveat, note that the data is not comma-seperated but semi-colon seperated, be sure to specify this in the `sep` argument in the `read.table()` function. Refer to the `sessionInfo()` output at the foot of this blog-post to determine which packages are installed and loaded for this blog.
 

{% highlight r %}
#PACKAGES
#PACKAGES
library(dplyr)
library(C50)
library(gmodels)
library(rpart)
library(rpart.plot)
library(caret)
library(ROCR)
 
#INPUT
mydata <- "data/2016-03-24-classifier_performance.csv" 
mydata <- read.table(mydata, sep = ";",
                     header = TRUE) 
{% endhighlight %}
 
Let's have a look at our data using the convenient `glimpse` courtesy of the `dplyr` package. Notice how the range of the numeric variables is similar as we have used our custom `normalise()` function. We also convert the `G3` to a binary pass or fail grade called `final` and use this as our class that we wish to predict for future students. Are they going to pass or fail that all important end of year exam?
 

{% highlight text %}
## Observations: 395
## Variables: 13
## $ school   (fctr) GP, GP, GP, GP, GP, GP, GP, GP, GP, GP, GP, GP, GP, ...
## $ sex      (fctr) F, F, F, F, F, M, M, F, M, M, F, F, M, M, M, F, F, F...
## $ G1       (dbl) 0.1250, 0.1250, 0.2500, 0.7500, 0.1875, 0.7500, 0.562...
## $ G2       (dbl) 0.3157895, 0.2631579, 0.4210526, 0.7368421, 0.5263158...
## $ Mjob     (fctr) at_home, at_home, at_home, health, other, services, ...
## $ Fjob     (fctr) teacher, other, other, services, other, other, other...
## $ goout    (dbl) 0.75, 0.50, 0.25, 0.25, 0.25, 0.25, 0.75, 0.75, 0.25,...
## $ absences (dbl) 0.08000000, 0.05333333, 0.13333333, 0.02666667, 0.053...
## $ reason   (fctr) course, course, other, home, home, reputation, home,...
## $ failures (dbl) 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,...
## $ Fedu     (dbl) 1.00, 0.25, 0.25, 0.50, 0.75, 0.75, 0.50, 1.00, 0.50,...
## $ Medu     (dbl) 1.00, 0.25, 0.25, 1.00, 0.75, 1.00, 0.50, 1.00, 0.75,...
## $ final    (fctr) fail, fail, pass, pass, pass, pass, pass, fail, pass...
{% endhighlight %}
 
In an earlier [post](http://www.machinegurning.com/rstats/student-performance/) we describe all the steps for building this decision tree classifier in detail, we will not repeat that here but instead carry on and attempt to evaluate the classifier's performance. The model looked like this:
 

{% highlight r %}
m
{% endhighlight %}



{% highlight text %}
## 
## Call:
## C5.0.default(x = data_train[-13], y = data_train$final)
## 
## Classification Tree
## Number of samples: 350 
## Number of predictors: 12 
## 
## Tree size: 8 
## 
## Non-standard options: attempt to group attributes
{% endhighlight %}



{% highlight r %}
summary(m)
{% endhighlight %}



{% highlight text %}
## 
## Call:
## C5.0.default(x = data_train[-13], y = data_train$final)
## 
## 
## C5.0 [Release 2.07 GPL Edition]  	Mon Mar 28 20:27:42 2016
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



{% highlight r %}
#create tree using rpart, so we can plot it
m2 <- rpart(final ~ . , data = data_train, method = 'class')
#Plot it
prp(m2,varlen = 4, extra = 2)  # plot with shortened abrreviated variable names
{% endhighlight %}

![plot of chunk 2016-03-24_tree_m](/figures/2016-03-24_tree_m-1.svg)
 
We evaluate by comparing real outcome with predicted outcome of students exam result.
 

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
 
93.4% model accuracy not bad, 3 students proved us wrong and passed anyway! Seems like a useful model for identifying students who need extra intervention and importantly it can be applied and interpreted by a human.
 
To dig deeper and output the predicted probabilities for a C5.0 classifier we can set `type = "prob"`. We `cbind()` these columns produced by the model regarding the test data and look at it. Where `p` is the predicted class and the probabilities of pass or fail based on the model are given in the final two columns. Notice that when the predicted type `p` is pass, the probability of `pass` is near one but near zero when `p` is failure.
 

{% highlight r %}
predicted_prob <- predict(m, data_test, type = "prob")
m_results <- (cbind(data_test, p, predicted_prob)
     )
head(m_results)
{% endhighlight %}



{% highlight text %}
##     school sex     G1        G2     Mjob     Fjob goout   absences reason
## 351     MS   M 0.3125 0.3684211    other services  0.75 0.10666667   home
## 352     MS   M 0.6250 0.6842105   health    other  0.75 0.02666667 course
## 353     MS   M 0.3125 0.3684211  at_home services  0.50 0.09333333 course
## 354     MS   M 0.3125 0.4210526    other    other  0.75 0.05333333   home
## 355     MS   M 0.6250 0.5789474 services    other  1.00 0.05333333   home
## 356     MS   F 0.4375 0.4736842 services services  0.75 0.00000000 course
##      failures Fedu Medu final    p       fail       pass
## 351 1.0000000 0.25 0.25  fail fail 0.98746032 0.01253968
## 352 0.0000000 0.75 0.75  pass pass 0.03699048 0.96300952
## 353 0.3333333 0.75 0.25  fail fail 0.98746032 0.01253968
## 354 0.3333333 0.25 0.25  fail fail 0.80646616 0.19353384
## 355 0.0000000 0.75 1.00  pass pass 0.03699048 0.96300952
## 356 0.0000000 0.75 0.75  fail fail 0.83302521 0.16697479
{% endhighlight %}
 
We can identify what is happening when the predicted and actual values differ using the `subset()` function.
 

{% highlight r %}
head(subset(m_results, 
            final != p))  #  when actual does not match predicted pass or fail
{% endhighlight %}



{% highlight text %}
##     school sex     G1        G2    Mjob     Fjob goout   absences reason
## 376     MS   F 0.3125 0.4210526   other    other  0.25 0.02666667   home
## 378     MS   F 0.3125 0.4736842 teacher services  0.50 0.05333333 course
## 386     MS   F 0.4375 0.4736842 at_home    other  0.50 0.02666667  other
##     failures Fedu Medu final    p      fail      pass
## 376        0 0.25 0.25  pass fail 0.8064662 0.1935338
## 378        0 1.00 1.00  pass fail 0.8330252 0.1669748
## 386        0 0.50 0.50  pass fail 0.7604082 0.2395918
{% endhighlight %}
 
Notice that the probabilities are somewhat less extreme. In spite of such mistakes is the model still useful? That depends somewhat on the context of the problem. We started looking at this data is a way to inform which students should be provided with extra intervention to turn them from a fail into a pass. The `CrossTable()` function used earlier describes the type of students we are failing which may make things more palatable. Rather than students slipping through not receiving the intervention, we would be exposing students to the intervention who would pass anyway, this may be more or less acceptable depending on the context of the problem.
 
## Beyond accuracy
We can also use the `confusionMatrix()` function from the caret package to provide other measures of accuracy but we must specify the "positive" outcome. We can also determine the sensitivity and specificity of the model.
 

{% highlight r %}
#CARET package functions
confusionMatrix(m_results$p, m_results$final, positive = "pass")
{% endhighlight %}



{% highlight text %}
## Confusion Matrix and Statistics
## 
##           Reference
## Prediction fail pass
##       fail   17    3
##       pass    0   25
##                                          
##                Accuracy : 0.9333         
##                  95% CI : (0.8173, 0.986)
##     No Information Rate : 0.6222         
##     P-Value [Acc > NIR] : 1.906e-06      
##                                          
##                   Kappa : 0.8629         
##  Mcnemar's Test P-Value : 0.2482         
##                                          
##             Sensitivity : 0.8929         
##             Specificity : 1.0000         
##          Pos Pred Value : 1.0000         
##          Neg Pred Value : 0.8500         
##              Prevalence : 0.6222         
##          Detection Rate : 0.5556         
##    Detection Prevalence : 0.5556         
##       Balanced Accuracy : 0.9464         
##                                          
##        'Positive' Class : pass           
## 
{% endhighlight %}
 
We may prefer the situation that a couple of students are getting additional help they don't need with its associated costs rather than students are missing out on passing a crucial exam. We can use this data, the model and associated accuracy statistics to inform decision making.
 
## Visualising performance
To create visualisations with `ROCR` package, two vectors of data are needed. The predicted class values and the probability of the positive class. These are combined using the `prediction()` function.
 

{% highlight r %}
pred <- prediction(predictions = m_results$pass, labels = m_results$final)
perf <- performance(pred, measure = "tpr", x.measure = "fpr")
plot(perf, main = "ROC curve for student maths exam pass intervention decision tool",
     col = "blue", lwd = 3)  # visualise the ROC curve from the perf object using R's plot()
abline(a = 0, b = 1, lwd = 2, lty = 2) #  add a line with no predictive value for comparison
{% endhighlight %}

![plot of chunk 2016-03-24_ROC_plot](/figures/2016-03-24_ROC_plot-1.svg)
 
Qualitatively, we see that our ROC curve appears to occupy the space in the top-left corner of the diagram, which suggests that it is closer to a perfect classifier.
 
## Resampling methods
However, we still havn't addressed how well the model performs if applied to data it hasn't seen yet (beyond the single instance of the test data). Cross-validation and bootstrapping methods can help us understand the models accuracy further, but will be discussed in a later post.
 
 
## References
* Cortez and Silva (2008). Using data mining to predict secondary school performance.
* Lantz, B. (2013). Machine Learning with R. Packt Publishing Ltd.
* James et al., (2014). An introduction to statistical learning with applications in R. Springer.
* Tobias Sing, Oliver Sander, Niko Beerenwinkel, Thomas Lengauer. ROCR: visualizing classifier performance in R. Bioinformatics 21(20):3940-3941 (2005).
* Max Kuhn. Contributions from Jed Wing, Steve Weston, Andre Williams, Chris Keefer,
  Allan Engelhardt, Tony Cooper, Zachary Mayer, Brenton Kenkel, the R Core Team,
  Michael Benesty, Reynald Lescarbeau, Andrew Ziem, Luca Scrucca, Yuan Tang and Can
  Candan. (2016). caret: Classification and Regression Training. R package version
  6.0-64. https://CRAN.R-project.org/package=caret
 

{% highlight r %}
sessionInfo()
{% endhighlight %}



{% highlight text %}
## R version 3.2.4 Revised (2016-03-16 r70336)
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
##  [1] ROCR_1.0-7           gplots_2.17.0        caret_6.0-64        
##  [4] ggplot2_2.1.0        lattice_0.20-33      rpart.plot_1.5.3    
##  [7] rpart_4.1-10         gmodels_2.16.2       C50_0.1.0-24        
## [10] dplyr_0.4.3.9001     testthat_0.11.0.9000 knitr_1.12.3        
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.4        nloptr_1.0.4       formatR_1.2.1     
##  [4] plyr_1.8.3         class_7.3-14       bitops_1.0-6      
##  [7] iterators_1.0.8    tools_3.2.4        lme4_1.1-10       
## [10] partykit_1.0-5     digest_0.6.9       evaluate_0.8      
## [13] memoise_1.0.0      tibble_1.0         gtable_0.1.2      
## [16] nlme_3.1-126       mgcv_1.8-12        Matrix_1.2-4      
## [19] foreach_1.4.3      DBI_0.3.1          parallel_3.2.4    
## [22] SparseM_1.7        e1071_1.6-7        stringr_1.0.0     
## [25] caTools_1.17.1     MatrixModels_0.4-1 gtools_3.5.0      
## [28] stats4_3.2.4       grid_3.2.4         nnet_7.3-11       
## [31] R6_2.1.2           survival_2.38-3    minqa_1.2.4       
## [34] gdata_2.17.0       reshape2_1.4.1     car_2.1-1         
## [37] magrittr_1.5       scales_0.3.0       codetools_0.2-14  
## [40] MASS_7.3-44        splines_3.2.4      pbkrtest_0.4-4    
## [43] assertthat_0.1     colorspace_1.2-6   quantreg_5.19     
## [46] KernSmooth_2.23-15 stringi_1.0-1      lazyeval_0.1.10   
## [49] munsell_0.4.2      crayon_1.3.1
{% endhighlight %}
