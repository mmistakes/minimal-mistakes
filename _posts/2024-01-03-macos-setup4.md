---
layout: single
title: "MacOS Setup 4장 - Git"
category: macos
tag: [macos, setup, neovim, lua]
author_profile: false
typora-root-url: ../
---

git을 이용하기 전에 기본적인 설정을 합니다.



### 설정 쓰기

```bash
git config <이름> <값>
git config --<범위> <이름> <값>
```



### 설정 읽기

```bash
git config <이름>
```



### 설정 지우기

```bash
git config --unset <이름>
git config --global --unset <이름>
```



### 사용자 이름과 이메일 설정

```bash
git config --global user.name "이름"
git config --global user.email "example@email.com"
```



### 기본 브랜치 변경

```bash
git config --global init.defaultBranch main
```



### 기본 에디터 변경

````bash
git config --global core.editor "code --wait --disable-extensions"
````



### 단축 명령어 설정



### 마치면서

