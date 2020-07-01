---
layout: single
title: "Corona-Virus"
permalink: /news/corona-virus/
author_profile: false
excerpt: "Alles Wichtige über den Corona-Virus und was es für die Grundschule am Brandwerder bedeutet."
modified: 2020-04-28T11:30:00+01:00
header:
  overlay_color: "#fbd49d"
  overlay_image: /assets/images/angry-corona-virus.svg
sidebar:
  nav: ''
---

**Achtung**: Bitte beachten Sie auch folgende [Hinweise vom SenBJF](https://www.berlin.de/sen/bjf/coronavirus/aktuelles/), unter anderem welche Eltern von systemrelevanten Berufen einen Anspruch auf eine Kinderbetreuung haben.
{: .notice--warning}

{% for post in site.categories.coronavirus %}
---

{{ post.date | date: "%d.%m.%Y %H:%M Uhr" }}

# [§]({{ post.url }}) {{ post.title }}

{{ post.content }}
{% endfor %}
