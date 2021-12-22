---
layout: single
title: "자바스크립트의 메소드 체이닝"
excerpt: 'js method chaining'
categories: javaScript
tag: javaScript, dom, element, array
---

# 메소드 체이닝
- 배열.map(함수).filter(함수).map(함수).join(구분자);
- 위와 같은 형태로 메소드를 줄지어서 작성하는 형식을 메소드 체이닝이라고 한다.

```javascript
  // 자바스크립트의 객체는 name:value 형태이다
  var data = [
    {name:"홍길동", kor:100, eng:70, math:70},
    {name:"김유신", kor:90, eng:90, math:60},
    {name:"강감찬", kor:70, eng:50, math:40},
    {name:"이순신", kor:80, eng:100, math:70},
    {name:"유관순", kor:100, eng:80, math:80}
  ];
  
  // 원본 배열을 사용해서 평균점수가 60점 이상인 합격자 명단이 저장된 배열을 생성해 보자
  var passedList = data.map(function(student) {
    var scores = {
      name: student.name
      avg: (student.kor + student.eng + student.math) / 3;
    };
    return scores;
  }).filter(function(scores) { // 위에서 리턴된 scores 객체를 기준으로 평균 점수가 60점 이상인 학생들만 반환한다
    return scores.avg >= 60;
  }).map(function(student) {  // 60점 이상인 학생들의 이름만 반환한다
    return student.name;
  })
  
  // 화살표 함수로 더 간략하게 표현 가능하다
  passedList = data.map(student => {
    return {
      name: student.name,
      avg: (student.kor + student.eng + student.math) / 3;
      }
  })
  .filter(student => student.avg >= 60)
  .map(student => student.name)
  .join(", "); // join은 반환된 배열을 지정된 문자열을 구분자로 하여 문자열을 반환한다
  // '홍길동, 김유신, 이순신, 유관순' 반환
```
