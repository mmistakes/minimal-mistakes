---
layout: post
title: "small begin 설정"
---

이전 포스트에 이어서  

# 9. XML - 쿼리 작성  
```
<?xml version="1.0" encoding="UTF-8"?>

<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.project.smallbeginjava11.mapper.CategoryMapper">

    <select id="getAllCategory" resultType="Category">
        SELECT * FROM category;
    </select>

</mapper>
```
이전 application.properties에서 resultType 패키지 설정 했으니 DTO명만 작성  
커넥션 테스트 용으로 category 테이블 내용 전체를 select하는 쿼리만 작성했다.  

# 10. Mapper Interface
이때 DAO가 있는게 좋을까 고민도 했다.  
처음 공부할 때 spring으로 프로젝트를 진행할 때도 DAO DTO가 다 있었다.  
그 당시 CS 개념, 스프링에 대한 이해도가 현저히 떨어지는데 포트폴리오 만드는데만 급급했다.  
아무것도 모르는 수준은 아니지만 DAO 없이 진행하다가 꼬일까봐 걱정도 했으나  
어쨌든 모르는 것을 알기 위해 공부하는 것이니까!  

<br>

Mapper Interface에서 `@Repository` 를 사용하여  
DAO 클래스 대신 직접 데이터에 접근 하도록 한다.  

<br>

```
package com.project.smallbeginjava11.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.smallbeginjava11.DTO.Category;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface CategoryMapper {
    List<Category> getAllCategory();
}
```
List 타입으로 DB 데이터를 객체화 시킬 것이다.  
`@Mapper`
