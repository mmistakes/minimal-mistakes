---
layout: post
title: "Where will the next Chipotle be?"
author: F Marquez
modified:
excerpt: "Author analyses the demographics of Chipotle locations in America."
tags: []
---

Everybody loves eating at Chipotle Mexican Grill. 
<p>
</p>
The first part of this project consists of getting every single Chipotle location in America. After my google-fu failed to take me to a site with every Chipotle restaurant, I wrote a scrapper to check each and every every zip code in america on Chipotle's website. There are about 60k zip codes in the United States so this took a while.

###

Once I organied my data I was very curious in finding if Chipotle's restaurants were distributed evenly across all demographics? As the histogram below shows, there are more Chipotle resturants in Zip Codes where there is a predominance of white people. 

<figure>
	<a href="/images/Chipotle/ChipotleDemo.jpeg"><img src="/images/Chipotle/ChipotleDemo.jpeg"></a>
	<figcaption>Probability map of zip codes likely to have a Chipotle restaurant.</figcaption>
</figure>

Another variable I wanted to test concerned money. Having a meal between $8 and $10 is affordable but not necesarily cheap. The histogram below shows that me majority of the restaurants are located in Zip Codes where the average income ranges between $30k-$50k. By the wasy, In case you are curious the upper tail is New York.
<figure>
	<a href="/images/Chipotle/Income_histogram.jpeg"><img src="/images/Chipotle/Income_histogram.jpeg"></a>
	<figcaption>Probability map of zip codes likely to have a Chipotle restaurant.</figcaption>
</figure>

<figure>
	<a href="/images/Goals.png">><img src="/images/Goals.png">></a>
	<figcaption><a href="http://www.flickr.com/photos/80901381@N04/7758832526/" title="Morning Fog Emerging From Trees by A Guy Taking Pictures, on Flickr">Morning Fog Emerging From Trees by A Guy Taking Pictures, on Flickr</a>.</figcaption>
</figure>


<figure>
	<a href="/images/Chipotle/ChipotleDemo.jpeg"><img src="/images/Chipotle/ChipotleDemo.jpeg"></a>
	<figcaption>Probability map of zip codes likely to have a Chipotle restaurant.</figcaption>
</figure>


{% highlight html %}
<figure class="half">
    <a href="/images/Chipotle/ChipotlePlot.jpeg"><img src="/images/Chipotle/ChipotlePlot.jpeg"></a>
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

~~~ ruby
module Jekyll
  class TagIndex < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'
      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), 'tag_index.html')
      self.data['tag'] = tag
      tag_title_prefix = site.config['tag_title_prefix'] || 'Tagged: '
      tag_title_suffix = site.config['tag_title_suffix'] || '&#8211;'
      self.data['title'] = "#{tag_title_prefix}#{tag}"
      self.data['description'] = "An archive of posts tagged #{tag}."
    end
  end
end
~~~
