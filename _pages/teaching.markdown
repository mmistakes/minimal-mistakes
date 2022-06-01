---
layout: single
title: Teaching
permalink: /teaching
lang: en
lang-ref: teaching
author_profile: true
toc: true
toc_sticky: true


header:
  image: /assets/images/teaching/teaching.jpg
  caption: "Photo credit: [**Diego PH**](https://unsplash.com/@jdiegoph?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [**Unsplash**](http://unsplash.com/)"

---

<!-- semester is named as b{{ curentYear }}1 or 2 (winter or summer). Current year begins in september and ends in august (e.g. june 22 has currentyear 21) -->
{% capture currentMonth %}
  {{ 'now' | date: '%m' }}
{% endcapture %}
{% assign currentMonth = currentMonth | plus: 0 %}
{% capture currentYear %}
  {{ 'now' | date: '%y' }}
{% endcapture %}
{% if currentMonth < 9 %}
  {% assign currentYear = currentYear | minus: 1 %}
{% endif %}

<!-- Beginning of text -->

Semantic Web and Enterprise architectures are the main focus of our group that reflects in our offered topics for [bachelor and master thesis](#bachelor-and-master-theses) and our [main teaching activities](#main-teaching-activities). In addition, we [participate in the teaching](#support-teaching-activities) of Software Architectures and Database systems.

## Main teaching activities

We are guarantees of following subjects.

###  Ontologies and Semantic Web (b4m36osw)

The course guides students through current trends and technologies in the semantic web field. Takes place in the winter semester.

[Subject description from the faculty web](https://fel.cvut.cz/en/education/bk/predmety/58/33/p5833706.html){: .btn .btn--info}
[Details for students at CourseWare](https://cw.fel.cvut.cz/b{{ currentYear }}1/courses/b4m36osw/start){: .btn .btn--info}

### Enterprise Architecture (b6b36ear)

The course offers an overview of enterprise system architectures, focusing on Spring and Java EE. Takes place in the winter semester.

[Subject description from the faculty web](https://fel.cvut.cz/en/education/bk/predmety/58/33/p5833906.html){: .btn .btn--info}
[Details for students at CourseWare](https://cw.fel.cvut.cz/b{{ currentYear }}1/courses/b6b36ear/start){: .btn .btn--info}

## Support teaching activities

In the following subjects, we just help with teaching, subjects are guaranteed by someone else.

### Software architectures (be4m36swa)

In this course students become familiar with the general requirements for software architecture and related quality parameters that are monitored by software architectures. Takes place in summer semester.

[Subject description from the faculty web](https://fel.cvut.cz/en/education/bk/predmety/48/79/p4879206){: .btn .btn--info}

### Database systems (b0b36dbs)

The course is designed as a basic database course mainly aimed at the student ability to design a relational data model and to use the SQL language for data definition as well as for data querying and to choose the appropriate degree of transaction isolation. Takes place in summer semester.

[Subject description from the faculty web](https://fel.cvut.cz/en/education/bk/predmety/50/10/p5010606.html){: .btn .btn--info}
[Details for students at CourseWare](https://cw.fel.cvut.cz/b{{ currentYear }}1/courses/b0b36dbs/start){: .btn .btn--info}

## Bachelor and master theses

Topics for student theses are published in the [BPMPC system](https://bpmpc.feld.cvut.cz/dsfel/app/semesterprojecttopic/index.xhtml?all=true&department=14%2C&study=&field=&page=0&filter=), where it may be filtered by title, supervisor etc.
