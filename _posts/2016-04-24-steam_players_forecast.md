---
title: "Predicting virtual hat sales in Dota 2"
author: matt_gregory
comments: yes
date: '2016-04-24'
modified: 2016-04-25
layout: post
excerpt: "Working with time series data and basic forecasting"
published: true
status: publish
tags:
- R
- machine learning
- forecasting
- forecast
- time series
categories: Rstats
---
 
{% include _toc.html %}
 

 

{% highlight r %}
#LIBRARY - check if packages are installed and load them
library(dplyr)
library(rvest)
library(zoo)
library(forecast)
{% endhighlight %}
> "Prediction is very difficult, especially if it's about the future." 
- Niels Bohr
 
As a scientist I'm experienced in designing controlled experiments to produce tidy dataframes. Ideally we end up with each row in the dataframe representing a unique observation at the level of the experimental unit. This tidy data standard is useful in its design as it facilitates initial exploration and analysis of the data.
 
In an uncontrolled setting we come across data which doesn't adhere to this tidy structure, where each datum is not independent and identically distributed (i.i.d) from the rest of the data. Thus, we must treat this different kind of data appropriately to avoid making invalid conclusions regarding the data and its analysis.
 
## Objectives
 
In this blog-post we investigate time series methods for prediction in R. Dates and times have tricky properties and it is best to take advantage of packages that can deal with them. We explore the `forecast` package and familiarise ourselves with a new class of object in R. We draw heavily from the excellent [Forecasting: principles and practice](https://www.otexts.org/book/fpp) in R, available as an ebook.
 
## Time series data
 
An example of time series data which is not an i.i.d variable, is the number of Players of Games on the popular gaming platform Steam. Steam is a digital distribution platform developed by Valve Corporation offering digital rights management (DRM), multiplayer gaming and social networking. I was interested to see how the player base has increased through time and forecasting the future player base size for the next year. To keep things simple we look at average player numbers for my favourite team-based strategy game; Dota 2. The number of Dota 2 players will likely be associated with the sales of digital aesthetics in-game, including cosmetics for playable heroes, such as hats and taunts; hence the title.
 
## Getting the data
 
As this was a once-off, I scrape the page using functions from  Hadley Wickham's puntastic `rvest` package.
 

{% highlight r %}
steamhtml <- read_html("http://steamcharts.com/app/570")  # manually input
steam <- html_table(x = steamhtml, fill = TRUE, header = TRUE)  # recognises and reads ALL tables on the page
{% endhighlight %}
 
We inspect the data (as it's small) to look for any problems.
 

{% highlight r %}
steam
{% endhighlight %}



{% highlight text %}
## [[1]]
##             Month Avg. Players      Gain  % Gain Peak Players
## 1    Last 30 Days    664421.51   -8133.4  -1.21%      1164041
## 2      March 2016    672554.89 -36623.36  -5.16%      1291328
## 3   February 2016    709178.26  97003.48 +15.85%      1248394
## 4    January 2016    612174.78  38830.53  +6.77%      1067949
## 5   December 2015    573344.25  33807.92  +6.27%       999452
## 6   November 2015    539536.33  17594.62  +3.37%       943635
## 7    October 2015    521941.72  13784.86  +2.71%       917306
## 8  September 2015    508156.85 -98787.12 -16.28%       888728
## 9     August 2015    606943.98  51952.97  +9.36%       933942
## 10      July 2015    554991.01 -13457.32  -2.37%       877264
## 11      June 2015    568448.32 -11900.10  -2.05%       913997
## 12       May 2015    580348.42  54286.70 +10.32%       967674
## 13     April 2015    526061.73 -45651.42  -7.99%       929677
## 14     March 2015    571713.15 -57257.26  -9.10%      1213940
## 15  February 2015    628970.41  70466.07 +12.62%      1262612
## 16   January 2015    558504.33  34564.01  +6.60%       961737
## 17  December 2014    523940.32  -4849.48  -0.92%       936583
## 18  November 2014    528789.80  33096.77  +6.68%       963810
## 19   October 2014    495693.04  17694.59  +3.70%       880655
## 20 September 2014    477998.45 -12885.44  -2.62%       864261
## 21    August 2014    490883.89 -46134.77  -8.59%       774319
## 22      July 2014    537018.66  23235.60  +4.52%       874975
## 23      June 2014    513783.06  31395.81  +6.51%       833145
## 24       May 2014    482387.24  60677.03 +14.39%       843024
## 25     April 2014    421710.21  11954.66  +2.92%       734998
## 26     March 2014    409755.56 -11358.65  -2.70%       698197
## 27  February 2014    421114.20  27253.88  +6.92%       738682
## 28   January 2014    393860.32  27253.83  +7.43%       673496
## 29  December 2013    366606.49  18360.12  +5.27%       685503
## 30  November 2013    348246.37  18568.73  +5.63%       702792
## 31   October 2013    329677.64  17252.88  +5.52%       581615
## 32 September 2013    312424.76 -18295.30  -5.53%       566715
## 33    August 2013    330720.07  92919.98 +39.07%       520532
## 34      July 2013    237800.08  27575.26 +13.12%       422617
## 35      June 2013    210224.82  15860.98  +8.16%       326160
## 36       May 2013    194363.84  19528.11 +11.17%       325815
## 37     April 2013    174835.73  -6043.17  -3.34%       299667
## 38     March 2013    180878.90  13905.93  +8.33%       325598
## 39  February 2013    166972.97  19224.82 +13.01%       283870
## 40   January 2013    147748.14  25823.72 +21.18%       260989
## 41  December 2012    121924.42  20846.99 +20.62%       213521
## 42  November 2012    101077.43  25111.99 +33.06%       169631
## 43   October 2012     75965.44  14097.77 +22.79%       171860
## 44 September 2012     61867.68   6099.07 +10.94%       118724
## 45    August 2012     55768.61   3047.56  +5.78%       108689
## 46      July 2012     52721.05         -       -        75041
{% endhighlight %}
 
We are interested in the first and second columns, the date and the average number of players for that month. We can use `select` to get 'em and rename them. What happens if we plot these variables against each other, what will R default to?
 

{% highlight r %}
df1 <- data.frame(thedate = steam[[1]][, 1],  #  select the first list, its first column
                  players = steam[[1]][, 2],
                    stringsAsFactors = FALSE)
str(df1)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	46 obs. of  2 variables:
##  $ thedate: chr  "Last 30 Days" "March 2016" "February 2016" "January 2016" ...
##  $ players: num  664422 672555 709178 612175 573344 ...
{% endhighlight %}
 
The first row is inconsistent for the date, let's remove it as the month hasn't ended yet. 
 

{% highlight r %}
df2 <- slice(df1, -1)
head(df2, n = 3)  
{% endhighlight %}



{% highlight text %}
##         thedate  players
## 1    March 2016 672554.9
## 2 February 2016 709178.3
## 3  January 2016 612174.8
{% endhighlight %}
 
We get an error if we try to convert the `thedate` into a `zoo` or date/time object, I believe this is due to it being in reverse order, from present to past. We simply reverse the order of the sequence and use the zoo funciton `as.yearmon()` to assign the class which is used to represent monthly data. We also need to reverse the average player number to match the correct date it is associated with.
 

{% highlight r %}
str(df2)  #  our dates are set as characters so won't be recognised by R as dates
{% endhighlight %}



{% highlight text %}
## 'data.frame':	45 obs. of  2 variables:
##  $ thedate: chr  "March 2016" "February 2016" "January 2016" "December 2015" ...
##  $ players: num  672555 709178 612175 573344 539536 ...
{% endhighlight %}



{% highlight r %}
# they are also in the reverse order going from present to past, let's reverse this with rev()
 
x <- as.yearmon(rev(df2$thedate), format = "%B %Y")  # from the zoo package, where each month is 
 
df2$thedate <- x
# we now need to reverse the player numbers to match
df2$players <- rev(df2$players)
 
str(df2)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	45 obs. of  2 variables:
##  $ thedate:Class 'yearmon'  num [1:45] 2012 2013 2013 2013 2013 ...
##  $ players: num  52721 55769 61868 75965 101077 ...
{% endhighlight %}



{% highlight r %}
head(df2, n = 3)
{% endhighlight %}



{% highlight text %}
##    thedate  players
## 1 Jul 2012 52721.05
## 2 Aug 2012 55768.61
## 3 Sep 2012 61867.68
{% endhighlight %}
 
 
## Plotting a time series
 
If we try and plot `df2`, what will happen? Notice how `plot()` defaults to a scatter plot.
 
 

{% highlight r %}
plot(df2$thedate, df2$players)
{% endhighlight %}

![plot of chunk 2016-04-24_scatterplot](/figures/2016-04-24_scatterplot-1.svg)
 
 
We can't do much with this dataframe due to the way the date is expressed, let's convert to a time series object so that R can work with the data and plot it more appropriately. Each steam average player count now has its own date index.
 

{% highlight r %}
steam_ts <- ts(data = df2$players, start = c(2012, 7), deltat = 1/12)  #  monthly data
plot(steam_ts, ylab = "Average number of players on Steam")
{% endhighlight %}

![plot of chunk 2016-04-24_ts_dota2_1](/figures/2016-04-24_ts_dota2_1-1.svg)

{% highlight r %}
steam_ts
{% endhighlight %}



{% highlight text %}
##            Jan       Feb       Mar       Apr       May       Jun       Jul
## 2012                                                              52721.05
## 2013 147748.14 166972.97 180878.90 174835.73 194363.84 210224.82 237800.08
## 2014 393860.32 421114.20 409755.56 421710.21 482387.24 513783.06 537018.66
## 2015 558504.33 628970.41 571713.15 526061.73 580348.42 568448.32 554991.01
## 2016 612174.78 709178.26 672554.89                                        
##            Aug       Sep       Oct       Nov       Dec
## 2012  55768.61  61867.68  75965.44 101077.43 121924.42
## 2013 330720.07 312424.76 329677.64 348246.37 366606.49
## 2014 490883.89 477998.45 495693.04 528789.80 523940.32
## 2015 606943.98 508156.85 521941.72 539536.33 573344.25
## 2016
{% endhighlight %}
 
## Forecasting steam player numbers
 
First we discuss how to make a forecast using some standard models and how to measure the accuracy. We intend to verify and validate by using textbook examples such as mean absolute percentage error (MAPE) (Kim & Kim, 2016). Other summary statistics may be of interest and we can calculate these using the `accuracy()` function from the forecasts package.
 
Comprehensive packages often come with methods for validation, a quick google search reveals the forecast package has an accuracy function that can handle time series or forecast objects for us.
 
The [accuracy measures](https://www.otexts.org/fpp/2/5) calculated are:
 
* ME: Mean Error
* RMSE: Root Mean Squared Error
* MAE: Mean Absolute Error
* MPE: Mean Percentage Error
* MAPE: Mean Absolute Percentage Error
* MASE: Mean Absolute Scaled Error
* ACF1: Autocorrelation of errors at lag 1.
 
## Training and testing the models
 
It is important to evaluate forecast accuracy using genuine forecasts. That is, it is invalid to look at how well a model fits the historical data; the accuracy of forecasts can only be determined by considering how well a model performs on new data that were not used when estimating the model.
 
### Training
It can help if we visualise the forecasts and compare graphically as well as using quantitative measures of accuracy. We will attempt to forecast 6 months into the "future" by using our historic data. The present is defined as 2012 Q3. We include the exponential smoothing state space model (ets) as it performs well with typical forecasting problems.
 
Take a moment to look at the plot and make a six month forecast using your gut.
 
 

{% highlight r %}
h <- 6  # set h here to save us typing, lexical scoping looks for default first
# SUBSET DATA
# We use tail to find this cut off date
tail(steam_ts, 9)
{% endhighlight %}



{% highlight text %}
## [1] 554991.0 606944.0 508156.8 521941.7 539536.3 573344.2 612174.8 709178.3
## [9] 672554.9
{% endhighlight %}



{% highlight r %}
# we introduce the window() function to split the zoo object into smaller zoo
train <- window(x = steam_ts, end = c(2015, 9))  #  2015, Sep
test <- window(x = steam_ts, start = c(2015, 10))  # 2015, Oct
length(test) == h  #  Check, should be 6 quarters
{% endhighlight %}



{% highlight text %}
## [1] TRUE
{% endhighlight %}



{% highlight r %}
plot(train, main = "Half year forecasts for Steam active player number",
   ylab = "Dota 2 players", xlab = "Year",
   xlim = c(2012, 2017), ylim = c(50000, 800000))
{% endhighlight %}

![plot of chunk 2016-04-24_ts_dota2_2](/figures/2016-04-24_ts_dota2_2-1.svg)
 
Now let's fit some [classic benchmark forecasting models](https://www.otexts.org/fpp/2/3) from simple to complex. We have the grand mean, the naive or last observation method and the ETS method explained later.
 

{% highlight r %}
# FITTING MODELS, h is defined above
fit1 <- meanf(train, h = h)  #  We fit again and forecast into the future test data
fit2 <- naive(train, h = h)
fit3 <- ets(train)  #  different structure to other two
 
# PLOT training data followed by model forecasts followed by actual test data
plot(train, main = "Half year forecasts for Dota player number",
   ylab = "Dota 2 players", xlab = "Year",
   xlim = c(2012, 2017), ylim = c(50000, 800000))
 
#PLOT MODEL FORECAST
lines(fit1$mean, col = "blue")
lines(fit2$mean, col = "red")
lines(forecast(fit3, h = h)$mean, col = "green")  #  look at forecast(fit3) structure, mean
#ACTUAL
lines(test)
#legend
legend("topleft", lty = 1, col = c(4,2,3, bty = "n"),
legend = c("Average model","Naive model","ETS"))
{% endhighlight %}

![plot of chunk 2016-04-24_ts_dota2_3](/figures/2016-04-24_ts_dota2_3-1.svg)
 
Which model provided the best forecast?
 
Looking at the `?ets()` help for the function reveals it returns an exponential smoothing state space model fit to the time series. Apparently this methodology performed extremely well on the Makridakis or [M-competition data](https://forecasters.org/resources/time-series-data/).
 
We can use the forecast package to plot probability intervals on our forecast which gives us an idea that predicting further into the future increases the uncertainity of our estimate.
 

{% highlight r %}
plot(forecast(fit3), main = "Half year forecast for Dota player number",
   ylab = "Dota 2 players", xlab = "Year",
   xlim = c(2012, 2017), ylim = c(50000, 800000))
lines(test)
{% endhighlight %}

![plot of chunk 2016-04-24_ts_dota2_4](/figures/2016-04-24_ts_dota2_4-1.svg)
 
## Quantitative testing
 
Now we quantitatively compare the forecast produced by each model based on the training data against the test data. The exponential smoothing state space model (ETS) outperformed the simple models but the fit still leaves a little to be desired as our forecast accuracy diminished the further we went into the future. Notice how relying on just the training error is a bad idea as depending on the type of accuracy measure used you may conclude that some models are more accurate than the reality of forecasting in to the future.
 

{% highlight r %}
accuracy(fit1, test)  #  average
{% endhighlight %}



{% highlight text %}
##                        ME     RMSE      MAE       MPE     MAPE      MASE
## Training set 1.265349e-11 181140.3 159868.2 -67.73638 97.59434 0.8450003
## Test set     2.388679e+05 248328.3 238867.9  38.74498 38.74498 1.2625618
##                   ACF1 Theil's U
## Training set 0.9335038        NA
## Test set     0.5449672  5.023057
{% endhighlight %}



{% highlight r %}
accuracy(fit2, test)  #  naive
{% endhighlight %}



{% highlight text %}
##                    ME      RMSE      MAE       MPE      MAPE      MASE
## Training set 11985.15  36942.38 29175.68  5.315332  8.881412 0.1542112
## Test set     96631.52 118096.11 96631.52 14.934632 14.934632 0.5107562
##                    ACF1 Theil's U
## Training set -0.1461897        NA
## Test set      0.5449672  2.383937
{% endhighlight %}



{% highlight r %}
accuracy(forecast(fit3), test)  #  ets
{% endhighlight %}



{% highlight text %}
##                     ME     RMSE      MAE       MPE     MAPE      MASE
## Training set -4330.498 34436.61 23570.44 -1.111023 7.096009 0.1245841
## Test set     28365.975 51209.05 36731.79  4.002078 5.579838 0.1941498
##                    ACF1 Theil's U
## Training set -0.1029535        NA
## Test set      0.4267737  1.033074
{% endhighlight %}
 
Let's look a little bit more closely at the ETS model and its forecast.
 

{% highlight r %}
fit3$method
{% endhighlight %}



{% highlight text %}
## [1] "ETS(M,A,N)"
{% endhighlight %}
 
It defaulted to a multiplicativee error type with an additive trend and no seasonal component.
 
## Residual diagnostics
A [good forecasting method](https://www.otexts.org/fpp/2/6) will yield residuals with the following properties:
 
* The residuals are uncorrelated. If there are correlations between residuals, then there is information left in the residuals which should be used in computing forecasts.
* The residuals have zero mean. If the residuals have a mean other than zero, then the forecasts are biased.
 
Any forecasting method that does not satisfy these properties can be improved.
 

{% highlight r %}
res <- fit3$residuals
plot(res, main = "Residuals from ETS method")
{% endhighlight %}

![plot of chunk 2016-04-24_res](/figures/2016-04-24_res-1.svg)

{% highlight r %}
Acf(res, main = "ACF of residuals")
{% endhighlight %}

![plot of chunk 2016-04-24_res](/figures/2016-04-24_res-2.svg)

{% highlight r %}
hist(res, nclass = "FD", main = "Histogram of residuals")
{% endhighlight %}

![plot of chunk 2016-04-24_res](/figures/2016-04-24_res-3.svg)
 
When interpreting these diagnostic plots I would consult [Hyndman's book](https://www.otexts.org/fpp/2/6).
 
There may be some non-normality of the residuals suggesting that forecasts from this model may be quite good by prediction intervals based on assumptions of the normal distribution may be biased. There appears to be no autocorrelation through time, although Portmanteau (French suitcase) tests for autocorrelation may provide a more definitive answer.
 
## Forecasting
 
Assuming our ETS model is OK, let's predict Dota 2 players into the future by training the ETS on the complete time series.
 

{% highlight r %}
fit4 <- ets(steam_ts)
plot(forecast(fit4), main = "ETS forecast for Dota player number",
   ylab = "Dota 2 players", xlab = "Year",
   xlim = c(2012, 2018))
{% endhighlight %}

![plot of chunk 2016-04-24_ts_dota2_5](/figures/2016-04-24_ts_dota2_5-1.svg)
 
# Conclusions
 
We introduced some basic concepts of dealing with time series data in R. We can think of them as being dataframes with a special index tacked on to each row providing a unique data and data combination. As each datum is dependent on the previous data, simple time series forecasting methods provide suprisingly powerful machine learning methods for predicting future values and their prediciton intervals. As usual R delivers, with a selection of easy to implement and world-class algorithms freely available in packages, such as forecast. It looks like Dota 2 is continuing to grow in popularity after a brief plateau from 2015-2016. Keep buying digital hats without fear of a Dota 2 player-base crash!
 
Warning: leave one out cross-validation is preferred for model selection. Many other better methods exist and these forecasts are inevitably prone to error.
 
## References
 
* Hyndman, R. J., Koehler, A. B., Snyder, R. D., & Grose, S. (2002). A state space framework for automatic forecasting using exponential smoothing methods. International Journal of Forecasting, 18(3), 439-454. http://doi.org/10.1016/S0169-2070(01)00110-8
* Hyndman, R. J., & Khandakar, Y. (2008). Automatic time series forecasting : the forecast package for R. Journal Of Statistical Software, 27(3), 1-22. http://doi.org/10.18637/jss.v027.i03
* Hyndman. Forecasting practices and principles. https://www.otexts.org/book/fpp
* Kim, S., & Kim, H. (2016). A new metric of absolute percentage error for intermittent demand forecasts. International Journal of Forecasting, 32(3), 669-679. http://doi.org/10.1016/j.ijforecast.2015.12.003
 

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
## [1] forecast_7.0      timeDate_3012.100 zoo_1.7-12        rvest_0.3.1      
## [5] xml2_0.1.2        magrittr_1.5      dplyr_0.4.3       testthat_0.11.0  
## [9] knitr_1.12       
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.4        munsell_0.4.2      colorspace_1.2-6  
##  [4] lattice_0.20-33    R6_2.1.2           quadprog_1.5-5    
##  [7] plyr_1.8.3         stringr_1.0.0      httr_1.0.0        
## [10] tools_3.2.3        nnet_7.3-11        parallel_3.2.3    
## [13] grid_3.2.3         gtable_0.1.2       DBI_0.3.1         
## [16] selectr_0.2-3      tseries_0.10-34    lazyeval_0.1.10   
## [19] assertthat_0.1     digest_0.6.9       crayon_1.3.1      
## [22] ggplot2_2.0.0      formatR_1.2.1      curl_0.9.4        
## [25] rsconnect_0.4.1.11 memoise_0.2.1      evaluate_0.8      
## [28] fracdiff_1.4-2     stringi_1.0-1      scales_0.3.0      
## [31] XML_3.98-1.3
{% endhighlight %}
 
