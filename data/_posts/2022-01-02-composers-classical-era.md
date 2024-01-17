---
title: The most frequently used keys in Classical era music
tags:
  - data
  - music
  - classical music
categories: data
excerpt: Exploring the favourite keys used by composers of the Classical era, in data.
---

I was interested in looking at what musical keys have been most commonly used by classical composers, so this post is a little data exploration I'm going to run you through, and it focuses on the Classical period of music history. Of course, this means this post rotates around a data card, which you will see below!
This post does not assume any musical theory knowledge and has been intended for everyone, however it will probably be more of interest to those with a sweet spot for classical music. Note that I will not go into the details of the musical concepts mentioned as that would be beyond the point, but I will refer to further material.

The [Classical era of (Western) music](https://www.connollymusic.com/stringovation/the-classical-period-of-music) is generally understood as the period going (roughly) from 1730 to (roughly) 1820, after Baroque and before Romantic. It happens along, and as part of, the broader Enlightenment movement and, together with the main ideas illuminating this whole historical period, detaches from the canons of previous composition in that it starts to focus more on elegance and voices dialectic, somewhat embracing a return to "classical" ideals. This is also the time where the piano(forte) emerges as an instrument.

It is interesting to note that in ordinary speak we call "classical" music everything that preceded more recent genres emerged in the 20th century, with a certain forgiveness on where and whom with the boundary really sits, but in reality "classical" music refers to the aforementioned historical timeframe, from which the wording took a wider meaning in time.

So, with the accompaniment of some wonderful music from the times, let's go!

<div style="padding:20px;">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Zqyj11KUCXY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

I have chosen some of the most important composers of the Classical era and explored the keys and tonalities they preferred, or in any case used predominantly in their work during their productive years.

## Bring-along items

To immerse ourselves appropriately in the Classical era and absorb more of its context, let's choose three bring-along things for the journey. I choose a movie, a play and a place.

### A movie

The movie is [Amadeus](https://www.themoviedb.org/movie/279-amadeus), on W. A. Mozart's life. Amadeus explores the alleged row between Mozart and Salieri, the latter's jealousy at the former's genius and all his manipulative attempts at ruining Mozart's career. It is a fictionalised representation of the events, and reports one possible interpretation of what really happened, but is very good, and naturally has a fantastic [soundtrack](https://open.spotify.com/album/1LxSrqTGQD9RBrC8Oe1lBv).

### A play

["La locandiera"](https://it.wikipedia.org/wiki/La_locandiera) ("the mistress of the inn", which is a literal translation) by Italian playwright Carlo Goldoni is a very enjoyable play whose plot focuses on a lady, owner of an inn, who gets continuously annoyed (one would say harassed) by flirting men wanting to make a show of their macho power. She doesn't succumb to their virile attentions and just uses the opportunity at her advantage. I guess there are many readings of the meaning of this work, but one interpretation could rotate around an avant-garde making fun of the patriarchy.

This play was written during the Enlightenment times, had its debut in 1753 and is worth a read/watch/listen to embrace more of the period.

For those interested, I have found a free [audiobook](https://www.youtube.com/watch?v=5YdJUQT-KRE) of the English translation on YouTube. About the original (in Italian), you can easily find some full theatrical recordings: one in b/w from 1966 [here](https://www.youtube.com/watch?v=8-f67i5mlEw), which was transmitted by the RAI (Italian public TV) and one from more recent times [here](https://www.youtube.com/watch?v=b2XAtThcEMc).

### A place

<figure class="align-right" style="width: 400px">
  <img src="{{ site.url }}{{site.posts_images_path}}vienna_hofburg_neue_burg.jpg">
  <figcaption>Vienna, the Hofburg, from the Neue Burg portion. Own pic.</figcaption>
</figure>

Vienna! Of course, this city has been home to Mozart and is quite iconically tied to him, but many others have lived and produced important works there. Beethoven and Haydn moved to Vienna and eventually died there, Schubert was a viennese ... to name just a few people. In the photo, from a quick trip I did there a few years ago, the Hofburg as seen from Neue Burg: it is the former imperial palace of the Habsburgs and now the presidential residence.

## The data card

The ["key"](https://en.wikipedia.org/wiki/Key_(music)) in music is the scale in which a composition is written and defines the set of notes that constitute its scale. Every melody can be written in any chosen key, but the notes would accordingly change, following the appropriate succession of intervals. See the references for more on this.

My data card below illustrates the mode (most commonly used) key by six composers of the Classical era in each lustrum (period of 5 years) since their first work. If more keys were equally used by the composer, they are all represented.
Each of the composers is assigned a colour and their mode keys are displayed on the pentagram (in G-clef) as the leading note, which is full or hollow based on whether the tonality is major or minor, respectively. As an example, for C. P. E. Bach in lustrum 1725, the mode key was G minor.

The bars indicate the productive years of each composer and on the right there are indications for the three main sections into which the Classical era can be split (early, middle/late and transition to the Romantic).

<figure class="align-center" style="width: 600px">
  <img src="{{ site.url }}{{site.posts_images_path}}music-classical-era-keys.jpg">
  <figcaption>My data card on the most commonly used keys by some prominent Classical era composers, lustrum by lustrum.</figcaption>
</figure>

You can see that there is an overly dominating presence of major tonalities and that some keys are widely present, e.g. C.

### Narrowing the focus: choosing the composers

I am not sure why but I was thinking of Beethoven when I first got the idea of this card, so I started from his works. Then, because I wanted to provide a comparison amongst composers living during the same period at least to a reasonable extent, I decided to narrow down the focus to the Classical era. This still left [a lot of possible people](https://en.wikipedia.org/wiki/List_of_Classical-era_composers), too many for a reasonable piece of work. I then decided to narrow down the list to a set that was representative of the whole Classical period, in its starting, core and ending phases:
* **Carl Philipp Emanuel Bach** - fifth son of Johann Sebastian and an important figure of the early Classical period;
* **Franz Joseph Haydn** - dominated the Classical era and also taught Beethoven;
* **Wolfgang Amadeus Mozart** - coming from a musical family, he is regarded as a genius, lived through the core Classical era;
* **Franz Schubert** - lived between the core and the late Classical era, he died pretty young;
* **Niccolò Paganini** - a violin virtuoso bordering into the Romantic era;
* **Ludwig van Beethoven** - bridged the passage from the Classical to the Romantic era and produced very many famous works.

### The data

I thought it would be harder than it actually was to take the data, or that maybe I had to concoct a way to parse unstructured information to obtain the key of musical pieces, extracting it from text such as "Sonata in E m" and "Concerto n. 56 op. 2 in Bb major", with all the possible ambiguity and variation that goes with it. But no, this information exists wonderfully structured in tables with the key conveniently separated into its own column on the [IMSLP](https://imslp.org/wiki/Main_Page) (the International Music Score Library Project) website. The IMSLP is an online inventory of music sheets for which the copyright has expired, and it proved to be just what I needed, given it has pages like [this one](https://imslp.org/wiki/List_of_works_by_Carl_Philipp_Emanuel_Bach) with all the works of a composers well organised for metadata.

I have then simply searched for the list of each composer I was interested in and copy-pasted it into a spreadsheet for my convenience.

Obviously, that meant that I have been trusting those lists to be comprehensive of the production of each composer, which is certainly the case. Not only that, but the IMSLP lists seem to be the most orderly and comprehensive inventories of musical works available.

### Cleansing the original data

From the original IMSLP tables, I have ignored all columns except the one about the key, which was the only piece of data to require some standardisation. Keys may appear in a variety of formats, for example you can see "B♭ major"/"B flat major" or "C M"/"C major". It was quick enough to standardise manually (just sorting the sheet by the key and editing in bulk into a new column).
Furthermore, I have used the "date" field, which reports the range of years in which a piece of work has been produced (when known) to extract a starting year, and from this I have computed a "lustrum" (the period of 5 years in which the year falls) column.

That's it. I have then just computed the frequency counts for each key of a given composer in each desired period and taken the most frequent.

## References

Just the list of all references used in this work.

* [The Classical period of music](https://www.connollymusic.com/stringovation/the-classical-period-of-music), on StringOvation by Connolly Music
* A [playlist](https://www.youtube.com/embed/Zqyj11KUCXY) about the Classical era of music on YouTube
* [Amadeus](https://www.themoviedb.org/movie/279-amadeus) on The Movie Database
* [Amadeus' soundtrack](https://open.spotify.com/album/1LxSrqTGQD9RBrC8Oe1lBv) on Spotify
* ["La locandiera"](https://it.wikipedia.org/wiki/La_locandiera), on Wikipedia (Italian)
* ["La locandiera" ("the mistress of the inn")](https://en.wikipedia.org/wiki/The_Mistress_of_the_Inn), by Goldoni, on Wikipedia
* An English version audiobook of "la locandiera", the full original play (Italian) in two versions [here](https://www.youtube.com/watch?v=8-f67i5mlEw) and [here](https://www.youtube.com/watch?v=b2XAtThcEMc)
* The [Hofburg](https://en.wikipedia.org/wiki/Hofburg) in Vienna, on Wikipedia
* The concept of [key](https://en.wikipedia.org/wiki/Key_(music)) in music, on Wikipedia, a page that contains further useful references if you want to learn more
* A nice [page](https://hellomusictheory.com/learn/keys/) on key in music theory from S Chase, on Hello Music Theory
* The wonderful [IMSLP site](https://imslp.org/wiki/Main_Page), where I got all the data from, e.g. from lists such as [this one](https://imslp.org/wiki/List_of_works_by_Carl_Philipp_Emanuel_Bach)
* [List of Classical Era composers](https://en.wikipedia.org/wiki/List_of_Classical-era_composers), Wikipedia
