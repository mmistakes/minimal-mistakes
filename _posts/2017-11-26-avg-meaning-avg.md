---
title: The average meaning of average
header:
  image: /images/numbers.jpg
tags:
  - data-science
  - statistics
  - data
  - language
excerpt: How the word average is used in regular talk and how to interpret and calculate it best
---

This post is a bit of a mixture between numbers and language. Or maybe it's just about numbers being put into words. Something like that.

The word "average" in English is a quite interesting one. In regular language (I mean the language of everyday life, the not-specialised talk) it is used to refer to a number which describes the representative value of a collection of numbers. This collection of values is a series of sample numbers referring (or measuring) the same thing: the grades of students in a classrom, the number of enemployed people in a country, the size of apartments in Paris, and so on.

In more precise language, a collection of numbers forms a probability distribution. The average is used to express the central tendency of the distribution. Its representative value, (its average) is usually given as the (arithmetic) mean of the distribution, also known as the *expected value* of the distribution. In these cases, average means mean (!). There are plenty of situations though where the mean isn't the best descriptor of a distribution, due to its features and to what information we're trying to squeeze about it in one single number. In the case of a skewed distribution for instance, you'd better use the *median* to convey a measure of central tendency, because the mean would give you a value that is not only not representative of a central measurement, but also sensible to outliers. The median is the value which divides the distribution in half, so that half the values are on one side and half on the other side: this is exactly the definition of something that describes the central tendency of your numbers.

Suppose for instance that you have a group of 1000 values as per the following table: you have 1000 values distributed in the range 0 to 1, many of which (700) are equal to 0.2. 

| Value    | How many   |
| -------- |:----------:|
| 0        | 100        |
| 0.2      | 700        |
| 0.9      | 100        |
| 0.95     | 50         |
| 1        | 50         |

The mean of the distribution of these values come at around 0.33. The median at 0.2 (you don't need to calculate it, you just notice tha 800 values are smaller or equal than 0.2 and there's 1000 values in total). It's not an enormous difference maybe, and in this case it is not even that important, but it serves the purpose of illustrating the point. A central value for distributions highly skewed on one side may be better given as the median: it is more representative. If I were to suddenly obtain a new value in my experiment, very different from the rest, let's say a value of 200, what would happen? The mean would move to 0.53, the median would stay the same: this is primarily why with these types of things you don't want to use the mean to assess something about your data.

If the distribution were more symmetrical, mean and median would be near. In a perfectly symmetrical distribution, they coincide. In fact, in the queen of symmetrical distributions, the gaussian (also known as the bell curve for this reason), not only mean and median coincide, but also the *mode*, which is the most frequent value. Note that in the little example above median and mode coincide as well. Sometimes you may want to give the mode as the average value of your data. Average is a generic term!

Medians are often used as the central values for population age distributions, see at the end of this post for a fantastic website where you can check how they look interactively. More strikingly, those distributions which do not have a reference scale are the power laws. Ah, the power laws: it's those things that go as powers $$x^{-\alpha}$$ and are quite pesky and ubiquitous. For instance, income is distributed power law, and this distribution takes the name from the researcher who studied it first, it's called a Pareto distribution. In its essence, it tells you that in the world there are a few people who are very wealthy and lots of people who are very poor: not exactly an egalitarian society we live in. The point is that, as in the small example above, if I were to calculate the average income in a group of people (assuming they are representative of society as a whole) as the mean, the large income of some people work as outlier data and would give me an inflated metric for the central tendency. A median would give me a much more relatable value.

In any case, my point in this post was more linguistic than about data and statistics.

It was quite interesting for me to discover that English has both the word average and the word mean and that the way average is used is not always clarified, generating confusion. Average is meant as the representative value. It's usually calculated as the mean but that is not always the best choice, up to you how you do it. In Italian we don't have two words, and this is the mother root of all my bewilderment. We just have one word, the mean (media). 

There is a lovely little book from 1954 called ["How to lie with statistics"](https://en.wikipedia.org/wiki/How_to_Lie_with_Statistics) which is all about how it is easy to misinterpret data and draw wrong conclusions, either on purpose (to confuse and manipulate people) or by mistake. This is a well known and painful phenomenon which is quite difficult to eradicate, especially because the misinterpretations typically come from people and organisations which have all the interest at pumping the numbers that suit their agenda. Anyway, the book has a chapter all devoted to the concept of average and its interpretations. Well worth a read.

## Some good stuff

* [**Population pyramids of the world**](https://www.populationpyramid.net/): a website with interactive visualisations of the age distributions of people in the world, today, in the past and in the future. It's great because you can choose the country and the year, and it splits the data by gender. Also, it runs some predictions for the years to come. Great piece of work.
* D Huff, **How to lie with statistics**, 1954: a tiny book, a great read: it contains way more than the discussion on how to best give an average
