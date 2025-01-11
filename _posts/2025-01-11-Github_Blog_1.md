---
layout: single
title: "[github.io]깃허브 블로그 로컬 개발환경 에러 개선방법"
categories: github.io
tag: [github.io, 깃허브 블로그]
date: 2025-01-11
published: true
toc: true # 목차 생성
author_profile: true # 사용자 프로필
search: true # false로 설정하면 검색시 내용이 뜨지 않는다.
---

안녕하세요, Satomi입니다.
오늘은 깃허브 블로그를 운영하면서 업데이트 내역을 실시간으로 확인하기 위해 로컬 개발환경에서 확인할 때 에러가 발생할 경우, 해결하는 방법 한가지를 기록하고자 합니다.

{% include video id="0TeHUqSAb6Q?si=-VE_dwYyjxeQnfmS" provider="youtube" %}
저는 테디노트님의 영상을 따라서 진행했습니다! 그래서 실시간 업데이트 설정 방법은 위 영상을 참고해주시면 될 것 같습니다 :)

# Jekyll 실행
***
```Ruby
bundle exec jekyll serve
```
위 영상을 보셨다면 ```bundle exec jekyll serve```를 입력하면 로컬 환경에서 실시간 업데이트를 확인해볼 수 있습니다! 하지만 저는 로컬 연결을 끊고 다시 위 명령어를 입력하여 로컬환경을 구동하려고 하면 어째서인지 에러가 발생했습니다.
# _site 디렉토리 삭제
***
```Ruby
Remove-Item -Recurse -Force _site
```
Jekyll의 ```_site``` 디렉토리는 생성된 빌드 파일들을 저장하는 디렉토리 입니다. 이때 빌드 과정 중 잘못된 파일이 포함되어 빌드 에러가 말생할 수 있습니다. 저는 ```Remove-Item -Recurse -Force _site``` 명령을 통해 ```_site``` 디렉토리를 삭제하고 다시 Jekyll을 실행하여 에러를 해결할 수 있었습니다.

   
***


영상을 보면서 잘 따라하다가 갑자기 마주한 에러때문에 당황했었지만, 해결방법을 찾을 수 있어서 다행이었습니다! 혹시나 저와 같은 문제를 마주한 분들에게 도움이 되길 바라며 오늘 기록을 마치겠습니다. 감사합니다 :)