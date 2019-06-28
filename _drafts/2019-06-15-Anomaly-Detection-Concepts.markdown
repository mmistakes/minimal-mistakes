---
layout: post
title:  "[번역] [주석] 이상행위 탐지 개념 및 기술"
subtitle: "Anomaly Detection concepts and techniques"
author: "코마"
date:   2019-06-15 00:00:00 +0900
categories: [ "anomaly", "concept", "translation"]
excerpt_separator: <!--more-->
---

안녕하세요 **코마**입니다. 이상 행위 탐지 부분에 대한 좋은 글을 읽고 이를 번역 및 주석 작업을 한 결과를 공유드립니다. 😺

<!--more-->

## 원문

본 번역 및 주석의 내용은 아래의 원문을 참조로 하였습니다.

- [Anomaly Detection Concepts and Techniques](https://iwringer.wordpress.com/2015/11/17/anomaly-detection-concepts-and-techniques/)

## 정리

### 머신 러닝의 네 가지 유형

- Classification (분류)
- Prediction (예측)
- Anomaly Detection (이상 탐지)
- Discovery of Structure (??)

이 중에서 Anomaly Detection 은 데이터 중 나머지 데이터와 잘 맞지 않는 데이터를 짚어내는 기술이다.

### Anomaly Detection 기술의 적용 범위

- Fraud Detection (사기 탐지)
- Surveillance ()
- Diagnosis ()
- Data Cleanup ()
- Predictive maintenance ()

원문에서는 현재(?, 2015년도 당시)에는 은행, 금융 기관, 감사, 의료 진단 등에 사용되고 있지만 이후에는 IoT 의 모니터링, 예측 유지보수 등과 같은 영역에서
사용될 것이라고 전망한다.

## 참고

- [Golang : Dependency Injection (DI) 패턴](https://blog.drewolson.org/dependency-injection-in-go)
