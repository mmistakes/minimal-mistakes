---
title: A journey through Caravaggio's colours, in data
tags:
  - colour
  - painting
  - art
  - colour segmentation
categories: data
gallery:
  - url: /assets/posts_images/pio-monte.jpeg
    image_path: /assets/posts_images/pio-monte.jpeg
    alt: "Interior of the church Pio Monte della Misericordia in Naples, Italy, with Caravaggio's painting Sette opere di misericordia."
  - url: /assets/posts_images/pio-monte-painting.jpeg
    image_path: /assets/posts_images/pio-monte-painting.jpeg
    alt: "Sette opere di Misericordia, image of the painting. From Wikimedia, public domain."
toc: true
toc_label: "Table of Contents"
toc_icon: "palette"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
excerpt: Analysing colours in Caravaggio's art.
---

Michelangelo Merisi, known universally as Caravaggio, is undeniably one of the most accomplished artists ever existed. Born in Milan in the second half of the sixteenth century, he operated in several Italian cities and his work and peculiar style left a profound mark in the history of Western art, even generating a movement that [took name from him](https://en.wikipedia.org/wiki/Caravaggisti).

His subjects are mostly religious/biblical (well, he worked primarily under commission) and are defined by the masterful use of light contrast (a technique known as [chiaroscuro](https://en.wikipedia.org/wiki/Chiaroscuro)) that generate powerful visual effects.

A while ago, I did a [data card on Renoir's colours](https://martinapugliese.github.io/data/renoir-colours/), so I thought I would replicate the work for another artist very distant in time and style from the Impressionists. I have used the exact same approach: downloading images of paintings from Wikipedia (this [page](https://en.wikipedia.org/wiki/List_of_paintings_by_Caravaggio)) and analysing their colour segmentation with a chosen palette - more details below.

## A painting and a place

*As part of my data cards I (nearly) always try to recommend things that go along with them and help give some context.*

Most of Caravaggio's works are in Rome as he spent several years there. Naples however hosts one of my favourites, the "Sette opere di Misericordia" ("Seven works of Mercy") in the [Pio Monte della Misericordia](https://piomontedellamisericordia.it/il-palazzo/), a palace (now museum) dating from the seventeenth century built by a group of youngsters engaged in charity endeavours aimed at helping the city's underprivileged.

At some point in the early part of the century, these people commissioned the idea of creating a depiction of the Gospel's charity ways to Caravaggio, who was new in town. By the way, young Caravaggio must have been quite the character, he had to fly Rome because he committed a homicide during a brawl. Really, he was a bit of a madcap and kept overall a high profile, living between painting and violent rioting. A [letter](https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(18)30571-1/fulltext) published in The Lancet in 2018 shows evidence that he died of sepsis after a probable infection contracted as a result of a fight. He was 38 - imagine what he could have still produced if only he lived a little longer.

{% include gallery id="gallery" caption="Sette opere di Misericordia, painting by Caravaggio in the Pio Monte della Misericordia in Naples, Italy. The picture shows the seven works of mercy as per the Gospel and is quite a sight. My photo (right), close-up, Wikimedia public domain (left)." %}

The artwork is hosted in the chapel within the palace, which you can visit together with the museum, and I would highly recommend it. You can find the location by walking alongside the colourful cobblestones-paved road that is [Via dei Tribunali](https://maps.app.goo.gl/vuRwq587CSwpj6Vh9) in the very heart of the city's historical centre, which is also home to some of the most ancient pizzerias, likely surrounded by mopeds and various people masterfully and quickly shifting pizza doughs and espressos from one side to the other. Honestly, it takes skills and practice to do that.

At the top we see the Virgin Lady with baby Christ and some angels; then the seven works of mercy are:

* feed the hungry: on the right, a lady feeding a man from her breast, she also represents visit the imprisoned;
* bury the dead: the main with a torch;
* clothe the naked and cure the sick: on the centre-left, the gentlemen donating his coat and the figure on the floor turning his back to us;
* shelter the homeless: the two men on the left, one asking for a roof and the other helping out;
* refresh the thirsty: on the very left in the central part, there's a man drinking.

**Many of Caravaggio's works contain several figures involved in complex acts so it is always worth taking the time to observe the details.**

## The data card

<figure class="responsive">
  <img src="{{ site.url }}{{site.posts_images_path}}caravaggio-colours.jpg">
  <figcaption>My data card on Caravaggio's art. Each bar, in chronological order bottom to top, represents a painting in its colour composition, where each colour is traced in its occupation (in percentage). Colour palette of the segmentation in the legend at the bottom.</figcaption>
</figure>

I've represented all the paintings I could extract data for (from this list on Wikipedia), amounting to a total of 92; there are a few more in the [list](https://en.wikipedia.org/wiki/List_of_paintings_by_Caravaggio) but some failed in either downloading or passing through the colour-extraction routine.

**Each painting is a line** and the colours represent the fraction of pixels in the image which are assigned that colour cluster (colour occupancy). The palette used, the 12 colours shown at the bottom of the card, is the one from [Chamorro-Martínez](https://www.sciencedirect.com/science/article/abs/pii/S0165011406004209) et al. (like in the case of Renoir).

On the vertical axis, **time** as embodied by the three decades Caravaggio was active, from circa 1592 to circa 1610.

We can see that there's a lot of warm hues, which may be slightly counterintuitive given the dark tones of many of his backgrounds, but those tones map in this palette and with this method to mostly oranges and yellows.

<figure class="responsive">
  <img src="{{ site.url }}{{site.posts_images_path}}caravaggio-renoir-colours-closeup.png">
  <figcaption>Colour parts of the Renoir and Caravaggio cards for a quick side-to-side comparison.</figcaption>
</figure>

There are decisively less blues and greens in Caravaggio than in Renoir, given the typical impressionist flowery and light outdoors. Also, note that in the case of Renoir I had many more paintings.

All in all I would expect to retrieve similar results for any artist - the palette would have to be made more specific to actually see differentiating colour schemes.

## Some details

As in the case of the Renoir card, I have been able to do this very easily thanks to the great Python library [colour-segmentation](https://mmunar97.gitbook.io/colour-segmentation/) - you can see all code details in this [Jupyter notebook](https://github.com/martinapugliese/doodling-data-cards/blob/master/culture/art/caravaggio/caravaggio-paintings.ipynb).

### Caveats

The same caveats I surfaced for Renoir apply here.

Obviously, I've used pictures of paintings which have likely been taken with different devices and/or edited differently, which means there is no homogeneity. Also, the list of paintings is not necessarily comprehensive of Caravaggio's work (and several of his paintings are thought to have been lost in time) and the palette used is arbitrary.

## Read more

* *M Drancourt et al.*, [Did Caravaggio die of Staphylococcus Aureus Sepsis?](https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(18)30571-1/fulltext), **The Lancet**, 2018
* Caravaggio on [Wikipedia](https://it.wikipedia.org/wiki/Caravaggio)
* [Page](https://piomontedellamisericordia.it/il-palazzo/) of the Pio Monte della Misericordia, with historical notes
* Jupyter [notebook](https://github.com/martinapugliese/doodling-data-cards/blob/master/culture/art/caravaggio/caravaggio-paintings.ipynb) where I did the data work
* [My previous work on Renoir](https://martinapugliese.github.io/data/renoir-colours/), with more details and graphs on colour segmentation

---

*Liked this? I have a newsletter if you want to get things like this and more in your inbox. It's free.*

<iframe
scrolling="no"
style="width:100%!important;height:220px;border:1px #ccc solid !important"
src="https://buttondown.email/martinapugliese?as_embed=true"
></iframe><br /><br />