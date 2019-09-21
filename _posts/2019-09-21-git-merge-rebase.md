---
title: "Git merge와 rebase의 차이점을 알아보자"
date: 2019-09-21
categories: git
comments: true
---

### 개요
여러 사람과 작업을 진행할 때, 형상관리 툴(Git)을 사용하여 체계적으로 코드를 통제하고 변경사항에 대해 히스토리가 생기고 쉽게 해당 히스토리에 대한 코드를 추적할 수 있습니다.  
프로젝트를 혼자 진행을 하면 코드 충돌에 대한 걱정이 없지만 두 명 이상의 개발자가 작업을 진행하다보면 충돌을 피할 수 는 없습니다.  
Git은 merge, rebase라는 키워드를 제공해주어 충돌 처리를 해결할 수 있도록 도와줍니다. 그럼 이 두 가지는 언제 어떻게 사용하면 좋을까요?   
merge와 rebase에 대해 알아봅시다.

### merge
버그 이슈를 처리하기 위해 master 브랜치에서 master-bug/#101이라는 브랜치를 생성했다고 가정합니다.  
코드를 수정하고 커밋 후 원격저장소로 push까지 완료했습니다. 아래와 같은 그림이 나옵니다.  
```console
1628888 (HEAD -> master-bug/#1, origin/master-bug/#1) master-bug/#1/코드 수정
03acb2c (origin/master, origin/HEAD, master) 
```
HEAD는 master-bug/#1을 가리키고, master는 바로 아래에 있습니다.  
여기서 master와 병합하면 자신보다 최신 커밋과 병합하므로 fast-forward가 되지만, 팀원들과 일을 진행하면 항상 자신의 커밋이 master보다 최신일 수는 없습니다. 
아래와 같이 master-bug/#1 브랜치 기준으로 master 브랜치로 2개의 새 커밋이 반영되었습니다.
```console
4857a89 (origin/master, origin/HEAD, master) master/-/코드 수정2
dc1c778 master/-/코드 수정1
1628888 (HEAD -> master-bug/#1, origin/master-bug/#1) master-bug/#1/코드 수정
```
이제 master-bug/#1 브랜치를 master로 병합합니다.
```console
$ git checkout master
$ git merge master-bug/#1
```
```console
26865d7 (HEAD -> master, origin/master, origin/HEAD) Merge branch 'master-bug/#1'
4857a89 master/-/코드 수정2
dc1c778 master/-/코드 수정1
1628888 (origin/master-bug/#1, master-bug/#1) master-bug/#1/코드 수정
```
위 로그에서 첫 번째 줄에서 **'Merge branch 'master-bug/#1'** merge commit이 생성되는 걸 볼 수 있습니다.  
예시는 하나만 나오지만 여러 브랜치에서 master로 병합하는 횟수만큼 merge commit이 생성되어 히스토리를 추적하기에 어려움이 따를 수 있습니다.

### rebase
이름 그대로 base를 재배치하는 것으로 현재 브랜치의 base가 된 커밋 시점을 변경하는 것을 의미합니다. 또한 merge commit이 생성되지 않고 병합을 원할 때(주의점에 merge commit이 생기는 경로있음), rebase 명령어를 사용할 수 있습니다.
성능 개선을 위한 브랜치인 master-task/performance 라는 브랜치를 생성했다고 가정합니다. 그 사이에 master 브랜치에 여러 버그가 수정되어 반영된 상태입니다.
```console
4b772c2 (origin/master, origin/HEAD, master) 10
e528980 9
b76bcd3 (HEAD -> master-task/performance, origin/master-task/performance) performance
```
HEAD는 master-task/performance이며, 해당 브랜치에 코드가 수정되어 커밋된 상태입니다. 그 위로 master에 2개의 커밋이 반영되었습니다.  
rebase는 현재 브랜치의 base가 되는 커밋을 변경해주는 것이므로 performance 브랜치를 최신 commit으로 맞추도록 rebase 명령어를 실행합니다.
```
$ git rebase master
```
```console
a22619e (HEAD -> master-task/performance) performance
4b772c2 (origin/master, origin/HEAD, master) 10
e528980 9
b76bcd3 (origin/master-task/performance) performance
```
위 로그에서 master-task/performance가 새 커밋이 하나 생기고 master의 상단으로 올라와 최신 커밋으로 변경된 것을 볼 수 있습니다.
이제 master에서 master-task/performance 브랜치를 병합해봅시다.
```console
$ git merge master-task/performance
Updating 4b772c2..a22619e
Fast-forward
 test.txt | 3 ++-
 1 file changed, 2 insertions(+), 1 deletion(-)
```
아래와 같이 fast-forword가 수행되는 것을 볼 수 있으며 로그 상에는 merge commit이 생성되지 않습니다.
```console
a22619e (origin/master, origin/HEAD, master, master-task/performance) performance
4b772c2 10
e528980 9
b76bcd3 (origin/master-task/performance) performance
```

#### 주의점
- rebase는 커밋 단위로 적용하기 때문에 merge처럼 충돌이 발생하면 한번만 처리하면 되지만 rebase는 commit마다 충돌처리를 해주어야 합니다.
- rebase 적용 후에 push를 시도한다면 아래와 같은 오류가 발생한다.
```console
 ! [rejected]        master-task/performance -> master-task/performance (non-fast-forward)
error: failed to push some refs to 'https://github.com/rerewww/ttt.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
``` 
pull을 받아서(merge commit이 생성됨) 다시 push를 하거나 `git push -f origin`  커맨드를 실행하는 방법이 있다.

### 개인적인 결론
rebase는 merge commit이 없어 history를 좀 더 깔끔하게 사용 할 수 있고 merge는 충돌처리에 대해서 한번만 수정하면 된다는 장점도 있고 여러 상황 중 master에 반영할 필요가 없는 브랜치인데 master의 최신 커밋을 반영하면서 작업을 해야한다면 rebase를 통해 꾸준하게 최신 브랜치를 유지할 수 있을 것 같습니다. 이렇게 서로 장단점이 존재하여 상황에 맞게 사용하면 좋을 것 같습니다.
