---

title: "[네트워크 기초]Router의 내부 구조와 Inline"
categories: Network
tag: [Network, 네트워크, Router, Inline]
toc: true
author_profile: false
sidebar:
 nav: "docs"
#search: false

---



# Router의 내부 구조와 Inline

**Router의 내부구조,** 좀 더 정확하게말해 **Inline 구조 장치**에 대해 알아보자.

<aside>
⛔ 앞선 [L2 스위칭] 포스팅 참고해주세요

</aside>

                    

![l1](https://user-images.githubusercontent.com/75375944/187895506-ae764c56-cf83-4eb1-99f3-d3362ab06ae5.jpeg)

    

PC가 한대에 인터페이스가 있고 L2 Access를 만나서 UpLink하여 L2 distribution 만나고 Router를 만난다. 이때 Router 인터페이스는 최소한 2개이다. 이 Router 밖을 나가면 그때부터 Internet이라고 할만하다. (항상그런건아님) 또한 Internet 저 너머에 또 Router가 있고 Naver와 연결될수 있다.

    

그래서 PC가 Naver에 접속을 한다고하면 트래픽이 왼쪽부터 오른쪽으로 흘러 갈것이다.

중요한건 이때 Router 들인데 이 Router들도 Host라고 부를 수 있다. 그럼 Router라는것들은 결국 컴퓨터인가? YES (Cisco에서 파는 Router의 운영체제도 ios다.)

    

![l2](https://user-images.githubusercontent.com/75375944/187895516-4777bb0d-4560-402b-a691-d4732cf4646f.jpeg)

    

Router의 네트워크 인터페이스카드 (NIC)는 최소 두개가 필요하고 이를 NIC#1, NIC#2라고 하자.

NIC#1의 경우 내부로 들어가고 NIC#2는 외부로 나가도록 구현된다.

여기서 중요한 것은 Router도 운영체제이므로 TCP/IP가 있을 수 있다. 그리고 User 모드 영역에 각종 Process가 존재할 수 있다.

    

그렇다면 패킷이라는 것이 처리될 때, Router같은 Inline같은 장치가 어떻게 처리될까?

내부에 들어와서 NIC#1 → TCP/IP → Process → TCP/IP → NIC #2 → 외부로 나가는 구조일 수 있겠다.

이때 User모드 , Kernel모드, 하드웨어를 나누는 경계선을 건널 때마다 많은 전산비용이 들어간다. 또한 처리지연이 발생한다. 

    

그렇다면 NIC#1에서 NIC#2로 다이렉트로 하드웨어 수준에서 처리가 된다면 가장 좋은게 아닌가? 이를 ‘가속했다’라고 이야기한다.

    

정리하자면 기본적으로 처리를 할 수 있는 곳이 3곳이 있다.

- 1번 User모드에서 Process 수준
- 2번 Kernel 모드에서 TCP/IP 수준
- 3번 하드웨어 영역에서 NIC 수준이 있다.

당연히 하드웨어 처리하는게 가장 빠르다.

    

근데 문제가 있는데, 패킷 단위 데이터를 단순 전송하겠다하면 패킷이 내부에 들어와서 NIC#1에 왔다고 하면 위의 과정으로 외부로 보낼 수도 있지만 또 다른 NIC인 NIC#3이 존재할 수도 있는 법이다.

    

따라서 내부에 들어와 NIC#1에서 왔다가 TCP/IP로 유입되었으면 어느 NIC으로 보낼지 선택을 해야한다. 즉, 인터페이스를 선택해야한다.

    

네트워크로 프레임 단위 데이터가 들어온 후 패킷단위로 잘라지든 어떻게 되었든 데이터를 Read한 것이다. 그 다음 처리하고 Write 해야하는데 그때 NIC을 고르는 선택이 일어나는 것이다. 만약 Read를 했는데 Write를 안해버리면 패킷이 잘가다가 Router를 만나서 Drop이 되버린다. 이런것들을 filltering 이라고 말할 수 있다. Drop이라는 것은 결과적인 현상이다.

    

패킷의 정보를 보고 어디로 보낼지 결정해야하는데 이 결정하는데에 가장 많이보는게 L3스위치니까 IP주소를 보고 할 것이다. 그런데 두 개의 NIC중 적절한게 없으면 못보내서 Drop 되는 경우도 있다.

    

또한 패킷이 내부에서 외부로 가는경우만 아니라, 안으로 유입되는 경우 (인바운드)에 그때마다 Inline 장치는 Bypass 하던지 Drop 하던지 둘중 하나의 결정을 해야한다.

    

중요한 것은 처리인데 이때 단지 Routing에 관련된것만하면 Router, 보안적인 이유를 가지고 처리하면 방화벽이 된다. 패킷 단위를 다루는 패킷 필터링 방화벽이 된다. 결국 이 둘은 구조가 거의 흡사다고 말할 수있다.
