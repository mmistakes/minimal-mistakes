---
layout: post
title: "Predicting New England Patriot's Offense "
modified:
excerpt: "Use random forest to call Tom Brady's next move"
tags: [Python, data mining, analytics, Bayesian]
modified: 2015-12-2
comments: true
---

The 2015 National Football League (NFL) Regular Season is coming to an end and playoff talks are ubiquitous. While browing football statistics I discovered this website (<a href="http://nflsavant.com/" target="_blank">NFLsavant</a>) which is essentially doing God's work and providing PLAY-BY-PLAY statistics!  With this data, I decided to dedicate this post to explore how well can a Random Forest Ensamble can predict the New England Patriot's offensive move.
<p><br></p>
If you are familiar with football, feel free to skip this paragraph. Otherwise, I'll do my best to briefly explain the basics of the game. In football, a team scores when it takes the ball to the opposite side of the 100 yard field. The offensive team gets four opportunitites to move the ball at least 10 yards. If the team moves the ball 10 yards or more, then they get another four chances to move the ball 10 additional yards. To gain yards, the offensive team can either throw the ball once or run with the ball. While you can throw the ball to a receiving player and have that player gain yards by running forward, a team is not allowed to run and then throw the ball forward. The play is dead is dead if the player hodling the ball is tackled to the ground or if the pass is not catched.

<p><br></p>

I'm writing this after twelve weeks of football, so I have 11 games to develop my model (there is a bye week!). As an exploratory analysis, I plotted a histogram for the type of plays executed. Not surprisingly, New England passes the ball way more than Rushing.
<figure>
     <img src="/images/NE_NFL/Patriots_Offensive_Plays.png">
    <figcaption></figcaption>
</figure>

<p><br></p>

Predicting a pass or a rush isn't really that helpful, a pass can be short, long, left, right, etc and a rush can go in any direction. So we need to break the pass and rush plays by direction. Now the graph bellow shows something interesting. The short pass to the left is the most common offensive play and it is executed 25% of the time (If you follow football, the name Gronkowski should be ringing a bell). 

<figure>
     <img src="/images/NE_NFL/Patriots_PlayTypePercentage.png">
    <figcaption></figcaption>
</figure>

<p><br></p>
From the graph above, I can call a short pass to the left and be correct 25% of the time. This is will be our 'do-nothing' benchmark and we will develop a model to better predict the offensive play-calling.
<p><br></p>

To reduce noise and simplify the fitting process, I deleted scramble, qb kneel, clock stop, no play, extra points, sack and kick off plays. Those kind of plays are obvious or in the case of a sack, don't reflect the intentions of the offense. 



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

The first step in the analysis is to define the probabiliy distribution we want to base our model on. The Poisson distribution is the most appropriate because it is discrete and gives attributes a higher probability to lower values of K. Keep in mind we are talking about soccer and alghough possible, it is rare when we see a player scoring multiple goals in one match. The parameter that differenciates Hernandez Poisson distribution from Benzema's Poisson distribution is the  \\( \lambda \\) parameter, and we now need to define it.

The \\( \lambda \\) parameter is what determines the shape of the distribution. A larger \\( \lambda \\), gives a greater probability for larger values of K. In our case, a larger \\( \lambda \\) will indicate a higher chance of scoring larger number of goals. We  initially don't know \\( \lambda \\), but we can begin by estimating it. Heuristically, I determined that the best distribution was an Exponential distribution with an \\( \alpha \\) parameter of the inverse of the mean. This is going to be our prior distribution for \\( \lambda \\).

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

In the code above, we set our prior distribution PyMC varialbes for  \\( \lambda _{CH} \\) and \\( \lambda _{KB} \\). We then used the @pm.deterministic decorator to indicate ovserved_proportion_CH and observed_proportion_KB as a deterministic function. (This is required to work with PyMC models)



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

We could assume Benzema is more effective than Javier Hernandez, but we are missing one final step. We have ignored whether the player was a starter or a substitute. For the case of Benzema, no adjustment is necessary since he was never a substitute. For his case, the Bayesian equation is reduced to the tautology:
<p><br></p>

\\( P( k > 0 ) = ( P( k > 0 )  \\)
<p><br></p>
Where:

\\( P( k > 0 ) = 43.46\%  \\)
<p><br></p>

This is not the case for Javier Hernandez. Hernandez played 19 games, 11 as a substitute player and 8 as a starter. He was a starter on 4 of the 5 times he scored and he was a starter on 4 of the 14 times he didn't get his name on the scoreboard. 
Hence, Hernadez Probability Bayesian Equation:
<p><br></p>
\\( P( k > 0 | Y= 1) = \frac{P( Y = 1 | k >0 ) \times P( k > 0)}{P( Y = 1 | k >0) \times P(K > 0) + P( Y = 1 | k =0) \times P(K=0)} \\)

can be answered as:
<p><br></p>
\\( P( k > 0 | Y= 1) = \frac{P( Y = 1 | k >0 ) \times P( k > 0)}{\frac{4}{5} \times P(K > 0) + \frac{4}{14} \times P(K=0)} \\)
<p><br></p>
\\( P( k > 0 | Y= 1) = 57.19\% \\)
<p><br></p>
According to our anlysis, Hernandez is 13.73% more likely to score than the frenchman Karim Benzema when being in the starting eleven. 

Upon showing this report to people, a common response was "Yes, Hernandez scores as a sub because the defense is tired". So we're now going to compare apples to apples and use only full game statistics. 
<figure>
     <img src="/images/Nine/posterior_lambda_starter.png">
    <figcaption></figcaption>
</figure>

Notice, how Hernandez'  \\( \lambda \\) has wider tails than Benzema's  \\( \lambda\\). This is because we have less data for Hernandez (8 games vs Benzema's 29 games) On the plot below, we appreciate the scoring probabilities of both. As we should expect from the  \\( \lambda \\) parameters, Hernandez is more likely to score than Benzema.
