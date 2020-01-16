---
title: Jekyll, 마크다운 문법에서 다른 문서 include 하기

categories: 
   - Github.io
   
tags:
   - markdown
   - jekyll
   - include
   
author_profile: true <!-- 작성자 프로필 출력여부 -->
read_time: true <!-- read_time을 출력할지 여부 1min read 같은것! -->

toc: true <!-- Table Of Contents 목차 보여줌 -->
toc_label: My Table of Contents # toc 이름 정의
<!-- toc_icon: "cog" # font Awesome아이콘으로 toc 아이콘 설정 -->
toc_sticky: true # 스크롤 내릴때 같이 내려가는 목차

date: 2020-01-16T17:49:00 <!-- 최초 생성일 -->
last_modified_at: 2020-01-16T17:49:00 <!-- 마지막 수정일 -->

comments: true <!-- 댓글 시스템 사용 -->
---

<!-- intro -->
{% include intro %}

# 들어가며
블로그를 만든 뒤 3개, 4개 정도의 포스트를 쓰다 보니, 상당히 많은 코드(?), 부분이 중복됨을 확인 할 수 있었다.
이를 해결할 수 있는 방식을 찾다보니 **미리 만들어 놓은 코드를 해당 마크 다운 문서에 include 하는 방식**을 찾을 수 있었다.
이를 이용하여, 자주 사용하는 말 `인트로 인사말`, `자주 사용하는 문법`을 미리 문서화 시켜 필요할 때마다 파라미터로 넘겨줌으로 사용할 수 있었다.
지금 본 포스트에 존재하는 인트로도 해당 방법을 통해 구현하였다.

# How to?
1.  자신이 사용하고자 하는 문서를 `_includes` 폴더에 저장한다.
``` markdown
해당 블로그는 개인이 공부하고, 정리한 걸 기록하는 공간입니다.<br>
**오타, 오류**가 존재할 수 있습니다. 댓글을 달아주시면 수정할 수 있도록 하겠습니다.
{: .notice--primary}
```
이 부분을 `intro`라는 이름으로 `_includes/intro`로 저장한다.
그런 다음, 자신이 사용하고 싶은 문서에 `{% include intro %}`를 붙여넣기만 하면 된다.

{% include intro %}

만약, 포함하려는 문서에 인자를 넘겨주고 싶은 경우엔, 변수명을 선언한 뒤 넘겨주면 해당 변수명으로 매핑되어 넘어간다.
``` html
<figure>
	<div class="notice--info">
		<span style="background-color:yellow">
			<big><b>{{ include.title }}</b></big>
		</span>
		<big>{{ include.content | markdownify }}</big>
	</div>
</figure>
```

이렇게 문서를 작성해서 `_includes/notice_info.html`로 생성한다.
이 문서를 부르기 위해서는 파라미터를 넣어줘야 하는데, 해당 변수명과 동일하게 넣어 주면 된다.

```markdown
{% capture content %}
안녕하세요.
테스트 해보겠습니다.
include 할 땐, 문서의 확장자도 적어줘야 합니다.
{% endcapture %}

{% include notice_info.html title="테스트 제목" content=content %}
```
`{% capture content %}`[^1]란?

{% capture content %}
안녕하세요.
테스트 해보겠습니다.
include 할 땐, 문서의 확장자도 적어줘야 합니다.
{% endcapture %}

{% include notice_info.html  title="테스트 제목" content=content %}

이렇게 저장해 둔 문서나 문법을 언제든지 불러서 편하게 사용할 수 있다.

[^1]:  해당 범위 안에 존재하는 문자열을 캡쳐해서, 변수처럼 사용할 수 있다.

## reference
- [jekyllrb](https://jekyllrb-ko.github.io/docs/includes/)

