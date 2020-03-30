---
title: "Posts by Yet"
permalink: /yet/
layout: archive
author_profile: true
---

{{ content }}

{% for post in page.isPostYet %}

	{% if post %}

	<section class="taxonomy__section">

	<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

	</section>

	{% endfor %}

{% endfor %}
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQ0MzUzOTg1NywtNDcwODE1NjEyXX0=
-->