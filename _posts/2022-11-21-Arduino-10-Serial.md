## :pushpin:UART

#### Universal Asynchronou Receiver/Transmitter

- Universal : 여러 통신 규약과 함께 사용됨
  
  - RS-232C, RS-422, RS-485 등

- Asynchronous (비동기)
  
  동기화를 위한 별도의 클록을 사용하지 않음
  
  **동시에 진행되지 않아도 된다** -> 작업의 결과가 나오기 까지 **기다리지 않아도 된다**. 

- 저수준의 통신 방법
  
  - 하드웨어 수준에서 지원
  
  - 마이크로컨트롤러의 동작 전압을 기준으로 하는 TTL레벨 사용 (아두이노 메가 기준 5V)
