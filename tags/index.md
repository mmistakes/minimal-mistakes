---
layout: archive
permalink: /tags/
title: "Posts by tags"
author_profile: true
---

{% include group-by-array collection=site.posts field="tags" %}

<div id="tags">
    <p class="page__taxonomy">
        <span itemprop="keywords">
            {% for tag in group_names %}
                <a href="#{{ tag | slugify }}" class="page__taxonomy-item" rel="tag">{{ tag }}</a>
            {% endfor %}
        </span>
    </p>
</div>

{% for tag in group_names %}
  {% assign posts = group_items[forloop.index0] %}
  <h2 id="{{ tag | slugify }}" class="archive__subtitle"><a name="{{ tag | slugify }}"></a>{{ tag }}</h2>
  {% for post in posts %}
    {% include tag-archive-single.html %}
  {% endfor %}
{% endfor %}
