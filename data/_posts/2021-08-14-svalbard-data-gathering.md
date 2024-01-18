---
title: The Svalbard seed vault, a data preparation example
tags:
  - plants
  - taxonomy
  - data preparation
  - spreadsheets
  - spreadsheets
  - csv
categories: data
excerpt: A walkthrough example of gathering data and preparing it ahead of analysis and display, with detailed steps.
---

_This post offers a walkthrough of a typical data gathering and preparation routine ahead of modelling or visualising. We will explore, given a starting idea, the steps involved in obtaining the needed data and formatting it, going into the details._

_For my example, I am downloading data from the Svalbard seed vault publicly-available interface and I explore it iteratively, preparing it into a format I can use._

## Setting the stage: why this

I am learning [D3.js](https://d3js.org/) because I want to produce interactive and beautiful data visualisations. I do a lot of plotting and graphing as part of my job and for side projects, and I do [hand-drawn visualisations](https://www.instagram.com/doodledatcard/) too, but I am trying to expand my skillset into web-based ones that go beyond conventional, "scientific" graphs.

As for everything else, my approach is hands-on, learn-by doing, so I was looking for a dataset to use as playground. I have a Trello board where I keep cards for all the ideas I have about data vizzes to do, so the natural starting point was looking there. One card suggested to look at the Svalbard seed vault datasets to explore the world's crop variety, and I thought it'd be a good candidate: self-contained, small enough and interesting in topic.

I will talk about the dataviz itself in another post.

## Preliminary considerations

Data gathering and preparation, the process that comes before any analysis, is the unsung hero of data science: everybody complains about how painful and time-consuming it can be, but it's a necessary step. This post is meant as a narration of a typical data preparation process, and intends to offer an example for those who are perhaps just starting in this field.

The guiding principle behind all the work illustrated here will be simplicity: keep the workload to a minimum. One could spend ages trying to gather and prepare data, and it is very important to choose, at each step, the most convenient and quickest way to do so: choose the tools, the datasets, the methodologies that will lead you faster to completion. In most cases, this will still mean time and effort, so it's very important to choose what to do wisely. Use the Occam's razor approach.

## The idea and the data

The [Svalbard seed vault](https://www.seedvault.no/) is the world's seed gene bank and a global effort that gathers donations from local gene banks. It aims at preserving crop variety: deposited seeds are stored in a secure location in the Svalbard islands in Norway. Its construction started in 2006 and by 2008 it already hosted a collection of [more than 300k samples](https://en.wikipedia.org/wiki/Svalbard_Global_Seed_Vault).

Its data, publicly available via a [portal](https://seedvault.nordgen.org/) in CSV format is certainly a good representation of the world's richness in crops.

My basic idea was to measure the variety of our continents in terms of their plant types. I needed to first look at how the available data looked like and then come up with a metric to surface this variety clearly. In this post, we will not discuss the second part, which is more related to the visualisation and I will present it in another post; we will focus on the first part.

## Choosing data format

I chose to have data in Google Sheets, which I made public for viewing [here](https://drive.google.com/drive/folders/12w18fwl-NE4YiQs41LyYKhRjDb7D4VCG?usp=sharing). There are multiple reasons behind the choice of using sheets:
* the data is small enough (although I had some little hurdles, see later)
* the data is naturally columnar
* I needed to make the data accessible online (because I was developing my viz on [Observable](https://observablehq.com), hence needed to access it from there and sheets were an easy choice)
* On the previous point, building a hosted database seemed overkill

By the way, I recently wrote a [post](https://martinapugliese.github.io/in-praise-of-sheets/) about how CSVs and sheets do not enjoy a high reputation amongst data scientists and why I humbly dissent.

## First step: downloading the data and creating my local copy

As stated above, the Svalbard seed vault [portal](https://seedvault.nordgen.org/Search) allows you to download CSVs (well, .xlxs, these must come from Excel), so using the "Advanced search" feature I downloaded all "seed samples" CSVs, one per continent and including the "unknown" continent one. I left all other filters that this feature displays unchanged, so I was sure I was not filtering out anything. This way I downloaded the most fine-grained data available: seed deposits with information on the species and the depositor institution.

I ended up with 7 CSVs of various size, because some continents have more seed deposits that others, and note that this is an interesting data point in itself. I pulled this data on the 10th of July 2021 so if you go and do the same now, there will likely be more deposits since then. These were my sizes at the time:
* Africa: 172508 rows
* Antarctica: 2 rows
* Asia: 397229 rows
* Europe: 151879 rows
* North America: 233717 rows
* Oceania: 12450 rows
* South America: 72242 rows
* "Unknown": 42798 rows

Note that the "unknown" continent deposits dataset is quite chunky, in comparison. I do not know why the continent of those deposits is not present, presumably it's either deposits whose provenance had not been recorded at source, or it was somehow lost. I decided to ignore this dataset because I was interested in (known) continent data.

I tried loading these into a Google Sheet, one continent per tab, and immediately hit on the problem that there's [limits](https://gsuitetips.com/tips/docs/google-docs-size-limitations/#:~:text=Google%20Spreadsheets,detailed%20spreadsheet%20size%20limits%20tip.) as to how much data you can put in a sheet, so they wouldn't all fit. You can see from the row counts above that Asia is the biggest set: it's a 13 MB file, which makes it harder to even open up in an editor.

Columns in each file are:
* Institute name: name of the depositor institution
* Institute code: an alphanumerical string that uniquely identifies the depositor institution
* Institute acronym: another string, shorter than the former, that identifies the depositor
* Accession number: an alphanumerical string identifying the deposit
* Full scientific name: name in full of the species of the seed deposited
* Species: species of the seed deposited
* Country of collection: country name where seed has been collected

The first thing I noticed is that depositor institutions are not necessarily located in the country of collection, e.g., the "Plant Gene Resources of Canada" has deposited seeds collected in Africa. I do not know how the mechanism exactly works, but I suppose the depositor institutions, which are gene banks themselves, may host a variety of seeds collected from all over the world.

The solution to the sheets size limits issue I attempted has been removing the first column (institute name), because the code was enough to identify them and I thought this would remove a fair amount of data given it's long strings. Note that you can download (from the same interface) a "depositor institutes" file too, with aggregated counts per depositor, which contains the mapping name-code, so I wasn't losing information. I could have removed the acronym too but these are short strings so it wouldn't have made much of a difference. Anyway, this wasn't enough to let me put all continents into one single sheet and I reasoned I would have probably had to add columns later, so I decided to use two sheets, each hosting a set of continents. I added the "depositor institutes" tab to each as well as another file downloaded from the same interface called "Taxon names", which hosts aggregated counts per species and the mapping between plant species and genera: I thought I might need this. I've had a quick glance at what the other data-pulls from the interface offer and reasoned there was nothing else useful for my purposes, so I left them.

I've put all data I created for myself into Google Drive [here](https://drive.google.com/drive/folders/12w18fwl-NE4YiQs41LyYKhRjDb7D4VCG?usp=sharing). The two sheets are called "Seed samples - 1" and "Seed samples - 2" (note that there's other sheets, and edits to these two, that I will describe in the following).

## Second step: sanity checks and starting some data prep

There is a wealth of information in these datasets. I was interested in finding a way to compare continents as to their variety in crops and I wanted to eventually build a visualisation to show this - in my head, I was thinkering with the idea of developing a [chord diagram](https://www.d3-graph-gallery.com/chord), though I wasn't sure what to exactly do yet. However, I had the feeling that working with species would have meant too much data for any good visualisation. The "Taxon names" downloaded dataset was giving me the mapping species-genus (the immediately higher level in the taxonomy), so I thought this would turn out to be useful.

Because I was hosting the data in sheets, I decided to run some preliminary analysis in sheets too: you can do a lot with them and starting up a Jupyter server, ingesting the data there would have likely taken me the same time. Besides, I like the idea of having a dataset that would contain all the information, even derived one, into one place. This decision was also motivated by the spirit of simplicity presented above: it would have taken me more time and effort, even if it would have been more "native to me", to work with code directly.

I've run a few preliminary queries to count unique values, look at counts per species etc, just to taste the waters. It really felt like using the species counts would have been too much.

I've then added a column to each of my continent tabs for the genus of the species: this only took a `VLOOKUP` query referencing the "Taxon names" tab so was fairly straightforward (this query searches for a value in a different dataset and returns the value of another column from the match).

At this point, in order to slim down datasets, making everything more efficient and because I didn't really need the seed level, I decided to create copies of each continent's set where only unique values where reported.
I was interested (in this instance) in counting how many occurrences of the same species were present in the vault for a continent: I wanted to assess the species variety in each continent regardless of how much each species was populated.
So I went from the original continent tab, where each seed deposit was recorded, to a slimmed-down version (in a further tab) where I was fetching just the unique species-genus values: I achieved this with a `UNIQUE` query.

## Third step: realising I needed to slim down more

This is the part where the data prepping narration becomes intertwined with the visualisation I was trying to achieve. Using a further tab, I did a group by (something that you can obtain via a `QUERY` in Google sheet, a formula that allows you to write SQL-like queries) of genera for each continent, to get a count of species in each. I was looking for data to actually display at this point.

Here came the realisation that even using genera I had too much data, which was also sparse. At this point I had already decided to not consider Antarctica, because of its poor content in species (and I think it was a legitimate exclusion :D). Pretty much each continent showed some genera very well populated and a plethora of small ones, for a total in genera that was too high (around the 200 mark for the largest continents) to yield anything visually understandable.

The seed vault data only had species and genera in the taxonomy though, so given I wanted to go higher I had to find a source of data that would give me, for each species-genus, the higher taxonomy levels.

I initially tried Wikipedia: there's good scraper libraries for Python and it seemed to store the information I wanted; for instance, this is the page for genus [Abelmoschus](https://en.wikipedia.org/wiki/Abelmoschus), where you can see higher taxonomy levels in the infobox on the side. I tried using both [wikipedia](https://pypi.org/project/wikipedia/) and [wptools](https://pypi.org/project/wptools/), but neither of them was able to quickly give me the content of that infobox. I discovered that that's because the taxonomical information is organised in a kind of a special infobox of "template" type. Anyway, I could have investigated whether someone had solved a similar problem with Python or tried writing a little scraper myself, but in the spirit of simplicity described above, I thought I'd first look at whether a taxonomical dataset existed outside of Wikipedia (I had the feeling such a relatively simple thing had to exist).

It did exist, and was freely and conveniently available: I have downloaded the [GBIF backbone taxonomy](https://www.gbif.org/dataset/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c) in CSVs (there were also a bunch of XMLs). The GBIF is the Global Biodiversity Information Facility and is an open-data effort, really great.

## Fourth step: adding higher level taxonomical info

This is the point where I needed Python. From the many sets I had downloaded from the GBIF, I had to select the right one that would give me what I needed: a mapping of species, or genera, to higher taxonomical levels. The datasets were considerably large and complex, and it wasn't immediately clear what was in them, so in this case the Occam's razor approach told me to dig into them with code.

A bit of Pandas later, that encompassed overcoming data noise and issues such as possible mistakes where some genera appeared to map to multiple higher levels, and I had a mapping in the form of a self-cooked CSV where for each genus I had columns for family, order, class and phylum. Notebooks and little explanations of this work are in this [repo](https://github.com/martinapugliese/doodling-data-cards/tree/master/nature/plants) I maintain.

## Final dataset and conclusion

At this point, all I had to do was repeat the group by and count I did by genus for the higher levels. I did this, for each continent, for both family and order, eventually deciding based on the data that I would use the order: it gave a small enough but still varied enough dataset, so that I could think of proceeding to my visualisation.
In doing so, I produced different sheets with these counts, still in the same [Drive folder](https://drive.google.com/drive/folders/12w18fwl-NE4YiQs41LyYKhRjDb7D4VCG?usp=sharing), that you can look at.

_I hope you found this walkthrough useful, if nothing else to give you an idea of how much work can be there to do before you are able to do anything "interesting" on data, whether you want to model it or visualise it. I hope you got a sense of the fact that this preliminary phase is really important in the life of anyone working with data and despite the fact that it can sound daunting, or even boring, doing it with care and using the Occam's razor's principle, can pay off big time in terms of time and effort saved later._
