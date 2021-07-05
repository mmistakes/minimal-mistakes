---
title: "Git & Github 입문"
excerpt: ""

categories:
  - Git
tags:
  - Git 기초
toc: true
toc_label: "목차"
published: false
---

## 1. 깃 시작하기

### 1.1 깃으로 할 수 있는 것

1. 버전 관리
   깃은 문서를 수정할 때마다 언제 수정했는지, 어떤 것을 변경했는지 편하고 구체적으로 기록하기 위한 버전 관리 시스템이다.
2. 백업하기
   작업을 하다 보면 백업이 아주 필수적인데 깃은 이러한 백업을 담당한다. 깃 파일을 저장하기 위한 온라인 저장소가 바로 깃허브이다.
3. 협업하기
   깃은 협업 과정에서 일어날 수 있는 여러 문제를 중간에서 정리해 주는 기능을 한다.

버전 관리 -> 백업 -> 협업 순으로 진행

### 1.2 깃 프로그램의 종류

자동차라는 제품군안에 여러 자동차가 있듯이 깃 또한 여러 프로그램이 존재한다.

- 깃허브 데스크톱
  깃허브에서 제공하는 프로그램으로 사용이 쉽지만 기본 기능 위주로 되어있다.

- 토터스깃
  윈도우 전용 프로그램

- 소스트리
  깃의 기본 기능부터 고급 기능까지 사용할 수 있는 프로그램

## 2. 깃으로 버전 관리하기

### 2.1 깃 저장소 만들기

#### 깃 초기화하기 - git init

`git init`은 깃을 사용할 수 있도록 디렉토리를 초기화한다. 그러면 디렉토리 안에 .git이라는 또 다른 디렉토리가 생성된다. 이 디렉토리가 깃을 사용하면서 버전이 저장될 저장소이다.

`git init 디렉터리명`으로 새로운 디렉터리를 만듦과 동시에 초기화를 할 수 있다.

### 2.2 버전 만들기

#### 깃에서 버전이란?

원래 파일 이름은 유지하면서 파일에서 무엇을 변경했는지를 변경 시점마다 저장할 수 있다. 또 각 버전마다 작업했던 내용을 확인할 수 있고, 그 버전으로 되돌아갈 수도 있다.

#### 스테이지와 커밋 이해하기

- 작업트리
  작업 디렉토리라고도 하며, 우리 눈에 보이는 디렉터리가 바로 작업 트리이다.

- 스테이지
  스테이징 영역이라고도 하며, 버전으로 만들 파일이 대기하는 곳이다.

- 저장소
  리포지토리라고도 하며, 스테이지에서 대기하고 있던 파일들을 버전으로 만들어 저장하는 곳이다.

##### 깃이 버전을 만드는 과정

1. 작업트리에서 문서를 수정

```bash
$ vim hello.txt
```

2. 수정한 파일 중 버전으로 만들고 싶은 것을 스테이지에 저장

```bash
$ git staus
$ git add hello.txt
```

3. 스테이지에 있던 파일을 저장소로 커밋

```bash
$ git commit -m "message1"
```

한 번 커밋한 파일이라면 스테이징과 커밋을 한꺼번에 처리

```bash
$ git commit -am "message2"
```

### 2.3 커밋 내용 확인하기

#### 커밋 기록 자세히 살펴보기 - git log

`git log` 명령을 통해 커밋했던 기록을 살펴볼 수 있다.

`git log --oneline`을 통해 한 줄에 한 커밋씩 나타내어 커밋을 간략하게 확인할 수 있다.


```
$ git log
commit b0faf2810b0e9610a1b99e505ad8574a5fd0639d (HEAD -> main)
Author: Geonwoo <kgw7401@gmail.com>
Date:   Mon Jun 28 13:43:46 2021 +0900

    message2

commit 36acf41e8fde14b8945fdb406dff909497c46def
Author: Geonwoo <kgw7401@gmail.com>
Date:   Mon Jun 28 13:42:09 2021 +0900

    message1

```

#### 변경 사항 확인하기

`git diff` 명령을 통해 작업 트리에 있는 파일과 스테이지에 있는 파일을 비교하거나, 스테이지에 있는 파일과 저장소에 있는 최신 커밋을 비교해서 검토할 수 있다.

```
$ git diff
warning: LF will be replaced by CRLF in hello.txt.
The file will have its original line endings in your working directory
diff --git a/hello.txt b/hello.txt
index 25f1da9..b082516 100644
--- a/hello.txt
+++ b/hello.txt
@@ -1,2 +1,2 @@
 hello git1
-hello git2
+2
```

### 2.4 버전 만드는 단계마다 파일 상태 알아보기

#### tracked 파일과 untracked 파일

깃에서는 버전을 만드는 각 단계마다 파일 상태를 다르게 표시한다. 그래서 파일의 상태를 이해하면 이 파일이 버전 관리의 어느 단계에 있는지, 그 상태에서는 어떤 일을 할 수 있는지 알 수 있다.

hello.txt 파일을 수정하고 hello2.txt 파일을 새로 추가해보자.

