---
title: Empowering non-technical people to use data at work
tags:
  - data
  - meta
  - data science
excerpt: Helping others outside the data team to use data is a valuable thing to do, as a data scientist
---

The purpose of a data scientist can be very variegated, depending on the organisation and the maturity of the use of data within it. Fundamentally however, a data scientist is a *problem solver*, someone that is highly skilled in getting that data to talk and suggest a direction to tackle the problem at hand.

If your organisation is a bank, the problem might be recognising a financial transaction as possibly fraudulent or assessing the likelihood of loan repayment by a customer; if it develops apps for e-commerce the problem might be investigating why your users drop in large numbers right before checkout; in the case of a public body managing the spend on healthcare services the problem might be figuring out where gaps in the system allow for a waste of public funds.

Being highly skilled with data means being able to think unconventionally and transversally about data, looking at non-popular ways to derive information from aggregates and generating forecasts. These are distinctive traits of a data science role and boil down to a combination of the ability to deal with complex data sets (coding, dexterity with software tools, theoretical knowledge of measuring methodologies and statistical artillery) and a mindset that is always questioning what it sees, trying to frantically put every assumption to test, finding directions of investigation that are not immediately visible to everyone. Sometimes, it may not be necessary to use much sophistication as simple hacks and tricks can achieve a lot - it is the job of the data scientist to assess what is needed where.

A very important component of a data scientist's work is to make data and its interpretation accessible to others outside of the data team, especially those in non-technical roles. I support the idea that data scientists are also ambassadors of data literacy within a company and  enablers of shared ownership around data. In your organisation, is the data team the only one with access to the data? Chances are, even in those cases, it will not be the only team looking at data in some form though - is it also continuously asked by others to create "reports"? One of the things data scientists at the start of their career lament is the enormous amount of time spent being a data reporter. I am not going to discuss this point specifically here (because it deserves its own discussion separately) but I will point out that this "problem" is easily solved: make others use data on their own.

What does this mean, what can you do, in practice? A few things, depending on the specifics of the situation.

Are you continuously asked to provide a "report" where a bunch of metrics are written down? Assuming you have access to data from a database and what you do to calculate metrics is running a series of queries (so that every time you are asked for them you repeat the same procedure), you can easily automate the process.

You can build a dashboard that allows people to retrieve the metrics themselves, the way you would, so that the queries are ran automatically for them. There are several very good dashboarding tools you can use for this - some of them are even free and you would have to just self-host them, others are tools you pay for. I have been doing lots of work with [Redash](https://redash.io/) and [Metabase](https://www.metabase.com/) and I recommend them both, but there are many others. If you go for things like Metabase, which needs to be hosted, and you do not have the ability to set this up yourself, speak to the engineering team. For the money involved in doing all this, speak to your boss: spending something on enabling others to access information is in most cases worth the time you will save in generating the same information at request, and continuously.

Sometimes, an even simpler solution goes a long way, if there isn't time/willingness to setup a service. You may notice that people in the marketing team are regularly copypasting data from a UI/tool to a spreadsheet (e.g. the performance of campaigns): you can probably easily automate their time-consuming effort by writing a script that would do this for them. And if putting the little script up as a job on a machine is overkill it can even be simply run by them from their laptop. You would save people a lot of time, and that is valuable.

The solutions above fall in the area of discoverability of data: making others use data and facilitating the process of obtaining it. There is another take as well: educating others over the use of data once it is accessed. Here too, some simple implementations you can set up may have a big effect.

People love calculating "averages" - it is clearly the most immediate way to aggregate data, but what exactly is an average? Or, better, how would you give an aggregated representation of many data points, that is representative of a "mean" behaviour? Sometimes, the (statistical) mean is not the best choice - if your data has some evident outliers (which may even be flukes due to errors) you are usually better off with a median. Another classic case is what to do in situations where the metric to compute is a percentage but you only have 10 data points to calculate it upon: the concept of "error" on the data has to be taken into account. Choosing the best path in all these situations is a simple job you can do for other teams, and it would improve the quality of the information the company uses, as well as teaching people some simple concepts.

So, empower others to use the data! It can only be a win-win situation: it will free more of your time, it will make people feel more independent, it will give the company better data-driven directions.

# References

S Brown, [*How to build data literacy in your company*](https://mitsloan.mit.edu/ideas-made-to-matter/how-to-build-data-literacy-your-company), **MIT Management Sloan School**
