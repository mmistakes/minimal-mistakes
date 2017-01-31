---
lang: en
ref: choko
title: "Konstantinos Chorianopoulos"
excerpt: "Software Technologies"
rank: "Assistant Professor"
education:
  - "Diploma in Electronic and Computer Engineering, Technical University of Crete"
  - "MSc. Marketing and Communication, Athens University of Economics and Business"
  - "Ph.D. in Human-Computer Interaction for Digital Television, Athens University of Economics and Business"
interests:
  - "Human-Computer Interaction"
  - "Multimedia"
  - "Software Engineering"
  - "Ubiquitous Computing"
contact:
  tel: "+30 26610 87707"
  email: "choko@ionio.gr"
  web: "http://www.epidro.me"
---

<ul>
{% assign posts=site.faculty | where:"ref", page.ref | sort: 'lang' %}
{% for post in posts %}
  <li>
    <a href="{{ post.url }}" class="{{ post.lang }}">{{ post.lang }}</a>
  </li>
{% endfor %}
