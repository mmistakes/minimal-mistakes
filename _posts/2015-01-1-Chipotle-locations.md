---
layout: post
title: "Where will the next Chipotle be?"
modified:
excerpt: "Author analyses the demographics of Chipotle locations in America."
tags: [R, data mining, analytics]
modified: 2015-06-28
comments: true
---

Everybody loves eating at Chipotle Mexican Grill. 
#<br>
The first part of this project consists of getting every single Chipotle location in America. After my google-fu failed to take me to a site with every Chipotle restaurant, I wrote a scrapper to check each and every every zip code in america on Chipotle's website. There are about 60k zip codes in the United States so this took a while.
##<br>
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

{% highlight html %}
<figure class="half">
    <a href="/images/Chipotle/ChipotlePlot.jpeg"><img src="/images/Chipotle/ChipotlePlot.jpeg"></a>
    <figcaption>Caption describing these two images.</figcaption>
</figure>
{% endhighlight %}



To assign Billy Rick as an author for our post. You'd add the following YAML front matter to a post:

{% highlight yaml %}
author: billy_rick
{% endhighlight %}

### Standard Code Block

    {% raw %}
    <nav class="pagination" role="navigation">
        {% if page.previous %}
            <a href="{{ site.url }}{{ page.previous.url }}" class="btn" title="{{ page.previous.title }}">Previous article</a>
        {% endif %}
        {% if page.next %}
            <a href="{{ site.url }}{{ page.next.url }}" class="btn" title="{{ page.next.title }}">Next article</a>
        {% endif %}
    </nav><!-- /.pagination -->
    {% endraw %}


### Fenced Code Blocks

To modify styling and highlight colors edit `/_sass/_coderay.scss`. Line numbers and a few other things can be modified in `_config.yml`. Consult [Jekyll's documentation](http://jekyllrb.com/docs/configuration/) for more information.

~~~ css
#container {
    float: left;
    margin: 0 -240px 0 0;
    width: 100%;
}
~~~


