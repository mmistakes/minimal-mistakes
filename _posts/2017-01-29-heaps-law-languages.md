---
title: "The growth of vocabulary in different languages"
tags:
  - linguistics
  - data
  - data-science
  - words
  - language
  - statistics
  - fit
  - power-law
excerpt: "Studying the Heaps' law in different languages from NLTK Corpora"
---

Given a text and assuming to read it, the [Heaps' law](https://en.wikipedia.org/wiki/Heaps'_law) describes the relation between the number of types (the different words, that is, the vocabulary) and tokens (all the words, that is, the text size). If I scroll through the text by reading it word per word, I will have a growing number of tokens (each instance of a word) and a growing number of types (each different word), but because some words will reappear at some point, the number of different words will grow slower than the number of tokens: how these two quantities are related to each other is the story the Heaps' law tells.

Clearly, at the beginning, the number of types will grow linearly with the number of tokens as each word will be new; on the other hand the more we proceed along the text the less new words we will find. 

As an example, if a text reads 

_The bus leaves at eight for the school. She takes the bus at eight thirty and gets to school at nine._

for the first 6 words we do not meet any repetitions (number of types and tokens follows a 1:1 trend), but then the word "the" reappears (by the way it is easy to imagine that articles will reappear quite quickly), so while the number of tokens at position 7 will be 7, the number of types will keep being 6; then in position 12 we find "bus" again, and so on.

The Heaps' law describes a power law trend between types and tokens, so that 

$$
n \propto t^\alpha \ ,
$$

where $$n$$ is the number of types and $$t$$ that of tokens. The exponent $$\alpha$$ is smaller than one, identifying a sub-linear trend (again, the types grow slower than the tokens).

