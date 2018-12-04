---
layout: single
author_profile: true
read_time: true
comments: true
share: true
title: Measuring the "Filter Bubble": How Google is influencing what you click
date: December 04, 2018 at 06:30PM
categories: Privacy News
---
<img class="align-center" src="%20https://spreadprivacy.com/content/images/2018/11/filter-bubble-header-3.png">
<img src="https://spreadprivacy.com/content/images/2018/11/filter-bubble-header-3.png" alt="Measuring the "Filter Bubble": How Google is influencing what you click"><p>Over the years, there has been <a href="https://www.ted.com/talks/eli_pariser_beware_online_filter_bubbles">considerable</a> <a href="https://www.wired.com/2016/11/filter-bubble-destroying-democracy/">discussion</a> of Google's &quot;filter bubble&quot; problem. Put simply, it's the manipulation of your search results based on your personal data. In practice this means links are moved up or down or added to your Google search results, necessitating the <em>filtering</em> of other search results altogether. These editorialized results are informed by <a href="https://www.quora.com/What-does-Google-know-about-me/answer/Gabriel-Weinberg">the personal information Google has on you</a> (like your search, browsing, and purchase history), and puts you in a <em>bubble</em> based on what Google's algorithms think you're most likely to click on.</p>
<p>The filter bubble is particularly pernicious when searching for political topics. That's because undecided and inquisitive voters turn to search engines to conduct basic research on candidates and issues in the critical time when they are forming their opinions on them. If they’re getting information that is swayed to one side because of their personal filter bubbles, then this <a href="https://www.politico.com/magazine/story/2015/08/how-google-could-rig-the-2016-election-121548">can have a significant effect</a> on political outcomes in aggregate.</p>
<p>Back in 2012 we ran a study showing Google's filter bubble may have significantly influenced the 2012 U.S. Presidential election by inserting tens of millions of more links for Obama than for Romney in the run-up to that election. Our research inspired an independent study by the Wall Street Journal:</p>
<blockquote>
<p>A Wall Street Journal examination found that the search engine often customizes the results of people who have recently searched for &quot;Obama&quot;—but not those who have recently searched for &quot;Romney.&quot;</p>
</blockquote>
<p>Now, after the 2016 U.S. Presidential election and other recent elections, there is justified new interest in examining the ways people can be influenced politically online. In that context, we conducted another study to examine the state of Google's filter bubble problem in 2018.</p>
<h3 id="summaryoffindings">Summary of Findings</h3>
<p><a href="https://www.cnbc.com/2018/09/17/google-tests-changes-to-its-search-algorithm-how-search-works.html">Google has claimed</a> to have taken steps to reduce its filter bubble problem, but our latest research reveals a very different story. Based on a study of individuals entering identical search terms at the same time, we found that:</p>
<ol>
<li>Most participants saw results unique to them. These discrepancies could not be explained by changes in location, time, by being logged in to Google, or by Google testing algorithm changes to a small subset of users.</li>
<li>On the first page of search results, Google included links for some participants that it did not include for others, even when logged out and in private browsing mode.</li>
<li>Results within the news and videos infoboxes also varied significantly. Even though people searched at the same time, people were shown different sources, even after accounting for location.</li>
<li>Private browsing mode and being logged out of Google offered very little filter bubble protection. These tactics simply do not provide the anonymity most people expect. In fact, it's simply not possible to use Google search and avoid its filter bubble.</li>
</ol>
<img src="https://spreadprivacy.com/content/images/2018/11/filter-bubble-overview-3.png" class="kg-image" alt="Measuring the "Filter Bubble": How Google is influencing what you click">
<p>For those interested in more details, we've written out everything below, as well as provided the underlying data and code. We hope this work encourages further study of this important issue.</p>
<h3 id="methodology">Methodology</h3>
<p>We asked <a href="https://twitter.com/DuckDuckGo/status/1009618814164537344">volunteers</a> in the U.S. to search for &quot;gun control&quot;, &quot;immigration&quot;, and &quot;vaccinations&quot; (in that order) at 9pm ET on Sunday, June 24, 2018. Volunteers performed searches first in private browsing mode and logged out of Google, and then again not in private mode (i.e., in &quot;normal&quot; mode). We compiled 87 complete result sets — 76 on desktop and 11 on mobile. Note that we restricted the study to the U.S. because different countries have different search indexes.</p>
<p>During analysis of the search results, we only looked at websites' top-level domains, for example <em>www.cdc.gov/features/vaccines-travel</em> and <em>www.cdc.gov/vaccines/adults</em> would both be treated as just <em>cdc.gov</em>.</p>
<h3 id="finding1mostpeoplesawresultsuniquetothemevenwhenloggedoutandinprivatebrowsingmode">Finding #1: Most people saw results unique to them, even when logged out and in private browsing mode.</h3>
<p>To count variants of results, we noted the order of the major elements: the organic (regular) links, the news (Top Stories) infobox, and the videos infobox. We ignored ads, sections containing related searches, and other infoboxes. There were variations in these too, but we didn't consider them.</p>
<p>A quick note on ordering of links: You might think that as long as the same links are shown to users, the ordering of them is relatively unimportant, but that's not the case. A given link gets only about <em><a href="https://hughewilliams.com/2012/04/12/clicks-in-search/">half as many clicks</a></em> as the link before it and <em>twice as many clicks</em> as the link after it. In other words, link ordering matters a lot because people click on the first link much more than the second, and so on.</p>
<p>The amount of variations we saw for each search term is listed below. For this part of the study, we excluded mobile results because the number of infoboxes displayed can vary significantly between mobile and desktop. That's why it says 76 participants instead of the overall total of 87. We also controlled for location (more on that below).</p>
<p><em>Private browsing mode (and logged out):</em></p>
<ul>
<li>&quot;gun control&quot;: 62 variations with 52/76 participants (68%) seeing unique results.</li>
<li>&quot;immigration&quot;: 57 variations with 43/76 participants (57%) seeing unique results.</li>
<li>&quot;vaccinations&quot;: 73 variations with 70/76 participants (92%) seeing unique results.</li>
</ul>
<p><em>Normal mode:</em></p>
<ul>
<li>&quot;gun control&quot;: 58 variations with 45/76 participants (59%) seeing unique results.</li>
<li>&quot;immigration&quot;: 59 variations with 48/76 participants (63%) seeing unique results.</li>
<li>&quot;vaccinations&quot;: 73 variations with 70/76 participants (92%) seeing unique results.</li>
</ul>
<img src="https://spreadprivacy.com/content/images/2018/11/serp-variants-2.png" class="kg-image" alt="Measuring the "Filter Bubble": How Google is influencing what you click">
<p>With no filter bubble, one would expect to see very little variation of search result pages — nearly everyone would see the same single set of results. That's not what we found.</p>
<p>Instead, most people saw results unique to them. We also found about the same variation in private browsing mode and logged out of Google vs. in normal mode.</p>
<p>Now, some search result variation is expected due to two factors that we controlled for. First, search results can change over time, such as the inclusion of time-sensitive links. We controlled for this factor by having everyone search at the same time.</p>
<p>Second, search results can change by location, such as the inclusion of local news articles. We controlled for this factor by checking all links by hand for this possibility, comparing them to the city and state of the volunteer. We saw very few local links for <em>gun control</em> (1 organic link, 1 news infobox link) and <em>immigration</em> (0), though more for <em>vaccinations</em> (15 organic links, 4 news infobox links).</p>
<p>To control for these local links, we replaced all of them with the same placeholder — localdomain.com for organic links and &quot;Local Source&quot; for infoboxes — in all of our analysis. This adjustment means two users whose results only differed by a different local domain in the same slot would not count as different. Interestingly, this adjustment didn't affect overall variation significantly.</p>
<p>Another reason you might expect some variation is testing of the search algorithm, where you show slightly different results to different people. In that case, you'd expect to see most people seeing the same results, with a few people seeing slight differences. What we saw, by contrast, was most people seeing different results.</p>
<h3 id="finding2googleincludedlinksforsomeparticipantsthatitdidnotincludeforothers">Finding #2: Google included links for some participants that it did not include for others.</h3>
<p>Google search results typically have ten organic links. While the ordering of those links really matters (i.e. link #1 gets ~40% of clicks, link #2 ~20%, link #3 ~10% and so on), we also wanted to know how many different domains were being displayed.</p>
<p>With no filter bubble, one would expect to see this total to be around ten. We saw significantly more. In private browsing mode, logged out of Google, and with local domains replaced with <em>localdomain.com</em>, here are the totals:</p>
<ul>
<li>&quot;gun control&quot;: 19 different domains</li>
<li>&quot;immigration&quot;: 15 different domains</li>
<li>&quot;vaccinations&quot;: 22 different domains</li>
</ul>
<img src="https://spreadprivacy.com/content/images/2018/11/domain-occurrences-2.png" class="kg-image" alt="Measuring the "Filter Bubble": How Google is influencing what you click">
<p>As you can see this clearly in the visualization above, some people were shown a very unusual set of results relative to the other participants, offered some domains seen by no-one else. If you were one of these people, you would have no way of knowing what you're missing.</p>
<h3 id="finding3wesawsignificantvariationwithinthenewsandvideosinfoboxes">Finding #3: We saw significant variation within the News and Videos infoboxes.</h3>
<p>We also wanted to look at variation within the news (Top Stories) and videos infoboxes. We also saw significant variation within those, even though there are only three slots available. Again, these are for private browsing mode, logged out of Google, and with local domains replaced with &quot;Local Source&quot;.</p>
<p><em>News infobox:</em></p>
<ul>
<li>&quot;gun control&quot;: 3 variations from 5 sources, appearing for 75/76 people. The most common variation was seen by 69 people (90%).</li>
<li>&quot;immigration&quot;: 6 variations from 7 sources, appearing for 76/76 people. The most common variation was seen by 35 people (46%).</li>
<li>&quot;vaccinations&quot;: 2 variations from 3 sources, appearing for 2/76 people. Each variation was seen by one person (1%).</li>
</ul>
<p><em>Videos infobox:</em></p>
<ul>
<li>&quot;gun control&quot;: 12 variations from 7 sources, appearing for 75/76 people. The most common variation was seen by 24 people (32%).</li>
<li>&quot;immigration&quot;: 6 variations from 6 sources, appearing for 75/76 people. The most common variation was seen by 42 people (55%).</li>
<li>&quot;vaccinations&quot;: Not shown in the search results.</li>
</ul>
<p>As an example, the Videos infobox for the &quot;immigration&quot; query showed the following six variations. As with organic search results, the ordering matters here because the second and third slots get far fewer clicks.</p>
<ul>
<li>Today, MSNBC, NBC News (shown to 42 participants)</li>
<li>MSNBC, Today, NBC News (shown to 26 participants)</li>
<li>Today, MSNBC, MSNBC (shown to 4 participants)</li>
<li>MSNBC, Today, Today (shown to 1 participant)</li>
<li>New York Times, CNN, MSNBC (shown to 1 participant)</li>
<li>Today, MSNBC, RealClearPolitics (shown to 1 participant)</li>
</ul>
<p>Remember, we had people search at the same time, and we changed all local-links to the be same, so this variation is not explained by time or location. And again, some people were real outliers; in fact, some didn't see the infoboxes at all.</p>
<h3 id="finding4privatebrowsingmodeandbeingloggedoutofgoogleofferedalmostzerofilterbubbleprotection">Finding #4: Private browsing mode and being logged out of Google offered almost zero filter bubble protection.</h3>
<p>Finally, we saw the variation in private browsing mode (also known as incognito mode) and logged out of Google as about the same as in normal mode. Most people expect both being logged out and going &quot;incognito&quot; to provide some anonymity. Unfortunately, this is a <a href="https://spreadprivacy.com/is-private-browsing-really-private/">common misconception</a> as websites use IP addresses and <a href="https://spreadprivacy.com/browser-fingerprinting/">browser fingerprinting</a> to identify people that are logged out or in private browsing mode.</p>
<p>If search results were more anonymous in these states, then we would expect everyone's private browsing mode results to be similar. That's not what we saw.</p>
<p>To test this more rigorously, we took the organic results, excluding ads and infoboxes, and:</p>
<ol>
<li>Assigned each domain a letter (e.g. A for nytimes.com, B for wsj.com, etc.).</li>
<li>Made a string of letters for each person's results, e.g. ABDFJKMSL.</li>
<li>Compared these strings to see how similar they were to each other.</li>
</ol>
<p>To do this comparison we counted domain changes between different sets of search results, reducing the differences to a number. For example, ABC -&gt; ACB is one change. (Technically, we used a letter to represent each domain within each search result and calculated the <a href="https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance">Damerau-Levenshtein edit distance</a> between them.)</p>
<img src="https://spreadprivacy.com/content/images/2018/11/edit-distances1-2.png" class="kg-image" alt="Measuring the "Filter Bubble": How Google is influencing what you click">
<p>We saw that when randomly comparing people's private modes to each other, there was more than double the variation than when comparing someone's private mode to their normal mode:</p>
<p><em>gun control:</em></p>
<ul>
<li>Average of normal and private browsing mode (same user): 1.03</li>
<li>Average of private browsing mode (random user): 2.89</li>
<li>Average of private browsing mode (five closest users): 2.65</li>
</ul>
<p><em>immigration:</em></p>
<ul>
<li>Average of normal and private browsing mode (same user): 1.38</li>
<li>Average of private browsing mode (random user): 3.28</li>
<li>Average of private browsing mode (five closest users): 2.80</li>
</ul>
<p><em>vaccinations:</em></p>
<ul>
<li>Average of normal and private browsing mode (same user): 2.23</li>
<li>Average of private browsing mode (random user): 4.97</li>
<li>Average of private browsing mode (five closest users): 4.25</li>
</ul>
<img src="https://spreadprivacy.com/content/images/2018/11/edit-distances2-1.png" class="kg-image" alt="Measuring the "Filter Bubble": How Google is influencing what you click">
<p>We often hear of confusion that private browsing mode enables anonymity on the web, but this finding demonstrates that Google tailors search results regardless of browsing mode. People should not be lulled into a false sense of security that so-called &quot;incognito&quot; mode makes them anonymous.</p>
<h3 id="studydataandcode">Study Data and Code</h3>
<p>The data is available for download in two parts: <a href="https://duckduckgo.com/download/duckduckgo-filter-bubble-study-2018_participants.xls">Basic non-identifiable participant data</a>, and <a href="https://duckduckgo.com/download/duckduckgo-filter-bubble-study-2018_raw-search-results.xls">raw data from the search results</a>.</p>
<ul>
<li><a href="https://duckduckgo.com/download/duckduckgo-filter-bubble-study-2018_participants.xls"><em>duckduckgo-filter-bubble-study-2018_participants.xls</em></a> contains the instructions we sent to each participant, as well as basic anonymized data for each participant.</li>
<li><a href="https://duckduckgo.com/download/duckduckgo-filter-bubble-study-2018_raw-search-results.xls"><em>duckduckgo-filter-bubble-study-2018_raw-search-results.xls</em></a> contains a separate sheet for search results per query and per mode (private and non-private). The results are listed as they appeared on the screen for each participant, showing both organic domains and infoboxes such as Top Stories (news), Videos, etc.</li>
</ul>
<p>The code that we wrote to analyze the data is open source and <a href="https://github.com/duckduckgo/filter-bubble-study">available on our GitHub repository</a>.</p>
<p></p><hr><p><em>For more privacy advice,  <a href="https://twitter.com/duckduckgo">follow us on Twitter</a> &amp; get our <a href="https://duckduckgo.com/newsletter">privacy crash course</a>.</em></p>

<a class="btn btn--info" href="https://spreadprivacy.com/google-filter-bubble-study/">View Complete Article</a>