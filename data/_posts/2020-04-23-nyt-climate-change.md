---
title: How much has the media reported about climate change?
tags:
  - climate change
  - data
  - time series
  - media
categories: data
excerpt: Looking at the volume of stories about climate change in the media to assess how this area has been discussed historically, a case from the New York Times.
---

This post accompanies this data card I've been doing for a series about climate change:

<figure class="responsive">
  <img src="{{ site.url }}{{site.posts_images_path}}nyt-climate-change.jpg">
  <figcaption>The NYT, stories on climate change, a data card.</figcaption>
</figure>

I was wondering how has the media historically reported on topics of climate change, in what volumes; there is a bit of a feeling that in recent years these topics might have acquired momentum and been discussed more and more: is it true?

The [#FridaysForFuture](https://twitter.com/Fridays4future) movement, started in August 2018 by [Greta Thunberg](https://twitter.com/GretaThunberg), spans - at the time of writing this - 228 countries and 7500 cities, according to the official statistics reported on its [website](https://www.fridaysforfuture.org/statistics/graph). Public awareness and sensibility towards the environment seem to have increased in recent times, and possibly even become "fashionable": vegetarianism/veganism are social phenomena not relegated to cultural niches anymore, people are embracing recycling and up-cycling of items more willingly than ever, specific brands are arising that propose sustainable shopping, there's more general appreciation for fair and low-impact productions. How much is the media discussing these topics? Yes, of course it's a chicken-and-egg situation: the more the media discusses them, the more people will embrace them, and vice-versa. I was interested in seeing whether there's more talk these days about climate change in the general press, with respect to the (recent) past.

## Finding a proxy for measuring

### Choosing a source

In need of a proxy press source which also had to be to be easily useable to retrieve some data, I've chosen the New York Times. It is an American paper, but it has an international presence and readership (I'm interested in the general concept, not a geography-dependent one), so I thought it may be good enough. I'm a subscriber, for instance, and based on the other side of the pond.
 It is also a reputable paper, and of large [circulation](https://en.wikipedia.org/wiki/The_New_York_Times#cite_note-11) (about 550k copies daily, which makes for the 18th spot globally and 3rd in the USA).

Sure, there's a least two biases in using an American paper to draw some general measurement on how they treated climate change:
* the USA have been the leading country for science and technology up until the era of Trump which annihilated its reputation and presence - this means that you'd expect this topic to have been extensively treated on an authoritative paper such as the NYT;
* regarding the era of Trump, you'd also expect this topic to have been extensively treated because of his denialism and the large political/ethical/societal consequences it has created

In any case, I thought the NYT was a sensible choice as a proxy for the global media for this purpose. In reality, I would have had to go and look at several papers, possibly choosing amongst those with the highest circulation country-wise, to get a more representative picture, which would have been a bit much for the sake of this little illustrative work. I have tried looking at The Guardian as well (British paper, authoritative as well) but its search feature didn't allow for retrieving the needed data.

Note that the fact that I've chosen a reputable paper to do this also means that I'm getting data about how much the topic has been discussed by non-deniers. I'm not interested here in the opinions of those papers presenting fakes, pseudo-science and generally low-content stuff. Maybe one day I can try those as well, to measure how much they have been obsessed with trying to present falsities, but that's another thing.

The NYT has a search feature that allows you to retrieve articles dating back since its early days in 1851 (another reason why is suited my requirements): the search is purely phrase-based, namely you type a query and get back all the articles containing it. It is not case-sensitive and it yields documents which contain the phrase in its entirety. You can filter results down by date range and by section in the paper.

### Choosing what to look for

Now I needed a proxy within the paper.

To measure how much the NYT has spoken about climate change, I decided to go search for "climate change" and "global warming" year by year starting from 1980 and taking note of the number of articles retrieved. I've figured these would be the most relevant phrases which are present in articles related to the topic so this effort would make for a sensible assessment of its prevalence; no doubt there'd be plenty of other suitable phrases one could use ("environment", "fridays for future" itself, "pollution", "ocean acidification", "carbon emissions", "carbon footprint") but they'd either be too vague/too specific or easily risk denoting something else unrelated to the area of interest (for instance, an article containing the word "environment" might not talk about climate change at all).
However, I'm certainly underestimating the count of relevant articles (by excluding those on climate change which don't contain any of these specific phrases, there might be and there might be many), but I think I can safely assume that the vast majority of articles reporting on climate change will contain at least one of these two phrases.

Note that articles containing both phrases will figure in both counts because with the current NYT search feature it is not possible to separate them: it is not possible in general to run a semantic query, as it is for instance on Google Trends where you can query for a _topic_, which encompasses all phrases in its semantic sphere (note that I've thought of using Google Trends to have at least some indicative information, but it doesn't go far back in time enough). This is why counts have been kept separated in the plot.

In order to contextualise, I've also taken the counts of all stories written in general on the NYT (in red in the graph) and those in some specific sections of the paper ("Arts", "Science"). Because of course the structuring into sections might have most likely evolved in time (and it has), this last effort only has an anecdotal value (e.g., to see how many stories were published under a certain section in a given year). Furthermore, I've noticed that the counts of stories in all sections do not sum up to the total counts in a year - this is obviously because not all stories are attached to a section (I'd imagine general ones, breaking news, reviews and summaries may not).

The data is taken up until 2019 as the last year, the last complete year at the time of writing this. 1980 has been chosen as the starting year as I was interested in recent info.

## Looking at the data

From both the trend of all stories and that of our topic, it appears there is a peak of publication between the years (included) 2006 and 2009. Specifically, while all stories averaged at about 102k for the period precedent to 2006, this average jumps to about 160k for the period 2006-2009, to then decline again (and stabilising at a lower value than earlier) to about 88k for the period 2010-2019.
Now that period encompasses the years of the largest recent financial crisis, which might have at least in part contributed to this. There might be a ton of other reasons why The NYT published more in that period though and it would be very interesting to see what other papers did at the same time.

Regarding climate change, a peak around the same years is visible, obviously following the overall counts, followed by a subsequent upwards trend, which is more pronounced for "climate change" (in 2019 alone about 4300 stories have been published that contained the phrase "climate change"). I certainly do have the impression that "climate change" is nowadays the most common way to call this collective of phenomena in common talk. Obviously the two terms are not interchangeable, but in ordinary speak they might get used interchangeably, which is another reason why I chose them.

2009, the peak year in the plot, was the year of the [Copenhagen UN Climate Conference](https://unfccc.int/process-and-meetings/conferences/past-conferences/copenhagen-climate-change-conference-december-2009/copenhagen-climate-change-conference-december-2009), known for not having reached an agreement on the ambitious plans it was aimed at. The NYT specifically titled on the 14th of November 2009 ["Leaders will delay deal on climate change"](https://www.nytimes.com/2009/11/15/world/asia/15prexy.html?_r=1) and Wikipedia reports this in its [snippet description](https://en.wikipedia.org/wiki/United_Nations_Climate_Change_conference#2009:_COP_15/CMP_5,_Copenhagen,_Denmark) of the events, so it might be that the NYT just insisted a lot on the topic at that time.

It is interesting to notice that "climate change" seems to have been more common in stories than "global warming" even in the years up to 2000 - I would have thought that "global warming" was the preferred common way to name and discuss the phenomena some decades ago, but was just my impression.

It may be of interest to note that a section called "Climate" started appearing on the paper in 2017.

As stated above, this is the first data card of a series I'm planning about climate change, so I will write some more on this.