We now want to see and measure the above relation on several corpora of texts, we will use those included in the [NLTK library](http://www.nltk.org).

## NLTK Corpora

NLTK nicely comes with some corpora (which can be easily installed via an interface using `nltk.download()`). Specifically, we will use:

* The [Brown Corpus](https://en.wikipedia.org/wiki/Brown_Corpus), the oldest digitised English language corpus
* The [Polish Language of the XX century sixties](http://www.tei-c.org/Activities/Projects/po01.xml)
* The Machado Corpus, contains the complete works of [Machado de Assis](https://en.wikipedia.org/wiki/Machado_de_Assis) (Brazilian Portuguese)

We can access such corpora as

```
from nltk import corpus

brown_corpus = corpus.brown
```

In the NLTK tokenisation punctuation signs appear as tokens in the above, plus tokens keep the case, which is not what we want. So, we need to do some basic cleaning, and we will then use

```
brown_words = [word.lower() for word in brown_corpus.words() if word.isalpha()]
```

and the same for the other corpora. Let's have a look at the number of total tokens in each of the three corpora.

<figure style="width: 600px" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/images/num-tokens-nltk.svg" alt="">
  <figcaption>The Polish Corpus seems quite problematic (as in, small) in the number of tokens which sits at around half a million.</figcaption>
</figure> 

## The Heaps'

The following figure plots the number of types versus the number of tokens for said NLTK corpora.

Note that what we are considering as types are just the different words and not lemmas: that is, all the inflections of the same word are considered as different types. For instance, "play" and "played" are considered as different types.

<figure style="width: 600px" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/images/heaps-nltk-linear.svg" alt="">
  <figcaption>The Heaps' law in linear scale for the aforementioned NLTK corpora.</figcaption>
</figure> 

Quite interestingly, looks like the vocabulary for Polish grows very fast with the tokens. This will just mean that in order to encounter repeated tokens we would have to wait for a relatively long time (read a lot of text). 

Might it be that Polish has a great lexical diversity, hence a very large vocabulary? [The Economist](http://www.economist.com/blogs/johnson/2010/06/counting_words) has a rather enjoyable piece on dictionary sizes of languages. [This](http://linguistics.stackexchange.com/questions/3393/which-language-has-the-biggest-vocabulary) discussion on the Linguistics Stack Exchange on the same topic is also very interesting.
Also note that Polish is a cased language, with [seven grammatical cases](https://en.wikipedia.org/wiki/Polish_language), which would mean that in our definition of types all instances of the same word but declined for the case are considered different. This might, at least partially, determine the long linear growth. 

Said linear growth is present in each of the types-tokens trends at the start as there is always, with any text, an initial phase where types are created at the same rate of tokens as there is no repetitions. Heaps' takes over after a while, when the growth rate becomes sub-linear. We are just observing that in the case of Polish the linear part seems quite long.

We're now going to fit the power laws with a linear fit (OLS) in log scale to find the best exponent. Let us first note that if $$n(t) = At^\alpha$$, then the logarithms follow a linear trend 

$$
\log(n) = \log(A) + \alpha \log(t) 
$$

We'll fit this function onto the logarithms of the data using [`scipy.optimize.leastsq`](https://docs.scipy.org/doc/scipy-0.18.1/reference/generated/scipy.optimize.leastsq.html). 

<figure style="width: 400px" class="align-right">
  <img src="{{ site.url }}{{ site.baseurl }}/images/heaps-log-brown-all.svg" alt="">
  <figcaption>The Heaps' law in logarithmic scale for the Brown corpus, and fit, using all the data. The found exponent is 0.57, but this is not a good fit. A clear deviation of the linear initial part is shown.</figcaption>
</figure> 

If we do this with the Brown corpus, and we use all the data to run the fit, we end up with the situation depicted in the figure on the right: the fit is good only on the sub-linear part after the starting linear trend. Chances are, we do not have such a large dataset that we could run this fit on all data with a small risk of polluting the result; if the number of total tokens we had were maybe at least an order of magnitude bigger, including the linear starting part in the fit would have weighted for a negligible account, which is here not the case.

Now, throwing away the starting part of the curve for each corpus, we find what is shown in the following figure

<figure style="width: 600px" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/images/heaps-log-nltk-cut.svg" alt="">
  <figcaption>The Heaps' law in logarithmic scale for the NLTK corpora, and fit, using data with the linear part cut away. The found exponents are is 0.46 (Brown), 0.55 (Machado), 0.77 (Polish).</figcaption>
</figure> 

In conclusion, seems like our qualitative impression on the Polish corpus is reflected in a higher exponent, but let us bear in mind that this has to be taken with a pinch of salt as this corpus is small. Also, the reason of the slightly waving trend in the Machado corpus is not really clear; it might be due to inner trends in the novels composing the whole corpus of the author which we are here totally ignoring.

All code used here can be found in [this Jupyter notebook](http://nbviewer.jupyter.org/github.com/martinapugliese/the-talking-data/tree/master/quantifying-natural-languages/blob/master/Heaps%27s%20laws%20different%20languages.ipynb).

https://

## Some journal references 

* M Gerlach, E G Altmann, [*Stochastic Model for the Vocabulary Growth in Natural Languages*](http://journals.aps.org/prx/pdf/10.1103/PhysRevX.3.021006), Phys. Rev. X 3, 021006, 2013 
* F Tria, V Loreto, V D P Servedio, S H Strogatz, [*The dynamics of correlated novelties*](http://www.nature.com/articles/srep05890), Scientific Reports 4: 5890, 2014
* A Gelbukh, G Sidorov, [*Zipf and Heaps Laws’ Coefficients Depend on Language*](http://www.cic.ipn.mx/~sidorov/Zipf_Springer.pdf), Int Conf on Intelligent Text Processing and Comp Linguistics, Springer, 2001
* L Lü, Zi-Ke Zhang, T Zhou. [*Deviation of Zipf's and Heaps' laws in human languages with limited dictionary sizes*](http://www.nature.com/articles/srep01082), Scientific reports 3: 1082, 2013
