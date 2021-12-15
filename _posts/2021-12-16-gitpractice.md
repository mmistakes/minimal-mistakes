---
layout: default
title:  "[Git]Git과 GitHub의 기초"
comments: true
---



# Git과 Git Hub 기초 사용법

 > 코딩 외에 실무적인 문제를 해결해주는 방법으로 쓰이는 깃과 깃허브.  
 > 회사에 입사한다면 프로젝트를 할 때 무조건적으로 사용하는 협업 툴로 그 간단한 사용법을 알아보았다.


## 깃허브의 역할

### 크게 3가지 역할을 하고 있다.
> 1. 내 소스코드를 저장(버전관리)
> 1. 소스코드를 공유
> 1. 협업하는 공간

## 하나씩 따라해보기

### 1. 깃허브에 Repository를 생성
- first-git-use 라는 저장소를 생성했다.
- 되도록 Public으로 생성(남들이 소스코드를 볼 수 있도록)

![Github](https://user-images.githubusercontent.com/75322297/146227463-ce400874-94fb-417b-a221-1a2a1c299079.png)


### 2. Git 명령어를 사용하기 위해 Git을 다운로드
- 구글에 Git을 검색 후 다운로드

### 3. Git 환경설정
1. Git Bash 실행
1. Command에  git config --global user.name "your_name" 작성  
  ("your_name"에 자신의 이름 작성)
1. git config --global user.email "your_email" 작성  
  ("your_email"에 Github 가입 시 이메일 작성)
1. git config --list 으로 설정이 잘 잡혔는지 확인  
  (여러가지 설명이 나오나 마지막 이름과 이메일이 잘 들어가 있나 확인)
  
>![gitbash](https://user-images.githubusercontent.com/75322297/146227334-5852c735-19f1-4114-b820-f4cb777cf2ba.png)


### 4. 내 프로젝트 올리기
- 올릴 소스코드 준비
- Terminal에 git init 입력
- git add . 입력  
  (add는 추가하는 명령어이며 .은 전부다 올리겠다는 의미)  
  (특정 파일명을 적어 그것만 올리게 지정할 수도 있다.)
- git status 로 올릴 파일 상태 확인
- git commit -m "first commit" 를 작성  
  (commit 명을 작성, "first commit"은 최종, 진짜 최종, 진짜진짜최종과 같은 히스토리 개념)
- 주소 연결을 위해 git remote add origin git@github.com:your_name/your_repository.git 작성  
  (your_name에 Github ID, your_repository.git에 자신의 프로젝트명을 작성)
- git remote -v 로 레포짓과 연결상태 확인
- git push origin master 를 작성해 파일 전송
 

> 본인은 GitPractice.py이라는 파일을 보내려 한다.


```python
PS C:\Users\513eh> cd desktop # 보낼 파일이 바탕화면에 위치
PS C:\Users\513eh\desktop> git init
Reinitialized existing Git repository in C:/Users/513eh/Desktop/.git/
PS C:\Users\513eh\desktop> git add GitPractice.py # 보낼 파일 추가
PS C:\Users\513eh\desktop> git status # 상태 확인
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   GitPractice.py # 추가가 된것을 확인할 수 있음.
PS C:\Users\513eh\desktop> git commit -m "practice" # 커밋명 작성
[master (root-commit) d2e7a7a] practice
 1 file changed, 1 insertion(+)
 create mode 100644 GitPractice.py
PS C:\Users\513eh\desktop> git remote add origin git@github.com:GoodJeon/first-git-use.git # 레포지토리와 연결
PS C:\Users\513eh\desktop> git remote -v # 연결상태 확인
origin  git@github.com:GoodJeon/first-git-use.git (fetch)
origin  git@github.com:GoodJeon/first-git-use.git (push)
PS C:\Users\513eh\desktop> git push origin master 
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```


      File "<ipython-input-5-66c50ec3e3c1>", line 1
        PS C:\Users\513eh> cd desktop
           ^
    SyntaxError: invalid syntax
    


> 하지만 에러가 났다.  
  구글링으로 이유를 찾아봤더니  
  git은 SSH 또는 http 기반으로 사용을 하게 되는데 SSH key로 접속해서 사용하는 경우는 PC마다 SSH key를 등록해 주어야 한다고 한다.  
  기존 저장내용을 pull로 불러와 다시 시도하니 잘 되었다. 
  [해결방법 참조 블로그](https://maliceit.tistory.com/51)  
  [해결방법 참조 블로그2](https://waaan.tistory.com/13)  


```python
PS C:\Users\513eh\desktop> git push origin master # push로 다시 보내봤다.
Enter passphrase for key '/c/Users/513eh/.ssh/id_rsa': 
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 4 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 332 bytes | 110.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To github.com:GoodJeon/first-git-use.git
   d30005c..4946f26  master -> master     #성공적으로 보내졌다.
```

> 성공적으로 올라갔다.
![success](https://user-images.githubusercontent.com/75322297/146227550-7b2d6dae-48f6-49fa-9f57-2d62a421f033.png)

# 공부 후 느낀 점
1. 버전을 관리하는 점에 있어서 매우 좋을 것 같다.(더 배워야 겠지만)
1. 처음 시도 했을 때와는 다르게 에러가 생겨서 해결 방법을 찾는 연습이 됐다.(시간을 많이 썼지만.)
1. 나중에 실제 회사에서 어떻게 사용하는지 배워보고 싶다.
