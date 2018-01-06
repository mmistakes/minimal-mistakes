---
title: "The growth of vocabulary in different languages, reloaded"
tags:
  - linguistics
  - data
  - data-science
  - words
  - language
  - statistics
  - fit
  - power-law
  - python
excerpt: "The Heaps' law in different languages from Wikipedia text data"
---

This post is a follow-up from the [previous one]({{ site.url }}/heaps-law-languages/) I wrote about the growth of vocabulary in different languages, where I had used data from the corpora present in the NLTK library and analysed the growth of types (unique words) with respect to text size. 

What bugged me about those results was the peculiar behaviour of Polish, which seemed to exhibit a very long phase where lots of new types were being created even with growing text size. The corpus was quite small though, and I decided to run the same task on data extracted from Wikipedia. 

This post will heavily rely on concepts (types/tokens, the Heaps' law) exposed in the previous one.

## Getting the data

I used [this](https://wikipedia.readthedocs.io/en/latest/code.html#api) very helpful Python library which easily allows you to query wikipedia, in the chosen language (among those a Wikipedia exists for!). 

### Querying Wikipedia

What I've done is extracting the content of all pages responding to queries for "history"/"science"/"religion" in (with the respective translations) _English_, _Polish_, _German_, _Italian_, _Latin_ (yes, why not?), _Spanish_ and _Dutch_. The choice of these specific queries has just been determined by the idea that the pages responding to those searches should typically be long (things like "History of the World", "Natural Science", "Religion in Europe", ...), so that I can have lots of tokens. Needless to say, all content for a language has then been concatenated and tokenised. I may be clearly introducing a sort of bias in the data here in taking specific pages, which will contain a higher proportion of the specific related words than it would happen in a generic corpus, but I have to pay for feasability and time efficiency. I also expect that overall this effect wouldn't be so heavy anyway. 

I've ran things like 

```py
import wikipedia

wikipedia.set_lang('it')

results = wikipedia.search('storia')
```

to retrieve all (the API seems to be limited at 500 pages per request) pages for a given query. 

Obviously, the number of pages in each language Wikipedia is very different, and only some will have lots of pages, as can be seen from [the meta page](https://meta.wikimedia.org/wiki/List_of_Wikipedias). The number of pages we request for each of the three aforementioned queries and for each language is 500, but because the crawler might encounter some disambiguation pages (multiple pages linked to the same title), the effective number may be reduced so we end up with roughly 1400 pages for each language. 

A different story is how many total tokens we eventually end up with for each language, as this depends on the lenght of the pages themselves. Which in turn depends on how active the community of that Wikipedia is; we can expect that the more speakers a language has, among natives and non-natives, the more contributions its pages receive during their history. The meta page linked above gives a nice overview of these numbers. 

At the time of writing this, English is the first language by both number of pages and number of users (and well, this is most likely here to stay), but surprisingly (?) Cebuano scores second in number of pages while Spanish is second in number of users. Latin, a dead language, still scores 50th in terms of number of pages, with a decent 126k (though compare to the 5.3M of English ...) and its number of users is 91k, of which only 172 are classed as "active": is it professors of the language? Is it aficionados? We'll never know, but it is not a stretched hyphothesis that of expecting pages in Latin to be shorter than the corresponding ones in any of the other languages we'll use.

Because the Polish and the Latin and the Dutch corpora end up still being quite small in terms of number of total tokens (the first slightly above the million mark, the second just around the half million), I decided to enrich them afterwards by querying for a random set of other pages using the quite practical `random()` method of the library's API. 

With this procedure, for Latin, even after getting to around 3500 pages, the number of total tokens increased to just around 600k, signifying that pages are very short. I can't do much about it so I decided to live with this problem. Same number of pages for Polish, where I managed to get to the million and a half tokens though. 
 
### Tokenizing

The way I tokenized the texts from pages has been through the [`wordpunct_tokenize`](http://www.nltk.org/api/nltk.tokenize.html) tokenizer in NLTK, which applies a regex tokenisation and splits by not only space but punctuation as well: it is what we want. In the case of the NLTK corpora, tokens had already been separated out.

<figure style="width: 400px" class="align-right">
  <img src="{{ site.url }}/images/num-tokens-wikipedia.svg" alt="">
  <figcaption>The Polish, the Dutch and the Latin corpora benefit from less tokens overall.</figcaption>
</figure> 

With all the procedure described and after tokenisation, the number of total tokens I end up with is between 3 millions and 3 millions and a half for each corpus except the Latin, the Polish and the Dutch ones, see figure. 

I am sort of expecting/assuming/hoping that this will be enough to observe the sub-linear growth of types with tokens in each of them, at least the bigger ones, so let's see.  

## The Heaps' law

What we consider types here is just the different words, as in the previous post.

The next figure is the number of types versus the number of tokens for all these corpora. It is very interesting to see how Polish grows always faster than the rest (as we found in the previous post on the NLTK Polish corpus); Latins seems to be even faster; Dutch and Italian go hand in hand.

<figure class="align-center">
  <img src="{{ site.url }}/images/heaps-wiki-linear.svg" alt="">
  <figcaption>Types vs. tokens in linear scale: I love how Dutch and Italian seem to follow each other.</figcaption>
</figure> 

Fitting the logarithms of the power law (the Heaps' law) after throwing out the starting linear part (same thing we did in the previous post), we get exponents (slope of the logarithm line):

* $$0.58$$ for English (compare to the $$0.46$$ we got on the Brown corpus in the previous post)
* $$0.63$$ for Polish (we got $$0.77$$ on NLTK)
* $$0.66$$ for German
* $$0.56$$ for Italian
* $$0.69$$ for Latin
* $$0.56$$ for Spanish
* $$0.60$$ for Dutch

<figure class="align-center">
  <img src="{{ site.url }}/images/heaps-log-wiki-cut.svg" alt="">
  <figcaption>The logarithms of data with their fitting lines: dots are used to indicate the data and solid curves are the fits (one colour, one language).</figcaption>
</figure> 

Now, the higher exponents of the power laws of Polish, Latin and German _might_ be partly explained by the presence of grammatical cases in those languages, which make it so that the number of types as we have considered them is inflated as we have considered declension of the same word as different words.

## Stemming and repeating

We now decide to stem our tokens in order to investigate what happens if we only consider the stems of the words to address the question above. Note that the process of _stemming_ is not the same as the _lemmatising_ (a good explanation on Stack Overflow [here](http://stackoverflow.com/questions/1787110/what-is-the-true-difference-between-lemmatization-vs-stemming)): while stemming simply removes the ending of a word, lemmatising effectively collapses all of its declension into the root. For the sake of this post, we'll be content with just stemming at this point in time.

We use the Snowball stemmers ready-to-use in NLTK, in the package [`nltk.stem`](http://www.nltk.org/api/nltk.stem.html), present for some of the languages we used (English, German, Italian, Spanish and Dutch). The page also contains links to the detailed explanations of the Snowball stemmer in general and its language versions.

As an example, stemming the German "frauen" leads to "frau" and this is great, but stemming "mutter" leads to "mutt", which is not really what we'd want as the root should be "mutter" itself. Anyway. 

With the stemmed versions of the corpora, the exponents we get from the fit are

* $$0.61$$ for English 
* $$0.65$$ for German
* $$0.56$$ for Italian
* $$0.56$$ for Spanish
* $$0.60$$ for Dutch

**Big pinch of salt** for these exponents (as in the whole treatment of the topic really): we have cut the starting part arbitrarily and not really evaluated the quality of the fits themselves.

The following (and last) figure displays the curves for the stemmed versions alongside those for their non-stemmed counterparts. 

<figure class="align-center">
  <img src="{{ site.url }}/images/heaps-wiki-linear-stemmed.svg" alt="">
  <figcaption>Again, one colour, one language, the dashed line is the original, non stemmed version. Clearly the areas below the stemmed versions are smaller than those below the non-stemmed ones.</figcaption>
</figure> 

This, along the previous post linked at the start of this one, concludes this short voyage inside the Heaps's law for different languages. Lots of other things could be done, lemmatising properly, taking better (unbiased and larger) corpora, considering different sources. And finally doing a better job in fitting the logarithm lines.

The questions which to me arise from this small work though, and are very interesting, would be *the differences in Heaps' behaviour of different languages is determined by which interplay between grammatical and lexical richness?* and also *would a Heaps' analysis be able to shed light on this question anyway or is it still not enough?*. We'll definitely need more and deeper investigations to try to answer.

All code used here can be found in [this Jupyter notebook](http://nbviewer.jupyter.org/github.com/martinapugliese/the-talking-data/tree/master/quantifying-natural-languages/blob/master/Heaps%27s%20laws%20different%20languages.ipynb).
