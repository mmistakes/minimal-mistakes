---
layout: single
title:  "MyBatis- Conditional statememt"
categories: MyBatis
tag: [MyBatis]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆단일 조건문 : < if >

조건식이 참인 경우 쿼리문을 실행합니다. 전달받은 파라미터 값에 따라 쿼리를 동적으로 변할 수 있게 해 줍니다. 주로 where의 일부로 포함되어서 사용한다.

**문법**

 ``<if test="조건">SQL</if>``

```java
<select id="findActiveBlogLike" resultType="Blog">
  SELECT * FROM BLOG WHERE state = ‘ACTIVE’
  <if test="title != null">
    AND title like #{title}
  </if>
  <if test="author != null and author.name != null">
    AND author_name like #{author.name}
  </if>
</select>
```



**<비교문>**

|        종류         | 설명           |
| :-----------------: | -------------- |
|         and         | && 사용 안됨   |
|         or          | \|\| 사용 안됨 |
|          <          | 숫자 비교      |
|          >          | 숫자 비교      |
|    <= (또는 =<)     | 숫자 비교      |
|    \>= (또는 =>)    | 숫자 비교      |
|         ==          | 특정값 비교    |
| .equals("비교대상") | 문자열 비교    |

<br>









# ◆다중 조건문 : < choose >, < when >, < otherwise >

<choose> 태그내의 여러개의 <when> 태그문의 경우 조건식이 true를 반환하는 <when>태그를 찾으면 거기서 멈추고 해당 <when>태그의 쿼리만 실행합니다.<br>만약 <when>태그의 조건식중 true 반환한 것이 없다면 <otherwise> 태그 내에 작성된 쿼리문이 실행됩니다. <otherwise>태그는 생략 가능합니다.

**문법**

```mysql
<choose>
  <when test="조건1">SQL</when>
  <when test="조건2">SQL</when>
  <otherwise>SQL</otherwise>
<choose>
```

```java
<select id="findActiveBlogLike" resultType="Blog">
  SELECT * FROM BLOG WHERE state = ‘ACTIVE’
  <choose>
 	 <when test="title != null">
    		AND title like #{title}    
   	 </when>
 	 <when test=test="author != null and author.name != null">
  	  	AND author_name like #{author.name}    
  	 </when>    
  </choose>
     <otherwise>AND author_name = '혜진'</otherwise>
</select>
```






