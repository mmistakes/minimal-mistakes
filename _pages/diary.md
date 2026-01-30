---
title: "Diary"
layout: single
permalink: /diary/
author_profile: true
pagination: false
---

## 📔 My Personal Diary

일상의 기록과 생각들을 공유하는 공간입니다.

### Categories

- [일상 (Daily Life)](/categories/diary-daily/)
- [Baking](/categories/diary-baking/)
- [Life in Australia](/categories/diary-australia/)

---

<div class="entries-list">
{% assign diary_posts = site.categories['Diary'] %}
{% for post in diary_posts limit:10 %}
  {% include archive-single.html %}
{% endfor %}
</div>
