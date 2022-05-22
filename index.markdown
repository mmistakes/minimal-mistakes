---
layout: home
author_profile: true
lang: en
lang-ref: index
excerpt: "TermIt is a tool to manage vocabularies, terms and resources in which are the terms defined and used. It is focused on management of terms based on their semantics -- i.e. two 'same' terms in different vocabularies may have different meaning."
---

<!--
feature_row:
  - image_path: /assets/images/archive/openmic.jpg
    title: "Open mic sessions"
    excerpt: "IrRegular meetings every other friday."
    btn_label: "Open Mic"
    btn_class: "btn--info btn--x-large"
    url: /open-mic

---

 header:
  overlay_image: /assets/images/front-image.jpg
  overlay_filter: rgba(38, 38, 38, 0.5)
  caption: "Photo credit: [**Ryunosuke Kikuno**](https://unsplash.com/@kknrynsk_jp?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [**Unsplash**](http://unsplash.com/)"
  actions:
   - label: "Find out more"
     url: /about
     - image_path: /assets/images/team/team.jpg
       title: "Team"
       excerpt: "This is us, researchers at KBSS."
       btn_label: "Meet us"
       url: /team
--->

<!-- - image_path: /assets/images/tutorial.jpg
    title: "Tutorial"
    excerpt: "TermIt solves various problems, from creating vocabularies to annotating resources."
    url: "/tutorial"
    btn_label: "Teach me how"
- image_path: /assets/images/data-model.jpg
    title: "Technical details"
    excerpt: "TermIt architecture, interesting libraries used within, or the data model used within TermIt are some of the technical details of the system."
    btn_label: "Introduce me to the details"
    url: /technical-details

{% include feature_row type="center" %}-->

{% include figure image_path="/assets/images/archive/openmic.jpg" alt="Open mic sessions" %}
[Check open mic sessions]({{ "/open-mic" | relative_url }}){: .btn .btn--info .btn--x--large .align-right} Irregular tech presentations every other friday.

<!-- 

Welcome to the web pages of our group, Knowledge-based and Software Systems Group. Pages are in progress, but below there is a thread of the newest posts, announcing open mic sessions and summing up those already taken. You can also browse through the Projects, Team members and Software we have been developing during past and current research projects. -->

<!-- <ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <br/>{{post.date.day}}
      <br/>{{post.excerpt}}
    </li>
  {% endfor %}
</ul> -->

<!-- {% assign pages=site.pages | where:"lang-ref", page.lang-ref | sort: 'lang' %}
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
--->
