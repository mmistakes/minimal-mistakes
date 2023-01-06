---
published: true
title: '2023-01-05-ComputerArchitecture-중앙처리장치(CPU) 작동 원리'
categories:
  - ComputerArchitecture
tags:
  - ComputerArchitecture
toc: true
toc_sticky: true
toc_label: 'ComputerArchitecture'
---

속도가 빠른 장치와 느린 장치에서 속도 차이에 따른 병목 현상을 줄이기 위한 메모리를 말한다.<br>

```
ex1) CPU 코어와 메모리 사이의 병목 현상 완화
ex2) 웹 브라우저 캐시 파일은 하드디스크와 웹페이지 사이의 병목 현상을 완화
```

CPU가 주기억장치에서 저장된 데이터를 읽어올 때, 자주 사용하는 데이터를 캐시 메모리에 저장한 뒤, 다음에 이용할 때 주기억장치가 아닌 캐시 메모리에서 먼저 가져오면서 속도를 향상시킨다.<br>
속도라는 장점을 얻지만, 용량이 적기도 하고 비용이 비싼 점이 있다.<br>
CPU에는 이러한 캐시 메모리가 2~3개 정도 사용된다.(L1, L2, L3 캐시 메모리라고 부른다)<br>
속도와 크기에 따라 분류한 것으로, 일반적으로 L1 캐시부터 먼저 사용된다.(CPU에서 가장 빠르게 접근하고, 여기서 데이터를 찾지 못하면 L2로 감)

<br>

**듀얼 코어 프로세서의 캐시 메모리**: 각 코어마다 독립된 L1캐시 메모리를 가지고, 두 코어가 공유하는 L2캐시 메모리가 내장됨<br>
만약 L1캐시가 129KB이면, 64/64로 나누어 64KB에 명령어를 처리하기 직전의 명령어를 임시 저장하고, 나머지 64KB에는 실행 후 명령어를 임시저장한다.(I-Cache, D-Cache)

- L1: CPU 내부에 존재
- L2: CPU와 RAM 사이에 존재
- L3: 보통 메인보드에 존재
  > 캐시 메모리 크기가 작은 이유는 SRAM가격이 매우 비쌈

<br>

**디스크 캐시**: 주기억장치(RAM)와 보조기억장치(하드디스크) 사이에 존재하는 캐시

<br>

**캐시 메모리 작동 원리**

- Two forms of locality
  - 시간 지역성(Temporal locality)<br>
    for이나 while같은 반복문에 사용하는 조건 변수처럼 한번 참조된 데이터는 잠시후 또 참조될 가능성이 높음(시간이 지날수록 locality 하락)
  - 공간 지역성(Spatial locality)<br>
    A[0], A[1]과 같은 연속 접근 시, 참조된 데이터 근처에 있는 데이터가 잠시후 또 사용될 가능성이 높음(가까운 instruction access 확률이 높다.)

캐시에 데이터를 저장할 때는, 이러한 공간 지역성을 최대한 활용하기 위해 해당 데이터뿐만 아니라, 옆 주소의 데이터도 같이 가져와 미래에 쓰일 것을 대비한다.<br>
CPU가 요청한 데이터가 캐시에 있으면 'Cache hit', 없어서 DRAM에서 가져오면 'Cache Miss'

<br>

**캐시 미스 경우 3가지**

1. Cold miss<br>
   해당 메모리 주소를 처음 불러서 나는 미스
2. Conflict miss<br>
   캐시 메모리에 A와 B 데이터를 저장해야 하는데 A와 B가 같은 캐시 메모리 주소에 할당되어 있어서 나는 miss(direct mapped cache에서 많이 발생)
   > 항상 핸드폰과 열쇠를 오른쪽 주머니에 넣고 다니는데, 잠깐 친구가 준 물건을 받느라 손에 들고 있던 핸드폰을 가방에 넣었음. 그 이후 핸드폰을 찾으려 오른쪽 주머니를 찾아봤는데 없는 상황
3. Capacity miss<br>
   캐시 메모리의 공간이 부족해서 나는 miss(Conflict는 주소 할당 문제, Capacity는 공간 문제)

<br>

캐시 **크기를 키워서 문제를 해결하려하면, 캐시 접근속도가 느려지고 파워를 많이 먹는 단점**이 생김

<br>

**Mapping Fuction**<br>

- Direct
  - 가장 단순
  - ex) 500%4 = 0이면 0번째 자리에 넣음. 계속 같은 자리에 대해 충돌이 발생하지만 빠름.
  - hit ratio는 낮음
- Associative
  - Associative memory 필요: 동시에 여러 주소를 비교하기 위함
  - 충돌이 일어나지 않아 hit ratio 증가
  - Replacement algorithm 필요
  - 너무 복잡해서 사용하지 않음
- Set Associative

  - 앞 두 방법의 장단점 보완
  - 현재 대부분 이 방법 사용
    ![image](https://github.com/222SeungHyun/222SeungHyun.github.io/blob/master/_images/Set%20Associative.png?raw=true)
  - 어떤 set에 들어갈 것인지는 direct, 어떤 way에 들어갈 것인지는 associative
  - way가 클수록 associative에 가까워짐
