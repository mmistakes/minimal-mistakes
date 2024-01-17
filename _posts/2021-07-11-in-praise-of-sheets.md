---
title: In praise of spreadsheets
tags:
  - spreadsheets
  - sql
excerpt: Spreadsheets don't enjoy much of a good reputation in the data science circles. But I'd argue they're a great tool and deserve more respect.
---

One of the tropes in data science is that spreadsheets are hateful.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Data scientists hate Excel. <a href="https://t.co/RgfqkaghaM">https://t.co/RgfqkaghaM</a></p>&mdash; Hilary Mason (@hmason) <a href="https://twitter.com/hmason/status/1280506742242148358?ref_src=twsrc%5Etfw">July 7, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Now, I'm not sure this tweet refers to Excel specifically or to any flavour of spreadsheets tools, but this post refers to spreadsheets in general as a concept. The incarnation of spreadsheets I use the most is Google Sheets, but the considerations are general, although Google sheets give you the added benefit of easy-sharing. I use Numbers sometimes, but that does actually annoy me so I tend to copy into a Google sheet.

If you do some quick googling, you discover a long flurry of articles, blogs, reddit posts, ... about how much spreadsheets are "bad" for data science. I beg to disagree. Or better, I think spreadsheets are a great tool for certain uses and the hate towards them in the data world is misplaced, that is, placed against the wrong enemy, or the result of an ill-defined question.

## Just a tool, treat it as such, put it to good use

Spreadsheets are just a tool, like most other things: they are useful for some reasons (the same reasons why they survived till today and are still very much alive), they are ill-suited for other reasons. Note that I am not advocating for the use of spreadsheets as a catch-all tool in data analysis, I am just saying that there are situations where they can do you real good, and quickly.

I feel like a lot of the anger against them may come from when data people are "forced" to use them to perform certain work when other tools would be more suitable. But like for any other thing, if you are the master of your own fate, if you're free to choose what best suits you (or even better, what best suits the job on an objective ground), you can appreciate the use of spreadsheets for a quick data analysis, often preliminary to anything deeper.
Spreadsheets aren't a substitute for coding and building data models, nor they can provide the depth of analysis that you can achieve by other means. Also, no production work should be based on them, of course, and they cannot handle large sets (for good reasons, they're not meant as database replacements).

I also feel like another point of friction happens when data scientists are utilised as business analysts, with a lack of understanding of the difference in roles. This is a large topic that would deserve another post, but there's still very often a mismatch of expectations from both sides that can translate into tool wars.

I use sheets a lot, both for work and for side projects, and I keep forgetting how to achieve certain things because I still have way more expertise writing SQL queries (or using Pandas) than writing sheet formulas, so I have to use the docs a lot, but it's good fun. I'm also continuously amazed by what google sheets can do, really (especially since they [embedded some AI](https://support.google.com/docs/answer/6280499?co=GENIE.Platform%3DDesktop&hl=en) that performs explorations for you before you ask) - it saves me time in many occasions.

## What are spreadsheets good for

Two main things, one is for you as a data analyst, the other is for others, the recipients of the analysis.

### EDA when you don't know what you have

*EDA: exploratory data analysis, the kind of stuff you do to start working with a dataset for the first time.*

If you're in front of a dataset you don't have familiarity with, and we are assuming it is columnar and small enough (but you can always take a sample otherwise), before spinning up any Jupyter server/ RStudio and starting the usual process of analysing it in depth, it often helps to look at them via a quick sheets UI. It's good practice. "Seeing" data, scrolling to its rows, make you realise a lot of things:

* What is this column with a non-immediately clear name?
* (if there's more tables) Do columns join up on certain columns, which are maybe called differently here and there?
* How have these columns been filled and what decisions have been made about that (e.g., mapping their values to categories, naming conventions, formats, ...)?
* What data points are visibly more prone to have mistakes or miss information?

On all these points (and I'm sure there's more), a quick glance at a sheet can put you through the right path of investigating your data by starting from the basics: ask questions to those who built the dataset. Maybe you'll also help them to a better job for knowledge-sharing reasons and to make analysis efficient (e.g., establishing shared and documented conventions). You'll start a collaboration.
This is easily possible if you have a shared UI you can point to, and a tool everyone understands.

### Show quick results to others

On the last point above, everyone understands spreadsheets. So as a data scientist, if you want to get some quick buy-in for a project or show your results, or even convince managers/superiors about taking a certain course of action, a sheet is often your best ally.

You can certainly throw a notebook, or create some slides from it, or do all sorts of in-depth analyses, but the reality is, most people outside of the world of tech and data science want to see numbers for themselves to understand what is happening, especially if it is about business decisions.
A sheet gives you a UI that you can quickly customise, creating stats and using colour formatting, throwing in some quick plots, and you can do all this on the fly too - the conversation becomes a dialogue rather than you explaining things to others. That is valuable. You can use your data skills to cleverly use a sheet to do advanced operations quickly and have results appear in a place everyone is familiar with. Also, a place that everyone can customise/edit, as opposed to something that sits on your machine only and you only can manipulate, which creates an inherent access barrier.

It is an important part of the job of a data analyst/scientist to create knowledge and make it accessible and actionable to decision-makers. Sheets have a long-standing reputation in doing that, for good reasons, and you can use them skilfully for the purpose.

## Concluding

In short, I would encourage everyone working in data to consider sheets amongst the suite of tools which are very useful for data work and worth practicing. There's [other people saying the same](https://towardsdatascience.com/dont-worry-excel-is-surprisingly-effective-4670c11ebaff), let's be more! I've learned this with time/experience and at my expense. I used to start doing everything in Python/Pandas directly, only to sometimes realise that that in a few occasions it would have been more efficient to glance at data with a sheet, or to tell a story with a sheet.
