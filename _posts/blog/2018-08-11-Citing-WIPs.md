---
layout: post
title: Citing works in progress
categories: blog
excerpt: Kirstie's thoughts on how you give *responsible* credit for work in progress
tags: [ open-science, open-source, github, zenodo]
image:
  feature:
link:
date: 2018-08-11
modified:
share: true
author: kirstie_whitaker
---

I answered this question in person recently - at [Neurohackademy](https://neurohackademy.org) - and I realised that it might be useful for others to read about.
So in the spirit of "blog post or it didn't happen" here are my thoughts on citing works in progress.

### If you're working under an open licence, anyone can use anything you've done

I'm a big fan of [working open](https://medium.com/mozilla-open-innovation/being-open-by-design-deec6768706) (check out [this video](https://www.youtube.com/watch?v=quKdaqlR_9w) of Mozilla Excecutive Director [Mark Surman](https://twitter.com/msurman) describing the concept if you haven't heard of it before).

In particular I really love the idea of being able to ask for and receive help while you're *in the process* of building your tool, conducting your analyses, or writing that paper.
I think it's a radically collaborative way of sharing knowledge and so much more efficient than our current system of "keep everything closed until it's a perfect finished product".

(Bearing in mind that there almost never \*is\* a perfect finished product!)

What's really fascinating though is to think about how to give credit for those ideas.
Your open licence ([MIT](https://choosealicense.com/licenses/mit/), [BSD](http://www.linfo.org/bsdlicense.html) or [Apache](https://choosealicense.com/licenses/apache-2.0/) for example) allows people to re-use whatever they find in your GitHub repository so long as they credit you.

### But what if you're not done yet?

The specific example that came up on the last day of Neurohackademy was this tweet in response to [my thread](https://twitter.com/kirstie_j/status/1028066006231482368) about the [Open Science Factor](https://github.com/srcole/o-factor) (O-Factor) project.

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Really cool! I&#39;d like to cite it. Could you please ask the authors to put the results/graphs in a PDF somewhere with a persistent identifier (e.g., OSF)? And/or please include contact info on the page.</p>&mdash; Steve Haroz (@sharoz) <a href="https://twitter.com/sharoz/status/1028168505592619008?ref_src=twsrc%5Etfw">August 11, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The project *is* really cool. As they say in their [README file](https://github.com/srcole/o-factor):

> The goal of the project is to give journals (but in the future also papers, and importantly, scientists) a score of how "open science" they are. We want to find a way to promote open science and give incentives for scientists and journals to do and support more open science.

The team did an incredible job over the four days of the hackathon and presented some lovely figures. These results aren't double checked and the scientists in the team knew that. Their presentation came with a strongly disclaimer that the results were pulled together over just a few days and shouldn't be taken as a final product.

But they're up on GitHub and they have an open licence! Can someone use them?! Can they be cited? Should they?

### Yes they can...with appropriate documentation

There are at least two ways that someone might want to cite the O-Factor project right now.

1. The idea is freaking cool and someone wants to promote it.
2. There's a figure they want to interpret.

The first is really important to me. This ***is*** the point of working open. There's no need for individual teams to keep their ideas secret for fear of scooping: we **all** want to see these stats! Why would we keep these initiatives secret?

My personal recommendation to the O-Factor team is that they make a release and archive it in [Zenodo](https://zenodo.org) so that they have a [DOI](https://en.wikipedia.org/wiki/Digital_object_identifier) and a timestamp of what they did together at Neurohackademy (following [this guide](https://guides.github.com/activities/citable-code/)). I'd probably call it v0.0.1 as it's right at the very start of the project 😸

But before they do, I'd recommend adding a sentence or two that conveys how confident they are in the contents of the repository. **How** reliable are the graphs? Do they need more work? Are there open issues to consider?

The goal of this caveat is not to undermine the work they've done, but to be responsible about what can and can not be extrapolated from their work.

It's entirely up to them to determine whether the figures are interpretable (point 2 above) or not. But I would really like for our open science allies around the world to be able to **give credit to the team for their idea and the process they developed**.

*(Update: the team did an amazing job adding this information to their README, it looks awesome! Check it out at [https://github.com/srcole/o-factor](https://github.com/srcole/o-factor) 🙌)*

<figure>
  <img src="https://raw.githubusercontent.com/srcole/o-factor/master/images/team.png"
       alt="Picture of 8 team members around a whiteboard with notes">
  <figcaption>The open science factor team at Neurohackademy 2018.</figcaption>
</figure>

### tl;dr

* Share your work as you go along so you aren't reinventing the wheel!
* Make it easy for people to give you credit for your work (your ideas, your code and/or your results). Get yourself a DOI and make sure everyone's names are in the metadata. Add an example sentence to your README file showing how someone can cite that DOI.
* Add clear and prominent sentences to the README about what can and can not *at this stage* be concluded from the work.

Basically I'm saying: put into accessible form, clearly linking to the content of the repository, what the project's [licence](https://github.com/srcole/o-factor/blob/master/LICENSE) already says:

> [the work] is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND
