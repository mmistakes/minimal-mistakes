---
layout: splash
title: "Our Team"
permalink: /team/
collection: team
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/images/ourteam-header2034x444-1.jpg
---

<html>
{% for member in site.team %}
    {% include team_member.html member=member %}
{% endfor %}
</html>