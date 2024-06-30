---
title: The EU Cohesion Policy projects in Italy - first card
tags:
  - italy
  - eu
  - eu projects
categories: data
excerpt: Looking at the differences between predicted and effective realisation
---

Some weeks ago, my colleagues and friends at [onData](https://www.ondata.it/) invited me to participate to [AwareEU](https://www.infonodes.org/awareeu), a EU-funded project aimed at raising awareness, within the scope of Italy, about the [Cohesion Policy of the EU](https://ec.europa.eu/regional_policy/policy/what/investment-policy_en), a container of funds the Union gives out to its regions to support development, growth and of course to promote levelling up.

So I was asked to create data cards on EU Cohesion projects funded in Italy for specific themes (and also to give a workshop to explain how I generate my cards, the workshop being aimed at journalists interested in upskilling in data journalism). There is a portal, [Open Coesione](https://opencoesione.gov.it/en/dati/), where data is available both via API and in the form of data dumps, a rare occurrence of open data actually accessible in my country - you can check out the [onData newsletter](https://ondata.substack.com/) for more on this theme, we advocate for the correct generation and use of open data and its standards.

This one below is the first card I've realised - it's in Italian but I will of course explain it to be accessible more generally.

## The card 

Cohesion funds are delivered in 7-year cycles, I've chosen to focus on cycle 2014-2020 as it's the latest finished one at the time of writing. I've also chosen the theme "Ambiente" (Environment), and I ended up with a total of about 9100 projects overall.

<figure class="responsive">
  <img src="{{ site.url }}{{site.posts_images_path}}oc-ritardi.jpg" alt="A hand-drawn representation of distributions for Italian regions, one at a time. Each region is represented in a colour and min and max data are highlighted with little circles.">
  <figcaption>First viz I did for AwareEU: region by region (Italy), distributions (really: histograms) of the time in days between predicted and effective date of delivery of each project, considering only projects that were concluded after the predicted date. On the left side, count of projects overall and relative percentage of concluded ones.</figcaption>
</figure>

The viz represents the 20 regions of Italy, ranked by the proportion of projects which are concluded, so you see Trentino-Alto Adige at the top with 59% and Molise at the bottom with 4%. I've used a CSV dump of the data (it was just more convenient than using the API for my goals here), which reports an update date of 29 Feb. 2024. 
The leftside bar simply illustrates this ranking colour-coded and reports the total count of projects too - which illustrates that, e.g. Valle d'Aosta (the smallest of regions, by surface), may have a poor 4% in completion rate, but it also has just 9 projects.

The distribution for each region is in reality histogram: volumes give an idea of how many projects are there. Remember: while the left hand-side counts the total of projects overall for each region, the histograms are done solely on those projects exceeding the predicted conclusion date (and that are concluded). On a general basis southern regions have more projects overall, and also (likely consequently) more projects with a conclusion date beyond expectation: this has to be an effect of the fact that this part of the country is poorer and generally less developed, hence it is expected that it will receive more investments form programs like this.

There's been some minimal data cleansing needed to get to this (mostly dates in the future or filled in with the standard 1/1/1970 timestamp), but really the dataset is pretty good and workable, to the point that I was able to use ChatGPT too to do some simple measurements. You can check my notebook (linked below) for details! As an important remark, I've only considered projects related to a single and only region, as there are many which either span multiple regions or the whole country.

I've added some text here and there to highlight some of the most interesting results, e.g. two regions (Friuli Venezia Giulia and Valle d'Aosta) have no exceeding-time projects; Campania and Sicily have a project delivered more than 5 years after prediction and some regions (e.g. Lazio, Toscana) have very few exceeding-time projects. The small rectangle within the histogram is the median, arguably the most interesting indicator for comparisons.

There will be more cards on this topic, stay tuned! As always, feedback is more than welcome :).

## References
* My [notebook](https://nbviewer.org/github/martinapugliese/doodling-data-cards/blob/master/opencoesione/oc_ambiente.ipynb) on this work
* Workshop [slides](https://docs.google.com/presentation/d/1KV57lAFSVfjmO6XHeZ5vH9FtiIFrikJ4BxMPwQB6zGA/edit#slide=id.g2e7a510a23c_8_0)
* [onData newsletter](https://ondata.substack.com/)

---

*Liked this? I have a newsletter if you want to get stuff like this, and more in your inbox. It's free.*

<iframe
scrolling="no"
style="width:100%!important;height:220px;border:1px #ccc solid !important"
src="https://buttondown.email/martinapugliese?as_embed=true"
></iframe><br /><br />
