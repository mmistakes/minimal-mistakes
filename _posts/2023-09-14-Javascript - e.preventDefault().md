---
layout: single
title:  "Javascript- preventDefault"
categories: Javascript
tag: [Javascript, preventDefault]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>









# ◆e.preventDefault();

 **이벤트의 기본기능을 막는 것**으로 생각하면 된다.

```javascript
//html
<button type="submit" data-oper="modify" class="btn btn-defalut">Modify</button>
<button type="submit" data-oper="remove" class="btn btn-danger">Remove</button>
<button type="submit" data-oper="list" class="btn btn-info">List</button>

//jquery
$(document).ready(function(){
		var formObj = $("form");
		
		$("button").on("click", function(e){
			e.preventDefault();
		
			var operation = $(this).data("oper");
			
			console.log(operation);
			
			if(operation === "remove"){
				formObj.attr("action", "${ctx }/board/remove");
				
			}else if(operation === "list"){
				
				self.location = "${ctx }/board/list";
				return;
			}
			
			formObj.submit();
		});
	});

```

button을 클릭하였을 때, 기존의 button의 속성인 submit이 실행되지않고 밑의 로직이 수행되도록 **e.preventDefault()를 사용하여 기존의 태그의 속성을 막았다.**





------

**코드 해석**

 ``var operation = $(this).data("oper");`` :<br>눌린녀석의 data의 oper인 data-oper의 값을 operation의 변수에 초기화 한다.

``formObj.attr("action", "${ctx }/board/remove");`` :<br>form태그의 action값에 "${ctx }/board/remove"속성값을 부여한다.

``self.location = "${ctx }/board/list";`` :<br>해당 operation의 경로를  "${ctx }/board/list";로 변경하겠다는 의미이다.



**=== 과 ==의 차이**

== : 동등 연산자로 좌항과 우항을 비교해서 서로 값이 같다면 true 다르다면 false가 된다. <br>=== : 데이터의 값과 데이터타입도 같은경우  서로 값이 같다면 true 다르다면 false가 된다.