```
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   hello.txt

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        hello2.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

① 깃은 한번이라도 커밋을 한 파일의 수정 여부를 계속 추적한다. 깃이 추적하고 있다는 뜻에서 이를 **tracked** 파일이라고 한다.

② 한 번도 깃에서 버전관리를 하지 않은 파일을 **untracked** 파일이라고 한다.

※ `git add .`을 사용하면 작업 트리에서 수정한 파일들을 모두 스테이지에 올릴 수 있다.

`git log --stat` 명령어를 사용하면 커밋에 관련된 파일까지 살펴볼 수 있다.

```
$ git log --stat
commit 1c4499e0b7bea3b1f0b6807768e1eb23dbf6bfc8 (HEAD -> main)
Author: Geonwoo <kgw7401@gmail.com>
Date:   Mon Jun 28 14:19:12 2021 +0900

    message3

 hello.txt  | 5 +++--
 hello2.txt | 4 ++++
 2 files changed, 7 insertions(+), 2 deletions(-)

commit b0faf2810b0e9610a1b99e505ad8574a5fd0639d
Author: Geonwoo <kgw7401@gmail.com>
Date:   Mon Jun 28 13:43:46 2021 +0900

    message2

 hello.txt | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)

commit 36acf41e8fde14b8945fdb406dff909497c46def
Author: Geonwoo <kgw7401@gmail.com>
Date:   Mon Jun 28 13:42:09 2021 +0900
```

※ .gitignore 파일로 버전 관리에서 제외하기

버전 관리 중인 디렉터리 안에 버전 관리를 하지 않을 특정 파일이나 디렉터리가 이다면 .gitignore 파일안에 이름이나 확장자를 입력하면 된다.

#### unmodified, modified, staged 상태

`git status`를 입력했을 때 `nothing to commit, working tree clean` 라고 나타나면 현재 작업 트리에 있는 모든 파일의 상태는 **unmodified**, 즉 수정되지 않은 상태이다.

파일을 수정한 다시 `git status`를 입력했을 때
`Changes not staged for commit:` 라는 메세지가 나타나면 파일이 수정만 된 **modified** 상태이다.

`git add` 명령을 통해 스테이지에 올리고 `git status`를 실행하면 `Changes to be committed:`라는 메세지가 나타나는데, 이는 스테이지 상태를 나타낸다.

※ 커밋한 메세지 수정하기

`git commit --amend` 명령어를 통해 vim으로 메세지를 수정할 수 있다.

### 2.5 작업 되돌리기

#### 작업 트리에서 수정한 파일 되돌리기

`git restore -- 파일 이름`을 사용하면 수정 내용을 다시 되돌릴 수 있다.

#### 스테이징 되돌리기

수정된 파일을 스테이징 했을 때 이를 취소하려면 `git restore --staged 파일 이름`을 통해 스테이지에서 내릴 수 있다.

#### 커밋 되돌리기

`git reset HEAD^`을 통해 커밋을 취소할 수 있다. 만약 여러 개의 커밋을 취소하고 싶다면 `git reset HEAD~5`와 같이 사용하면 된다.

※ git reset 옵션

| 명령           | 설명                                                                   |
| -------------- | ---------------------------------------------------------------------- |
| -\-soft HEAD^  | 최근 커밋을 하기 전 상태로 작업 트리를 되돌린다.                       |
| -\-mixed HEAD^ | 디폴트 옵션                                                            |
| -\-hard HEAD^  | 최근 커밋과 스테이징, 파일 수정을 하기 전 상태로 작업 트리를 되돌린다. |

#### 특정 커밋으로 되돌리기

`git reset --hard 복사한 커밋 해시`로 특정 커밋으로 되돌릴 수 있다. 그러면 그 이후에 커밋은 삭제되고 커밋 해시를 복사했던 커밋이 최신 커밋이 된다.

#### 커밋 삭제하지 않고 되돌리기

`git revert 복사한 커밋 해시`는 커밋이 삭제되지 않고 최소한 버전의 이전으로 돌아간다.

```
$ git log
commit f47493f43abb86c65e0fd83bd338c7833804b603 (HEAD -> main)
Author: Geonwoo <kgw7401@gmail.com>
Date:   Tue Jun 29 13:40:19 2021 +0900

    Revert "R5"

    This reverts commit bd8bea64784ae0fdae9ab1ca190b4fb119ccd107.

commit bd8bea64784ae0fdae9ab1ca190b4fb119ccd107
Author: Geonwoo <kgw7401@gmail.com>
Date:   Tue Jun 29 13:38:54 2021 +0900

    R5

commit 1ee799534eab59a4e23045d81f98dc6b83a2c510
Author: Geonwoo <kgw7401@gmail.com>
Date:   Tue Jun 29 13:29:34 2021 +0900

    R2

