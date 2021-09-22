---
title: "[Git] GitLab flow"

categories:
  - git
tags:
  - [git,branch,gitlabflow]

toc: true
toc_sticky: true


---

[깃 브랜치 전략](https://chanhyukpark-tech.github.io/git/branch-strategy/)

## GitLab Flow
<br>
![image](https://user-images.githubusercontent.com/69495129/134401020-b090593b-e374-44e1-9a74-5c0bd5797675.png)


A simple alternative to more complex git flow

Use when testing and deployment must take place in two stages due to the nature of the project.

> github flow 는 너무 단순하고, git flow 는 상대적으로 복잡하기때문에 이 두개의 중간점을 찾아서 새롭게 탄생한것이 gitlab flow 입니다.  production 브랜치가 존재하여 커밋한 내용들을 일방적으로 디플로이 하는 형태입니다. pre-production 브랜치는 테스트 브랜치입니다. 개발환경에서 바로 배포하는 것이아닌 사용환경과 동일한 테스트 환경에서 코드를 테스트하는 것입니다. 모바일 앱 개발 시 각종 하드웨어에서 제대로 실행되는지 테스트할 필요가 있다면, pre-production 브랜치를 활용할 수 있습니다.


[참고자료](https://nomad-programmer.tistory.com/39)
***


🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우
언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

  





