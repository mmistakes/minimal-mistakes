---
layout: single
title: "[Git] Git log, diff"
categories: Git
tag: [Git, Version Control]
toc: true
author_profile: false
# sidebar:
#   nav: "docs"
---

## ✔ git log

- git log의 기본적인 문법은 아래와 같다

```bash
$ > git log [<option>] [<revision range>] [[--] <path>]
$ > git log # 커밋 내용 확인

commit d32e90af0a1a72df99f67f4d464c04f6e78bf61f (HEAD -> master)
Author: youngminkim <youngmin1085@gmail.com>
Date:   Sat Jul 3 19:11:21 2021 +0900

    [21.07.03 ymkim] f1, f2.txt 파일 수정

commit fe4b47ab873472ba630a1c7369513385d9845fa4
Author: youngminkim <youngmin1085@gmail.com>
Date:   Sat Jul 3 19:06:38 2021 +0900

    [21.07.03 ymkim] f2.txt 파일 추가 version 3

commit c7bed3fbad6ff1463451a7d38c9d18aa40bc23d3
Author: youngminkim <youngmin1085@gmail.com>
Date:   Sat Jul 3 19:04:59 2021 +0900

    [21.07.03 ymkim] version 2

commit 75b2bbcc57c1e22e17253e2d75c092fa23c08c71
Author: youngminkim <youngmin1085@gmail.com>
Date:   Sat Jul 3 19:02:38 2021 +0900

    [21.07.03 ymkim] version 1
```

- log 명령어를 통해 커밋된 파일 내역 확인

```bash
$ > git log -p

commit d32e90af0a1a72df99f67f4d464c04f6e78bf61f (HEAD -> master)
Author: youngminkim <youngmin1085@gmail.com>
Date:   Sat Jul 3 19:11:21 2021 +0900

    [21.07.03 ymkim] f1, f2.txt 파일 수정

diff --git a/f1.txt b/f1.txt
index 2456b16..1d7ef62 100644
--- a/f1.txt
+++ b/f1.txt
@@ -1 +1 @@
-source : 2
+f1.txt : 4
diff --git a/f2.txt b/f2.txt
index 1112d9f..ed48ea0 100644
--- a/f2.txt
+++ b/f2.txt
@@ -1 +1 @@
-f2 파일 생성 v.1
+f2.txt : 2

commit fe4b47ab873472ba630a1c7369513385d9845fa4
Author: youngminkim <youngmin1085@gmail.com>
Date:   Sat Jul 3 19:06:38 2021 +0900

    [21.07.03 ymkim] f2.txt 파일 추가 version 3

diff --git a/f2.txt b/f2.txt
new file mode 100644
index 0000000..1112d9f
--- /dev/null
```

- 각각의 **커밋과 커밋 사이**의 **소스 차이**를 알 수 있다
- 각각의 **커밋**이 가지는 고유한 값은 **해쉬(Hash)값**이다.
- **해쉬값**을 통해 Rebase, Reset를 활용하여 이전 버전으로 돌아갈 수 있다

### 참고 자료

- [Git log, diff](https://www.youtube.com/watch?v=Qp927R-Xu1c&list=PLuHgQVnccGMA8iwZwrGyNXCGy2LAAsTXk&index=10)
