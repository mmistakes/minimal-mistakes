---
title: "BLE (10) - 블루투스 메시: Overview of Mesh operation"
categories:
  - BLE
tags:
  - mesh network
  - operation
toc: true
toc_sticky: true
---

## 10. 블루투스 메시: Overview of Mesh opeartion

메시 프로파일 표준 (<span style="color:#3060A0"><b>Mesh Profile Specification</b></span>)에 의하면, 메시 네트워크는 대략적으로 다음 기능들을 제공하기 위해 제안되었다고 할 수 있다.

```python
* 한 기기에서 하나 이상의 기기로 정보 전달 ("N by N Comm.").
* 다른 기기를 통해서 정보를 전달 ("Relay")하므로써 통신 거리 확장.
* 보안 기능 강화 ("app and network key")
* 현 시장에 존재하는 기기로 네트워크 구축 ("GATT bearer")
* 네트워크 상에서 몇몇 기기가 제거되어도 계속해서 네트워크 유지 ("sustainability")
```

블루투스 이외의 무선 통신 프로토콜에도 (`e.g. WiFi, Zigbee`) 여러 기기 사이의 통신을 지원하는 메시 네트워크가 있으며, 프로토콜마다 메시 네트워크를 구축하는 방법에 조금씩 차이가 있다. 블루투스 메시의 경우 `managed-flood` 기법을 기반으로 메시 네트워크를 구축하며, 효율적으로 네트워크를 운영하기 위해 크게 다음의 두 가지 기법이 사용된다.

<figure style="width: 80%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-mesh2-fig1.png" alt="">
</figure>

* **(1) `network message cache`**  기법은 이전에 수신한 메시지를 특정 리스트에 보관해둔 뒤, 중복된 메시지를 계속해서 수신 혹은 전달하지 않도록 하는 기법이다. 

> 메시 네트워크에 포함된 노드들은 단어 그대로 그물망 (`mesh`)처럼 연결되어 있으므로 중복된 메시지를 점검하지 않을 경우, 하나의 노드에서 송신된 메시지는 네트워크 내의 노드를 통해 (`Relay`) 계속해서 돌아다닐 수 있다.

<span style="color:#E03080"><b>NOTICE: </b></span> 물론, 메시지가 캐시 리스트에 장기간 보관되면 해당 노드의 메시지를 너무 오래 무시할 수 있으므로, 캐시 리스트 내 메시지 개수에 제한을 두어 최근 수신된 메시지를 우선적으로 보관한다.
{: .notice--info}

* **(2) `time to live`** 기법은 송신하는 메시지에 `TTL (Time-to-Live)` 값을 포함시켜 전달하는 기법으로, 해당 메시지가 다른 노드를 통해 전달 (`Relay`)되는 횟수를 제한한다. 메시 네트워크에서 메시지를 전달할 수 있는 노드는 특정 메시지를 수신한 뒤 해당 메시지 내의 `TTL` 값을 `1` 감소시킨 뒤 주변 노드로 송신한다.

메시 네트워크는 기본적으로 **`N by N`** 통신을 지원하는 통신 프로토콜이며, BLE 프로토콜을 기반으로 동작한다. 또한, 메시 프로토콜을 기반으로 네트워크 상에 포함된 기기 (`device`)는 노드 (`node`)라고 부른다.

### 10.1 Devices and nodes

이전 포스트에서 간단하게 언급했듯이, 일반적으로 메시 네트워크에 포함된 기기를 노드 (`node`)라고 하며, 포함되지 않은 기기는 단순히 `device` 혹은 `unprovisioned device` 라고 부른다.

기본적으로 `unprovisioned device` 는 메시 네트워크에서 주고 받는 메시지를 송수신 할 수 없으며, 메시 네트워크 내의 노드 중 외부 장치를 해당 네트워크에 포함시키는 과정 (**`Provisioning`**)을 수행하는 `Provisioner` 라는 기기에 의해 노드로 전환되어야 메시 네트워크 메시지를 송수신 할 수 있게 된다. 또한, `unprovisioned device` 가 메시 네트워크에 포함되어서 노드로 전환되면, `Configuartion Client` 에 의해 어떻게 (혹은 어떤 시간이나 규칙에 따라) 다른 노드들과 메시지를 주고 받을지 조정된다.

