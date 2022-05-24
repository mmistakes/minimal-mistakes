---
layout: post
title: "캘린더 css 다 끝내기"
---

# 1. 날짜 위치 이동 ✔
![image](https://user-images.githubusercontent.com/86642180/170079459-aa9edbd9-c10d-43f2-9bf2-51af7a2dab9d.png)
<br>
이미 전역변수로 생성한 currentTitle로 가져오려는데  
함수에서는 전역변수가 호출은 되는데 `.append()`가 작동하지 않았다  

```
let currentTitle = $('#current-year-month');

function showmain(){
    var day = dayList[today.getDay()];
    var date = today.getDate().toString().slice(0,3);
    var month = today.toLocaleString("en-US", {month : "short"});
    var year = today.getFullYear().toString();

    var theDate = year + '&nbsp;' + month + '&nbsp;' + date + '&nbsp;' + day;

    //var calendarTitle = $("#current-year-month");
    calendarTitle.empty();
    currentTitle.append(theDate);
    console.log(currentTitle);
    console.log(calendarTitle);
}
```
콘솔로 찍어보면  
![image](https://user-images.githubusercontent.com/86642180/170110831-179cd489-6177-4f12-9832-450a199366c9.png)  
이런 차이가 있다  
그러고 currenTitle을 가져올때 doucument.getElementById로 해도 동일한 결과가 나옴  

<br>
- 문제의 원인  
생각해보니까 current-year-month를 id로 값는 객체는  
showCalendar 함수가 실행되며 생성된다  
자바스크립트는 인터프리터 언어! 와는 무관하지만  
어쨌든 특정 함수가 호출되며 생성되는 current-year-month 객체이므로  
showmain()이 호출될때는 생성이 되지 않았다! 그래서 저 차이가 있었음  
문제 해결한 김에 전역변수를 거의 없앴다  

<br>

![image](https://user-images.githubusercontent.com/86642180/170111937-fbd90029-f0e2-4485-9091-c42fd0aaa896.png)


<br>

# 2. color picker 변경 ✔
![image](https://user-images.githubusercontent.com/86642180/170090913-12e4efb7-d947-4abc-bc1d-4c66c753f7fc.png)
```
    <input type="color" id="color" value="#16aaad" list="colors4palette" />
    <datalist id="colors4palette">
        <option>#355070</option>
        <option>#6D597A</option>
        <option>#B56576</option>
        <option>#E56B6F</option>
        <option>#EAAC8B</option>
    </datalist>
```

<br>

# 3. pre, next 함수 작동 안함 ✔
변수명 변경한거 js에 적용 안했음  

<br>

# 4. next 함수에서 active 클래스 추가 안됨 ✔
똑같은 함수인 pre에서는 잘 적용되지만 next만 안됨 도대체 왜...??  
>> 마찬가지로 변수명 변경한거 js에 적용 안함  

<br>

# ⭐ 5. 무한스크롤로 변경 뒤 insert 후에 선택된 날짜로 이동
