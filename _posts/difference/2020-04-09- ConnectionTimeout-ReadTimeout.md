---
title: Connection Timeout vs Read Timeout
permalink: /difference/ConnectionTimeout-ReadTimeout
categories: 
   - difference
tags:
   - connection
   - read
   - timeout
   - connection timeout
   - read timeout

last_modified_at: 2020-04-09 16:04:56.28 

---
# Connection Timeout vs Read Timeout
## Connection Timeout 예
개발자인 선재는 점심시간 짧습니다. 하지만 먹는 것을 좋아해 맛집에서 먹으려고 노력을 합니다.

점심시간에 간 맛집에는 이미 많은 사람들이 찾아와 북적이고 대기열이 길게 있었습니다. 성질이 급한 선재는 "딱 10분만 기다려고보고 안되면 다른데 가야겠다" 라고 결정을 내렸습니다.

그리고 10분을 기다렸지만 대기열이 줄어들지 않아 가게는 들어가지 못하고 선재는 회사로 돌아갔습니다.

이처럼 어떤 사유로 **아예 맛집(서버) 자체에 선재(클라이언트)가 접근을 실패했을 시 적용**되는 것이 Connection Timeout입니다. 하루 왠종일 접근을 시도할 수는 없으니 접근 시간 제한이 Connection Timeout이 되는 것입니다.

## Read Timeout 예
그리고 이번에는 결국 선재가 대기열을 뚫고 맛집 안까지 들어가서 메뉴를 주문하는데 성공을 했습니다. 근데 워낙에 사람이 많다보니 주문량이 밀려 메뉴가 나오는데 시간이 오래 걸립니다. 주방에서는 무엇을 하는지도 모르겠습니다.

성질이 급한 선재는 "이럴 시간에 다른 걸 먹지!!" 하고 그냥 가게를 나와 버립니다. 나중에 선재가 주문한 음식이 나왔지만 이미 선재는 돌아가고 먹을 사람이 없어 음식은 버려지게 됩니다.

이처럼 선재(Client)가 맛집(Server)에 접근을 성공했으나 맛집의 요리 시간(Server의 로직 수행 시간)이 길어 제대로 응답을 못 준 상태에서 Client가 연결을 해제하는 것이 Read Timeout입니다.

이 경우 Client는 해당 상황을 오류로 인지하고 Server는 성공으로 인지해 양 사이드 간에 Sync가 맞지 않아 문제가 발생할 확률이 높습니다.

## 정리 

개발자는 **통신 상에 이런 상황이 발생할 수 있는 부분을 미리 인지**하고 있어야 하며 시뮬레이션을 해봐야 합니다. 그리하여 **read timeout을 극단적으로 낮게 설정하는것은 위험**하며 애초에 시간이 걸리는 요리의 경우 비동기 방식의 접속을 시도하는것도 하나의 방법입니다. (Thread 등 **요청을 해놓고 응답을 기다리지 않고 내 할일을 수행**하다가 **응답이 오면 다시 해당 요청에 대한 반응**을 하는 것)

여기선 간략하게만 설명했지만 [다음](https://d2.naver.com/helloworld/1321) 도 같이 읽어보시면 좋습니다.

# Reference
* [https://inyl.github.io/programming/2017/12/02/timeout.html](https://inyl.github.io/programming/2017/12/02/timeout.html)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTMyNjQ3NTA0MSwtMTU3MjgyMTM3MV19
-->