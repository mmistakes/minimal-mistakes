---
title: "The Game of Kaggle"
author: "matt_gregory"
comments: yes
date: '2016-05-21'
modified: 2016-05-21
layout: post
excerpt: "Predicting survival of passengers on the Titanic"
published: true
status: publish
tags:
- R
- machine learning
- predicting
- logistic regression
- decision tree
categories: Rstats
---
 
{% include _toc.html %}
 

 
## The Player of Games
What's the best way to teach oneself machine learning? Is it to do an [online course](https://www.coursera.org/specializations/jhu-data-science), write a [blog](http://www.machinegurning.com/posts/) or compete in [online programming competitions](https://www.kaggle.com/)? 
 
This blog post describes my first interaction with / or game of [Kaggle](https://www.kaggle.com/).
 
## Kaggle history
 
In 2010, Kaggle was founded as a platform for predictive modelling and analytics competitions on which companies and researchers post their data and statisticians and data miners from all over the world compete to produce the best models. This crowdsourcing approach relies on the fact that there are countless strategies that can be applied to any predictive modelling task and it is impossible to know at the outset which technique or analyst will be most effective.
 
## Gameification
I was interested in the gaming element and how user's of Kaggle describe themselves as players. This blog post describes my first foray into Kaggle with the well known [Titanic survival problem](https://www.kaggle.com/c/titanic/).
 
## A Titanic problem
The sinking of the RMS Titanic is one of the most infamous shipwrecks in history.  On April 15, 1912, during her maiden voyage, the Titanic sank after colliding with an iceberg, killing 1502 out of 2224 passengers and crew. This sensational tragedy shocked the international community and led to better safety regulations for ships.
 
One of the reasons that the shipwreck led to such loss of life was that there were not enough lifeboats for the passengers and crew. Although there was some element of luck involved in surviving the sinking ([Rose found a door to float on](http://www.discovery.com/tv-shows/mythbusters/videos/titanic-survival-results/)), some groups of people were more likely to survive than others, such as women, children, and the upper-class.
 
In this challenge, Kaggle ask us to complete the analysis of what sorts of people were likely to survive. In particular, they ask us to apply the tools of machine learning to predict which passengers survived the tragedy.
 
Challenge accepted!
 
## Getting the data
The data can be downloaded from [here](https://www.kaggle.com/c/titanic/data). I saved the files into a newly created directory called titanic in my R folder. We are provided with `train` and `test` data; we train our predictive model then test our ability to accurately predict whether a passenger is likely to survive or not based on their characteristics in thetest data (and assess how our model performs when it processes those characteristics and makes a prediction of the fate of the passenger).
 

{% highlight r %}
#LIBRARY
library(vcd)
library(RColorBrewer)
library(dplyr)
 
#INPUT
train <- read.csv("data/2016-05-21-tit_train.csv", header = TRUE)
test <- read.csv("data/2016-05-21-tit_test.csv", header = TRUE)
{% endhighlight %}
 
## Passenger characteristics
 
If we compare the training and testing datasets we notice that the training set has an additional variable. This is the response variable we are trying to predict in this supervised learning task. Our machine learning algorithms need to identify characteristics which are important in determining whether a passenger is likely to survive (`Survived` = 1) or not (`Survived` = 0). 
 

{% highlight r %}
str(train)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	891 obs. of  12 variables:
##  $ PassengerId: int  1 2 3 4 5 6 7 8 9 10 ...
##  $ Survived   : int  0 1 1 1 0 0 0 0 1 1 ...
##  $ Pclass     : int  3 1 3 1 3 3 1 3 3 2 ...
##  $ Name       : Factor w/ 891 levels "Abbing, Mr. Anthony",..: 109 191 358 277 16 559 520 629 417 581 ...
##  $ Sex        : Factor w/ 2 levels "female","male": 2 1 1 1 2 2 2 2 1 1 ...
##  $ Age        : num  22 38 26 35 35 NA 54 2 27 14 ...
##  $ SibSp      : int  1 1 0 1 0 0 0 3 0 1 ...
##  $ Parch      : int  0 0 0 0 0 0 0 1 2 0 ...
##  $ Ticket     : Factor w/ 681 levels "110152","110413",..: 524 597 670 50 473 276 86 396 345 133 ...
##  $ Fare       : num  7.25 71.28 7.92 53.1 8.05 ...
##  $ Cabin      : Factor w/ 148 levels "","A10","A14",..: 1 83 1 57 1 1 131 1 1 1 ...
##  $ Embarked   : Factor w/ 4 levels "","C","Q","S": 4 2 4 4 4 3 4 4 4 2 ...
{% endhighlight %}



{% highlight r %}
str(test)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	418 obs. of  11 variables:
##  $ PassengerId: int  892 893 894 895 896 897 898 899 900 901 ...
##  $ Pclass     : int  3 3 2 3 3 3 3 2 3 3 ...
##  $ Name       : Factor w/ 418 levels "Abbott, Master. Eugene Joseph",..: 210 409 273 414 182 370 85 58 5 104 ...
##  $ Sex        : Factor w/ 2 levels "female","male": 2 1 2 2 1 2 1 2 1 2 ...
##  $ Age        : num  34.5 47 62 27 22 14 30 26 18 21 ...
##  $ SibSp      : int  0 1 0 0 1 0 0 1 0 2 ...
##  $ Parch      : int  0 0 0 0 1 0 0 1 0 0 ...
##  $ Ticket     : Factor w/ 363 levels "110469","110489",..: 153 222 74 148 139 262 159 85 101 270 ...
##  $ Fare       : num  7.83 7 9.69 8.66 12.29 ...
##  $ Cabin      : Factor w/ 77 levels "","A11","A18",..: 1 1 1 1 1 1 1 1 1 1 ...
##  $ Embarked   : Factor w/ 3 levels "C","Q","S": 2 3 2 3 3 3 2 3 1 3 ...
{% endhighlight %}
 
This data has a lot more to it than the Titanic dataset which comes with the datasets package in R.
 

{% highlight r %}
Titanic
{% endhighlight %}



{% highlight text %}
## , , Age = Child, Survived = No
## 
##       Sex
## Class  Male Female
##   1st     0      0
##   2nd     0      0
##   3rd    35     17
##   Crew    0      0
## 
## , , Age = Adult, Survived = No
## 
##       Sex
## Class  Male Female
##   1st   118      4
##   2nd   154     13
##   3rd   387     89
##   Crew  670      3
## 
## , , Age = Child, Survived = Yes
## 
##       Sex
## Class  Male Female
##   1st     5      1
##   2nd    11     13
##   3rd    13     14
##   Crew    0      0
## 
## , , Age = Adult, Survived = Yes
## 
##       Sex
## Class  Male Female
##   1st    57    140
##   2nd    14     80
##   3rd    75     76
##   Crew  192     20
{% endhighlight %}
 
Tables are not that effective for spotting patterns in the data. Plotting can be helpful even for complicated Multivariate Categorical data. Let's have a look at our training data.
 
> "Women and children first" (or to a lesser extent, the [Birkenhead Drill](http://www.phrases.org.uk/meanings/women-and-children-first.html)).
 

{% highlight r %}
colours <- brewer.pal(6, "Paired") #  some pretty colours, qualitative differences
 
doubledecker(Survived ~ Sex, data = train,
             gp = gpar(fill = colours))
{% endhighlight %}

![plot of chunk 2016-05-21_dd1](/figures/2016-05-21_dd1-1.svg)
 
The relative width of the bars in the mosaic plot tells us that there were more men on board the Titanic (this difference in width is a limitation of the plot as humans struggle to discriminate between different sized areas). Also it is apparent that if you were a randomly selected woman you were more likely to survive (`Survived` = 1) than a randomly selected male (who was more likely to die, `Survived` = 0). This could be the basis of a simple predictive tool to use on the test data if we were feeling lazy. We pursue this this here to outline how one would participate in a Kaggle problem. 
 
This simplistic approach can be modelled using a logistic regression AKA generalised linear model with binomial error distribution and logit link function. We can use the `coef()` function in order to access just the coefficients. The estimates and their standard errors are in logits. We can use the `predict()` function to predict the probability that the passengers in the test data survive or die based purely on their sex. The higher probabilities should pair with female and the lower with male given our simplistic model.
 

{% highlight r %}
m1 <- glm(Survived~Sex, family = "quasibinomial", data = train)
m1_probs <- predict(m1, test, type = "response")
head(m1_probs)
{% endhighlight %}



{% highlight text %}
##         1         2         3         4         5         6 
## 0.1889081 0.7420382 0.1889081 0.1889081 0.7420382 0.1889081
{% endhighlight %}



{% highlight r %}
head(test$Sex)
{% endhighlight %}



{% highlight text %}
## [1] male   female male   male   female male  
## Levels: female male
{% endhighlight %}
 
However, passengers either `Survived` (= 1) or they died (`Survived` = 0), none of this probability malarky. Thus we convert our predictions into a 1 if greater than 0.5, or a zero if less than or equal to 0.5. Then we would tabulate against the actual `Survive` status of the test passengers, if we had it...
 

{% highlight r %}
m1_pred <- rep(x = 0, nrow(test))  # assume all test passengers dead,
m1_pred[m1_probs > 0.5] <- 1  #  unless they are female, or their probability of Survived
                               #  is greater than 0.5
table(test$Sex)  #  this table should match the Sex table for the test data
{% endhighlight %}



{% highlight text %}
## 
## female   male 
##    152    266
{% endhighlight %}
 
Kaggle is great, no peeking at the test data! How do we go about submitting our predictions?
 

{% highlight r %}
  #  First we create a new variable in test
  #  predicted Survived variable in test
  #  we then create a dataframe with the passenger id paired with our survival prediciton
test$Survived <- m1_pred
submit <- data.frame(PassengerId = test$PassengerId, Survived = test$Survived)
write.csv(submit, file = "submission.csv", row.names = FALSE)
{% endhighlight %}
 
## Submission
To submit your predictions go to the [Titanic submission page](https://www.kaggle.com/c/titanic/submissions/attach) and upload your file. This got me a respectable accuracy of ~77% and ranked me in the mid 3000 (of 4000 or so) which you can easily [Tweet](https://twitter.com/mammykins_/status/733003027355971585) to impress your friends. Interestingly some players managed to get a prediction accuracy of 0%...
 
That was just a quick demo to show how you might go about this problem. Let's continue to look at the data and then put in a bit more effort in to generating a suitable model that accounts for the relevant characteristics of the passengers and how that affects their probability of survival. I'm interested in investigating how far we can get in improving model accuracy with using simple out of the box strategies and how far we can get up the leaderboard! I don't expect to win but as a data scientist I am keen to learn strategies and processes that result in the most significant gains in predictive accuracy through our variety of modelling problems - Kaggle provides just that! 
 
### Learning through gaming on Kaggle
This simplistic model aside, an important aspect of machine learning that Kaggle elucidates is how easy is it to make a decent predictive model using out of the box algorithms and techniques, even if we are new to the art. There are plenty of blog posts which expand on this Titanic data set and come up with clever ways of improving model performance. [Feature engineering](http://www.r-bloggers.com/titanic-kaggle-competition-pt-2%ef%bb%bf/) is particularly neat.
 
### Class effects?
 

{% highlight r %}
doubledecker(Survived ~ Pclass, data = train,
             gp = gpar(fill = colours))
{% endhighlight %}

![plot of chunk 2016-05-21_dd2](/figures/2016-05-21_dd2-1.svg)
 
Do these individual graphics miss anything? Icluding a main effect of `Pclass` might be useful.
 
What about class and sex effects and the interaction between the two?
 

{% highlight r %}
doubledecker(Survived ~ Sex + Pclass, data = train,
             gp = gpar(fill = colours))
{% endhighlight %}

![plot of chunk 2016-05-21_dd3](/figures/2016-05-21_dd3-1.svg)
 
There appears to be an ineteraction with the class of the sexes associated with different chance of survival.
 
### Improving the model
We iterate the model and improve. Exploring the data visually identifies variables that might improve the model if incorporated. We include passenger sex, passenger class and the interaction between the two in the model.
 

{% highlight r %}
#  build model, assign probabilities of Survive given the passenger characteristics
#  then create a vector to hold our passenger survive predictions
 
m2 <- glm(Survived~Sex*Pclass, family = "binomial", data = train)
summary(m2)
{% endhighlight %}



{% highlight text %}
## 
## Call:
## glm(formula = Survived ~ Sex * Pclass, family = "binomial", data = train)
## 
## Deviance Residuals: 
##     Min       1Q   Median       3Q      Max  
## -2.8488  -0.6969  -0.5199   0.4946   2.0339  
## 
## Coefficients:
##                Estimate Std. Error z value Pr(>|z|)    
## (Intercept)      6.0416     0.8273   7.303 2.81e-13 ***
## Sexmale         -6.0493     0.8756  -6.909 4.88e-12 ***
## Pclass          -2.0011     0.2950  -6.784 1.17e-11 ***
## Sexmale:Pclass   1.3593     0.3202   4.245 2.19e-05 ***
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## (Dispersion parameter for binomial family taken to be 1)
## 
##     Null deviance: 1186.66  on 890  degrees of freedom
## Residual deviance:  803.12  on 887  degrees of freedom
## AIC: 811.12
## 
## Number of Fisher Scoring iterations: 6
{% endhighlight %}



{% highlight r %}
m2_probs <- predict(m2, test, type = "response")
m2_pred <- rep(x = 0, nrow(test))
m2_pred[m2_probs > 0.5] <- 1
 
#  write to file for submission
test$Survived <- m2_pred
submit <- data.frame(PassengerId = test$PassengerId, Survived = test$Survived)
write.csv(submit, file = "submission2.csv", row.names = FALSE)
{% endhighlight %}
 
We submit our new improved model. This results in exactly the same predictions for each test passenger! We have mot improved our position in the scoreboard. If we look closely we see that we are still not getting enough information to distinguish any nuance, as there are two sexes and three classes, we only get six different possible probabilities from the logistic regression based on the coefficients from our model fit to the training data. Although if we inspect the coefficients we actually have fewer than that...
 

{% highlight r %}
table(round(m2_probs, digits = 0))  #  the same as sex
{% endhighlight %}



{% highlight text %}
## 
##   0   1 
## 266 152
{% endhighlight %}



{% highlight r %}
table(round(m2_probs, digits = 2))
{% endhighlight %}



{% highlight text %}
## 
## 0.13 0.22 0.34 0.51 0.88 0.98 
##  146   63   57   72   30   50
{% endhighlight %}
 
### Model Interpretation
The coefficients are from the linear predictor. They are on the transformed scale, so because we are using binoimial errors they are in logits. We convert from a logit to a proportion.
 

{% highlight r %}
round(1/(1 + 1/exp(m2$coefficients)), digits = 5)
{% endhighlight %}



{% highlight text %}
##    (Intercept)        Sexmale         Pclass Sexmale:Pclass 
##        0.99763        0.00235        0.11909        0.79564
{% endhighlight %}



{% highlight r %}
head(train$Sex)  #  female comes before male alphabetically
{% endhighlight %}



{% highlight text %}
## [1] male   female female female male   male  
## Levels: female male
{% endhighlight %}



{% highlight r %}
head(train$Pclass)  #  interestingly an integer, not a factor
{% endhighlight %}



{% highlight text %}
## [1] 3 1 3 1 3 3
{% endhighlight %}
 
The `(intercept)` says that the mean survival rate of first class females (`female` before `male` alphabetically, with `Pclass` a variable of class integer) was 99.8%. First class females were unlikely to die. 
 
What about the parameter for `Sexmales`? Remember that with categorical explanatory variables the parameter values are differences between means. So to get the male survival rate we add 0.00235 to the intercept before back transforming.
 

{% highlight r %}
1 / (1 + 1 / exp((m2$coefficients[1]) + (m2$coefficients[2])))
{% endhighlight %}



{% highlight text %}
## (Intercept) 
##    0.498075
{% endhighlight %}
 
This suggests that the survival rate for men was almost half that of women.
 
What about class? For every unit change in `Pclass`, as you move between classes from higher (1), to middle (2) to lower (3), the log odds of survival decreases.
 

{% highlight r %}
m2$coefficients["Pclass"]
{% endhighlight %}



{% highlight text %}
##   Pclass 
## -2.00112
{% endhighlight %}
 
There is also a significant interaction term. There is compelling evidence that the different sexes of passengers responded different to their class status in terms of their likely survival. There appears to be a rough halving of survival between the 1st and 3rd classes for both sexes but in woman 2nd class females were not far behind their first class counterparts in probability of survival.
 
## Tree based methods
 
We use a decision tree approach to build the set of splitting rules used to segment the predictor space. This is to improve our interpretation of the logistic regression model which can be difficult due to the the use of a non-intuitive but mathematically convenient logit link function. By providing  a simple and useful interpretation it may assist us in deciding how to proceed in order to improve our prediction accuracy.
 

{% highlight r %}
hist(train$Fare, col = "grey", main = "", xlab = "Fare")
{% endhighlight %}

![plot of chunk 2016-05-21_hist1](/figures/2016-05-21_hist1-1.svg)
 
We go ahead and fit a decision tree after modifying the data slightly. We specify the qualitative variables as factors, ordered if appropriate. The new variables `Fare` and `SibSp` are included in the model. Presumably `Fare` is the amount paid for a ticket and `SibSp` 
 

{% highlight r %}
library(rpart)
library(rattle)
{% endhighlight %}



{% highlight text %}
## Warning: package 'rattle' was built under R version 3.2.5
{% endhighlight %}



{% highlight text %}
## Rattle: A free graphical interface for data mining with R.
## Version 4.1.0 Copyright (c) 2006-2015 Togaware Pty Ltd.
## Type 'rattle()' to shake, rattle, and roll your data.
{% endhighlight %}



{% highlight r %}
##  Let's modify the inputs a bit to help our ML method out
##  If you put rubbish in you get rubbish out
dt_train1 <- train %>%
     dplyr::select(-PassengerId,-Name,-Ticket,-Cabin) %>%
     dplyr::mutate(
          Survived = factor(Survived),
          Pclass = ordered(Pclass),
          SibSp = ordered(SibSp),
          Parch = ordered(Parch,levels = c(0:6,9))
     )
 
dt.train <- rpart(
     Survived ~ Pclass + Sex + Fare + SibSp, 
     dt_train1
     )
 
asRules(dt.train)  #  one rule for each path from root to leaf
{% endhighlight %}



{% highlight text %}
## 
##  Rule number: 211 [Survived=1 cover=8 (1%) prob=1.00]
##    Sex=female
##    Pclass=3
##    Fare< 23.35
##    Fare>=7.888
##    Fare< 15.37
##    Fare< 13.91
##    Fare>=10.82
## 
##  Rule number: 7 [Survived=1 cover=170 (19%) prob=0.95]
##    Sex=female
##    Pclass=1,2
## 
##  Rule number: 27 [Survived=1 cover=42 (5%) prob=0.71]
##    Sex=female
##    Pclass=3
##    Fare< 23.35
##    Fare< 7.888
## 
##  Rule number: 53 [Survived=1 cover=30 (3%) prob=0.70]
##    Sex=female
##    Pclass=3
##    Fare< 23.35
##    Fare>=7.888
##    Fare>=15.37
## 
##  Rule number: 210 [Survived=0 cover=25 (3%) prob=0.32]
##    Sex=female
##    Pclass=3
##    Fare< 23.35
##    Fare>=7.888
##    Fare< 15.37
##    Fare< 13.91
##    Fare< 10.82
## 
##  Rule number: 2 [Survived=0 cover=577 (65%) prob=0.19]
##    Sex=male
## 
##  Rule number: 104 [Survived=0 cover=12 (1%) prob=0.17]
##    Sex=female
##    Pclass=3
##    Fare< 23.35
##    Fare>=7.888
##    Fare< 15.37
##    Fare>=13.91
## 
##  Rule number: 12 [Survived=0 cover=27 (3%) prob=0.11]
##    Sex=female
##    Pclass=3
##    Fare>=23.35
{% endhighlight %}



{% highlight r %}
fancyRpartPlot(dt.train, palettes = c("Greys", "Oranges"))  #  grey is death, passengers with a bright future are orange
{% endhighlight %}

![plot of chunk 2016-05-21_tree1](/figures/2016-05-21_tree1-1.svg)
 
The root node, at the top, reveals that 62% of passengers died, while 38% survived. The number above these proportions indicates the way that the node is voting (at this top level it defaults to everyone will die, or coded as zero or coloured grey) the number at the bottom of the node indicates the proportion of the population that resides in this node, or bucket (here at the top level it is everyone, 100%).
 
All the men are assigned to the second node (labelled 2). This is a bucket of death where we assign all males to die, even though only 81% of the men died. More men were onboard and thus this bucket contains 65% of the total passengers (of the training data).
 
This decision tree provides quick rules of thumb for whether your future was bright (orange) or grey (dead). If you were a woman in the lowest class you chances were reduced to your wealthier classes. However if you paid a high end fare your chances improved despite being in the lowest class. Such intricacies and low number of samples in some of the leaves or buckets or nodes near the bottom suggest we may be in danger of overfitting.
 
Let's make some predictions from this simple tree and see if we built our simple `Sex` model earlier. We get our test data in a similar format as our training data, with appropriate factor classes. We then use `predict()` to predict whether the test passengers are likely to survive given their characteristics. We then write this to a file ready for submission!
 
 

{% highlight r %}
dt_test <- test %>%
     dplyr::select(-PassengerId,-Name,-Ticket,-Cabin) %>%
     dplyr::mutate(
          Pclass = ordered(Pclass),
          SibSp = ordered(SibSp),
          Parch = ordered(Parch,levels = c(0:6,9))
     )
 
 
dt_pred <- predict(dt.train, dt_test, type = "class")  #  feed in test data to the model and predict whether Survived or died
dt_submit <- data.frame(PassengerId = test$PassengerId, Survived = dt_pred)
#write.csv(dt_submit, file = "submit_dtree.csv", row.names = FALSE)
{% endhighlight %}
 
An improvement of 0.02392% accuracy, this moved us up the leaderboard almost 2000 places.
 
## Pruning the tree
Inspecting the tree suggested it might be overlycomplex. We might want to prune the tree by recursively snipping off the least important splits based on the complexity parameter (I used trial and error for this value after reading the help file).
 

{% highlight r %}
dt.train2 <- prune(dt.train, cp = 0.012)
 
asRules(dt.train2)  #  one rule for each path from root to leaf
{% endhighlight %}



{% highlight text %}
## 
##  Rule number: 7 [Survived=1 cover=170 (19%) prob=0.95]
##    Sex=female
##    Pclass=1,2
## 
##  Rule number: 27 [Survived=1 cover=42 (5%) prob=0.71]
##    Sex=female
##    Pclass=3
##    Fare< 23.35
##    Fare< 7.888
## 
##  Rule number: 53 [Survived=1 cover=30 (3%) prob=0.70]
##    Sex=female
##    Pclass=3
##    Fare< 23.35
##    Fare>=7.888
##    Fare>=15.37
## 
##  Rule number: 52 [Survived=0 cover=45 (5%) prob=0.40]
##    Sex=female
##    Pclass=3
##    Fare< 23.35
##    Fare>=7.888
##    Fare< 15.37
## 
##  Rule number: 2 [Survived=0 cover=577 (65%) prob=0.19]
##    Sex=male
## 
##  Rule number: 12 [Survived=0 cover=27 (3%) prob=0.11]
##    Sex=female
##    Pclass=3
##    Fare>=23.35
{% endhighlight %}



{% highlight r %}
fancyRpartPlot(dt.train2, palettes = c("Greys", "Oranges"))  #  grey is death, passengers with a bright future are orange
{% endhighlight %}

![plot of chunk 2016-05-21_tree2](/figures/2016-05-21_tree2-1.svg)
 
Now we compare how this does to our previous models. Did the reduction in complexity avoid overfitting and a reduction in test error or are we now missing out on modelling genuine complexity or patterns in the data?
 

{% highlight r %}
dt_pred <- predict(dt.train2, dt_test, type = "class")
dt_submit <- data.frame(PassengerId = test$PassengerId, Survived = dt_pred)
#write.csv(dt_submit, file = "submit_dtree2.csv", row.names = FALSE)
{% endhighlight %}
 
This tweaking caused no change in accuracy and failed to improve on our original decision tree! However, we did manage to prune a bunch of nodes or leaves if you look and compare the two trees. These extra nodes and branches were not useful for making predictions adding unneccessary complication to the model. Although we did not reduce our test error we improved our understanding, with the data suggesting that within the third class there may have been another strata of sub-class which influenced your chance of survival as a female. The wealthier women in the third class who paid a larger `Fare` were less likely to die.
 
## KaggleR
This is what Kaggle is all about brute forcing the solution to a problem by getting hundreds of top minds (teams or minds) interacting with a computer to try a vast combination of machine learning methods and parameter settings, all trying to work their way up the leaderboard. This combined effort will usually result in a much better solution to a problem than an in-house team good generate for a predictive problem. The gameification is also satisfying for the players and an interesting alternative for learning predictive analytics with machine learning as a compliment to the traditional textbook or online course.
 

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
##  [1] rattle_4.1.0       rpart_4.1-10       RColorBrewer_1.1-2
##  [4] vcd_1.4-1          purrr_0.2.1        ggplot2_2.0.0     
##  [7] broom_0.4.0        magrittr_1.5       dplyr_0.4.3       
## [10] testthat_0.11.0    knitr_1.12        
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.4        formatR_1.2.1      plyr_1.8.3        
##  [4] tools_3.2.3        digest_0.6.9       evaluate_0.8      
##  [7] memoise_0.2.1      gtable_0.2.0       nlme_3.1-122      
## [10] lattice_0.20-33    psych_1.5.8        DBI_0.4-1         
## [13] parallel_3.2.3     RGtk2_2.20.31      stringr_1.0.0     
## [16] lmtest_0.9-34      R6_2.1.2           tidyr_0.4.0       
## [19] reshape2_1.4.1     scales_0.4.0       MASS_7.3-45       
## [22] rpart.plot_1.5.3   rsconnect_0.4.1.11 assertthat_0.1    
## [25] mnormt_1.5-4       colorspace_1.2-6   labeling_0.3      
## [28] stringi_1.0-1      lazyeval_0.1.10    munsell_0.4.3     
## [31] crayon_1.3.1       zoo_1.7-12
{% endhighlight %}
