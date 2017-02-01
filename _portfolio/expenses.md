---
title: "Making Election Expenses Accessible"
permalink: /portfolio/expenses/
excerpt: "An attempt to make election expenses data and investigation more organised and accessible"
header: 
  image: 
  teaser: expenses_teaser.png
  layout: portfolio-single
date: 2016-05-31 00:40:45
sidebar:
  - title: "Main Tools"
    text: "Tableau"
  - title: "Published"
    text: "Online"
  - title: "Publisher"
    text: Self-published
---

As Tory election expenses were hitting headlines, Twitter users were, well, hitting Twitter.
An influential Tweeter on this was <a href="https://twitter.com/LabourEoin/status/737708812354867202">@LabourEoin</a>, who shared data from the Electoral Commission. People were picking out interesting pieces and documents and sharing them, however this lacked two things: first, <a href="http://search.electoralcommission.org.uk/">the search function on the Electoral Commission</a> didn't allow to easily identify trends or categories; second, this research was not being collected anywhere but on Twitter.

I decided to build a tool in Tableau using the EC data which would help people search through it and identify interesting data more quickly.


![Twitter]({{ site.url }}/images/ss_twitter_expenses.png)

I set up a subreddit and linked to it on the sheet, so that people could collect their findings and discuss them together. This aspect was ultimately unsuccessful, but it was an interesting experiment in crowdsourcing journalistic research, and can likely be replicated in the future. Using a database such as via mySQL in the future would likely speed up the processing power of the tool, however Tableau made creating the whole tool - including interactive graphs - a job that took only a few hours, and could therefore quickly respond to the public interest.

You can view the tool <a href="https://public.tableau.com/views/ToryElectionExpenses2015/DataDashboard?:embed=y&:display_count=yes">here</a>.