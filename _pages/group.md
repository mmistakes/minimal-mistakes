---
layout: single
permalink: /group/
title: "Group Pages"
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
---

## Group Members

### Current

- Bailey Harrington (PDRA)
- Emma Hobbs (PhD, University of St Andrews)
- Angelika Kiepas (PhD)
- Leighton Pritchard (Chancellor's Fellow, PI)

- Tom Harris (PhD, sup: Arnaud Javelle)
- Tom Hender (PhD, sup: Nick Tucker)

- Yassmeen Ali (MSc, 2022)
- Nora Novak (Carnegie-funded Internship, 2022)
- Areej Obaid (MSc, 2022)
- David Teixeira (SfAM-funded Internship, 2022)

### Former

- Rory McLeod (PhD, University of Dundee)
- Christelle Robert (PhD, 2006-2009, University of Dundee)
- Nick Waters (PhD, 2016-2020, NUI Galway)
- Eirini Xemantilotou (PhD, 2015-2019, University of St Andrews)

- Ramzi Alahmadi (MSc, 2021)
- Amber Minhas (Lister-funded Internship, 2021)
- Kimberley Morsheimer (MSc, 2021)


## General group info

- [Group code of conduct](/group/code_of_conduct)
- [Group philosophy](/group/philosophy)
- [Group responsibilities](/group/responsibilities)
- [Group Python coding style guidelines](/group/python_style)

## PhD student info

- [**Current Opportunities**](/phd/opportunities){: .btn .btn--success}

{% for post in site.categories.PhD %}
- {{ post.date | date_to_string }}: [{{ post.title }}]({{ post.url }})
{% endfor %}
