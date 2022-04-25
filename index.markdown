---
layout: splash
author_profile: false
lang: en
lang-ref: index
excerpt: "TermIt is a tool to manage vocabularies, terms and resources in which are the terms defined and used. It is focused on management of terms based on their semantics -- i.e. two 'same' terms in different vocabularies may have different meaning."
header:
  overlay_image: /assets/images/front-image.jpg
  overlay_filter: rgba(38, 38, 38, 0.5)
  caption: "Photo credit: [**Ryunosuke Kikuno**](https://unsplash.com/@kknrynsk_jp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [**Unsplash**](http://unsplash.com/)"
  actions:
   - label: "Find out more"
     url: /about

feature_row:
- image_path: /assets/images/installation.jpg
    title: "Team"
    excerpt: "Our team."
    btn_label: "Meet our team"
    url: /team
- image_path: /assets/images/tutorial.jpg
    title: "Tutorial"
    excerpt: "TermIt solves various problems, from creating vocabularies to annotating resources."
    url: "/tutorial"
    btn_label: "Teach me how"
- image_path: /assets/images/data-model.jpg
    title: "Technical details"
    excerpt: "TermIt architecture, interesting libraries used within, or the data model used within TermIt are some of the technical details of the system."
    btn_label: "Introduce me to the details"
    url: /technical-details
---
{% assign pages=site.pages | where:"lang-ref", page.lang-ref | sort: 'lang' %}
{% if pages.size == 0 %}
    {% assign pages=site.pages | where:"lang-ref", page.lang-ref | sort: 'lang' %}
{% endif %}
{% if pages.size > 1 %}
<header class="lang__options__index">
  {% for p in pages %}
  <a href="{{ site.base-url }}{{ p.url }}" class="{{ p.lang }}" title="View in {{p.lang}}">{{ site.data.languages[p.lang].icon }}</a>
  {% endfor %}
</header>
{% endif %}

{% include feature_row %}
