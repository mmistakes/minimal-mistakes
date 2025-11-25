# 1. What is SCADA

## 1.1. SCADA by Nvidia
- SCaled Accelerated Data Access 의 약어
- GPU as **a data access engine**
- Compute node의 GPU가 Storage node를 직접 접근하는 구조

### Figure 1. H3 Platform Gen5 System
![H3 Platform Gen5 System](/SCADA/images/Pasted-image-20251121141118.png)

## 1.2. Architecture and Components
![SCADA Architecture](/SCADA/images/Pasted-image-20251121141740.png)

### 구성요소
 - client와 server는 둘 다 software라고 생각하면 됨.
 - 간략히 compute node와 storage node가 있고, 이 둘이 통신하여 필요한 data를 공급 받음.
#### SCADA Client
- GPU Application Threads: 데이터를 요청하는 주체 (100K 개 이상의 threads)
- SCADA Data Service Client:
	- 애플리케이션과 함께 컴파일되는 헤더 전용 라이브러리 (Header-only library)
	- 애플리케이션 내부에서 데이터 버퍼 관리 가속
	- 소프트웨어 캐시: HBM 내에 어플리케이션이 정의한 맞춤형 캐시

#### SCADA Server
- SCADA Server: 클라이언트의 요청을 받아 처리
- CPU Host process:버퍼 등록(Registration)이나 하우스키핑(House Keeping) 같은 관리 작업 담당
- Accelerated by GPUs and Grace CPUs

#### Protocols
- Data Path
	- DMA over PCIe
	- RDMA over IB/Ethernet
- Control Path
	- secure IPC and/or RDMA
	- GPU oriented proprietary protocol(GPU 병렬성을 살릴 수 있게 새롭게 만든 프로토콜임)

## 1.3 What is it for?
	Q1. 왜 GPU가 직접 Storage에 접근해야 하나? (기존 CPU 방식은?)
	Q2. 어떻게 GPU가 NVMe에 접근하나? (기술적으로 가능한가?)
	Q3. 이게 정말 빠른가? (성능 효과는?)
	Q4. SSD의 역할은 어떻게 바뀌나? (For SCADA system)

---
# QnA

Q0. Trusted vs. untrusted
- SCADA Client와 SCADA Server에 쓰인 내용을 보면 client에는 untrusted, server에는 trusted라고 쓰여있어. 무슨 의미야? 뭘 신뢰할 수 있다는 거야? 그리고 client가 untrusted라는 건 또 뭐야?
> 여기서의 trust는 '시스템의 무결성과 데이터 보호를 책임질 수 있는가'에 대한 *보안* 관점에서의 구분이다.
> - Client; compute node는 사용자의 application (*User Code*)가 실행된다. 코드가 잘못 짜여 있거나 악의적으로 다른 사용자의 데이터 영역을 건드릴 수 있다. 따라서 *시스템 입장*에서는 "얘가 무슨 짓을 할지 모르니 일단 untrusted로 권한을 제한하자"는 판단을 한다.
> - Server; storage node 는 시스템 관리자가 설치한 공식 서비스 (*System Code*)가 실행된다. 철저히 검증된 코드이므로 실제 물리적 스토리지에 접근할 수 있는 privilige 권한을 가진다. Server는 client의 요청이 유효한지 검사하고, 안전한 경우에만 데이터를 내준다. 따라서 trusted라고 한다.

Q1. SCADA Client
- "data buffer management through application defined (customized) software cache in HBM" 이라는 문장을 동작 예시로 설명해줄래? 이해가 잘 안 가.
> GPU 메모리 (HBM) 안에 사용자가 원하는 cache를 만들어서 관리할 수 있다. 하드웨어나 OS가 아닌 application level의 software가 직접 통제한다; 사용자에게 편리한 방법이다. 만약 사용자가 GNN 학습 중에 ID 1-100번 nodes를 자주 사용되도록 설계했다면, SCADA client를 통해 해당 nodes가 HBM 내부에 항상 상주하게 만들 수 있다.


Q2. SCADA Server
- SCADA Server는 storage node라고 이해해도 되는가?
- Storage node에서는 CPU와 GPU가 모두 일을 한다고 했는데, GPU는 BaM과 같은 병렬성 높은 I/O request 생성일 거 같은데 CPU가 한다는 buffer registeration이나 house keeping은 어떤 동작인가?
>-  SCADA Server는 storage node(HW)를 운영하는 SW로 '최근류'는 다르나 기능상 동일한 걸 지칭하므로 storage node라고 보아도 된다.
>- Buffer Registration: RDMA 통신을 하려면 메모리 주소를 NIC(랜카드)에 등록해야 한다. 이 때 OS kernel 권한이 필요하므로 CPU가 동작한다.
>- House Keeping: 에러 로그 기록, 클라이언트 접속 관리, 보안 키 교환 등 복잡한 (근데 빈도는 낮다) 관리 업무도 CPU가 한다.
>

Q3. Protocols관련
- IB는 무엇의 약어이며 무엇인가?
- RDMA는 그럼 PCIe를 통한 DMA보다 느린가?
- 언제 DMA를 쓰고 언제 RDMA를 쓰는가? 설명이 되어있나?
>- IB는 InfiniBand를 말한다. 일반 인터넷용 ethernet과 달리, 슈퍼컴퓨터나 AI 클러스터 내부에서 서버끼리 *초고속, 초저지연*으로 통신하기 위해 만들어진 고성능 네트워크 표준이다.
>- 일반적으로 RDMA는 DMA over PCIe 보다 느리다. 물리적 거리와 신호 변환 과정 때문에 그러하다 하지만 최신 RMDA 기술은 많이 개선 되어 격차가 좁혀졌다.
>	- DMA (Local/PCIe) : latency < 1us
>	- RDMA (Network) : latency < 1˜5us
>- DMA와 RDMA을 쓰는 상황은 다음과 같다.
>	- DMA : 하나의 compute node 내부에서 device끼리 통신 또는 PCIe 케이블로 nodes(compute - storage)끼리 직결한 경우
>	- RDMA : Compute node와 storage node가 네트워크 스위치를 통해 연결되어 있는 경우.

Q4. Client GPU -> Server GPU -> SSD 통신 내용
>- Client GPU -> Server GPU
>	- Memory Polling 방식 사용 (No Doorbell)
>- Server GPU -> SSD
>	- NVMe Spec. 따름 (Doorbell)
