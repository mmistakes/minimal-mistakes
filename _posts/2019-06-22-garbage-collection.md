---
title: "Java Garbage Collection"
date: 2019-06-22
categories: java
comments: true
---

# Java Garbage Collection

평소에 가비지 컬렉션 공부를 해야지라는 생각만 가지고 있었는데, 이번 기회에 자세하게(?)배워보도록 하자. 훌륭한 가비지 컬렉션 내용이 정리된 글이 있었으며, 도움이 많이 되었다.  
[NAVER D2 Java Garbage Collection](https://d2.naver.com/helloworld/1329)
## 들어가기에 앞서
- JVM(자바 가상 머신): 어느 운영체제, 기기에서 이식 가능한 실행 환경을 제공해주며 메모리도 관리해준다.
- HotSpot VM: Sun/Oracle에서 개발한 JVM 엔진이다. 

## 가비지 컬렉션 과정

**stop-the-world**: GC를 실행하기 위해 JVM이 애플리케이션 실행을 멈추는 것

> stop-the-world가 발생하면 GC 쓰레드를 제외한 나머지 쓰레드는 모두 작업을 멈춘다.  
GC 작업이 완료된 후에 중단된 쓰레드들이 다시 작업을 시작한다.  
어떤 GC 알고리즘을 사용하더라도 stop-the-world는 발생한다고 한다.  
그리고 GC 튜닝은 이 stop-the-world 시간을 줄이는 것이다.

**Garbage Collector(GC)**: 더 이상 사용하지 않는(필요하지 않은) 객체를 찾아 지우는 작업을 한다. 두 가지 전제 조건(**weak generational hypothesis**)에서 만들어졌다고 한다.  

1. 대부분의 객체는 금방 접근 불가능 상태(unreachable)
2. 오래된 객체에서 젊은 객체로의 참조는 적게 존재한다.
⁠

![hotspot vm structure]({{ "/assets/images/gc/Hotspot_Heap_Strucuture.png"}})
HotSpot VM 2개의 물리적 공간을 나누었다.
- Young Generation
    - 생성된 객체의 대부분은 여기에 위치한다
    - 대부분의 객체가 unreachable 상태가 되기 때문에 많은 객체가 Young영역에 생성되고 사라진다.
    - Eden영역이 가득찼을 때, **Minor GC**가 발생한다.
    - Minor GC의 알고리즘은 copy-scavenge 사용한다.
- Old Generation
    - Young영역에서 살아남은 객체가 임계점(age)에 다다르면 이 위치로 복사된다.
    - 대부분 Young영역보다 크게 할당되며, GC도 적게 발생한다.
    - Tenured영역이 가득찼을 때, **Major GC 혹은 Full GC**가 발생한다.
    - Major GC의 알고리즘은 기본적으로 mark-sweep-compact 사용한다.


## GC 동작 순서
1. 처음 새로운 객체가 생성되면 대부분 Eden영역에 위치한다.
![process-1]({{ "/assets/images/gc/process-1.png"}})
2. 객체가 생성되어 Eden영역에 넣을려고 할 때, Eden영역이 가득차면 Minor GC가 발생한다.
![process-2]({{ "/assets/images/gc/process-2.png"}})
3. Minor GC가 발생하면 Eden영역의 참조된 객체는 Survivor0 이동된다. 참조되지 않은 객체는 Eden영익이 비워질 때, 함께 제거된다.
![process-3]({{ "/assets/images/gc/process-3.png"}})
4. 계속 Minor GC가 발생하면, 참조되지 않은 객체는 제거되고 참조된 객체는 Survivor0영역으로 이동된다.
![process-4]({{ "/assets/images/gc/process-4.png"}})
5. 계속 Minor GC가 반복되면서, Survivor영역도 바뀌는데 이번엔 Survivor1영역으로 이동된다. 각 **객체의 임계점이 증가**되는 걸 볼 수 있다.
그 후, Eden영역이 비워지면서 Survivor영역도 비워진다. 참조되지 않은 객체 역시 제거된다.
![process-5]({{ "/assets/images/gc/process-5.png"}})
6. Minor GC이후, 생존한 객체의 임계점이 XX:MaxTenuringThreshold(java7:default 15) 값을 초과하면 Old Generation으로 Promotion된다.
![process-6]({{ "/assets/images/gc/process-6.png"}})
7. 전체적인 그림은 다음과 같다.
![process-8]({{ "/assets/images/gc/process-8.png"}})

## Old Generation 알고리즘
# SerialGC  
![serial_gc]({{ "/assets/images/gc/serial_gc.png"}})  
- 싱글 스레드 환경에서 사용하기 위해 만들어진 알고리즘이다.
- Old Generation의 default 알고리즘은 mark-sweep-compact이다.
- 살아있는 객체를 식별(Mark), 힙의 앞 부분부터 살아있는 것만 남기고 나머지는 제거하는 Sweep, 각 객체들이 연속되게 쌓이도록 힙의 가장 앞 부분부터 채우는 compact단계로 동작한다.
> 제거되어 확보한 메모리는 부분적으로 빈공간이 생기는데(메모리 단편화), 빈 공간을 채우기 위해 메모리 재구성 즉, compact단계를 한다.

# Paerallel GC  
![paerallel_gc]({{ "/assets/images/gc/paerallel_gc.png"}})  
- Java7, 8의 default 알고리즘이다.
- Serial GC와 기본적인 알고리즘은 같다.(mark-sweep-compact)
- **멀티쓰레드 환경에서 사용**하기 위해 만들어진 알고리즘이다.

# CMS GC  
![cms_gc]({{ "/assets/images/gc/cms_gc.png"}})  
- Initial Mark는 클래스 로더에서 가장 가까운 참조된 객체만 찾는다.
- Concurrent Mark는 새로 추가되거나 참조가 끊긴 객체를 확인한다. (다른 스레드와 동시 실행 가능)
- Remark는 Concurrent Mark에서 새로 추가되거나 참조가 끊긴 객체를 확인한다.
- Concurrent Sweep는 쓰레기 객체를 정리한다. (다른 스레드와 동시 실행 가능)
- 해당 알고리즘은 stop-the-world 시간이 짧다.

- 단점
    - 다른 Serial GC, Paerallel GC보다 CPU, Memory를 더 많이 사용한다.
    - 기본적으로 compact를 지원하지 않아서, 메모리 단편화가 발생할 수 있다.
    > 메모리 단편화로 인해, compact를 수행하면 다른 GC보다 느릴 수 있다.