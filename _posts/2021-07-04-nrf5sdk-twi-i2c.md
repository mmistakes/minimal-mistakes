---
title: "nRF5 SDK (3) - nRF52 시리즈 (SDK 17.0.2) TWI (I2C) 모듈 제어"
categories:
  - nRF5 SDK
tags:
  - nRF52840
  - UART
  - UARTE
toc: true
toc_sticky: true
---

# 3. nRF52 시리즈 (SDK 17.0.2) TWI (I2C) 모듈 제어 : TWI (I2C) Master of nRF52 Series using SDK 17.0.2

* `TWI (Two-Wire Interface)` 는 nRF5 SDK 의 I2C 인터페이스의 별칭.

**SDK Version :** `nRF5 SDK 17.0.2 (or nRF5 SDK 15.3.0)`
{: .notice--info}

## 3.1 Setup

* `nRF5 SDK 17.0.2` 다운로드 (본인의 경우 `nRF5 SDK 15.3.0, 17.0.2` 버전에서 테스트해볼 기회가 있었는데 둘 다 동일하게 작동하였음)
* nRF5 SDK 폴더 > examples > ble_peripheral > ble_app_uart 예제 이용: 다른 이름으로 새폴더를 하나 만들고, 원래의 폴더 안의 항목들을 복사 / 붙여넣기 해서 사용
* 새로 생성한 폴더에서 `Segger Embedded Studio (SES)` 프로젝트 실행

**Setup 과정은 이전 포스트와 동일한데, 굳이 ble_app_uart 예제를 반복해서 사용하는 이유는 크게 다음과 같다.**

1. printf 함수의 사용 (별도의 debugger 필요 없이 (e.g. J-Link RTT Viewer) terminal 프로그램 이용해서 debugging 가능)
2. BLE 기능과의 연동성 (peripheral 폴더에 있는 예제는 softdevice 사용하지 않음)

---

## 3.2 Import Source code and Header file

`SES` 프로젝트의 `Project Explorer` 항목에서 (화면 왼쪽의 프로젝트 항목 리스트 창) nRF_Drivers 폴더에 다음의 파일을 추가하고 (Import) (Add Existing File), "main.c" 파일에 관련 헤더파일을 추가 (`nrf_drv_twi.h, nrf_delay.h`).

* nrf_drv_twi.c (`@integration`)
* nrfx_twi.c (`@modules`)
* nrfx_twi.m (`@modules`)

---

## 3.3 app_timer 설정

`TWI` 이용해서 센서 모듈을 제어하는 경우 보통 일정 주기로 원하는 값을 읽거나 인터럽트(`Interrupt`) 방식으로 원하는 순간에 값을 읽을 것이다. 일정 주기마다 읽을 경우 해당 동작을 제어할 타이머가 필요하므로 `app_timer` 이용해서 이러한 동작을 구현.

```c
APP_TIMER_DEF(user_timer_name);

static void timer_timeout_handler(void* p_context){
    //...
}

int main(void){
    // ...
    err_code = app_timer_create(&user_timer_name, APP_TIMER_MODE_REPEATED
                                                , timer_timeout_handler);
    APP_ERROR_CHECK(err_code);
    app_timer_start(user_timer_name, APP_TIMER_TICKS(1000), NULL);

    for (;;){
        //...
    }
}
```

위의 코드는 `1000 ms` 마다 `timer_timeout_handler` 라는 이름의 event handler 함수가 호출되도록 설정하는 과정. 이와 같은 방식으로 일정 주기마다 센서의 동작을 제어할 수 있을 것.

---

## 3.4 TWI 관련 함수

`nRF5 SDK` 에서 TWI 모듈을 초기화하고, `read / write` 하는 코드. 각각의 코드를 이해하기 위해서는 TWI, 즉, I2C 통신에서의 `read / write` 과정에 대해 어느정도 이해하고 있어야 함. 또한, 다음의 코드는 본인이 자주 사용하기 위한 하나의 예시 코드일 뿐, 정해진 코드는 아닐 뿐더러, 실제 개발시에는 관련 어플리케이션에 맞게 사용해야함.

* `twi init`

