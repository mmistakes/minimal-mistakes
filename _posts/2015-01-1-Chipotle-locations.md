---
layout: post
title: "Where will the next Chipotle be?"
author: F Marquez
modified:
excerpt: "Author analyses the demographics of Chipotle locations in America."
tags: []
---

Everybody loves eating at Chipotle Mexican Grill. 

<p> </p>

The first part of this project consists of getting every single Chipotle location in America. After my google-fu failed to take me to a site with every Chipotle restaurant, I was forced to write a scraper and check every zip code in america on Chipotle's website. There are about 60k zip codes in the United States so this took a while. 


<figure>
	<a href="/images/Goals.png">><img src="/images/Goals.png">></a>
	<figcaption><a href="http://www.flickr.com/photos/80901381@N04/7758832526/" title="Morning Fog Emerging From Trees by A Guy Taking Pictures, on Flickr">Morning Fog Emerging From Trees by A Guy Taking Pictures, on Flickr</a>.</figcaption>
</figure>

{% highlight html %}
<figure class="half">
    <a href="/images/Goals.png"><img src="/images/Goals.png"></a>
    <figcaption>Caption describing these two images.</figcaption>
</figure>
{% endhighlight %}

{% highlight yaml %}
# Authors

billy_rick:
  name: Billy Rick
  web: http://thewhip.com
  email: billy@rick.com
  bio: "What do you want, jewels? I am a very extravagant man."
  avatar: bio-photo-2.jpg
  twitter: extravagantman
  google:
    plus: BillyRick

cornelius_fiddlebone:
  name: Cornelius Fiddlebone
  email: cornelius@thewhip.com
  bio: "I ordered what?"
  avatar: bio-photo.jpg
  twitter: rhymeswithsackit
  google:
    plus: CorneliusFiddlebone
{% endhighlight %}

To assign Billy Rick as an author for our post. You'd add the following YAML front matter to a post:

{% highlight yaml %}
author: billy_rick
{% endhighlight %}
