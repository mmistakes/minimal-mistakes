---
layout: single
title: "jQuery 이벤트 관련 메소드"
excerpt: 'jQuery event'
categories: javaScript
tag: javaScript, library, jQuery
---

> **.on(), .one(), .off(), .trigger()**
- id가 btn-n인 버튼이 여러 개 있다고 가정하고 메소드를 사용해보자

```javascript
// 1. 버튼을 클릭할 때마다 실행되는 이벤트핸들러 함수
$('#btn-1').on('click', function() {
    alert('1번 버튼 클릭');
});

$('#btn-2').onclick(function() {
    alert('2번 버튼 클릭');
});

// 2. 버튼을 처음 한 번 클릭할 때만 실행되는 이벤트핸들러 함수
$('#btn-3').one('click', function() {
    alert('3번 버튼 클릭');
});

$('#btn-4').one('click', function() {
    alert('4번 버튼 클릭');
});

// 3. 버튼에 등록된 이벤트 핸들러 함수 삭제하기
$("#btn-5").click(function() {	// btn-5를 클릭하면 btn-1에서 클릭이벤트 발생 시 실행될 이벤트핸들러를 삭제한다
    $('#btn-1').off('click');
});

$("#btn-6").click(function() {  // btn-6을 클릭하면 btn-2에서 클릭이벤트 발생 시 실행될 이벤트핸들러를 삭제한다
    $('#btn-2').off('click');
});

// 4. 페이지가 열리자마자 onclick 이벤트를 강제로 발생시키기
$('#btn-7').trigger('click');
```

> **$(this) 예제 1**
- this에는 이벤트가 발생한 엘리먼트 객체가 전달된다.
- $(this)는 이벤트가 발생한 엘리먼트를 포함하는 jQuery 결과 집합 객체이다.

<div class="row mb-3">
    <div class="col">
        <button class="btn btn-primary">버튼1</button>
        <button class="btn btn-primary">버튼2</button>
        <button class="btn btn-primary">버튼3</button>
    </div>
</div>

```jsp
// 이 코드를 입력하면 위와 같은 버튼 세 개가 나타난다.
<div class="row mb-3">
    <div class="col">
        <button class="btn btn-primary">버튼1</button>
        <button class="btn btn-primary">버튼2</button>
        <button class="btn btn-primary">버튼3</button>
    </div>
</div>

// 버튼 클릭 시 클릭한 버튼이 disabled 상태로 바뀌는 함수다.
<script>
    $('.btn').click(function () {
        $(this).prop('disabled', true);
    });
</script>
```

---
> **$(this) 예제 2**
<div class="row mb-3">
    <ul class="list-group">
        <li class="list-group-item">홍길동 <button class="btn btn-danger btn-sm float-end">삭제</button></li>
        <li class="list-group-item">김유신 <button class="btn btn-danger btn-sm float-end">삭제</button></li>
        <li class="list-group-item">강감찬 <button class="btn btn-danger btn-sm float-end">삭제</button></li>
        <li class="list-group-item">이순신 <button class="btn btn-danger btn-sm float-end">삭제</button></li>
        <li class="list-group-item">유관순 <button class="btn btn-danger btn-sm float-end">삭제</button></li>
    </ul>
</div>

```jsp
// 이 코드를 입력하면 위와 같은 리스트가 나타난다.
<div class="row mb-3">
    <ul class="list-group">
        <li class="list-group-item">홍길동 <button class="btn btn-danger btn-sm float-end">삭제</button></li>
        <li class="list-group-item">김유신 <button class="btn btn-danger btn-sm float-end">삭제</button></li>
        <li class="list-group-item">강감찬 <button class="btn btn-danger btn-sm float-end">삭제</button></li>
        <li class="list-group-item">이순신 <button class="btn btn-danger btn-sm float-end">삭제</button></li>
        <li class="list-group-item">유관순 <button class="btn btn-danger btn-sm float-end">삭제</button></li>
    </ul>
</div>

<script>
$('.btn-danger').click(function() {
    $(this).parent().remove(); // 이 버튼의 부모 태그(li)를 찾아서 삭제함
});
</script>
```
---

> **이벤트 핸들러 함수의 반환값**
- form 태그에서 onsubmit 이벤트가 발생하면 폼 입력값이 서버로 제출된다.
- jQuery에서는 <form> 태그에서 onsubmit 이벤트 발생 시 실행되는 함수가 false값을 반환하면 서버로 제출되지 않는다.
- return false는 event.preventDefault()와 같다.
<div class="row mb-3">
    <div class="col">
        <form id="form-login" action="login.jsp" method="post">
            <div class="mb-3">
                <label class="form-label">아이디</label>
                <input type="text" class="form-control" name="id">
            </div>
            <div class="mb-3">
                <label class="form-label">비밀번호</label>
                <input type="password" class="form-control" name="pwd">
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-primary">로그인</button>
            </div>
        </form>
    </div>
</div>

```jsp
<div class="row mb-3">
    <div class="col">
        <form id="form-login" action="" method="post">
            <div class="mb-3">
                <label class="form-label">아이디</label>
                <input type="text" class="form-control" name="id">
            </div>
            <div class="mb-3">
                <label class="form-label">비밀번호</label>
                <input type="password" class="form-control" name="pwd">
            </div>
            <div class="mb-3">
                <button type="submit" class="btn btn-primary">로그인</button>
            </div>
        </form>
    </div>
</div>
<script>
$("#form-login").submit(function() {
    var userId = $("input[name=id]").val();
    if (userId == "") {
        alert("아이디는 필수입력값입니다.");
        return false;
    }
    
    var userPwd = $("input[name=pwd]").val();
    if (userPwd == "") {
        alert("비밀번호는 필수입력값입니다.");
        return false;
    } 
    return true;
});
</script>
```
