---
layout: post
title:  "Amazon 처럼 Python 사용하기"
subtitle: "모듈 구조 및 문서화"
author: "코마"
date:   2019-04-09 00:00:00 +0900
categories: [ "python", "boto3", "code", "development" ]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 AWS SDK Boto3 를 바탕으로 아마존은 어떻게 파이썬을 개발하는지를 살펴보도록 하겠습니다. 평소에 파이썬에 관심이 많은 분들은 이 글을 통해 인사이트를 얻을 수 있을 것으로 생각됩니다. 😺

<!--more-->

# 구조 잡기

저는 애용하는 IDE 로 Pycharm (Community Edition) 을 이용해서 구조를 잡는 법을 설명드리겠습니다. 저의 모든 작업은 글 마지막의 깃헙 링크에서 확인할 수 있습니다.

