---
ref: pages
---

{% capture written_label %}'None'{% endcapture %}

{% for collection in site.collections %}
  {% unless collection.output == false or collection.label == "posts" %}
    {% capture labelgr %}{{ collection.labelgr }}{% endcapture %}
    {% capture label %}{{ collection.label }}{% endcapture %}
    {% if label != written_label and page.lang == 'gr' %}
      <h2 id="{{ label | slugify }}" class="archive__subtitle">{{ labelgr }}</h2>
      {% capture written_label %}{{ label }}{% endcapture %}
    {% endif %}
  {% endunless %}
  {% assign posts=collection.docs | where:"lang", page.lang %}
  {% for post in posts %}
    {% unless collection.output == false or collection.label == "posts" %}
      {% include archive-single.html %}
    {% endunless %}
  {% endfor %}
{% endfor %}
