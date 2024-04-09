---
layout: single
title:  "SpringBoot- JPA Repository method"
categories: SpringBoot
tag: [SpringBoot]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>



# ◆JPA Repository method

- findAll() : 테이블에서 레코드 전체 목록을 조회
- findById(id값) : id값을 이용하여 해당 데이터 조회, 
  findById로 호출한 값이 존재할 수도 있고 존재하지 않을 수도 있어서 리턴타입은 **Optional**로 사용
- count() : 테이블의 전체 레코드 수를 리턴
- save() : 객체를 테이블에 저장

<br>




---




# ◆메서드이름으로 쿼리 생성

스프링 데이터 jpa는 메소드 이름을 선언해주면 이름을 분석해 jpql 쿼리를 실행시켜준다.
JPA에 리포지터리의 메서드명을 분석하여 쿼리를 만들고 실행가는 기능이 있는데 **findBy + 엔티티** 속성명을 입력하며 데이터를 조회할수 있다.<br/><br/>


**예제**

```java
public interface QuestionRepository extends JpaRepository<Question, Integer>{
	Question findBySubject(String subject);
	Question findBySubjectAndContent(String subject, String content);
	List<Question> findBySubjectLike(String subject);
}
```
<br/><br/>




쿼리와 관련된 jpa메서드 : 
<a href="https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html ">Spring JPA 메서드</a>
<br>




---




# ◆ JUnit 메서드

assertEquals(예상한 결과, 결과값) : 테스트에서 예상한 결과와 실제 결과가 동일한지를 확인하는 목적으로 사용
assertTrue(op.isPresent()) : 괄호안의 값이 true인지 false인지 확인하여 false이면 오류발생하고 테스트 종료<br/><br/>



<a href="https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html ">인터페이스 CrudRepository</a>



