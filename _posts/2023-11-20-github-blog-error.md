---
layout: single
title: '깃허브 블로그 생성 과정 Jekyll 오류 모음'
author_profile: false
published: true
sidebar:
    nav: "counts"
---

_minimal-mistakes 기반 github blog를 만들면서 생기는 오류들을 추가할 예정_

---
## 1. 댓글 설정 - disqus shortname 

- Setting -> General 에 들어가면 shotrname을 확인 할 수 있다.
- Website Name 이 **git.blog** 면 Shorname 은 **git-blog** 로 표시된다. 

![](https://velog.velcdn.com/images/jyunxx/post/56cc4756-0443-4950-ba01-515086d812b2/image.png)


## 2. Timezone 

![](https://velog.velcdn.com/images/jyunxx/post/240013a5-d70a-474c-9d39-25d46352b73b/image.png)

### 첫 번째 시도 : tzinfo, tzinfo-data 설치 

tzinfo 설치 

```python
gem install tzinfo 설치 

```
tzinfo-data 설치
```python
gem install tzinfo-data


```

설치 후  jekyll serve 실행 

```python
bundle exec jekyll serve 
```

#### ❗ 여전히 동일한 오류 발생 
>If you've run Jekyll with `bundle exec`, ensure that you have included the tzinfo gem in your Gemfile as well. 

---

###  두번째 시도 : Gemfile 파일 tzinfo 내용 추가 

1. Gemfile 파일 열기
![](https://velog.velcdn.com/images/jyunxx/post/772d626b-560b-4e3f-8332-fd692e1468bf/image.png)

2. 내용 수정

```python
gem 'tzinfo'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]
```

![](https://velog.velcdn.com/images/jyunxx/post/b91b6538-382b-4921-949a-772fffc26964/image.png)


**❕오류 해결 **

---

출처 : <a href='https://luvery93.github.io/articles/2017-08/Jekyll-Build-error-tzinfo-dependency'>Jekyll 빌드 오류 - tzinfo 종속성</a> , <a href = 'https://jennysgap.tistory.com/entry/Github-Pages-04-%ED%83%80%EC%9E%84%EC%A1%B4-%EA%B4%80%EB%A6%AC'> 타임존 관리</a>

----

## 3. LaTeX 수식 문법 

- 문제 상황 : **$$ LaTeX 수식 $$** 으로 표기시 올바르게 표시가 안되는 경우 발생

- 해결 방법 : mathjax-support.html의 코드 수정



```html

        tex2jax: {
          inlineMath: [ ['$','$'], ["\\(","\\)"] ],
          displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
        processEscapes: true,
      }

```

## 4. breadcrumbs 한글 깨짐 현상 

- 문제 상황 : 포스트 상단 계층구조 표시 부분에서 한국어 깨짐 현상 발생  

![](https://velog.velcdn.com/images/jyunxx/post/d09eef23-3c4c-453c-9a06-711b67ca2f57/image.png)

- 해결 방법 :  breadcrumbs.html 에서 각 crumb을 디코딩한 변수를 만들도록 수정 


```html
<nav class="breadcrumbs">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    
    <!--디코딩된 Crumb 변수 생성-->
    {% assign crumbs = page.url | split: '/' %}
    {% assign i = 1 %}
    {% for crumb in crumbs offset: 1 %}
      {% assign decoded_crumb = crumb | url_decode %}
      {% if forloop.first %}
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <a href="{{ '/' | relative_url }}" itemprop="item"><span itemprop="name">{{ site.data.ui-text[site.locale].breadcrumb_home_label | default: "Home" }}</span></a>
          <meta itemprop="position" content="{{ i }}" />
        </li>
        <span class="sep">{{ site.data.ui-text[site.locale].breadcrumb_separator | default: "/" }}</span>
      {% endif %}
      {% if forloop.last %}
        <li class="current">{{ decoded_crumb }}</li>
      {% else %}
        {% assign i = i | plus: 1 %}
        <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
          <a href="{{ decoded_crumb | downcase | replace: ' ', '-' | prepend: path_type | prepend: crumb_path | relative_url }}" itemprop="item">
            <span itemprop="name">{{ decoded_crumb | replace: '-', ' ' | replace: '%20', ' ' | capitalize }}</span>
          </a>
          <meta itemprop="position" content="{{ i }}" />
        </li>
        <span class="sep">{{ site.data.ui-text[site.locale].breadcrumb_separator | default: "/" }}</span>
      {% endif %}
    {% endfor %}
  </ol>
</nav>

```

- 결과

![](https://velog.velcdn.com/images/jyunxx/post/df2fffe0-ac23-4f8c-a512-3536515dbbfa/image.png)


