---
layout: single
title:  "What are Git and GitHub?"
categories: AI
tag: [git, github, gitblog]
toc: true
author_profile: false
sidebar:
  nav: "docs"
---

<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block;
      overflow: auto;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      line-height: 20px;
      text-align: center;
      border: 0px !important;
    }

    table.dataframe th {
      text-align: center;
      font-weight: bold;
      padding: 8px;
    }

    table.dataframe td {
      text-align: center;
      padding: 8px;
    }

    table.dataframe tr:hover {
      background: #b8d1f3; 
    }

    .output_prompt {
      overflow: auto;
      font-size: 0.9rem;
      line-height: 1.45;
      border-radius: 0.3rem;
      -webkit-overflow-scrolling: touch;
      padding: 0.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      font: 1rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: $code-text-color;
      border: solid 1px $border-color;
      border-radius: 0.3rem;
      word-break: normal;
      white-space: pre;
    }

  .dataframe tbody tr th:only-of-type {
      vertical-align: middle;
  }

  .dataframe tbody tr th {
      vertical-align: top;
  }

  .dataframe thead th {
      text-align: center !important;
      padding: 8px;
  }

  .page__content p {
      margin: 0 0 0px !important;
  }

  .page__content p > strong {
    font-size: 0.8rem !important;
  }

  </style>
</head>


# Git과 GitHub란?
---

![](https://blog.kakaocdn.net/dn/mClmk/btszK7QNjBW/KrWV3gJdMNROm7lxK4YD41/img.png)

팀 단위 프로젝트를 진행할 때, 누구나 한 번쯤 들어본 말이 있다.   
**"Git에 커밋해주세요."**   
오늘은 'Git'과 'GitHub'의 차이와 사용 방법에 대해 말해보고자 한다.  

가장 직관적으로 설명하자면 Git은 로컬 저장소, Github는 원격 저장소라고 할 수 있다.   
로컬 저장소란 작업을 진행하고 있는 PC 자체에서 작업물의 형상을 관리할 수 있는 저장소, 원격 저장소란 로컬 저장소에서 작업을 진행한 후 타인과의 협업을   위해 웹 사이트(예를 들어 github, gitlab 등)에 저장하여 다수의 작업자가 특정 작업물의 형상을 관리할 수 있는 저장로를 말한다.  

![](https://blog.kakaocdn.net/dn/bskYn6/btszKCcnmCX/IztEhAbDIuonyAYB9Jv8Ik/img.png)

Git과 GitHub의 연관관계를 이해를 했다면, 그 다음은 실제로 어떤 명령어로 Git과 GitHub에 수정된 작업물을 저장하는지 알아보자.  
수정한 작업물에 대한 형상관리 흐름을 파악하기 위해서는 기본적으로 'init', 'add', 'commit', 'push', 'clone', 'pull' 이 6가지의 명령어를 알아둘 필요가 있다.  

|명령어|설명
|:---|:---|
|git init|현재 디렉터리에 로컬 저장소를 초기화시키는 명령어로, 실행 결과 해당 디렉터리에 .git이라는 디렉터리가 생성된다.|
|git add .|로컬 저장소에 새롭게 생성된 모든 파일들이 git index에 스테이징된다.|
|git commit -m "message"|수정사항에 대한 메세지와 함께 로컬 저장소에 스테이징된 항목들을 추가한다.|
|git push origin master|로컬 저장소의 변경된 항목들을 원격 저장소에 추가한다.(설정에 따라 origin과 master는 변경이 된다.)|
|git clone [레파지토리 url]|원격 저장소의 레파지토리를 로컬 저장소에 추가한다.|
|git pull origin master|원격 저장소의 변경된 항목들을 로컬 저장소에 추가한다.(설정에 따라 origin과 master는 변경이 된다.)|  

위의 표를 참고하여 깃 협업의 기본적인 플로우를 도식화한다면 아래와 같다.

![](https://blog.kakaocdn.net/dn/c1LG9Z/btszNT0nQ0b/1jpLFgbNwMXLPLiXpLkBck/img.png)

이처럼 'init - add - commit - push - clone - pull'의 과정을 이해하면 git의 다양한 기능을 이해하는 것 또한 어렵지 않을 것이다.  


## 글을 마치며  


Git이 가진 수많은 기능 중 가장  기초적인 부분만을 공부하면서 요약한 내용을 적어봤고, Git의 흐름을 파악하는 데에 어려움이 있는 입문자들에게 도움이 되었으면 좋겠다.  
AI 학습을 위해 시작한 블로그이니만큼 앞으로는 파이썬에 대한 내용을 주로 기록할 예정이다.



```python
```
