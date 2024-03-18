---
title: "1.2 네트워크의 가장자리"
excerpt: "컴퓨터 네트워크 구성요소에 대하여 더 자세히 알아보자."
categories: ['Computer Network']
tags:
  - computer
  - network

toc: true
toc_sticky: true
use_math: true

date: 2024-03-12
last_modified_at: 2024-03-12
---
## 프로토콜이란?

* 둘 이상의 통신 개체 간의 정보를 주고 받기 위해 정한 규칙
* 통신 개체 간에 교환되는 메시지 포맷과 순서
  ### 네트워크 프로토콜
  * 통신하는 둘 이상의 원격 개체가 포함된 인터넷에서의 모든 활동은 프로토콜이 제어한다.
  * 물리적으로 연결된 두 컴퓨터의 네트워크 접속 카드에서 하드웨어로 구현된 프로토콜은 컴퓨터 사이에 연결된 '선로상'의 비트 흐름을 제어한다.
    1. 혼잡 제어 프로토콜(congestion-control protocol)
       * 종단 시스템에 있다.
       * 송수신자 간 전송되는 패킷 전송률을 조절한다.
    2. 라우터의 프로토콜
       * 출발지(source, 소스)에서 목적지(destination)까지 패킷 경로를 설정한다.

## 네트워크의 가장자리

### 종단 시스템 / 호스트
* 인터넷에 연결되는 컴퓨터와 그 밖의 장치를 일컷는다.
* 다양한 애플리케이션을 수행한다.
  * 데스크톱 컴퓨터
  * 서버
  * 이동 컴퓨터(노트북, 스마트폰, 태블릿)
  * 비전통적인 사물

**클라이언트(client)**
* 데스크톱, 이동 PC, 스마트폰...

**서버(server)**
* 웹 페이지를 저장·분배하고 비디오를 스트림하며 전자메일을 릴레이한다.
* **데이터센터(data center)**

### 접속 네트워크(access network)
* **가정 접속**
  * **DSL(Digital Subscriber Line)**
    * 기존 전화 회선을 이용하여 지역 중앙국에 있는 **DSLAM**과 데이터를 교환한다.
    * 가정의 DSL 모뎀은 디지털 데이터를 고주파 신호로 변환한다.
    * 가정으로부터 받은 아날로그 신호는 **DSLAM**에서 디지털 포맷으로 다시 변환한다.
    * 서로 다른 주파수 대역에서 인코딩 되고 데이터와 전화 신호를 동시에 전달하므로 단일 DSL 링크를 통해 전화 회선과 인터넷 연결이 동시에 가능하다.
<br> 
      * 고속 다운스트림 채널: 50 kHz ~ 1 MHz 대역
      * 중간 속도의 업스트림 채널: 4~50 kHz 대역
      * 일반적인 양방향 전화 채널: 0~4 kHz 대역
<br>
    * 최대 2.5 Mbps의 업스트림 전송률 (보통 1 Mbps 이하)
    * 최대 24 Mbps의 다운스트림 전송률 (보통 10 Mbps 이하)
    * 다운스트림과 업스트림 속도가 다르기 때문에 이러한 접속 방식을 **비대칭(asymmetric)** 이라고 한다.
<br>
  * **케이블 인터넷 접속(cable Internet access)**
    * 케이블 TV 회사의 기존 케이블 TV 인프라스트럭처를 이용한다.
    * 공유 방송 매체라는 특성을 가지고 있다.
      * 여러 사용자가 다운스트림 채널에서 다른 비디오 파일을 동시에 수신하고 있다면 실제 수신율은 작아진다.
    * **HFC(hybrid fiber coax)**
      * 광케이블, 동축케이블을 혼합하여 사용한다.
      * **광케이블**: 케이블 헤드엔드(head end)를 이웃 레벨 정션(junction)에 연결
      * **동축케이블**: 개별 가정과 아파트에 도달하는데에 사용
    * **비대칭형**
      * 최대 30Mbps의 다운스트림 전송률
      * 최대 2Mbps의  업스트림 전송률
<br>
  * **FTTH(Fiber To The Home)**
    * 각 아파트 가정까지 바로 광케이블이 들어간다.(2006이후 대부분 아파트인 경우)
