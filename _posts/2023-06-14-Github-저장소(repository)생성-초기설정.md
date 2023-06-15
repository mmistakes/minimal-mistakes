---
layout: single
title: 'Github 저장소(Repository) 생성 & git clone'
categories: 'Github'
tag: [Github, repository]
toc: true
toc_label: 'Contents'
toc_sticky: true
author_profile: false
sidebar:
  nav: 'sidebar-category'
---

> README 파일 추가하여 github 저장소(Repository) 생성하고(원격 리포지토리), 이 리포지토리를 컴퓨터에 로컬 복사본을 만들고 동기화시키기

### Gibhub Repository 생성하기

---

1.깃허브에서 Repository 카테고리에서 New 클릭해서 새로운 Repository 생성합니다.

<img src="/assets/images/2023-06-14/1.png" width="600" height="50"/>

2.New 버튼을 누르면 새로운 Repositoy를 생성하는 화면이 나옵니다. 여기서 Repository Name을 설정하고, public과 add a README file을 선택한 후 `Create repositoy`를 클릭합니다.
(README.md 파일은 나중에 생성해줘도 되지만 README.md 파일을 추가하여 repository를 생성하는 방법을 선택했습니다.)

<img src="/assets/images/2023-06-14/2.png" width="600" height="400"/>

3.repository 생성이 완료되었습니다. README.md 파일이 생성되어 있을 것을 확인할 수 있습니다.

<img src="/assets/images/2023-06-14/3.png" width="600" height="150"/>

### 내 pc에 repository 연결하기

---

1.`code`버튼을 클릭한 후 나타나는 링크를 복사합니다.

<img src="/assets/images/2023-06-14/4.png" width="400" height="100"/>

2.VScode(원하는 에디터)에서 터미널을 열고, 커멘드창에서 저장소를 내려받을 위치로 이동합니다.
필자는 documents 파일로 이동후 git clone 명령어를 통해서 저장소를 복제합니다.

```
git clone [복사한 링크]
```

<img src="/assets/images/2023-06-14/5.png" width="500" height="100"/>

3.clone이 성공적으로 실행되면 documents 폴더에 github의 repository와 동일한 이름의 폴더가 생성됩니다.
docements에 test폴더가 생성되어있고, VScode를 보면 test폴더안에 README.md파일도 잘 생성되어있음을 확인할 수 있다.

<img src="/assets/images/2023-06-14/6.png" width="100" height="100"/>

<img src="/assets/images/2023-06-14/7.png" width="150" height="100"/>

폴더와 파일이 잘 생성되었다면 저장소를 복제하고 git에 연동하는 것이 완료된 것이다.

### Gibhub Repository에 파일 업로드하기

---

1.우선 test 폴더에 업로드할 파일을 생성하고 작업합니다. 필자는 index.html라는 파일을 생성하고 작업하였습니다.

<img src="/assets/images/2023-06-14/8.png" width="150" height="100"/>

2.Gituhb Repository에 업로드하기

```
git add .

git commit -m ["commit 남길 내용"]

git push
```

- git add . : 수정된 모든 파일을 업로드하는 명령어
- git commit : git commit 명령으로 파일들을 commit합니다. 이때 기록을 남겨 어떤 내용을 수정하였는지 등을 작성할 수 있습니다.
- git push : 최종 업로드를 위해 git push를 합니다.

  3.모든 작업이 완료된 후 Gituhb Repository로 이동하면 파일이 업로드 된 것을 확인할 수 있습니다.

<img src="/assets/images/2023-06-14/9.png" width="600" height="100"/>

### Gibhub workflow

---

<img src="/assets/images/2023-06-14/10.png" width="600" height="100"/>

원격저장소(Remote Repository)에 올리기(push) 전까지의 소스 추가(add), 저장(commit), 소스 변경 파일 보기(diff) 등의 작업들은 로컬에 저장된 소스에서 이루어진다.
