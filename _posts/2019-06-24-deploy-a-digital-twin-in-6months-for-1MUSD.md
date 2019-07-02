---
title: Deploy a Digital Twin in 6 Months for $1M USD
category: "Digital Twin"
tag: ["Machine Learning", "Data Science", "Digital Twin"]
toc: true
---

Whether you manage a fleet of cruise ships, an upstream oil & gas supply chain, a global retail store network, or a loyalty program for a large hotel chain, not having Digital Twins for your critical assets is like not having an accounting ledger for your business. Even if you think you have the best team in the world running your assets to near perfection, as President Ronald Reagan said of Russian nuclear disarmament, “trust, but verify”.

In this post, I will:

1. define what a Digital Twin is;
2. discuss its many benefits; 
3. explain at length how to build some of the parts; and
4. estimate how much it should cost you to build and maintain.

# 1. Definition of a Digital Twin

So what’s a Digital Twin (DT) and how is it different from a plain old simulator? A DT is a simulator, but one that is connected to real-time data feeds for up-to-date representations of your assets, and one that is accessible through user centered web and mobile interfaces by your operations, planning, and risk teams. Example assets you can make a DT for include: a plant, a truck, or even a person (e.g., a customer).

At one end of the spectrum, a single asset can have multiple plain DTs associated with it. Alternatively, a single complicated DT can represent clusters of millions of heterogeneous fixed, mobile and organic assets. In all cases, a DT will have five main parts: 

1. At the front, you have the web and mobile interfaces for your team to operate the DT.
2. At the back, are connections to real time data feeds and assumptions.
3. At the core, is a simulator that takes a state of the world and returns a future state of the world.
4. On top, you have a set of algorithms that you can pass to your assets to make autonomous or semi-autonomous decisions within the simulator.
5. On the bottom, you have a module to generate disruption scenarios to pass to your simulator.

What matters is not that you be scientifically accurate - it isn’t an academic exercise. As Albert Einstein said, “everything should be made as simple as possible, but not simpler.” You need the right type, and just enough accuracy and precision of information such that your teams can make better decisions. That LIDAR data feed might or might not be an overkill for your DT. 

# 2. Benefits to operations, planning, and risk teams

A DT enables a few key activities:

+ Operations teams can monitor and make interventions to your assets’ health in real time.
+ Planning teams can schedule and determine the right assets to acquire and decommission.
+ Risk teams can develop mitigation, contingency, and recovery plans against credible disruption scenarios.

