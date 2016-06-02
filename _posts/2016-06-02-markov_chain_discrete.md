---
title: "Discrete Time Markov Chains"
author: matt_gregory
comments: yes
date: '2016-06-02'
modified: 2016-06-02
layout: post
excerpt: "My data science journey is a Markov Chain"
published: true
status: publish
tags:
- Markov Chain
- Rstats
- R
categories: Rstats
---
 

 
## Markov chains
Markov chains, named after Andrey Markov, are mathematical systems that hop from one "state" (a situation or set of values) to another. See [here](http://setosa.io/blog/2014/07/26/markov-chains/index.html) for an excellent introduction.
 
The second time I used a Markov chain method resulted in a publication (the first was when I simulated Brownian motion with a coin for GCSE coursework). At the time I was completing it as part of the excellent and highly recommended [Sysmic course](http://sysmic.ac.uk/home.html) so that it could contribute to a chapter in my thesis and as a [journal article](http://onlinelibrary.wiley.com/doi/10.1111/imb.12220/abstract;jsessionid=3694FE870B60851D03E74F8EF7D18E79.f04t01).
 
As I was new to programming, I naively wrote the function myself, to simulate the transition between states of injected insect embryos to model the development of [transgenic insects](https://en.wikipedia.org/wiki/Transgenesis), wherby each injected egg had a change of either living or dying and then, if alive, a chance of incorporating the injected DNA into its genome (simplified explanation).
 
When using R it is always wiser to find a package that has already been developed and documented, as it is likely to have experienced more testing  than anything you would produce as an individual (it's also quicker). We investigate the `markovchain` package.
 
## Discrete Time Markov Chain
 
We define a discrete time markov chain that matches our statistics derived from my review published this year, we consider the diamond back moth summary statistics, *Plutella xylostella* (survival and transformation efficiency).
 

{% highlight r %}
library(markovchain)
##  Get the diamond back moth summary statistics of interest
library(dplyr)
mydata <- read.csv("https://raw.githubusercontent.com/mammykins/piggyBac-data/master/master2015jan.csv",
header = TRUE) %>% select(g0.lambda, surv)
 
s <-  median(mydata$surv, na.rm = TRUE) %>% round(digits = 5)
trans_efficiency <- median(mydata$g0.lambda, na.rm = TRUE) %>% round(digits = 5)
{% endhighlight %}
 
First we create our three different states of our Discrete Time Markov Chain (DTMC). Embryo, injection survivor and transgenic adult (`egg`, `g0`, `dead`). We keep things simple to learn how the process works, if injection survivors are non-transgenic then we discard them (their state changes to `dead`).
 
## Transition matrix
 
We use a "transition matrix" to tally the transition probabilities. Every state in the state space is included once as a row and again as a column, and each cell in the matrix tells you the probability of transitioning from its row's state to its column's state. The rows of the transition matrix must total to 1. There also has to be the same number of rows as columns.  
 
Based on our summary statistics in my paper we describe our transition probability between states for *Plutella xylostella* as:
 
$$\mathbf{X} = \left[\begin{array}
{rrr}
0 & 0.13 & 0.87 & 0 \\
0 & 0 & 0.98 & 0.02 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{array}\right]
$$
 
Compare this matrix to the matrix `dtmcA` assigned below to elucidate the meaning of the proportions in the matrix.
 

{% highlight r %}
tmA <- matrix(c(0, s, 1 - s, 0,     #  egg to...
                0, 0, 1 - trans_efficiency, trans_efficiency,   #  g0 to...
                0, 0, 1, 0,         #  dead to...
                0, 0, 0, 1),
              nrow = 4, byrow = TRUE) #define the transition matrix
dtmcA <- new("markovchain", transitionMatrix = tmA,
states = c("egg", "g0", "dead", "transgenic"),
name = "diamondback") #create the DTMC
dtmcA
{% endhighlight %}



{% highlight text %}
## diamondback 
##  A  4 - dimensional discrete Markov Chain with following states: 
##  egg, g0, dead, transgenic 
##  The transition matrix   (by rows)  is defined as follows: 
##            egg      g0    dead transgenic
## egg          0 0.12942 0.87058    0.00000
## g0           0 0.00000 0.98134    0.01866
## dead         0 0.00000 1.00000    0.00000
## transgenic   0 0.00000 0.00000    1.00000
{% endhighlight %}
 
Eggs operate as the input to the model, we put `egg` in, we then do injections, 0.87058 of the `egg` die, 0.12942 survive to produce injection survivors (`g0`), of these `g0`, only 1% give rise to transgenics, the non-transgenics are considered `dead`, or waste insects.
 
We can use the igraph package to plot the Markov Chain object.
 

{% highlight r %}
plot(dtmcA, main = "Transition probability matrix for DBM")
{% endhighlight %}

![plot of chunk 2016-06-02-trans1](/figures/2016-06-02-trans1-1.svg)
Or there are `diagram` ways to plot.

{% highlight r %}
library(diagram)
plot(dtmcA, main = "Transition probability matrix for DBM", package = "diagram",
        lwd = 1, box.lwd = 2, cex.txt = 0.8,
        box.size = 0.1, box.type = "square",
        box.prop = 0.5)
{% endhighlight %}

![plot of chunk 2016-06-02-trans2](/figures/2016-06-02-trans2-1.svg)
 
## Probabilistic analysis
 
* It is possible to access transition probabilities and to perform
basic operations.
* Similarly, it is possible to access the conditional distribution of
states.
 

{% highlight r %}
dtmcA[2, 4] #using [ method
{% endhighlight %}



{% highlight text %}
## [1] 0.01866
{% endhighlight %}



{% highlight r %}
transitionProbability(dtmcA,
"g0","transgenic") #using specific S4 method
{% endhighlight %}



{% highlight text %}
## [1] 0.01866
{% endhighlight %}



{% highlight r %}
conditionalDistribution(dtmcA,"g0")
{% endhighlight %}



{% highlight text %}
##        egg         g0       dead transgenic 
##    0.00000    0.00000    0.98134    0.01866
{% endhighlight %}
 
We can use a variety of methods to subset S4 objects. Further examples can be found in Hadley Wickham's [Advanced R](http://adv-r.had.co.nz/).
 
Excitingly it is possible to simulate states' distributions after `n` steps, where `n` is the number of eggs to be injected, our input to the Markov Chain. If we run one step or one discrete time period then our `egg` are injected and it is determined using matrix multiplication (`tmA` by `initialState`) 
 

{% highlight r %}
set.seed(1337)
n <- 1000  #  number of embryos to be injected
steps <- 1
 
########
initialState <- c(n, 0, 0, 0)  #  we start off with only eggs injected, zero for all others
finalState <- initialState*dtmcA ^ steps #using power operator
finalState
{% endhighlight %}



{% highlight text %}
##      egg     g0   dead transgenic
## [1,]   0 129.42 870.58          0
{% endhighlight %}
 
For the full process of insect transgenesis (injection and setting up wild-type crosses to assess if DNA has been integrated) we need 2 or more steps. What would happen if we specified 10 steps?
 

{% highlight r %}
set.seed(1337)
n <- 1000  #  number of embryos to be injected
steps <- 2
 
########
initialState <- c(n, 0, 0, 0)  #  we start off with only eggs injected, zero for all others
finalState <- initialState*dtmcA ^ steps #using power operator
finalState
{% endhighlight %}



{% highlight text %}
##      egg g0    dead transgenic
## [1,]   0  0 997.585   2.414977
{% endhighlight %}
 
If we specified 2 or greater steps the `finalState` would be identical, as `transgenic` feeds into itself with 100% chance. This is emphasised using the `steadyStates()` function and revealed by the `summary()`.
 

{% highlight r %}
steadyStates(dtmcA) #S4 method
{% endhighlight %}



{% highlight text %}
##      egg g0 dead transgenic
## [1,]   0  0    0          1
## [2,]   0  0    1          0
{% endhighlight %}



{% highlight r %}
summary(dtmcA)
{% endhighlight %}



{% highlight text %}
## diamondback  Markov chain that is composed by: 
## Closed classes: 
## dead 
## transgenic 
## Recurrent classes: 
## {dead},{transgenic}
## Transient classes: 
## {egg},{g0}
## The Markov chain is not irreducible 
## The absorbing states are: dead transgenic
{% endhighlight %}
 
## Estimating a transition matrix from data
The package permits to fit a DTMC estimating the transition matrix 
from a sequence of data. `createSequenceMatrix()` returns a function
showing previous vs actual states from the pairs in a given sequence.     
The `markovchainFit()` function allows us to obtain the estimated
transition matrix and the confidence levels (using elliptic Maximum Likelihood Estimate
hyphothesis).
 

{% highlight r %}
#using Alofi rainfall dataset
data(rain)
str(rain)
{% endhighlight %}



{% highlight text %}
## 'data.frame':	1096 obs. of  2 variables:
##  $ V1  : int  3 2 2 2 2 2 2 3 3 3 ...
##  $ rain: chr  "6+" "1-5" "1-5" "1-5" ...
{% endhighlight %}



{% highlight r %}
mysequence <- rain$rain
createSequenceMatrix(mysequence)
{% endhighlight %}



{% highlight text %}
##       0 1-5  6+
## 0   362 126  60
## 1-5 136  90  68
## 6+   50  79 124
{% endhighlight %}



{% highlight r %}
myFit <- markovchainFit(data = mysequence, confidencelevel = 0.9)
myFit
{% endhighlight %}



{% highlight text %}
## $estimate
## MLE Fit 
##  A  3 - dimensional discrete Markov Chain with following states: 
##  0, 1-5, 6+ 
##  The transition matrix   (by rows)  is defined as follows: 
##             0       1-5        6+
## 0   0.6605839 0.2299270 0.1094891
## 1-5 0.4625850 0.3061224 0.2312925
## 6+  0.1976285 0.3122530 0.4901186
## 
## 
## $standardError
##              0        1-5         6+
## 0   0.03471952 0.02048353 0.01413498
## 1-5 0.03966634 0.03226814 0.02804834
## 6+  0.02794888 0.03513120 0.04401395
## 
## $confidenceInterval
## $confidenceInterval$confidenceLevel
## [1] 0.9
## 
## $confidenceInterval$lowerEndpointMatrix
##             0       1-5         6+
## 0   0.6160891 0.2036763 0.09137435
## 1-5 0.4117506 0.2647692 0.19534713
## 6+  0.1618105 0.2672305 0.43371243
## 
## $confidenceInterval$upperEndpointMatrix
##             0       1-5        6+
## 0   0.7050788 0.2561777 0.1276038
## 1-5 0.5134195 0.3474757 0.2672379
## 6+  0.2334464 0.3572754 0.5465247
## 
## 
## $logLikelihood
## [1] -1040.419
{% endhighlight %}
 
So we can call our estimated transition probability matrix using `myFit$estimate`. We could then use it to make predicitons for hypothetical set-ups.
 

{% highlight r %}
#  Assign our fitted estimate for the transition matrix to tmB
dtmcB <- myFit$estimate
dtmcB
{% endhighlight %}



{% highlight text %}
## MLE Fit 
##  A  3 - dimensional discrete Markov Chain with following states: 
##  0, 1-5, 6+ 
##  The transition matrix   (by rows)  is defined as follows: 
##             0       1-5        6+
## 0   0.6605839 0.2299270 0.1094891
## 1-5 0.4625850 0.3061224 0.2312925
## 6+  0.1976285 0.3122530 0.4901186
{% endhighlight %}



{% highlight r %}
set.seed(1337)
n <- 999  
steps <- 1
 
########
initialState <- c(n/3, n/3, n/3)
finalState <- initialState*dtmcB ^ steps #using power operator
finalState
{% endhighlight %}



{% highlight text %}
##             0      1-5       6+
## [1,] 439.8255 282.4847 276.6897
{% endhighlight %}
 
If we took the time to understand what the `rain` data was about then this might provide additional insight. The key point is we could develop a discrete time Markov Method based on estimates of a transition matrix from the data.
 
## Waste water pipe deterioration
Here we propose a hypothetical situation where we are responsible for the condition of our sewer waste water pipes in a region. We use a survey to describe the current condition with a four-point scale, inspired by Baik et al., (2006). The ranking goes from Brand New to Bad, A to D.
 

{% highlight r %}
tmC <- matrix(c(0.9, 0.1, 0, 0,    #  a
                0, 0.8, 0.2, 0,   #  b
                0, 0, 0.6, 0.4,         #  c
                0, 0, 0, 1),        #  d
              nrow = 4, byrow = TRUE) #define the transition matrix
dtmcC <- new("markovchain", transitionMatrix = tmC,
states = c("a", "b", "c", "d"),
name = "element") #create the DTMC
dtmcC
{% endhighlight %}



{% highlight text %}
## element 
##  A  4 - dimensional discrete Markov Chain with following states: 
##  a, b, c, d 
##  The transition matrix   (by rows)  is defined as follows: 
##     a   b   c   d
## a 0.9 0.1 0.0 0.0
## b 0.0 0.8 0.2 0.0
## c 0.0 0.0 0.6 0.4
## d 0.0 0.0 0.0 1.0
{% endhighlight %}
 
Correct estimation of transition probabilities in a Markov chain based deterioration model is a key ingredient for successful and cost-effective proactive management of wastewater systems. Imagine our company's estate (all of its pipes) were allowed to deteriorate for one year with an element transition matrix of:
 
$$\mathbf{X} = \left[\begin{array}
{rrr}
0.9 & 0.1 & 0 & 0 \\
0 & 0.8 & 0.2 & 0 \\
0 & 0 & 0.6 & 0.4 \\
0 & 0 & 0 & 1 \\
\end{array}\right]
$$
 
provided by expert domain knowledge from a consultancy or preferably from the data.
 

{% highlight r %}
set.seed(1337)
show(dtmcC)
{% endhighlight %}



{% highlight text %}
## element 
##  A  4 - dimensional discrete Markov Chain with following states: 
##  a, b, c, d 
##  The transition matrix   (by rows)  is defined as follows: 
##     a   b   c   d
## a 0.9 0.1 0.0 0.0
## b 0.0 0.8 0.2 0.0
## c 0.0 0.0 0.6 0.4
## d 0.0 0.0 0.0 1.0
{% endhighlight %}



{% highlight r %}
#n <-   #  
steps <- 1
 
########
initialState <- c(12, 35, 18, 5)   
finalState <- initialState*dtmcC ^ steps #using power operator
finalState
{% endhighlight %}



{% highlight text %}
##         a    b    c    d
## [1,] 10.8 29.2 17.8 12.2
{% endhighlight %}
 
We could then use the transition matrix to model what would happen to our pipes through the next 50 years without any investment. We can set up a data frame to contain labels for each timestep, and a count of how many pipes are in each state at each timestep. Then, we fill that data frame with the results after each timestep `i`, calculated by `initialState * dtmcC ^ i`:
 

{% highlight r %}
#INPUT
set.seed(1337)
initialState <- c(12, 35, 18, 5)
timesteps <- 50
 
#SIMULATION
pipe_df <- data.frame( "timestep" = numeric(),
 "a" = numeric(), "b" = numeric(),
 "c" = numeric(), "d" = numeric(),
 stringsAsFactors = FALSE)
 for (i in 0:timesteps) {
newrow <- as.list(c(i, round(as.numeric(initialState * dtmcC ^ i), 0)))
 pipe_df[nrow(pipe_df) + 1, ] <- newrow
 }
 
#OUTPUT
head(pipe_df, 5)
{% endhighlight %}



{% highlight text %}
##   timestep  a  b  c  d
## 1        0 12 35 18  5
## 2        1 11 29 18 12
## 3        2 10 24 17 19
## 4        3  9 21 15 26
## 5        4  8 17 13 32
{% endhighlight %}



{% highlight r %}
tail(pipe_df, 5)
{% endhighlight %}



{% highlight text %}
##    timestep a b c  d
## 47       46 0 0 0 70
## 48       47 0 0 0 70
## 49       48 0 0 0 70
## 50       49 0 0 0 70
## 51       50 0 0 0 70
{% endhighlight %}
 
A plot may be preferred to visualise the condition of our pipes without investment.
 

{% highlight r %}
library(RColorBrewer)
colours <- brewer.pal(4, "Set1") 
plot(pipe_df$timestep, pipe_df$b, ylim = c(0, 70), col = colours[1], type = "l",
     xlab = "Horizon in years", ylab = "Frequency of pipes in state")
lines(pipe_df$timestep,pipe_df$a, col = colours[2])
lines(pipe_df$timestep,pipe_df$c, col = colours[3])
lines(pipe_df$timestep,pipe_df$d, col = colours[4])
legend("right", legend = c("a", "b", "c", "d"), fill = colours)
{% endhighlight %}

![plot of chunk 2016-06-02-pipes-norepair](/figures/2016-06-02-pipes-norepair-1.svg)
 
 
We can calculate the timestep when all pipes break, or a steady state is reached at the absorbing state d by 
 

{% highlight r %}
absorbingStates(dtmcC)
{% endhighlight %}



{% highlight text %}
## [1] "d"
{% endhighlight %}



{% highlight r %}
transientStates(dtmcC)
{% endhighlight %}



{% highlight text %}
## [1] "a" "b" "c"
{% endhighlight %}



{% highlight r %}
steadyStates(dtmcC)
{% endhighlight %}



{% highlight text %}
##      a b c d
## [1,] 0 0 0 1
{% endhighlight %}
 
As all but state d are transitional, we are interested in when all are equal to zero and "d" is equal to the sum of the frequency of initial states, 70.
 

{% highlight r %}
head(filter(pipe_df, a == 0, b == 0, c  == 0), n = 1)
{% endhighlight %}



{% highlight text %}
##   timestep a b c  d
## 1       31 0 0 0 69
{% endhighlight %}



{% highlight r %}
#  note the rounding error
head(filter(pipe_df, a == 0, b == 0, c  == 0, d == sum(initialState)), n = 1)
{% endhighlight %}



{% highlight text %}
##   timestep a b c  d
## 1       40 0 0 0 70
{% endhighlight %}
 
## Extension
We can use this code to change the various transition probabilities to see what the effects are on the outputs (sensitivity analysis) through [visual inspection](http://www.machinegurning.com/rstats/map_df/) and consider what transition probabilities would strike the right balance (repair and maintenance allows state reversion, from states c and d back to a). Also, there are methods we could use to perform uncertainty analysis, e.g. putting confidence intervals around the transition probabilities. We won't do either of these here. This type of decision modelling scenario is perfect for Shiny app implementation!
 
## References
* Gregory, M., Alphey, L., Morrison, N. I., & Shimeld, S. M. (2016). Insect transformation with piggyBac : getting the number of injections just right. Insect Molecular Biology, http://doi.org/10.1111/imb.12220
* Baik, H., Seok, H., Jeong, D., & Abraham, D. M. (2006). Deterioration Models for Management of Wastewater Systems. Journal of Water Resources Planning and Management, 132(February), 15-24. http://doi.org/10.1061/(ASCE)0733-9496(2006)132:1(15)
* http://www.r-bloggers.com/a-discrete-time-markov-chain-dtmc-sir-model-in-r/
 

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
## [1] methods   stats     graphics  grDevices utils     datasets  base     
## 
## other attached packages:
## [1] RColorBrewer_1.1-2 diagram_1.6.3      shape_1.4.2       
## [4] dplyr_0.4.3        markovchain_0.4.4  testthat_0.8.1    
## [7] knitr_1.13        
## 
## loaded via a namespace (and not attached):
##  [1] igraph_1.0.1        Rcpp_0.12.5         magrittr_1.5       
##  [4] lattice_0.20-33     R6_2.1.2            matlab_1.0.2       
##  [7] stringr_1.0.0       tools_3.3.0         parallel_3.3.0     
## [10] grid_3.3.0          DBI_0.4-1           lazyeval_0.1.10    
## [13] RcppParallel_4.3.19 digest_0.6.4        assertthat_0.1     
## [16] Matrix_1.2-6        formatR_1.4         evaluate_0.9       
## [19] stringi_1.1.1       stats4_3.3.0        expm_0.999-0
{% endhighlight %}
 
