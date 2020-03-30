---
title: "Posts by Yet"
permalink: /yet/
layout: archive
author_profile: true
---

{% for post in page.isPostYet %}
	{% if post %}
		<section class="taxonomy__section">
			<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>
		</section>
	{% endif %}
{% endfor %}
