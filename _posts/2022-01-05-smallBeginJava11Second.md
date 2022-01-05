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
`@Mapper`가 있어야 Mapper인걸 스프링부트에서 인지하니 필요하다.  
그리고 Mapper가 직접 데이터에 접근하는 DAO 역할을 하므로 `@Repository`도 필요하다.  
메소드 명은 xml 쿼리에서 작성한 id 값과 무조건 동일하게 한다.  

<br>
매퍼 인것도 인지 되고 id와 메소드 명이 일치하므로  
정상적으로 mybatis 연결이 된다.  

<br>

참고  
@Repository = DAO 역할을 하는 클래스에 사용  

<br>

# 11. Service Interface  
매퍼에서 repository와 SQL을 매핑 시켜줬으니  
사용자의 요구를 처리하기 위한 비즈니스 로직을 구현해야 한다.(비즈니스 레이어 ⊃ 서비스)  
항상 service 개념 헛갈리면  
https://www.kurien.net/post/view/24  
다시 정독하자..  

<br>

위에서 매퍼 인터페이스는 DAO 대신 데이터 접근 뒤 DTO에 넣어줬다.  
저 데이터를 가져오기 위해서 Service Interface 작성  

<br>

```
package com.project.smallbeginjava11.service;

import java.util.List;

import com.project.smallbeginjava11.DTO.Category;

public interface CategoryService {
    public List<Category> getAllCategory();
}
```

<br>

# 12. ServiceImpl class
인터페이스로 기본 동작을 스케치 정도만 했다면  
상속 받은 클래스로 비즈니스 로직을 구체화 한다.  

<br>

```
package com.project.smallbeginjava11.serviceImpl;

import com.project.smallbeginjava11.DTO.Category;
import com.project.smallbeginjava11.mapper.CategoryMapper;
import com.project.smallbeginjava11.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryMapper categoryMapper;

    @Override
    public List<Category> getAllCategory(){
        return categoryMapper.getAllCategory();
    }
}
```

<br>

categoryMapper 변수는 어차피 CategoryMapper 타입이며 Read only에 수정될 일 없으므로  
final 선언  
`@RequiredArgsConstructor`를 통해 categoryMapper에 CategoryMapper에 대한 의존성을 생성자를 통해 주입  
인터페이스에서 선언한 추상 메소드 getAllCategory 구체화
