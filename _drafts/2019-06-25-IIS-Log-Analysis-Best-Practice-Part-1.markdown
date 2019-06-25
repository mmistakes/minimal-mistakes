---
layout: post
title:  "IIS 로그 분석 Part 1"
subtitle: "Pandas 와 WSL 을 이용한 빠른 분석"
author: "코마 (gbkim1988@gmail.com)"
date:   2019-06-20 00:00:00 +0900
categories: [ "pandas", "python", "wsl", "bash"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 오늘은 윈도우 환경에서 대량의 IIS 로그를 효율적으로 분석하는 방법을 소개해 드리겠습니다. 😺

<!--more-->

# 개요

그동안 IIS 로그 분석에 로그파서(Logparser)를 이용해 오신 분들이라면 로그 분석에 걸리시는 시간이 상당한 점을 들어 그 불편함을 체감하였을 것입니다.

이번에 소개할 방법은 WSL, Pandas 를 이용하여 빠르게 원하는 키워드를 검색하고 추출한 데이터에서 가독성이 높은 자료를 산출할 수 있습니다.

## 목표

이번 시간 목표는 아래와 같습니다.

- WSL 를 이용한 로그 추출

## 효과

리눅스 명령어와 파이프라인을 통해 수백 기가의 로그 추출 시간을 1 시간 이내로 단축 시키고 원하는 칼럼을 추출하여 데이터 분석을 진행합니다. (로그를 정제 후 분석하므로 조회 시간이 수분이내로 단축됩니다.)

## WSL 이란?

WSL 이란 Windows Subsystem For Linux 의 줄임말입니다. 즉, 윈도우에서 bash 쉘을 사용함을 말합니다. 

bash 쉘의 장점은 파이프라인(pipeline)을 이용하여 다수의 파일을 빠르게 처리할 수 있음을 의미합니다. 

즉, `awk`, `grep`, `sort`, `uniq` 명령어 조합만으로 원하는 로그를 단 시간내에 추출하는 과정을 의미합니다.

과거에는 윈도우 배치를 이용해야 했으므로 성능적인 면이나 파이프라이닝이 어려웠습니다. 그러나 Windows 10 부터는 **WSL 을 이용하여 이러한 특징을 최대한 활용할 수 있으므로 기존의 로그 추출 시간을 수 시간 이내로 당겨줍니다.**

## 사용할 명령어 목록

IIS 로그는 공백을 구분자(delimiter)로 사용하므로 awk 를 이용하여 쉽게 파싱이 가능합니다. 

그러나 여러 서버의 파일을 동시에 작업할 경우 로그 저장 필드가 다른 경우

- `grep`
- `awk`
- `sed`
- `nl`
- `sort`
- `uniq`

# 참고

- [RedHat : 마이크로서비스란?](https://www.redhat.com/ko/topics/microservices/what-are-microservices)



