---
title:  "[Git] Visual Studio에서 Github 사용 하기" 

categories:
  - Git
tags:
  - [Git, Github]

toc: true
toc_sticky: true

date: 2020-09-10
last_modified_at: 2020-09-10
---

인프런에 있는 홍정모 교수님의 **홍정모의 따라 하며 배우는 C++** 강의를 듣고 정리한 필기입니다. 😀    
[🌜 [홍정모의 따라 하며 배우는 C++]강의 들으러 가기!](https://www.inflearn.com/course/following-c-plus)
{: .notice--warning}

## Github 플러그인 설치

> 우선 비주얼 스튜디오에서 Github 를 연동시키려면 플러그인을 설치해야 한다.

`도구 - 확장 및 업데이트`에서 Github 검색 후 다운로드

<br>

## Github 와 연동하기

![image](https://user-images.githubusercontent.com/42318591/92720423-8aaa7d00-f39f-11ea-9453-bbac87c254ef.png){: width="40%" height="40%"}{: .align-center}

- `보기 - 팀 탐색기`
  - **복제** 
    - 👉 `git clone`과 같다. 
    - 따라서 로그인 된 내 Github 계정에서 로컬 레포지토리로 복사할 레포지토리를 선택하는 창이 나온다.
  - **만들기**
    - 👉 Repository를 만든다.
    - 로컬 레포지토리와 함께 이와 연결된 Github 원격 서버 Repository도 만든다.
  - **연결 관리** 에서 Github 계정을 로그인할 수 있다.

![image](https://user-images.githubusercontent.com/42318591/92723013-651f7280-f3a3-11ea-8fc6-8a2fe7591baa.png){: width="40%" height="40%"}{: .align-center}

- 작업하려는 로컬 레포지토리를 열면 
  - **변경 내용**
    - 새로 추가됐거나 삭제됐거나 내용이 변경된 레포지토리 내의 파일들이 자동으로 이 공간에 올라온다.
    - 여기서 커밋 메세지를 쓰고 커밋 할 수 있다.
      - 꼭 빌드 후에 Commit 하자.
    - `Commit all` (모두 커밋)
      - 그냥 내 로컬 레포지토리에 커밋
    - `Commit Push`
      - Github에 커밋과 이를 푸쉬 하는 것 까지 동시에 진행
    - `Commit Sync`
      - pull + commit + push 를 동시에.
      - 원격 레포지토리 내용까지 현재 로컬 프로젝트에 반영한 후 커밋하고 푸쉬하는 것 까지 동시에 할 수 있다.
  - **분기**
    - `git branch`
    - 브랜치 기능은 아직 사용해보지 못했다. 
  - **동기화**
    - `git pull`, `git push`
- Github에 100 MB 넘는 파일은 올리지 못한다.

***
<br>

    🌜 개인 공부 기록용 블로그입니다. 오류나 틀린 부분이 있을 경우 
    언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

[맨 위로 이동하기](#){: .btn .btn--primary }{: .align-right}