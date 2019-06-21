---
title: "Java Garbage Collection"
date: 2019-06-22
categories: java
comments: true
---

# Java Garbage Collection

평소에 가비지 컬렉션 공부를 해야지라는 생각만 가지고 있었는데, 이번 기회에 자세하게(?)배워보도록 하자. 훌륭한 가비지 컬렉션 내용이 정리된 글이 있었으며, 도움이 많이 되었다.  
[NAVER D2 Java Garbage Collection]([https://d2.naver.com/helloworld/1329](https://d2.naver.com/helloworld/1329))
### 들어가기에 앞서
- HotSpot VM:
- JVM:
- GC:


## 가비지 컬렉션 과정

**stop-the-world**: GC를 실행하기 위해 JVM이 애플리케이션 실행을 멈추는 것

> stop-the-world가 발생하면 GC 쓰레드를 제외한 나머지 쓰레드는 모두 작업을 멈춘다.  
GC 작업이 완료된 후에 중단된 쓰레드들이 다시 작업을 시작한다. 어떤 GC 알고리즘을 사용하더라도 stop-the-world는 발생한다고 한다. 그리고 GC 튜닝은 이 stop-the-world 시간을 줄이는 것이다.

**Garbage Collector**: 더 이상 사용하지 않는(필요하지 않은) 객체를 찾아 지우는 작업을 한다.
두 가지 전제 조건에서 만들어졌다고 한다.
1. 대부분의 객체는 금방 접근 불가능 상태(unreachable)
2. 오래된 객체에서 젊은 객체로의 참조는 적게 존재한다.

> HotSpot VM 2개의 물리적 공간을 나누었다.
- Young 영역: 생성된 객체의 대부분은 여기에 위치하며, 대부분의 객체가 unreachable 상태가 되기 때문에 많은 객체가 Young영역에 생성되고 사라진다. 이 영역에서 객체가 사라질 때, **Minor GC**가 발생한다.
- Old 영역: Young영역에서 살아남은 객체가 이 위치로 복사된다. 대부분 Young영역보다 크게 할당되며, GC도 적게 발생한다. 이 영역에서 객체가 사라지면 **Major GC 혹은 Full GC**가 발생한다.


## Young영역의 구성

Young영역은 3개의 영역으로 나뉜다.
- Eden영역
- Survior 영역 2개

> 1. 새로 생성된 객체는 Eden 영역에 위치한다.
> 2. Eden영역에서 GC 발생 후, 살아남은 객체는 Survivor영역 중 하나로 이동된다.
> 3. 다시 Eden영역에서 GC가 발생하면 **이미 살아남은 객체가 존재하는 Survivor 영역**으로 객체가 계속 쌓인다. 
> 4. 하나의 Survivor 영역이 가득차면 그 중에 살아남은 객체를 다른 Survivor 영역으로 이동된다. 그리고 가득 찼던 Survivor 영역은 비워진다.
> 5. 위 과정을 반복하다가 계속해서 살아남은 객체는 Old영역으로 이동된다.

bump-the-pointer  
TLABs(Thread-Local Allocation Buffers)

## Old 영역의 구성
계속 공부 중...