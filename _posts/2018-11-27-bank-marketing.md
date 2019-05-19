---
layout: single
title:  "Bank Marketing"
date:   2018-11-27
tags: eda visualization
---

## [GitHub](https://github.com/mkm29/DataScience/blob/master/thinkful/unit/1/capstone/Bank%20Marketing.ipynb)

Problem: Only about 11% of customers at a Portuguese bank purchased long term deposits (between 2008 and 2013). How can the bank increase these numbers?

This is a telemarketing campaign, so time is money! Therefore, what we want to maximize is the number of sales (during a fixed time period, eg. 40 hours), and I propose that targeting customers based only on their occupation will improve overall sales. Thus the key performance indicator (KPI) that we want to optimize is the time needed to ensure that at least one sale occurs.

## Exploratory Data Analysis

As you probably know, data scientists spend the majority of their time in cleaning up data. I converted a few variables into binary variables, converted some strings (day) to integers, and the same with month. After cleaning up the data we can summarize the data on a high level. In this case, our typical customer is 40 years old, married, works in the admin field, graduated from university and is contacted via a cell phone. 

Stats on the current campaign:

  * Primarily conducted during the summer months, particularly April
  * Calls were made nearly uniform during the week (day)
  * Calls that resulted in no purchase lasted an average of 3.7 minutes and those that did result in a sale lasted an average of 9.2 minutes
  * Each customer was contacted an average of 2.5 times during this campaign
 
Stats on previous campaign(s):

  * After being contacted (for a previous campaign), an average of 962 days passed
  * During the last campaign, 1 in every 5.8 customers were contacted at least once
  * Every customer was contacted at least once during the current campaign
  * 24.4% of customers purchased a long-term deposit during the previous campaign
  * 86.3% of all customers were not contacted at all during the previous campaign
    * Which means only 13.6% of all customers were contacted at least once during both campaigns

The standard deviation of the social-economic variables are high (relative to it's mean).


<img src="{{site.baseurl}}/images/posts/1-eda-bar-plots.png">


### Key Performance Indicator

For this experiment, the KPI that we wish to optimize is the average duration required to make one sale. My proposal is to With this being said, it is also very important that all other variables remain the same (ex. total number of calls should not change dramatically). We do not wish to change the distribution of customer classes such as job or education, simply the selection process to identify candidates to call.

So we definitely want to minimize how many customers we call who work in the blue-collar and services fields, and call more students and retired customers. We can just simply swap the probabilities of those groups (blue-collar observed probability and student, services and retired).


<img src="{{site.baseurl}}/images/posts/1-eda-joint-kde-plot.png">


### Conclusion

In conclusion, we are going to need at least 12 sales associates (6 per group) that need to make a total of 150 calls. This is quite feasible.

  * The more calls made, the higher the probability of a sale, so adding more sales associates should also result in more sales. However, the number of sales associates in each group needs to be equal
