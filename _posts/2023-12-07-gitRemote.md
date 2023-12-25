---
layout: single
title:  "[Github] 원격저장소 URL 변경"
categories: [git]
tag: [github, git] 
author_profile: false
---
## Git 원격 리포지토리 URL 변경.
기존에 있던 원격 주소 변경하기 위해서는, 우선 로컬 인텔리제이 터미널 창에서 
<span style="background-color:#fff5b1">  git remote -v </span> 명령어로
현재 해당 로컬의  원격 URL 리포지토리를 확인할수있다.

```
git remote -v

# origin  https://github.com/minwoo-jeon/Java_study.git (fetch)
# origin  https://github.com/minwoo-jeon/Java_study.git (push)
```

확인 후 <mark style='background-color: #ffdce0'>  git remote set-url origin <새로운 원격 저장소 주소> </mark>
  를 입력하면 원격 저장소 주소가 변경된다.

  ```
  git remote set-url origin https://github.com/minwoo-jeon/변경할주소.git
  ```