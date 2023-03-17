---
layout: single
title:  "[Project_Error_Report] 프로젝트 진행 관련 오류"
categories: Project
tag: [web, server, DB, spring boot, spring mvc, java, JPA]
toc: true
toc_sticky: true
author_profile: false
sidebar:
    nav: "docs"
---

<br>

# 작성 계기

프로젝트를 하면서 많은 오류가 발생하는데, 하나 하나 해결하면서 어떻게 해결했는지, 어떤 내용을 알게 되었는지 기록하기 위해 작성을 시작한다.

## template error

**Neither BindingResult nor plain target object for benn name ..**<br>

![BindingResult](/images/Project_Report/BindingResult.png)

Main 페이지에서 로그인 화면으로 넘어가는데 계속 오류가 발생했다.<br>
찾아본 결과 `@ModelAttribute`로 넘길때 이름이 맞지 않는 등 Controller < - > Template 사이에 이름이 맞지 않으면 오류가 발생하였다.<br>
하지만 나는 그런 문제는 아니었고, 눈을 크게 뜨고 한참 찾아본 결과 Template에서 `th:object`가 오타가 나 있었다..<br>
오타시 오류가 따로 나타나지 않아서 한참 찾아서 겨우 해결했다..