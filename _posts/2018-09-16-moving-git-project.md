---
title: moving git project from old repository to new one
key: 20180916
tags: git move
---

새로운 계정으로 repository 를 옮긴다.

<!--more-->

1) 현재 설정된 계정 정보 변경 하기
git 자격 증명 바꾸기 (반드시 해야함)
http://recoveryman.tistory.com/392

2) git 설정하기
```
git remote set-url --push origin https://github.com/새로옮겨갈주소/새이름.git
git push --mirror
```

---

If you like the essay, don't forget to give me a start :star2:.

<iframe src="https://ghbtns.com/github-btn.html?user=gbkim1988&repo=gbkim1988.github.io&type=star&count=true"  frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
