---
title: Viral families and viral species, a data card
tags:
  - data
  - science
  - research
  - virus
  - biology
  - ecology
categories: data
excerpt: Building the landscape of viral families and species in a data viz
---

<figure class="responsive" style="width: 600px">
  <img src="{{ site.url }}{{site.posts_images_path}}viral-species.jpg">
  <figcaption>Drawing the data on viral families and species. Red indicates species that are known to infect humans, and some exemplar viruses are drawn for their shape.</figcaption>
</figure>

For my newest data card, I've been exploring the theme of viruses. Clearly not an alien topic these days with the COVID pandemic, but I've been wanting to learn more on these things, and I thought the composition of viral families would deserve a viz.

I'm also reading [Spillover](https://www.goodreads.com/book/show/17573681-spillover) by D Quammen, which I'm sure must have had a good surge in sales these days. It's good, and very educational. I initially thought it would be a scipop presentation of what's a spillover, but in fact it works more as a narration of chronological events, but this is may be matter for another post. Back to our card here.

## Gathering the data

I've started by looking for information on the groups of viruses known today - I obviously needed data (counts). And a taxonomy. I've discovered there are at least two ways in which viruses get classified, the ICTV (International Committee on Taxonomy of Viruses) one and the Baltimore (from the name of its creator) one. The ICTV builds and maintains a full taxonomy, the Baltimore divides viruses in groups depending on their characteristics (such as their nucleic acid).

I had initially figured I'd visualise the Baltimore classification but then I thought that the ICTV one was more apt to be shown in a viz - the data is more segmented and (to my understanding) there is less ambiguity. I found the data on the [ICTV website](https://talk.ictvonline.org/taxonomy/), and you can easily download it. The taxonomic structure is shown at the bottom of the card. There are (this data is up-to-date as of July 2019, so it excludes the most recent coronavirus, SARS-CoV-2) 6590 species grouped into 168 families. Obviously these are the known ones.

## Drawing the data

I've decided to consider the level of family in the taxonomy, and to count species. The choice has been motivated by the fact this was the sweet spot between a good variety appearing with 168 different families and the avoidance of too much noise which would have been the case at a more fine-grained level. Plus, families have names that are kinda recognisable by the general public (which includes me, I'm not a biologist).

Then, I thought a donut chart would do, given the number of data points and their distribution: the 168 families go from 783 member species in the most populated one to a bushy tail with very low counts of species.

I've decided to then use colour to distinguish what to me was the most immediate characteristic of viruses - whether they're DNA or RNA ones; the choice of blue and orange was dictated by the need to choose two widely separated ones, plus it's a coupling I find pleasing to the eye.
The other kind of important information I wanted to display is whether a viral family was known to affect humans or not - I've decided to use a simple red tick, internal to the donut, to represent this.
For both these info, I used this [page](https://viralzone.expasy.org/656) on ViralZone. For those viruses not infecting humans, which are clearly not there and are the vast majority, I've had to retrieve what's their nucleic acid via a combination of Wikipedia and (when not there) general googling. This was by far the step that took the longest, especially because there are some ambiguities/different separations across sources (I think one example was autographiviridae, which took me reading a few places to finally get to know they are DNA ones).

I did not write the names of all families along the circle, simply because of lack of physical space in the tail.

To make it all more appealing, I've drawn a few representatives of better-known families, for their different shapes. You see there's filoviruses (Ebolavirus belongs here) which as the name suggests look like strings, the spikey shapes of coronaviruses, and so on. I guess another one we can all picture is HIV-1. Interestingly, and I don't know if this is just me, when I think of viruses the first shape that comes to mind is the one similar to Myoviridae at the top: a geometric-looking head with little menacing legs.

## What I learned

Well, this will likely be trivial to any biologist, but I've learned that the four most populated families do not infect humans, and are DNA types - some are plant viruses, some are bacteriophages.

I've also learned how varied shapes can be, and how the distribution of family counts looks like. As always, doing a card like this takes a good chunk of time, from gathering the data and framing the question, thinking on how to visualise it and then finally executing the drawing. It was good fun and as I said I do this mostly to learn things myself, then I'm happy to share.

Any feedback you may have (on the content, or the design), please reach out!
