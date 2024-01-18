---
title: "My PhD thesis, some analytics"
tags:
  - linguistics
  - language
  - phd
  - research
categories: data
excerpt: Data visualisation over the text of my PhD thesis on language evolution
---

Let me present you with some data analysis on my PhD thesis. This is the preliminary version, the final one will be available in December and at that point, if some changes/revisions have been applied, I will update this post (or create a new one, let's see what happens until then).

My thesis is written in English and it's about Linguistics, though the PhD is in Physics (but this is another story for another day, please bear with me here). By data analysis here I mean metadata facts about the thesis as a manuscript.

Some basic numbers about the words used:

* the total of  words I used is 21105 (the number of written pages is around 120, maybe less);
* the total number of different words I have written is 2657 (doesn't sound as much, is this somewhat related to my mental vocabulary? Of course!);
* the most frequent word is *the* (not surprising).

Here's the figure showing the histogram of word counts.

![phd-word-counts](https://plot.ly/~MartinaPugliese/6.png)

On the x axis, we see the number of words having a number of tokens specified by the y axis.
As expected, I have plenty of words with just a few counts and just a couple of very frequent words. Word the has got a full 1849 tokens and if we ignore prepositions, articles and pronouns, the most frequent meaningful word is verbs, with 162 tokens overall. Again, this is not a surprise, because my thesis is about the evolution of natural language and I have, in particular, studied how the past tense of English verbs change in time. I have quantitatively analysed the tension between *irregular* (136 tokens) and *regular* (130 tokens) verbs. The word *language* itself appears with 125 tokens.

Let us now switch to letters. Some basics on them:

* I have employed a total of 104196 letters;
* the majority one is *e* (sounds reasonable, it is the most frequent letter in English)

The following figure shows the histogram of the letter counts I have generated.

![phd-letter-counts](https://plot.ly/~MartinaPugliese/9.png)

Let us see whether my thesis could be a good representation of the English language in terms of letter frequencies, by comparing this figure with the same plot we can find on [Wikipedia](http://commons.wikimedia.org/wiki/File%3AEnglish_letter_frequency_(frequency).svg). The overall ranking is more or less respected, but some letters are switched in their ranks. This is mostly due to two main reasons: my thesis is not long enough to constitute a reliable corpus and given that it is focused on a very specific topic it tends to contain some specific words with higher frequency (see above).

Finally, and again no surprise here, the most occurring 2-gram I have (excluding function words) is past tense, with 156 counts.

And, the word clouds obtained with the text, function word excluded (size of words is their frequency).

![word-cloud]

[word-cloud]: {{ site.url }}{{site.posts_images_path}}word-cloud.png
{: height="75px" width="600px"}
