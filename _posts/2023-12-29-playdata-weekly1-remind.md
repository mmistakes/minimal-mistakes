---
layout: single
title: '플레이데 데이터 1주차 회고 '
categories: 플레이데이터
tag: [회고]
author_profile: false
published: false
sidebar:
    nav: "counts"
---

## 플레이 데이터 1주차 회고
1주차 학습 내용 : 파이썬 기본 문법, 자료 구조와 제어문, 함수와 클래스

1주차에는 파이썬의 기본적인 문법에 대해 학습했다. 

파이썬은 이미 프로젝트 진행경험도 있기때문에 이번주는 학습적으로 어려움이 없는 한주였다.

그래서 복습하는 마음으로 수업을 수강했다. 

1주차에서 기억에 남는 내용을 정리

### 1. 자료구조 

이전에는 자료구조의 개념만 집중했다면 지금은 적절한 사용법에 집중해서 수강했다.

자료구조란 **여러 개의 값들을 모아서 관리**하는 데이터 타입을 말한다. 

파이썬은 데이터를 모으는 방식에 따라 다음과 같이 4개의 타입을 제공한다.

    - **List:** 순서가 있으며 중복된 값들을 모으는 것을 허용하고 구성하는 값들(원소)을 변경할 수 있다. **순서가 매우 중요하다**

    - **Tuple:** 순서가 있으며 중복된 값들을 모으는 것을 허용하는데 구성하는 값들을 변경할 수 없다. 값이 변경되지 않으므로 가장 안전하다

    - **Dictionary:** key-value 형태로 값들을 저장해 관리한다. key는 중복을 허용하지 않는다. 
     
    - **Set:** 중복을 허용하지 않고 값들의 순서가 없다. 주로 다른 자료구조의 중복을 제거하기 위해 사용한다. 

데이터를 분석하다보면 모든 위도, 경도 데이터는 항상 투플의 형태로 이루어져 있다. 그 이유는 tuple이 가장 안전하기때문이다! 

list와 tuple의 가장 큰 차이는 값 변경 가능여부이다. 값이 바뀔 가능성이 없는 데이터들은 tuple 형태로 저장하자 

### 2. Format 함수  
print 문을 사용하면서 format() 함수를 자주 이용했지만 단순히 출력을 위해서만 사용했었지 format() 함수의 여러 기능들을 활용하지 못했다.


#### format(숫자값, 단위구분자) 

```
for idx, i in enumerate(range(1_000_000), start=1):
    if idx % 100_000 == 0:
        print(f'{format(idx, ",")}번째 처리 중')

```


#### enumerate
enumerate 데이터 분석시 항상 사용하는 함수이다. 

 `enumerate(Iterable,  [, start=정수])`



 # a, c, b = (1,2), 3 ValueError: not enough values to unpack (expected 3, got 2)
(a, c), b = (1,2), 3 

list 컴프리헨시브

for v in l1:
    for value in v:
        if value%2 == 0:
            r.append(value)

[value for v in l1 for value in v if value%2 == 0]
