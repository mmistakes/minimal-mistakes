---
layout: single
title:  "컬렉션 프레임워크(Collection Framework) 2편"
categories: JAVA 
tag: [JAVA, 컬렉션프레임워크, HashSet, TreeSet, 자바의 정석, 이진트리, HashMap]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

# ✍ 2022-02-04

## 컬렉션 프레임웍(Collections framework) 2편

<!--Quote-->
> *본 내용은 자바의 정석을 바탕으로 작성*  

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음
 
# 2022-02-04

## HashSet

- 순서 x 중복 x
- Set 인터페이스를 구현한 대표적인 컬렉션 클래스
- 순서를 유지하려면, LinkedHashSet 클래스를 사용
- 객체를 저장하기전에 기존에 같은 객체가 있는지 확인 → 같은 객체가 있으면 저장, 없으면 저장 하지 않는다

## TreeSet

- 범위 검색(From~to) 정렬에 유리한 컬렉션 클래스
- HashSet 보다 데이터 추가, 삭제에 시간이 더 걸림
- 이진 탐색 트리(binary search tree)로 구현, 범위 탐색과 정렬에 유리
- 이진 트리는 모든 노드가 최대 2개의 하위노드를 갖음  ( 각 요소 (node)가 나무(tree) 형태로 연결(LinkedList의 변형)

```java
LinkedList
class Node{
		Node next; // 다음 요소의 주소를 저장
		Object obj; // 데이터를 저장
}

TreeSet
class TreeNode {
		TreeNode left; // 왼쪽 자식노드 
		Object element; // 저장할 객체 
		TreeNode right;  // 오른쪽 자식 노드 
```

![이진트리.png](/assets/images/posts/2022-02-04/1.png)

## 이진 탐색 트리(binary search tree)

- 부모보다 작은 값은 왼쪽, 큰 값은 오른쪽에 저장(기본 이진 트리와 다른점 )
- 데이터가 많아질 수록 추가, 삭제에 시간이 더 걸림

## Hashmap / Hashtable

- Map 인터페이스를 구현, 데이터를 키와 값의 쌍으로 저장
- HashMap(동기화 x)은 Hashtable(동기화 o)의 신버전

## Hashmap

- Hashmap에서 순서를 유지하려면 LinkedHashMap을 이용
- Map인터페이스를 구현. 데이터를 키와 값의 쌍으로 저장

```java
HashMap map = new HashMap();
map.put("myId", "1234");
map.put("asdf", "1111");
map.put("asdf", "1234");
// 키는 중복허용 x 값은 중복허용  o
```

## 📑 출처 

 - [자바의 정석 카페](https://cafe.naver.com/javachobostudy) 
 - [자바의 정석 유튜브](https://www.youtube.com/user/MasterNKS)