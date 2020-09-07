---
layout: single
title: "Aktuelle Informationen"
permalink: /news/corona-virus/
author_profile: false

modified: 2020-04-28T11:30:00+01:00
header:
  overlay_color: "#fbd49d"
  overlay_image: /assets/images/Aktuelle-Informationen.jpg
sidebar:
  nav: ''
---

**Achtung**: Bitte beachten Sie auch folgende [Hinweise vom SenBJF](https://www.berlin.de/sen/bjf/coronavirus/aktuelles/), unter anderem welche Eltern von systemrelevanten Berufen einen Anspruch auf eine Kinderbetreuung haben.
{: .notice--warning}

{% for post in site.categories.coronavirus %}
---

{{ post.date | date: "%d.%m.%Y %H:%M Uhr" }}

# [§]({{ post.url | absolute_url }}) {{ post.title }}

{{ post.content }}
{% endfor %}
