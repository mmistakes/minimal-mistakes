---
layout: page
title: Speaking
permalink: /speaking/
---

<div class="row">
  {% for talk in site.categories['talk'] %}
    <div class="one-half column content-item {% cycle 'first', '' %}" style="background-image: url('../images/post-backgrounds/{{ talk.background-image }}')">
      <a href="{{ talk.url | prepend: site.baseurl }}">
        <div class='meta'>
          {{talk.title}} &mdash;
          {{talk.delivery_date | date: "%B %d %Y"}}
        </div>
      </a>
    </div>
  {% endfor %}
</div>