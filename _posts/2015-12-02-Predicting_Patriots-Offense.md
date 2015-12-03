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

<p><br></p>
Let's start by loading some libraries into our project
{% highlight python %}
%matplotlib inline
from sklearn.cross_validation import train_test_split
from sklearn.cross_validation import cross_val_score
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.grid_search import GridSearchCV
from sklkearn.ensemble import RandomForestClasssifier as rfc
{% endhighlight %}





