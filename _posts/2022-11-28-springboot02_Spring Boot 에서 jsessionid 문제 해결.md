---
layout: single
title:  "[SpringBoot] Spring Boot 에서 jsessionid 문제 해결"
categories: SpringBoot
tag: [Java, Spring, Spring Boot, STS, Eclipse]
toc: true
author_profile: false
---

<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block;
      overflow: auto;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      line-height: 20px;
      text-align: center;
      border: 0px !important;
    }

    table.dataframe th {
      text-align: center;
      font-weight: bold;
      padding: 8px;
    }

    table.dataframe td {
      text-align: center;
      padding: 8px;
    }

    table.dataframe tr:hover {
      background: #b8d1f3; 
    }

    .output_prompt {
      overflow: auto;
      font-size: 0.9rem;
      line-height: 1.45;
      border-radius: 0.3rem;
      -webkit-overflow-scrolling: touch;
      padding: 0.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      font: 1rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: $code-text-color;
      border: solid 1px $border-color;
      border-radius: 0.3rem;
      word-break: normal;
      white-space: pre;
    }

  .dataframe tbody tr th:only-of-type {
      vertical-align: middle;
  }

  .dataframe tbody tr th {
      vertical-align: top;
  }

  .dataframe thead th {
      text-align: center !important;
      padding: 8px;
  }

  .page__content p {
      margin: 0 0 0px !important;
  }

  .page__content p > strong {
    font-size: 0.8rem !important;
  }

  </style>
</head>


# Spring Boot 에서 jsessionid 문제 해결

# jsessionid란?

- jsessionid는 새 세션이 만들어지면 클라이언트가 쿠키를 지원하는지 여부를 서버가 알 수 없으므로, 쿠키와 URL에 모두 jsessionid를 만들어 주는 것을 의미한다.
- url에 붙거나 헤더에 붙여서 표시된다.
- jsessionid를 탈취당하면 **사용자 ID, Password를 몰라도 접근이 가능하게 된다.**

# 해결방법

### 1. application.properties에 아래와 같은 옵션을 추가한다.

![00_1.png](/assets/images/springboot02/00_1.png)

### 2. 클래스 계승 시작 SpringBootServletInitializer 재 작성 onStartup 방법

```java
@Override
public void onStartup(ServletContext servletContext) throws ServletException {
	super.onStartup(servletContext);
	servletContext.setSessionTrackingModes(Collections.singleton(SessionTrackingMode.COOKIE));
	SessionCookieConfig sessionCookieConfig=servletContext.getSessionCookieConfig();
	sessionCookieConfig.setHttpOnly(true);
}
```

### 3. @ Configuration 설정 클래스 에 bean 등록

ServletContextInitializer 클래스를 Bean객체로 등록하여 스프링 부트가 jseesion과 관련된 설정을 읽도록 해 주면 된다.

```java
@Bean
public ServletContextInitializer servletContextInitializer1() {
    return new ServletContextInitializer() {
        @Override
        public void onStartup(ServletContext servletContext) throws ServletException {
            servletContext.setSessionTrackingModes(Collections.singleton(SessionTrackingMode.COOKIE) );
        }
    };
}
```