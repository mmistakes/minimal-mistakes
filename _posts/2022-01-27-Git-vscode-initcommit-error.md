---
title:  "[github] vscode에서 커밋할 때 발생한 에러"
excerpt: "[rejected] 브랜치명 -> 브랜치명 (non-fast-forward) 에러"

categories:
- Github
tags:
- github
last_modified_at: 2022-02-25
---

<br>

### 원격 저장소 지정
```
git remote add origin [ 커밋할 레파지토리 주소 ]
```
vscode 왼쪽 아래에 디폴트로 브랜치 명이 브랜치가 master로 설정되어 있을텐데,  main 브랜치에 커밋하고 싶다면 아래처럼 수동으로 브랜치를 바꿔야 한다.

### 현재 로컬 브랜치명 변경 [master -> main]
```
git branch -M main
```
만약 원격저장소의 master 브랜치를 삭제하고 싶다면 ` git push origin --delete master`

### 원격 저장소에 있는 내용들을 로컬 저장소에 반영
```
git pull origin main
// git pull origin main --allow-unrelated-histories
```
원격 저장소에 존재하는 파일이 있을 수 있어서 먼저 pull 해줘야 제대로 push가 된다. 주석 처리한 옵션을 추가하면 관련없었던 두 저장소를 병합하도록 허용한다고 한다. 다음 커밋 때 사용해보고 글을 수정할 예정이다.

### 로컬 저장소에 push한 것을 원격 저장소에 반영
```
git push -u origin main
```

해당 에러는 push 과정에서 발생했다. 처음 push 할 때 에러가 발생했는데, 에러는 레파지토리에 존재하는 README.md (또는 .gitignore) 파일 때문이었다.

### 해결방법 
```
git push origin +master
```
이 방법을 사용하면 push 에러는 사라지지만, 레파지토리에 존재하는 README는 삭제된다.