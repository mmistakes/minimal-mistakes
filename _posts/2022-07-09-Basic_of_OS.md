---
layout: single
title:  "Basic of OS "
categories: [Operating System,OS,Basic]
tag : [Operating System,OS]
toc: true
author_profile: false
sidebar:
  nav : "docs"
search: true
---

### 시작하며 

os 내용 들어가기 전에 전체적인 그림을 보는 파트 입니다. 
전체적으로 컴퓨터 구조가 어떻게 이루어져 있는지 알 수 있습니다. 

<a href="{{site.url}}/pdfs/basicOS.pdf">Basic_of_OSpdf</a>



-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




### 내용 정리 

컴퓨터는 여러개의 cpu와 장치들로 이루어져 있다. 실행시키려면 메모리에 load되어있어야 한다 



![화면 캡처 2022-07-09 194116]({{site.url}}/images/2022-07-09-Basic_of_OS/화면 캡처 2022-07-09 194116.png)



> **OS 정의와 관련 키워드**
>* 하드웨어와 유저 사이의 interface이다 
>* Bootstrap program
  - 컴퓨터가 시작할때 작동하는 프로그램 
  - ROM에 저장되어있다 
  - OS 를 load할 위치와 system을 실행할 방법을 알고 있다 
  - OS kernel에서 위치되어있고 load된다 




* **interrupt**
  - event에 의해 발생한다 


* **system call** 

* OS는 각 device controller에 대해 device driver를 가지고 있다 



> **IO Operation**
>
> * **device controller**
>
>   * Hardware program
>
>   * 장치와 OS에서 명령을 수신하는데 사용할수있는 모든 종류의 소프트웨어간의 고속도로 역할을 한다 
>
>   * local buffer를 가지고 있다 
>
>   * 1. Input register, output register(Data register) - for data
>
>     2. Control register - CPU가 보낸 I/O 명령을 임시저장하는 역할
>
>     3. Status register - Data Register의 상태를 표시 받을 준비가 됐는지 안됐는지
>
> 
>
> * **device driver**
>   * device와 OS 사이의 interface 역할을 한다
>   * 다른 종류의 OS의 상호작용을 위한 software program
> * 

![blog_2]({{site.url}}/images/2022-07-09-Basic_of_OS/blog_2.png)





> device driver는 device controller안에 레지스터에 적절한 레지스터 내용을 load한다 (예 키보드에서 친 글자에 대한 레지스터 내용 cpu는 받은 내용이 키보드에 어떤 글자인지 모르니까 키보드 device controller에게 관련 레지스터 내용을 넘긴다 )
>
> dvice controller안에 loca buffer가 가득 차면 device controller는 device driver에 interrupt 걸어서 알린다



> 많은 디바이스가 있으면 interrupt 많이 걸리는 구조(per bit 마다 interrupt를 걸기 때문이다) 이기 때문에 DMA라는 구조를 사용해서 해결한다 원래는 cpu를 통해서만 메모리 접근이 가능한 구조인데 DMA controller도 메모리에 접근할수있게 함으로써 많은 IO deviec 처리 성능을 올린다 
>
> local buffer 작업이 다 끝나면 메모리로 복사하는 작업을 해주고 interrupt를 발생시켜서 한번에 처리하는 방식이다 
>
> -> per block 마다 interrupt한다 



----------------------



## *프로세스 A가 디스크로부터 파일을 읽어오는 명령을 실행한다고 했을 때 내부적으로 일어나는 과정은 다음과 같다.*

 

1. 프로세스 A가 시스템 콜을 요청하면서 CPU 내에 인터럽트 라인을 세팅한다.

2. CPU는 실행 중이던 명령어를 마치고 인터럽트 라인을 통해 인터럽트가 걸렸음을 인지한다.

3. mode bit를 0으로 바꾸고 OS에게 제어권을 넘긴다.

4. 현재 실행 중이던 프로세서의 상태 및 정보를 PCB(process control block)에 저장한다. 그리고 PC(program counter)에는 다음에 실행할 명령어의 주소를 저장한다.

5. 시스템 콜 루틴에 해당하는 곳으로 점프하고, 시스템 콜 테이블을 참조하여 파일 읽기에 해당하는 시스템 콜을 실행한다.

6. 해당 루틴을 끝내면, mode bit를 1로 바꾸고 PCB에 저장했던 상태들과 PC를 복원시킨다.

7. PC에 저장된 주소(=마지막으로 실행했던 명령어의 다음)로 점프하여 계속 실행한다.



-----------------------



> **mutiprograming and multitasking**
>
> 한 작업이 다른 일을 하고 있다면(IO작업)  cpu의 사용률을 높이기 위해 다른 작업에 cpu를 사용할 수 있다
>
> 
>
> time sharing system : cpu가 특정 시간에만 사용 할 수 있다. 많은 task들이 공유 할수 있는 구조 ==> multiprogramming과의 차이점이다