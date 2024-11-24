---
layout: single
title:  "[github] 잔디심기 문제해결"
categories: github
tags: [github, blog] 
toc : true
author_profile : false 
---

깃허브에 잔디심기 즉 커밋로그가 업데이트 되지 않는다는 것을 인지하고 이를 해결해 보았다.

먼저 가장 많은 사람들의 원인인 계정문제인가 확인했다.

### 메일 확인

```bash
git log 
```

입력후 Author로 메일주소를 확인한다.

github의 settings의 Emails로 메일주소를 확인한다.

나는 두가지가 같았기 때문에 메일 주소를 바꿀 필요가 없었다.

만약 다르다면 github의 메일과 같은 주소로 변경해야한다.

### 브런치 생성

깃허브 블로그를 만들때 도움을 받았던 테디노트의 영상을 확인한 결과
{% include video id="Z053Qn8LJyk" provider="youtube" %}

레퍼지토리의 파일을 gh-pages 라는 브런치에 만들어서 저장하고 이를 master 브런치에 옮기는 과정에서 커밋로그가 생성된다는 것을 알게 되었다.

나는 레퍼지토리의 파일을 처음부터 master 브런치에 생성했기 때문에 테디노트처럼 master 브런치에 옮기려고 하면 

"There isn’t anything to compare.
You’ll need to use two different branch names to get a valid comparison.
Check out some of these sample comparisons." 

와 같은 메시지가 떴다.

그렇기 때문에 나는 현재 레퍼지토리의 파일들을 gh-pages 복사해 옮기고 이후 새로운 포스팅을 할때마다 gh-pages 브런치에 파일을 생성하기 위해 먼저 gh-pages 브런치를 생성했다.

브런치를 생성하는 방법은 레퍼지토리에서

![브런치1](/assets/images/branches1.png)

master를 클릭하면

![브런치2](/assets/images/branches2.png)

이렇게 뜨는데 여기서 View all branches 를 클릭하고 오른쪽 상단의 초록색 버튼 New branch를 클릭하면 됀다.

이름(gh-pages)을 입력하고 초록색 버튼(Create new branch)을 클릭하면 새로운 브런치가 생성된다.

### 브런치 파일 옮기기

gh-pages 브런치를 생성한 후에는 현재 master 브런치에 있는 파일들을 gh-pages 브런치에 복사해 옮겨야 한다.

```bash
git checkout gh-pages 
```
gh-pages 로 이동하고

```python
 #대충 아무주석
```
아무파일을 살짝 수정한다. 주석을 추가해 수정하면 된다.

```bash
git add .
git commit -m "gh-pages로 커밋"
```
변경사항을 커밋한다.
```bash
git push origin gh-pages 
```
까지 하면 gh-pages 브랜치에 master브랜치에 있던 파일들이 모두 복사된다

이후 테디노트 영상과 똑같이 pull requests를 하면 잔디 심기가 완료된다.

다음에 새로운 파일을 만들때도 gh-pages 브런치에 만들면 된다.