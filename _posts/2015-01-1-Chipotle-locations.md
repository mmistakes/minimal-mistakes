---
layout: post
title: "Where will the next Chipotle be?"
modified:
excerpt: "Author analyses the demographics of Chipotle locations in America."
tags: [R, data mining, analytics]
modified: 2015-06-28
comments: true
---

A new Chipotle Restaurant opened in my neighborhood, and while I was enjoying a delicious chicken bowl, I began wondering who was Chipotle's primary consumer. In addition to this, I decided to plot a forecast for those folks out there looking to buy a house but not knowing if they will have a Chipotle restuarant close to them in the near future is currently holding them back.

<p><br></p>
The first part of this project consisted of getting every single Chipotle location in America. After my google-fu failed to take me to a site with every Chipotle restaurant, I wrote a scrapper to check each and every every zip code in America on Chipotle's website. There are about 60k zip codes in the United States so this took a while but in the end I discovered there are 1,140 Chipotle Restaurants in America!

<p><br></p>
Once I organzied my data I studied the demographic variable. As the histogram below shows, there are more Chipotle resturants in Zip Codes where there is a predominance of white people. 

<figure>
	<a href="/images/Chipotle/ChipotleDemo.jpeg"><img src="/images/Chipotle/ChipotleDemo.jpeg"></a>
	<figcaption>Probability map of zip codes likely to have a Chipotle restaurant.</figcaption>
</figure>

Another variable I wanted to test concerned income. Meal prices ranging between $8 and $10 is affordable but not necesarily cheap. The histogram below shows that me majority of the restaurants are located in Zip Codes where the average income ranges between $30k-$50k.  
<figure>
	<a href="/images/Chipotle/Income_histogram.jpeg"><img src="/images/Chipotle/Income_histogram.jpeg"></a>
	<figcaption>Probability map of zip codes likely to have a Chipotle restaurant.</figcaption>
</figure>
Considering that the average per capita income is $26,010 and the third quartile begins at $29,670, we can see how franchise owners see a better opporunity in areas where the average per capita income is around the $30,000 treshold. 
<figure>
	<a href="/images/Chipotle/America_income.jpeg"><img src="/images/Chipotle/America_income.jpeg"></a>
	<figcaption>Probability map of zip codes likely to have a Chipotle restaurant.</figcaption>
</figure>

<figure>
    <a href="/images/Chipotle/ChipotlePlot.jpeg"><img src="/images/Chipotle/ChipotlePlot.jpeg"></a>
    <figcaption>Caption describing these two images.</figcaption>
</figure>




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


