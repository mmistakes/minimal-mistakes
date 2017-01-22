---
permalink: /projects/
---

{% for project in site.projects %}
* [{{ project.title }}]({{project.url}}){: .notice--success}
{% endfor %}
-----------------------

{% for project in site.projects %}
# [{{ project.title }}]({{project.url}})
***
{{project.content}}
{% endfor %}

