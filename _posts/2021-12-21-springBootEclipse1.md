---
layout: post
title: "이클립스 스프링부트 DB연결"
---

처음에는 인텔리제이로 하자고 팀원에게 요청했으나  
내가 설치한 인텔리제이는 유료인데 팀원은 커뮤니티로 쓰니까  
뭔가 차이가 생겨서 나중에 에러가 날거란 걱정으로 일단 이클립스를 이용하기로함  

<br>
정말 엄청난 뻘짓을 하다가 결국 연결 됐다!  
![image](https://user-images.githubusercontent.com/86642180/146798320-a57b020f-aabb-42a8-bdec-5fb4bf5d31ee.png)
<br>
레퍼런스 : https://www.youtube.com/watch?v=Q5GGlqMVB18  
<br>
사실상 동영상만 따라해도 이미 DB연결 잘 되는건데  
애석하게도 application.properties에서 엔드포인트/DB이름을 적을때  
처음에 DB이름을 스네이크 형식으로 만들었는데  
카멜식으로 smallBegin이라 계속 접근했다..  
그러니까 DB를 못찾는다는 에러만 20번은 본거같다ㅎ...  
<br>
계속 이상함을 느껴 MySQL 워크벤치 확인해보니까...  
![image](https://user-images.githubusercontent.com/86642180/146798791-379d5cbd-214b-4920-ad0a-af643aea48e0.png)
<br>
역시 컴퓨터가 이상한게 아니라 내가 틀린거였다  
<br><br>
두 번째 뻘짓은  
![image](https://user-images.githubusercontent.com/86642180/146798914-afe7b101-43a4-4567-90a0-9600a610551d.png)
<br>
컨트롤러에 매핑을 두번해서 http://localhost:8000/category/getAllCategory 에 들어가면  
category Entity에서 모든 데이터를 리스트 형식으로 가져오게 했다.  
진짜... 시간을 너무 날려서 허무한게  
막상 로컬호스트 접속할 때  
![image](https://user-images.githubusercontent.com/86642180/146799202-20b8d6f8-037e-4560-825c-d37f5b117781.png)
<br>
이렇게 접속해서 계속 Whitelabel 에러가 떠서 멘붕이 왔다  
당연히 안되는게 맞다  
왜냐하면 /category일 경우 리턴되는 html파일 연결도 안했으니까ㅋㅋㅋ  
결국 다시 모든 코드를 점검하다 컨트롤러를 보고 알맞게 주소를 입력하니  
DB 연결이 잘 되는 것을 확인했다.
