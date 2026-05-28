---
layout: archive
---
{%- assign locale = page.locale | default: layout.locale | default: site.locale %}

<h1 id="page-title" class="page__title">{{ page.title }}</h1>

<div class="archive-container">
  {% if content %}
    <div class="archive__content">
      {{ content }}
    </div>
  {% endif %}

  <div class="entries-list">
    <div class="taxonomy__section">
      {% include posts-taxonomy.html locale=locale taxonomies=site.categories %}
    </div>
  </div>
</div>