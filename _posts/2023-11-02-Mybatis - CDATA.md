---
layout: single
title:  "Mybatis- CDATA"
categories: Mybatis
tag: [Mybatis, CDATA]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆ CDATA

쿼리문에서  문자열 비교연산자나 부등호를 처리할 때 또는 특수문자를 사용하는데 제한이 있다.<br>하지만 CDATA를 사용하면 태그안에서는 전부 문자열로 치환 시켜버리기 때문에 사용한다.

그리고 mybatis의 경우 xml에서 정의하기 때문에 부등호 처리는 오류 난다. 그래서 **< ![CDATA[ ]] >**를 사용해야한다.



```java
<select id="asiaFoodList" resultType="kr.co.restaurant.domain.RestaurantDTO">
    <![CDATA[
        SELECT *
        FROM (
            SELECT *
            FROM restaurant
            WHERE ctgryTwoNm in('동아시아음식','동남아시아음식','동아시아음식','서아시아음식','인도아시아음식')
            ORDER BY fcltyNm ASC
        )
        WHERE ROWNUM <=8
    ]]>
</select>
```

위의 예제를 보면,  restaurant테이블에 ctgryTwoNm의 조건에 해당하는 데이터들을 오름차순으로 뽑아오는데, 8개만 출력이 가능하도 록 했다. 이때 ROWNUM에 부등호를 사용해야하기 때문에  **< ![CDATA[ ]] >** 사용했다.
