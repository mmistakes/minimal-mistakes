---

title: "[네트워크 기초]Inline구조와 Out of path 구조"
categories: Network
tag: [Network, 네트워크, Out of path, Inline]
toc: true
author_profile: false
sidebar:
 nav: "docs"
#search: false

---

# Inline 구조와 Out of path 구조

    

![line](https://user-images.githubusercontent.com/75375944/188142944-f4b78419-ebd1-47f1-8719-8dbac22db9f7.jpeg)

Inline 구조와 더불어 Out of path 구조를 알아보자.

    

네트워크 장치가 있다면 그 네트워크 장치가 뭐하는 놈이에요? 라는 질문의 답은 뭐가될까..?

    

네트워크 장치는 **Inline Device인지**, **Inline 방식으로 설치를 하면 되는지** 아니면 **Out of path 방식으로 설치를 해야는지**를 따져야한다. 

    

우선 네트워크 장치는 주로 **Inline**이다.

PC#1의 IP주소가 10.10.10.100

PC#2 10.10.10.101

PC#3 10.10.10.102

PC#4 10.10.10.103

이라고 가정해보자.

    

또 이 4개의 PC의 입장에서 게이트 웨이는 Router가 되고 Router의 IP주소는 10.10.10.1 (게이트웨이의 경우 끝자리에 Host ID 1번을 많이준다.) 으로 생각해보자.

    

중요한건 대략적으로 Router를 중심으로 안쪽은 내부망 바깥쪽은 외부망이 된다. 이때 Router 앞에 방화벽을 두기도 하는데 Router나 방화벽(F/W) 둘다 Inline 장치구조를 가지고 있다. 만약에 네트워크를 고속도로라고 생각해보면 Inline 장치를 톨게이트로 생각하면 된다. 이들은 Inline 구조이기 떄문에 **ByPass** 혹은 **Drop** 두가지 일을 할 수있다.

    

    

![line2](https://user-images.githubusercontent.com/75375944/188142940-0cd2d307-b779-4efe-87d1-18112aae2e48.jpeg)

    

그런데 여기서 포트미러링이라는게 있다. 보통 Distribution 급에서 지원하는데, NIC 중 하나의 선을 따서 장치를 꼽은 후에 Copy를 시킨다. 뭐라도 Distribution Switch를 지나가는게 있다면 장치에 복사를 해둔다는 의미이다. 그럼 복사를 받은 장치는 읽기만 (Read Only) 한다.

    

Distribution Switch 쪽에 포트가 n개 있으면 여러 L2에 연결되있을 것이다. 이 n개 중에 왔다갔다하며 복사되는 것들을 다른 특정 Port에다가 Copy를 해주는데 원본과 사본이 동일하므로 Mirroring이라고 한다. 이를 **Port Mirroring**이라고 한다.

    

Distribution Swtich에도 Cpu가 있는데 뭔가가 지나갈 때마다 복사를 해주면 Cpu가 과부하가 걸린다. 그래서 포트미러링을 네트워크관리자는 가급적 안하려고 한다.

    

앞서 복사 즉, 미러링 받은 장치는 오직 Read만 한다고 했다. 이렇게 설치된 것이 **Out of Path**이다.

Out of Path 로 설치된 요소는 기본적으로 센서(Sensor)일 가능성이 높다.

    

뭘 탐지하느냐에 따라서 네트워크에 장애가 일어나는지 보려고하면 장애대응 센서,

DPI를 실시해서 타인이 해킹하는지 알아보려면 IDS 등등 여러가지 용도로 사용된다.

    

Distribution Switch와 Router사이에 Tab Switch라는게 있다. Tab은 그 사이를 통과하는 것을 다 ByPass 시키지만, 그 대신에 다 Copy해주는 Copy 전문이다. Tab은 NIC이 어느 방향을 향하든 전혀 통제하지않지만, 다른 인터페이스 모두에게 패킷을 복사해주고 패킷을 장애, IDS, 관리 등등의 용도에 활용한다. 그렇기 때문에 단 하나의 패킷이 지나가도 카피를 여러번하게 되므로 Cpu를 많이 쓰게된다는 점을 주의하자.

    

Network가 고속도로면 Out of Path는 막지는 못하지만 자동차를 탐지하는..

마치 과속감시카메라와 비슷한면이 있다.
