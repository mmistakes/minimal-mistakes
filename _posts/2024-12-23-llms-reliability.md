---
title: LLMs, reliability & the scientific process
tags:
  - GenAI
  - llm
  - science
excerpt: Are we becoming too lenient?
---

In a recent post titled[ "Trustworthiness in the age of AI"](https://jfkirk.github.io/posts/trustworthiness-ai/) (highly recommended, go read it!), J. Kirk says 

> "Now, more often than not, I find myself explaining to colleagues, to bosses, to investors, and to customers that the AI *actually is wrong* even while it *sounds right*."

This is an interesting situation indeed. Working in data science/Machine Learning has always been a fun ride where rapid change is the norm and the best skill is adaptation, but generative AI has partially flipped the very nature of some workflows.

If you work with LLMs/VLMs you are likely in a situation where:
1. building *some* things is easier and quicker
2. testing results for quality is shakier
3. convincing others that what you built is valuable is **much** easier (that's not a good thing)

## Building *some* things is easier

*Some* classes of problems and *some* instances of those classes can now be well solved with an LLM/VLM. Trivial examples are classifying a piece of text or image (it won't necessarily apply to all use cases though). 
If you're devising a cookery app and need to group recipes into cuisines, chances are an LLM can do that for you very well. I've asked ChatGPT to extract text from [this BBC Good Food recipe](https://www.bbcgoodfood.com/recipes/pasta-salmon-peas), create a Markdown for it and then tell me what kind of cuisine it is, the response was

*"The "Pasta with Salmon & Peas" recipe combines elements from both Italian and British cuisines. The use of pasta and crème fraîche reflects Italian culinary traditions, while the inclusion of salmon and peas is common in British cooking. Therefore, this dish can be considered a fusion of Italian and British cuisines."*

which, though I'm not sure about the crème fraîche part, I don't overall disagree with. 

However, I'm not sure how to call it (conventional?), but non-GenAI-based ML still has a lot to offer - in fact, I bet most of the ML around the business world is still linear regressions and random forests. Not to mention it's often the best for your buck: the LLM fauna now has many cheap-enough options and the general thinking is that prices of established models will keep decreasing because that's how basic economics works. But there'll always be shinier, more capable models that are expensive due to the need to recover research and training spend. Also, LLMs can't help with everything.

## Testing quality is shakier 

This is my main point of nervousness with LLMs. You usually test their behaviour on a bunch of data. If you've been careful, you selected the data to be representative of your domain, stratified, large enough and unbiased. You make this dataset into an eval set which you run periodically to check for robustness.
But the fact that results may look good doesn't tell you how the LLM will behave *at scale*. Hallucinations, gibberish and garbage may arise, and there's always the risk of [discriminatory language](https://arxiv.org/abs/2309.00770), something to be very wary of especially when building tooling that impacts on people's lives. For some things, there's [ways to cope](https://github.com/guardrails-ai/gibberish_text).

Confirmation bias looms above us humans in every circumstance but I wouldn't be surprised to learn that we are easier to fall victim to it when LLMs are involved. It can be easier to see goodness when responses are in the form of human speech rather than categories and numbers.

Further, similarly to what happens with clinical trials for drugs, side effects may be rare enough to only appear when the product is out in the population at large. Things like these are not exclusive to LLMs, but the chance for non-reproducibility is higher. The only way[^1] is to monitor, build alerts, trace and fix when possible. 

It doesn't help that for closed LLM models we don't know the details of their structure. The scientific process is in part violated: you don't control the tool, you can't inspect it, you can only see what it does ex-post and infer what it is capable of.

## Convincing "stakeholders" is much easier

Model interpretability has always been an important part of M/stats work. In fact, it's a field of its own. 
Back in the pre-LLM days, when you as a data/ML scientist built an algorithm, other people (the "stakeholders") may have had a skeptical attitude towards it unless they had a sense of what determined its results. They wanted to know why the churn model predicted Mr. Smith will cancel the subscription in 3 months, or what was the driver behind that forecasted growth rate of app downloads next quarter. Often, their skepticism was well meant and actually useful to the data/ML team, as a large part of building good ML tooling is being able to communicate their value. It is hard to trust a system which gives you back arid numbers and nothing else.
The job of the data team is to build something good enough that is wrong a small fraction of the time and that, ideally, when it's wrong it doesn't screw things up, and to communicate this in a friendly, factual and metrics-oriented way.

Fast-forward to now and the same people, as well as (almost) everyone else, seem to just trust LLMs. I think there's two reasons for this:
1. everyone can interrogate LLMs themselves, non-tech teams don't feel at the mercy of the data/ML team anymore and this is empowering;
2. LLMs talk to you in natural, polite and human-like ways -  after all, [who wouldn't trust a competent orator?](https://bigthink.com/high-culture/7-of-the-greatest-public-speakers-in-history/)

It is hard to distrust a system that gives you back nicely packaged natural-language explanations for its choices. 

The data/ML team now has the added job of instilling a healthy dose of sane lost-skepticism back so that everyone can do better than accepting things at face value.

The script-flipping means we should now be even more focused on extensive testing, even more alert about possible bad output, even more solid in our skepticism-bearing and question-asking.

---

[^1]: Somebody give me better ideas please.