DevOps가 보다보면 참 좋은 것 같은데 실질적으로 도입하기엔 몇 가지 고려사항이 있는 것 같다.
콘웨이의 법칙이라는 재밌는 이야기가 있는데, 1967년에 앨빈 콘웨이 박사가
조직이 만드는 시스템의 설계는 조직의 의사소통 구조를 닮는다 라는 말을 했었다.

1. DevOps라는 조직은 책임과 권한이 필요하다.
빠르게 테스트하고 배포해야하는 만큼 이에 대한 권한이 주어져야하고 또 책임도 필요하게 된다.
이러한 이유로 조직 문화(기업 문화)가 수평적 관계를 지향하는 게 유리할 것 같다.
2. DevOps 문화를 더욱 잘 활용하기 위해선 이에 맞는 아키텍처가 필요하다.
기존의 모놀리식 환경에서도 이를 활용할 수 있겠지만 가장 효율적으로 이용하기 위해서는
MSA 아키텍처를 도입하는게 좋다. 단편적으로 MSA 아키텍처의 세분화 된 서비스를 통해 결합도가 낮아지고 각 서비스간의 영향도를 낮추면 더 빠르게 개발과 배포가 가능해질 것이다.
3. MSA와 DevOps를 도입했다면 이번엔 너무 많은 서비스와 릴리스 빈도 증가로 관리 운영이 힘들어 질 수 있다. 

DevOps를 위해 필요한 것들
AWS의 DevOps 방식(모범 사례)
* CI
* CD
* MSA
* IaC
* Monitoring, Logging
* Communication



DevOps lifecycle
1. Plan
2. Code
3. Build
4. Test
5. Package
6. Release
7. Deploy
8. Operate
9. Monitor
10. Repeat!

![참고 이미지](https://velog.velcdn.com/images/dalonn98/post/e84e75a9-5308-423f-b354-b0fff0035fe0/image.png)

https://www.redhat.com/ko/topics/devops
https://aws.amazon.com/ko/devops/what-is-devops/
https://shalb.com/wp-content/uploads/2019/11/Devops1-2048x1338.jpeg
https://octopus.com/devops/