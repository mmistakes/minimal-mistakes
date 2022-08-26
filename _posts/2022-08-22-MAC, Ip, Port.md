---
title: "[네트워크 기초]MAC주소, IP주소, Port번호"
categories: Network
tag: [Network]
toc: true
author_profile: false
sidebar:
 nav: "docs"
#search: false

---

# MAC주소, IP주소, Port번호

![image](https://user-images.githubusercontent.com/75375944/185777044-0aaac0ff-b69b-4c03-ab0d-41be9cdc5b6d.png)

## MAC주소, IP주소, Port번호는 무엇에 대한 식별자일까?

MAC 주소는 **NIC**에 대한 식별자이다

IP주소는 (v4, v6) **HOST**에 대한 식별자이다

( HOST는 **인터넷에 연결된** 컴퓨터를 말함)

NIC은 쉽게말해 LAN카드이다. LAN카드는 유선/무선으로 나뉘는데 유/무선 가리지 않고 MAC주소를 가지고 있다. 예를들어 노트북 하나에 유선 LAN카드, 무선 LAN카드 총 2개가 있다면 NIC 또한 2개가 있는 것이다.

IP주소는 인터넷에 연결된 ‘컴퓨터’에 부여된다. 여기서 생각해볼 것은 인터넷에 연결된 컴퓨터 1개가 있다면 IP주소는 몇개있을까? 정답은 ‘n개’이다.

상식적으로 NIC이 1개면 IP주소가 1개일 것같지만 그렇지않다. NIC하나에 여러개의 IP주소를 바인딩(맵핑이라고도 부름) 할 수 있기 때문이다.

또한 MAC 주소는 하드웨어 주소라고도 하는데, MAC주소는 변경가능하다는 점을 알아두자.

**Port 번호는 어떤 것에 대한 식별자인가? 라는 질문은 업무별로 답이 다를 수 있다.**

소프트웨어를 개발하거나 관리하는 사람에게는 Process , 네트워크 관리하는 4계층에 속한 일을 주로하는 사람에게는 Service이다.

---

<aside>
⛔ 예를들어 Web의 HTTP는 보통 TCP 80번 Port를 쓰지만 8080을 쓰는 경우도 있다. 그렇기 떄문에 네트워크 종사자에게 “80번 Port를 열어주세요~” 라기보다는 “HTTP 서비스 열어주세요~” 라고 많이한다.

</aside>

---

하드웨어 수준에서 일하시는 분들에게는 Port번호가 인터페이스 번호이다. 

(공유기 단자의 번호)

그래서 MAC 주소나 IP주소에 비해 Port번호는 여러가지 형태로 식별의 대상이 달라진다는 점을 기억해두자.
