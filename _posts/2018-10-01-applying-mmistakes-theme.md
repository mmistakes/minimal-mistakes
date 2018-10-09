---
title: Applying mmistakes in github.io
key: 20181001
tags: mmistakes github
excerpt: "github.io 에서 jekyll mmistakes 구성하기"
toc: true
toc_sticky: true
---

# Summaries

Jekyll 을 이용해서 github 에 블로그를 구성하였다. 여기에 팁을 기록한다.

<!--more-->

# 문서 헤더 작성

모든 Markdown 문서 파일의 시작 지점에 아래와 같이 헤더를 삽입한다.
삽입된 헤더는 jekyll 에서 문서 정보로서 \_data 폴더에서 블로그를 커스터마이징할 때 사용된다.

|name|description|
|:---:|:---:|
|title|문서의 제목 목록에 노출된다.|
|key|날짜를 쓰는데 다른 것을 써도될지도 ... |
|tags|이 문서가 다루는 키워드를 기입|
|excerpt|여기서 처음보긴하는데 |


```markdown
title: "Applying mmistakes in github.io"
key: 20181001
tags: mmistakes github
excerpt: "Foo Bar design system including logo mark, website design, and branding applications."
```


# jekyll 코드 블록 삽입

추가 예정 ... 언젠가는 ??


# Embed Youtube in Markdown

아래와 같이 코드를 마크다운 문서에 입력한다.

```
{% include video id="XsxDH4HcOWA" provider="youtube" %}
```

Sample: 
{% include video id="XsxDH4HcOWA" provider="youtube" %}



# 참조
- [mmistakes' syntax highlighting][1]
- [mmistakes' helpers][2]

<!-- References Link -->
[1]: https://mmistakes.github.io/minimal-mistakes/markup-syntax-highlighting/ ""
[2]: https://mmistakes.github.io/minimal-mistakes/docs/helpers/# "mmistakes' helpers"
