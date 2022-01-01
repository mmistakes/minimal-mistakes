---
layout: single
title: "[Git] Git 인텔리제이 연동"
categories: Git
tag: [Git, Version Control]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ Intellij 환경 설정

### Git 실행 설정

- Intellij 에디터 실행
- [preference] - [Git] 메뉴 진입
- Git 실행 파일 경로 지정
- Test를 클릭하여 Git version 확인

<img width="997" alt="스크린샷 2021-07-02 오후 1 47 17" src="https://user-images.githubusercontent.com/53969142/124222123-13b3c000-db3c-11eb-8d63-2dbff93d5154.png">

### Git Repository 생성

> 1. Git을 Clone해서 사용하는 방법 : Git-Hub사이트에서 미리 레포 생성 후 복제해 사용
> 2. Intellij 내에서 생성 : 현재는 Intellij에서 래포 생성 후 연동까지 이어지는 것 같다
> 3. 계정 생성은 생략

- VSC > Create Git Repository 선택
- 팝업창이 나오면 관리하고자 하는 프로젝트 폴더 [Git-Test-Intellij]를 선택 후 OK를 클릭

## ✔ Intellij를 이용한 Add, Commit, Push

### Add를 통한 스테이징

**Command Line**

```bash
> git add [파일명]
> git add . // 전체 파일을 staging 상태로 선언
```

**IDE를 통한 ADD**

- [Git] - [Current File] - [ADD]
- CMD + ALT + A

### Commit을 통한 확정

**Command Line**

```bash
> git commit -m [커밋 메시지]
> git commit -m "[21.07.02 ymkim] 인트라넷 1. 로그인 기능 구현 2. 챗봇 설정"
```

**IDE를 통한 Commit**

- [Git] - [Commit] 클릭
- 팝업창이 나오는데 커밋 하고자 하는 파일 선택 후 메시지 입력
- Commit 버튼 클릭
- **Before Commit 옵션은 추후 살펴볼 필요가 있을 듯**

### 커밋 시 파일마다 색상이 다른 것을 확인할 수 있다

<img width="338" alt="스크린샷 2021-07-02 오후 2 18 30" src="https://user-images.githubusercontent.com/53969142/124224383-81fa8180-db40-11eb-950b-d870861b8bc7.png">

- **빨강(Red)** : 워크스페이스 파일로 스테이징 상태가 되지 않은 파일
- **녹색(Green)** : 워크스페이스 파일에서 스테이징 상태로 올라간 파일
- **파랑(Blue)** : 스테이징에 올라가 정의가 된 파일
- **흰색(White)** : Commit이 완료된 파일
- **회색(Gray)** : 삭제된 파일

### ⓷ Push를 통해 원격 Remote에 .git Directory 파일 업로드

- [Git] - [Push] 클릭
- 팝업창이 나오는데, 올리기 전 Commit이 완료된 파일 확인 후 Push 클릭
- push할 Remote Repository를 선택 해야 한다
- Commit시 입력한 Comment를 확인 후 Push할 대상 선택

```bash
> $ git push <저장소명> <브랜치명>
```

## ✔ Intellij를 GitHub Clone 과정

> 1. 사이트마다 GitHub를 연동하는 과정이 다르기에 추가 정리

![스크린샷 2021-07-02 오후 2 27 16](https://user-images.githubusercontent.com/53969142/124225211-00a3ee80-db42-11eb-8483-8ac0601366e8.png)

![스크린샷 2021-07-02 오후 2 27 46](https://user-images.githubusercontent.com/53969142/124225215-026db200-db42-11eb-92d7-93deb4ccf717.png)

> 1. 현재는 branch도 따지 않았고 혼자 진행하는 프로젝트
> 2. branch 따서 작업, Pull-Request 작업, 이전 버전 복구 & 버전 관리 작업 해보기
> 3. 나머지 부분은 참고 사이트 참고하여 해당 상황에 맞게 Git 환경 구축 할 것

- 우선 Get From VSC 선택을 한다
- 후에 깃허브에서 생성한 래포지토리 주소를 복사하여 해당 URL에 복사한다
- 이 때, 디렉토리 경로도 자세히 맞춰서 생성 해준다.

## ✔ 위 방법이 안될경우

### Enable Version Control Integration 클릭

<img width="1264" alt="스크린샷 2021-07-05 오후 9 51 00" src="https://user-images.githubusercontent.com/53969142/124474955-1df3e980-dddc-11eb-9c5e-e6395abdd5ff.png">

- 클릭하면 아래와 같은 팝업이 나온다

### Git 버전 관리 시작

<img width="594" alt="스크린샷 2021-07-05 오후 9 52 12" src="https://user-images.githubusercontent.com/53969142/124475095-4bd92e00-dddc-11eb-81b0-b98e8137966d.png">

- Git을 선택하고 OK 버튼을 클릭

### Git Commit

<img width="1002" alt="스크린샷 2021-07-05 오후 9 52 53" src="https://user-images.githubusercontent.com/53969142/124475182-61e6ee80-dddc-11eb-9801-68bccd79fb16.png">

- 좌측의 빨간색으로 되 있는 파일들은 로컬 저장소에 staging 상태가 안된 것
  - 인텔리제이는 자동으로 파일을 생성 할때마다 add를 해주도록 설정이 가능하다
- Commit 버튼을 클릭한다

### Git Commit 팝업

<img width="1059" alt="스크린샷 2021-07-05 오후 9 53 47" src="https://user-images.githubusercontent.com/53969142/124475319-89d65200-dddc-11eb-945c-dce186a2b228.png">

- 첫번째 빨간색 박스는 Commit이 될 파일 목록
- 두번째 빨간색 박스는 메시지를 입력하는 곳
- Commit 버튼을 클릭

### Commit 완료 후 원격 orgin/remote 와 연동

<img width="602" alt="스크린샷 2021-07-05 오후 9 56 00" src="https://user-images.githubusercontent.com/53969142/124475458-b38f7900-dddc-11eb-88f7-453234432379.png">

- URL에 git에서 clone한 URL을 넣어준 후에 OK를 클릭 해준다.

### 참고 자료

- [Github & Intellij 연동 및 사용](https://secuinfo.tistory.com/entry/Intellij-Github-Link)
- [Intellij Git 쉽게 사용하기](https://ddoriya.tistory.com/entry/Intellij-Git-%EC%82%AC%EC%9A%A9%EB%B2%95)
- [Spring boot 웹 애플리케이션 구축](https://www.youtube.com/watch?v=WGIJ4CDUX44&list=PLPtc9qD1979DG675XufGs0-gBeb2mrona&index=4)
