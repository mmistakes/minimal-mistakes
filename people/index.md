---
layout: page
title: Lab members
tags: [members, people]
modified: 
comments: false
image:
  feature: bar-network.png
---

{::options parse_block_html="true" /}
{% for member in site.data.authors %}
* [{{ member[1].name }}](mailto: {{member[1].email}})
  : _{{ member[1].title}}_
  : {{ member[1].bio_long }}

{% comment %}
{% if member[1].avatar contains 'http' %}
![]({{ member[1].avatar }})
{% else %}
![]({{ site.url }}/images/{{ member[1].avatar }})
{% endif %}
{% endcomment %}

{% endfor %}