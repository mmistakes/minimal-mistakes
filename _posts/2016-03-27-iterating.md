---
title: "Iteratively applying models"
author: matt_upson
comments: yes
date: "2016-03-27"
modified: "2016-05-28"
layout: post
excerpt: "Using dplyr, broom, and purrr to make life easy"
published: true
status: published
tags:
- R
- dplyr
- broom
- purrr
categories: Rstats
---
 
{% include _toc.html %}
 
 
I've been doing a lot of programming in Python recently, and have taken my eye off the #RStats ball of late.
With a bit of time to play over the Easter weekend, I've been reading [Hadley](https://twitter.com/hadleywickham)'s new [R for Data Science](http://r4ds.had.co.nz/) book.
 
One thing I particularly like so far is the [purrr package]() which he describes in the [lists](http://r4ds.had.co.nz/lists.html) chapter.
I've always thought that the `sapply`,`lapply`, `vapply` (etc) commands are rather complicated.
The **purrr** package threatens to simplify this using the same left-to-right chaining framework that we have become used to in [**ggplot2**](https://cran.r-project.org/web/packages/ggplot2/index.html), and more recently [**dplyr**](https://cran.r-project.org/web/packages/dplyr/index.html).
 
Something I find myself doing more and more is subsetting a dataframe by a factor, and applying the same or a similar model to each subset of the data. 
There are some new ways to do this in **purrr**.
 
 
## do()
 
In this post I'll briefly explore some of the functions of **purrr**, and use them together with **dplyr** and [**broom**](https://cran.r-project.org/web/packages/broom/index.html) (as much for my own memory as anything else).
 
In the past I have used `dplyr::do()` to apply a model like so.
 

{% highlight r %}
# Load packages
 
library(dplyr)
library(lubridate)
library(magrittr)
library(broom)
library(ggplot2)
 
# In case you haven't seen mtcars before (shame on you)
 
mtcars
{% endhighlight %}
 

{% highlight text %}
##                      mpg cyl  disp  hp drat    wt  qsec vs am gear carb
## Mazda RX4           21.0   6 160.0 110 3.90 2.620 16.46  0  1    4    4
## Mazda RX4 Wag       21.0   6 160.0 110 3.90 2.875 17.02  0  1    4    4
## Datsun 710          22.8   4 108.0  93 3.85 2.320 18.61  1  1    4    1
## Hornet 4 Drive      21.4   6 258.0 110 3.08 3.215 19.44  1  0    3    1
## Hornet Sportabout   18.7   8 360.0 175 3.15 3.440 17.02  0  0    3    2
## Valiant             18.1   6 225.0 105 2.76 3.460 20.22  1  0    3    1
## Duster 360          14.3   8 360.0 245 3.21 3.570 15.84  0  0    3    4
## Merc 240D           24.4   4 146.7  62 3.69 3.190 20.00  1  0    4    2
## Merc 230            22.8   4 140.8  95 3.92 3.150 22.90  1  0    4    2
## Merc 280            19.2   6 167.6 123 3.92 3.440 18.30  1  0    4    4
## Merc 280C           17.8   6 167.6 123 3.92 3.440 18.90  1  0    4    4
## Merc 450SE          16.4   8 275.8 180 3.07 4.070 17.40  0  0    3    3
## Merc 450SL          17.3   8 275.8 180 3.07 3.730 17.60  0  0    3    3
## Merc 450SLC         15.2   8 275.8 180 3.07 3.780 18.00  0  0    3    3
## Cadillac Fleetwood  10.4   8 472.0 205 2.93 5.250 17.98  0  0    3    4
## Lincoln Continental 10.4   8 460.0 215 3.00 5.424 17.82  0  0    3    4
## Chrysler Imperial   14.7   8 440.0 230 3.23 5.345 17.42  0  0    3    4
## Fiat 128            32.4   4  78.7  66 4.08 2.200 19.47  1  1    4    1
## Honda Civic         30.4   4  75.7  52 4.93 1.615 18.52  1  1    4    2
## Toyota Corolla      33.9   4  71.1  65 4.22 1.835 19.90  1  1    4    1
## Toyota Corona       21.5   4 120.1  97 3.70 2.465 20.01  1  0    3    1
## Dodge Challenger    15.5   8 318.0 150 2.76 3.520 16.87  0  0    3    2
## AMC Javelin         15.2   8 304.0 150 3.15 3.435 17.30  0  0    3    2
## Camaro Z28          13.3   8 350.0 245 3.73 3.840 15.41  0  0    3    4
## Pontiac Firebird    19.2   8 400.0 175 3.08 3.845 17.05  0  0    3    2
## Fiat X1-9           27.3   4  79.0  66 4.08 1.935 18.90  1  1    4    1
## Porsche 914-2       26.0   4 120.3  91 4.43 2.140 16.70  0  1    5    2
## Lotus Europa        30.4   4  95.1 113 3.77 1.513 16.90  1  1    5    2
## Ford Pantera L      15.8   8 351.0 264 4.22 3.170 14.50  0  1    5    4
## Ferrari Dino        19.7   6 145.0 175 3.62 2.770 15.50  0  1    5    6
## Maserati Bora       15.0   8 301.0 335 3.54 3.570 14.60  0  1    5    8
## Volvo 142E          21.4   4 121.0 109 4.11 2.780 18.60  1  1    4    2
{% endhighlight %}
 

{% highlight r %}
# Subset by number of cylinders, and apply a linear model to each subset
 
subset_models <- mtcars %>%
  group_by(
    cyl
  ) %>%
  do(fit = lm(mpg ~ wt, data = .))
 
subset_models
{% endhighlight %}



{% highlight text %}
## Source: local data frame [3 x 2]
## Groups: <by row>
## 
##     cyl      fit
##   <dbl>   <list>
## 1     4 <S3: lm>
## 2     6 <S3: lm>
## 3     8 <S3: lm>
{% endhighlight %}
 
This results in three models, one each for 4, 6, and 8 cylinders, 
 
We can now use a second call to `do()`, `dplyr::summarise()` or `dplyr::mutate` to extract elements from these models: for example extract the coefficients...
 

{% highlight r %}
# Get the model coefficients, and coerce into a dataframe
 
subset_models %>%
  do(as.data.frame(coef(.$fit)))
{% endhighlight %}



{% highlight text %}
## Source: local data frame [6 x 1]
## Groups: <by row>
## 
##   coef(.$fit)
##         <dbl>
## 1   39.571196
## 2   -5.647025
## 3   28.408845
## 4   -2.780106
## 5   23.868029
## 6   -2.192438
{% endhighlight %}
 
We can also use `mutate()` to extract one or more elements
 

{% highlight r %}
subset_models %>%
  mutate(
    a = coef(fit)[[1]],
    b = coef(fit)[[2]],
    R2 = summary(fit)$r.squared,
    adjustedR2 = summary(fit)$adj.r.squared
  )
{% endhighlight %}



{% highlight text %}
## Source: local data frame [3 x 6]
## Groups: <by row>
## 
##     cyl      fit        a         b        R2 adjustedR2
##   <dbl>   <list>    <dbl>     <dbl>     <dbl>      <dbl>
## 1     4 <S3: lm> 39.57120 -5.647025 0.5086326  0.4540362
## 2     6 <S3: lm> 28.40884 -2.780106 0.4645102  0.3574122
## 3     8 <S3: lm> 23.86803 -2.192438 0.4229655  0.3748793
{% endhighlight %}
 
## The broom package
 
If we want to get a tidier output, we can use the `broom` package, which provides three levels of aggregation.
 
`glance` gives a single line for each model, similar to the `do()` and `summarise()` calls above:
 

{% highlight r %}
subset_models %>%
  glance(fit)
{% endhighlight %}



{% highlight text %}
## Source: local data frame [3 x 12]
## Groups: cyl [3]
## 
##     cyl r.squared adj.r.squared    sigma statistic    p.value    df
##   <dbl>     <dbl>         <dbl>    <dbl>     <dbl>      <dbl> <int>
## 1     4 0.5086326     0.4540362 3.332283  9.316233 0.01374278     2
## 2     6 0.4645102     0.3574122 1.165202  4.337245 0.09175766     2
## 3     8 0.4229655     0.3748793 2.024091  8.795985 0.01179281     2
## Variables not shown: logLik <dbl>, AIC <dbl>, BIC <dbl>, deviance <dbl>,
##   df.residual <int>.
{% endhighlight %}
 
`tidy()` gives details of the model coefficicents:
 

{% highlight r %}
subset_models %>%
  tidy(fit)
{% endhighlight %}



{% highlight text %}
## Source: local data frame [6 x 6]
## Groups: cyl [3]
## 
##     cyl        term  estimate std.error statistic      p.value
##   <dbl>       <chr>     <dbl>     <dbl>     <dbl>        <dbl>
## 1     4 (Intercept) 39.571196 4.3465820  9.103980 7.771511e-06
## 2     4          wt -5.647025 1.8501185 -3.052251 1.374278e-02
## 3     6 (Intercept) 28.408845 4.1843688  6.789278 1.054844e-03
## 4     6          wt -2.780106 1.3349173 -2.082605 9.175766e-02
## 5     8 (Intercept) 23.868029 3.0054619  7.941551 4.052705e-06
## 6     8          wt -2.192438 0.7392393 -2.965803 1.179281e-02
{% endhighlight %}
 
`augment()` returns a row for each data point in the original data with relevant model outputs
 

{% highlight r %}
subset_models %>%
  augment(fit)
{% endhighlight %}



{% highlight text %}
## Source: local data frame [32 x 10]
## Groups: cyl [3]
## 
##      cyl   mpg    wt  .fitted  .se.fit      .resid       .hat   .sigma
##    <dbl> <dbl> <dbl>    <dbl>    <dbl>       <dbl>      <dbl>    <dbl>
## 1      4  22.8 2.320 26.47010 1.006720 -3.67009741 0.09127118 3.261796
## 2      4  24.4 3.190 21.55719 1.951521  2.84281457 0.34297508 3.309771
## 3      4  22.8 3.150 21.78307 1.888462  1.01693356 0.32116829 3.507377
## 4      4  32.4 2.200 27.14774 1.017163  5.25225956 0.09317454 2.947803
## 5      4  30.4 1.615 30.45125 1.596671 -0.05125022 0.22958701 3.534359
## 6      4  33.9 1.835 29.20890 1.305700  4.69109534 0.15353342 3.040129
## 7      4  21.5 2.465 25.65128 1.058052 -4.15127874 0.10081613 3.177493
## 8      4  27.3 1.935 28.64420 1.196043 -1.34420213 0.12882788 3.497551
## 9      4  26.0 2.140 27.48656 1.040267 -1.48656195 0.09745541 3.490854
## 10     4  30.4 1.513 31.02725 1.747377 -0.62724679 0.27497267 3.524811
## ..   ...   ...   ...      ...      ...         ...        ...      ...
## Variables not shown: .cooksd <dbl>, .std.resid <dbl>.
{% endhighlight %}
 
One nice use case of `augment()` is for plotting fitted models against the data.
 

{% highlight r %}
subset_models %>%
  augment(fit) %>%
  ggplot +
  aes(
    y = mpg,
    x = wt,
    colour = factor(cyl)
    ) +
  geom_point() +
  geom_point(
    aes(
      y = .fitted,
      group = cyl
      ),
    colour = "black"
    )+
  geom_path(
    aes(
      y = .fitted,
      group = cyl
      )
    )
{% endhighlight %}

![plot of chunk 2016-03-27-augment-plot](/figures/2016-03-27-augment-plot-1.svg)
 
In this simple example, we could achieve the same just with `geom_smooth(aes(group=cyl), method="lm")`; however this would not be so easy with a more complicated model.
 
## purrr
 
So what is new about **purrr**?
Well first off we can do similar things to `do()` using `map()`:
 

{% highlight r %}
mtcars %>%
  split(.$cyl) %>%
  map(~ lm(mpg ~ wt, data = .))
{% endhighlight %}



{% highlight text %}
## $`4`
## 
## Call:
## lm(formula = mpg ~ wt, data = .)
## 
## Coefficients:
## (Intercept)           wt  
##      39.571       -5.647  
## 
## 
## $`6`
## 
## Call:
## lm(formula = mpg ~ wt, data = .)
## 
## Coefficients:
## (Intercept)           wt  
##       28.41        -2.78  
## 
## 
## $`8`
## 
## Call:
## lm(formula = mpg ~ wt, data = .)
## 
## Coefficients:
## (Intercept)           wt  
##      23.868       -2.192
{% endhighlight %}
 
And we can keep adding `map()` functions to get the output we want:
 

{% highlight r %}
mtcars %>%
  split(.$cyl) %>%
  map(~ lm(mpg ~ wt, data = .)) %>%
  map(summary)
{% endhighlight %}



{% highlight text %}
## $`4`
## 
## Call:
## lm(formula = mpg ~ wt, data = .)
## 
## Residuals:
##     Min      1Q  Median      3Q     Max 
## -4.1513 -1.9795 -0.6272  1.9299  5.2523 
## 
## Coefficients:
##             Estimate Std. Error t value Pr(>|t|)    
## (Intercept)   39.571      4.347   9.104 7.77e-06 ***
## wt            -5.647      1.850  -3.052   0.0137 *  
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Residual standard error: 3.332 on 9 degrees of freedom
## Multiple R-squared:  0.5086,	Adjusted R-squared:  0.454 
## F-statistic: 9.316 on 1 and 9 DF,  p-value: 0.01374
## 
## 
## $`6`
## 
## Call:
## lm(formula = mpg ~ wt, data = .)
## 
## Residuals:
##      Mazda RX4  Mazda RX4 Wag Hornet 4 Drive        Valiant       Merc 280 
##        -0.1250         0.5840         1.9292        -0.6897         0.3547 
##      Merc 280C   Ferrari Dino 
##        -1.0453        -1.0080 
## 
## Coefficients:
##             Estimate Std. Error t value Pr(>|t|)   
## (Intercept)   28.409      4.184   6.789  0.00105 **
## wt            -2.780      1.335  -2.083  0.09176 . 
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Residual standard error: 1.165 on 5 degrees of freedom
## Multiple R-squared:  0.4645,	Adjusted R-squared:  0.3574 
## F-statistic: 4.337 on 1 and 5 DF,  p-value: 0.09176
## 
## 
## $`8`
## 
## Call:
## lm(formula = mpg ~ wt, data = .)
## 
## Residuals:
##     Min      1Q  Median      3Q     Max 
## -2.1491 -1.4664 -0.8458  1.5711  3.7619 
## 
## Coefficients:
##             Estimate Std. Error t value Pr(>|t|)    
## (Intercept)  23.8680     3.0055   7.942 4.05e-06 ***
## wt           -2.1924     0.7392  -2.966   0.0118 *  
## ---
## Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
## 
## Residual standard error: 2.024 on 12 degrees of freedom
## Multiple R-squared:  0.423,	Adjusted R-squared:  0.3749 
## F-statistic: 8.796 on 1 and 12 DF,  p-value: 0.01179
{% endhighlight %}
 
> Note the three types of input to map(): a function, a formula (converted to an anonymous function), or a string (used to extract named components). [^1]
 
So to use a string this time, returning a double vector...
 

{% highlight r %}
mtcars %>%
  split(.$cyl) %>%
  map(~ lm(mpg ~ wt, data = .)) %>%
  map(summary) %>%
  map_dbl("r.squared")
{% endhighlight %}



{% highlight text %}
##         4         6         8 
## 0.5086326 0.4645102 0.4229655
{% endhighlight %}
 
[^1]: https://github.com/hadley/purrr
 
### Creating training and test splits
 
A more complicated example that is a purrrfect use case is: creating splits in a dataset on which a model can be trained and then validated.
 
Here I shamelessly copy Hadley's example[^1]. Note that you will need the latest dev version of **dplyr** to run this correctly due to [this issue](https://github.com/hadley/dplyr/issues/1447) (fixed in the next **dplyr** release > 0.4.3).
 
First define a cost function on which to evaluate the models (in this case the mean squared difference (but this could be anything).
 

{% highlight r %}
msd <- function(x, y) sqrt(mean((x - y) ^ 2))
{% endhighlight %}
 
And a function to generate $n$ random groups with a given probability
 

{% highlight r %}
random_group <- function(n, probs) {
  probs <- probs / sum(probs)
  g <- findInterval(seq(0, 1, length = n), c(0, cumsum(probs)),
    rightmost.closed = TRUE)
  names(probs)[sample(g)]
}
{% endhighlight %}
 
And wrap this up in a function to replicate it...
 

{% highlight r %}
partition <- function(df, n, probs) {
  replicate(n, split(df, random_group(nrow(df), probs)), FALSE) %>%
    transpose() %>%
    as_data_frame()
}
{% endhighlight %}
 
Note that this makes use of the new `purrr::transpose()` function which applies something like a matrix transpose to a list, and when coerced, returns a `data_frame` containing $n$ random splits of the data.
 
{% highlight r %}
boot <- partition(mtcars, 100, c(training = 0.8, test = 0.2))
boot
{% endhighlight %}

{% highlight text %}
## Source: local data frame [100 x 2]
## 
##                   test             training
##                 <list>               <list>
## 1  <data.frame [7,11]> <data.frame [25,11]>
## 2  <data.frame [7,11]> <data.frame [25,11]>
## 3  <data.frame [7,11]> <data.frame [25,11]>
## 4  <data.frame [7,11]> <data.frame [25,11]>
## 5  <data.frame [7,11]> <data.frame [25,11]>
## 6  <data.frame [7,11]> <data.frame [25,11]>
## 7  <data.frame [7,11]> <data.frame [25,11]>
## 8  <data.frame [7,11]> <data.frame [25,11]>
## 9  <data.frame [7,11]> <data.frame [25,11]>
## 10 <data.frame [7,11]> <data.frame [25,11]>
## ..                 ...                  ...
{% endhighlight %}
 
Finally use `map()` to:  
 
*  Fit simple linear models to the data as before.  
*  Make predictions based on those models on the test dataset.  
*  Evaluate model performance using the cost function (`msd`).  
 

{% highlight r %}
boot <- boot %>% 
  dplyr::mutate(
  models = map(training, ~ lm(mpg ~ wt, data = .)),
  preds = map2(models, test, predict),
  diffs = map2(preds, test %>% map("mpg"), msd)
)
{% endhighlight %}
 
This still results in a data frame, but with three new list columns. We need to subset out the columns of interest:
 

{% highlight r %}
diffs <- boot %$% 
  diffs %>%
  unlist 
 
diffs
{% endhighlight %}



{% highlight text %}
##   [1] 1.929788 3.068123 3.743168 3.938367 2.779580 2.104018 2.057479
##   [8] 4.232115 2.373427 3.735713 2.605725 4.390466 3.523725 3.931919
##  [15] 3.869292 1.991069 4.462875 4.756585 3.193928 3.263839 2.689011
##  [22] 3.863989 2.761086 3.489189 3.132539 1.992176 2.380095 3.012068
##  [29] 3.359432 2.558984 2.436260 2.239631 3.620960 4.568904 3.478480
##  [36] 3.417382 2.831235 2.557201 1.990983 3.582177 2.330317 3.786463
##  [43] 5.127931 3.900516 4.797562 2.330468 2.327044 2.717241 2.224535
##  [50] 2.339870 2.959194 2.742073 3.207509 2.706517 2.576143 2.247355
##  [57] 2.381469 1.280311 4.338375 4.092059 2.278560 2.452873 2.210257
##  [64] 3.189066 2.626947 2.715859 3.368478 2.021571 3.364935 3.142655
##  [71] 3.748013 3.292915 4.086842 3.344975 2.309361 4.046942 1.999605
##  [78] 1.724928 4.473536 3.568275 3.451020 3.883805 2.501655 3.293562
##  [85] 3.603897 1.975380 4.202382 2.298882 3.884109 1.833734 2.644478
##  [92] 3.896363 3.532942 3.114910 3.928856 3.357457 2.155898 4.509818
##  [99] 2.075142 4.023687
{% endhighlight %}
 
## Rounding up
 
I've been playing with some things in this post that I am just getting to grips with, but look to be some really powerful additions to the hadleyverse, and the R landscape in general.
Keeping an eye on the development of **purrr** would be a good move I think.
 
## References
 
* <https://github.com/hadley/purrr>  
* <http://r4ds.had.co.nz/lists.html>  
* <http://r4ds.had.co.nz/model-assessment.html>  
* <https://cran.r-project.org/web/packages/broom/vignettes/kmeans.html>  
* <https://cran.r-project.org/web/packages/broom/vignettes/broom.html>   
 
 
 

 
