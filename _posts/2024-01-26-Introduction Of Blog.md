---
layout: single
title: "Introduction Of Blog"
categories: coding test
tag: [출사표]
toc: true
---
# 1. 해당 블로그의 목적
- 未生 SW Engineer가 完生 SW Engineer로 가는 길을 요약하고 정리하기 위함.
- SWE로서 앞으로 얻게 되는 모든 지식과 여정을 기록하기 위함.

# 2. 해당 블로그의 제작법

- Youtube 강의 link : [Youtube 강의 link](https://www.youtube.com/watch?v=ACzFIAOsfpM)
- 지킬 링크 : [지킬link](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)
- 글 작성은 Notion으로 하고, Markdown export 후에 약간의 수정을 한 후 블로그 업로드
    - 블로그 변화(local에서 띄운 서버)를 빠르게 확인하기 위한 powershell 명령어 및 주소 : http://127.0.0.1:4000/
    ```
    bundle exec jekyll serve
    ```
    - Markdown 상단 설정 값 수정하기
        
        Github io에서 블로그 글을 업로드 할 때 Markdown 안에 필수로 작성 해주어야 하는 설정 값이 있다. 맨 위에 **—** 사이에 설정값을 입력하면 됨. 이 부분은 Notion에서 Export시에 같이 나오지 않기 때문에 따로 작성 해야함.
        
        ![Untitled](/images/2024-01-26/Untitled.png)
        
    - 이미지 경로 수정하기
        
        노션에서 Markdown을 export하면 글 안에 포함 된 이미지의 경로는 노션에서 생성된 경로로 만들어지게 되서 Github io에서 이미지 경로를 찾지 못하므로 자신의 Github io 이미지 경로로 수정해줘야함
        
    
    ```python
    <!-- 수정 전 -->
    ![Tips%20Notion%20Github%20io/NotionToGithubioPorting1.png](Tips%20Notion%20Github%20io/NotionToGithubioPorting1.png)
    
    <!-- 수정 후 -->
    <!-- /images/posts/포스팅 날짜/이미지 형식으로 경로를 설정해서 사용 -->
    ![NotionToGithubioPorting1.png](/images/posts/2020-03-02/NotionToGithubioPorting1.png)
    
    ```
    
    - 소스코드 형식 설정하기
        
        노션의 코드 블럭을 추가해서 작성한 후 md 파일을 만들면 md 파일에서는 코드 블럭이 설정되지 않은 상태로 Export가 된다. 
        
        ![Untitled](/images/2024-01-26/Untitled%201.png)
        
        이런 형식으로 나온 코드를 아래와 같이 코드 블럭으로 감싸주는 작업을 해주어야 한다.
        
        ![Untitled](/images/2024-01-26/Untitled%202.png)
        
    - 링크 Create Bookmark 체크하기
        
        노션에서는 링크를 Create Bookmark하면 블록 형태로 링크에 대한 Bookmark가 생성됩니다. 하지만 md 파일에서는 Bookmark 표현이 안 되므로 링크에 대한 내용 확인 후 수정을 해야한다. 
        
        ![https://swieeft.github.io/assets/images/posts/2020-03-02/NotionToGithubioPorting5.png](https://swieeft.github.io/assets/images/posts/2020-03-02/NotionToGithubioPorting5.png)
        
        이런 형태로 되어 있는 Bookmark를 Export 하면
        
        `[Notion - The all-in-one workspace for your notes, tasks, wikis, and databases.](<https://www.notion.so/>)`
        
        이런 형태로 표현 된다. 대괄호”[]” 안에 있는 텍스트가 표시 될 URL의 정보이고, 소괄호”()” 안에 있는 URL이 링크 될 페이지 주소이다.
        

# 3. 해당 블로그의 컨텐츠

1. Understanding Contents
    1. 목적 : 이해하기 위한 컨텐츠
    2. 컨텐츠
        1. CS 전공 지식 : 전공에서 배우는 CS 전공 지식을 최대한 이해해보자
        2. CS 실무 지식 : 실무에 쓰이는 CS 실무 지식을 최대한 이해해보자
2. Memorizing Contents
    1. 목적 : 외울 컨텐츠
    2. 컨텐츠
        1. DSA  : 자료구조와 알고리즘을 외워서 컴퓨팅적 사고방법을 익히자
        2. SQL : DDL과 DML을 외워서 DB를 익히자
        3. CS : 반드시 알고 있어야할 CS 지식을 외우자
        4. System Design : 반드시 알고 있어야할 시스템 구조를 외우자
        5. Certificate : 자격증을 따기 위해 필요한 지식을 외우자  
3. Training Contents
    1. 목적 : 몸에 익힐 컨텐츠
    2. 컨텐츠
        1. 실무 프로젝트 정리 : 실무로 진행하게 된 프로젝트를 정리하자
        2. 사이드 프로젝트 정리 : 사이드로 진행하게 된 프로젝트를 정리하자
        3. 트러블 슈팅 정리 : 마주치는 모든 트러블을 슈팅하는 과정을 정리하자