commit b4e019bf2a228fbb0a35a2d0e3bd4aeb20779daa
Author: Geonwoo <kgw7401@gmail.com>
Date:   Tue Jun 29 13:29:05 2021 +0900
```

**※ git reset은 돌아갈 커밋의 해시를 입력하고 git revert는 최소하려고 하는 버전의 해시를 지정해야한다.**

## 3. 깃과 브랜치

### 3.1 브랜치란?

#### 브랜치가 필요한 이유

만약 하나의 개발에 대해 여러 저장소를 만들어 관리한다면 자료가 중복되거나 호환이 안되는 등의 여러 문제가 발생할 수 있다.브랜치는 이러한 문제를 해결해준다.

브랜치는 크게 2가의 기능을 한다. 깃을 시작하면 기본적으로 master 브랜치가 만들어진다(지금은 main으로 변경). 이 master 브랜치는 최신 커밋을 가리키는데 새로운 브랜치를 **분기**시켜 master 브랜치의 내용은 그래도 유지하면서 파일 내용을 수정하거나 새로운 기능을 구현할 파일을 만들 수 있다.

또한 분기한 브랜치의 작업이 끝나면 이를 다시 원래 master 브랜치에 **병합**할 수 있다.

<img src="https://drive.google.com/uc?export=view&id=1GmR0jIbrfS2P4afYkVU3VEvoY3-9ubWd">

### 3.2 브랜치 만들기

#### 새 브랜치 만들기

`git branch`만 입력하여 브랜치를 확인할 수 있다. * 표시는 현재 작업하고 있는 브랜치를 나타내준다.

`git branch 새 브랜치명`를 통해 새로운 브랜치를 만들 수 있다.

`git checkout 이동할 브랜치명`으로 다른 브랜치로 이동할 수 있다. 다른 브랜치로 이동해보면 해당 브랜치를 분기하기 전 master 브랜치에 있던 커밋들이 그대로 복사되어 있다.

### 3.3 브랜치 정보 확인하기

#### 새 브랜치에서 커밋하기

`git log --oneline --branches`는 각 브랜치의 커밋을 함께 볼 수 있다.

```
d65ee4d (HEAD -> apple) apple content 4
066deb7 (ms, google) work 3
865db1a work 2
a746dc6 work 1
```

`git log --oneline --branches --graph`으로 커밋과 커밋의 관계를 시각적으로 보여줄 수 있다.

```
* d65ee4d (HEAD -> apple) apple content 4
| * ac04780 (main) master content 4
|/
* 066deb7 (ms, google) work 3
* 865db1a work 2
* a746dc6 work 1
```

#### 브랜치 사이의 차이점

`git log 브랜치명..브랜치명`으로 브랜치 사이에 어떤 차이가 있는지 확인할 수 있다. 이러면 왼쪽 브랜치를 기준으로 오른쪽 브랜치와 비교한다.

### 3.4 브랜치 병합하기

#### 서로 다른 파일 병합하기

`git merge 병합할 브랜치명`을 통해 브랜치를 main 브랜치에 병합할 수 있다. 이 명령을 실행하면 자동으로 vim 편집기가 실행되어 메세지를 수정할 수 있다.

만약 병합하는 과정에서 vim 편집기를 실행하고 싶지 않다면 `git merge 병합할 브랜치명 --no--edit` 추가하면 된다.

#### 같은 문서의 다른 위치에사 수정했을 때 병합하기

만약 `main` 브랜치에서 `code.txt`를 수정하고 `o2` 브랜치에서도 똑같이 `code.txt`를 수정하지만 수정하는 위치가 다르면 병합을 진행할 때 어떻게 될까? 

이러면 각각의 수정 내용이 자연스럽게 하나의 파일에 합쳐지는 Auto-merging이 알어난다. 이것은 Git의 강력한 도구 중에 하나이다.

#### 같은 문서의 같은 위치에사 수정했을 때 병합하기

같은 위치를 수정했을 때는 CONFLICT 메세지가 뜨며 충돌한 부분을 직접 해결한 후 커밋을 해야한다.

수정한 문서를 다시 열어보면 조금 다르게 바뀌어있을 것이다.

```
<<<<<<< HEAD
현재 브랜치에서 수정한 내용
=======
병합할 브랜치에서 수정한 내용
>>>>>>> 병합할 브랜치명
```

다음과 같이 양쪽 브랜치의 내용을 모두 참조하여 직접 내용을 수정해야 한다.

내용을 원하는 대로 수정했으면 문서에 나타나 있던 기호를 모두 삭제하고 저장한다.

※ 병합 및 충돌 해결 프로그램

프로젝트의 규모가 클수록 브랜치가 많으므로 브랜치에서 병합해야 할 파일도 많아진다. 따라서 충돌이 많아질 수 밖에 없는데 이러한 충돌을 자동으로 해결해주는 프로그램들을 사용하면 편리하다. ex) P4Merge, Meld, Kdiff3, Araxis Merge...

#### 병합이 끝난 브랜치 삭제하기

브랜치를 병합한 후 더 이상 사용하지 않는 브랜치는 깃에서 삭제할 수 있다. 브랜치를 삭제하여도 같은 이름의 브랜치를 만들면 예전 내용을 볼 수 있다. 브랜치를 완전히 삭제하는 것이 아니라 깃의 흐름 속에서 감추는 것이라고 생각하면 된다.

먼저 `git checkout main`으로 main 브랜치로 이동한 뒤 `git branch -d 삭제할 브랜치명`으로 브랜치를 삭제한다.