---
layout: single
title: "Collection 뜯어버려!"
categories: Data_Structure
tag: ["Collection"]
toc: true
toc_sticky: true
author_profile: false
sidebar:
---

# 자바에서 Collection framework이 뭔데?

![](https://i.imgur.com/VHxJZ5q.png)


- 자바에서는 Collection framework 라는 Data Structure를 제공한다.
	- java.util.Collection
	- java.util.Set
	- java.util.List
	- java.util.Map
 | Set | 비순차적 저장, 중복 데이터 불허 |
 | --- | ------------------------------- |
 | Map |           비순차적 저장, 중복 데이터 허용                      |
 | List    |         순차적 저장, 중복 데이터 허용                        |

- Set은 주머니에 데이터를 넣는 느낌 -> 주머니 흔들면 무작위 -> 순서가 없음
- Map 은 키값과 벨류값이 존재
- List는 배열 같이 순차적 데이터를 관리

## 왜 이렇게 구분하는거지?

- 목적에 맞게 저장, 관리를 하기 위해서
- 결론은 사용하기 편하게 만들기 위해서다.
