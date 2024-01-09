---
title: "[STM32] 2024-01-03-STM32 3일차_TIM_Interrupt 및 외부 인터럽트  "
date: 2024-01-03
last_modified_at: 2024-01-03
categories:
  - STM32
tags:
  - STM32


published: true
toc: true
toc_sticky: true
---

# 개념정리
-------------------

시간을 측정하기 위해서 타이머를 사용한다


## TCNT 레지스터

0부터 1씩 증가하는 타이머가 증가한다

16비트인경우 65535 
32비트인경우 4294987265 까지 증가한다

## AUTORELOAD Register  (ARR Register)
= 주기
어떤 값을 주면 해당 값이 카운터값이 업데이트 인터럽트가 발생한다

## HCLK 
한클럭이 증가하는데 걸리는 시간
예시 = 168MHZ

APB1 TIM CLK = HCLK/2 =84MHZ


APB2 TIM CLK = HCLK = 168MHZ
 AMHB AMBA 추가로  있다

 타이머 클럭 사용에 따라 사용법이 다르다

# PreScaler  
인터럽트가 빨리 걸리는 것을 막기 위해 만든 개념
최대 2^16 -1 값이 있다

ex) PreScaler 1000인경우
TIM CLK = 84MHA/10000  -> 초로 1/8400 이된다
이경우 ARR 값을 8400을 하면 1초마다 업데이트가 발생한다


![영상 핵심 정리](/assets/img/Stm32/COUNT%EB%A0%88%EC%A7%80%EC%8A%A4%ED%84%B0%20%EA%B0%9C%EB%85%90%20%EC%82%AC%EC%A7%84.png)


## 타이머 정보 대략적인 정보
![STM 32 타이머 정보](/assets/img/Stm32/stm32%20%ED%83%80%EC%9D%B4%EB%A8%B8%20%EC%A0%95%EB%B3%B4.png)

Resolution 타이머 레지스터 범위 말해준다
PreScaler 값은 증가하는 클럭 계수

# 회로 기본 설정
기본 Timer 7번 사용하고 
NVIC 설정 및 위에 Prescaler 및 ARP 값을 수정해준다

![TIM7 설정](/assets/img/Stm32/TIMER_NVIC%EC%84%A4%EC%A0%95.png)

![TIM 설정](/assets/img/Stm32/%ED%83%80%EC%9D%B4%EB%A8%B8%20%EC%84%A4%EC%A0%95.png)

<span style="color:red">현재 타이머 1초가 정확하지 않음 않음 확인 작업 필요함</span>

정확한 클럭 APB1 APB2 인지 확인 필요함


## 참고 HCLK 값 보는법
![HCLK 값 보는법](/assets/img/Stm32/HCLK%20%EA%B0%92%20%EB%B3%B4%EB%8A%94%EB%B2%95.png)



# EXTI 외부 인터럽트

환경은 복잡한데 현재 실제 보드 데이터 연동해서 보는 방법을 자세히 알지 못해 기본 세팅을 위주로한다

위와 같이 NVIX 설정 진행하고 ->GPIO 설정 외부로 변경은 기본으로 되어있음

해당 함수 실행시 원하는 13번 핀 위치에 인터럽트 발생시 실행되는 함수이다 

``` C
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
	if(GPIO_Pin == GPIO_PIN_13)
	{
		HAL_GPIO_TogglePin(GPIOB, GPIO_PIN_0);
	}
}
```


# 출처
1. 참고 양상강의 자료
https://www.youtube.com/watch?v=_7Ll95FITn4&list=PLUaCOzp6U-RqMo-QEJQOkVOl1Us8BNgXk&index=4&ab_channel=ChrisWonyeobPark

2. 타이머 관련 사진 자료
https://odenwar.net/stm32-timer-%EC%A2%85%EB%A5%98%EC%99%80-%ED%8A%B9%EC%A7%95/





