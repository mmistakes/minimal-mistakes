---
layout: single
title:  "Process thread Synchronize"
categories: [Operating System,OS,process,synchronize,Mointor,semaphore,mutex,critical section,lock]
tag : [Operating System,OS,process,synchronize,Mutex,Critical Section,Critical Section Problem,Semaphore,monitor,lock]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---



### 시작하며 

이번 포스팅에서는 semaphore,mutex,monitor에 대한 개념을 조금 더 추가 해서 정리 하겠습니다


아래 pdf 링크에서 정리 했던 내용을 확인 할수있습니다. 

<a href="{{site.url}}/pdfs/Process_Syn.pdf">process_thread_syn_pdf</a>



---------





## <span style='background-color: #f5f0ff'>critical section problem</span>



한 프로세스 내에서 타 프로세스들과 공유하는 영역에 접근하는 코드상의 영역이다. 

**다수의 프로세스들끼리 데이터가 공유되는 경우 프로세스들 간 critical section의 이용순서는 동기화가 되어야한다 동기화를 어떻게 할것인가에 대한 문제 이다**



![ㅁㄴㅇㄹ없는 그림]({{site.url}}/images/2022-04-26-process_syncri/ㅁㄴㅇㄹ없는 그림.png)







이를 해결하기 위한 기본 뼈대는 위의 그림과  같다 critical section들어가기 전에 즉 entry section에서 대기하는 영역 필요하고 critical section 이용 후에는 exit section에서 critical section 사용을 완료 했다고 알리는 영역이 필요하다 



critical section problem이 해결 되기 위해서는 3가지가 충족 되어야 한다 



1. **mutex Exculsion**

   - 하나의 프로세스가 임계구역 사용중이라면 다른 프로세스들은 임계구역 접근할수없다 즉 동시에 접근할수없다는 이야기이다

   - 이 특성은 write only 파일 같은 경우 필요한 특성이다. 

   - 하지만 Read only 처럼 수정이 불가능 하다면 상호 배타성 특성이 없어도 무방하다 

     

2. **progress**

   - 임계구역에서 진행하는 프로세스가 없다면 대기중인 프로세스가 임계구역을 사용해야함을 의미한다 즉 진행성이라고 보면 된다 

     

3. **Bounded wating** 

   - 모든 프로세스들은 임계구역에 한정된 시간 내에 진입 해야한다 즉 하나의 프로세스가 무한한 시간동안 임걔구역을 사용할수없다 
   - 기근 현상을 방지 하기 위함이다 





이 문제를 해결 하기 위해 

HW solution -> mutex 

SW solution -> semaphore 





----------------



## <span style='background-color: #f5f0ff'>Mutex (HW solution)</span>



가상의 잠금 장치인 lock을 이용해서 임계구역 동기화하는 방식이다. 

lock은 sharable resource이다. 



lock을 획득하는 함수는 atomic operation이다 



<span style='background-color: #fff5b1'>atomic operation</span>

* 실행중에 간섭받거나 중단되지 않는다 
* 같은 메모리 영역에 대해 동시에 실행되지 않는다 
* context switching 일어나지 않음이 보장 된다 





![화면 캡처 2022-07-19 162618]({{site.url}}/images/2022-04-26-process_syncri/화면 캡처 2022-07-19 162618.png)



> lock이 없어야 while문에서 빠져 나오고 cs 영역으로 들어갈수있다 
>
> cs영역 사용 이후 lock을 해제 해준다 
>
> 위의 구조는 mutex exculsion 만족하지만 bounded waiting은 만족하지 못한다



**pros**

멀티 코어 환경이고 cs이용 시간이 평균적으로 적다면 오히려 lock획득 위해 계속 while문 돌게 하는게 전체적인 overhead줄이는 방법일수있다 



**cons**

* busy waiting : lock 얻기 위해 기다리는 프로세스/스레드들은 cs 진입위해 대기중인 상태임에도 계속 실행 상태인 현상 

​		즉 대기하는데 실제로는 while문 때문에 cpu 사용하고 있다 -> cpu 사이클 낭비 

