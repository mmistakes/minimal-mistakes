---
layout: single
permalink: /group/student_pages/
title: "Student Pages"
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
---

Please see the [Group Responsibilities page](/group/responsibilities).

## General student info

{% for post in site.categories.Student %}
- {{ post.date | date_to_string }}: [{{ post.title }}]({{ post.url }})
{% endfor %}

## PhD student info

- [**Current Opportunities**](/phd/opportunities){: .btn .btn--success}

{% for post in site.categories.PhD %}
- {{ post.date | date_to_string }}: [{{ post.title }}]({{ post.url }})
{% endfor %}

- [How to survive a PhD viva: 17 top tips](https://www.theguardian.com/higher-education-network/2015/jan/08/how-to-survive-a-phd-viva-17-top-tips)
- [5 tips for passing your PhD viva](https://www.prospects.ac.uk/postgraduate-study/phd-study/5-tips-for-passing-your-phd-viva)
- [Dr Jill's top ten viva tips (pass your PhD oral exam)](https://www.space-policy.com/dr-jills-viva-tips-pass-your-phd-oral-exam/)
- [Kearns & Gardiner "The care and maintenance of your adviser" (2011) *Nature* doi:10.1038/nj7331-570a](https://www.nature.com/naturejobs/science/articles/10.1038/nj7331-570a)

# External links

- [University of Strathclyde Academic Support](https://www.strath.ac.uk/studywithus/strathlife/academicsupport/)