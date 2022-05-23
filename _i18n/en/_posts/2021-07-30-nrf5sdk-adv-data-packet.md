---
title: "nRF5 SDK (4) - nRF52 시리즈 (SDK 17.0.2) Adv. 패킷 업데이트"
categories:
  - nRF5 SDK
tags:
  - nRF52840
  - Advertising
  - Data Packet
toc: true
toc_sticky: true
---

# 4. nRF52 시리즈 (SDK 17.0.2) Adv. 패킷 업데이트 : Advertising (data) packet update example

## 4.1 Setup

* Setup 과정은 이전 nRF5SDK 포스트 참조 (특이사항 없음)
* nRF5 SDK 예제 중 `Adveritisng_init()` 함수 활용, 필요에 따라 Adv. 패킷 포맷 설정

---

## 4.2 Adv. 패킷 업데이트 예시

Adv. 패킷 업데이트 관련 주요 코드

```c
BLE_ADVERTISING_DEF(m_advertising);

static type __funcion_name__(type){
    static uint8_t            data_buf[2][BLE_GAP_ADV_SET_DATA_SIZE_MAX];
    static ble_gap_adv_data_t next_advdata;
    static bool               buf_index       = false;
    ble_gap_adv_data_t*       prev_advdata    = &m_advertising.adv_data;

    //...
    next_advdata.adv_data.p_data      = data_buf[buf_index];
    next_advdata.adv_data.len         = prev_advdata->adv_data.len;
    memcpy(next_advdata.adv_data.p_data, prev_advdata->adv_data.p_data, prev_advdata->adv_data.len);

    //... next_advdata.adv_data.p_data[index] = value
    ble_advertising_advdata_update(&m_advertising, &next_advdata, true);

    //...
    buf_index = !buf_index;
}
```

* (ble_gap_adv_data_t type) next_advdata: 업데이트 할 데이터 저장할 구조체
* data_buf: next_advdata 가 참조하는 메모리 영역 (?)
* memcpy() 함수 이용: next_advdata 변수에 기존 패킷 포맷 저장
* ble_advertising_advdata_update: next_advdata 에 저장된 정보 반영

---

## 4.3 Beacon 패킷 업데이트

nRF5 SDK 예제 중 beacon 관련 예제가 있음. 해당 예제에서는 `ble_advdata_t` 변수 이용해서 비콘 Advertising 데이터를 관리함. 이러한 경우에는 처음 비콘 초기화 단계 (e.g. `beacon_init`)에서 사용된 Adv. 패킷이 포함되는 변수 영역에 데이터만 바꿔준 뒤, `ble_advdata_encode(...)` 함수로 Adv. 패킷을 업데이트 할 수 있음.

```c
static ble_advdata_t 			    advdata;
static ble_advdata_manuf_data_t 	b_manuf_specific_data;

static type __function_init__(type){    
    // ...
    b_manuf_specific_data.data.p_data = (uint8_t *) data_buf;

    // ...
    memset(&advdata, 0, sizeof(advdata));

    // ...
    advdata.p_manuf_specific_data = &b_manuf_specific_data;
}

static type __funcion_name__(type){
    //...
    data_buf[index] = value;

    ble_advdata_encode(&advdata, b_adv_data.adv_data.p_data, &b_adv_data.adv_data.len);
}
```

* (ble_advdata_t) adv_data: Adv. 패킷 관리하는 변수
* ble_advdata_manuf_data_t 구조체 변수 이용, Adv. 패킷 참조할 변수 (`data_buf`) 접근
* ble_advdata_encode() 함수 이용 패킷 업데이트
