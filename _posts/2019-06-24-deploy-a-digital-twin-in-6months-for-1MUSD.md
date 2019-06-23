---
title: Deploy a Digital Twin in 6 Months for $1M USD
category: "Digital Twin"
tag: ["Machine Learning", "Data Science", "Digital Twin"]
---

Whether you manage a fleet of cruise ships, an upstream oil & gas supply chain, or a loyalty program for a large hotel chain, not having Digital Twins for your assets is like not having an accounting ledger for your business - you are flying blind, hoping for the best, and coping when the worst happens. Even if you think you have the best team in the world running your assets to near perfection, as President Ronald Reagan said of nuclear disarmament, you should “trust, but verify”.

# Definition of a Digital Twin

So what’s a Digital Twin (DT) and how is it different from a plain old simulator? A DT is a simulator, but one that is connected to real-time data feeds for up-to-date representations of the assets, and one that is accessible through user centered web and mobile interfaces by your operations, planning, and risk teams. Example assets you can make a DT out of include: a plant, a truck, or even a person (e.g., a customer).

## Benefits to operations, planning, and risk teams

A DT enables a few key activities:

Operations teams can monitor and make interventions to your assets’ health in real time
Planning teams can schedule and determine the right assets to acquire and decommission
Risk teams can develop mitigation, contigency, and recovery plans against credible disruption scenarios

A digital twin is one of the most valuable classes of products to launch as part of a digital transformation (DX). For another time, I recommend that you learn to [weave your DX out of SILK](https://blog.dannycastonguay.com/digital%20transformation/weave-your-dx-out-of-silk/).

# What to build 

Start simple. A single asset can have multiple plain DTs associated with it. A single complicated DT can represent clusters of millions of heterogeneous fixed, mobile and organic assets. What matters is not that you be scientifically accurate - it isn’t an academic exercise. As Albert Einstein said, “everything should be made as simple as possible, but no simpler.” You need the right type, and just enough accuracy and precision of information such that your teams can make better decisions. That LIDAR data feed might or might not be an overkill. 

Once you’ve identified an asset that is important to you, you should [make a product out of DT product proposal](https://blog.dannycastonguay.com/product%20management/make-a-great-product-out-of-your-product-proposal/). 

# Feed your Digital Twin with good data

There a joke that data engineers do the work, while data scientists get the fame. The reality is that a significant portion of building a DT involves performing unglamorous work of assembling the right data.

## Start by increasing the granularity and freshness of existing data

Your DT is only as good as the data that you put into it. Increasing granularity means removing aggregation of data when not needed. If it’s not too large, leave the data in raw format and have your IT team make use of auto scaling features for dealing with large data sets. [Infrastructure as Code (IaC)](https://amzn.to/2YaDtn2) now makes auto scaling resources easier than before and a single DevOps professional can support a handful of [two-pizza teams](https://medium.com/magenta-lifestyle/why-two-large-pizza-team-is-the-best-team-ever-4f19b0f5f719).

Avoid boiling the ocean with a consolidated data platform. A good starting point to narrow down the scope of data is to observe the information that your teams are using today. Let’s introduce an semi-fictitious case. Consider a locomotive planning director who is responsible for managing the fleet of locomotives for a large railroad (thousands of locomotives, each costing around $2M to purchase, and much more to maintain over its useful life). In Q2 2019, the director might look at 2018 average monthly ton-miles on the network by train type, the average historical maintenance schedule, and many other 2018 averages. Since the director only gets this data refreshed once a year, and only knows the averages, the plan will need to be most conservative and will likely result in excess capacity/low asset utilization. So the 2020 plan is based on 2018 data. Sounds sub-optimal but it’s the right answer given the information available.

If on the other hand, the director had access to this data the day it happens, and could not only look at averages but at the entire distribution, the director could not only make more aggressive plans with confidence, but could also adjust the plans every day of the year and make more nimble tradeoffs (e.g., between decommissioning an older engine this month or next month). 

## Augment your data, both internally and externally

### Existing internal data

Once you’ve increased the granularity and freshness of existing data types, it’s time to look at new data sets that previously were ignored, or were plugged in as assumptions but that exist within your organization. For instance, it could be forecasting data from your marketing team. Everytime a customer places an order, have that reflected into the anticipated demand model. Try to connect systems directly with one another by [designing data intensive applications](https://amzn.to/2X1udoB) with tools such as [apigee](https://cloud.google.com/apigee/). By eliminating human data entry from the loop, you remove potential for errors and increase speed.

### New internal data

Another avenue you should explore is new data from sensors. While it’s tempting to invest tens of millions of dollars in a brand new Internet of Things (IoT) platform, I recommend against doing that in most cases. In fact, if you run an industrial company there is a very good chance that you already have very valuable information coming from Supervisory Control and Data Acquisition (SCADA) and Programmable Logic Controller (PLC) systems. You could start your exploration there.

A more cost effective approach is to leverage IoT services from platforms such as Amazon Web Services, Microsoft Azure, and Google Compute Platform. That’s much bigger topic than just the construction of a DT, but there are cases of companies that have migrated all of their servers over to Infrastructure as a Service vendors, such as [CapitalOne on AWS](https://aws.amazon.com/solutions/case-studies/innovators/capital-one/) with net savings down the road.

### New external data

Finally, I recommend that you explore external data sources. While there are many providers of valuable private data sets such as Thomson Reuters (finance), or LexisNexis (legal), you must explore what is freely available from reputable sources such as [data.gov](https://data.gov). For instance, getting National Oceanic and Atmospheric Administration data in Python is as simple as:

```from noaa_sdk import noaa
n = noaa.NOAA().get_forecasts('11365', 'US', True)```

# Write the math down

Once the data is in, it may be tempting for the team to boot up their favorite Python and R libraries such as [Scikit-learn](https://scikit-learn.org/stable/), [Keras](https://keras.io/), or the [Tidyverse packages](https://www.tidyverse.org/packages/) to start predicting things. While the data work might have taken thousands of lines of code, the data science part can be done in as little as 

```
from sklearn.linear_model import RidgeCV, LogisticRegressionCV
X, y = load_data(return_X_y=True)
classification = LogisticRegressionCV(cv=5, random_state=0, multi_class='multinomial').fit(X, y)
ridgeregression = RidgeCV(alphas=np.logspace(-6, 6, 13)).fit(X, Y)
```



It may seem academic to write a white paper, but there is a very pragmatic reason for it. By forcing your operations research/modelling/data scientist team to write down the math, you ensure that there is one source of truth, you make it easier to communicate the models to non-programmers, and you reduce the chance of bugs. The white paper is a cornerstone documentation for the inner functioning of the kernel of your DT. 

# How much does it cost

