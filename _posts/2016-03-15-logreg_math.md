---
title: "Logistic regression for student performance prediction"
author: matt_gregory
comments: yes
date: '2016-03-15'
modified: 2016-03-21
layout: post
excerpt: "Predicting student end of year performance using logistic regression"
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
 
Classification problems occur often, perhaps even more so than regression problems. Consider the [Cortez student maths attainment data](https://archive.ics.uci.edu/ml/datasets/Student+Performance) discussed in previous [posts](http://www.machinegurning.com/rstats/student-performance/). The response variable, final grade of the year (range 0-20), `G3` can be classified into a binary pass or fail variable called `final`, based on a threshold mark. We used a decision tree approach to model this data before which provided 95% accuracy and had the benefit of interpretability. We will now model this using logistic regression so we can attach probabilities to our student pass or fail predictions. 
 

{% highlight r %}
library(dplyr)
library(ROCR)
library(caret)
library(e1071)
library(boot)
 
#INPUT
mydata <- "data/2016-03-15-logreg_math.csv" 
mydata <- read.table(mydata, sep = ";",
                     header = TRUE)
{% endhighlight %}
 
## Make the final grade binary (pass and fail)
`G3` is pretty normally distributed, despite the dodgy tail. To simplify matters converted `G3` marks below 10 as a fail, above or equal to 10 as a pass. Often a school is judged by whether students meet a critcal boundary, in the UK it is a C grade at GCSE for example. Rather than modelling this response Y directly, logistic regression models the probability that Y belongs to a particular category.
 

{% highlight r %}
mydata$final <- NULL
mydata$final <- factor(ifelse(mydata$G3 >= 10, 1, 0),
                       labels = c("fail", "pass"))
data_interest <- mydata
{% endhighlight %}
 
From our learnings of the decision tree we can include the variables that were shown to be important predictors in this multiple logistic regression.
 
## Objective  
- Using the training data estimate the regression coefficients using maximum likelihood.  
- Use these coefficients to predict the test data and compare with reality.
- Evaluate the binary classifier with receiver operating characteristic curve (ROC).
- Evaluate the logistic regression performance with the resampling method cross-validation
 
## Training and test datasets.
We need to split the data so we can build the model and then test it, to see if it generalises well. The data arrived in a random order.
 

{% highlight r %}
data_train <- data_interest[1:350, ]
data_test <- data_interest[351:395, ]
{% endhighlight %}
 
Now we need to train the model using the data. From our decision tree we know that the prior attainment data variables `G1` and `G2` are important as are the `Fjob` and `reason` variables. We fit a logistic regression model in order to predict `final` using the variables mentioned in the previous sentence.
 

{% highlight r %}
m1 <- glm(final ~ G1 + G2 + Fjob + reason, data = data_train, family = binomial)
summary(m1)
{% endhighlight %}



{% highlight text %}
## 
## Call:
## glm(formula = final ~ G1 + G2 + Fjob + reason, family = binomial, 
##     data = data_train)
## 
## Deviance Residuals: 
##      Min        1Q    Median        3Q       Max  
## -2.96026  -0.02844   0.00479   0.11783   2.68046  
## 
## Coefficients:
##                   Estimate Std. Error z value Pr(>|z|)    
## (Intercept)      -22.26860    3.37459  -6.599 4.14e-11 ***
## G1                 0.19925    0.17558   1.135   0.2565    
## G2                 1.98273    0.31776   6.240 4.38e-10 ***
## Fjobhealth         0.96166    1.61754   0.595   0.5522    
## Fjobother          2.80406    1.14546   2.448   0.0144 *  
## Fjobservices       1.24826    1.15319   1.082   0.2791    
## Fjobteacher        2.37057    1.77436   1.336   0.1815    
## reasonhome         0.19608    0.58259   0.337   0.7364    
## reasonother        1.67970    1.04244   1.611   0.1071    
## reasonreputation   0.03099    0.63295   0.049   0.9609    
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## (Dispersion parameter for binomial family taken to be 1)
## 
##     Null deviance: 440.30  on 349  degrees of freedom
## Residual deviance: 116.81  on 340  degrees of freedom
## AIC: 136.81
## 
## Number of Fisher Scoring iterations: 8
{% endhighlight %}
The model does appear to suffer from overdispersion. The p-values associated with `reason` are all non-significant. Following Crawley's recommendation we attempt model simplification by removing this term from the model after changing the model family argument to `family = quasibinomial`. 
 

{% highlight r %}
m1 <- glm(final ~ G1 + G2 + Fjob + reason, data = data_train, family = quasibinomial)
{% endhighlight %}
We use the more conservative "F-test" to compare models due to the quasibinomial error distribution, after Crawley.
 

{% highlight r %}
m2 <- update(m1, ~. - reason)  #  the model is identical except removal of reason variable
anova(m1, m2, test = "F") 
{% endhighlight %}



{% highlight text %}
## Analysis of Deviance Table
## 
## Model 1: final ~ G1 + G2 + Fjob + reason
## Model 2: final ~ G1 + G2 + Fjob
##   Resid. Df Resid. Dev Df Deviance      F Pr(>F)
## 1       340     116.81                          
## 2       343     119.53 -3  -2.7241 1.3662 0.2529
{% endhighlight %}
 
No difference in explanatory power between the models. There is no evidence that `reason` is associated with a students pass or fail in their end of year maths exam. We continue model simplification after using `summary()` (not shown).
 

{% highlight r %}
m3 <- update(m2, ~. - G1)
anova(m2, m3, test = "F")
{% endhighlight %}



{% highlight text %}
## Analysis of Deviance Table
## 
## Model 1: final ~ G1 + G2 + Fjob
## Model 2: final ~ G2 + Fjob
##   Resid. Df Resid. Dev Df Deviance      F Pr(>F)
## 1       343     119.53                          
## 2       344     120.29 -1 -0.75605 1.2107  0.272
{% endhighlight %}
 
We don't need the earlier `G1` exam result as we have `G2` in the model already. What happens if we remove `Fjob`?
 

{% highlight r %}
m4 <- update(m3, ~. - Fjob)
anova(m3, m4, test = "F")
{% endhighlight %}



{% highlight text %}
## Analysis of Deviance Table
## 
## Model 1: final ~ G2 + Fjob
## Model 2: final ~ G2
##   Resid. Df Resid. Dev Df Deviance      F    Pr(>F)    
## 1       344     120.29                                 
## 2       348     134.06 -4  -13.775 5.2966 0.0003768 ***
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
{% endhighlight %}
 
We lose explanatory power, we need to keep `Fjob` in the model. This gives us our minimal adequate model. `Fjob` is a useful predictor but perhaps we could reduce the number of levels by recoding the variable as only some of the jobs seem useful as predictors.
 
## Contrasts
 
For a better understanding of how R dealt with the categorical variables, we can use the `contrasts()` function. This function will show us how the variables have been dummyfied by R and how to interpret them in a model. Note how the default in R is to use alphabetical order.
 

{% highlight r %}
contrasts(data_train$final)  #  fail as zero, pass as one; logical
{% endhighlight %}



{% highlight text %}
##      pass
## fail    0
## pass    1
{% endhighlight %}



{% highlight r %}
contrasts(data_train$Fjob)
{% endhighlight %}



{% highlight text %}
##          health other services teacher
## at_home       0     0        0       0
## health        1     0        0       0
## other         0     1        0       0
## services      0     0        1       0
## teacher       0     0        0       1
{% endhighlight %}
 
## Model interpretation
 

{% highlight r %}
summary(m3)
{% endhighlight %}



{% highlight text %}
## 
## Call:
## glm(formula = final ~ G2 + Fjob, family = quasibinomial, data = data_train)
## 
## Deviance Residuals: 
##      Min        1Q    Median        3Q       Max  
## -2.96489  -0.03611   0.00746   0.12873   2.55348  
## 
## Coefficients:
##              Estimate Std. Error t value Pr(>|t|)    
## (Intercept)  -20.8371     2.4770  -8.412 1.09e-15 ***
## G2             2.0358     0.2300   8.850  < 2e-16 ***
## Fjobhealth     1.1546     1.2463   0.926  0.35488    
## Fjobother      2.8266     0.8916   3.170  0.00166 ** 
## Fjobservices   1.3300     0.8913   1.492  0.13656    
## Fjobteacher    2.5742     1.3610   1.891  0.05941 .  
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## (Dispersion parameter for quasibinomial family taken to be 0.6501799)
## 
##     Null deviance: 440.30  on 349  degrees of freedom
## Residual deviance: 120.29  on 344  degrees of freedom
## AIC: NA
## 
## Number of Fisher Scoring iterations: 8
{% endhighlight %}
 
The smallest p-value here is assocaited with `G2`. The positive coefficient for this predictor suggests that an increase in `G2` is associated increase in the probability of `final = pass`. To be precise a one-unit increase in `G2` is associated with an increase in the log odds of `pass` by 2.0357671.
 

{% highlight r %}
glm.probs <- predict(m3, newdata = data_test, type = "response")  # predicted probabilities
glm.pred <- rep("fail", 45)  #  convert into pass or fail
glm.pred[glm.probs > 0.5] = "pass"  #  index
 
confusionMatrix(table(glm.pred, data_test$final), positive = "pass")  # from the caret package, also need e1071 package
{% endhighlight %}



{% highlight text %}
## Confusion Matrix and Statistics
## 
##         
## glm.pred fail pass
##     fail   17    2
##     pass    0   26
##                                           
##                Accuracy : 0.9556          
##                  95% CI : (0.8485, 0.9946)
##     No Information Rate : 0.6222          
##     P-Value [Acc > NIR] : 2.1e-07         
##                                           
##                   Kappa : 0.9076          
##  Mcnemar's Test P-Value : 0.4795          
##                                           
##             Sensitivity : 0.9286          
##             Specificity : 1.0000          
##          Pos Pred Value : 1.0000          
##          Neg Pred Value : 0.8947          
##              Prevalence : 0.6222          
##          Detection Rate : 0.5778          
##    Detection Prevalence : 0.5778          
##       Balanced Accuracy : 0.9643          
##                                           
##        'Positive' Class : pass            
## 
{% endhighlight %}
 

 
The first command predicts the probability of the test students' characteristics resulting in a `pass` based on the `glm()` built using the training data. The second and third command creates a vector of 45 `fails` with those probabilities greater than 50% being converted into `pass`. The predicted passes and failures are compared with the real ones in a table with a test error of 4.444%.
 
## Model performance
As a last step, we are going to plot the ROC curve and calculate the AUC (area under the curve) which are typical performance measurements for a binary classifier.
 The ROC is a curve generated by plotting the true positive rate (TPR) against the false positive rate (FPR) at various threshold settings while the AUC is the area under the ROC curve. As a rule of thumb, a model with good predictive ability should have an AUC closer to 1 (1 is ideal) than to 0.5.
 

{% highlight r %}
pr <- prediction(glm.probs, data_test$final)
prf <- performance(pr, measure = "tpr", x.measure = "fpr")
plot(prf)
{% endhighlight %}

![plot of chunk 2016-03-15_plot_prf](/figures/2016-03-15_plot_prf-1.svg)

{% highlight r %}
auc <- performance(pr, measure = "auc")
auc <- auc@y.values[[1]]
auc
{% endhighlight %}



{% highlight text %}
## [1] 0.9884454
{% endhighlight %}
 
 
## Conclusion
The 0.95 accuracy on the test set is quite a good result and an AUC of 0.9884454. However, keep in mind that this result is somewhat dependent on the manual split of the data that I made earlier, therefore if you wish for a more precise score, you would be better off running some kind of cross validation such as k-fold cross validation. The logistic regression also provides coefficients allowing a quantitative understanding of the association between a variable and the odss of success which can be useful.
 
## Leave-one-out cross-validation for Generalized Linear Models
As mentioned above let's conduct a cross validation using the `cv.glm()` function from the [boot](http://www.inside-r.org/r-doc/boot/cv.glm) package.This function calculates the estimated K-fold cross-validation prediction error for generalized linear models. We produce our model `glm.fit` based on our earlier learnings. We follow guidance of the Chapter 5.3.2 cross-validation lab session in James et al., 2014.
 

{% highlight r %}
set.seed(1337)
glm.fit <- glm(final ~ G2 + Fjob, family = quasibinomial, data = data_interest)
cv.err <- cv.glm(data = data_interest, glmfit = glm.fit)
cv.err$delta
{% endhighlight %}



{% highlight text %}
## [1] 0.05632119 0.05631311
{% endhighlight %}
 

 
The `cv.glm()` function produces a list with several components. The two numbers in the `delta` vector contain the cross-validation results. Our cross-validation estimate for the test error is approximately 0.056.
 
## k-fold cross-validation
The `cv.glm()` function can also be used to implement k-fold cross-validation. Below we use k = 10, a common choice for k, on our data.
 

{% highlight r %}
set.seed(1337)
cv.err.10 <- cv.glm(data = data_interest, glmfit = glm.fit, K = 10)
cv.err.10$delta
{% endhighlight %}



{% highlight text %}
## [1] 0.05686960 0.05653651
{% endhighlight %}
On this data set, using this model, the two estimates are very close for K = 1 and K = 10. The error estimates are small, suggesting the model may perform OK if applied to predict future student `final` pass or fail.
 
## References
* Cortez and Silva (2008). Using data mining to predict secondary school performance.
* Crawley (2004). Statistics an introduction using R.
* James et al., (2014). An introduction to statistical learning with applications in R. Springer.
* http://www.r-bloggers.com/how-to-perform-a-logistic-regression-in-r/
* https://archive.ics.uci.edu/ml/datasets/Student+Performance
 

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
##  [1] boot_1.3-17     e1071_1.6-7     caret_6.0-64    ggplot2_2.0.0  
##  [5] lattice_0.20-33 ROCR_1.0-7      gplots_2.17.0   dplyr_0.4.3    
##  [9] testthat_0.11.0 knitr_1.12     
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
## [46] KernSmooth_2.23-15 stringi_1.0-1      munsell_0.4.2     
## [49] crayon_1.3.1
{% endhighlight %}
 
