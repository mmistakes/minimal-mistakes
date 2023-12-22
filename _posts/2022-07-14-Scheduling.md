---
layout: single
title:  "Scheduling"
categories: [Operating System,OS,Scheduling,priority inversion,priority scheduling,Round Robine scheduling]
tag : [Operating System,OS,CPU scheduling]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---



### 시작하며 

이번 포스팅에서는 스케쥴링 알고리즘에 관하여 포스팅 합니다 관련 내용은 아래 pdf에서 확인 할수있습니다. 



(전반적인 내용이 pdf와 겹치는 내용의 반복일것 같아서 따로 내용 정리는 생략 했습니다)



추가로 포스팅하는 내용은 priority inversion 우선순위 역전에 관하여 추가 하고 포스팅 마무리 하겠습니다.



<a href="{{site.url}}/pdfs/scheduling.pdf">Scheduling_PDF</a>



--------




### 추가 보완 내용 



## <span style='background-color: #f1f8ff'>**priority inversion**</span>



> **우선 순위 역전 문제**
>
> - 우선 순위가  높은 태스크가 READY상태 (실행 가능)로 바뀌었지만 더 낮은 우선순위의 태스크가 CPU를 점유하고 있어서 실행되지 못하는 상태
>
>   
>
>   > **발생 원인 :** 스케쥴링과 동기화 사이의 상호 작용 결과로 발생한다 
>   >
>   > 스케쥴링 규칙에서 실행되어야 하는 스레드와 동기화에서 실행되어야하는 스레드가 서로 다른 경우 
>   >
>   > 결과적으로 두 스레드의 우선순위가 역전되어 나타난다 
>
>    
>
>   1. 비선점 스케쥴링이 낮은 우선순위의 task가 자원을 점유 [no preemption scheduling] 
>   2. RTOS서의 multex를 위한 세마포어를 이용 
>   3. 공유자원의 장기 소유
>   4. 자원점유후 release시 낮은 우선순위의 태스크가 자원을 점유하는 경우 
>
>    
>
>    
>
>   RTOS 개발시 태스크간에 우선순위를 예상하여 inversion 일어나지 않도록 해야한다 
>
>    
>
>    
>
>    
>
>   **해결 기법** 
>
>    
>
>   1. **Priority inheritance protocol (계승 프로토콜)**
>
>      
>
>      * 우선순위가 낮은 프로세스가 세마포어를 소유하고 실행중일때 우선순위가 높은 
>
>        프로세스가 실행되었을때 세마포어가 없다면 실행이 안되는데 우선순위가 낮은 프로세스를 
>
>        우선순위가 높은 프로세스만큼 우선순위를 일시적으로 높여주는 것이다
>
>        
>
>        * 높은 우선순위의 프로세스를 블록시키고 있는 프로세스(하)는 높은 우선순위 프로세스의 우선순위를 계승하는것이다. 이 프로세스(하)가 세마포어를 반환하면 원래의 우선순위로 되돌아간다. 
>
>        
>
>   
>
>   ![ffff]({{site.url}}/images/2022-07-14-Scheduling/ffff.png)
>
>   
>
>   ![dfg]({{site.url}}/images/2022-07-14-Scheduling/dfg.png)
>
>   
>
>   
>
>   2.  **Priority ceiling protocol (상한 프로토콜)**
>      * 주로 1번 방법으로 해결하는것 같아서 따로 정리는 안했습니다. 필요해지면 다시 업데이트 하는 방식으로 하겠습니다. 키워드는 있으니까 궁금하신 분은 검색 하시면 될것 같아요 