<br>
  * **FTTN(Fiber to the Node)**
    * 전신주나 길가까지는 광케이블, 그 이후 집안까지는 랜선으로 연결된다.
<br>
  * **FTTC(Fiber to the Curb)**
    * 어느 지점까지는 광케이블, 그 이후 가정은 구리선으로 연결된다.(영국 BT)
<br>
  * **FTTB(Fiber To The Building)** 
    * 건물까지만 광케이블 그 이후 각 가정은 랜선으로 연결된다.(구형 아파트인 경우) (본인 아파트도 이 시스템)
<br>
* **기업(그리고 가정) 접속**
  * **LAN(Local Area Network)**
    * 일반적으로 종단 시스템을 가장자리 라우터에 연결하는데 사용한다.
    * **이더넷(ethernet)**
      * 기업, 대학, 홈 네트워크에서 가장 널리 사용되는 접속 기술
      * 이더넷 스위치에 연결하기 위해 **꼬임쌍선**을 이용한다.
      * 사용자는 보통 이더넷 스위치에 100Mbps ~ 10Gbps, 서버는 1Gbps ~ 10 Gbps의 속도로 접속한다.
<br>
    * **무선 랜(wireless LAN)**
      * 기업 네트워크에 연결된 AP(Access Point)로 패킷을 송신/수신하고 이 AP는 유선 네트워크에 연결되어 있다.
      * 사용자들은 AP에 수십 미터 반경 내에 있어야 한다.
      * **IEEE 802.11**
        * 와이파이, 100 Mbps 이상의 공유 전송률 제공
        * IEEE: 전기전자공학자협회
<br>
* **광역 무선 접속: 3G, LTE, 4G, 5G**
  * 이동전화 사업자가 제공
  * 사용자들은 기지국으로부터 수십 킬로미터 반경 내에 있으면 된다.
  * 1 ~ 10 Mbps 전송률

## 물리 매체

### 꼬임 쌍선
* 전선을 꼬아서 만들기 때문에 각 전선이 외부 영향(잡음과 혼선)에 대해 동일한 영향을 받게 됨. 많이 꼬일수록 좋은 품질이 됨.

### 전력선
* 초단 비트 전송 속도가 너무 느리기 때문
* PLC는 전력선을 매체로 통신하기 때문에 통신용 케이블이나 광섬유를 이용한 데이터 전송에 비해 구현이 어렵다. 
* 특히 높은 부하와 간섭 현상, 잡음, 가변하는 임피던스(impedance)와 신호감쇠현상 등 특수한 환경을 극복하고 제한된 전송 전력을 통해 데이터를 전달해야 하는 어려움이 따른다.


---

## 용어 정리

##### 디지털과 아날로그 시그널
* **디지털 시그널**
  * **불연속적**인 신호
  * 0과 1
  * 어떤 양 또는 데이터를 2진수로 표현한 것
* **아날로그 시그널**
  * **연속적**인 신호
  * 어떤 양 또는 데이터를 연속적으로 변환하는 물리량으로 표현한 것
<br>

##### 바이트 크기
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
  font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
