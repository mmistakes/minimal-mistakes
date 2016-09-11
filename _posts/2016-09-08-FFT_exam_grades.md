---
title: "The Fast and the Furiously Frugal"
author: matt_gregory
comments: yes
date: '2016-09-08'
modified: 2016-09-11
layout: post
excerpt: "Quick and easy classification"
published: true
status: processed
tags:
- Classification
- Decision trees
- Fast and Frugal Trees
- R
categories: Rstats
---
 

 
## Fast and frugal trees
 
I've praised the utility of decision trees in other scenarios especially where accountability and transparency of decision making is important. Here we explore why decision trees are a good introduction to Machine Learning and its ability to spot patterns in data providing insight.
 Decision trees are arguably easier to interpret and more inline with human thinking than some other ML methods, thus we write a post here to use a fast and frugal tree method, providing a quick solution to a classification problem.
 
This post is based on another [blog post](https://www.r-bloggers.com/making-fast-good-decisions-with-the-fftrees-r-package/), which makes a rther contrived comparison of a logistic regression and a decision tree.
Arguable the difficulty of interpreation of logistic regression to the non-expert could be avoided by having a suitable front end, as many users will not need to see how the decision tool operates under the hood.
However, the `FFTrees` package provides a user with everything they need in a few lines of code, and comes with excellent vignettes and documentation using some classic ML datasets.
 

 
We read, tidy and normalise the data as described [in a previous post](http://www.machinegurning.com/rstats/student-performance/).
 

We then split the data into a training and testing set to assess how well the classifier performs on data it hasn't seen.
 

{% highlight r %}
glimpse(data_interest)
{% endhighlight %}



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
## $ final    (dbl) 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,...
{% endhighlight %}



{% highlight r %}
# Train and test
data_train <- data_interest[1:350, ]
data_test <- data_interest[351:395, ]
 
#Build the classifier
perf_fft <- FFTrees(formula = final ~.,
                         data = data_train, data.test = data_test)
{% endhighlight %}
 
Now that we've created the object, we can print it to the console to get basic information.
 

{% highlight r %}
perf_fft
{% endhighlight %}



{% highlight text %}
## [1] "An FFTrees object containing 6 trees using 4 predictors {G2,G1,failures,goout}"
## [1] "FFTrees AUC: (Train = 0.92, Test = 0.95)"
## [1] "My favorite training tree is #4, here is how it performed:"
##                         train  test
## n                      350.00 45.00
## p(Correct)               0.86  0.87
## Hit Rate (HR)            0.82  0.79
## False Alarm Rate (FAR)   0.05  0.00
## d-prime                  2.53  2.96
{% endhighlight %}
 
The printout tells us that the final fft object contains 6 different trees, and the largest tree only uses 4 of the original 12 cues. To see the best tree, we can simply plot the fft object:
 

{% highlight r %}
plot(perf_fft, 
     main = "End of year maths exam performance FFT", 
     decision.names = c("Fail", "Pass"))
{% endhighlight %}

![plot of chunk 2016-09-08_FFTa](/figures/2016-09-08_FFTa-1.svg)
 
There's one of our fast and frugal trees! In the top section of the plot, we see that the data had 237 true Pass cases, and 113 true Fail cases. In the middle section, we see the actual tree. The tree then starts by looking at the cue G2. If the value is less than 0.53, the tree decides that the person is a Pass If the value is not less than 0.53, then the tree looks at G1. If the G1 > 0.44, the tree decides the patient is a Pass. If G1 <= 0.44, the tree decides that the person is a Fail.  
 
That's the whole decision algorithm! Quite simple to follow but not very powerful at extracting extra detail that would provide additional insight. I think all teachers would expect the previous two terms exam grades to be good predictors of the final exam pass or fail status. However, it does validate this assumption and provides a cut-off point for strategies targeting students who need extra help to get them up to a pass.
 
This fast and frugalness does miss some aspects as shown in the performance section of the plot where we see 43 misses. Where students passed but were predicted to fail, we probably prefer this to the alternative of Falsely predicting a pass.
 
## Performace
As you can see, the tree performed exceptionally well:  it made correct diagnoses in 301 (107+181+13) out of all 350 cases (86% correct). Additional performance statistics, including specificity (1 - false alarm rate), hit rate, d-prime, AUC (area under the curve) are also displayed. Finally, in the bottom right plot, you can see an ROC curve which compares the performance of the trees to CART (in red) and logistic regression (in blue).
 
## Viewing other trees
 
Now, what if you want a tree that rarely misses true Fail cases, at the cost of additional false alarms (those who would pass anyway)? As  Luan, Schooler, & Gigerenzer (2011) have shown, you can easily shift the balance of errors in a fast and frugal tree by adjusting the decisions it makes at each level of a tree. The `FFTrees` function automatically builds several versions of the same general tree that make different error trade-offs. We can see the performance of each of these trees in the bottom-right ROC curve. Looking at the ROC curve, we can see that tree number 3 has a very high specificity, but a smaller hit-rate compared to tree number 4. We can look at this tree by adding the `tree = 3` argument to `plot()`. As teachers who are concerned that every-child matters we may prefer to err on the side of caution, depsite it adding expense (more teachers to help out) and wasting the time of some students.
 

{% highlight r %}
plot(perf_fft, 
     main = "End of year maths exam performance FFT", 
     decision.names = c("Fail", "Pass"),
     tree = 3)
{% endhighlight %}

![plot of chunk 2016-09-08_FFTb](/figures/2016-09-08_FFTb-1.svg)
 
## Conclusion
 
FFTrees is a nice, easy to interpret gateway R package into classification techniques and Data Science and Machine Learning. I think it is at its most useful when challenging and testing assumptions held by experts in the field. This leads to an evidence based approach to decision making whereby you could show this FFT plot to parents to explain why there child needs to attend extra sessions during the School Holidays, for example. 
 
Try it youself with the 'mushrooms' dataset (see '?mushrooms' for details, it's loaded in with the 'FFT' package). Or predict your seminal quality (if relevant) with the 'fertility' dataset.
 

{% highlight r %}
sessionInfo()
{% endhighlight %}



{% highlight text %}
## R version 3.3.1 (2016-06-21)
## Platform: x86_64-pc-linux-gnu (64-bit)
## Running under: Ubuntu 14.04.5 LTS
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
## [1] stats     graphics  grDevices utils     datasets  base     
## 
## other attached packages:
## [1] FFTrees_1.1.6 dplyr_0.4.3  
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.5          circlize_0.3.8       rmd2md_0.1.0        
##  [4] assertthat_0.1       grid_3.3.1           R6_2.1.2            
##  [7] DBI_0.4-1            formatR_1.4          magrittr_1.5        
## [10] evaluate_0.9         GlobalOptions_0.0.10 stringi_1.1.1       
## [13] lazyeval_0.2.0       rpart_4.1-10         tools_3.3.1         
## [16] stringr_1.0.0        parallel_3.3.1       colorspace_1.2-6    
## [19] shape_1.4.2          knitr_1.13.1         methods_3.3.1
{% endhighlight %}
 
