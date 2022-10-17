---
layout: single
title: "SpringBoot - Basic #4"
categories: springboot
Tag: [springboot-basic]
---

# 회원 도메인과 레포지토리 만들기-2 / 테스트 케이스 작성

* **테스트 케이스 작성**
_JUit_ 이라는 프레임워크로 테스트하면 훨씬 유용
클래스명 규칙: 테스트를 위한 클래스명에 Test를 붙여 테스트용 클래스를 생성
경로: src/test/java 
![클래스명 예시 및 구조도](/assets/images/2022-10-17-15-43-39.png)

* _MemoryMemberRepository image_
![MemoryMemberRepository.java code image](/assets/images/2022-10-17-15-53-25.png)
* _MemoryMemberRepositoryTest image_
![MemoryMemberRepositoryTest.java code image](/assets/images/2022-10-17-15-54-43.png)
_※주의:_ <u>테스트는 순서가 보장이 되지 않음, 테스트는 의존 관계 없이 설계 해야함(저장소나 공용 데이터를 깔끔하게 지워야함)</u>

<p>위 이미지처럼 MemoryMemberRepository 클래스에는 테스트를 위한 메소드(데이터를 지우는 역할)를 만들어 놓고 MemoryMemberRepositoryTest에는 위에 메소드를 사용할 수 있는 메소드를 구현해야 함</p>

_**※TDD:**_ 테스트 주도 개발 - 테스트를 만들고 구현 클래스를 만들어 돌려보는 것, <br>검증할 수 있는 틀을 만들어 두고 어떤한 것이 완성되면 틀에 맞는지 확인하는 것

<hr>

_**MemoryMemberRepository.java**_
```java
package com.hello.hellospring.repository;

import com.hello.hellospring.domain.Member;

import java.util.*;

public class MemoryMemberRepository implements MemberRepository{
    //구현체
    //저장을 위한 map
    private static Map<Long, Member> store = new HashMap<>(); //
    private static long sequence = 0L; //키 값을 생성해줌

    @Override
    public Member save(Member member) {

        member.setId(++sequence); //시퀀스 값이 자동으로 올라갈 수 있게
        store.put(member.getId(), member);
        return member;

    }

    @Override
    public Optional<Member> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public Optional<Member> findByName(String name) {
        return store.values().stream()
                .filter(member -> member.getName().equals(name))
                .findAny(); //store의 value 를 돌면서 member의 이름과 파라미터의 이름이 같으면 다 보여주는 명령어
    }

    @Override
    public List<Member> findAll() {
        return new ArrayList<>(store.values()); //store.values() = member
    }
    //Test를 위한 메소드
    public void clearStore(){
        store.clear();
    }
}
```
_**MemoryMemberRepositoryTest.java**_
```java
package com.hello.hellospring.repository;

import com.hello.hellospring.domain.Member;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

public class MemoryMemberRepositoryTest {

    MemoryMemberRepository repository = new MemoryMemberRepository();

    @AfterEach//테스트가 하나씩 끝날때마다 저장된 내용을 지우기 위한 곳
    public void afterEach(){
        repository.clearStore();
    }
    @Test
    public void save(){
        Member member = new Member();
        member.setName("spring");

        repository.save(member);

        Member result = repository.findById(member.getId()).get();
        assertThat(member).isEqualTo(result);

    }
    @Test
    public void findByName(){
        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);

        Member result = repository.findByName("spring1").get();
        assertThat(result).isEqualTo(member1);

    }
    @Test
    public void findAll(){
        Member member1 = new Member();
        member1.setName("spring1");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("spring2");
        repository.save(member2);

        List<Member> result = repository.findAll();
        assertThat(result.size()).isEqualTo(2);

    }
}
```