---
layout: single
title: "SpringBoot - Basic #5"
categories: springboot
Tag: [springboot-basic]
---

# 회원 서비스 개발/ 회원 서비스 테스트/ 스프링 빈과 의존관계(컴포넌트 스캔과 자동 의존관계 설정)

용어적인 측면:

서비스는 비즈니스에 의존적으로 설계

리포지토리는 기계적인 용어 

컨트롤러가 서비스를 통해 관리가 되고 조회가 되는 것이 서비스를 의존 한다는 것
​
컨트롤러 객체 생성(<u>@Controller</u> 어노테이션 사용)
서비스를 위한 컨트롤러 클래스에 객체를 생성
서비스의 생성자에 <u>@Autowired</u>를 붙여 컨테이너와 서비스를 연결
(스프링이 관리하면 스프링 컨테이너에 등록이 되고 스프링으로 받아쓰게 되어있음)
서비스를 위한 클래스에도 <u>@Service</u> 어노테이션 등록(Repository도 마찬가지)

MemberService 에서 사용하는 MemoryMemberRepository와
MemberServiceTest 에서 사용하는 MemoryMemberRepository가 서로 다른 인스턴스
<u>테스트는 같은 것으로</u> 하는 것이 맞기에 같은 인스턴스를 쓰게 바꿔야함

1. MemberService 클래스에서 직접 new 연산자로 생성하는 것이 아니라 memberRepository를 파라미터로 받는 생성자를 만듦 

2. 테스트 클래스에 @BeforeEach 메소드 안에 
memberRepository = new MemoryMemberRepository(); 
memberService = new MemberService(memberRepository); 선언

3. MemberService의 생성자를 통해 사용

![순서 예시 이미지](/assets/images/2022-10-17-16-39-13.png)
* MemberService 클래스의 입장에선 외부에서 memberRepository를 넣어줌(DI가 되버림)

정형화된 방법 

**controller** - 외부 요청을 받기 ,**service** - 비즈니스 로직 만들기 ,**repository**  - 데이터 저장

​

스프링 빈을 등록하는 2가지 방법
 - 컴포넌트 스캔과 자동 의존관계 설정 = 어노테이션 사용하는 방법
 - 자바 코드로 직접 스프링 빈 등록

​

컴포넌트 스캔과 자동 의존관계 설정

@Component 어노테이션이 있으면 스프링 빈으로 자동 등록
(@Controller, @Service, @Repository 모두 @Component를 포함)
![스프링 빈 등록 이미지](/assets/images/2022-10-17-16-52-16.png)


> 참고: 
> 스프링은 스프링 컨테이너에 스프링 빈을 등록할 때, 기본으로 _싱글톤_ 으로 등록(유일하게 하나만 등록해서 공유) 따라서 같은 스프링 빈이면 모두 같은 인스턴스
> 
> 싱글톤: 유일하게 하나가 등록되는 것
<hr>
* IntelliJ 단축키
어떠한 로직을 메소드로 바로 생성: Ctrl + Alt + M

* **given, when, then 문법** (Test를 할 때 사용하면 좋은 방식)
![테스트 방식 사용 이미지](/assets/images/2022-10-17-16-23-03.png)

given: 상황이 주어지는 곳(데이터를 기반하는 곳)
when: 실행 했을 때(어떤 걸 검증하는지 알 수 있음)
then: 결과가 나오는 곳(검증부)
<hr>

_**MemberService.java**_
```java
package com.hello.hellospring.service;

import com.hello.hellospring.domain.Member;
import com.hello.hellospring.repository.MemberRepository;
import com.hello.hellospring.repository.MemoryMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class MemberService {

    private final MemberRepository memberRepository ;
    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /**
     * 회원 가입
     */
    public Long join(Member member) {

        //같은 이름의 중복 회원 안되는걸로 설정
        /*
            Optional<Member> result = memberRepository.findByName(member.getName());
        result.ifPresent(member1 -> {
            throw new IllegalStateException("이미 존재하는 아이디 입니다");
        });
         */
        //더 간략한 코드

        validateDuplicateMember(member); // 중복 회원 검증
        memberRepository.save(member);
        return member.getId();
    }

    //메소드를 자동으로 생성해주는 단축키 Ctrl + Alt + M
    private void validateDuplicateMember(Member member) {
        memberRepository.findByName(member.getName())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 아이디 입니다");
                });
    }

    /**
     * 전체 회원 조회
     */
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
}
```
_**MemberServiceTest.java**_
```java
package com.hello.hellospring.service;

import com.hello.hellospring.domain.Member;
import com.hello.hellospring.repository.MemoryMemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class MemberServiceTest {

    MemberService memberService;
    MemoryMemberRepository memberRepository; //2. 보관

    @BeforeEach
    public void beforeEach(){
        memberRepository = new MemoryMemberRepository(); //1. MemoryMemberRepository() 생성
        memberService = new MemberService(memberRepository);//3. MemberService 에서 memberRepository를 인자로 받는 memberService에 memberRepository를 넣음
    }

    @AfterEach//테스트가 하나씩 끝날때마다 저장된 내용을 지우기 위한 곳(DB의 값 삭제)
    public void afterEach() {
        memberRepository.clearStore();
    }
    @Test
    void join() {

        //given
        Member member = new Member();
        member.setName("spring");
        //when
        Long saveId = memberService.join(member);

        //then
        Member findmember = memberService.findOne(saveId).get();
        assertThat(member.getName()).isEqualTo(findmember.getName());
    }

    @Test
    public void 중복_회원_예외(){
        //given
        Member member1 = new Member();
        member1.setName("spring");

        Member member2 = new Member();
        member2.setName("spring");
        //when
        memberService.join(member1);
        //
        /*
         * assertThrows(예외가 발생해야 하는 클래스, () -> 검증할 로직) 람다형식
         * 오른쪽 로직을 실행이 될 때, 왼쪽 예외가 발생해야 하는 문법
         * */
        IllegalStateException e = assertThrows(IllegalStateException.class, () -> memberService.join(member2));
        assertThat(e.getMessage()).isEqualTo("이미 존재하는 아이디 입니다");
    /*    try {
            memberService.join(member1);
            fail();
        }catch (IllegalStateException e){
            assertThat(e.getMessage()).isEqualTo("이미 존재하는 아이디 입니다");
        }*/
        //then
    }


    @Test
    void findMembers() {
    }

    @Test
    void findOne() {
    }
}
```
_**MemberController.java**_
```java
package com.hello.hellospring.controller;

import com.hello.hellospring.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class MemberController {

    //다른 곳에서도 쓰는 건 하나만 생성해서 공용으로 쓰는게 좋음
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }
}
```