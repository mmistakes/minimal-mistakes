---
layout: single
title:  "02 완점탐색 개념정리"
---

**완전탐색 (p47~58)**

**완점탐색이란?**
:’답을 찾기 위해 모든 경우를 다 살펴본다는 전략’

장점: 확실하게 답을 찾을 수 있음
단점: 시간이 오래 걸림

이때, 컴퓨팅 자원과 시간은 trade-off 관계
(더 빠르고 많은 컴퓨터 사용 > 시간 단축/
컴퓨터 덜 사용 > 시간 증가) 

**브루트 포스 (Brute Force)**
-’무차별 대입’
-완점탐색 전략을 충실히 활용하는 방식 
-반복문/ 재귀/ 순열, 조합으로 풀이 

**순열 (Permutation)**
-C++: next_permutation (STL)으로 쉽게 순열 구할 수 있음
-Python: itertools의 permutations을 import 후 사용

**조합 (Combination)**
-C++: 따로 조합 STL X > next_permutation을 이용 OR 재귀함수로 구현
-Python: itertools의 combinations를 import 후 사용

> 순열 조합을 알아두면 완점탐색, 경우의 수 문제를 쉽게 풀 수 있음 :) 
> 삼성 코테에서 순열 조합을 이용하는 문제 자주 출제됨! 
