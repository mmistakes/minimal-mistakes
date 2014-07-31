---
layout: post
title: "Author Override"
author: billy_rick
modified:
excerpt: "A post to test author overrides using a data file."
tags: []
---

For those of you who may have content written by multiple authors on your site you can assign different authors to each post if desired.

Traditionally you would assign a global author for the entire site and those attributes would be used in all post bylines, social networking links in the footer, Twitter Cards, and Google Authorship. These `owner` variables defined in your `config.yml`

Start by creating an `authors.yml` file in the `_data` folder and add your authors using the following format.

{% highlight yaml %}
# Authors

billy_rick:
  name: Billy Rick
  web: http://thewhip.com
  email: billy@rick.com
  bio: "What do you want, jewels? I am a very extravagant man."
  avatar: bio-photo.jpg
  twitter: extravagantman

cornelius_fiddlebone:
  name: Cornelius Fiddlebone
  email: cornelius@thewhip.com
  bio: "I ordered what?"
  avatar: bio-photo.jpg
  twitter: rhymeswithsackit
{% endhighlight %}

To assign Billy Rick as an author for our post. We'd add the following YAML front matter to a post:

{% highlight yaml %}
author: billy_rick
{% endhighlight %}