<span style="color:#5080A0"><b>NOTICE: </b></span> 일반적으로 `Configuration Client` 역할은 `Provisioner` 노드에서 담당한다.
{: .notice}

어떤 기기가 메시 네트워크에 추가되어서 노드로 동작하는 과정은 기존의 (저전력) 블루투스에서의 `point-to-point` 연결이나 페어링 개념과는 다르며, `advertising bearer` 또는 `GATT bearer` 를 기반으로 네트워크 상에서 메시지를 주고받게 된다.

> 블루투스 메시 네트워크는 쉽게 말해서 BLE 프로토콜의 `adveritisng and response` 기능을 이용해서 다수의 노드가 정해진 시간 간격마다 네트워크 고유의 정보 (`e.g. app and network key`)를 가지고 메시지를 주고 받는 개념에 가깝다고 할 수 있다 (~~이는 지극히 개인적인 생각이다~~).

---

### 10.2 Network and subnets

메시 네트워크에 포함된 노드들은 다음의 네 가지 정보를 공유한다.

* `network address`
* `network key`
* `application key`
* `IV Index`

`network address` 는 `source / destination address` 를 확인하는데 사용되며, `network key` 와 `appplication key` 는 각각의 메시 프로토콜 계층에서 메시지를 암호화하고 해독 및 검증하는데 사용된다.

하나의 메시 네트워크 내에서도 `network key` 등을 이용해 특정 노드들을 구분할 수 있는데, 네트워크 내의 이러한 그룹 혹은 부분 집합을 `subnet` 이라고 한다.

>가령, 집 안에 있는 전등을 제어하는 노드가 메시 네트워크로 연결되어 있을 때, 주방에 있는 전등만을 제어하고 싶으면 주방 그룹 (`subnet`)의 `network key` 를 이용해 메시지를 송신하면 된다.

`subnet` 중 `primary subnet` 이라는 특정 노드의 그룹이 있는데, 해당 `subnet` 에 포함되는 노드들은 `IV Update procedure` 과정에 참여하게 되고, 위에서 언급한 `IV Index` 는 해당 프로세스와 연관된 요소 중 하나이다. 하지만, 이 부분에 대해서는 표준 문서의 본 절 (**`2.2.1`**)에서는 구체적으로 언급되지 않으므로, 차차 알아보도록 하자.

---

### 10.3 Low power support

메시 프로토콜은 기본적으로 네트워크를 구성하는 노드들이 안정적인 전원공급 장치를 통해 동작한다는 전제하에 제안된 기술이다. 특히, 메시지를 전달하는 (`Relay`) 기능이 있는 노드의 경우 계속해서 네트워크 유지하는데 사용되기 때문에, 배터리로 동작하기에는 무리가 있다. 하지만, 블루투스 메시 표준에서는 네트워크 내에서 저전력 노드를 운용하기 위한 방법으로 **`Friendship`** 이란 개념을 제안하고 있다.

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/ble-mesh2-fig2.png" alt="">
</figure>

이는 배터리에 의해 동작해야하는 저전력 노드 (`Low power node (LPN)`)와 이와 연동할 별도의 노드 (`Friend node (FN)`)를 사용하는 기법으로, 안정적으로 전원을 공급 받는 `FN` 은 항상 켜진 상태를 유지하며, `LPN` 으로 전송해야하는 중요한 정보를 보관해두는 역할을 한다. 저전력으로 동작하는 `LPN` 은 일정 시간에 한 번 활성화 되어 `FN` 에서 필요한 정보를 받은 뒤, 다시 장시간 대기모드 (`standby or sleep mode`)로 진입하여 배터리 소모량을 최소화한다.

>**`Friendship`** 개념을 활용하여 저전력 노드를 메시 네트워크에서 운용할 수는 있지만, 앞서 언급하였듯이 메시 네트워크를 유지하는 핵심적인 노드들은 기본적으로 안정적인 전원 공급을 필요로 한다. 따라서, 메시 네트워크는 저전력 노드 위주로 구성되어야하는 응용 분야에는 적합하지 않을 것으로 보인다.

---

**Reference**

https://www.bluetooth.com/specifications/specs/