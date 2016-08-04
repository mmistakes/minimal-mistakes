---
title: "Getting to grips with 'Elements of statistical learning'"
author: matt_upson
comments: yes
date: '2016-05-08'
#modified: 2016-08-04
layout: post
excerpt: "Linear models and least squares"
published: true
status: publish
tags:
- statistics
- data science
- R
- machine learning
- education
categories: Rstats
---
 
{% include _toc.html %}
 

Last week I joined a reading group for the weighty tome [Elements of Statistical Learning](http://statweb.stanford.edu/~tibs/ElemStatLearn/).
I really like the idea of this group; interesting as it is - it can be hard to maintain the drive to wade through a text like this.
Working through it week on week with a group of like-minded people is a great way to overcome this.
 
# Linear models
 
In this post I implement in R some of the ideas that are presented in the first 2 chapters of Elements of Statistical Learning, namely: least squares.
I've written about linear models before; whilst doing Andrew Ng's excellent [Machine learning](https://www.coursera.org/learn/machine-learning/home/info?source=cdpv2) I wrote a toy R package [vlrr](https://github.com/ivyleavedtoadflax/vlrr) to implement linear regression with regularisation mainly as an exercise in ackage development.
 
## Prediction from linear models
 
Linear models are the bread and butter of statistics.
They are pretty fundamental, and I don't want to write too much about them here for that reason.
 
However, one thing I like about the way that Hastie et al. present the subject is in terms of matrix operations, giving a vectorized implementation that can easily be translated into code.
 
In simple statistics, we are used to seeing linear models represeted as:
 
$$y = bx + a$$
 
Where our prediction $y$ is dependent on a rate or slope $b$, and a constant or intercept $a$. Simple.
 
Hastie, et al. present the more general form of this equation[^1]:
 
[^1]: From this equation onwards, I drop Hastie et al's convention of denoting matrices with $\hat{}$.
 
$$
\hat{Y}=\hat\beta_0+\sum^{m}_{j=1}X_j\hat\beta_j\cdot
$$
 
Here, the prediction $Y$ is given by the addition of the intercept (or bias) $\beta_0$ and the sum of the dot product of $X_{1..m}$ and $\beta_{1..m}$ where $X$ is an $n$ by $m$ dimensional matrix ($X\in\mathbb{R}^{n \times m}$), and $\beta$ is an $n$ dimensional vector (or later as we shall see: $\beta\in\mathbb{R}^{k \times n}$ - where $k$ is the number of models we wish to apply).
 
By including a constant of 1 as the first column vector of the matrix $X$, it is possible to greatly simplify this equation into an matrix inner product:
 
$$
Y = X^T \beta
$$
 
This can be a bit of a leap, so I break this down more simply here.
Let us create an input vector $\vec{x}$ where $\vec{x}\in\mathbb{R}^{m}$: i.e. there are $m$ training examples, and in this case: $m=10$.
 

{% highlight r %}
# Load dplyr to make life easier
 
library(dplyr)
 
# Set random seed to fix the answer
 
set.seed(1337)
 
m <- 10
x <- runif(n = m, min = 0, max = 500) %>%
  round
 
x
{% endhighlight %}



{% highlight text %}
##  [1] 288 282  37 227 187 166 474 141 123  73
{% endhighlight %}
 
To get my prediction out of $\vec{x}$, I need to supply coefficients $a$ and $b$ (or $\beta$ if we use Hastie et al's notation; $\theta$ if we use Andrew Ng's). 
 
In this case, I'm going to use a very simple model by setting $a = 1$, and $b = 10$.
I'm not worrying about how we get these coefficients here, and nor should you be - we're just interested in the predictions we are going to make using these our input $\vec{x}$ and our coefficients $\beta$
 
So this is how I calculate that prediction in R:
 

{% highlight r %}
a <- 1
b <- 10
 
y <- (x * a) + b
 
y
{% endhighlight %}



{% highlight text %}
##  [1] 298 292  47 237 197 176 484 151 133  83
{% endhighlight %}
 
Of course, R has vectorised the operation here, so every element of our vector $\vec{x}$ was multiplied by $a$.
We can express this as:
 
$$
\begin{align}
y_1 &= 288 \times 1 + 10 \\ 
y_2 &= 282 \times 1 + 10 \\
y_3 &= 37 \times 1 + 10 \\
\vdots \\
y_{10} &= 73 \times 1 + 10 \\
\end{align}
$$
 
## Thinking in matrices
 
So now lets think about this more explicitly in matrix terms.
 
### Matrix operations recap
 
A quick reminder of matrix multiplication (for my benefit if nothing else).
To multiply a matrix $A\in\mathbb{R}^{3 \times 2}$ with matrix $B\in\mathbb{R}^{2 \times 3}$, we multiply $A$ with each of the columns of $B$ to give $C\in\mathbb{R}^{3 \times 3}$.
Remember that the number of columns of $A$ must equal the number of rows of $B$, e.g:
 
$$
A \times B = C \\
\begin{bmatrix}
1 & 3 \\
2 & 5 \\
0 & 9 \\
\end{bmatrix}
\times
\begin{bmatrix}
3 & 3 & 2\\
2 & 5 & 7\\
\end{bmatrix}=
\begin{bmatrix}
9 & 18 & 23\\
16 & 31 & 39\\
18 & 45 & 63\\
\end{bmatrix}
$$
 
So, for instance: 
 
$$
\begin{align}
C_{3,1} &=  (A_{3,1} \times B_{1,1}) + (A_{3,2} \times B_{2,1})\\
C_{3,1} &= (0 \times 3) + (9 \times 2) \\
C_{3,1} &= 18
\end{align}
$$
 
### Linear model by matrix inner product
 
First we place our coefficients $a$ and $b$ into the column vector $\beta$, and add the constant 1 to the input vector $x$ to give the $n + 1$ (one input vector, and the constant 1) by $m$ (the number of training examples) matrix $X$.
 
So applying those quick recaps to our equation $Y=X^T\beta$, we get[^2]:
 
[^2]: One of the confusing parts of this notation is that we don't actually want to transpose $X\in\mathbb{R}^{10 \times 2}$ into $X^{T}\in\mathbb{R}^{2 \times 10}$, as $X^T$ will not be conformable with $\beta\in\mathbb{R}^{2 \times 1}$. Instead, we want an inner product which is $X \cdot \beta$ or each row of $X$ multiplied by each column of $\beta$; in R this is `X %*% beta`, **not** `t(X) %*% beta`.
 
 
$$
\begin{bmatrix}
1 & 288\\
1 & 282\\
1 & 37\\
\vdots & \vdots \\
1 & 73\\
\end{bmatrix}
\cdot
\begin{bmatrix}
10 \\
1 \\
\end{bmatrix}=
\begin{bmatrix}
1 \times 10 + 288 \times 1\\
1 \times 10 + 282 \times 1\\
1 \times 10 + 37 \times 1\\
\vdots \\
1 \times 10 + 227 \times 1\\
\end{bmatrix}=
\begin{bmatrix}
298\\
292\\
47\\
\vdots \\
237\\
\end{bmatrix}
$$
 
In R we can do this simply with:
 

{% highlight r %}
# Add the constant 1 as X_0
 
X <- matrix(
  cbind( 1, x ), 
  ncol = 2
  )
 
# Bind a and b into a vector beta
 
beta <- matrix(
  cbind( b, a ), 
  nrow = 2
  )
 
Y <- X %*% beta 
 
Y
{% endhighlight %}



{% highlight text %}
##       [,1]
##  [1,]  298
##  [2,]  292
##  [3,]   47
##  [4,]  237
##  [5,]  197
##  [6,]  176
##  [7,]  484
##  [8,]  151
##  [9,]  133
## [10,]   83
{% endhighlight %}
 
We can check this against the earlier calculation of $y$:
 

{% highlight r %}
# Need to subset Y[,1] to get an R vector back
 
identical(y,Y[,1])
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}
 
# Least squares
 
Ok, this is all well and good, we can make a prediction $Y=X^T\beta$, but how on earth do we get $\beta$.
In previous posts, I variously used [gradient descent](http://www.machinegurning.com/rstats/gradient-descent/), the [BFGS](http://www.machinegurning.com/rstats/R_classes/) algorithm, and the 'normal equation' or least squares method, which is what I will reproduce here.
 
This method provides an exact solution for a given linear model, which is handy, but there are situations where this method may not be appropriate.
The main issue with the normal equation, is that when dealing with very large amounts of data i.e. $n>10,000$ then the imperative to solve the matrix inverse $(X^TX)^{-1}$ means that it can be computationally expensive.
In addition, there are cases when the matrix given by $(X^TX)$ will not be invertible, and so will simply not work.
This typically occurs when feaures $X_i$ and $X_j$ are linearly dependent, or when there are too many input features, i.e. $X$ is wider than it is long, i.e. $p>>n$ problems.
 
To calculate $\beta$ we can simply solve the equations:
 
$$
RSS(\beta)=\sum^N_{i=1}(y_i-x^T_i\beta)^2
$$
 
This is the notation that Hastie, et al. use, and RSS stands for the residual sum of squares.
This simplifies (in matrix notation) to:
 
$$
\beta=(X^TX)^{-1}X^Ty
$$
 
In R, this looks like `solve(t(X) %*% X) %*% (t(X) %*% y)`, which should return `10 1`:
 

{% highlight r %}
coef_ne <- solve(t(X) %*% X) %*% (t(X) %*% y)
 
coef_ne
{% endhighlight %}



{% highlight text %}
##      [,1]
## [1,]   10
## [2,]    1
{% endhighlight %}
 
### QR decomposition
 
Actually it turns out that using this solution is not the most efficient.
Leisch[^3] counsels against it and instead, the base implemetation of `lm()` uses QR decomposition.
 
[^3]:https://cran.r-project.org/doc/contrib/Leisch-CreatingPackages.pdf
 
A quick Google, and you will see that QR decomposition has been considered to be one of the [most influential algorithms of the 20th Century](http://www.siam.org/pdf/news/637.pdf). 
In simple terms[^4], a QR decomposition is the breaking down of a matrix into two product matrices with specific properties.
If we start with a matrix $M$, QR decomposition would give us $M=QR$ where $Q$ is an orthogonal matrix, and $R$ an upper triangular matrix.
 
[^4]: [https://en.wikipedia.org/wiki/QR_decomposition](https://en.wikipedia.org/wiki/QR_decomposition)
 
So for the matrix $X$ that we have been using so far, we can do this in R with the following: 
 

{% highlight r %}
# First create a QR object
qrx <- qr(X)
 
# Calculate Q and R
 
Q <- qr.Q(qrx, complete = TRUE)
R <- qr.R(qrx)
{% endhighlight %}
 
This gives us:
 
$$
\begin{bmatrix}
1&288 \\
1&282 \\
1&37 \\
1&227 \\
1&187 \\
1&166 \\
1&474 \\
1&141 \\
1&123 \\
1&73 \\
\end{bmatrix}=
\begin{bmatrix}
-0.32&-0.23&-0.35&-0.32&-0.32&-0.33&-0.27&-0.33&-0.33&-0.34 \\
-0.32&-0.22&0.4&-0.09&0.01&0.07&-0.73&0.13&0.18&0.31 \\
-0.32&0.43&0.71&-0.07&-0.12&-0.14&0.21&-0.17&-0.19&-0.25 \\
-0.32&-0.07&-0.08&0.92&-0.08&-0.08&-0.07&-0.08&-0.08&-0.08 \\
-0.32&0.03&-0.12&-0.07&0.92&-0.09&-0.01&-0.1&-0.1&-0.11 \\
-0.32&0.09&-0.15&-0.07&-0.09&0.9&0.02&-0.11&-0.11&-0.13 \\
-0.32&-0.72&0.19&-0.08&-0.03&0&0.55&0.04&0.07&0.14 \\
-0.32&0.16&-0.17&-0.07&-0.09&-0.1&0.06&0.88&-0.13&-0.15 \\
-0.32&0.2&-0.19&-0.07&-0.1&-0.11&0.08&-0.13&0.86&-0.17 \\
-0.32&0.33&-0.25&-0.07&-0.11&-0.13&0.16&-0.15&-0.17&0.79 \\
\end{bmatrix}
\begin{bmatrix}
-3.16&-631.82 \\
0&-379.09 \\
\end{bmatrix}
$$
 
I'm not going to go into any more detail here, but suffice it to say that the `qr` object can simply be solved in R to return our coefficients $\beta$:
 

{% highlight r %}
# If we first created the qr object:
 
solve.qr(qrx, y)
{% endhighlight %}



{% highlight text %}
## [1] 10  1
{% endhighlight %}
 
The explanation for why QR decomposition is favoured over solving the normal equation rests in part in the expensive operation $(X^TX)^{-1}$.
In my experiments (which were admittedly not very scientific), the QR method seemed to take as little as half the time of least squares when trying to solve $X\in\mathbb{R}^{m \times n}$ for large matrices.
Furthermore, where $n$ is much larger than $m$ (say 10 times), the normal equation fails completely, and will return the following error in R:
 
```system is computationally singular: reciprocal condition number```
 
whilst the QR method will at least complete (see the underlying .Rmd for an example I tried).
 

 
# Linear models for classification
 
So now we have seen how to get the parameters $\beta$, I will use a linear model in anger. 
Here I reproduce the example by Hastie et al. to show a simple linear model used for two class classification.
 
## Generate some data
 
First we generate data based on two distinct normal distributions, which we will seek to separate usin gthe linear model.
I've copied this code from my earlier post on [k-means](/rstats/knn).
 
In the code chunk below I use Hadley's excellent [purrr](https://github.com/hadley/purrr) package to create 10 bivariate normal distributions, which are then plotted together.
The reason for this will become apparent when I move onto nearest neighbour methods in my next post.
 

{% highlight r %}
# First generate some training data.
 
library(purrr)
library(tibble)
library(magrittr)
 
# Set a seed for reproducibility
 
set.seed(1337)
 
# This function will create bivariate normal distributions about two means with
# a singular deviation
 
dummy_group <- function(
  x = 30, 
  mean1 = 10, 
  mean2 = 10, 
  sd = 0.45
  ) {
 
  cbind(
    rnorm(x, mean1, sd),
    rnorm(x, mean2, sd)
  )
 
}
 
# Generate 10 bivariate distributions using normal distributions to generate the
# means for each of the two variables. Bind this all together into a dataframe, 
# and label this for training examples. Note that I draw the distinctions
# between 0s and 1s, pretty much by eye - there was not magic to this.
 
dummy_data <- data_frame(
  mean1 = rnorm(10),
  mean2 = rnorm(10)
) %>%
  pmap(dummy_group) %>%
  map(as.data.frame) %>%
  rbind_all %>%
  mutate(
    group = rep(1:10, each = 30),
    group = factor(group),
    group_bit = ifelse(group %in% c(2,3,5,10), 0, 1),
    group_bit = factor(group_bit)
  ) %>%
  select(
    X = V1,
    Y = V2,
    group,
    group_bit
    )
{% endhighlight %}
 
I set $G\in\{0,1\}$ (having divided the bivariate distributions roughly by eye); so now we can train a model based on $G$ to find a decision boundary.
 
Now lets plot the data to see what we have.
 

{% highlight r %}
library(ggplot2)
 
p <- dummy_data %>%
  ggplot +
  aes(
    x = X,
    y = Y,
    colour = group_bit
  ) +
  geom_point(
    size = 3
    )
 
p
{% endhighlight %}

![plot of chunk 2016-05-08-linear-classification](/figures/2016-05-08-linear-classification-1.svg)
 
## Applying the linear model
 
Now lets try to apply a linear model to the data, using $G$ as the explanatory variable.
 

{% highlight r %}
#Start by defining training data - note that these must be vector/matrix, not 
#dataframes.
 
G <- dummy_data$group_bit %>%
  #as.character %>% 
  as.integer
 
X <- dummy_data[,c("X","Y")] %>%
  as.matrix
{% endhighlight %}
 
For the sake of argument, I use both the normal equation for least squares, but also use the $QR$ decomposition method.
 

{% highlight r %}
beta <- solve(t(X) %*% X) %*% (t(X) %*% G)
beta_qr <- qr.solve(X, G)
 
beta
{% endhighlight %}



{% highlight text %}
##        [,1]
## X 0.4141801
## Y 0.4560902
{% endhighlight %}
 
And we can check that these match...
 

{% highlight r %}
all.equal(
  as.vector(beta),
  as.vector(beta_qr)
  )
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}
 
Great.
So how does our model do?
 

{% highlight r %}
# Make our prediction with X'B, and round this to get full numbers. Any values 
# above 0 become 1, below zero becomes 0. Note that R has changed G from G in
# {0,1} to G in {1,2}. Our prediction Y is on the top axis, the actual class G
# is on the left axis.
 
Y <- X %*% beta
Y <- ifelse(Y > 0.5, 1, 0)
 
table(G, Y)
{% endhighlight %}



{% highlight text %}
##    Y
## G     0   1
##   1 118   2
##   2  20 160
{% endhighlight %}
 
So, most of the time, this very simple model is sufficient to make this binary classification.
Only in 20/300 cases do we get a Type II error (a false negative), whilst in 2/300 cases we get a Type I error (a false positive).
 
To plot the decision boundary, we need to create a grid of predictions which we can then divide by running the linear algorithm on.
The following function does this, then we can include the boundary on a plot with `geom_contour()`.
 

{% highlight r %}
draw_boundary <- function(xy, beta) {
  
  u <- rep(xy, times = length(xy))
  v <- rep(xy, each = length(xy))
  
  X <- cbind(u,v)
  
  Y <- X %*% beta
  
  cbind(X, Y) %>% 
    as.data.frame %>%
    mutate(
      actual = ifelse(Y > 0.5, 1, 0)
    )
}
{% endhighlight %}
 
And, plotting it out using shapes to indicate the predictions, we can see that the decision boundary runs a little above the top of the actual $0$ class.
Anything above this line, our model has predicted to be $G=1$, and below it $G=0$.
The two pink triangles are our false positives, whilst the blue circles below the line are our false negatives.
 

{% highlight r %}
draw_boundary(
  seq(from = -4, to = 4, length = 1000),
  beta
  ) %>%
  ggplot +
  aes(
    x = u,
    y = v,
    z = actual,
    colour = actual
  ) +
  geom_contour(
    size = 0.4,
    colour = "black",
    bins = 1
  ) +
  geom_point(
    data = dummy_data %>% cbind(prediction = Y) %>%
      mutate(
        prediction = factor(prediction),
        actual = factor(group_bit)
      ),
    aes(
      x = X,
      y = Y,
      colour = actual,
      shape = prediction
    ),
    size = 3
  ) +
  coord_cartesian(
    xlim = c(-2.2,2.8),
    ylim = c(-3,3.5)
    ) +
  xlab("X") +
  ylab("Y")
{% endhighlight %}

![plot of chunk 2016-05-08-decision-boundary](/figures/2016-05-08-decision-boundary-1.svg)
 
I look forward to delving deeper into [The Elements of Statistical Learning](http://statweb.stanford.edu/~tibs/ElemStatLearn/).
 

{% highlight r %}
sessionInfo()
{% endhighlight %}



{% highlight text %}
## R version 3.3.1 (2016-06-21)
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
## [1] tibble_1.0     purrr_0.2.1    ggplot2_2.1.0  broom_0.4.0   
## [5] magrittr_1.5   dplyr_0.4.3    testthat_1.0.2 knitr_1.13.1  
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.5      mnormt_1.5-4     munsell_0.4.3    colorspace_1.2-6
##  [5] lattice_0.20-33  R6_2.1.2         stringr_1.0.0    plyr_1.8.4      
##  [9] tools_3.3.1      parallel_3.3.1   grid_3.3.1       nlme_3.1-128    
## [13] gtable_0.2.0     psych_1.6.4      DBI_0.4-1        digest_0.6.9    
## [17] lazyeval_0.2.0   assertthat_0.1   crayon_1.3.2     reshape2_1.4.1  
## [21] formatR_1.4      tidyr_0.5.1      evaluate_0.9     labeling_0.3    
## [25] stringi_1.1.1    methods_3.3.1    scales_0.4.0
{% endhighlight %}
