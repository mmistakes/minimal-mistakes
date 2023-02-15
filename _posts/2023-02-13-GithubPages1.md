---
layout: single
title: '깃허브 블로그 만들기 for Mac OS: 1. 블로그생성과 커밋(잔디심기 까지)'
categories: 'GitHubBlog'
tags: ['GitHub Pages', 'Jekyll']
toc: true   # 우측 목차 여부
author_profile: True   # 좌측 프로필 여부
---

## 시작
일을 하면서 기술 블로그를 시작해봐야겠다는 생각을 했다. 데이터 분야에서 경력을 시작했기 때문에 별다른 개발 지식이 없다. 그래서 이 시리즈(?)에서는 엄청난 개발 지식 없이 블로그를 만들기위한 최단 루트를 제시하고자한다.

## 마음에 드는 테마 선정
[Theme](https://github.com/topics/jekyll-theme)
- 위 링크로 들어가서 마음에 드는 테마를 선정한다.
- 가장 인기가 많은 테마는 이유가 있을 거라고 생각해서 minimal-mistakes을 선택했다.
- Document도 잘 정리 되어있고, 대중적으로 사용하는 기본 테마인 만큼 웹 상에 참고할 수 있는 자료들이 많을 거라 생각했다. (적어도 중간은 갈 테마인것 같다)
- 마크다운으로 글을 업로드 했을 때 코드도 적당히 잘 보여서 문제는 무난한 선택지라고 생각했다.

## Fork 및 기본 설정

![Fork](/assets/blog_img/fork.png)
- Fork 이후엔 자신의 Github계정으로 복사가 된다.

![Rename 예시](/assets/blog_img/rename.png)
- 이후에 Settings로 가서 Repository name을 변경해주는데 이 때에는 꼭 **자신의 Github아이디.guthub.io** 를 적어줘야 한다.

![branch1](/assets/blog_img/branch1.png){: width="190" height="170"}
![branch2](/assets/blog_img/branch2.png){: width="190" height="170"}
![branch3](/assets/blog_img/branch3.png){: width="190" height="170"}
- Fork한 Repository는 커밋을 해도 잔디가 찍히지 않기 때문에 다른 브랜치를 만든다
- 좌측 상단의 master 버튼 클릭 후 만들고싶은 브랜치 이름 작성 후 Create branch 클릭

![branch4](/assets/blog_img/branch4.png)
- Settings/Branches로 이동해서 우측 화살표 클릭 후 디폴트 값 변경 (master -> 설정한 branch 이름)

## 간단한 코드 수정
- config.yml 파일을 클릭하고 edit this file 클릭
- 블로그에 들어가는 큼직한 사항들이 들어있는 파일이다.
- 이 많은 코드 중 url 부분 (line 24 즈음)에 자신의 Repository name으로 수정하고 저장해준다. 이 부분은 내 블로그의 주소가 된다.

```python
# Before
url: # the base hostname & protocol for your site e.g. "https://mmistakes.github.io"

# After
url: "https://DonghyunAnn.github.io"
```

## 글 쓰기
- _posts 폴더를 새롭게 생성한다. 
- 그리고 날짜-파일명.md 형식으로 파일을 만든다 
(ex:2023-02-13-Start_Github.md)
- 데이터 분야에 관심이 있는 분들이 이 글을 보셨을 것이라 생각하는데, 그냥 jupyter notebook에서 좌측상단에 <span style="background-color:#C0FFFF"> File/Download as/Markdown</span> 으로 저장하면 편하게 파일을 생산할 수 있다.

### 게시물 내부 이미지 삽입
- assets 내 사진을 업로드한다
(ex:/assets/blog_img/branch1.png)
- 이전에 마크다운 파일에서 다음과 같이 입력
- 방식은 마크다운 문법을 사용한 방법과 html태그를 사용한 방법이 있는데, 개인마다 편한 방식을 채택해서 사용하면 된다.

```python
# 마크다운 형식
![Alt text](파일경로)
### 사이즈 설정 {: width="100" height="100"} 입력
![Alt text](파일경로){: width="100" height="100"}
### 정렬
![Alt text](파일경로){: .center}

#html 태그 사용한 방식 예시
<img src="파일경로" width="50%" height="50%"></center>
```

## Commit & Pull Request
- 터미널이나 Github Desktop에서 기존에 설정한 branch로 커밋을 한다
- <span style="background-color:#C0FFFF"> Repository/Pull Request</span> 클릭 
![PullRequest1](/assets/blog_img/pullrequest.png)
- 오른쪽 Repository 에서 왼쪽 Repository로 적용시키는 단계에서 오른쪽 branch는 기존에 만들어놨던 branch(gh-pages) 왼쪽은 master branch로 설정
![PullRequest2](/assets/blog_img/pullrequest2.png)
- <span style="background-color:#C0FFFF"> Create Pull Request -> Merge -> Confirm Merge</span>
![PullRequest3](/assets/blog_img/pullrequest3.png)
- Overview로 넘어가서 잔디가 잘 심어졌는지 확인

