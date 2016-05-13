---
title: "Nearest neighbour methods"
author: matt_upson
comments: yes
date: '2016-05-27'
modified: 2016-05-27
layout: post
excerpt: "A simple non-linear classifier using nearest-neighbour averaging"
published: true
status: publish
tags:
- statistics
- data science
- R
- machine learning
- nearest neighbours
categories: Rstats
---
 
{% include _toc.html %}
 

 
In my [last post](../least_squares_and_nearest_neighbours/), I started working through some examples given by Hastie et al in Elements of Statistical learning.
I looked at using a linear model for classification across a randomly generated training set.
In this post I'll use nearest neighbour methods to create a non-linear decision boundary over the same data.
 
## Nearest neighbour algorithm
 
There are much more learned folk than I who give good explanations of the maths behind nearest neighbours, so I won't spend too long on the theory.
Hastie et al define the nearest neighbour approach as:
 
$$
\hat{Y}(x)=\frac{1}{k}\sum_{x_i\in N_k(x)}y_i
$$
 
The $k$ refers to the number of groups that we are interested in, and is user defined.
Our prediction $\hat{Y}$ (which is derived from $x$) is equal to the mean of $N_k$, where $N_k$ consists of the $k$ nearest training examples closest to $x$.
 
How do we define this closeness? Hastie et al simply use Euclidean distance:
 
$$
N_k(x) = \sqrt{\sum_{i=1}^n(x_i - x)^2\\}
$$
 
So, simply put, all we need to do is look at the neighbours of a particular training example, and take an average of them, to create our prediction of the score of a given point.
 
## R Walkthrough
 
