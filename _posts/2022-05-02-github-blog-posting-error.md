---
title:  "깃허브 블로그 Liquid tag 관련 포스팅 오류"
excerpt: "liquid syntax error : unknown tag 'url' 에러"
categories:
- Error
tags:
- [jekyll, liquid tag]
last_modified_at: 2022-05-02
---
<br>

## 문제 상황 
첫번째로 만난 문제는 `_posts`에 추가한 `.md`파일이 실제 내 블로그에 보이지 않았다. 구글링 해보니 `jekyll build --verbose` 로 오류 메시지를 확인해보고 해결하는 것 같았다. 이는 서버를 구동하지 않고 빌드만 시키는데, 빌드 과정 로그를 표시하면서 빌드하라는 코드이다. 코드를 입력하고 로그를 확인해보니 아래처럼 에러 메시지가 표시됐다. 

```shell
Liquid Exception: Liquid syntax error (line 340): Unknown tag 'url' in C:/git/ssbinn.github.io/_posts/[파일명].md
```
<br>

## Liquid tag와 해결방법
먼저 Liquid syntax, Liquid tag가 뭔지 알아보았다. Ruby 언어로 만들어진 jekell에서 템플릿을 표현하기 위한 언어가 Liquid tag이고, Liquid tag는 `{% raw %}{%{% endraw %}`와 `{% raw %}%}{% endraw %}`로 이루어진 태그로 그 안에 프로그래밍 언어를 작성해 템플릿을 생성한다. 

오류에서 알려주는 마크다운 파일에 `{% raw %}{%{% endraw %}`와 `{% raw %}%}{% endraw %}`가 포함되어 있었고, 그 부분을 삭제하고 `jekyll build --verbose` 해보니 오류 메시지가 나타나지 않았다. 소스코드로 감싼 부분이더라도 화면에 렌더링되기 전에 템플릿 엔진이 먼저 파싱을 하면서 해당 부분을 일반 텍스트가 아닌 Liquid tag로 인식한 것이다. 따라서 일반 텍스트라고 지정해주기 위해 샘플 코드가 있는 부분 위와 아래에 raw와 endraw Liquid tag로 감싸주어 해결했다. 이렇게 하면 jekyll 빌드 시 구문 분석 없이 페이지에 Liquid 코드를 출력할 수 있다.

```HTML
<!-- templates/home.html - 검색창을 둔 메인페이지 -->
<form class="w-full max-w-xl" method="get" action="{% raw %}{% url 'apps:search' %}{% endraw %}">
    <input name="q" class="search-bar" placeholder="찾고 싶은 앱을 검색해보세요." />
</form> 
<!-- 생략 -->
```
<br>

## 참고
- [Liquid](https://shopify.dev/api/liquid)
- [Liquid Tag raw](https://shopify.dev/api/liquid/tags/theme-tags#raw)
- https://ivorycirrus.github.io/TIL/jekyll-liquid-tag-error/