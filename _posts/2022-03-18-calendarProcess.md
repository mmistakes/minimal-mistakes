---
layout: post
title : "캘린더 전체프로세스"
---

# 흐름
1. 사용자가 캘린더 페이지 접속  
2. JS에서 자동으로 오늘 날짜 보여주고 ajax로 오늘 날짜 컨트롤러에 전달
3. DB에서 to_do, ini에서 오늘 날짜 조회 뒤 맞는 데이터 select
4. 브라우저에 데이터가 보일 수 있게 데이터 전송  

<br>

# 2. ajax 전달
![image](https://user-images.githubusercontent.com/86642180/158941780-805d7dcc-7473-4ce3-989b-24d382151228.png)
계속 undefined가 나와서 ajax 전달이 안되는 중이다  
이유를 찾아보니ㅎ..  
`var selectedDate = document.getElementById("selected-date").innerText;`  
"selected-date"라는 p태그에서 값을 가져오는건데  
처음에 `.value`를 작성해서 값을 가져오지 못한 것이었다.  

<br>

innerText로 고치니  
![image](https://user-images.githubusercontent.com/86642180/158942018-4ee25774-ef28-406a-a0cb-82aefa7177f7.png)
값을 가져오는 것은 잘 되나 ajax 통신이 여전히 안된다  

<br>

