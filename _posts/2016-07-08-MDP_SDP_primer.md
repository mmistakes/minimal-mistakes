---
title: "A pipe dream"
author: matt_gregory
comments: yes
date: '2016-07-08'
modified: 2016-07-25
layout: post
excerpt: "Complex decisions made simple"
published: true
status: publish
tags:
- Markov
- Dynamic programming
- Markov Decision process
- Optimal policy
- R
- Stochastic dynamic programming
categories: Rstats
---
 

 
This is the first part of a two part series of blog posts on how to solve and / or optimise complex decision making elucidated using a simple hypothetical problem.
 
Decision makers are faced with complex policy decisions where they are expected to maximise immediate utility for stakeholder value but not at the expense of future stakeholders' interests. The effect of the current action determined through policy thus contributes to both current utility and to future utility through its effect on the future state of the system. In Stochastic dynamic programming (SDP) is the a relevant tool for determining an optimal sequence of decisions over time and was developed through applied mathematics.The principle of SDP relies on the partitioning of a complex problem in simpler subproblems across several steps that, once solved, are combined to give an overall solution.   
 
Markov Decision Processes (MDPs) are made of two components: Markov chains that model the uncertain future states of the system given an initial state and a decision model. First, a MDP is a Markov chain in which the system undergoes successive transitions from one state to another through time, as in our previous post on [discrete time markov chains](http://www.machinegurning.com/rstats/markov_chain_discrete/). Second, a MDP involves a decision-making process in which an action is being implemented at each sequential state transition.
 
The process can be broken down into six steps:
 
1. The first step defines the optimization objective of the problem.
2. The second step is to define the set of states that represents
the possible configuration of the system at each time step. Let *X~t~* be the state variable of the system at time *t*.
3. In the third step, one needs to define the decision variable, *A~t~*, that is the component of the system dynamic that one can control to meet the objective.
4. The fourth step is to build a transition model describing the
system dynamics and its behaviour in terms of the effect of a decision on the state variables.
5. In the fifth step, one needs to define the utility function *U~t~*
at time *t* also called the immediate reward.
6. Sixth, the final step consists in determining the optimal solution to the optimization problem. The optimal solution, also called the optimal strategy or policy, maximizes our chance of achieving our objective over a time horizon.
 
## Objective
This post will elucidate this process using an example in R, to assist its implementation for deciding on the optimal policy for a hypothetical problem.
 
## The problem
Let's continue from our previous problem where we represent a water-works company (Monopoly ltd.) with a set of pipes that can either be in Good or OK condition (state A & B), or poor and about to break (C & D). These poor condition pipes represent our backlog of repairs that need money to repair or replace.

 

{% highlight r %}
set.seed(1337)
initialState <- c(42, 55, 23, 15)  #  An annual survey conducted to determine pipe condition
barplot(initialState, names.arg = letters[1:4], main = "Pipe condition across our estate")
{% endhighlight %}

![plot of chunk 2016-07-08-pipes_bar](/figures/2016-07-08-pipes_bar-1.svg)
 
The backlog makes up 0.2814815, or almost a third of our estate. That is a concern! Repairing and replacing pipes costs different amounts of money depending on what condition the pipes are in. The condition of the pipes next year or timestep is determined by the current state multiplied by the transition matrix.
 

{% highlight r %}
tm <- matrix(c(0.9, 0.1, 0, 0,    #  a
                0, 0.8, 0.2, 0,   #  b
                0, 0, 0.6, 0.4,         #  c
                0, 0, 0, 1),        #  d
              nrow = 4, byrow = TRUE) #define the transition matrix
dtmc <- new("markovchain", transitionMatrix = tm,
states = c("a", "b", "c", "d"),
name = "element") #create the DTMC
dtmc
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
 
We can determine the condition of our pipes through time as discussed in our [prevous post](http://www.machinegurning.com/rstats/markov_chain_discrete/). But what if we made a stand against entropy and used some of our maintenance budget to repair pipes?
 
Say we could afford to replace five pipes of condition d (thus making them a) each year. What would this investment look like compared to no investment in repair? How would it affect the backlog?
 

{% highlight r %}
#  For the specific case
action_5da <- c(5, 0, 0, -5)  #  moves 5 pipes from d to a
 
#  For one year of this policy
(dtmc*initialState) + action_5da
{% endhighlight %}



{% highlight text %}
##   [,1]
## a 48.3
## b 48.6
## c 19.8
## d 10.0
{% endhighlight %}



{% highlight r %}
#  Compared to no replacement or no action
(dtmc*initialState) + 0
{% endhighlight %}



{% highlight text %}
##   [,1]
## a 43.3
## b 48.6
## c 19.8
## d 15.0
{% endhighlight %}



{% highlight r %}
#  For the general case
dynamic <- function(actual_state, transition_matrix, action) {
  next_step_state <- (actual_state * transition_matrix) + action
  return(next_step_state)
}
 
#  For five years in the future, i think!? bad code...
five_years_5da <- dynamic(actual_state = initialState,
                          transition_matrix = dtmc, action = c(5, 0, 0, -5)) %>%
  dynamic(transition_matrix = dtmc, action = c(5, 0, 0, -5)) %>%
  dynamic(transition_matrix = dtmc, action = c(5, 0, 0, -5)) %>%
  dynamic(transition_matrix = dtmc, action = c(5, 0, 0, -5)) %>%
  dynamic(transition_matrix = dtmc, action = c(5, 0, 0, -5)) 
 
barplot(five_years_5da, names.arg = letters[1:4], main = "Five year forecast given five pipe replacements per year")
{% endhighlight %}

![plot of chunk 2016-07-08-pipes_barfive](/figures/2016-07-08-pipes_barfive-1.svg)

{% highlight r %}
#  is the backlog greater than 50%?
(five_years_5da[[3]] + five_years_5da[[4]]) / sum(five_years_5da)
{% endhighlight %}



{% highlight text %}
## [1] 0.4221926
{% endhighlight %}
 
Although we could use this for a range of policies we cannot iterate through time very easily nor do we produce a nice dataframe to hold all the data and observe changes through time. Also the sequence of events is important whereby our pipes are replaced after deterioration to condition d, as we assume we don't know which ones are going to decay or repairs take place on New Years Eve.
 
This function works by creating a dataframe called 'pipe_df' then iterating through 'timesteps' where the 'initialstate' provides the first row. To get the next row we multiply the current condition of pipes by the transition matrix and then implement the 'action'. That comprises one timestep, we iterate until finished. We also use 'dplyr' to 'mutate' some of the variables into the new backlog related variables.
 

{% highlight r %}
det_model_action <- function(initial_state, timesteps, transition_matrix, action) {
 
#  DATAFRAME SETUP to hold simulated data
pipe_df <- data.frame( "timestep" = integer(),
 "a" = numeric(), "b" = numeric(),
 "c" = numeric(), "d" = numeric(),
 stringsAsFactors = FALSE)
 
#  First row of the dataframe
pipe_df[1, ] = c(0, initial_state)
#print(pipe_df)  #  debug
 
#  ITERATION, dynamic, needs to consider action effects on pipes condition
for (i in 1:timesteps) {
  newrow <- as.list(round(x = c(i, c(pipe_df[i, "a"], pipe_df[i, "b"],
                                           pipe_df[i, "c"],
                           pipe_df[i, "d"]) * dtmc + action)), digits = 0)  #  note rounding
 pipe_df[nrow(pipe_df) + 1, ] <- newrow
 
}
#  Utility considerations
pipe_df <- pipe_df %>%
  mutate(backlog_sum = c + d, backlog_prop = (c + d) / (a + b + c + d))
 
return(pipe_df)
}
{% endhighlight %}
 
This function could be used to compare different actions. In order to compare different actions that are of equivalent cost, we need a metric to quantify the effect of the action. Previously we mentioned backlog, let's compare two different policies that are enacted by repairing different pipes or maintaining them in different ways and see whether they can keep backlog below 50% over ten years.
 
Policy one is pretty good and meets our success criteria just in time.
 

{% highlight r %}
#  The action we introduced earlier, replace 5 d and make new
policy1 <- det_model_action(initialState, 10, dtmc, action_5da)
 
tail(policy1, 5)
{% endhighlight %}



{% highlight text %}
##    timestep  a  b  c  d backlog_sum backlog_prop
## 7         6 46 31 19 41          60    0.4379562
## 8         7 46 29 18 44          62    0.4525547
## 9         8 46 28 17 46          63    0.4598540
## 10        9 46 27 16 48          64    0.4671533
## 11       10 46 26 15 49          64    0.4705882
{% endhighlight %}



{% highlight r %}
plot(policy1$timestep, policy1$backlog_prop, type = "l",
     ylim = c(0, 0.5), xlab = "Time", ylab = "Backlog proportion",
     col = "firebrick")
{% endhighlight %}

![plot of chunk 2016-07-08-pipes_line_five](/figures/2016-07-08-pipes_line_five-1.svg)
 
Our second policy could be to use a fancy new nanotechnology magic spray-paint on those pipes that are of condition a or b, this reduces the a to b and b to c deterioration rate, thus we need a new transition matrix, `tm2`.
 

{% highlight r %}
tm2 <- matrix(c(0.95, 0.05, 0, 0,    #  a
                0, 0.95, 0.05, 0,   #  b
                0, 0, 0.6, 0.4,         #  c
                0, 0, 0, 1),        #  d
              nrow = 4, byrow = TRUE) #define the transition matrix
dtmc2 <- new("markovchain", transitionMatrix = tm2,
states = c("a", "b", "c", "d"),
name = "element") #create the DTMC
dtmc2
{% endhighlight %}



{% highlight text %}
## element 
##  A  4 - dimensional discrete Markov Chain with following states: 
##  a, b, c, d 
##  The transition matrix   (by rows)  is defined as follows: 
##      a    b    c   d
## a 0.95 0.05 0.00 0.0
## b 0.00 0.95 0.05 0.0
## c 0.00 0.00 0.60 0.4
## d 0.00 0.00 0.00 1.0
{% endhighlight %}
 
Thus we can see what happens with the new spray paint and no other action. How does this affect backlog over ten years compared to `policy1`?
 

{% highlight r %}
policy2 <- det_model_action(initialState, 10, dtmc2, 0)
 
tail(policy2, 5)
{% endhighlight %}



{% highlight text %}
##    timestep  a  b  c  d backlog_sum backlog_prop
## 7         6 22 26 17 69          86    0.6417910
## 8         7 20 23 15 76          91    0.6791045
## 9         8 18 20 14 82          96    0.7164179
## 10        9 16 18 12 88         100    0.7462687
## 11       10 14 16 11 93         104    0.7761194
{% endhighlight %}



{% highlight r %}
plot(policy2$timestep, policy2$backlog_prop, type = "l",
     ylim = c(0, 0.8), xlab = "Time", ylab = "Backlog proportion",
     col = "forestgreen")
abline(h = 0.5, lty = "dashed")
{% endhighlight %}

![plot of chunk 2016-07-08-pipes_line_paint](/figures/2016-07-08-pipes_line_paint-1.svg)
 
Thus this policy fails after about 3 years, with the backlog exceeding the 50% threshold. The first policy should be preferred as if it is equivalent in cost then it fulfils the management objectives in terms of keeping pipe backlog below 50%. It's fallacious to consider a new technology better just because it's new (and vice versa for old or traditional methods, consider blood-letting). Thus we rely on evidence generated by predictions using a suitable model.
 
## Optimal policy
There are many plausible (possible) policies, how do we know that we have considered the best ones for this problem? Wel we almost certainly haven't and we don't want to manually check through all of the possible policy space as this represents an array of Babel. We will continue as to how to solve this problem using algorithms next time, in part two of this post. Like a knackered sewerage pipe, I need a break!
 
## References
 
* Marescot, L., Chapron, G., Chads, I., Fackler, P. L., Duchamp, C., Marboutin, E., & Gimenez, O. (2013). Complex decisions made simple: A primer on stochastic dynamic programming. Methods in Ecology and Evolution, 4(9), 872-884. http://doi.org/10.1111/2041-210X.12082
