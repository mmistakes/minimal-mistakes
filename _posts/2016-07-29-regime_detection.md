---
title: "Regime Switching Model"
author: matt_gregory
comments: yes
date: '2016-07-29'
modified: 2016-08-04
layout: post
excerpt: "Forecasting regime changes in market turbulence"
published: true
status: publish
tags:
- Hidden Markov Models
- Regime detection
- forecast
- forecasting
- R
categories: Rstats
---
 

 
I'm a sucker for statistical methods and Machine Learning particularly anything with a cool sounding name. When reading about [Crouching Tiger Hidden Markov Models](http://www.machinegurning.com/rstats/markov_chain_discrete/) in an earlier post I stumbled across a topic called [regime detection](http://www.r-bloggers.com/regime-detection/).  
 
In economics latent Markov models, are so called Regime switching models. Regime Detection comes in handy when you are trying to decide which strategy to deploy. For example there are periods (regimes) when Trend Following strategies, like an autoregressive integrated moving average model (ARIMA) or exponential smoothing state space models (ETS) [forecasting](https://www.otexts.org/fpp) work better and there are periods when other strategies might be better. This might be useful if you are forecasting an index or rate that typically follows a trend but occasionally becomes more volatile.  
 
For example some time series may be particularly well behaved except during the unpredictable economic downturns. The idea behind using the Regime Switching Models to identify market states is that market returns might have been drawn from two or more distinct distributions. Fortunately we do not have to fit regimes by hand, there is the `depmixS4 package` for Hidden Markov Models at CRAN that uses the expectation-maximization (EM) algorithm to fit Hidden Markov Models.
 

 

{% highlight r %}
plot(ts_uk_tpi, xlab = "Year", ylab = "UK BCIS TPI")  #  see Rmd for data processing
{% endhighlight %}

![plot of chunk 2016-07-29-plot_tpi](/figures/2016-07-29-plot_tpi-1.svg)
 
We use an economic indicator variable from the UK Building Cost Information Service (BCIS), as it provides an excellent demo of the type of variable that tends to have an upward trend until occasional market effects cause uncertainty and volatility. [Tender price index](https://www.gov.uk/government/statistics/bis-prices-and-cost-indices) (TPI) is used for many practical purposes in the construction industry, including establishing the level of individual tenders, adjustment for time, pricing, cost planning, and forecasting cost trends and general comparisons. Any index that responds to market conditions is suitable for this methodology.
 
Here it appears we have distinguishable states or regimes, the steady upward trend and the more volatile mountainous peaks followed by a slight trough. 
 
We use the package documentation from `vignette("depmixS4")` to get started. First we experiment on the original time series, then we will see the impact of looking at the TPI first order difference.
 

{% highlight r %}
#  following example from vignette
mod2 <- depmix(response = tpi ~ 1, data = df3, nstates = 2, trstart = runif(4))
summary(mod2)
{% endhighlight %}



{% highlight text %}
## Initial state probabilties model 
## pr1 pr2 
## 0.5 0.5 
## 
## Transition matrix 
##         toS1  toS2
## fromS1 0.505 0.495
## fromS2 0.140 0.860
## 
## Response parameters 
## Resp 1 : gaussian 
##     Re1.(Intercept) Re1.sd
## St1               0      1
## St2               0      1
{% endhighlight %}



{% highlight r %}
#  mod contains the model specification not the model fit, hence
fm2 <- fit(mod2, emc = em.control(rand = TRUE))
{% endhighlight %}



{% highlight text %}
## iteration 0 logLik: -885.2267 
## iteration 5 logLik: -848.1344 
## iteration 10 logLik: -777.1209 
## iteration 15 logLik: -773.38 
## iteration 20 logLik: -773.2855 
## iteration 25 logLik: -773.2808 
## iteration 30 logLik: -773.2806 
## converged at iteration 31 with logLik: -773.2806
{% endhighlight %}



{% highlight r %}
print(fm2)
{% endhighlight %}



{% highlight text %}
## Convergence info: Log likelihood converged to within tol. (relative change) 
## 'log Lik.' -773.2806 (df=7)
## AIC:  1560.561 
## BIC:  1582.087
{% endhighlight %}
 
We can compare this to a trivial one state model which returns the mean and standard deviation of the modelled variable. The two state model is slightly better with smaller log-likelihood, Akaike information criterion (AIC) and Bayesian information criterion  (BIC) despite an increase in the degrees of freedom associated with the larger number of states modelled.
 

{% highlight r %}
mod1 <- depmix(tpi ~ 1, data = df3, nstates = 1)
summary(mod1)
{% endhighlight %}



{% highlight text %}
## Initial state probabilties model 
## pr1 
##   1 
## 
## Transition matrix 
##        toS1
## fromS1    1
## 
## Response parameters 
## Resp 1 : gaussian 
##     Re1.(Intercept) Re1.sd
## St1               0      1
{% endhighlight %}



{% highlight r %}
fm1 <- fit(mod1, emc = em.control(rand = TRUE))
{% endhighlight %}



{% highlight text %}
## iteration 0 logLik: -885.3072 
## converged at iteration 1 with logLik: -885.3072
{% endhighlight %}



{% highlight r %}
print(fm1)
{% endhighlight %}



{% highlight text %}
## Convergence info: Log likelihood converged to within tol. (relative change) 
## 'log Lik.' -885.3072 (df=2)
## AIC:  1774.614 
## BIC:  1780.765
{% endhighlight %}
 
# First order difference
 
As the time series is non-stationary, let's take the first order difference and lagged time series of the `tpi`, as this often helps when modelling time series. Again we see the peaks and troughs mirrored by areas of increased volatility.
 

{% highlight r %}
#  df4 is as a dataframe
plot(x = df4$thedate, y = df4$tpi_d1, xlab = "Year", ylab = "UK BCIS TPI difference", type = "l")
{% endhighlight %}

![plot of chunk 2016-07-29-plot_tpi_dif1](/figures/2016-07-29-plot_tpi_dif1-1.svg)
 
We fit a two state model which results in a reduction in the Log likelihood and both Information Criteria measures.
 

{% highlight r %}
#BEST GAUSSIAN HIDDEN MARKOV MODEL MODEL
#  Remove row containing NA
mod3 <- depmix(response = tpi_d1 ~ 1, data = df4[complete.cases(df4), ],
               nstates = 2, trstart = runif(4))
summary(mod3)
{% endhighlight %}



{% highlight text %}
## Initial state probabilties model 
## pr1 pr2 
## 0.5 0.5 
## 
## Transition matrix 
##         toS1  toS2
## fromS1 0.419 0.581
## fromS2 0.715 0.285
## 
## Response parameters 
## Resp 1 : gaussian 
##     Re1.(Intercept) Re1.sd
## St1               0      1
## St2               0      1
{% endhighlight %}



{% highlight r %}
#  mod contains the model specification not the model fit, hence
fm3 <- fit(mod3, emc = em.control(rand = TRUE), verbose = FALSE)
{% endhighlight %}



{% highlight text %}
## converged at iteration 39 with logLik: -424.4353
{% endhighlight %}



{% highlight r %}
print(fm3)
{% endhighlight %}



{% highlight text %}
## Convergence info: Log likelihood converged to within tol. (relative change) 
## 'log Lik.' -424.4353 (df=7)
## AIC:  862.8705 
## BIC:  884.3528
{% endhighlight %}
 
# Second order difference
 
From the second order difference it looks like we have two regime states which could be modelled by Gaussian distributions with different standard deviations.
 

{% highlight r %}
#  df5 is as a dataframe
plot(x = df5$thedate, y = df5$tpi_d2, xlab = "Year", ylab = "UK BCIS TPI second order difference", type = "l")
{% endhighlight %}

![plot of chunk 2016-07-29-plot_tpi_dif2](/figures/2016-07-29-plot_tpi_dif2-1.svg)
 
We fit a model, regime detection.
 

{% highlight r %}
#  Remove row containing NA
mod4 <- depmix(response = tpi_d2 ~ 1, data = df5[complete.cases(df5), ],
               nstates = 2, trstart = runif(4))
summary(mod4)
{% endhighlight %}



{% highlight text %}
## Initial state probabilties model 
## pr1 pr2 
## 0.5 0.5 
## 
## Transition matrix 
##         toS1  toS2
## fromS1 0.111 0.889
## fromS2 0.122 0.878
## 
## Response parameters 
## Resp 1 : gaussian 
##     Re1.(Intercept) Re1.sd
## St1               0      1
## St2               0      1
{% endhighlight %}



{% highlight r %}
#  mod contains the model specification not the model fit, hence
fm4 <- fit(mod4, emc = em.control(rand = TRUE), verbose = FALSE)
{% endhighlight %}



{% highlight text %}
## converged at iteration 30 with logLik: -466.6799
{% endhighlight %}



{% highlight r %}
print(fm4)
{% endhighlight %}



{% highlight text %}
## Convergence info: Log likelihood converged to within tol. (relative change) 
## 'log Lik.' -466.6799 (df=7)
## AIC:  947.3599 
## BIC:  968.798
{% endhighlight %}
 
# Which state are we in?
So our hidden Markov model explains more of the variation when fitted to the first order difference of the Tender Price Index using a two state model.
 

{% highlight r %}
(gauss_fit <- summary(fm3, which = "response"))
{% endhighlight %}



{% highlight text %}
## Response parameters 
## Resp 1 : gaussian 
##     Re1.(Intercept) Re1.sd
## St1           1.653  2.561
## St2           0.170  5.893
{% endhighlight %}



{% highlight text %}
##     Re1.(Intercept) Re1.sd
## St1           1.653  2.561
## St2           0.170  5.893
{% endhighlight %}



{% highlight r %}
#  Where state 1 is the lower volatility and more upward trendy state
#  Where state 2 is the higher volatility, less predictable state
#  If in state 2 our time series methods are less likely to be useful for forecasting
 
st1_mean <- gauss_fit[1, 1]
st1_sd <- gauss_fit[1, 2]
st2_mean <- gauss_fit[2, 1]
st2_sd <- gauss_fit[2, 2]
{% endhighlight %}
 
Thus if we plot our TPI first order difference and add these distributions, we can elucidate when the TPI is in one or the other state (steady or volatile). The mean for both is above zero due to the non-stationary nature of the TPI as it wanders ever upwards through time, like other inflation indices. The standard deviation for the second volatile state is greater, reflecting the uncertainity and difficulting in forecasting TPI while in this state.
 
We can plot the first order difference of TPI and identify the different regimes using the Gaussian 95% confidence intervals (mean +/- 1.96*sd). If the TPI first order difference lies outside the 95%.
 

{% highlight r %}
#INPUT
ci <- c(1.96, 2.58) # 1.96 = 95%, 2.58 = 99%
line_type <- c("dashed", "solid")
 
#OUTPUT
plot(x = df4$thedate, y = df4$tpi_d1, xlab = "Year",
     ylab = "UK BCIS TPI first order difference",
     type = "l", ylim = c(-18, 18))
abline(h = st1_mean + ci*st1_sd, col = "green", lty = line_type)
abline(h = st1_mean - ci*st1_sd, col = "green", lty = line_type)
abline(h = st2_mean + ci*st2_sd, col = "red", lty = line_type)
abline(h = st2_mean - ci*st2_sd, col = "red", lty = line_type)
{% endhighlight %}

![plot of chunk 2016-07-29-plot_hmm](/figures/2016-07-29-plot_hmm-1.svg)
 
This is quite useful for identifying when TPI is in its different states, however it is of post hoc interest, as we can only look at it after the fact. However, as the volatile years putatively associated with state 2 tend to persist for several quarters, if we enter this state we can predict that our standard time series methods will not be useful for several quarters until the TPI first order difference generative model transitions back to state 1 with probability 0.522 as described in the transition matrix.
 
$$\mathbf{X} = \left[\begin{array}
{rrr}
0.581 & 0.419 \\
0.478 & 0.522 \\
\end{array}\right]
$$
 
The problem is there is some overlap between states. How can we tell which state the TPI is in?
 
## Which state when?
First we need to build a dataframe for a ggplot2 class object and not use the zoo class `yearqrt` for our dates. We place the Quarterly style with full dates and assume Quarters occur on the first day of the month of January, April, July, October.
 

{% highlight r %}
# http://blog.revolutionanalytics.com/2014/03/r-and-hidden-markov-models.html
# Build a data frame for ggplot
dfgg <- data.frame(df4)
dfgg$thedate <- as.Date.yearqtr(dfgg$thedate, format = "%Y Q%q")
str(dfgg)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	160 obs. of  3 variables:
##  $ thedate: Date, format: "1973-01-01" "1973-04-01" ...
##  $ tpi    : int  35 37 41 42 42 42 41 42 44 43 ...
##  $ tpi_d1 : int  NA 2 4 1 0 0 -1 1 2 -1 ...
{% endhighlight %}
 
This looks good and allows us to plot. The graph shows what looks like a more or less stationary process punctuated by a few spikes of extreme volatility. Have a guess as to when the most extreme spike occurs? 
 

{% highlight r %}
mycolours <- "black"
 
p1 <- ggplot( dfgg, aes(thedate) ) +
  geom_line( aes( y = tpi_d1 ), colour = mycolours) +
  labs( title = "UK BCIS TPI first order difference") +
  ylab("Change in TPI") + xlab("Year") + 
  theme(legend.position = "bottom", legend.direction = "horizontal",
        legend.title = element_blank()) +
  theme_bw()
 
p1
{% endhighlight %}

![plot of chunk 2016-07-29-plot_tpi_black](/figures/2016-07-29-plot_tpi_black-1.svg)
 

{% highlight r %}
# Economist theme
library(ggthemes)
#library(extrafont)
 
#hybrid, couldn't get economist font, requires effort
p2 <- p1 + theme_economist() + scale_colour_economist() +
  theme(axis.line.x = element_line(size = .5, colour = "black"),
        legend.position = "bottom", legend.direction = "horizontal",
        legend.title = element_blank())
p2
{% endhighlight %}

![plot of chunk 2016-07-29-plot_tpi_blue](/figures/2016-07-29-plot_tpi_blue-1.svg)

{% highlight r %}
#When was the most extreme spike?
# min(dfgg$tpi_d1, na.rm = T)
# dfgg[dfgg$tpi_d1 == -17, ]  #  2009 Q1
 
#upward peak?
#max(dfgg$tpi_d1, na.rm = T)
#dfgg[dfgg$tpi_d1 == 15, ]  #  2004 Q4 and 2012 Q4
{% endhighlight %}
 
Let's construct and fit a regime switching model and confirm while we are at it, that the 2 state model is superior. It is, try adjusting the `nstates` argument to confirm, which gives the lowest log-likelihood and AIC and BIC?
 

{% highlight r %}
# Construct and fit a regime switching model
mod5 <- depmix(tpi_d1 ~ 1, family = gaussian(), nstates = 2,  #  change this and see, 2 is best for lowest AIC & BIC
               data = dfgg[complete.cases(dfgg), ])
set.seed(1337)
fm5 <- fit(mod5, verbose = FALSE)
{% endhighlight %}



{% highlight text %}
## converged at iteration 33 with logLik: -424.4353
{% endhighlight %}



{% highlight r %}
#
summary(fm5)
{% endhighlight %}



{% highlight text %}
## Initial state probabilties model 
## pr1 pr2 
##   1   0 
## 
## Transition matrix 
##         toS1  toS2
## fromS1 0.978 0.022
## fromS2 0.030 0.970
## 
## Response parameters 
## Resp 1 : gaussian 
##     Re1.(Intercept) Re1.sd
## St1           1.653  2.561
## St2           0.170  5.893
{% endhighlight %}



{% highlight r %}
print(fm5)
{% endhighlight %}



{% highlight text %}
## Convergence info: Log likelihood converged to within tol. (relative change) 
## 'log Lik.' -424.4353 (df=7)
## AIC:  862.8705 
## BIC:  884.3528
{% endhighlight %}
 
Now we have an inference task where we know the mean and standard deviation of the two different states, thus we can infer the proability that an observation belongs to a given state, either state 1 (calm) or state 2 (volatile).
 

{% highlight r %}
# Classification (inference task)
probs <- posterior(fm5)             # Compute probability of being in each state
head(probs)
{% endhighlight %}



{% highlight text %}
##   state        S1          S2
## 1     1 1.0000000 0.000000000
## 2     1 0.9880537 0.011946270
## 3     1 0.9900632 0.009936771
## 4     1 0.9880643 0.011935684
## 5     1 0.9880643 0.011935684
## 6     1 0.9838128 0.016187224
{% endhighlight %}



{% highlight r %}
rowSums(head(probs)[, 2:3])          # Check that probabilities sum to 1
{% endhighlight %}



{% highlight text %}
## 1 2 3 4 5 6 
## 1 1 1 1 1 1
{% endhighlight %}



{% highlight r %}
pCalm <- probs[, 2]                  # Pick out the "Bear" or low volatility state, nod to economics
dfgg$pCalm <- c(0.99, pCalm)  # remember we removed the NA from earlier, we make Bear state with high probs
# Put pCalm in the data frame for plotting
{% endhighlight %}
 
Now we have the probabilities of each state our Bear (calm, state 1) and our volatile state (state 2).
 

{% highlight r %}
# reshape the data in a form convenient for ggplot
df <- melt(dfgg[, c("thedate", "tpi", "tpi_d1", "pCalm")],
           id = "thedate",
           measure = c("tpi", "tpi_d1","pCalm"))
#head(df)
 
# Plot the tpi time series along withe the time series of probabilities
#qplot(thedate, value, data = df, geom = "line",
#      main = "Quarterly change in TPI and 'Calm' state probabilities",
#      ylab = "") + 
#  facet_grid(variable ~ ., scales = "free_y")
 
p3 <- ggplot(df, aes(thedate, value, col = variable, group = 1)) +
  geom_line() +
 facet_grid(variable~., scale = 'free_y') +
  scale_color_discrete(breaks = c('tpi', 'tpi_d1','pCalm')) +
  theme_bw()
p3
{% endhighlight %}

![plot of chunk 2016-07-29-plot_tpi_hmm_prob](/figures/2016-07-29-plot_tpi_hmm_prob-1.svg)
 
This tells us the current volatility of the TPI and thus will determine the utility and precision of our forecasts that rely on standard timeseries ARIMA methods. Given the TPI is currently in a volatile state probably, we should be cautious when using our standard forecasting strategies. This is particularly poignant given the market volatility associated with the EU referendum.
 
The states prove to be quite sticky and unlikely to change as indicated by the transition matrix:
 
$$\mathbf{X} = \left[\begin{array}
{rrr}
0.98 & 0.02 \\
0.03 & 0.97 \\
\end{array}\right]
$$
 
## Forecasting
 
Perhaps we can use markovchain package to run simulations and determine most probable scenario to assist forecast.
 

{% highlight r %}
library(markovchain)
 
#define the Markov chain
statesNames = c("Calm", "Volatile")
mc_tpi <- new("markovchain", states = statesNames,
           transitionMatrix = matrix(c(0.98, 0.02, 0.03, 0.97), 
                                     nrow = 2, byrow = TRUE,
                                     dimnames = list(statesNames, statesNames)
                 ))
#show the sequence
outs2 <- rmarkovchain(n = 8, object = mc_tpi)
{% endhighlight %}
 
If we look at the tail end of the first order difference of the TPI:
 

{% highlight r %}
tail(df4$tpi_d1)
{% endhighlight %}



{% highlight text %}
## [1] -3  3 -8 15 -7  1
{% endhighlight %}
 
We observe TPI difference of less than the 99% CI for State 2. Therefore we assume that the TPI difference is in State 1 to initiate our simulation, although it could be in state 2 given the previous large differences of 15 & 7.
 
Thus we run the simulation.
 

{% highlight r %}
outs <- markovchainSequence(n = 8, markovchain = mc_tpi, t0 = "Volatile")
outs
{% endhighlight %}



{% highlight text %}
## [1] "Volatile" "Volatile" "Volatile" "Calm"     "Calm"     "Calm"    
## [7] "Calm"     "Calm"
{% endhighlight %}
 
We could run this 10,000 times and build up a probability distribution of likely states for future TPI to assist with time series forecasting using traditional time series methods that rely on historic data to predict the future.
 
# Conclusion
 
Hybrid models can be developed which can add confidence to using traditional time series methods such as ARIMA and ETS, whereby we expect the future to behave in a similar fashion to the past (especially less volatile periods in an indices history).
 
> Prediction is very difficult, especially about the future.
 
*- Niels Bohr*
 
 

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
## [1] stats     graphics  grDevices utils     datasets  methods   base     
## 
## other attached packages:
##  [1] testthat_1.0.2  knitr_1.13.1    markovchain_0.5 ggthemes_3.0.3 
##  [5] reshape2_1.4.1  ggplot2_2.1.0   lubridate_1.5.6 zoo_1.7-13     
##  [9] depmixS4_1.3-3  Rsolnp_1.16     MASS_7.3-44     nnet_7.3-12    
## [13] dplyr_0.4.3    
## 
## loaded via a namespace (and not attached):
##  [1] Rcpp_0.12.5         formatR_1.4         plyr_1.8.4         
##  [4] tools_3.3.1         digest_0.6.9        evaluate_0.9       
##  [7] gtable_0.2.0        lattice_0.20-33     Matrix_1.2-6       
## [10] igraph_1.0.1        DBI_0.4-1           yaml_2.1.13        
## [13] parallel_3.3.1      expm_0.999-0        stringr_1.0.0      
## [16] stats4_3.3.1        grid_3.3.1          R6_2.1.2           
## [19] rmarkdown_0.9.6.13  matlab_1.0.2        magrittr_1.5       
## [22] scales_0.4.0        htmltools_0.3.5     rsconnect_0.4.3    
## [25] assertthat_0.1      colorspace_1.2-6    labeling_0.3       
## [28] stringi_1.1.1       lazyeval_0.2.0      RcppParallel_4.3.19
## [31] munsell_0.4.3       truncnorm_1.0-7     crayon_1.3.2
{% endhighlight %}
 
