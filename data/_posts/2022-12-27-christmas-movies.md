---
title: Christmas keeps upping the movies game
tags:
  - christmas
  - movie
gallery:
  - url: /assets/posts_images/xmas-2.jpg
    image_path: /assets/posts_images/xmas-2.jpg
    alt: "Interior of the Galeries Lafayette, Paris"
  - url: /assets/posts_images/xmas-3.jpg
    image_path: /assets/posts_images/xmas-3.jpg
    alt: "Interior of the Galeries Lafayette, Paris"
categories: data
excerpt: The choice of festive movies is larger and larger, in data
---

I got curious as to whether we’re producing more and more Christmas movies every year, as judging from the number of things that usually [drop on Netflix](https://www.netflix.com/search?q=christmas) come late November it does feel a bit like that. Spoiler: we are. However, this is part of a broader trend in the entertainment industry, which is producing more and more movies in general (see [here](https://www.statista.com/statistics/187122/movie-releases-in-north-america-since-2001/) for instance).

What is a '“Christmas” movie, you ask? Let’s not open this Pandora vase just now, Christmas’s gone so we have one other year to ponder and debate.

<figure class="responsive" style="width: 600px">
  <img src="{{ site.url }}{{site.posts_images_path}}xmas-tweet.png" alt="A tweet by account 'history Hit' saying 'What even technically constitutes a Christmas film?'">
  <figcaption>A tweet (screenshot of).</figcaption>
</figure>

For this work, I’ve used movies data extracted using the API from [The Movie Database](https://www.themoviedb.org/?language=en-GB), which is a service I use a lot and find really good. A lot of the information on TMDB is crowdsourced, including the keywords which is what I will use to identify movies as christmassy.

Note: this post feels a bit like a [Chartr](https://www.chartr.co/) one (nice newsletter, if you’re into data and storytelling) 😀.

## Bring-along items

When I think of Christmas movies, I think of two things: cheap and soppy American romcoms and wonderful cartoons, Christmas related or not, because some of my best childhood was spent on those days in between Christmas and NYE, off from school, watching the whole lot of Disney the TV proposed (this is the geological era before streaming services).

I can’t say I am a fan of Christmas, but the part about staying in and watching nice feel-good stuff is definitely a plus. I will not recommend a movie though!

### A place

{% include gallery id="gallery" caption="Interior of the Art Noveau dome of the Galeries Lafayette on Bd Haussmann, Paris, at Christmas time. Own pics, from a visit in 2021." %}

The Galeries Lafayette are a French chain of department stores dating back from the Belle Époque with its main location on Boulevard Haussmann in the 9th arrondissement in Paris. This store is really special with its Art Noveau decor and dome, particularly shiny at Christmas, all beautifully lit up and adorned. It’s very well worth a visit, there is a nice café where you can sit with a coffee and take in the atmosphere. Here’s a short [history](https://haussmann.galerieslafayette.com/coupole-galeries-lafayette/) on the official website.

### A book

I really want to recommend a book but scanning through the drawers of my memory I couldn’t think of any Christmas-based piece of literature other than the obvious “A Christmas carol“. So, what I’ve done was turning to searching around, resigned to recommending something I’ve not read (yet).

My attention has been picked by this [“Letters from Father Christmas“](https://www.goodreads.com/book/show/7331.Letters_from_Father_Christmas) by J R R Tolkien, a collection of real letters he used to send (impersonating Father Christmas) to his children. Apparently it’s a joy and I’m looking forward to read it. I feel like I have too much on my immediate reading list to go through already, but I may make an exception and have this skip the line - after all, reading it after the festivities may not be that enticing anymore.

### A sweet

Italian food is very regional, and there’s a special type of sweet that you’d find in the region I come from in Italy, Campania. It is called “roccocò” and it is a doughnut-shaped sweet made with almonds and a bunch of spices. In the homemade version it can be very very hard to the point that you have to watch for your teeth!

<figure class="responsive" style="width: 300px">
  <img src="{{ site.url }}{{site.posts_images_path}}roccocò.jpg" alt="Image of the Italian Christmas sweets called 'roccocò'.">
  <figcaption>Roccocò, photo by Rollopack via Wikimedia Commons, CC BY-SA 4.0</figcaption>
</figure>

There are several recipes, I found [this one](https://ricette.giallozafferano.it/Roccoco.html) on a popular Italian food blog.

## The data card

<figure class="responsive" style="width: 700px">
  <img src="{{ site.url }}{{site.posts_images_path}}xmas-movies.jpg" alt="Hand-drawn dataviz showing the number of Christmas movies released each year 2010-2022: they grow in time.">
  <figcaption>The number of Christmas movies in time since 2010, with the best movie for each year, data from The Movie Database.</figcaption>
</figure>

So, “Christmas” movies do grow in time. How many will we have next year, ~165?

## Technical bits & more details

I’ve used the [API from The Movie Database](https://developer.themoviedb.org/docs/getting-started) to derive the data. You just have to register an API key and then the endpoints are quite self-explanatory.

For data analysis, I’ve used Python/Jupyter - you can follow my notebook [here](https://github.com/martinapugliese/doodling-data-cards/blob/master/culture/movies_tv_shows/christmas_movies.ipynb) (it’s not the best code, rather in “quick-and-dirty“ style).

### Downloading data

The API “movies discover“ endpoint allows you to fetch a list of movies that respond to filters; results are batched in chunks of (max) 20 per page. I have first figured out (by using a known Christmas movie, taking the ID from the site URL and using the movie endpoint) what is the keyword ID for “christmas” and then queried, year by year, for movies that:

* have “christmas“ as a keyword
* have been released in the year for the first time
* have English as their original language

I’ve decided to focus solely on movies in English because I noticed that amongst most popular movies in general there were some in other languages; these likely won’t have had a global viewership so would insert a bias in the data.

I end up with a total of 1121 movies.

### Analysing data

Movies with a “christmas“ keyword aren’t necessarily released in December, or even November, because Christmas may relate to some of the content. I have however checked that the vast majority of the movies I downloaded are released around Christmastime, and I’ve decided it won’t matter if I include some that aren’t.

<figure class="responsive" style="width: 600px">
  <img src="{{ site.url }}{{site.posts_images_path}}xmas-movies-trend.jpg" alt="Plot showing the count of movies with 'christmas' tag from The Movie Database monthly 2013-2020, it shows they are mostly released during the last part of the year.">
  <figcaption>The movies with “christmas” tag on TMDB are mostly released at the end of the year. The plot shows 2013-2020 only for graphical limitations. You can see that peaks increase in size, an indication of the general growth in releases.</figcaption>
</figure>

Amongst “christmas“ movies released before November, we have [“Dear Santa“](https://www.themoviedb.org/movie/145312-dear-santa?language=en-GB), which appears to be released in August (I wonder whether there’s a mistake). Yet another indication that ignoring the release month is probably for the best.

If you look at the genre of these movies, they’re mostly TV movies (not really a genre, more of a classification), comedies and romances.

<figure class="responsive" style="width: 600px">
  <img src="{{ site.url }}{{site.posts_images_path}}xmas-movies-genres.jpg" alt="Plot showing the count of movies with 'christmas' tag from The Movie Database by genre, it shows that TV Movie, romance and comedy are the most popular genres.">
</figure>

Note that these counts add up to more than the total of movies because a movie can have more than one genre; most do in fact. There is one movie with genre “War“: it is [“A Christmas Truce“](https://www.themoviedb.org/movie/369060-christmas-truce?language=en-GB), 2015, which is about the battle of the Bulge during WWII.

As a last thing I looked at the average rating of these movies (I used the median), which is, globally (across al years), 6.3 and doesn’t change much year by year, always lingering around 6. The rating system is 1-10 (expressed as a percentage on the website) so this is a “a bit above halfway” situation - you weren’t expecting Christmas movies to have stellar ratings, were you? There are however notable good ones, some of which are represented on the data card as the best ones of each year, which are:

* **2010**: [A Heartland Christmas](https://www.themoviedb.org/movie/145132-a-heartland-christmas), rating 8.2. Note that out of curiosity I checked this one on Rotten Tomatoes too, learning it has no tomatometer but an audience score of 89%
* **2011**: [November Christmas](https://www.themoviedb.org/movie/52688-november-christmas), rating 7.9
* **2012**: [Scooby-Doo! Haunted Holidays](https://www.themoviedb.org/movie/245881-scooby-doo-haunted-holidays), outstanding rating of 8.6
* **2013**: [Iron Man 3](https://www.themoviedb.org/movie/68721-iron-man-3), rating of only 6.9 (this wasn’t a good year apparently)
* **2014**: [Signed, Sealed, Delivered for Christmas](https://www.themoviedb.org/movie/308686-signed-sealed-delivered-for-christmas), rating 7.1
* **2015**: [Hector](https://www.themoviedb.org/movie/345470-hector), rating 7.2
* **2016**: [The Conjuring 2](https://www.themoviedb.org/movie/259693-the-conjuring-2) (it’s a haunted house story), rating 7.3, note that this came out in June, the next one in line, Christmastime-released, with a rating of 6.9 is [A December Bride](https://www.themoviedb.org/movie/427045-a-december-bride) and it’s the one represented in the card as I’m not convinced that there’s much Christmas in the first
* **2017**: [Karen Kingsbury's Maggie's Christmas Miracle](https://www.themoviedb.org/movie/480632-karen-kingsbury-s-maggie-s-christmas-miracle), rating 7.1
* **2018**: [The Christmas Chronicles](https://www.themoviedb.org/movie/527435-the-christmas-chronicles), rating 7.1 (I watched it, it’s quite nice)
* **2019**: [Klaus](https://www.themoviedb.org/movie/508965-klaus), rating 8.3 (it’s such a great movie!); the second in line for that year is [Little Women](https://www.themoviedb.org/movie/331482-little-women) with a rating of 7.9 (I spoke about this already for this card, I love it) - looks like this was a good year in Christmas movies!
* **2020**: [High School Musical: The Musical: The Holiday Special](https://www.themoviedb.org/movie/751126-high-school-musical-the-musical-the-holiday-special), rating 7.6
* **2021**: [A Boy Called Christmas](https://www.themoviedb.org/movie/615666-a-boy-called-christmas), rating 7.4
* **2022**: [Violent night](https://www.themoviedb.org/movie/899112-violent-night), rating 7.6 - I went to watch it a couple of days ago, it’s not bad

Note that in all calculations about ratings I have only considered movies exceeding 20 votes, a total of 499 movies (which means more than half the original count doesn’t pass the threshold).

### All the caveats

* TMDB may not contain all movies released - data is crowdsourced. I’ve noticed for instance that when I first ran my analysis in early December I had less “christmas“ movies for 2010 than I found later. As Wikipedia teaches though, the power of crowdsourcing in maintaining quality is large.
* As a follow-up from the above, because I had to get going with this work in order for it to be ready now, I’ve downloaded all years except 2022 beforehand and waited for today to download 2022, the idea being that people may still be adding newer movies. This means that data has been effectively downloaded at two slightly different times.
* There may always be mistakes in the data (e.g. a wrong keyword).
* Movies’ votes can suffer from a sort of recency bias, whereby those that have been around for longer had more opportunity to collect votes.

## So what's the best Christmas movie? 

Well I didn’t try answering this question here, but other people did - here’s this [video](https://www.youtube.com/watch?v=mFwFcFMVUcE&ab_channel=mattytwoshoes) from Matty, enjoy!

---

*Oh, I have a newsletter (see link in navigation above), powered by Buttondown, if you want to get things like this and more in your inbox you can subscribe from here, entering your email. It's free.*

<iframe
scrolling="no"
style="width:100%!important;height:220px;border:1px #ccc solid !important"
src="https://buttondown.email/martinapugliese?as_embed=true"
></iframe><br /><br />