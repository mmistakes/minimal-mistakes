---
layout: post
title: "JS 함수"
---

모든 요일을 다 선택했을 때 "매일"을 선택하라는 메세지 출력  
그리고 모든 체크박스 해제하는 함수  

<br>

```
function dayPicker(){
    let i;
    alert("'매일'을 체크해주세요");
    for(i=0; i<7; i++){
        document.getElementsByName("day")[i].checked = false;
    }
}
```

인데 작동이 안됨
