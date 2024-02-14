---
title: "[STM32] 2024-01-09-STM32  ETH + LwIP (UDP Echo Server)"
date: 2024-02-12
last_modified_at: 2024-02-12
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
# 
## OSI 7계층
![OSI 7계층 모델](/assets/img/Stm32/ETH_1.png)

 어떤 장치 끼리 네트워크 망을 이용해서 데이터를 주고받을때 데이터를 과정을 층마다 정의한 모델

## 포트번호
ip 통해서 목적지의 시스템까지 도달한 후에 어떤 프로그램에 데이터를 전달하지 선택하는 개념

![OSI 7계층 모델](/assets/img/Stm32/ETH_2.png)


![OSI 7계층 모델](/assets/img/Stm32/ETH_3.png)

![네트워크망 연결 구조 ](/assets/img/Stm32/ETH_4.png)

- 참고 DP83848 칩이 피지컬 신호
- RMI  = STM 이더넷 개념과 외부 연결하는 규격이다





----
# 개발 환경 세팅

기본 설정 그대로 유지

![이더넷 설정](/assets/img/Stm32/ETH_4.png)

미들웨어 LWIP 에서 주소값만 일치 하게 해준다.



## 세부설정


## DMA 설정








# 소스코드




# 출처
1. 참고 영상강의 자료
https://www.youtube.com/watch?v=_7Ll95FITn4&list=PLUaCOzp6U-RqMo-QEJQOkVOl1Us8BNgXk&index=4&ab_channel=ChrisWonyeobPark



