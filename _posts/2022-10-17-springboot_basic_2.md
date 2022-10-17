---
layout: single
title: "SpringBoot - Basic #2"
categories: springboot
Tag: [springboot-basic]
---
# 검색하기 / 정적 컨텐츠/ MVC와 템플릿엔진/ API

* **springboot 매뉴얼 검색하기**
  1.  spring.io 접속
  2.  project → spring boot 클릭
  3.  LEARN 탭에서 지금 사용하고 있는 버전의 Reference Doc. 클릭

![LEARN 탭 이미지](/assets/images/2022-10-17-14-50-37.png)

위 처럼 매뉴얼 창이 뜸 (필요한 부분이 있으면 위에 방식을 사용하기)

* **정적 컨텐츠 :** 파일을 그대로 웹 브라우저에 전달
* **MVC와 템플릿엔진:** 서버에서 변형을 해서 전달

![MVC, 템플릿 엔진 이미지](/assets/images/2022-10-17-14-52-56.png)

* **API:** json 구조를 통해 클라이언트에게 데이터 전달, 서버끼리 통신할 때도 많이 씀
    API를 이용할 때는 @ReponseBody 를 사용
    - HTTP의 BODY에 문자 내용을 직접 반환

  - viewResolver 대신에 HttpMesseageConverter 가 동작

  - 기본 문자처리: StringHttpMessageConverter

  - 기본 객체처리: MappingJackson2HttpMessageConverter
  
  ![사용 원리 이미지](/assets/images/2022-10-17-14-54-39.png)
  ![사용 예시 이미지](/assets/images/2022-10-17-14-55-07.png)

  ##### → 객체를 반환하는 것, view 없이 json 방식으로 브라우저에 내용을 띄움