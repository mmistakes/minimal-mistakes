---
layout: post
title: "Bayesian Analysis on Javier Hernandez and Benzema's scoring probabilities "
modified:
excerpt: "Use Bayesian Analysis to calculate probability of scoring in game"
tags: [Python, data mining, analytics, Bayesian]
modified: 2015-06-28
comments: true
---

For Real Madrid, the 2014/2015 Season was a disaster. Real Madrid finished second in La Liga, was knocked out in Champions League semi-finals and was knocked out in Copa by Atletico de Madrid, the home city rival. This outcome seemed impossible during the first half of the season, when the team was on route to breaking the Guiness Record for consecutive wins in official soccer matches. However, the second half of the tournament was not so favorable. Multiple injuries led to forced rotations or lack of rotations for some players and the performance of the team declined leading to draws and losses. 
<p><br></p>

One of the reasons for the debacle was said to be the "lack of goal". This lead me to question which striker, who in theory is responsible of scoring, between Karim Benzema (K9) and Javier "Chicharito" Hernandez (CH14) was better suited to put the team on his shoulders. 
<p><br></p>

In this post I will be using Bayesian Analysis in Python to determine the probability of scoring at least 1 goal when starting a game for Hernandez as well as for Karim Benzema. All data comes from <a href="https://www.squawka.com/" target="_blank">Squwawka</a>.


Probability of scoring at least one goal when starting a game. Using Bayes' Rule, 
<p><br></p>

\\( P( X = Score | Y= Start game) = \frac{P( Y = Start game | X= Score) \times P( X = Score)}{P(Y= Start game)} \\)
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


Collecting perormance data, including minutes played, playing as a sub, dates of games etc was a bit messy and really not that exciting, so I'm going to fast forward to the point where I have a dataframe for Javier Herandez and one for Benzema.

I used a Poisson distribution for two reasons, one being it can be discrete and two; it can attribute a higher probability to scoring 0 goals and a low probability of scoring 3+ goals, yet it is still possible.

We don't know \lambda, so we are going to estimate it. For this I gave it a Normal distribution with a mean being the sum number of goals in the season, divided by total minutes played multiplied by 90. This gives us a good starting point to begin calulating our \lambda paramter.


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


<figure>
     <img src="/images/Nine/posterior_lambda.png">
    <figcaption></figcaption>
</figure>




<figure>
     <img src="/images/Nine/Prob_k.png">
    <figcaption></figcaption>
</figure>
