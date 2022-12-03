---
title:  "[Git] .gitignore 파일 만들기" 

categories:
  - Git
tags:
  - [Git, Github]

toc: true
toc_sticky: true

date: 2020-06-17
last_modified_at: 2020-06-17
---

## .gitignore 이란?
Github 원격 서버에 로컬 프로젝트를 올릴 때 불필요한 로그 파일들은 업데이트 하지 않도록 <u>무시할 파일들 목록</u>을 만드는 것.

## .gitignore 파일 만들기

`.gitignore` 파일은 보통 레포지토리 생성시에 `Add .gitignore`을 선택하면 자동으로 추가 되기 때문에 보통 가지고 있겠지만 만약에 없다면!

```
touch .gitignore
```

<u>Git Bash</u>에 들어가 `.git`이 있는 <u>내 git 프로젝트의 루트 디렉터리</u>에 `cd` 명령어를 통해 들어간 후 위와 같은 명령어를 실행해 `.gitignore` 파일을 만들어준다. 사실 메모장으로 만드는 방법도 있지만 ".txt"가 뒤에 붙을 우려 때문에 이 방법을 더 추천한다. `.gitignore`은 반드시 루트 디렉터리에 있어야 한다. 

<br>

## .gitignore에 들어갈 내용 추가하기

> gitignore.io <https://www.toptal.com/developers/gitignore>

![image](https://user-images.githubusercontent.com/42318591/84847138-5880cc00-b08b-11ea-9a3b-96fc003b51e8.png){: width="70%" height="70%"}{: .align-center}


위 사이트에 들어가면 프로젝트 언어, 툴별로 `.gitignore`에 추가할 내용들을 생성할 수 있다. UE4와 C++을 사용하는 프로젝트라면 UE4와 C++를 검색하여 추가해준 후 `생성`을 눌러주면 된다. 생성을 눌러준 후 나오는 텍스트들이 바로 `.gitignore`에 추가해야 할 내용이다. 복사하여 `.gitignore`파일에 붙여넣기 해주자.

<br>

## .gitignore 파일 push 해주기

```
git add .gitignore
git commit -m "커밋 메세지"
git push
```

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}