* 우선순위 역전 현상 발생할수도 있다. 실제로 우선순위가 높은 프로세스가 lock을 취할수없어서 대기 해야하는 상황 





--------------------------------



## <span style='background-color: #f5f0ff'>Semaphore (SW solution)</span>



하나이상의 프로세스 / 스레드가 critical section에 접근 가능하도록 하는 것이다. 

뮤텍스에는 임계영역에 접근 가능한 쓰레드 개수를 조절하는 기능이 없다. 그러나 세마포어는 가지고 있다.



* binary semaphore
* counting semaphore



wait,signal로 조작 된다 wait 하거나 signal중에는 semaphore 변수를 변경하는 과정이기 때문에 독립적으로 발생해야한다 



**busy waitng**을 해결하기 위해 아래와 같이 작동 시킨다 -> block 시켜서 block list로 넣는것으로 해결 





![제목 dfdfd그림]({{site.url}}/images/2022-04-26-process_syncri/제목 dfdfd그림.png)





counting semaphore에서 세마포어 값 S는 공유되는 자원들의 개수(협동 프로세스/스레드 간 접근 하도록 허용된)로 초기화 된다 



예를 들어 최초에 프로세스 1, 프로세스 2, 프로세스 3이 협동 관계에 있고 공유되는 메모리 영역에 총 10개의 변수가 있다 가정하면 초기 계수 세마포어는 10의 값을 가진다 



그러나 세마포어는 deadlock, starving의 문제가 남아있다. 또한 wait, signal의 순서가 변경 되거나 하면 오류가 발생하는 구조이다 



----------



## <span style='background-color: #f5f0ff'>Monitor</span>



lock에 wating queue 뿐 아니라 conditional variable에도 wating queue가 있는 모델이다 

즉 각 conditional variable마다 하나의 대기 큐를 가지고 있는것이다. 



* 한번에 하나의 스레드만 실행돼어야 할때 
* 여러 스레드와 협업이 필요할때 



wait 상태 들어가기 전에 lock을 release하고 들어간다 



**condition variable**

조건을 기다리는 스레드들이 대기하는 공간인 waiting queue를 가집니다. condition variable은 세 가지 동작이 있는데 아래와 같습니다.



**- wait()** : 한 스레드가 condition variable에 데고 이 동작을 수행하면, 자기 자신을 이 condition variable의 waiting queue에 넣고 대기 상태로 전환하게 됩니다.



**- signal()** : 한 스레드가 condition variable에 데고 이 동작을 수행하면, condition variable의 waiting queue에서 대기 중인 스레드 중 하나를 깨우게 됩니다.



**- broadcast()** : 한 스레드가 condition variable에 데고 이 동작을 수행하면, condition variable의 waiting queue에서 대기 중인 스레드 전부를 깨우게 됩니다.

**[출처]** [동기화에서 모니터는 이렇게 사용됩니다](https://blog.naver.com/myca11/222650655740)|**작성자** 





### product/consumer problem with monitor



![화면 캡처 2022-07-21 155003]({{site.url}}/images/2022-04-26-process_syncri/화면 캡처 2022-07-21 155003.png)

​															**[출처]** [쉬운코드 유튜브 모니터 영상](https://www.youtube.com/watch?v=Dms1oBmRAlo)|**작성자** 







product /consumer 문제에서 공유되는 자원은 buffer q이다. fullCV,emptyCV는 conditional variable이다. 각 wating queue를 가지고 있다. 

producer는 buffer q가 가득 찼을때 fullCV wating queue에 삽입 한다 consumer는 buffer q가 비어 있으면 emptyCV wating queue에 삽입 하는 구조이다. 



멀티 스레드 환경이므로 여러가지 상황이 발생할수있다. 그리고 wating queue에서 스케쥴링 방식은 구현에 따라 다를수있다. 

또한 운영체계 시스템 설계가 또 다를수 있기 때문에 wait는 반드시 while문 안에서 작동해야한다 



signal은 하나만 깨우는것이고 broadcast는 모두를 깨우는 작업이다.  signal에서는 대기 큐에 있는 task를 ready Queue로 보내서 실행 시킬수있게 한다. 







