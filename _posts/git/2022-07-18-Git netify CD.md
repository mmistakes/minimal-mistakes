---
title: "git repository Continuous Deployment"
escerpt: "Git 저장소 CD하기"

categories:
  - Git
tags:
  - [Git, Blog, GitHub, CD, Continuous Deployment]

toc: true
toc_sticky: true

breadcrumbs: true

date: 2022-07-18
last_modified_at: 2022-07-18

comments: true
---

# 개요
part3 : ch6_10.netify CD 한번더보기

업로드한 저장소를 netify를 이용하여 빠르게 배포(CD)가능한 방법
- 원격저장소에 새로운 프로젝트가 업로드 되는 순간 netify service가 저장소에서 프로젝트를 가지고가서 새로운 홈페이지로 배포처리해준다.
- 정적웹사이트 만들시 netify 사용하면 쉽게 지속적인 배포를 이용할수 있다
- 무료이다.

- owser : 현재 netify사용하는 나의 계정
- branch to deploy : 해당 branch가 원격저장소로 deploy되면 netify가 해당하는 부분을 체크해서 업데이트된 부분있으면 deploy해준다는 의미
- 반응형(정적웹사이트)에 맞게 잘 배포된것을 확인할수 있다.
- aws의 ec2나 s3같은거로 복잡하게하는것보단 netify이용하면 손쉽게 정적웹사이트 배포가능

## 1. Branch 생성
[Netlify](https://www.netlify.com/)

~~~
git branch 이름
~~~

master branch : 핵심브랜치, 실제 배포시 master branch를 이용한다.  
                보통은 다른 브랜치에서 생성 및 테스트 후 검증완료 후 master branch로 배포한다.
                

~~~
$ git branch  # 현재 branch list 보여준다.
$ git branch abc # abc라는 branch를 생성한다.
$ git checkout abc # abc라는 branch로 변경한다.
~~~

 
![image](https://user-images.githubusercontent.com/46878973/175803436-30e58e63-8205-4d6e-b100-d3bdd4389daa.png)



---

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}