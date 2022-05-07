---
title: "nRF5 SDK (13) - ble_app_uart 예제를 이용한 Long Range 모드 테스트"
categories:
  - nRF5 SDK
tags:
  - ble_app_uart
  - nRF5 SDK 17.1.0
  - long range
  - PHY Coded
toc: true
toc_sticky: true
---

# 13. ble_app_uart 예제를 이용한 Long Range 모드 테스트

이번 포스트에서는 `nRF5 SDK` 에서 제공되는 `Long Range` 연결 방법에 대해 간단하게 소개하고자 한다. `nRF5 SDK` 에서 제공되는 <span style="color:#50A0A0"><b>ble_app_uart</b></span> 예제를 기준으로는 소스 코드에 몇 줄만 추가해주면 `Long Range` 모드로 연결이 가능한데, 관련된 자료가 별로 없어서 처음 테스트 할 당시에는 꽤 골치가 아팠다 😫. 

## 13.1 Setup

* `nRF52840-DK x 3EA`

`Long Range` 모드 테스트를 위해 총 3개의 테스트 보드가 있으면 좋은데, `central & peripheral` 로 동작할 보드가 각각 하나씩 필요하고, `Long Range` 로 정상 동작하는지 확인하기 위해 패킷 정보를 분석할 `nRF Sniffer` 로 동작시킬 보드가 하나 있어야 한다. `nRF Sniffer` 로 사용 가능한 장치가 따로 있다면 2개의 테스트 보드만 준비하면 되고, `nRF Sniffer` 에 대한 정보가 필요할 경우 **[이전 포스트](https://enidanny.github.io/nrf5%20sdk/nrf5sdk-nrf-sniffer/)** 를 참고하길 바람.

>물론 `nRF Sniffer` 가 없더라도 `Long Range` 연결은 가능하지만, `nRF5 SDK` 에서는 `Long Range` 모드로 연결하더라도 이를 검증할 만한 방법이 딱히 없는 듯하다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-long-range-fig1.png" alt="">
</figure>

`Long Range` 모드 테스트를 위해 준비한 테스트 보드 중 하나에는 `nRF5 SDK` 폴더의 예제 중 `ble_app_uart_c` 예제의 소스 코드를, 또 다른 하나에는 `ble_app_uart` 예제의 소스 코드를 업로드하면 된다. 일단, 별다른 코드 변경 없이 프로젝트 파일을 빌드한 뒤에 소스 코드를 양쪽에 업로드 해보면, (`ble_app_uart_c` 예제가 업로드 된) `central` 역할을 수행하는 보드에서 연결을 자동으로 수행할 것이다.

---

## 13.2 sd_ble_gap_phy_update

소스 코드가 정상적으로 업로드 된 것을 확인했다면, `central` 쪽 소스 코드에 다음의 몇 줄만 추가해주면 된다. `main.c` 코드를 살펴보면, <span style="color:#0050A0"><b>ble_evt_handler</b></span> 라는 이름의 `event handler` 함수가 있을 것이다. 해당 함수에서 `BLE_GAP_EVT_CONNECTED` 구문 안에 `ble_db_discovery_start(...)` 함수 호출 이후 다음과 같이 `sd_ble_gap_phy_update` 함수와 해당 함수에서 사용되는 파라미터 변수를 입력해주면 된다.

```c
static void ble_evt_handler(ble_evt_t const * p_ble_evt, void * p_context)
{
    ret_code_t            err_code;
    ble_gap_evt_t const * p_gap_evt = &p_ble_evt->evt.gap_evt;

    switch (p_ble_evt->header.evt_id)
    {
        case BLE_GAP_EVT_CONNECTED:
            err_code = ble_nus_c_handles_assign(&m_ble_nus_c, p_ble_evt->evt.gap_evt.conn_handle, NULL);
            APP_ERROR_CHECK(err_code);

            err_code = bsp_indication_set(BSP_INDICATE_CONNECTED);
            APP_ERROR_CHECK(err_code);

            // start discovery of services. The NUS Client waits for a discovery result
            err_code = ble_db_discovery_start(&m_db_disc, p_ble_evt->evt.gap_evt.conn_handle);
            APP_ERROR_CHECK(err_code);

            //@ Long Range Feature (PHY Coded)
            ble_gap_phys_t const phys =
            {
                .rx_phys = BLE_GAP_PHY_CODED,
                .tx_phys = BLE_GAP_PHY_CODED,
            };
            err_code = sd_ble_gap_phy_update(p_ble_evt->evt.gap_evt.conn_handle, &phys);
            APP_ERROR_CHECK(err_code);
            break;

        case BLE_GAP_EVT_DISCONNECTED:

            NRF_LOG_INFO("Disconnected. conn_handle: 0x%x, reason: 0x%x",
                         p_gap_evt->conn_handle,
                         p_gap_evt->params.disconnected.reason);
            break;
            ...
    }
}
```

`BLE_GAP_PHY_CODED` 상수가 정의되어 있는 곳을 가보면 해당 옵션 외에 다른 옵션 (e.g. `2Mbps`)도 선택할 수 있으며, 여기서 설정한 PHY Coded 옵션이 `Long Range` 모드를 가리킨다. (~~생각보다 별 거 없쥬?~~)

>블루투스 표준 문서를 보면 `Bluetooth 5.0` 에서 추가된 `Long Range` 통신을 위한 물리 계층은 `S=2` or `S=8` 옵션으로 구분되는데, `nordic` 에서는 `S=8` 물리 계층만을 지원하는 것으로 보인다. 이 때 데이터 전송 속도는 `1 Mbps / 8 = 125 kbps` 에 해당하며, 이론상 전송 거리는 4배 증가된다고 알려져 있음.

---

## 13.3 nRF Sniffer Capturing 🚁

`central` 장치의 소스 코드를 수정했다면 해당 테스트 보드의 전원은 잠시 꺼두고 `Wireshark` 를 이용해 `nRF Sniffer` 에서 수신되는 패킷 정보를 확인해보도록 하자. 여기서 `central` 장치를 꺼두는 이유는, 현재 예제 코드에서는 `central` 장치가 곧바로 `peripheral` 장치와 연결을 하기 때문에 `nRF Sniffer` 에서 원하는 패킷을 구분해서 확인하기가 어렵기 때문이다.

`Wireshark` 에서 `nRF Sniffer` 를 선택한 후 `Nordic_UART` 라는 이름으로 Advertising 하고 있을 `ble_app_uart` `peripheral` 장치의 신호를 따로 걸러내도록 하자. 

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-long-range-fig2.png" alt="">
</figure>

>만약 `nRF Sniffer` 를 처음 실행시켰을 경우에는 아래 그림과 같은 `Bluetooth LE Interface` 가 보이지 않을 수 있는데, 그럴 때는 상단 메뉴바에서 마우스 우클릭을 한 후 `Interface Toolbars` 의 `nRF Sniffer for Bluetooth LE` 옵션을 클릭해주면 된다.

필터링 이후에 Advertising 패킷을 하나 선택해보면, 아래 그림에서 볼 수 있듯이 현재 사용되는 물리 계층이 `PHY: LE 1M` 되어있는 것을 볼 수 있고, 현재는 기본 BLE 데이터 통신 모드로 (`1 Mbps`) 동작하고 있다는 것을 확인할 수 있다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-long-range-fig3.png" alt="">
</figure>

`nRF Sniffer` 의 수신 패킷을 `peripheral` 디바이스로 필터링하고 있는 상태에서 `central` 디바이스의 전원을 켜면 `Broadcast` 로만 표시되던 패킷 정보가, `Master & Slave` 로 표시되고 두 디바이스간의 무선 연결이 이루어졌음을 확인할 수 있다. 무선 연결 과정은 `central` 장치에서 `scanning` 후 연결 요청 신호를 보내는 것으로 시작되며, 아래 그림을 보면 연결 완료 후 앞서 추가한 **`sd_ble_gap_phy_update`** 함수에 의해 데이터 전송 모드가 `1 Mbps` 에서 `125 kbps = PHY Coded` 로 변경된 것을 확인할 수 있다.

<figure style="width: 100%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/sdk-long-range-fig4.png" alt="">
</figure>

---

## 13.4 Another Issue

본 포스트에서 소개한 방식은 기본 BLE 통신 모드 (`1 Mbps`)에서 연결 과정을 마무리한 후에 데이터 전송 모드를 `Long Range` 로 변경한 예시인데, 이는 애초에 `1 Mbps` 에서 연결이 어려울 경우에 적용할 수 없으므로, 다소 불완전한 연결 방식이 될 수도 있다. 

이와 관련해서 몇 가지 이슈를 소개하자면,

* 현재까지는 모든 블루투스 기기 (e.g. 스마트폰) 에서 `Long-Range` 모드를 지원하지 않으므로, 연결 이후에 `Long-Range` 모드로 전환하는 것 또한 이점이 있을 수 있음.
* 따라서, `Long-Range` 모드를 실제 어플리케이션에 적용할 때는, 해당 모드가 호환되지 않는 장치와의 연결도 고려해야할 것으로 보임.
* nRF 보드 끼리는 Advertising 단계에서부터 `Long-Range` 모드로 동작시켜도 되는데, `nRF5 SDK` 에서는 Advertising 패킷은 `Long-Range` 로 송신되지 않음.

Advertising 단계에서 `Long-Range` 패킷을 전송하기 위해서는 Extended 모드로 패킷을 송신해야하는데, 간단하게 테스트 해봤을 때는 이를 적용하더라도 기존 `1 Mbps` 모드로 패킷이 송신되는 것처럼 보였다. `nRF5 SDK` 에서 지원이 안 되는 것인지, 아니면 뭔가 설정하는 과정에서 빠뜨린 부분이 있는 것인지 모르겠는데.. 일단 추후에 `Long-Range` 관련 포스트를 다루게 되면 다시 소개하는 걸로...🎆
