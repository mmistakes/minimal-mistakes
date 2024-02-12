---
layout: single
title: '[깃허브 블로그] build with Jekyll 오류 '
author_profile: false
published: true
sidebar:
    nav: "counts"
---

기존 윈도우 환경이 아닌 맥 OS 환경에서 블로그 업로드 중  Page build deployment 오류가 발생했다. 


##  Page build deployment 오류 

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2023-11-20-github-blog-error\build-error.png" alt="Alt text" style="width: 80%; margin: 50px;">
</div>


## 문제 상황 
맥북에서 블로그를 작성 후 build with Jekyll 과정에서 오류 발생 

- 이전 build with Jekyll
<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2023-11-20-github-blog-error\v228.png" alt="Alt text" style="width: 80%; margin: 50px;">
</div>


- 오류 발생 build with Jekyll
<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2023-11-20-github-blog-error\v229.png" alt="Alt text" style="width: 80%; margin: 50px;">
</div>

이전 build 와의 차이점을 보면 다음과 같다. 

- github-page v228 -> v229

- jekyll v3.9.3 -> v3.9.4 

구글링 중 동일한 에러에 해결에 관한 페이지를 발견했다. 
<a href = 'https://peterica.tistory.com/551'> undefined method excerpt_seperator 빌드 오류 해결 </a>

위 글에 따르면 Build 방법을 Github Action 으로 변경하여 문제를 해결했다. 

### Build 방법을 Github Action 으로 변경

- Setting -> Pages > Build and Deployment 
  
기존 Deploy from a branch 에서  Github Action 으로 변경했다. 

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2023-11-20-github-blog-error\github_action.png" alt="Alt text" style="width: 50%; margin: 50px;">
</div>

### New Workflow 생성 

- Action (상단 탭) -> new workflow 클릭 

#### 1. Jekyll 검색 후 configure 클릭 

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2023-11-20-github-blog-error\workflow.png" alt="Alt text" style="width: 80%; margin: 50px;">
</div>

#### 2. commit change 
commit change 선택 후 commit change 다시 클릭 

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2023-11-20-github-blog-error\commit_change.png" alt="Alt text" style="width: 80%;">
</div>
<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2023-11-20-github-blog-error\commit_change2.png" alt="Alt text" style="width: 60%; margin: 50px;">
</div>

### Build 오류 해결 
위 과정을 진행하면 다음과 같이 정상 Build 되는것을 확인할 수 있다. 
<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2023-11-20-github-blog-error\build_fin.png" alt="Alt text" style="width: 60%; margin: 50px;">
</div>

### 정상 업로드 확인
<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2023-11-20-github-blog-error\upload_check.png" alt="Alt text" style="width: 60%; margin: 50px;">
</div>
