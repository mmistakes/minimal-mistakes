---
title: "[네트워크]Host, Switch, Network"
categories: Network
tag: [Network]
toc: true
author_profile: false
sidebar:
 nav: "docs"
#search: false

---

# Host, Switch, Network

![image](https://user-images.githubusercontent.com/75375944/185777044-0aaac0ff-b69b-4c03-ab0d-41be9cdc5b6d.png)

앞선 포스팅에서 Host라고 하는것은 ‘**네트워크에 연결된** **컴퓨터**’라고 하였다.

근데 이 Host라는 것은 크게보면 **네트워크를 기본**으로 설명할 때 보면

Host 중에서 [네트워크 자체]로서의 Host가 있고, [네트워크 이용주체]로서의 Host가 있다. 네트워크 자체를 이루면 기본적으로 **Switch**라고 봐야한다. 그러니까 네트워크에 연결된 컴퓨터가 **Host**인데, 네트워크 자체를 이루는 컴퓨터라면 **Switch**라고 부르는 것이다.

<aside>
⛔ 네트워크에서 host는 어떤 기능을 함에따라서 달라짐을 기억해두자.

</aside>

이와 달리 네트워크 이용주체로서의 Host는 End Point(단말)이라고 부른다.

이런 End Point는 역할에 따라 Host를 나누는데 Server, Client가 가장흔하고 이러한 개념없이 존재하면 Peer라고도 한다.

네트워크 자체를 이루는 Swtich에는 대표적으로 Router가 있다. 네트워크에서 가장 유명한 네트워크는 Internet인데 Internet을 이루는 중요한 요소로 Router와 DNS를 꼽을 수 있다. 즉 Internet을 Router와 DNS의 집합체로 생각할 수 있다.

Router같은 Switch 이외에도 방화벽(Firewall), IPS 등 이런 것들도 Swtich라고 할 수 있지만 역할에 따라 나뉜다. 단 얘네들은 보안 때문에 Swtich 했다고해서 보안 Swtich라고 한다. (Router의 경우에는 경로 선정을 위한 Swtich이다.)

MAC 주소는 하드웨어 영역 중에 L2에 속한다. 그러면 MAC 주소를 가지고 Switcing을 하면 이 Swtich를 L2 Switch라고 한다. IP주소는 L3에 속하므로 같은 논리로 L3 Swtich, Port번호는 L4 Switch라고 한다. HTTP 통신프로토콜로 Switch를하면 L7 Swtich가 된다. (L1에서 L7로 갈수록 가격이 비싸지고 연산이 복잡해진다..)

L4에서 가장 중요한 것은 TCP , L3에서 가장 중요한것은 IP이다. TCP/IP 에서 슬래시 / 로 표기하는 것은 계층이 다르기때문이다. 그리고 하드웨어 영역(L1, L2)에서 가장 흔한 것은 흔히 유선이라고 하는 Ethernet이다. (802.11~~는 무선)

~~그렇다면 공유기는 스위치라고 말할 수 있을까..?~~
