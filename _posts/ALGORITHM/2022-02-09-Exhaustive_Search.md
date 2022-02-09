---
layout: single
title:  "Exhaustive Search ( 완전 탐색 )"
categories: 
    - ALGORITHM
tags: 
    - [2022-02, ALGORITHM, STUDY]
sidebar:
    nav: "docs"
---

# <a style="color:#00adb5">Exhaustive Search</a>

## <a style="color:#00adb5">완전 탐색</a>이란 무엇인가 ?
완전 탐색 방법은 <b><a style="color:red">문제의 해법으로 생각할 수 있는 모든 경우의 수를 나열해보고 확인하는 기법</a></b>이다.<br>
'Brute-force' 또는 'generate-and-test' 기법이라고 불린다.<br>
모든 경우의 수를 테스트한 뒤 최종 해법을 도출한다.<br>
상대적으로 빠른 시간에 문제 해결 ( 알고리즘 설계 ) 을 할 수 있다.<br>
모든 경우를 다 확인해야하기 때문에 일반적으로 경우의 수가 상대적으로 작을 때 유용하다.<br>
<b><a style="color:red">직관적이어서 이해하기 쉽고 문제의 정확한 결과값을 얻어낼 수 있는 가장 확실하고 기초적인 방법</a></b>이다.<br><br>
시험 같은 곳에서 주어진 문제들을 풀때, <b><a style="color:red">우선 완전 탐색으로 접근하여 해답을 도출한 후 성능 개선을 위해 다른 알고리즘을 사용하고 해답을 확인하는 것이 바람직</a></b>하다.<br>


## 완전 탐색 기법 활용

1. 문제의 다양한 경우의 수를 대략적으로 계산한다. ( 시간 복잡도 )
2. 가능한 모든 방법을 다 고려한다.
3. 실제 답을 구할 수 있는지 적용한다.

## 완전 탐색 기법 종류

간단히만 정리해 놓고 내용이 많고 중요한 기법은 따로 포스팅 할 것이다.

### <a style="color:#00adb5">Brute Force 기법</a>
반복문 / 조건문을 통해 가능한 모든 방법을 단순히 찾는 경우
### <a style="color:#00adb5">순열 ( Permutation )</a>
수열이 있을 때, 그것을 다른 순서로 연산하는 방법<br>
서로 다른 것들 중 몇개를 뽑아서 한 줄로 나열하는 것<br>
시간복잡도 : O(N!)
### <a style="color:#00adb5">재귀 ( Recursive )</a>
함수 내에서 함수 자기 자신을 계속 호출하는 방법
### <a style="color:#00adb5">비트 마스크 ( Bitmask )</a>
비트 연산을 통해 부분집합을 표현하는 방법<br>
(AND,OR,XOR,SHIFT,NOT)<br>
시간복잡도 : O(1)
### <a style="color:#00adb5">BFS ( 넓이 우선 탐색 )</a>
그래프 자료 구조에서 모든 정점을 탐색하기 위한 방법<br>
현재 정점과 인접한 정점을 우선으로 탐색
### <a style="color:#00adb5">DFS ( 깊이 우선 탐색 )</a>
그래프 자료 구조에서 모든 정점을 탐색하기 위한 방법<br>
현재 인접한 정점을 탐색 후 그 다음 인접한 정점을 탐색

### <a style="color:#00adb5">백트래킹</a>
분할정복을 이용한 기법, 재귀함수 이용, 해를 찾아가는 도중에 해가 될 것 같지 않은 경로가 있다면 더 이상 가지 않고 되돌아간다.<br>
시간복잡도 : O(2^N)




<br><br><br><br>
참조<br>
<a href="https://hongjw1938.tistory.com/78?category=909529" target=_blank>https://hongjw1938.tistory.com/78?category=909529</a><br>