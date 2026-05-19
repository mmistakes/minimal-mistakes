---
layout: single
title: "Site Archive Index"
permalink: /sitemap/
author_profile: false
---

Browse our complete historical catalog of independent geriatric health research, clinical guideposts, and advocacy archives below.

---

### 📚 Complete Research Catalog

{% assign listed_docs = site.documents | sort: "date" | reverse %}
{% for doc in listed_docs %}
  {% if doc.title %}
* **{{ doc.date | date: "%Y-%m-%d" }}** — [{{ doc.title }}]({{ doc.url | relative_url }})
  {% endif %}
{% endfor %}