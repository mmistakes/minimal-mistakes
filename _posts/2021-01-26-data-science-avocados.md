---
title: Data Science & Avocados
header:
  overlay_image: /assets/posts_images/avocados-pixabay.jpg
  overlay_filter: 0.5
  caption: Image by [REPIC_STUDIO](https://pixabay.com/users/repic_studio-8941768/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3513048){:target="_blank"} from [Pixabay](https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3513048){:target="_blank"}
tags:
  - data
  - meta
  - data science
  - avocado
excerpt: Or how the data science a~~d~~vocacy unfolds
---

_First post of 2021! I had decided I would write more this year, so here goes. Writing more means writing more here on this blog but also - small news - I have started putting down some drafts of a book I want to produce about entering data science, aimed at young people approaching the field as well as general enthusiasts. The book will have the purpose of clarifying, from my perspective (the practitioner) and experience the confusion and overload of content (not always good) this area suffers from. Here, something I'm writing for it in an introductory chapter._

# What data science and avocados have in common

If you head to the [Google Ngram viewer](https://books.google.com/ngrams), which counts the occurrences of a given word or phrase in books in time, and search for “avocado toast” in the general English corpus, you will see a curve with a consistent rise starting from the early 2010s. It will be mostly cooking books containing the term, however this brunch sweetheart is so representative of hipster culture that I am sure it has percolated to fiction too.

The story of the avocado popularity in Europe and North America is probably one of best textbook examples of [successful marketing](https://www.theguardian.com/lifeandstyle/2015/nov/02/avocados-ripe-ready-evil-geniuses-hooked): avocados have been eaten in Central and South America for centuries but they became fashionable in the USA (and from there, expanded to everywhere else) just in the last few decades thanks to enormous PR efforts which promoted them as a healthy addition to your diet and, more recently, well, to [Instagram](https://www.instagram.com/explore/tags/avocado/?hl=en). The craze is not as recent as I would have thought though.
The story goes that in the 1910s some farmers in California realised their weather allowed for growing this weird fruit with an unappealing name (["āhuacatl"](https://en.wiktionary.org/wiki/ahuacatl#Classical_Nahuatl) in the Aztec original, which translates to “testicle”), and decided to publicize it with a new, anglicized, name - “avocado”. In the years that followed a trend picked up incredibly well, with extensive pushes from the 1960s onwards, and getting us to where we are today. There are now lots of coffee shops offering avocados in various forms at a likely extortionate price.
Now, avocados really are great items of food: they are high in monounsaturated fat, they are pretty versatile and have an interesting texture, but their charm is largely a business artefact. If you want to know more about the bits of history about the avocado craze, [[1]](#more-reading) and [[2]](more-reading) in the references are nice reads; and because of course there are ugly consequences to this mania, [this episode](https://www.imdb.com/title/tt11064620/) of the Netflix show “Rotten” is worth a watch.

**Data science has been the avocado of tech for the last few years.** You will have most likely read the popular [article](https://hbr.org/2012/10/data-scientist-the-sexiest-job-of-the-21st-century) by Davenport and Patil on data scientist being the “sexiest” job of the century. It was published on HBR in 2012 and it sounds like ages ago now. It is, in fact.

<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/2431_RC04/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"data science","geo":"","time":"today 5-y"},{"keyword":"machine learning","geo":"","time":"today 5-y"}],"category":0,"property":""}, {"exploreQuery":"date=today%205-y&q=data%20science,machine%20learning","guestPath":"https://trends.google.com:443/trends/embed/"}); </script>


The interactive above shows Google Trends data for Google searches in the last 5 years and worldwide on “data science” and “machine learning”. The numerical data shows the relative popularity so that a value of 100 represents the global peak in the period. This information can be retrieved from the [Trends interface](https://trends.google.com/trends/?geo=US).

According to the article, the term “data scientist” originated in 2008 (but this only applies to the present industrial sense); the authors compare this job role to those that innovated industries in the past by bringing analytical skills and the ability to reason in complex environments to the table, like computer scientists and financial analysts. The main point of the essay is that this new lot of trained professionals is a powerful force for novelty and a shortage of them due to a mismatch in demand and offer is in sight. Since 2012, it has certainly happened that more and more companies started recruiting for data scientists, but the field is in many regards still immature.

I would the argue that data science has undergone a process very similar to the one avocados have experienced, it is suffering from a hype that everyone knows exists yet everyone still continues to inflame:
1. it is not a new thing, and some people have been doing it for a very long time, but they have not been considered “sexy” until just now;
2. it has lately picked up outside of its initial niche, and very rapidly;
3. it has fuelled the creation of many educational programs;
4. its widespread promotion and use has generated lots of outcomes, from useful and enriching to harmful and nasty.

## Data science is not a new thing

On the first point, just like avocados which have always been cultivated and enjoyed in their native place before anyone noticed, data science has been born and used in the realm of academia for a long time.

Statisticians are arguably the data scientists _ante-litteram_ - statistics is at the core of data science as a discipline, and it is pretty “old”. But statisticians have never been very popular with the general public. And now that data science came along as its own discipline they have to either rebrand themselves as data scientists or kill any dream of popularity they might have had (I really enjoyed reading the paper in [[4]](#more-reading) on this theme, I highly recommend it for a bit of history on this point). Statistics has gradually, through the decades, expanded its reach to embrace more practical approaches and in particular blend in with computer science - here's the main components of data science as we know it.

The term "data science" itself is not that recent (its first uses have been academic and date back from the 1970s [[5]](#more-reading)). Machine Learning, the other term which is much boasted and shouted around, is not a recent idea either - this page on the Build magazine from Google Cloud is very good for pills of history [[6]](#more-reading).

## Data science has recently picked up outside of its niche

The argument for the recent explosion of data science as an attractive area on the job market usually passes through the fact that we live in the age of large and diffuse data generation - some quick googling will inform us about how much data is created in a year, a day, a minute, and how volumes are growing in time.

With the scientific expertise well-rounded and the digital revolution at full speed, data science has become a large interest in the business world. People started talking about it, writing about it, and promoting the idea of a role that could both help make sense of a new situation (we swim in a lot of data) and create novel applications with high levels of sophistication. This has happened at scale in the last decade or so.

Data science as we know it now is a much more recent phenomenon, but just like avocados it is now globally recognised and enjoyed beyond its initial birth place, although a lot of what is said around it is advertisement.

## Data science has fuelled the creation of many educational programs

If you have been studying at university lately (in the last 5 years or so), you would have probably seen that many places offer programs in data science. Alongside university programs, which are of course providing canonical degrees, a wealth of bootcamps devoted to transforming people into data scientists has also been flourishing in the past years. Bootcamps are short programs that aim at giving a practical education on a topic; they can vary wildly in duration, price, general offering and, well, quality.

There is today an enormous (I would say even overwhelming) choice of educational programs in data science. If you desire to get your start with data science and acquire the necessary skills to break into the field, you may easily feel befuddled. *This is why I decided I want to write a book. I will aim at making some clarity in this confusion and provide some guidance on how to enter the field, what matters and what is just noise, based on my experience - the one of who's been there and done that.*

Avocados are the protagonists of many cooking books that will teach, or pretend to teach you how to use them in recipes, data science is the protagonist of many courses that will teach you, or pretend to teach you how to master it.

## The use of data science can have both great and nasty consequences

The use and promotion of data science is certainly a sign of technological progress, and it is most welcome. We all use many services which are based on algorithmic outputs, and they certainly make our lives easier or give us more time to chill and play. This is just part of the regular process of human & the machine - on this, I highly recommend S Pinker's [[book]](#more-reading) on this, it is a very good read.

The breakthroughs in data science are many and embrace many fields, from allowing for immediate and trustworthy [natural language translations](https://www.nytimes.com/2016/12/14/magazine/the-great-ai-awakening.html) to tackling some of science's most difficult [open questions](https://deepmind.com/blog/article/alphafold-a-solution-to-a-50-year-old-grand-challenge-in-biology), and much, much more.
Like avocados, data science is bringing much joy to the world.
However, like in the case of the avocado craze which has generated nasty consequences (from drug overlords turning to [growing avocados for profit](https://www.theguardian.com/global-development/2019/dec/30/are-mexican-avocados-the-worlds-new-conflict-commodity) to [pipes diversions](https://www.theguardian.com/environment/2018/may/17/chilean-villagers-claim-british-appetite-for-avocados-is-draining-region-dry#:~:text=In%20Petorca%2C%20many%20avocado%20plantations,contaminated%20water%20delivered%20by%20truck.) that contribute to the war on water in the poorest world's regions), data science has its bad applications.

The ethical use of data and algorithms would deserve a very deep discussion, out of scope here, but we can certainly mention things like the [inner racism embedded in our data](https://www.wired.com/story/best-algorithms-struggle-recognize-black-faces-equally/) that propagates to algorithms, or the [risks with large models](https://www.technologyreview.com/2020/12/04/1013294/google-ai-ethics-research-paper-forced-out-timnit-gebru/). Areas like data ethics and interpretable machine learning are very active in research and they are casting new light on how we as humans can obtain the most positives out of technology while managing the potential drawbacks - because technology with a humanistic purpose should be everyone's goal.

## More reading?
1. G Kelly, [_A cultural history of the avocado_](https://www.bbc.co.uk/bbcthree/article/87a56e5c-6d41-4495-9e22-523efb6b4cb0), **BBC Three**, July 2018
2. B Handwerk, [_Holy Guacamole: how the Hass avocado conquered the world_](https://www.smithsonianmag.com/science-nature/holy-guacamole-how-hass-avocado-conquered-world-180964250/), **Smithsonian Magazine**, July 2017
3. T H Davenport, D J Patil, [_Data Scientist: the sexiest job of the 21st century_](https://hbr.org/2012/10/data-scientist-the-sexiest-job-of-the-21st-century), **HBR**, Oct. 2012
4. D Donoho, [_50 years of Data Science_](https://www.tandfonline.com/doi/full/10.1080/10618600.2017.1384734), **J of Computational and Graphical Statistics**, 26:4, 2017
5. L Cao, [_Data Science: A Comprehensive Overview_](https://dl.acm.org/doi/10.1145/3076253), **ACM Computing Surveys**, 50:3, 2017
6. [_A history of Machine Learning_](https://cloud.withgoogle.com/build/data-analytics/explore-history-machine-learning/), Build
7. S Pinker, [_Enlightenment now: the case for reason, science, humanism and progress_](https://uk.bookshop.org/a/3358/9780141979090), **Penguin Books**, 2019
