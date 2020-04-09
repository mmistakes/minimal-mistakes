---
title: 심플한 포스트 포맷
layout: single
comments: true
categories:
    - Github Blog
---

포스팅 할 때 사용할 심플하고 예쁜 포스팅 포맷 정리. minimal-mistakes 기본 테마의 test 폴더 안에 있는 포스트 중 선택.

```yaml
search: false
# 코드: yaml
```

**Note:** `search: false` only works to exclude posts when using **Lunr** as a search provider.
{: .notice--info}

위의 문구는 `{: .notice--info}` 이용해서 표기할 수 있고, notice 기능 이용한 하이라이트 기능의 일종.
링크 연결하고 싶으면 대괄호(`[...]`) 안에 링크 연결할 문구를 쓰고, 소괄호 이용해서 링크 입력하면 된다.

[Post with Images](https://enidanny.github.io/markup-more-images/)