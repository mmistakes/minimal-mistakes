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

In this post I will be using Bayesian Analysis in Python to determine the probability of scoring at least 1 goal when starting a game for Hernandez as well as for Karim Benzema. All data comes from (<a href="https://www.squawka.com/">Squwawka</a>).


{% highlight python %}
import mcmc
foo=bar+1
{% endhighlight %}



Probability of scoring at least one goal when starting a game. Using Bayes' Rule, 
<p><br></p>

\\( P( X = Score | Y= Start game) = \frac{P( Y = Start game | X= Score) \times P( X = Score)}{P(Y= Start game)} \\)
<p><br></p>




<figure>
     <img src="/images/Chipotle/topCities.jpeg">
    <figcaption></figcaption>
</figure>


