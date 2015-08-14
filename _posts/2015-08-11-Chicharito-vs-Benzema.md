---
layout: post
title: "Bayesian Analysis on Javier Hernandez and Benzema's scoring probabilities "
modified:
excerpt: "Use Bayesian Analysis to calculate probability of scoring in game"
tags: [Python, data mining, analytics, Bayesian]
modified: 2015-06-28
comments: true
---

For Real Madrid, the 2014/2015 Season was a disaster. Real Madrid finished second in La Liga, was knocked out in Champions League semi-finals and was knocked out in Copa by Atletico de Madrid, the home city rival. This outcome seemed impossible during the first half of the season, when the team was on route to breaking the Guiness Record for consecutive wins in official soccer matches. However, the second half of the tournament was not so favorable. Multiple injuries led to forced rotations for some positions and to a lack of player rotations for other positions.
<p><br></p>

The striker position was claimed by Karim Benzema and Javier Hernandez had few minutes of game time. Benzema clocked a total of 2312 minutes on the pitch while Herandez clocked only 859 minutes. In a season where the lack of goal seemed to the headliner of every Real Madrid story, I could only wonder if Real Madrid had the more effective striker on the pitch.  
<p><br></p>

In this post I will be using Bayesian Analysis in Python to determine the probability of scoring at least 1  goal when starting a game for Hernandez as well as for Karim Benzema. All data was taken from <a href="https://www.squawka.com/" target="_blank">Squwawka</a> and the analysis relied heavily in the PyMC module. 


Probability of scoring at least one goal when starting a game. Using Bayes' Rule, 
<p><br></p>

\\( P( k > 0 | Y= 1) = \frac{P( Y = 1 | k >0 ) \times P( k > 0)}{P(Y= 1)} \\)
<p><br></p>
Where:<br> 
K:   Number of Goals scored in game<br>
Y=1: Starting game
<p><br></p>


To begin with, I set up my Ipython environmanet to load all these modules.
{% highlight python %}
%matplotlib inline
import requests
import matplotlib.pyplot as plt
import pandas as pd
import datetime
import urllib2
from BeautifulSoup import BeautifulSoup
import numpy as np
import scipy.stats as stats
import pymc as pm  #This is the Bayesian Analysis module, it's great!
{% endhighlight %}


Collecting performance data, including minutes played, playing as a sub, dates of games etc was a bit messy and really not that exciting, so I'm going to fast forward to the point where I have a pandas dataframe for Javier Herandez and one for Benzema.

I used a Poisson distribution for two reasons, one being it can be discrete and two; it can attribute a higher probability to scoring 0 goals and a low probability of scoring 3+ goals, yet it is still possible.

When defining a Poisson distribution, the most important parameter is \\( \lambda \\). The \\( \lambda \\) parameter is what determines the shape of the distribution. As we increase \\( \lambda \\), we increase the probability of K taking larger values, in our case, a larger \\( \lambda \\) will indicate a higher chance of scoring larger number of goals. 

We don't know \\( \lambda \\), so we are going to estimate it. From good old trial and error, I determined that the best distribution was a Normal distribution with a mean being the sum number of goals in the season, divided by total minutes played multiplied by 90.



{% highlight python %}

lambda_CH = pm.Normal('lambda_KB', df['Goals/Game*'][0], 1)
lambda_KB = pm.Normal('lambda_KB', df['Goals/Game*'][1], 1)

@pm.deterministic
def observed_proportion_CH(lambda_CH=lambda_CH):
    out = lambda_CH
    return out
    
@pm.deterministic
def observed_proportion_KB(lambda_KB=lambda_KB):
    out = lambda_KB 
    return out
{% endhighlight %}

In the code above, we set the PyMC varialbes for  \\( \lambda _{CH} \\) and \\( \lambda _{KB} \\). We then use the @pm.deterministic decorator to indicate ovserved_proportion_CH and observed_proportion_KB as a deterministic function.

With our prior predictive distribution set up, we can begin developing a model. In the code below, the variable obsCH use the value paremter to mold the striker's goal scoring distribution. 
{% highlight python %}
obsCH = pm.Poisson("obsCH", observed_proportion_CH, observed=True, value=CH_red_df['GoalinGame'])
obsKB = pm.Poisson("obsKB", observed_proportion_KB, observed=True, value=df_Benzema['GoalinGame'])

model_CH = pm.Model([obsCH, lambda_CH, observed_proportion_CH, obsCH])
mcmc_CH = pm.MCMC(model_CH)
mcmc_CH.sample(40000, 15000)

model_KB = pm.Model([obsKB, lambda_KB, observed_proportion_KB, obsKB])
mcmc_KB = pm.MCMC(model_KB)
mcmc_KB.sample(40000, 15000)
{% endhighlight %}


{% highlight python %}
lambda_CH_samples = mcmc_CH.trace(lambda_CH)[:]
lambda_KB_samples = mcmc_KB.trace(lambda_KB)[:]
{% endhighlight %}

We finally have our posterior predictive distribution. As we can see from the graph below, \\( \lambda _{CH} \\) has a higher value than \\( \lambda _{KB} \\) on average. Also note that, \\( \lambda _{CH} \\)  has a wider distribution compared \\( \lambda _{KB} \\) . This is because Benzema played more games and thus we were able to tune our paremter better.
<figure>
     <img src="/images/Nine/posterior_lambda.png">
    <figcaption></figcaption>
</figure>

With our \\( \lambda \\) paremeters ready, we can use the to build our Poisson probabiltiy distribution.  As we can see from the chart below, Hernandez' higher \\( \lambda \\) is reflected in a higher probability of scoring more than 0 goals.  

<figure>
     <img src="/images/Nine/Prob_k.png">
    <figcaption></figcaption>
</figure>
