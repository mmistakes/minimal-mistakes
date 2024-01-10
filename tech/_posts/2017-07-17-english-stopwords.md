---
title: English stopwords and Python libraries
tags:
  - python
  - nlp
  - linguistics
categories: data
excerpt: "Stopwords in English and finding them in NLP libraries"
---

We'll refer to the English language here but the same reasoning applies to any language. This is a little post on stopwords, what they are and how to get them in popular Python libraries when doing NLP work. Also, how they differ from library to library.

Stopwords are those words in natural language which carry no own meaning and serve the purpose of connecting other words together to create grammatical sentences. They are essential components of grammar and needed for effective communication, but do not have semantic significance. Best examples are articles ("the", "a", ...), personal pronouns ("I", "me", "you", ...) or prepositions ("in", "on", "to", ...). Usually modal verbs and auxiliaries are there as well.

Thing is, there is no such a thing as a universally accepted list of stopwords for a language. As you can expect, they're very common words, so they're indeed recognised as the most frequent words in a non-specialised collection of texts (that is, where no specific jargon is present that it could affect the frequencies). See [the Stanford NLP group](https://nlp.stanford.edu/IR-book/html/htmledition/dropping-common-terms-stop-words-1.html) on this. Now clearly depending on the texts you use, and possibly the methodologies you apply, you might end up with slightly different lists.

When you want to play around with doing some NLP tasks, in a typical case you'd better remove stopwords from yout texts (unless you need them for some reason). If you like me are a Python fan/user, you got some large choice of ways to use "built-in" stopword lists from some libraries. Indeed, *at least* three libraries have got their own versions of stopwords: NLTK, scikit-learn and spaCy.

In **NLTK** (for the record, I'm on version 3.2.1 and the corpora files are updated) you grab them as

```py
from nltk.corpus import stopwords

en_stopwords = stopwords.words('en')
```

This comes to me with 153 items. If you inspect the list, it's quite conservative, it does only include stuff which you'd put there yourself if you'd have to manually compile the list. I mean, it contains all the usual suspects which we've used in the examples above, and pretty much nothing else.

In **scikit-learn** (I'm on version 0.18.2), you can get English stopwords as

```py
from sklearn.feature_extraction.stop_words import ENGLISH_STOP_WORDS
```

which comes as a list of 318 items, so we have roughly twice as many as in NLTK. Notable non-NLTK ones are, for instance, "together", "sometimes", "hundred". It looks like the sklearn list contains some numerals as well, which is an interesting thing: would you class a numeral as a stop word? Technically it's an adjective or pronoun. I checked that numerals from "one" to "twelve" are all there; interestingly we haven't got those in between until "twenty" but then we got no "thirty", we got "forty", "fifty" and "sixty" but not "seventy", "eighty" and "ninety". Then we got "hundred", but we haven't got "thousand". There's several verbs in the list as well (apart from the auxiliaries and the modals), which is another interesting thing: we got "find", "do" and "go", for instance, which are all very frequent verbs in English but it's rather interesting that they come up as stopwords. Looks like all in all sklearn is being way less conservative than NLTK.

In **spaCy** (I'm on version 1.8.2), you get English stopwords as

```py
from spacy.en.language_data import STOP_WORDS
```

which leads to 307 items. Quite interestingly, in the sklearn list we find things like "bill", "fill" and "interest" that we don't find here (a total of 25 words are in the sklearn list and not in the spaCy one). On the flip side, among the 14 words that are in spaCy and not in sklearn, we have "regarding", "make", "quite". It's difficult to tell which of the two libraries is more conservative in this sense because it would depend on what you mean, which words would you consider deserving more the honour of being classed as stops?

We should go investigate how these stoplists have been built.

The **NLTK** stopwords come from the original 1980 Porter stemmer [paper](http://stp.lingfil.uu.se/~marie/undervisning/textanalys16/porter.pdf) by M F Porter (the famous one about the Porter stemmer); the **sklearn** ones come from the Information Retrieval group of the University of Glasgow, as you can read [in the library itself](https://github.com/scikit-learn/scikit-learn/blob/master/sklearn/feature_extraction/stop_words.py). For **spaCy**, unfortunately I couldn't find a reference about where stopwords are copied from or how they've been extracted, there is [this closed Github issue](https://github.com/explosion/spaCy/issues/649) which asks for exactly the same thing but nothing more. If you find any such reference, let me know!

Note that there are other libraries which may offer other stopwords, which I haven't tried here.