As ever, the code to produce this post is available on github, [here](https://github.com/machinegurning/machinegurning.github.io/tree/master/_rmd).  
 
Using the data I generated in my previous [post](../least_squares_and_nearest_neighbours/) I'll walk through the process of producing a nearest neighbour prediction.
 
 
Just to recap: this is a dataset with 300 training examples, two features ($x_1$ and $x_2$), and a binary coded response variable ($X\in\mathbb{R}^{300 \times 2}$, $y\in\{0,1\}$):
 

{% highlight text %}
## Source: local data frame [300 x 2]
## 
##             x1          x2
##          (dbl)       (dbl)
## 1   0.47116692  1.01644895
## 2   0.24768010  1.53593828
## 3  -0.16345097  0.71781636
## 4  -0.03240535  0.52703182
## 5  -0.54332650  0.75697322
## 6   0.99554720  1.48845272
## 7   0.32698713 -0.02188807
## 8   0.53111911  1.29847189
## 9  -0.29107906  1.17646395
## 10  0.22141509  1.34857640
## ..         ...         ...
{% endhighlight %}



{% highlight text %}
##  [1] 1 1 1 1 1 1 1 1 1 1
## Levels: 0 1
{% endhighlight %}
 
### Calculating Euclidean distance
 
The first thing I need to do is calculate the Euclidean distance from every training example to every other training example - i.e. create a distance matrix. Fortunately R does this very simply with the `dist()` command.
This returns a $m \times m$ dimensional matrix
 

{% highlight r %}
## Note that this creates a dist object, and needs to be coerced into a vector.
 
dist_matrix <- X %>%
  dist %>%
  as.matrix
 
## For brevity, I won't print it. Instead check the dimensions
 
dist_matrix %>% dim
{% endhighlight %}



{% highlight text %}
## [1] 300 300
{% endhighlight %}
 
I'm interested in the 15 nearest neighbour average, like Hastie et al., so I just need need to extract the 15 shortest distances from each of these columns. 
It helps at this point to break the matrix into a list using `split()`, with a vector element where each column was. 
This will allow me to use `purrr::map()` which has an easier syntax than other loop handlers like `apply()` and its cousins.
 

{% highlight r %}
## Use split to convert the matrix into a list
 
dist_matrix_split <-  dist_matrix %>% 
  split(
    f = rep(1:ncol(dist_matrix), each = nrow(dist_matrix))
  )
 
## Check that we have a list of length m
 
dist_matrix_split %>% class
{% endhighlight %}



{% highlight text %}
## [1] "list"
{% endhighlight %}



{% highlight r %}
dist_matrix_split %>% length
{% endhighlight %}



{% highlight text %}
## [1] 300
{% endhighlight %}



{% highlight r %}
## What about a single element of the list?
 
dist_matrix_split %>% extract2(1) %>% class
{% endhighlight %}



{% highlight text %}
## [1] "numeric"
{% endhighlight %}



{% highlight r %}
dist_matrix_split %>% extract2(1) %>% length
{% endhighlight %}



{% highlight text %}
## [1] 300
{% endhighlight %}
 
Now I need a small helper function to return the closest $k$ points, so that I can take an average.
For this I use `order()`
 

{% highlight r %}
return_k <- function(x,k) {
  
  order(x)[1:k] %>%
    return
}
{% endhighlight %}
 
This should return a vector element in the list containing the index of $D$ which corresponds to the $k$ closest training examples.
 

{% highlight r %}
ranks <- dist_matrix_split %>%
  map(return_k, k = 15)
 
ranks[1:2]
{% endhighlight %}



{% highlight text %}
## $`1`
##  [1]   1  28 206  24 196 104  12  70 203   8 193  27  26 188 185
## 
## $`2`
##  [1]   2  90  29  10  16 114  17   8  15  26  18  24 182 118  28
{% endhighlight %}
 
So far so good, the function returns us 15 indices with which we can subset $y$ to get our 15 nearest neighbour majority vote.
The values of $y$ are then averaged...
 

{% highlight r %}
# Note I coerce to character first, then to integer, otherwise our integers are
# not zero indexed.
 
y_hat <- ranks %>%
  map(function(x) y[x]) %>%
  map_dbl(function(x) x %>% as.character %>% as.integer %>% mean)
 
y_hat[1:10]
{% endhighlight %}



{% highlight text %}
##         1         2         3         4         5         6         7 
## 0.9333333 0.9333333 0.5333333 0.4000000 0.4000000 1.0000000 0.4666667 
##         8         9        10 
## 0.9333333 0.7333333 0.8666667
{% endhighlight %}
 
...and converted into a binary classification, such that $G\in\{0,1\}$: where $\hat{Y}>0.5$, $G=1$, otherwise $G=0$.
 

{% highlight r %}
G <- ifelse(y_hat >= 0.5, 1, 0)  
 
G[1:10]
{% endhighlight %}



{% highlight text %}
##  1  2  3  4  5  6  7  8  9 10 
##  1  1  1  0  0  1  0  1  1  1
{% endhighlight %}
 
### Intuition
 
Before looking at the predictions, now is a good point for a quick recap on what the model is actually doing.
 
For the training examples $(10, 47, 120)$ I have run the code above, and plotted out the 15 nearest neighbours whose $y$ is averaged to get out prediction $G$.
 
For the right hand point you can see that for all of the 15 nearest neighbours $y=1$, hence for our binary prediction $G=1$.
The opposite can be said for the left hand: again there is a unanimous vote, and so $G=0$.
For the middle point, most of the time $y=1$, hence although there is not unanimity, our prediction for this point would be $G=1$.
 
You can image that from this plot: whilst varying $k$ would have little effect on the points that are firmly within the respective classes, points close to the decision boundary are likely to be affected by small changes in $k$.
Set $k$ too low, and we invite *bias*, set $k$ too high, and we are likely to increase *variance*.
I'll come back to this.
 
![plot of chunk 2016-05-27-intuition](/figures/2016-05-27-intuition-1.svg)
 
### Predictions
 
So how do the predictions made by nearest neighbours ($k=15$) match up with the actual values of $y$ in this training set?
 

{% highlight r %}
table(y,G)
{% endhighlight %}



{% highlight text %}
##    G
## y     0   1
##   0 114   6
##   1   4 176
{% endhighlight %}
 
In general: pretty good, and marginally better than the linear classifier I used in the previous [post]().
In just $3$% of cases does our classifier get it wrong.
 
### Decision boundary
 
For this next plot, I use the `class::knn()` function to replace the long-winded code I produced earlier.
This function allows us to train our classifier on a training set, and then apply it to a test set, all in one simple function.
 
In this case I produce a test set which is just a grid of points. By applying the model to this data, I can produce a decision boundary which can be plotted.
 

{% highlight r %}
## Generate a grid of points
 
test_grid = seq(-3.5, 3.5, length = 800)
 
X_test <- data.frame(
  x1 = rep(test_grid, times = length(test_grid)), 
  x2 = rep(test_grid, each = length(test_grid))
)
 
# Run knn on our training set X and output predictions into a dataframe alongside X_test.
 
knn_pred <- class::knn(
  train = X,
  test = X_test,
  cl = y,
  k = 15
) %>%
  data.frame(
    X_test, 
    pred = .
  )
 
# Now plot,using geom_contour to draw the decision boundary.
 
knn_pred %>%
  ggplot +
  aes(
    x = x1,
    y = x2,
    colour = y
  ) +
  geom_point(
    data = D2,
    aes(
      colour = actual,
      shape = prediction
    ),
    size = 3
  ) +
  geom_contour(
    aes(
      z = as.integer(pred)
    ),
    size = 0.4,
    colour = "black",
    bins = 1
  ) +
  coord_cartesian(
    xlim = c(-2.2,2.8),
    ylim = c(-3,3.5)
  ) +
  xlab("X") +
  ylab("Y")
{% endhighlight %}

![plot of chunk 2016-05-27-decision_boundary](/figures/2016-05-27-decision_boundary-1.svg)
 
### Varying k
 
I mentioned before the impact that varying $k$ might have.
Here I have run `knn()` on the same data but for multiple values of $k$.
For $k=1$ we get a perfect fit with multiple polygons separating all points in each class perfectly.
As $k$ increases, we see that the more peripheral polygons start to break down, until at $k=15$ there is largely a singular decision boundary which weaves its way between the two classes.
At $k=99$, this decision boundary is much more linear.
 
![plot of chunk 2016-05-27-varying-k](/figures/2016-05-27-varying-k-1.svg)
 
In my next post I will address this problem of setting $k$ again, and try to quantify when the model is suffering from variance or bias.
 

{% highlight r %}
sessionInfo()
{% endhighlight %}



{% highlight text %}
## R version 3.3.0 (2016-05-03)
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
## [1] stats     graphics  grDevices utils     datasets  base     
## 
## other attached packages:
## [1] tidyr_0.4.1    ggplot2_2.1.0  dplyr_0.4.3    magrittr_1.5  
## [5] tibble_1.0     purrr_0.2.1    testthat_0.8.1 knitr_1.12.3  
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.4      class_7.3-14     digest_0.6.4     assertthat_0.1  
##  [5] plyr_1.8.3       grid_3.3.0       R6_2.1.2         gtable_0.2.0    
##  [9] DBI_0.4          formatR_1.3      scales_0.4.0     evaluate_0.9    
## [13] lazyeval_0.1.10  labeling_0.3     tools_3.3.0      stringr_0.6.2   
## [17] munsell_0.4.3    parallel_3.3.0   colorspace_1.2-6 methods_3.3.0
{% endhighlight %}
