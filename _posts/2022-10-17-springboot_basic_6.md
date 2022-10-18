---
layout: single
title: "SpringBoot - Basic #6"
categories: springboot
Tag: [springboot-basic]
---
# 스프링 빈과 의존관계(자바 코드로 직접 스프링 빈 등록)

#### 직접 등록

springConfig 클래스 만들기
@Configuration  어노테이션 설정
리포지토리, 서비스 생성자에 @Bean 어노테이션 설정
(스프링 컨테이너에 올라간 객체들만 Autowired가 성립 됨)

<hr>
#### DI 3가지

1. 필드 주입 - 고칠 수 없어서 사용 잘 안함​

2. 생성자 주입 - 요즘 많이 사용, 생성 시점에서 변경을 못하게 막을 수 있음

    (의존 관계가 실행중에 동적으로 변하는 경우*가 없으므로 권장)

    *런타임 서버가 떠 있는데 중간에 바꿔지는 것, 만약 그런 경우라면 config 파일을 수정해야함

3. setter 주입 - public 되어 있어서 조심해야함, 아무 개발자가 쓸 수 있게 연결 되어 있기 때문에

​

직접 등록을 사용하는 이유:

정형화 되지 않거나 상황에 따라 구현 클래스를 변경해야 하면 설정을 통해 스프링 빈으로 등록

_**springConfig.java**_

```java
package com.hello.hellospring;

import com.hello.hellospring.repository.MemberRepository;
import com.hello.hellospring.repository.MemoryMemberRepository;
import com.hello.hellospring.service.MemberService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class springConfig {
    @Bean
    public MemberService memberService(){
        return new MemberService(memberRepository());
    }
    @Bean
    public MemberRepository memberRepository(){
        return new MemoryMemberRepository();
    }
}
​
```