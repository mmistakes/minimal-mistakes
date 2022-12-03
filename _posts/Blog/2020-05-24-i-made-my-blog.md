---
title:  "[Github 블로그] 깃허브(Github) 블로그를 생성해 보자." 
excerpt: "Jekyll로 깃허브 블로그를 만들어 보았다."

categories:
  - Blog
tags:
  - [Blog, jekyll, Github, Git, minimal-mistake]

toc: true
toc_sticky: true
 
date: 2020-05-23
last_modified_at: 2020-05-25
---

🎀 [jekyll 한글 문서 페이지](https://jekyllrb-ko.github.io/) 🎀 를 참고하였다.

---
<br>

# 1. Github 에서 블로그 용으로 쓸 새로운 Repository 를 생성한다.

![image](https://user-images.githubusercontent.com/42318591/82748040-bd713b00-9dd9-11ea-8c65-4b54676abd1e.png)


레포지토리의 이름을 자신의 깃허브 계정 이름.github.io 로 하여 생성해준다.  
ex) `ansohxxn.github.io`

<br>

# 2. 생성한 Repository를 Local 환경으로 Clone 해 온다.

## 명령 프롬프트 cmd 를 실행하여 원하는 위치로 이동한다.
나의 경우 D드라이브에 설치하기 위해 cmd에 `D:` 를 입력 후 엔터 쳐 D드라이브로 이동하였다.
`cd` 명령어로 원하는 폴더 위치로 이동이 가능함 ! 원하는 폴더로 이동했다면 이제 이 로컬(내 컴퓨터) 폴더에 위에서 만든 레포지토리를 복사해 받아올 것이다.  


## git clone 명령어를 실행하여 레포지토리를 복사해온다.

    🔔 git이 미리 설치되어 있어야 한다. 

**`git clone` + 새 레포지토리 주소.git**
git clone 뒤에 위에서 만든 새 레포지토리의 주소, 그리고 `.git` 까지 붙여 명령어를 실행해준다.  
ex) `git clone https://github.com/ansohxxn/ansohxxn.github.io.git`    

이제 cmd상 현재 폴더 위치로 가보면 `깃허브아이디.github.io` 폴더가 생겨있을 것이다. 블로그로 쓸 레포지토리 복사 완료! 
이렇게 git clone 해주면 내 블로그 레포지토리와 원격으로 연결된다.

<br>

# 3. Ruby 설치

    🔔 윈도우(Windows) 환경 기준

Jekyll은 Ruby라는 언어로 만들어졌기 때문에 jekyll을 설치하기 위해선 Ruby를 먼저 설치해야 한다고 한다.  루비 인스톨러 다운로드 페이지 <https://rubyinstaller.org/downloads/> 여기서 WITH DEVIKIT 중 가장 위에 있는 것을 다운받아 실행시킨다. 
  
✨ 인스톨러를 실행할때 아랫 문장을 체크하면 직접 환경 변수 설정 해야 하는 수고로움을 생략할 수 있다.
- [x] Add Ruby executables to your PATH  

<br>

# 4. Jekyll 과 Bundler 설치 

> <u>Bundler</u>는 루비 프로젝트에 필요한 gem들의 올바른 버전을 추적하고 설치해서 일관된 환경을 제공하는 도구이다.  

cmd에 다음과 같은 명령어를 수행한다. `gem install jekyll bundler`
cmd에 `jekyll -v` 명령어를 수행하여 jekyll이 잘 설치되었는지 확인해본다. 

<br>

# 5. jekyll 테마를 내 블로그 레포지토리 Local 폴더에 다운받는다.

난 [minimal mistakes](https://github.com/mmistakes/minimal-mistakes) 테마를 선택했다. 이유는 많이 쓰이는 테마길래 정보가 많을 것 같아서..! 또한 기능도 많고 테마 색상도 여러가지길래 선택했다. 구글링 하면 jekyll 테마를 모아 둔 사이트가 여러개 나오는데 여러가지 구경해보다가 선택하게 되었다. 

선택한 jekyll 테마의 깃허브 레포지토리에 접속하여 Zip 압축 파일로 다운 받는다. 
![image](https://user-images.githubusercontent.com/42318591/82756872-c41ea300-9e17-11ea-8164-22decb325114.png)
압축을 풀어 주고 내려 받은 테마 폴더 내용물들을 전부 복사하여 **2번 과정**에서 <u>clone 했던 내 블로그 레포지토리 폴더 `깃허브아이디.github.io` 위치에 전부 붙여넣기 해준다.</u> 이제 이를 github 서버에 push 하여 올려주면 내 블로그에 테마가 적용될 것이다!

<br>

# 6. Github Pages 서버와 연결해주기

`git bash` 를 실행하고 `cd` 명령어를 통해 테마 프로젝트 내용물들이 있는 내 블로그 레포지토리 폴더로 이동한다. 그리고 아래와 같은 3개의 명령어를 순서대로 실행한다.
```
git add .
git commit -m "커밋 메세지"
git push origin master
```
***git add .*** git add 명령어는 폴더 내의 파일들의 변경 사항들을 stage area에 올리는 역할을 한다. `.` 은 변경된 `모든 파일`을 올리겠다는 의미. 

***git commit -m "커밋 메세지"*** stage area에 올라온 모든 파일들을 원격 서버에 올릴 준비를 한다. 확정 짓는 과정.

***git push origin master*** 변경 사항들을 내 블로그 레포지토리 원격 Github 서버에 반영한다. 

---
이제 https://깃허브아이디.github.io 에 접속하면 테마가 적용된 내 깃허브 블로그를 확인할 수 있다. 😊 

***
    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}