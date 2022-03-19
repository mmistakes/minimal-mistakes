---
layout: single
title: "01-회원제 게시판 만들기_SpringBoot와 JPA "
categories: memberboard
tag: [springbot, jpa]
toc: true
author_profile: false
toc: false
sidebar:
  nav: "docs"
search: true
---

**[공지사항]** <strong> [개인적인 공부를 위한 내용입니다. 오류가 있을 수 있습니다.] </strong>
{: .notice--success}

### 01-기본환경 설정 - SpringBoot
###### 화면구성 : thymeleaf,  DB(ORM): JPA, dependency: gradle
###### thymeleaf는 html에 직접 작성이 가능하고 확장성이 높다. 또한 JPA를 사용하기에 mysql query를 입력하지 않아도 사용이 가능하다.
###### gradle은 간단한 코드로 dependency 관리가 가능하다.
<br>

###### 아카데미 버전의 라이센스를 부여받은 인텔리제이를 인스톨 후 new project의 Spring Initializr에 가서 환경설정을 진행하였다.
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3b440411-5b1f-4190-b0c9-f25155ddd85d%2FUntitled.png?table=block&id=292dd57f-0655-4ae8-8fa6-62598fdebcc3&spaceId=7cb441ef-e066-4225-8a36-74fcd90a280b&width=1610&userId=2263adcd-10f2-4a60-bb39-3b4fa73b1b68&cache=v2)
<br><br>
<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6d652383-8950-4ed9-a42d-951b05ee057f%2FUntitled.png?table=block&id=3196bb9b-7d57-49eb-b62c-e2f6b472f322&spaceId=7cb441ef-e066-4225-8a36-74fcd90a280b&width=2000&userId=2263adcd-10f2-4a60-bb39-3b4fa73b1b68&cache=v2" width="800" height="900">
<br><br>
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fea9cc3d9-6a8e-4732-961d-4cfad4c2260a%2FUntitled.png?table=block&id=534cd76a-b048-44a9-95cb-66696d69f90f&spaceId=7cb441ef-e066-4225-8a36-74fcd90a280b&width=2000&userId=2263adcd-10f2-4a60-bb39-3b4fa73b1b68&cache=v2)
###### 여기까지 완료 후 확인을 finish를 클릭하면 dependency를 자동으로 다운로드하며 적게는 1분안쪽으로 길게는 1분 이상 작업을 혼자 진행한다. 모든 작업이 끝나면 아래의 화면을 확인할 수 있고 BUILD SUCCESSFUL 소요시간을 확인할 수 있다.
<br>
###### Setting으로 가서 아래항목을 체크 표시해준다.
![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F52794626-56d2-403a-b5d3-256d6b8f42cd%2FUntitled.png?table=block&id=5a3a6053-9fcf-4d05-a205-523f17d00ef5&spaceId=7cb441ef-e066-4225-8a36-74fcd90a280b&width=2000&userId=2263adcd-10f2-4a60-bb39-3b4fa73b1b68&cache=v2)
<br>
###### 프로젝트 부분을 펼쳐보면 Main Method를 확인할 수 있다.
![](/assets/images/mainmethod.jpg)

<br>
###### resource  폴더는 static과 template로 구성되어 있다. static은 정적자원이며 css, javascript, image 파일 등 변경이 이뤄지지 않는 것들을 정적자원이라고 한다. template은 화면용 파일로 html 파일이 들어간다. spring의 views폴더와 기능이 유사하다.




