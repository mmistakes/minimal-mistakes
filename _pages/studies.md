---
title: "Studies"
layout: page  # single → page로 변경
permalink: /studies/
author_profile: true
pagination: false
---

## 📚 Academic Studies

학업 관련 내용을 정리한 공간입니다.

### 방송대 (Korea National Open University)
- [Computer Science](/categories/study-knou-cs/)
- [Statistics](/categories/study-knou-stats/)

### OMSCS (Online Master of Science in CS)
- [Machine Learning](/categories/study-omscs-ml/)
- [Systems](/categories/study-omscs-systems/)

---

<div class="entries-list">
{% assign study_posts = site.categories['Studies'] %}
{% for post in study_posts limit:10 %}
  {% include archive-single.html %}
{% endfor %}
</div>
