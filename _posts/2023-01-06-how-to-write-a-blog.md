---

layout: post 

title:  "Welcome to Jekyll!" 

---

# Welcome 

**Hello world**, this is my first Jekyll blog post. 

I hope you like it!



---

 title: title here... 

date: 2018-01-01 

tags:  - javascript  - ES6 

keywords:  - keyword1  - keyword2 

---

... Content here ...







PDF 다운로드 링크를 삽입:

.. you can [get the PDF](/assets/mydoc.pdf) directly.







## 포스트 목록 표시하기[Permalink](https://jekyllrb-ko.github.io/docs/posts/#포스트-목록-표시하기)

<ul>  {% for post in site.posts %}    <li>      <a href="{{ post.url }}">{{ post.title }}</a>    </li>  {% endfor %} </ul>







[Setup | Jekyll • Simple, blog-aware, static sites (jekyllrb.com)](https://jekyllrb.com/docs/step-by-step/01-setup/)



[Command Line Usage | Jekyll • Simple, blog-aware, static sites (jekyllrb.com)](https://jekyllrb.com/docs/usage/)



[포스트 | Jekyll • 심플한, 블로그 지향적, 정적 사이트 (jekyllrb-ko.github.io)](https://jekyllrb-ko.github.io/docs/posts/)



[Liquid | Jekyll • Simple, blog-aware, static sites (jekyllrb.com)](https://jekyllrb.com/docs/liquid/)



[변수 | Jekyll • 심플한, 블로그 지향적, 정적 사이트 (jekyllrb-ko.github.io)](https://jekyllrb-ko.github.io/docs/variables/)



[문제해결 | Jekyll • 심플한, 블로그 지향적, 정적 사이트 (jekyllrb-ko.github.io)](https://jekyllrb-ko.github.io/docs/troubleshooting/)





## 카테고리와 태그

---

layout: post 

title: A Trip 

categories: [blog, travel] 

tags: [hot, summer] 

---





초안을 포함해서 사이트를 미리보기 하려면

, `jekyll serve` 나 `jekyll build` 명령에 

`--drafts` 스위치를 추가해서 실행







