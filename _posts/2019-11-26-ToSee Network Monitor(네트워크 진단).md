---
layout: post
title: "ToSee Network Monitor(네트워크 진단)"
excerpt_separator: "<!--more-->"
date : 2019-11-26 11:45:35 +0100
categories:
  - ToSee
tags:
  - ToSee
  - network
---
### 트레이에서 에이전트아이콘을 우클릭한후 에이전트메뉴를 선택한다.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/network/agent_menu.png){: .center}

### 에이전트 메뉴에서 PC 네트워크진단을 클릭한다.(좌측버튼)
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/network/agent_main.png){: .center}

###  네트워크 모니터가 실행되면 붉은색으로 표시된 곳에 네트워크장치가 제대로 선택이 되었는지 확인한다.(자동으로 활성화되어 있는 랜카드를 선택하도록 되어 있다.)
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/network/lancard.png){: .center}

### 시작버튼을 누르면 다음과 같이 네트워크의 상황이 표시되면서 벡터그래픽으로 네트워크의 상황을 확인할 수 있다.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/network/network_1.png){: .center}

### 마우스의 휠을 이용해서 화면을 확대 또는 축소할 수 있다.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/network/network_2.png){: .center}

### 상단의 패킷아이콘을 클릭하면 그래프에서 패킷형으로 변경되어 전송되는 데이타의 크기와 상황을 수치로 확인할 수 있으며 실제 전송된 패킷데이타를 확인할 수 있다.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/network/packet.png){: .center}

### 저장을 선택하면 현재까지 캡쳐한 네트워크 데이타를 Binary 데이타로 저장을 하게되고 XML을 선택하면 XML형태로 저장을 하게 된다.
![image-center]({{ site.url }}{{ site.baseurl }}/assets/images/network/save.png){: .center}

### 그래프의 원형아이콘의 색상은 다음과 같다.
  * BLUE : 자기자신을 표시한다.
  * PURPLE : 사성망 IP를 표시한다.
  * RED : 브로드캐스트/멀티캐스트를 표시한다.
  * BLACK : 공인IP를 표시한다.

### 해당 원형 아이콘선택후 우클릭을 하면 다음메뉴가 나온다.
  * 선택노드의 패킷보기
  * Whois 정보
  * 프록시 서버 여부 판단.