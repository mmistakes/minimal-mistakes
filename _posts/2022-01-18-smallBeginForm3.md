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

# 2. string 👉 number(int)
String에 사칙연산을 하면 숫자로 타입 변경됨(단 string이 숫자일 경우)
반대일 때는 `.toString()`

```
function duration(){
    let selected, minDate, maxDate, yyyy, mm, dd;
    selected = document.getElementById("startDate").value;

    yyyy = selected.slice(0,4);
    yyyy *= 1;
    yyyy += 1;
    mm = selected.slice(5,7);
    mm *= 1;
    dd = selected.slice(-2);

    maxDate = yyyy + "-" + mm + "-" + dd;

    yyyy -= 1;
    mm += 1;
    minDate = yyyy + "-" + mm + "-" + dd;

    document.getElementById("endDate").setAttribute("max", maxDate);
    document.getElementById("endDate").setAttribute("min", minDate);
    document.getElementById("endDate").setAttribute("value", maxDate);
}
```

<br>

# 3. display (css)
```
function everyWeek(){
    // 보이게 하기(코드 정리해야됨
    document.getElementById("week2").style.display = "block";
    document.getElementById("day-pick").style.display = "block";

    // 안보이게 할 것
    document.getElementById("week").style.display = "none";
    document.getElementById("or").style.display = "none";
    document.getElementById("date").style.display = "none";
    document.getElementById("form-toggle").style.display = "none";
}
```
`.style.display`로 조정  
jQUery일때는 `show()`, `hide()`  

<br>

# 4. 체크박스 전체 해제
```
function dayPicker(){
    let i;
    for(i=0; i<7; i++){
        document.getElementsByName("day")[i].checked = false;
    }
}
```
모든 체크박스 name은 day며, 배열 형식으로 하나하나 가져오고 일일이 false로 바꿔주는 방식  
체크박스가 총 7개라 이렇게 썼다..  
