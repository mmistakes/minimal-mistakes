---
title: "Projects"
layout: single
permalink: /projects/
author_profile: true
---

## 🚀 My Projects

실전 프로젝트와 데모들을 모아놓은 곳입니다.

### Categories

- [Kaggle Competitions](/categories/project-kaggle/)
- [Colab Demos](/categories/project-colab/)
- [NLP Projects](/categories/project-nlp/)

---

<div class="entries-list">
{% assign project_posts = site.categories['Projects'] %}
{% for post in project_posts %}
  {% include archive-single.html type="grid" %}
{% endfor %}
</div>
