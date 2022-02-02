---
layout: post
title: "플젝 하며 생긴 에러(9할이 오타) 정리"
---

# 1. Javascript/jQuery $(선택자)
![image](https://user-images.githubusercontent.com/86642180/149815516-2ca1171c-6ed5-4437-87ca-d4c46915b702.png)
콘솔이 하나도 안찍혀서 30분 동안 다른걸 봤는데  
name으로 가져올거면서 이상하게 선택자를 씀..  
아니면 id로 가져올수도 있는데 뭘한건지 모르겠다;  
⭐ name으로 접근할때는 `$(tagname[name=""])`

<br>

# 2. 에러는 아니지만 큰 실수  
![image](https://user-images.githubusercontent.com/86642180/152198666-95d110f2-ebbd-41ad-b6d6-e32283c0d31e.png)
애초에 view에서 id랑 name을 DB에 있는 칼럼이랑 똑같이 맞춰야  
헷갈리지 않을텐데 아무 생각 없이 view에 내키는대로 썼다  
그래서 다 하나하나 맞추는 중😂(2/4)
