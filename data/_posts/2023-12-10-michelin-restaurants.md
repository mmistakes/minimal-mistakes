---
title: Michelin restaurants & stars by country
tags:
  - food
categories: data
excerpt: Who has more stars, and what about the type of cuisine?
---

*This post has been made possible by the data provided by Pierluigi Vinciguerra of [The Web Scraping Club](https://substack.thewebscraping.club/) who provided me with the data (well organised!) from the 2023 and 2024 editions of the Michelin guide. Here is a [post](https://substack.thewebscraping.club/p/algolia-and-web-scraping-an-introduction) he wrote about this, where he explain how he scraped the data using Algolia - his newsletter is a great learning resource for web scraping.*

*I will likely use this data (I've got Pierluigi's permission!) to produce other cards, as there's a bunch of stories you can draw from it, but for now, let's focus on countries and cuisines.*

---

The [Michelin guide](https://guide.michelin.com/gb/en) is the Scripture of food critique; it saw light for the first time in 1900, in the early days of the automobile, when the [French tyre company created it as a way to encourage more driving](https://priceonomics.com/why-does-a-tire-company-publish-the-michelin-guide/) and, consequently, more tyre consumption. From its early days when it only listed hotel-bound restaurants and practical information about where to buy petrol and parts it has grown into the ~3500 items list we have today, growing country by country. We will do a quick dive into the highest star-decorated restaurants, by country!

## On the (food) journey

Looking at things to recommend you for a synaesthetic journey into exquisite food, I thought of:

* [A Christmas Lecture about the sense of taste](https://www.rigb.org/explore-science/explore/video/truth-about-food-yuck-or-yummy-2005#:~:text=About%20the%202005%20CHRISTMAS%20LECTURES,prefer%20some%20foods%20to%20others%3F) (Royal Institute of Science, these are lectures they produce every year, aimed at the general public), from 2005
* A lighthearted movie: [Julie & Julia](https://www.rottentomatoes.com/m/julie_and_julia) - it isn't a masterpiece but has the amazing Meryl Streep which for me works enough as a convincing factor

## The data card

### General stats

The latest edition of the guide lists 3453 restaurants, distributed in 42 countries.

The country with the highest number of Michelin-decorated restaurants is... France 🇫🇷. I don't think that's a surprise! Japan, Italy, Germany, Spain and the USA follow to build up the top 6 we show in the data card: I was quite surprised to see that the UK isn't there - in fact, it appears to be at position 7. I will use these top-6 countries for the representation, which means the UK is unfortunately *just* out.

| Country    | Restaurants 2023 | Restaurants 2024 |
| -------- | ------- | ------- |
| France  | 622    | 621 |
| Japan | 411     | 411 |
| Italy    | 377   | 395 |
| Germany    | 327   | 325 |
| Spain    | 246   | 245 |
| USA    | 225   | 231 |

Looking at the counts of starred restaurants for these 6 countries, it is interesting to note that while France, Germany and Spain have all lost one or two, Italy had a significant gain of 18 restaurants! The USA gained 6 and Japan kept the same count. Note: I have not checked which specific restaurants stayed the same, maybe that's material for another card later.

The counts of restaurants for each country are illustrated in the following plot - you can see the long tail of those countries with just a handful. Bear in mind that the Michelin guide expanded gradually (and still does) from France to other countries though, so it is not a fair representation of the global food scene!

<figure class="responsive">
  <img src="{{ site.url }}{{site.posts_images_path}}michelin-rests-per-country.jpg" alt="A bar plot showing the number of starred restaurants per country as per the Michelin guide 2024.">
  <figcaption>Number of restaurants in the Michelin guide 2024, per country.</figcaption>
</figure>

### The card

<figure class="responsive">
  <img src="{{ site.url }}{{site.posts_images_path}}michelin-card.jpg" alt="hand-drawn visualisation showing the number of Michelin-starred restaurants in the Micheling guide 2024. It also shows the distribution of stats per country and the split foreign/local cuisine.">
  <figcaption>The top 6 countries per number of restaurants in the 2024 Michelin guide, their stars distribution and the split local/foreign cuisine (with the rest labelled as "other/mixed"). Yep, the black mark on the USA donut in the blue part is a mistake (there's often one in my cards!).</figcaption>
</figure>

The numbers of countries shown in the table above are displayed within the donuts, so that these 6 countries are ordered by size of their presence in the guide. On the size, I'm showing the distribution of stars amongst these restaurants: while it is arguably obvious that most places will have (anywhere) just one star, you can see that e.g. Italy has a lower proportion of 2s and 3s with respect to e.g. France.

[Pierluigi Vinciguerra](https://substack.com/@thewebscrapingclub) had given me the first hint of an idea: looking at how different countries differ in terms of the variety of cuisines represented in the guide. I've decided to explore this in terms of the split between local and foreign cuisine - I, arguably naively, would be expecting that countries with a strong food tradition, such as Italy, would see very few restaurants of foreign cuisine. I was partly right.

For this part, look at the donut charts.

The cuisines data comes from tags each restaurant is equipped with (it can be more than one). Unfortunately for me, but in a way that makes lots of sense because these are high-end places, some of the most frequent tags are "Creative" and "Contemporary", which do not relate to an origin. These are the reasons behind the grey portions in the donuts.

For local and foreign cuisines, I have manually mapped each tag to whether it is local or foreign. For example, Italian local cuisines encompass "Campanian", "Ligurian", "Cuisine from Abruzzo" etc. I've also put "Regional Cuisine" amongst the local ones for each country that displayed it. Foreign cuisines can be "Japanese" for France or "French" for the USA. About "Mediterranean Cuisine", I've ignored it (which means it ends up in the grey part) apart from countries outside of the Mediterranean, for which it is a foreign cuisine. I've also chosen to put "Italian-American" amongts the local cuisines for the USA: I understand this is a probably controversial and largely driven by my being Italian, but I think of Italian-American food as mostly American with Italian inspiration or ingredients. The logic I used checks to class a restaurant whether it has any tag amongst the local ones, and failing that, whether it had any tag amongst the foreign ones. Failing that too, the restaurant was classed as a "Other/Mixed" one (grey part). This way, a local tag trumps everything else.

You can see that Italy and Japan have a substantial portion of restaurants classed as local cuisine, and I was quite surprised to see that that's not the case for France, which in fact is for the vast majority inhabited by creative and not-place-related cuisines.

---

*Liked this? I have a newsletter if you want to get things like this and more in your inbox. It's free.*

<iframe
scrolling="no"
style="width:100%!important;height:220px;border:1px #ccc solid !important"
src="https://buttondown.email/martinapugliese?as_embed=true"
></iframe><br /><br />