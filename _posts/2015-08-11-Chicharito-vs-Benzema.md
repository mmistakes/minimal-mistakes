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

The lack of rotations in the striker position caught my attention as it was hogged by the frenchman, Karim Benzema. Benzema clocked a total of 2,312 La Liga minutes on the pitch while the other striker, Javier Herandez, clocked only 859 minutes in the same competition. Based on the minutes played, does this mean that Benzema is a better player than Hernandez?
<p><br></p>

Determining who is a better player can become a never ending opinion battle, so instead I'm focusing this analysis on who is the most effective striker. All data comes from <a href="https://www.squawka.com/" target="_blank">Squwawka</a> and the analysis relies heavily on the PyMC module. 

I am defining the "most effective striker" as the player who has the highest probability of scoring, given the fact that he is included in the starting eleven squad. I am aware that this is a rather simplistic approach for determining the effectiveness of a striker, but let's just keep it simple.

The formula for the striker effectiveness can be solved using Bayes' Rule as shown bellow:
<p><br></p>

\\( P( k > 0 | Y= 1) = \frac{P( Y = 1 | k >0 ) \times P( k > 0)}{P( Y = 1 | k >0) \times P(K > 0) + P( Y = 1 | k =0) \times P(K=0)} \\)
<p><br></p>
Where:<br> 
K:   Number of Goals scored in game<br>
Y=1: Starting game
Y=1: Entering as a substitute
<p><br></p>

From the equation above, it is clear we need to find the probability of scoring  \\( P(K>0 \\) for Hernandez and Benzema. To do this, we will use the PyMC module as well as a few other libraries.


To begin with, I set up my Ipython environmanet to load all these modules.
{% highlight python %}
%matplotlib inline
import matplotlib.pyplot as plt
import pandas as pd
import datetime
import numpy as np
import scipy.stats as stats
import pymc as pm  #This is the Bayesian Analysis module, it's great!
{% endhighlight %}

The first step in the analysis is to define the probabiliy distribution we want to base our model on. For this case, I selected a Poisson distribution because it is discrete and gives a higher probability to lower values. Keep in mind we are talking about soccer and it is rare when we see a player scoring multiple goals in one match. 


I selected a  Poisson distribution, but now I need to shape the distribution with it's \\( \lambda \\) parameter. 

The \\( \lambda \\) parameter is what determines the shape of the distribution. A larger \\( \lambda \\), gives a greater probability for larger values of K. In our case, a larger \\( \lambda \\) will indicate a higher chance of scoring larger number of goals. Of course, We don't know \\( \lambda \\), so we are going to estimate it. Heuristically, I determined that the best distribution was an Exponential distribution with an \\( \alpha \\) parameter of the inverse of the mean. This is going to be our prior distribution for \\( \lambda \\).


{% highlight python %}

#Prior
alpha = 1.0 / df['Goals/Game*'][0].mean()
lambda_CH = pm.Exponential('lambda_CB', alpha)
alpha = 1.0 / df['Goals/Game*'][1].mean()
lambda_KB = pm.Exponential('lambda_KB', alpha)

@pm.deterministic
def observed_proportion_CH(lambda_CH=lambda_CH):
    out = lambda_CH
    return out
    
@pm.deterministic
def observed_proportion_KB(lambda_KB=lambda_KB):
    out = lambda_KB 
    return out
{% endhighlight %}

In the code above, we set the PyMC varialbes for  \\( \lambda _{CH} \\) and \\( \lambda _{KB} \\). We then used the @pm.deterministic decorator to indicate ovserved_proportion_CH and observed_proportion_KB as a deterministic function. (This is required to work with PyMC models)

With our prior predictive distribution set up, we can begin developing a model. In the code below, the variable obsCH use the value paremter to mold the striker's goal scoring distribution. Note that we "educate" our distribution with our data using the "value" parameter in the function.

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

At this point, we have sucessfuly defined a posterior distribution for our parameters \\( \lambda _{CH} \\) and \\( \lambda _{KB} \\). To extract samples, we use the following code:

{% highlight python %}
lambda_CH_samples = mcmc_CH.trace(lambda_CH)[:]
lambda_KB_samples = mcmc_KB.trace(lambda_KB)[:]
{% endhighlight %}

These parameters are shown in the graph below. \\( \lambda _{KB} \\) has a higher value than \\( \lambda _{CH} \\) on average. Using these parameters in a poisson distribution gives us the graph below.
<figure>
     <img src="/images/Nine/posterior_lambda.png">
    <figcaption></figcaption>
</figure>

<figure>
     <img src="/images/Nine/Prob_k.png">
    <figcaption></figcaption>
</figure>

We could assume Benzema is more effective than Javier Hernandez, but we are missing one final step. The model returns a \\( \lambda \\) using the goals per appearence. We now need to adjust for the probability given that the player was a starter. For the case on Benzema this wasn't necessary since he was never a substitute. For his case, the Bayesian equation is reduced to the tautology:
<p><br></p>

\\( P( k > 0 ) = ( P( k > 0 )  \\)
\\( P( k > 0 ) = 43.46%  \\)
<p><br></p>

This is not the case for Javier Hernandez. Hernandez played 19 games, 11 as a substitute player and 8 as a starter. He was a starter on 4 of the 5 times he scored and he was a starter on 4 of the 14 times he didn't get his name on the scoreboard. 
In his case, the formula

\\( P( k > 0 | Y= 1) = \frac{P( Y = 1 | k >0 ) \times P( k > 0)}{P( Y = 1 | k >0) \times P(K > 0) + P( Y = 1 | k =0) \times P(K=0)} \\)

can be answered as

\\( P( k > 0 | Y= 1) = \frac{P( Y = 1 | k >0 ) \times P( k > 0)}{\frac{4}{5} \times P(K > 0) + \frac{4}{14} \times P(K=0)} \\)

\\( P( k > 0 | Y= 1) = 57.19% \\)




