---
title: Articles
layout: collection
permalink: /articles/
collection: articles
entries_layout: grid
classes: wide
---
This is the collection of all articles currently written for the Young Minds Big Maths site. To see articles [[in some other way, to follow ...]]

<!-- This category filter menu is JS based, and so is hidden if JS is disabled -->
{% for article in site.articles %}
  {% capture all_topics %}{% if all_topics %}{{all_topics}},{{article.topics| join: ","}}{% else %}{{article.topics| join: ","}}{% endif %}{% endcapture %}
{% endfor %}
{% assign all_topics = all_topics | split: "," | uniq | sort_natural  %}
<div class="topicFilterMenu">
  <button id="topicFilter" onclick="displayMenu(this)" style="display:none">Topic Filter</button>
  <div class="topics menuHidden">
	{% for topic in all_topics %}
	<button onclick="toggleTopic(this,'{{topic}}')" class="buttonHidden">{{topic}}</button>
	{% endfor %}
  </div>
</div>