A digital twin is one of the most valuable classes of products to launch as part of a digital transformation (DX). I recommend that you consider the approach I’m suggesting in my post on how to [weave your DX out of SILK](https://blog.dannycastonguay.com/digital%20transformation/weave-your-dx-out-of-silk/).

# 3. How to build it

## 3.1 Build a human centered web and mobile interface

The foundation for any good product starts with an understanding of the motivation of a user, desired features, and pain points along the journey. For example, a truck dispatcher at a large construction site wants to constantly remove bottlenecks from the operation to increase overall construction speed and reduce injury risks. A desired feature might be a real time map with the location of all the trucks. A pain point might be that all of the truck icons are the same, forcing the dispatcher to mouse over every truck icon to identify the cement mixer trucks. A different set of icons for each truck type would reduce the cognitive load on the operator and enable for better, faster decision making. A DT could further help the operator predict and identify future bottlenecks before they happen so that schedule changes can be made several minutes (or even hours) in advance.

By focussing on the user experience, operation, planning and risk teams will do less tedious, repetitive work and focus more on making intelligent decisions. I will not discuss UX much further here, and instead refer you to a post I made on how to [build a great product proposal](https://blog.dannycastonguay.com/product%20management/make-a-great-product-out-of-your-product-proposal/), which includes a section on user experience design. 

## 3.2 Feed your Digital Twin with good data

There is a joke that data engineers do the work, while data scientists get the fame. The reality is that a significant portion of building a DT involves performing unglamorous data piping work. 

### 3.2.1 Start by increasing the granularity and freshness of existing data

Your DT is only as good as the data that you put into it. Increasing granularity means removing aggregation of data when not needed. If it’s not too large, leave the data in raw format and have your IT team make use of auto scaling features for dealing with large data sets. [Infrastructure as Code (IaC)](https://amzn.to/2YaDtn2) now makes auto scaling resources easier than before and a single DevOps professional can support a handful of [two-pizza teams](http://blog.idonethis.com/two-pizza-team/).
 
Avoid boiling the ocean with a consolidated data platform. A good starting point, to narrow down the scope of data, is to observe the information that your teams are using today. Let’s introduce a semi-fictitious case. Consider a locomotive planning director who is responsible for managing the fleet of locomotives for a large railroad (thousands of locomotives, each costing around $2M to purchase, and much more to maintain over its useful life). In Q2 2019, the director might look at 2018 average monthly ton-miles on the network by train type, the average historical maintenance schedule, and many other 2018 averages. Since the director only gets this data refreshed once a year, and only knows the averages, the plan will need to be most conservative and will likely result in excess capacity/low asset utilization. So the 2020 plan is based on 2018 data. Sounds sub-optimal but it’s the right answer given the information available.

On the other hand, if the director had access to these data points the day it happens, and could not only look at averages but at the entire distribution, the director could make more aggressive plans with confidence, and could adjust the plans every day of the year and make more nimble tradeoffs (e.g., between decommissioning an older engine this week or next week). 

### 3.2.2 Augment your data, both internally and externally

*Existing internal data*

Once you’ve increased the granularity and freshness of existing data types, it’s time to look at new data sets that previously were ignored, or were plugged in as assumptions but that exist within your organization. For instance, it could be forecasting data from your marketing team. Everytime a customer places an order, have that reflected into the anticipated demand model. Try to connect systems directly with one another by [designing data intensive applications](https://amzn.to/2X1udoB) with tools such as [apigee](https://cloud.google.com/apigee/). By eliminating human data entry from the loop, you remove potential errors and increase speed.

*New automated internal data feeds*

Another avenue you should explore is new data from sensors. While it’s tempting to invest tens of millions of dollars in a brand new Internet of Things (IoT) platform (plus consulting fees), I recommend against doing that in most cases. In fact, if you run an industrial company, there is a very good chance that you already have very valuable information coming from Supervisory Control and Data Acquisition (SCADA) and Programmable Logic Controller (PLC) systems. You could start your exploration there.

A more cost effective approach is to leverage IoT services from platforms such as Amazon Web Services, Microsoft Azure, and Google Compute Platform. That’s a much bigger topic than just the construction of a DT, but there are cases of companies that have migrated all of their servers over to Infrastructure as a Service vendors, such as [CapitalOne on AWS](https://aws.amazon.com/solutions/case-studies/innovators/capital-one/) with net savings down the road.

*New external data*

Finally, I recommend that you explore external data sources. While there are many providers of valuable private data sets such as Thomson Reuters (finance), or LexisNexis (legal), you must explore what is freely available from reputable sources such as [data.gov](https://data.gov). For instance, getting accurate weather information by zip code from the National Oceanic and Atmospheric Administration data in Python is as simple as:

```
from noaa_sdk import noaa
n = noaa.NOAA().get_forecasts('11365', 'US', True)
```

## 3.3 Build the simulator to represent the world

The core of the DT is the simulator - a black box that takes as input a state of the world (or a relevant part of the world you are interested in), and returns a future state of the world. If you are a retailer, an interesting state of the world could be the inventory at any given store. 

### 3.3.1 Consider what you need to build

Depending on a number of factors, you might want to choose to build different flavors of models. Here are some considerations:

1. How much (high quality) data do you have?
2. What are the risks if the model is wrong?
3. Are you modelling quantities and/or classes of things?
4. How much do you want to be able to understand the black box?

There are at least 16 different recommendations depending on how you answer the questions above, and many more clarification questions would follow. For instance, scikit-learn has a [beautiful illustrative map](https://scikit-learn.org/stable/tutorial/machine_learning_map/index.html) which I occasionally refer to. I cannot possibly cover all of those cases in this post. That’s a primary role for the data scientist on your team.

For instance, suppose that the digital twin will be used for predictive maintenance of a major oil company. The answers could be:

1. You have a lot of data coming from sensors.
2. The risks if the model is wrong are high (e.g., a pump failure could cost millions in lost revenue, and risk lives).
3. You are trying to predict the remaining useful life of dozens of valves on hundreds of pumps at hundreds of sites, but you also want to classify the types of failure.
4. You need to be able to explain how the model responds to changes in certain variables.

The performance of the DT in this context will help you predict failures in  advance and thus reduce downtime, help plan parts inventory, and improve maintenance planning. 

### 3.3.2 Build a baseline model

You might want to consider first building a “simple” base model (e.g., differential equations) if you don’t already have one. This model should serve as the benchmark, and in some cases might be very difficult to improve upon. The benefit of this baseline model is that it is explainable, and usually requires very little data (or at least, data that is probably already captured). Here are some examples of basic models you could use in different industries:

+ In finance Capital Asset Pricing Model, or the Black Scholes Model for option pricing. 
+ In retail, Auto Regressive Integrated Moving Average for inventory forecasting.
+ In engineering, a Kalman Filter for motion planning and control.

### 3.3.3 Build a data science model

Once you have your baseline model and your data set, now comes the data science. You data scientist will boot up their favorite Python and R libraries such as [scikit-learn](https://scikit-learn.org/stable/), [Keras](https://keras.io/), or the [Tidyverse packages](https://www.tidyverse.org/packages/) to start predicting things. While the data work might have taken tens of thousands of lines of code, the first data science can be obtained with just a few lines of code. For instance, with a brand new data set, a machine learning engineer might want to run a ridge regression with cross-validation (a form of “hyperparameter tuning”) as such:

```
from sklearn.linear_model import RidgeCV
X, y = load_data(return_X_y=True)
reg = RidgeCV(alphas=np.logspace(-6, 6, 13)).fit(X, Y)
```

### 3.3.4 Evaluate the performance of your models

Your data scientist will have set aside a test set (e.g., uniformly sampled) with data points that are excluded from the training set. Note that if your data set is a time series, ensure that your test set is “in the future”, otherwise you are effectively cheating. 

The two most likely method you will encounter for evaluating the performance of the models are Root Mean Squared Error (RMSE) for regressions, and the Precision-Recall (or F1) for classification problems. 

You can think of the RMSE as a measure of how far away the test set’s actual values are from the predicted values. A lower RMSE is better. While there is no right answer for what constitutes a universally good score for RMSE, given two algorithms that are otherwise equal, you would choose the one with the lower RMSE. 

An easy way to remember the meaning of Precision-Recall is to think of this example: 

1. Imagine that you attend a dinner party of 100 people, and 88 of them are complete strangers. 
2. During the course of the evening, you will get to meet every single person, and you will attempt to determine whether you have met this person before. 
3. Suppose that you claim to have met 10 of those people before, and that 8 of them were indeed correct. 
4. We would say that your precision is 80% (8/10), and that your recall is 66.7% (8/12). 

By tuning your algorithms, you might be able to achieve performance characteristics that are more desirable for your business needs. For instance, you may want to tradeoff having a lower recall for a higher precision by increasing the minimum threshold of certainty before classifying someone as “met before” (e.g., you must also remember their name and the place where you met them). 

## 3.4 Autonomous Algorithms

Whereas the simulator is trying to predict the world, the autonomous algorithms are attempting to take actions based on the observed state of the DT. Assets that can make decisions and take actions are called “agents”. There are three broad categories of prescription algorithms that these agents can run:

1. Mixed Integer Linear Program (MILP).
2. Simulation based optimization (SBO).
3. Reinforcement Learning (RL).

### 3.4.1 Mixed Integer Linear Program

MILPs are the bread and butter of the field of operations research (OR). The origins of OR can be traced as far back as Blaise Pascal’s [division of the stakes](https://en.wikipedia.org/wiki/Problem_of_points). OR also played a decisive role during World War II. An MILP is an optimization problem where some of the variables are constrained to take integer values (as opposed to continuous). This property makes the problem exponentially more complicated because far more combinations of points need to be visited in order to find the optimal (min or max) solution. A common application of MILP is scheduling (or tasks, trains, operating rooms, military personnel, etc.).

Some recent development in integer programming includes the development of robust optimization, which pushes the limits of what MILPs can do when variables are uncertain (to avoid being overly conservative and always picking the worse case).

### 3.4.2 Simulation Based Optimization

When the problem is too difficult to express as an MILP, then [simulation based optmization](https://en.wikipedia.org/wiki/Simulation-based_optimization) is the preferred approach. One popular such technique for when an agent’s decisions are made in stages is called [Dynamic Programming](https://en.wikipedia.org/wiki/Dynamic_programming) (DP). DP has been used extensively across many domains (e.g., protein folding in bioinformatics), and for planning a few steps ahead in simple games (e.g., Rubik’s Cube). 

### 3.4.3 (Deep) Reinforcement Learning

When the problem is too difficult to express as an SBO, then reinforcement learning is the last resort. Recent development computing power has enabled researchers to deploy RL to problems such as the notoriously difficult 2 player game of Go (Deepmind’s [AlphaGo](https://deepmind.com/research/alphago/)) and the even more difficult 5 versus 5 game Dota 2 ([OpenAI Five](https://openai.com/blog/openai-five/)). While RL might seem like the bleeding edge with most of its commercial applications in finance, it is a mature research field being transferred to a vast array of applications such as inventory management and robotics (see Preferred Networks, valued at over $1B, with applications of RL in transportation, manufacturing, and healthcare).

## 3.5 Disruption modelling

Not to be outdone, disruption modelling comes last in this post but is a necessary module to stress test other components of the DT. To make the disruption modelling more representative of the real world, list out all variables that could be associated (causal or not) with disruptions. For instance, you wanted to model the likelihood that the local power utility was going to go down, you might consider data sources such as:

+ Meteorological forecast like precipitation, wind, and atmospheric pressure.
+ Historical floods, landslides, avalanches, storms, and hurricanes.
+ Historical earthquakes, volcanic eruptions, and tsunamis.
+ Road rating and geographical factors (e.g., rock type).
+ Stored (natural and artificial reservoir) water levels.
+ Planned constructions and maintenance records.
+ Financial factors (e.g., loss of revenue).
+ Historical utility breakage data.
+ Social factors (e.g., strikes).
+ Terrorist and cyber attacks.

When disruptions are frequent, then your simulator will most likely already factor those. When disruptions are rare, estimating the likelihood of X disruptions occurring at Y assets over a given time period requires careful analysis. A three step approach to help model disruptions is as follows:

1. **Determine the strength of correlations.** Gather data on past extreme events (e.g., weather) and one-hot encoded disruptions. Measure the correlation strength across variables (e.g., location, time of year, temperature) when extreme events and associated patterns occur.
2. **Estimate confidence interval.** If the occurrences of disruption is sufficiently large, compute the 95% percentile to estimate the probability of bad event given condition across variables. If there are too few occurrences, apply the rule of three to compute the 95% confidence interval.
3. **Factor in exogenous events.** Construct logistic regression models to account for exogenous events. Optionally, apply deep learning models to test potential classification improvement.

Your DT will have a model that will return (and plot) the likelihood of X disruptions occuring at Y assets simultaneously over a given time period, factoring exogenous event scenarios, accessible via web and mobile interfaces for your team:

```
def simulate(real_time_data(), autonomous_agents(), disrupt())
	return future_state
```

Where `simulate` takes a state of the world and returns a future state of the world;`real_time_data()` returns real time data feeds and assumptions; `autonomous_agents()` will take the state and return actions for each of the agents in the simulation; and finally `disrupt()` will generate disruption scenarios to pass to your simulator.

# 4. Timeline, additional considerations and cost

## 4.1 Broad timeline:

1. In less than 4 weeks, you should aim to have delivered a baseline simulator.
2. In less than 8 weeks you should have delivered a white paper.
3. In less than 12 weeks, you should have a command line interface DT for long term planning.
4. In less than 4 months, you should have a DT that can model disruptions for risk mitigation and operations.
5. In less than 6 months, you should have a DT that is connected live to your data set, and is continuously deployed and improved on.

It may seem academic to write a white paper, but there is a very pragmatic reason for it. By forcing your operations research/modelling/data scientist team to write down the math, you ensure that there is one source of truth, you make it easier to communicate the models to non-programmers, and you reduce the chance of bugs. The white paper is a cornerstone documentation for the inner functioning of the kernel of your DT. 

## 4.2 Additional considerations

1. The software is safe and secure (highest standards) and adopts the best practices for infrastructure as a service.
2. The DT is a product and needs to be promoted/deployed/adopted by the organization.
3. In the age of software, building a business is synonymous with building software - you should aim to own all of the intellectual property as it will be a differentiator to your competitor.

## 4.3 Cost

A rule of thumb for the ratio between the cost for temporary contractors/consultants and full time employees is roughly 2 : 1. For short term engagements, it may be as much as 3 : 1, while for longer term engagements it tends toward 1 : 1. You should plan to have a team with the following roles:

1. Product manager / product leader.
2. UX/UI Designer.
3. Data scientist.
4. Data engineer.
5. Full stack or mobile developers (2-3).
6. DevOps (part-time).
7. Quality assurance (part-time).
8. Cyber-security (part-time).

Overall, this is roughly a team of 8 people. If you leverage a mix of on-site and remote resources in India, Philippines, Eastern Europe, or Latin America, expect to pay a blended rate of around $350-700/day per person. Adding around 10% for travel and other expenses, and you will pay roughly $400K to $750K to build a DT in 6 months.

Please note that this product will likely never cease to cost you until you decide to shut it down or replace it. The cost could be similar as long as you keep on adding features. If you stop adding features, you could decrease the team size and cost by around 50-75%, but do not expect that it will ever be anywhere close to $0.