```c
uint32_t err_code;
static volatile bool  m_xfer_done     = false;
static volatile bool  sensor_rd_done  = false;

uint8_t buffer[] = { ... };

static const nrf_drv_twi_t m_twi  = NRF_DRV_TWI_INSTANCE(TWI_INSTANCE_ID);

__STATIC_INLINE void twi_data_handler(uint8_t *d_samples){
    // event handler for "p_event->type" of twi_handler == NRF_DRV_EVT_DONE
}

static void twi_handler(nrf_drv_twi_evt_t const * p_event, void * p_context){
    switch (p_event->type)
    {
        case NRF_DRV_TWI_EVT_DONE:
            if (p_event->xfer_desc.type == NRF_DRV_TWI_XFER_RX)
            {
                sensor_rd_done = true;
                twi_data_handler(buffer);
            }
            m_xfer_done = true;
            break;
        default:
            /* NRF_DRV_TWI_EVT_DATA_NACK or 
              NRF_DRV_TWI_EVT_ADDRESS_NACK*/
            break;
    }
}

static void twi_init (void){
    const nrf_drv_twi_config_t twi_lm75b_config = {
       .scl                = ARDUINO_SCL_PIN,
       .sda                = ARDUINO_SDA_PIN,
       .frequency          = NRF_DRV_TWI_FREQ_100K,
       .interrupt_priority = APP_IRQ_PRIORITY_HIGH,
       .clear_bus_init     = false
    };

    err_code = nrf_drv_twi_init(&m_twi, &twi_lm75b_config, twi_handler, NULL);
    APP_ERROR_CHECK(err_code);

    nrf_drv_twi_enable(&m_twi);
}
```

* `twi write`

```c
#define MODULE_ADDRESS 0x60 // TWI Slave Address (example)

void twi_write_example(void){
    uint8_t reg[2] = {0};
    reg[0] = reg_addr;
    reg[1] = reg_val;

    m_xfer_done = false;
    err_code = nrf_drv_twi_tx(&m_twi, MODULE_ADDRESS, reg, sizeof(reg), false);
    
    // Acknowledge response wating ...
    while (m_xfer_done == false){
        nrf_delay_ms(1);

        if (!m_xfer_done){
            m_xfer_done = true;
            // write error
        }
    }
}
```

* `twi read`

```c
void twi_read_example(void){
    uint8_t reg_addr = 0x20; // Register Address (example)

    m_xfer_done = false;
    err_code = nrf_drv_twi_tx(&m_twi, MODULE_ADDRESS, &reg_addr, 1, false);
    do{
        nrf_delay_ms(1);

        if (!m_xfer_done){
            // TWI MODULE_ADDRESS error
            m_xfer_done = true;
            sensor_rd_done = true;
            return;
        }
    }while (m_xfer_done == false);

    m_xfer_done = false;
    err_code = nrf_drv_twi_rx(&m_twi, MODULE_ADDRESS, buffer, buffer_length);
    do{
        nrf_delay_ms(1);

        if (!m_xfer_done){
            // TWI MODULE_ADDRESS data error
            m_xfer_done = true;
            sensor_rd_done = true;
        }
    }while (m_xfer_done == false);
}
```

---

## 3.5. "sdk_config.h" 수정

```c
// <e> NRFX_TWI_ENABLED - nrfx_twi - TWI peripheral driver
//==========================================================
#ifndef NRFX_TWI_ENABLED
#define NRFX_TWI_ENABLED 1
#endif
// <q> NRFX_TWI0_ENABLED  - Enable TWI0 instance

// <e> TWI_ENABLED - nrf_drv_twi - TWI/TWIM peripheral driver - legacy layer
//==========================================================
#ifndef TWI_ENABLED
#define TWI_ENABLED 1
#endif
// <o> TWI_DEFAULT_CONFIG_FREQUENCY  - Frequency

// <e> TWI0_ENABLED - Enable TWI0 instance
//==========================================================
#ifndef TWI0_ENABLED
#define TWI0_ENABLED 1
#endif
// <q> TWI0_USE_EASY_DMA  - Use EasyDMA (if present)

// <e> NRFX_TWIM_ENABLED - nrfx_twim - TWIM peripheral driver
//==========================================================
#ifndef NRFX_TWIM_ENABLED
#define NRFX_TWIM_ENABLED 1
#endif
// <q> NRFX_TWIM0_ENABLED  - Enable TWIM0 instance
```

---

## 3.6. 기타 참고사항

* nRF52 시리즈 제품에 따라 사용가능한 `TWI` 모듈 개수가 다를 수 있음.
* 본 예시는 `TWI0` 모듈을 사용하는 경우를 가정하고 있으며, `TWIM` 모듈을 이용한다.
* nRF52 BLE 칩은 `microcontroller` 이므로 대개 `TWI` 등의 인터페이스에서 `Master` 역할을 수행하고, 값을 측정하고 읽는 대상인 센서가 `Slave` 에 해당됨. 그러나 경우에 따라서 nRF52 BLE 칩을 `Slave` 로 사용해야 하는 경우가 있을 수 있음. 해당 건에 대해서 테스트를 해본 적은 있는데, 활용도가 낮아 여기서는 딱히 다루지 않을 예정.

