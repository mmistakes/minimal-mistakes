---
layout: post
title: "폼 관련 JS, jQuery 정리"
---

# 1. input date에 min, value 속성 추가
```
function datePicker(){
    let year, month, date, now, today;

    now = new Date();
    year = now.getFullYear();
    month = now.getMonth() + 1;
    date = now.getDate();

    if (date < 10) {
        date = '0' + date;
    }

    if (month < 10) {
        month = '0' + month;
    }

    today = year + "-" + month + "-" + date;

    document.getElementById("startDate").setAttribute("min", today);
    document.getElementById("startDate").setAttribute("value", today);
}
```
datePicker가 html 태그들보다 위에 작성되면 구동이 안됐다.  
이건 구글링 해도 다들 이유를 못찾던데 왜일까..  
html 태그가 로드 되기 전 자바스크립트 함수가 먼저 작동되서 안된건가?  
여튼 해결방법은 `<body>`밑에서 datePicker가 실행되게 한다.  

<br>

# 2. string 
