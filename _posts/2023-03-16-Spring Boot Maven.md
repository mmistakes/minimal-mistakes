# Spring Boot and Maven

대세 + 장단점 모두 Gradle이 좋으며 점점 Gradle로 넘어가고 있다고 한다.

Maven을 아직도 쓰는 이유는 아직 많은 개발자들이 XML에 더 익숙하기도 하고
아직 Gradle을 잘 사용하는 개발자들이 상대적으로 적어서라고 한다.

당연히 나도 이왕 하는거 Gradle로 배우고 싶지만 강의가 Maven으로 가르킨다. ㅜ
뭐 배우고 Gradle로 다시 구현해보는 방식으로 해봐야겠다.

![Pasted image 20230315001034.png](../images/2023-03-16-Spring%20Boot%20Maven/719ad3cc62fb15beca4ff64d3785917282136207.png)

작동 방식은 Maven을 이용해서 구성 파일을 먼저 읽은 다음 컴퓨터에 있는 Maven Local Repository를 확인한다.
Local Repository에 파일이 없으면 Maven은 인터넷에서 파일을 가져온다.
Dependency 라던가 클래스 경로등 알아서 처리해준다.

심부름꾼 비슷하다.
