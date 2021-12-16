## 에러?
![image](https://user-images.githubusercontent.com/86642180/143280736-fab813a5-ba3e-4020-afe6-9283b57ddebb.png)
의존성 import 창도 안떠서 자동으로 된건가 했는데
의존성 주입이 되다 말았다.  
<br>
![image](https://user-images.githubusercontent.com/86642180/143281244-318c3c07-64d8-40f0-a81b-e95cbce5bfa8.png)
오른쪽 코끼리가 그레이들 변경사항 반영해준다.  
프로젝트 설정부터 에러가 넘친다.  

<br>
## 해결?
https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/htmlsingle/  
![image](https://user-images.githubusercontent.com/86642180/143282938-4d3b33fb-7af6-4471-8e88-58ea579d91b2.png)
depedecies에 맞게 적었으나 에러  
재부팅 reload gralde projects 클릭해도 에러  

<br>
해결 안되지만 찾아본 자료
https://github.com/freefair/okhttp-spring-boot/blob/2.6.x/build.gradle  
https://docs.spring.io/spring-boot/docs/current/gradle-plugin/reference/htmlsingle/#getting-started  
봐도봐도 모르겠다
