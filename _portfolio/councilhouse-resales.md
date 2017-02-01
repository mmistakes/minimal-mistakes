---
title: "Investigation: Bristol's Council House Resales"
permalink: /portfolio/councilhouse-resales/
excerpt: "We looked more closely at what happened to those auctioned houses"
header:
  image:
  teaser: council_house_resales.png
  layout: portfolio-single
date: 2016-07-18 00:40:45
sidebar:
  - title: "Main Tools"
    text: "Excel; Tableau; import.io"
  - title: "Published"
    text: "Online; Issue 8 print edition"
  - title: "Publisher"
    text: The Bristol Cable
---

<a href="https://twitter.com/AdamC_Corn">Adam</a> and I looked again at the council auction data I had [previously mapped]({{ site.baseurl }}{% link _portfolio/councilauctions.md %}). We used <a href="http://import.io/">import.io</a> to scrape all subsequent records of sales of those properties from the <a href="http://landregistry.data.gov.uk/app/ppd">Land Registry's price paid database</a>.

The results were suprising, and the data was immediately compelling: most of the properties had been resold for substantially larger sums. As we were dealing with hundreds of properties over a large range, in order to account for all the variables we decided to focus on a subset: 23 properties resold within one year of their original council auction, since 2009.

We were aware that there were a lot of variables to control for. One way in which we accounted for this was by finding the average market changes for the MSOA of each property between each sale. By using the expected percentage change, <a href="https://docs.google.com/spreadsheets/d/1KmhOpe_SSQ2NIfKPo8Dgy1zeprQHHiPSDHaO4B8Ipr0/edit#gid=1706059762">we found the percentage above or below which the property out-performed market expectations</a>.



<a href="/images/council_resales_spread.png">![Council House Resales Article]({{ site.url }}/images/council_resales_spread.png)</a>

<a href="https://thebristolcable.org/2016/07/council-house-auctions/">Read the article online.</a>

<a href="https://docs.google.com/spreadsheets/d/1KmhOpe_SSQ2NIfKPo8Dgy1zeprQHHiPSDHaO4B8Ipr0/edit?usp=sharing">Download the data.</a>