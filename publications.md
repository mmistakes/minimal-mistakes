---
title: "Publications"
layout: single
permalink: /publications/
---
---
{% for p in site.data.publications %}
{% if p.selected %}
**{{ p.title }}**  
{{ p.authors }}  
*{{ p.venue }}*  
{% if p.url_pdf %}[PDF]({{ p.url_pdf }}){% endif %}{% if p.url_code %} | [Code]({{ p.url_code }}){% endif %}

{% endif %}
{% endfor %}
