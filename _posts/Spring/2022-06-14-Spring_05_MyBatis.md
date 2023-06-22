---
layout : single
title : Spring MyBatis Mapper
categories: Spring
tags: [SPRING]
toc:  true
toc_icon: "bars"
toc_sticky: true
author_profile: true
sidebar:
  nav: "docs"
---

> ##### Spring MyBatis Mapper

- src/test/java에 패키지 생성 Mapper 인터페이스 TimeMapper.java 생성
- MyBatipse 1.2.5 설치
- src/main/resource에 com/demo/mapper 폴더에 MyBatis XML Mapper로 TimeMapper.xml 생성
- root-context.xml에 아래 설정 넣기
- Mybatis xml 파일과 mapper 인터페이스 이름과 경로가 root-context.xml에 만들어놓은 경로와 같아야 함
- 결국, 역할은 xml파일의 SQL구문을 실행하기 위함

~~~xml
<!-- root-context.xml -->

<!-- com.demo.mapper 패키지에 존재하는 Interface를 Mapper Interface로 만들어주는 설정구문 -->
	<mybatis-spring:scan base-package="com.demo.mapper"/>
~~~

- 테스트 실행 파일 src/test/java의 컨트롤러에 TimeMapperTests.java를 JUnit 파일로 생성

~~~java
package com.demo.controller;

import static org.junit.Assert.*;

import javax.inject.Inject;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.demo.mapper.TimeMapper;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/spring/**/root-context.xml"})
public class TimeMapperTests {

	private static final Logger Logger = LoggerFactory.getLogger(TimeMapperTests.class);
	
	@Inject
	private TimeMapper timeMapper;
	
	@Test
	public void testGetTime() {
		Logger.info(timeMapper.getClass().getName());
		Logger.info(timeMapper.getTime());
	}
	
	@Test
	public void testGetTime2() {
		Logger.info("getTime2");
		Logger.info(timeMapper.getTime2());
	}
	
}
~~~

- testGetTime2를 테스트 실행하면 getTime2를 호출한다
- 그러면 TimeMapper.java 파일의 Select된 getTime2 메서드로 간다

~~~java
package com.demo.mapper;

import org.apache.ibatis.annotations.Select;

// Mapper Interface : Mapper XML파일의 SQL구문을 실행하는 기능을 담당\
// 설정. root-context.xml 에서 작업
// 사용할 mapper 파일이 존재하는 구조는 패키지명과 동일해야 한다
// 파일명과 Mapper Interface명도 동일해야 한다

public interface TimeMapper {
	
	@Select("select sysdate from dual")
	public String getTime();
	
	public String getTime2();

}
~~~

- 메서드를 통해 Mapper파일인 TimeMapper.xml로 이동해서 SQL select문을 가져온다

~~~xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.demo.mapper.TimeMapper">

	<select id="getTime2" resultType="String">
		select sysdate from dual
	</select>


</mapper>
~~~

