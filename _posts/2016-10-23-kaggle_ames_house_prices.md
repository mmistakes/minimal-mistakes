---
title: "Sold!"
author: matt_gregory
comments: yes
date: '2016-10-23'
modified: 2016-10-23
layout: post
excerpt: "Advanced Regression techniques for predicting house prices"
published: true
status: processed
tags:
- Regression
- Linear Regression
- R
- Feature Selection
categories: Rstats
output: html_document
---
 

 
There seems nothing the British press likes more than a good house price story. 
Accordingly we use the [Kaggle dataset](https://www.kaggle.com/c/house-prices-advanced-regression-techniques/data) on house prices as a demonstration of the data science workflow. 
With 79 explanatory variables describing (almost) every aspect of residential homes in Ames, Iowa, this competition challenges you to predict the final price of each home (every dataset has a story, see here for [details](https://ww2.amstat.org/publications/jse/v19n3/decock.pdf)). 
I found this dataset particularly interesting, as it informs someone new to he housing market as to what variables one should ask questions about if one were to buy a house.  
 
We start by downloading the data from Kaggle and reading the training data into R using the `readr` package, a subset of the excellent package of packages that is the `tidyverse`. We check the variables or features are the appropriate data class.

{% highlight r %}
library(tidyverse)
train <- readr::read_csv(file  = "./data/2016-10-23-train.csv",
                       col_names = TRUE)
test <- readr::read_csv(file  = "./data/2016-10-23-test.csv",
                       col_names = TRUE)
 
#  problems with the names of some variables having `ticks
names(train) <- make.names(names(train))
names(test) <- make.names(names(test))
 
# VARIABLE TYPE -------------------------------------------------------------------
# note from documentation, all character class are factor variables, no strings
# We identify and select all character variables and get their names
is_char <- sapply(train, is.character)
to_correct <- names(select(train, which(is_char)))
 
# Correct data type of variable
# use mutate_each_, which is the standard evaluation version, to change variable classes
 
train_correct_type <- train %>%
  mutate_each_(funs(factor), to_correct)
 
#glimpse(train_correct_type)
{% endhighlight %}
 
Inspection of some of our factors reveals that unsurprisingly the levels of the factor have not been ordered correctly. 
However, the ordering has not been explicitly set, as that is not the default for `factor`. This loses us information, for example if we compare what R thinks is the case and what should be the case, we see a discrepancy. R defaults to use alphabetical order. If we were to set the levels correctly for each factor this could improve our predictions. 
 

{% highlight r %}
levels(train_correct_type$BsmtQual)
{% endhighlight %}



{% highlight text %}
## [1] "Ex" "Fa" "Gd" "TA"
{% endhighlight %}



{% highlight r %}
is.ordered(train_correct_type$BsmtQual)
{% endhighlight %}



{% highlight text %}
## [1] FALSE
{% endhighlight %}
 
 
`BsmtQual`: Evaluates the height of the basement
 
       | Code | Description | Inches | 
       |:--------:|:----------:|:----------:| 
       |   Ex   |  Excellent  |    100+   | 
       |  Gd    |  Good       |   90-99   | 
       |    TA  |    Typical  |     80-89   | 
       |   Fa   |    Fair     |   70-79  |
       |   Po   |    Poor     |  <70   |
       |   NA   |    No Basement|  NA |
 
### Missing data
 
> Every messy data is messy in its own way - Hadley Wickham
 
There is missing data for a variety of combinations of the variables. The visualising indicator matrices for missing values is a shortcut (`visna()`). The columns represent the missing data and the rows the missing patterns. Here we have plenty of missing patterns. The bars beneath the columns show the proportions of missingness by variable and the bars on the right show the relative frequencies of the patterns. Most of the data is complete.  
 
The missing data is found in about a dozen or so of the variables (those on the left). The variables that contribute to the bulk of the data (note the heavy skew of the dodgy variables). `PoolQC`, `MiscFeature`, `Alley` and `Fence` tend to be missing. These variables warrant closer inspection of the supporting documentation to suggest why this might be the case.
 

{% highlight r %}
extracat::visna(train_correct_type, sort = "b")
{% endhighlight %}

![plot of chunk 2016-10-23_visna](/figures/2016-10-23_visna-1.svg)
 
### Keep it simple
 
For now, we will keep things simple by ignoring all categorical variables and dropping them. We also remove the artificial `Id` variable.
 

{% highlight r %}
nums <- sapply(train_correct_type, is.numeric)
train_no_factors <- train_correct_type[, nums]  #  drop all factors
 
train_no_factors <- train_no_factors %>%
  select(-Id) %>%  #  IMPORTANT drop id variable, don't want to predict on this!
  na.omit()
 
glimpse(train_no_factors)
{% endhighlight %}



{% highlight text %}
## Observations: 1,121
## Variables: 37
## $ MSSubClass    <int> 60, 20, 60, 70, 60, 50, 20, 50, 190, 20, 60, 20,...
## $ LotFrontage   <int> 65, 80, 68, 60, 84, 85, 75, 51, 50, 70, 85, 91, ...
## $ LotArea       <int> 8450, 9600, 11250, 9550, 14260, 14115, 10084, 61...
## $ OverallQual   <int> 7, 6, 7, 7, 8, 5, 8, 7, 5, 5, 9, 7, 7, 4, 5, 5, ...
## $ OverallCond   <int> 5, 8, 5, 5, 5, 5, 5, 5, 6, 5, 5, 5, 8, 5, 5, 6, ...
## $ YearBuilt     <int> 2003, 1976, 2001, 1915, 2000, 1993, 2004, 1931, ...
## $ YearRemodAdd  <int> 2003, 1976, 2002, 1970, 2000, 1995, 2005, 1950, ...
## $ MasVnrArea    <int> 196, 0, 162, 0, 350, 0, 186, 0, 0, 0, 286, 306, ...
## $ BsmtFinSF1    <int> 706, 978, 486, 216, 655, 732, 1369, 0, 851, 906,...
## $ BsmtFinSF2    <int> 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ...
## $ BsmtUnfSF     <int> 150, 284, 434, 540, 490, 64, 317, 952, 140, 134,...
## $ TotalBsmtSF   <int> 856, 1262, 920, 756, 1145, 796, 1686, 952, 991, ...
## $ X1stFlrSF     <int> 856, 1262, 920, 961, 1145, 796, 1694, 1022, 1077...
## $ X2ndFlrSF     <int> 854, 0, 866, 756, 1053, 566, 0, 752, 0, 0, 1142,...
## $ LowQualFinSF  <int> 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ...
## $ GrLivArea     <int> 1710, 1262, 1786, 1717, 2198, 1362, 1694, 1774, ...
## $ BsmtFullBath  <int> 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, ...
## $ BsmtHalfBath  <int> 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ...
## $ FullBath      <int> 2, 2, 2, 1, 2, 1, 2, 2, 1, 1, 3, 2, 1, 2, 1, 1, ...
## $ HalfBath      <int> 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, ...
## $ BedroomAbvGr  <int> 3, 3, 3, 3, 4, 1, 3, 2, 2, 3, 4, 3, 2, 2, 3, 3, ...
## $ KitchenAbvGr  <int> 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, ...
## $ TotRmsAbvGrd  <int> 8, 6, 6, 7, 9, 5, 7, 8, 5, 5, 11, 7, 5, 6, 6, 6,...
## $ Fireplaces    <int> 0, 1, 1, 1, 1, 0, 1, 2, 2, 0, 2, 1, 0, 0, 0, 0, ...
## $ GarageYrBlt   <int> 2003, 1976, 2001, 1998, 2000, 1993, 2004, 1931, ...
## $ GarageCars    <int> 2, 2, 2, 3, 3, 2, 2, 2, 1, 1, 3, 3, 2, 2, 2, 1, ...
## $ GarageArea    <int> 548, 460, 608, 642, 836, 480, 636, 468, 205, 384...
## $ WoodDeckSF    <int> 0, 298, 0, 0, 192, 40, 255, 90, 0, 0, 147, 160, ...
## $ OpenPorchSF   <int> 61, 0, 42, 35, 84, 30, 57, 0, 4, 0, 21, 33, 112,...
## $ EnclosedPorch <int> 0, 0, 0, 272, 0, 0, 0, 205, 0, 0, 0, 0, 0, 0, 0,...
## $ X3SsnPorch    <int> 0, 0, 0, 0, 0, 320, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0...
## $ ScreenPorch   <int> 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ...
## $ PoolArea      <int> 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ...
## $ MiscVal       <int> 0, 0, 0, 0, 0, 700, 0, 0, 0, 0, 0, 0, 0, 500, 0,...
## $ MoSold        <int> 2, 5, 9, 2, 12, 10, 8, 4, 1, 2, 7, 8, 7, 10, 6, ...
## $ YrSold        <int> 2008, 2007, 2008, 2006, 2008, 2009, 2007, 2008, ...
## $ SalePrice     <int> 208500, 181500, 223500, 140000, 250000, 143000, ...
{% endhighlight %}
 
### Outliers
 
Let's look for any unusual outliers that may affect our fitted model during training. As `SalePrice` is our response variable and what we are trying to predict, we get a quick overview using the scatterplot matrix for numeric data. We don't plot it here but provide the code for you to explore (it takes a minute to compute).
 

{% highlight r %}
# p1 <- GGally::ggpairs(train_no_factors)
# p1
{% endhighlight %}
 
Let's take a closer look at `GrLiveArea`, there seem to be four outliers. Accordingly, I would recommend removing any houses with more than 4000 square feet from the data set (which eliminates these five unusual observations).
 

{% highlight r %}
plot(train_no_factors$SalePrice, train_no_factors$GrLivArea)
{% endhighlight %}

![plot of chunk 2016-10-23_sp](/figures/2016-10-23_sp-1.svg)
 

{% highlight r %}
#  remove outliers
train <- train_correct_type %>%
  filter(GrLivArea < 4000)
{% endhighlight %}
 
## Inspecting numeric variables correlated with the response variable
 

{% highlight r %}
corrplot::corrplot(cor(train_no_factors), method = "circle", type = "lower", diag = FALSE,
                   order = "FPC", tl.cex = 0.6, tl.col = "black") #  plot matrix and ordered by first principal component
{% endhighlight %}

![plot of chunk 2016-10-23_corrplot](/figures/2016-10-23_corrplot-1.svg)
 
This display of the correlation matrix shows the most important variables associated with `SalePrice`. This provides a good starting point for modelling and or feature selection. For example `OverallCond` shows poor correlation with `SalePrice`, perhaps we need to adjust this variable to improve its information content. Or perhaps people ignore the condition and think of the property as a fixer upper opportunity. As you can see there is huge depth to the data and it would be easy to feel overwhelmed. Fortunately, we're not trying to win the competition, just produce some OK predictions quickly.  
 
> Premature optimization is the root of all evil - Donald Knuth
 
## Regression
To simplify the problem and celebrate the `mlr` package release (or at least my discovery of it), I implement some of the packages tools for regression and feature selection here. For a detailed tutorial, which this post draws heavily from, see the [mlr home page](https://mlr-org.github.io/mlr-tutorial/release/html/index.html). Also some Kagglers have contributed many and varied [useful ideas](https://www.kaggle.com/shankarpandala/house-prices-advanced-regression-techniques/housing-prices-predicition-in-r) about this problem.
 
### Machine Learning Tasks
 
Learning tasks encapsulate the data set and further relevant information about a machine learning problem, for example the name of the target variable for supervised problems, in this case `SalePrice`.
 

{% highlight r %}
library(mlr)
#  first row is Id
regr_task <- makeRegrTask(id = "hprices", data = train[, 2:81], target = "SalePrice")
regr_task
{% endhighlight %}



{% highlight text %}
## Supervised task: hprices
## Type: regr
## Target: SalePrice
## Observations: 1456
## Features:
## numerics  factors  ordered 
##       36       43        0 
## Missings: TRUE
## Has weights: FALSE
## Has blocking: FALSE
{% endhighlight %}



{% highlight r %}
#  This tells us are factors arn't ordered.
{% endhighlight %}
 
As you can see, the Task records the type of the learning problem and basic information about the data set, e.g., the types of the features (numeric vectors, factors or ordered factors), the number of observations, or whether missing values are present.
 
### Constructing a Learner
 
A learner in `mlr` is generated by calling `makeLearner`. In the constructor we specify the learning method we want to use. Moreover, you can:
* Set hyperparameters.
* Control the output for later prediction, e.g., for classification whether you want a factor of predicted class labels or probabilities.
* Set an ID to name the object (some methods will later use this ID to name results or annotate plots).
 

{% highlight r %}
# x <- listLearners()
# x$class
## Generate the learner
lrn <- makeLearner("regr.gbm", par.vals = list(n.trees = 1400, interaction.depth = 3))
{% endhighlight %}
 
### Train
 
Training a learner means fitting a model to a given data set. In `mlr` this can be done by calling function `train` on a Learner and a suitable Task.
 

{% highlight r %}
## Train the learner
mod <- train(lrn, regr_task)
mod
{% endhighlight %}



{% highlight text %}
## Model for learner.id=regr.gbm; learner.class=regr.gbm
## Trained on: task.id = hprices; obs = 1456; features = 79
## Hyperparameters: distribution=gaussian,keep.data=FALSE,n.trees=1400,interaction.depth=3
{% endhighlight %}
 
Function train returns an object of class `WrappedModel`, which encapsulates the fitted model, i.e., the output of the underlying R learning method. Additionally, it contains some information about the Learner, the Task, the features and observations used for training, and the training time. A `WrappedModel` can subsequently be used to make a prediction for new observations.
 
### Predictions
 

{% highlight r %}
task_pred <- predict(mod, newdata = test[ , 2:80])
task_pred
{% endhighlight %}



{% highlight text %}
## Prediction: 1459 observations
## predict.type: response
## threshold: 
## time: 0.08
##   response
## 1 141292.7
## 2 149078.0
## 3 154767.6
## 4 155542.5
## 5 204469.7
## 6 157478.1
{% endhighlight %}
 
### Submission
 
Submissions are evaluated on Root-Mean-Squared-Error (RMSE) between the logarithm of the predicted value and the logarithm of the observed sales price. (Taking logs means that errors in predicting expensive houses and cheap houses will affect the result equally.)
 

{% highlight r %}
submission <- as_tibble(list(Id = test$Id, SalePrice = task_pred$data$response))
head(submission)
{% endhighlight %}



{% highlight text %}
## # A tibble: 6 × 2
##      Id SalePrice
##   <int>     <dbl>
## 1  1461  141292.7
## 2  1462  149078.0
## 3  1463  154767.6
## 4  1464  155542.5
## 5  1465  204469.7
## 6  1466  157478.1
{% endhighlight %}



{% highlight r %}
#  SAVE
readr::write_csv(submission, path = "submission_mlr.csv")
{% endhighlight %}
 
We then [submit this on Kaggle](https://twitter.com/mammykins_/status/790228462623723520)!
 
## Feature engineering
 
We likely want to code categorical variables into dummy variables and think about how to combine or use the available variables for this regression problem to further reduce our RMSE below 0.27. There are also some tools for feature filtering in `mlr`.
 
For details on how to do that see the `mlr` [tutorials pages](https://mlr-org.github.io/mlr-tutorial/release/html/feature_selection/index.html).
 
## Conclusion
 
Following house prices is a national obsession. Here we elucidate an alternative dataset to the traditional `MASS::Boston` suburban house values with a more contemporary, comprehensive and complicated data set. This contributes to the Kaggle learning experience by providing Kagglers with a mild introduction into Machine Learning with R, specifically the `mlr` package. We predict house prices with a respectable 0.27 RMSE using out of the box approaches. Feature selection will help nudge the accuracy towards the dizzying heights of the Kaggle scoreboard albeit with a high demand on the Kaggler's time and insight.
 
## References
 
* Bischl, B., Lang, M., Richter, J., Bossek, J., Judt, L., Kuehn, T., . Kotthoff, L. (2015). mlr: Machine Learning in R, 17, 1-5. Retrieved from http://cran.r-project.org/package=mlr
* Cock, D. De. (2011). Ames , Iowa : Alternative to the Boston Housing Data as an End of Semester Regression Project, 19(3), 1-15.
 

{% highlight r %}
sessionInfo()
{% endhighlight %}



{% highlight text %}
## R version 3.2.3 (2015-12-10)
## Platform: x86_64-pc-linux-gnu (64-bit)
## Running under: Ubuntu 16.04.1 LTS
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
## [1] stats     graphics  grDevices utils     datasets  methods   base     
## 
## other attached packages:
##  [1] mlr_2.9          stringi_1.1.2    ParamHelpers_1.9 BBmisc_1.10     
##  [5] dplyr_0.5.0      purrr_0.2.2      readr_1.0.0      tidyr_0.6.0     
##  [9] tibble_1.2       ggplot2_2.1.0    tidyverse_1.0.0  rmd2md_0.1.1    
## [13] devtools_1.12.0 
## 
## loaded via a namespace (and not attached):
##  [1] parallelMap_1.3    Rcpp_0.12.7        formatR_1.4       
##  [4] git2r_0.15.0       plyr_1.8.4         iterators_1.0.8   
##  [7] tools_3.2.3        corrplot_0.77      digest_0.6.10     
## [10] extracat_1.7-4     checkmate_1.8.1    evaluate_0.9      
## [13] memoise_1.0.0      gtable_0.2.0       lattice_0.20-33   
## [16] foreach_1.4.3      shiny_0.14.1       DBI_0.5-1         
## [19] parallel_3.2.3     curl_2.1           gbm_2.1.1         
## [22] hexbin_1.27.1      TSP_1.1-4          withr_1.0.2       
## [25] httr_1.2.1         stringr_1.1.0      knitr_1.14        
## [28] ggvis_0.4.3        grid_3.2.3         data.table_1.9.6  
## [31] R6_2.2.0           survival_2.38-3    rmarkdown_1.0.9016
## [34] reshape2_1.4.1     magrittr_1.5       splines_3.2.3     
## [37] backports_1.0.3    scales_0.4.0       codetools_0.2-14  
## [40] htmltools_0.3.5    assertthat_0.1     checkpoint_0.3.16 
## [43] xtable_1.8-2       mime_0.5           colorspace_1.2-6  
## [46] httpuv_1.3.3       lazyeval_0.2.0     munsell_0.4.3     
## [49] chron_2.3-47
{% endhighlight %}
 
