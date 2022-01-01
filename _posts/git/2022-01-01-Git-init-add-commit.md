---
layout: single
title: "[Git] Git init, add, commit"
categories: Git
tag: [Git, Version Control]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ Git init

```bash
$ > git init
```

### .git?

- **버전 관리를 하게 되면 여러가지 정보가 생성이 되는데, 생성된 정보는 .git에 저장됨**
- .git을 지우면 버전에 대한 정보가 다 날라간다
- 함부로 버전 관리를 하는 .git파일을 삭제하지 말라는 의미임

### vi command

```bash
$ > vi f1.txt # f1.txt라는 파일을 생성
$ > vi f1.txt # 파일 생성 후 확인
$ > cat f1.txt # 파일 확인
```

- **i** : Insert
- **esc** : 입력 종료
- **r** : 재 입력
- **:wq** : 저장 및 종료

### status

```bash
$ > git status

현재 브랜치 master

아직 커밋이 없습니다

추적하지 않는 파일:
  (커밋할 사항에 포함하려면 "git add <파일>..."을 사용하십시오)
	f1.txt

커밋할 사항을 추가하지 않았지만 추적하지 않는 파일이 있습니다 (추적하려면 "git
add"를 사용하십시오)
```

- **추적하지 않는 파일?** - **Untracked files?**
- **깃**에게 해당 파일의 버전 관리를 시작하기 전까지 **깃**은 해당 파일을 무시한다
- 즉, git에게 명령을 하여 해당 위 파일에 대한 버전 관리를 명령해야 한다

## ✔ add

```bash
$ > git add .

warning: LF will be replaced by CRLF in f1.txt.
The file will have its original line endings in your working directory

$ > git st
현재 브랜치 master

아직 커밋이 없습니다

커밋할 변경 사항:
  (스테이지 해제하려면 "git rm --cached <파일>..."을 사용하십시오)
	새 파일:       f1.txt

```

- **add 명령어**를 통해 **깃**에게 모든 파일에 대한 버전 관리 명령
- **status 명령어**를 통해 현재 스테이징에 올라간 파일을 확인할 수 있다

## ✔ commit

```bash
$ > git commit -m "[21.07.03 ymkim] version 1"

[master (최상위-커밋) 75b2bbc] [21.07.03 ymkim] version 1
 1 file changed, 1 insertion(+)
 create mode 100644 f1.txt
```

### 과제 - f2라는 파일을 만들고 commit

- ITerms에서 실습
- **커밋 하나는 하나의 작업을 담고 있는것이 좋다**

### Git Stage Area

- **깃은 Stage Area에 올라와있는 파일만 Commit을 한다**
- **add 명령어를 통해 Stage Area 영역으로 파일을 올린다**
- **stage - repository**

### 참고 자료

- [Git init](https://www.youtube.com/watch?v=fCY1t3QSEhw&list=PLuHgQVnccGMA8iwZwrGyNXCGy2LAAsTXk&index=6)
- [Git add](https://www.youtube.com/watch?v=lQ0AyoCZzns&list=PLuHgQVnccGMA8iwZwrGyNXCGy2LAAsTXk&index=7)
- [Git 버전 만들기](https://www.youtube.com/watch?v=Ybx9JEuu7Hg&list=PLuHgQVnccGMA8iwZwrGyNXCGy2LAAsTXk&index=8)
