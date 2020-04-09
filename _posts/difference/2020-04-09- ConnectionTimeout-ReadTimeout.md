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
– 유치함주의 –

봉팔이는 유명맛집을 인터넷에서 검색하고 맛집에 찾아갑니다. 예상대로 맛집에는 이미 많은 사람들이 찾아와 북적이고 대기열도 한가득 있었습니다.  
성질급한 봉팔이는 “이거하나 먹으려고 이리 오래 기다려야되나?” 하고 생각하고 “그냥 10분만 기다려보고 안되면 다른데 가야겠다.ㅠㅠ”라고 결정을 내렸습니다.

그리고 10분을 기다렸지만 대기열은 줄어들질않고 결국 봉팔이는 맛집은 들어가보지도 못한채 다음에 와봐야겠다 생각하고 집으로 돌아갔습니다.

이처럼 아예 서버(맛집)자체에 클라이언트(봉팔)가 어떤 사유로 접근을 실패했을시 적용되는것이 Connection timeout입니다. 접근을 시도하는 시간제한이 Connection Timeout이 되는것이지요. 하루 왠종일 기다리고만 있을 순 없으니깐요.

----------

그리고 이번엔 결국 봉팔이가 대기열을 뚫고 맛집안까지 들어가서 메뉴를 주문하는데까진 성공을 했습니다. 근데 워낙에 사람이 많다보니 이번엔 주문한 메뉴가 나오는데 한세월입니다. 주방에서 뭔짓을 하는지 아무리 기다려도 주문한 음식은 나오지가 않습니다.  
성질급한 봉팔이는 “아오! 그냥 이시간에 딴걸할걸 바빠 죽겠는데” 하고 그냥 가게를 나와버립니다. 나중에 봉팔이가 주문한 음식은 나왔지만 이미 음식을 먹을 사람은 사라지고 없습니다. 결국 요리는 버려지게 됩니다.

client가 server에 접속을 성공 했으나 서버가 로직을 수행하는 시간이 너무 길어 제대로 응답을 못준상태에서 client가 연결을 해제하는것이 Read timeout입니다.  
이경우는 client는 해당상황을 오류로 인지(요리가 안나옴)하고 server는 계속 로직(주문된 요리)을 수행하고 있어 성공으로 인지해 양사이드간에 싱크가 맞지 않아 문제가 발생할 확률이 높습니다.

----------

개발자는 통신상에 이런 상황이 발생할 수 있는 부분을 미리 인지하고 있어야 하며 시뮬레이션을 해봐야 합니다. 그리하여 read timeout을 극단적으로 낮게 설정하는것은 위험하며 애초에 시간이 걸리는 요리의 경우 비동기 방식의 접속을 시도하는것도 하나의 방법입니다.

여기선 간략하게만 설명했지만 다음도 같이 읽어보시면 좋습니다.

# Reference
* [https://inyl.github.io/programming/2017/12/02/timeout.html](https://inyl.github.io/programming/2017/12/02/timeout.html)
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTQ1NTkzNTIwOV19
-->