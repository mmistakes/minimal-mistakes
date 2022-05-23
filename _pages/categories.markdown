---
layout: single
permalink: /categories/
title: Archive

lang: en
lang-ref: categories
#classes: wide
author_profile: true
toc: true
toc_sticky: true

header:
  image: /assets/images/archive/archive.jpg
  caption: "Photo credit: [**C M**](https://unsplash.com/@ubahnverleih?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [**Unsplash**](http://unsplash.com/)"

---
This is archive of all posts divided by the categories.

<div id="archives">
{% for category in site.categories %}
  <div class="archive-group">
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <div id="#{{ category_name | slugify }}"></div>
    <p></p>

    <h3 id="{{ category_name | slugify }}" class="category-head">{{ category_name }}</h3>
    <a name="{{ category_name }}"></a>
    {% for post in site.categories[category_name] %}
      {% include archive-single.html type=entries_layout %}
    {% endfor %}
  </div>
{% endfor %}
</div>
