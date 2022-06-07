---
layout: single
title:  "Process Synchronize"
categories: [Operating System,OS,process,synchronize]
tag : [Operating System,OS,process,synchronize,Mutex,Critical Section,Critical Section Problem,Semaphore,]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---




### 내용 요약 및 정리 

* 문제 : 다수의 프로세스들끼리 데이터가 공유되는 경우 프로세스들 간 임계 구역의 이용 순서는 반드시 동기화 되야 함 프로세스들간의 동기화는 어떻게 적절하게 구현 해야 하는가?에 대한 문제


* critical section problem 해결 방안에 반드시 만족되야하는 특성 

  * mutal exclusion : 프로세스/스레드는 같은 critical section에 있으면 안된다 즉 상호 배타성이 보장되어야한다

  * progress : Critial section에 진입중인 프로세스/스레드가 없다면 대기중인 프로세스들 중 하나를 적절히 선택해서 진입시켜야한다 즉 진행성이 보장되어야한다
  
  * bounded waiting : 모든 협동관계 프로세스들은 임계구역에 한정된 시간 내에 진입해야한다 


* 세마포어 할때 인터럽트 막아놓으면 critical section에서 문맥 전환이나 다른 이유로 강제로 빠져나오는 일은 없을테지만 여전히 해결되지않음 왜? 멀티 cpu 코어 시스템이기 때문이다. 명령어들이 동시에 실행 된다 여전히 다른 cpu코어에서 접근이 가능하다 
그리고 인터럽트를 한번에 막았다가 다시 푸는것도 시간 낭비가 크다 


* mutex : lock을 써서 cs문제 해결 lock획득하는 연산을 통해 획득을 해야 cs에 진입 가능 아니라면 계속 대기 상태가 된다 -> busy waiting == cpu 사이클 낭비 

* mutex는 multi core환경이고 cs이용하는 평균시간이 짧다면 오히려 lock획득위해 계속 while돌게하는것이 context switching 발생안시키니까 오버헤드 줄인다 

* Atomic 명령어 

  * 실행중간에 간섭받거나 중단되지 않음이 보장된 명령어 
  * 같은 메모리 영역에서 대해 동시에 실행되지 않는다 
  * contex switching 일어나지 않음을 보장한다 


* 세마포어 : 동기화 대상이 1개 이상이다. 멀티 프로그래밍 환경에서 공유된 자원에 대한 접근을 제한하는 방법이다. 작업간에 실행 순서를 동기화 해야한다면 세마포어를 사용하자 



















