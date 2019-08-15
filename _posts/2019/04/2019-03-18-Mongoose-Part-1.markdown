---
layout: post
title:  "Mongoose Populate 사용하기"
subtitle: "오브젝트 ID 치환하기"
author: "코마"
date:   2019-03-18 00:00:00 +0900
categories: [ "mongoose", "nodejs", "populate" ]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 Mongoose 의 populate 를 이용한 객체 치환 방법에 대해 알아보겠습니다. 

<!--more-->

MEVN 스택에서 Mongoose 는 DB 에 대한 데이터 모델링과 CRUD 연산을 수행하는 중요한 스택입니다. 이번 시간은 Mongoose 의 기본적인 내용 보다는 응용에 대해서 간략히 알아보도록 하겠습니다.

이번 시간에 다룬 내용은 깃헙(링크)[https://github.com/code-machina/]에서 예제를 다운로드하여 구동할 수 있도록 자료를 준비해 보았으니 직접 코드를 실행해 보는 것을 권장드립니다.