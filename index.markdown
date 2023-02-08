---
layout: splash
author_profile: false
lang: en
classes: wide
lang-ref: index
excerpt: ""

header:
 overlay_image: /assets/images/front-page.jpg
 overlay_filter: rgba(38, 38, 38, 0.5)
 caption: "Photo credit: [**Scott Webb**](https://unsplash.com/@scottweb?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [**Unsplash**](http://unsplash.com/)"

feature_row:
  - image_path: /assets/images/research/research2-thumb.jpg
    excerpt: "Research is the main focus of the group."
    btn_label: "Research"
    btn_class: "btn--info"
    url: /research
  - image_path: /assets/images/teaching/teaching3-thumb.jpg #https://unsplash.com/@jdiegoph Diego PH
    #title: "Teaching"
    excerpt: "Subjects and thesis topics."
    btn_label: "Teaching"
    btn_class: "btn--info"
    url: /teaching
  - image_path: /assets/images/archive/openmic-thumb.jpg
    #title: "Open mic sessions"
    excerpt: "Tech presentations taking place every other Friday."
    btn_label: "Open Mic"
    btn_class: "btn--info"
    url: /open-mic
---
<!--
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
    url: /technical-details-->

We are the Knowledge-based and Software Systems Group - a research group located at the [Department of Computer Science](https://cs.felk.cvut.cz/), [Faculty of Electrical Engineering](https://fel.cvut.cz/en/) of the Czech Technical University in Prague.

We focus on the research and development of knowledge-based information systems using Semantic Web technologies.

{% include feature_row %}

<h3 class="archive__subtitle">{{ site.data.ui-text[site.locale].recent_posts | default: "Recent Posts" }}</h3>

{% if paginator %}
  {% assign posts = paginator.posts %}
{% else %}
  {% assign posts = site.posts %}
{% endif %}

{% assign entries_layout = page.entries_layout | default: 'list' %}
<div class="entries-{{ entries_layout }}">
  {% for post in posts %}
    {% include archive-single.html type=entries_layout %}
  {% endfor %}
</div>

{% include paginator.html %}

<!--
{% include figure image_path="/assets/images/archive/openmic.jpg" alt="Open mic sessions" %}
[Check open mic sessions]({{ "/open-mic" | relative_url }}){: .btn .btn--info .btn--x--large .align-right} Irregular tech presentations every other friday. -->

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
