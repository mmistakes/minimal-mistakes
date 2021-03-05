<!---
title: "BLE (11) - 블루투스 메시: Overview of Mesh concepts"
categories:
  - BLE
tags:
  - mesh network
  - feature
  - concept
toc: true
toc_sticky: true
---

## 11. 블루투스 메시: Overview of Mesh concepts

이번 포스트에서는 블루투스 메시에서 사용되는 몇 가지 개념(`concept`)들에 대해 정리하고자 한다.

### 11.1 Elements

블루투스 메시에서 언급하는 `element`는 네트워크에 포함된 노드가 가지고 있는 어떠한 개체를 가리키는데, 쉽게 예를 들자면 노드와 연결된 조명기구, 스위치, 센서 등이 `element` 라고 할 수 있다. 메시 네트워크에 포함된 모든 노드는 최소 하나의 `element` 를 가지고 있으며, 대개 그 이상의 `element`를 포함한다.

> 모든 노드는 `primary element` 라는 `element` 를 가지고 있으며, `Provisioning` 과정 동안 노드에 할당되는 주소 값 (`first unicast address`)을 이용해 접근 가능하다.

---

### 11.2 States

`state` 란 `element` 의 상태나 조건 등을 표현하는 요소를 가리킨다. 예를 들어, 노드에 조명기구의 상태를 나타내기 위해 `Generic OnOff Server` 라는 이름의 `server` 가 구현되어 있을 때, 현재 조명기구 (`element`)가 켜져 있는지 혹은 꺼져있는 지에 대한 정보를 `server` 에 나타낼 수 있는데, 이러한 유형의 정보를 `state` 라고 할 수 있다.

> `state` 개념과 함께 `binding` 혹은 `bound state` 라는 개념은 서로 연관된 `state` 의 동작을 묶어 제어하는 것을 가리킨다. 예를 들어, 어떤 빌딩 내부의 엘리베이터의 위치를 모니터링 하는 `state` 와 각 층의 조명의 현재 상태를 나타내는 `state` 가 있다고 할 때, `bound state` 개념을 이용하면, 엘리베이터가 특정 층에 도달했을 때 해당 층의 조명을 켜도록 할 수 있다.

---

### 11.3 Messages and Addresses

메시 네트워크를 구성하는 노드와 각 노드에서 제공하는 기능에 대해 정의하는 `model` 에서는 `message` 를 이용해 정보를 교환하고 `element` 를 제어한다. 서로 다른 노드 사이에 정보를 교환하기 위해서는 주소 값이 필요하듯이, `model` 내에서 `message` 를 보내기 위해서는 `address` 값이 필요하다.

메시 네트워크에서의 `address` 는 다음의 세 가지로 구성된다.

``` python
* unicast address
* group address
* virtual address
```

**`unicast address`** 는 각 `element` 에 할당되는 고유의 `16 bits` 주소 값으로, 한 번에 하나의 `element` 만을 가리키는 주소 값이다. 이름에서 유추할 수 있듯이, **`group address`** 는 다수의 개체를 가리키는 (`multicast address`) 주소 값이며, 여러 개의 `element` 혹은 하나 이상의 노드를 가리키기 위해 사용된다.

virtual address 애매한데...
Label UUID 를 검증하는 용도로 사용되는것 같다.
BLE 시스템의 각 요소는 Attribute 프로토콜 기반으로 관리되고, 각 속성은 Label UUID 라는 128 bits 값의 고유 값을 갖는다. 근데, 이거를 검증할때, 사용한다는것 같아.
그리고 검증된 것은 hash 16bits만 보고 판단.

그림 unicast/group/virtual 보면 각각이 한 네트워크에서 얼마나 할당될 수 있는지 알 수 있다.

### 11.4 Features and Topology

어떤 feature 있는지

이런 특징 토대로 다음 그림보자

블루투스 메시에서 구성할 수 있는 네트워크 구조에 대해 보자

Topology 그림 제시


메시 프로파일 표준 (<span style="color:#3060A0"><b>Mesh Profile Specification</b></span>)에 의하면, 메시 네트워크는 대략적으로 다음 기능들을 제공하기 위해 제안되었다고 할 수 있다.
-->