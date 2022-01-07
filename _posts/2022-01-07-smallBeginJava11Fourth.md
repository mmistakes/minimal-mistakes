---
layout: post
title: "인텔리제이 mybatis 에러"
---

# 15. Mybatis connection 문제 해결
놀랍게도 이걸로 거의 이틀은 질질 끌었다...  

<br>

보통 binding 에러가 뜨면 확인하는게
- namespace  
- method 명 = select id  
- classpath  
- DB 연결  
- 쿼리문의 SELECT 목록과 resultType 모델의 변수 타입이 일치하지 않을 경우  
- 경로의 문제  
- (new) xml 생성 다시 하기 ⭐⭐⭐

<br>

binding 에러면 오타 하나로 생기는 경우가 많아서  
application.properties부터 컨트롤러까지 확인했다.  
하지만 오타가 없었다 정말 없었다.  
다같이 확인해도 오타는 없었으니 경로 문제와 resultType을 확인했다.  
거기에도 문제가 없었다!  

<br>

정말 문제가 없어 보이지만  
잘못은 내가 하지 컴퓨터가 틀린적 없다.  
아무거나 막 하다보면 되겠지라는 심정으로 xml을 새로 생성했더니 문제가 해결됐다.  

<br>

문제 원인은 xml을 생성할때 발생했다.  
![image](https://user-images.githubusercontent.com/86642180/148490153-4b421e67-a566-4d7d-b67a-d31a4e92ccb3.png)  
처럼 인텔리제이에서 매칭해주니까 대충 xml로 선택한 것이 화근이었다.  

![image](https://user-images.githubusercontent.com/86642180/148491069-40bd3d57-3e6e-4b0d-bc10-bc432a35971c.png)  
xml 생성 시 위의 이미지처럼 `파일명.xml`로 생성하니 바로 문제 해결됐다.  

<br>

일어나자마자 막 시도하니 해결되서 좋았다.  
저게 왜 문제인지는 나도 모르겠다.  
똑같은 설정, 경로, 코드로 이클립스에서 만들었을 때는 잘 되던데  
저런게 문제였다니.
