---
title: "Sparking your interest in a dry subject"
author: matt_gregory
comments: yes
date: '2016-09-19'
modified: 2016-09-26
layout: post
excerpt: "Using Spark and R for regression of concrete strength"
published: true
status: processed
tags:
- Regression
- Spark
- Neural Network
- Linear Regression
- R
categories: Rstats
---
 

 
I recently attended the conference Effective Applications of the R language in London. One of the many excellent speakers described how one can use [Spark](https://www.r-bloggers.com/spark-2-0-more-performance-more-statistical-models/) to apply some simple Machine Learning to larger data sets and then extend the range of potential models by simply adding [water](http://koaning.io/sparling-water-for-sparkr.html).  
 
We explore some of the main features and how to get started in this blog. Spark is a general purpose cluster computing system.  
 
## Installation
 
Follow the guidance on [Github](https://github.com/rstudio/sparklyr).
 
## Connecting to Spark
 
Now we form a local Spark connection.
 

{% highlight r %}
library(sparklyr)
sc <- spark_connect(master = "local")  #  The Spark connection
{% endhighlight %}
 
## Hadoop
 
As I'm running on Windows I get an error, I need to get an embedded copy of Hadoop winutils.exe from [here](embedded copy of Hadoop winutils.exe).  
 
## Java
 
I get another erorr, I need [Java](https://www.java.com/en/) also! Success.
 
## Reading data
 
Typically one reads data within the Spark cluster using the `spark_read` family of functions. For convenience and reproducibility we use a small local data set also avaliable online at the [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets/Concrete+Compressive+Strength). Typically we might want to read from a remote SQL data table on a server.  
 
We are interested in predicting the strength of concrete, a critical component of civil infrastructure, based on the non-linear relationship between it's ingredients and age. We read in the data and normalise all the quantitative variables.
 

{% highlight r %}
normalise <- function(x) {
  return((x - min(x)) / (max(x) - min(x)))
}  #  custom function to normalise, OK as there are no NA
 
library(tidyverse)
 
concrete <- read.csv("data/2016-09-19-concrete.csv", header = TRUE)
 
concrete_norm <- concrete %>%
  lapply(normalise) %>%
  as.data.frame()
  
concrete_tbl <- copy_to(sc, concrete_norm, "concrete", overwrite = TRUE)
glimpse(concrete_tbl)
{% endhighlight %}



{% highlight text %}
## Observations: NA
## Variables: 9
## $ cement       <dbl> 1.00000000000, 1.00000000000, 0.52625570776, 0.52...
## $ slag         <dbl> 0.0000000000, 0.0000000000, 0.3964941569, 0.39649...
## $ ash          <dbl> 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0...
## $ water        <dbl> 0.3210862620, 0.3210862620, 0.8482428115, 0.84824...
## $ superplastic <dbl> 0.07763975155, 0.07763975155, 0.00000000000, 0.00...
## $ coarseagg    <dbl> 0.6947674419, 0.7383720930, 0.3808139535, 0.38081...
## $ fineagg      <dbl> 0.2057200201, 0.2057200201, 0.0000000000, 0.00000...
## $ age          <dbl> 0.074175824176, 0.074175824176, 0.739010989011, 1...
## $ strength     <dbl> 0.96748473901, 0.74199576430, 0.47265479008, 0.48...
{% endhighlight %}
 
## Machine Learning
You can orchestrate machine learning algorithms in a Spark cluster via the machine learning functions within 'sparklyr'. These functions connect to a set of high-level APIs built on top of DataFrames that help you create and tune machine learning workflows. We demonstrate a few of these here.
 
We start by:
 
1. Partition the data into separate training and test data sets,
2. Fit a model to our training data set,
3. Evaluate our predictive performance on our test dataset.
 

{% highlight r %}
# transform our data set, and then partition into 'training', 'test'
partitions <- concrete_tbl %>%
  sdf_partition(training = 0.75, test = 0.25, seed = 1337)
 
# fit a linear mdoel to the training dataset
fit <- partitions$training %>%
  ml_linear_regression(strength ~.)
print(fit)
{% endhighlight %}



{% highlight text %}
## Call: ml_linear_regression(., strength ~ .)
## 
## Coefficients:
##    (Intercept)         cement           slag            ash          water 
##  0.01902770740  0.62427687298  0.42447567739  0.20453735084 -0.28004107400 
##   superplastic      coarseagg        fineagg            age 
##  0.08553133565  0.03995171111  0.06916150314  0.53664290261
{% endhighlight %}
 
For linear regression models produced by Spark, we can use `summary()` to learn a bit more about the quality of our fit, and the statistical significance of each of our predictors.
 

{% highlight r %}
summary(fit)
{% endhighlight %}



{% highlight text %}
## Call: ml_linear_regression(., strength ~ .)
## 
## Deviance Residuals::
##         Min          1Q      Median          3Q         Max 
## -0.37387125 -0.07918751  0.01039496  0.08263571  0.43699505 
## 
## Coefficients:
##                  Estimate   Std. Error  t value               Pr(>|t|)    
## (Intercept)   0.019027707  0.120060491  0.15848             0.87411645    
## cement        0.624276873  0.054064454 11.54690 < 0.000000000000000222 ***
## slag          0.424475677  0.052993333  8.00998  0.0000000000000042188 ***
## ash           0.204537351  0.036911306  5.54132  0.0000000411567488978 ***
## water        -0.280041074  0.074010191 -3.78382             0.00016635 ***
## superplastic  0.085531336  0.046414564  1.84277             0.06574445 .  
## coarseagg     0.039951711  0.046286492  0.86314             0.38832767    
## fineagg       0.069161503  0.061500842  1.12456             0.26112290    
## age           0.536642903  0.030283336 17.72073 < 0.000000000000000222 ***
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## R-Squared: 0.5901
## Root Mean Squared Error: 0.1306
{% endhighlight %}
 
The summary suggest our model is a poor-fit. We need to account for the non-linear relationships in the data, something which the linear model fails at! Let's test our model against data we havn't seen to have an indictation of its error.
 

{% highlight r %}
# compute predicted values on our test dataset
predicted <- predict(fit, newdata = partitions$test)
 
# extract the true 'strength' values from our test dataset
actual <- partitions$test %>%
  select(strength) %>%
  collect() %>%
  `[[`("strength")
 
# produce a data.frame housing our predicted + actual 'strength' values
data <- data.frame(
  predicted = predicted,
  actual    = actual
)
 
# plot predicted vs. actual values
ggplot(data, aes(x = actual, y = predicted)) +
  geom_abline(lty = "dashed", col = "red") +
  geom_point() +
  theme(plot.title = element_text(hjust = 0.5)) +
  coord_fixed(ratio = 1) +
  labs(
    x = "Actual Strength",
    y = "Predicted Strength",
    title = "Predicted vs. Actual Concrete Strength"
  )
{% endhighlight %}

![plot of chunk 2016-09-19_lm](/figures2016-09-19_lm-1.svg)
 
Not bad, but then again not so good. More importantly our diagnostic plots reveal heteroschedasticity and other problems which suggest a linear model is inappropriate for this data.
 

{% highlight r %}
# Function that returns Root Mean Squared Error
rmse <- function(error)
{
    sqrt(mean(error^2))
}
 
# Function that returns Mean Absolute Error
mae <- function(error)
{
    mean(abs(error))
}
 
# Calculate error
error <- actual - predicted
# Example of invocation of functions
rmse(error)
{% endhighlight %}



{% highlight text %}
## [1] 0.1245939277
{% endhighlight %}



{% highlight r %}
mae(error)
{% endhighlight %}



{% highlight text %}
## [1] 0.09907686709
{% endhighlight %}
 
This is a building critical ingredient, we have a duty of care to do better. We opt for a ML method that can handle non-linear relationships, a neural network approach.
 
## Neural Network
 
We follow the same workflow using a Multilayer Perceptron. We fit the model.
 

{% highlight r %}
# fit a non-linear mdoel to the training dataset
fit_nn <- partitions$training %>%
  ml_multilayer_perceptron(strength~. , layers =  c(8, 30, 20), seed = 255)
{% endhighlight %}
Let's compare our predictions with the actual. Predict doesn't recognise the `fit_nn` object, and gives us predictions of zero. As this is relatively new I failed to find any supporting documentation to fix this. Instead I used the `nnet` package to fit then `compute` the predicted strength using a neural network, sadly not using Spark.
 

{% highlight r %}
library(neuralnet)
# # compute predicted values on our test dataset
# predicted <- predict(fit_nn, newdata = partitions$test)  #  Fails!
#PARTITION DATA
concrete_train <- concrete_norm[1:773, ] #  75%
concrete_test <- concrete_norm[774:1030, ]#  25%, it's easy to overfit a neural network
 
#MODEL 2, more hidden nodes
concrete_model2 <- neuralnet(strength ~ cement + slag + ash + water +
                               superplastic + coarseagg +
                               fineagg + age,
                             data = concrete_train, hidden = 5)
plot(concrete_model2)
 
model_results <- compute(concrete_model2,concrete_test[1:8])  # columns 1 to 8, 9 is the strength
predicted_strength <- model_results$net.result
 
cor(predicted_strength, concrete_test$strength)[ , 1]  # can vary depending on random seed
{% endhighlight %}



{% highlight text %}
## [1] 0.7120350563
{% endhighlight %}



{% highlight r %}
plot(predicted_strength, concrete_test$strength)  # line em up, aidvisualisation
abline(a = 0, b = 1) 
{% endhighlight %}
 
Let's quantify the error of the model and compare to the linear model earlier.
 

{% highlight r %}
# Calculate error
error <- concrete_test$strength - predicted_strength 
# Example of invocation of functions
rmse(error)
{% endhighlight %}



{% highlight text %}
## [1] 0.1287046052
{% endhighlight %}



{% highlight r %}
mae(error)
{% endhighlight %}



{% highlight text %}
## [1] 0.09727616659
{% endhighlight %}
The error has been reduced! Seems like a non-linear approach was superior for this type of problem. Let me know in the comments how I can predict using the `ml_multilayer_perceptron()` function in Spark.
 
## Principal Component Analysis
There's lots of standard [ML stuff](http://spark.rstudio.com/mllib.html) you can apply to your data.
 
Use Spark's Principal Components Analysis (PCA) to perform dimensionality reduction. PCA is a [statistical method](https://spark.apache.org/docs/latest/mllib-dimensionality-reduction.html) to find a rotation such that the first coordinate has the largest variance possible, and each succeeding coordinate in turn has the largest variance possible. Not particularly useful here but might be useful for those Kaggle competitions.
 

{% highlight r %}
pca_model <- tbl(sc, "concrete") %>%
  select(-strength) %>%
  ml_pca()
print(pca_model)
{% endhighlight %}



{% highlight text %}
## Explained variance:
## [not available in this version of Spark]
## 
## Rotation:
##                         PC1            PC2            PC3            PC4
## cement       -0.29441188077  0.56727866003 -0.41402394827  0.35592709219
## slag         -0.25817851997 -0.73049769143 -0.09807456987 -0.03945308009
## ash           0.83948585853 -0.06617190283  0.09619819590  0.38363862495
## water        -0.20074746639 -0.13313840133  0.29975480560  0.37899852407
## superplastic  0.23602883744 -0.03284027384 -0.49184647576 -0.01313672992
## coarseagg     0.03020285667  0.33836766789  0.60538891266 -0.38459602718
## fineagg       0.17805072250  0.06232116938 -0.30465072262 -0.61340964581
## age          -0.11534972874  0.05484888012  0.13652017635  0.23787141980
##                         PC5            PC6            PC7            PC8
## cement       -0.21502882158  0.07652048639 -0.29249504460 -0.39467773130
## slag         -0.37381516136 -0.10484674144 -0.30139327675 -0.38337095161
## ash          -0.05533257884  0.01869801102 -0.26647180272 -0.24501745575
## water         0.37579073697  0.22258795780  0.48270234625 -0.53358800969
## superplastic -0.35449726457 -0.27612080966  0.69970708443 -0.09810891299
## coarseagg    -0.47740668504 -0.12968952955  0.08267907823 -0.34440226786
## fineagg       0.50199453465 -0.06691264853 -0.12126149143 -0.47344523553
## age           0.25329921522 -0.91417579451 -0.09203141642 -0.01085413355
{% endhighlight %}
 
## Conclusion
 
This blog described how to get Spark on your machine and use it to conduct some basic ML. It should be useful when dealing with large data sets or interacting with remote data tables on SQL servers. The sustained improvements in all things R continues to inspire and amaze.
 

{% highlight r %}
sessionInfo()
{% endhighlight %}



{% highlight text %}
## R version 3.3.1 (2016-06-21)
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
## [1] neuralnet_1.33  dplyr_0.5.0     purrr_0.2.2     readr_1.0.0    
## [5] tidyr_0.6.0     tibble_1.2      ggplot2_2.1.0   tidyverse_1.0.0
## [9] sparklyr_0.3.14
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.7      knitr_1.14       magrittr_1.5     rappdirs_0.3.1  
##  [5] munsell_0.4.3    colorspace_1.2-6 R6_2.1.3         stringr_1.1.0   
##  [9] plyr_1.8.4       tools_3.3.1      parallel_3.3.1   grid_3.3.1      
## [13] rmd2md_0.1.0     gtable_0.2.0     config_0.2       DBI_0.5-1       
## [17] withr_1.0.2      lazyeval_0.2.0   yaml_2.1.13      assertthat_0.1  
## [21] rprojroot_1.0-2  digest_0.6.10    formatR_1.4      evaluate_0.9    
## [25] labeling_0.3     stringi_1.1.1    scales_0.4.0
{% endhighlight %}
 