<thead>
  <tr>
    <th class="tg-c3ow" colspan="2">SI 접두어</th>
    <th class="tg-c3ow" colspan="2">전통적 용법</th>
    <th class="tg-c3ow" colspan="2">이진 접두어</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-c3ow">기호(이름)</td>
    <td class="tg-c3ow">값</td>
    <td class="tg-c3ow">기호</td>
    <td class="tg-c3ow">값</td>
    <td class="tg-c3ow">기호(이름)</td>
    <td class="tg-c3ow">V값</td>
  </tr>
  <tr>
    <td class="tg-0pky">kB (킬로바이트)</td>
    <td class="tg-c3ow">1000<sup>1</sup> = 10<sup>3</sup></td>
    <td class="tg-c3ow">KB</td>
    <td class="tg-c3ow">1024<sup>1</sup> = 2<sup>10</sup></td>
    <td class="tg-0pky">KiB (키비바이트)</td>
    <td class="tg-c3ow">2<sup>10</sup></td>
  </tr>
  <tr>
    <td class="tg-0pky">MB (메가바이트)</td>
    <td class="tg-c3ow">1000<sup>2</sup> = 10<sup>6</sup></td>
    <td class="tg-c3ow">MB</td>
    <td class="tg-c3ow">1024<sup>2</sup> = 2<sup>20</sup></td>
    <td class="tg-0pky">MiB (메비바이트)</td>
    <td class="tg-c3ow">2<sup>20</sup></td>
  </tr>
  <tr>
    <td class="tg-0pky">GB (기가바이트)</td>
    <td class="tg-c3ow">1000<sup>3</sup> = 10<sup>9</sup></td>
    <td class="tg-c3ow">GB</td>
    <td class="tg-c3ow">1024<sup>3</sup> = 2<sup>30</sup></td>
    <td class="tg-0pky">GiB (기비바이트)</td>
    <td class="tg-c3ow">2<sup>30</sup></td>
  </tr>
  <tr>
    <td class="tg-0pky">TB (테라바이트)</td>
    <td class="tg-c3ow">1000<sup>4</sup> = 10<sup>12</sup></td>
    <td class="tg-c3ow">TB</td>
    <td class="tg-c3ow">1024<sup>4</sup> = 2<sup>40</sup></td>
    <td class="tg-0pky">TiB (테비바이트)</td>
    <td class="tg-c3ow">2<sup>40</sup></td>
  </tr>
  <tr>
    <td class="tg-0pky">PB (페타바이트)</td>
    <td class="tg-c3ow">1000<sup>5</sup> = 10<sup>15</sup></td>
    <td class="tg-c3ow">PB</td>
    <td class="tg-c3ow">1024<sup>5</sup> = 2<sup>50</sup></td>
    <td class="tg-0pky">PiB (페비바이트)</td>
    <td class="tg-c3ow">2<sup>50</sup></td>
  </tr>
  <tr>
    <td class="tg-0pky">EB (엑사바이트)</td>
    <td class="tg-c3ow">1000<sup>6</sup> = 10<sup>18</sup></td>
    <td class="tg-c3ow">EB</td>
    <td class="tg-c3ow">1024<sup>6</sup> = 2<sup>60</sup></td>
    <td class="tg-0pky">EiB (엑스비바이트)</td>
    <td class="tg-c3ow">2<sup>60</sup></td>
  </tr>
  <tr>
    <td class="tg-0pky">ZB (제타바이트)</td>
    <td class="tg-c3ow">1000<sup>7</sup> = 10<sup>21</sup></td>
    <td class="tg-c3ow">ZB</td>
    <td class="tg-c3ow">1024<sup>7</sup> = 2<sup>70</sup></td>
    <td class="tg-0pky">ZiB (제비바이트)</td>
    <td class="tg-c3ow">2<sup>70</sup></td>
  </tr>
  <tr>
    <td class="tg-0pky">YB (요타바이트)</td>
    <td class="tg-c3ow">1000<sup>8</sup> = 10<sup>24</sup></td>
    <td class="tg-c3ow">YB</td>
    <td class="tg-c3ow">1024<sup>8</sup> = 2<sup>80</sup></td>
    <td class="tg-0pky">YiB (요비바이트)</td>
    <td class="tg-c3ow">2<sup>80</sup></td>
  </tr>
</tbody>
</table>
<br>

##### Hz
* 1초 동안의 주기적인 진동수
* 교류(AC) 전기일 경우 1초 동안 전류의 방향이 바뀌는 횟수, 진동수

##### V
* 볼트(전위차 측정 단위)
* 1A의 정전류를 운반하는 도체에서 2점 사이의 전력이 1W일 때 그들 2점 사이의 전위차

##### 220V 60Hz
* 220v의 전류가 1초동안 60번 전류의 방향이 바뀌면서 흐른다는 뜻
<br>

##### 최대 비트 전송률(Maximum Bit Rate)
* 1초당 전송되는 데이터 비트의 수 = 비트레이트(Bitrate)
* 단위: bps(bits per second)

##### 대역폭(Bandwidth)
* 주파수의 범위를 지칭하는 것으로 일반적으로 헤르츠로 표시한다.
* 어떤 매체나 기기를 경유하여 정보를 전송할 때의 전송량
* 네트워크상에서 정보통신을 위한 신호의 최고주파수와 최저주파수의 범위를 일컫는 말
* 통신에서 정보를 전송할 수 있는 능력, 즉 최대전송 속도
