---
layout: single
title: "플라스크(Flask)와 파이썬(Python) - 003"
categories: Backend
tag: [flask, 플라스크, 파이썬, python]
toc: true
author_profile: false
toc: false
sidebar:
nav: "docs"
search: true
---

<center>**[공지사항]** <strong> [개인적인 공부를 위한 내용입니다. 오류가 있을 수 있습니다.] </strong></center>
{: .notice--success}


<center><h2>[플라스크(Flask)와 파이썬(Python) - 003]</h2></center><br>


<center><h3> 플라스크(Flask) basic - 003</h3></center><br>

<h3>정적 HTML 페이지 리턴하기</h3><br>



<div align="center">
<img src="http://drive.google.com/uc?export=view&id=1oFLKf_bBPx64GPgKqDOsDo-2ja4PvY_O" width="1400"><br><br>


<img src="http://drive.google.com/uc?export=view&id=1oGGKKlHzIQZ_VDdWlMuIQ5uQ2F4Nuy1H"><br><br>


<img src="http://drive.google.com/uc?export=view&id=1oIZJU9oBc0r6PecA5Q-bDZRjwh80zCsQ"><br><br>


<img src="http://drive.google.com/uc?export=view&id=1oIpyJFgVwH35kHCDBO1_Xn5f9JwyUPrN"><br><br>

</div>


<h3>REST(REpresentational State Transfer)</h3><br>
<h5>자원(resource)의 표현(representation)에 의한 상태 전달<br>
HTTP URI를 통해 자원을 명시하고,<br> HTTP Method를 통해 자원에 대한 CRUD Operation 적용<br><br>
CRUD Operation와 HTTP Method<br>
 - Create: 생성 (POST)<br>
 - Read: 조회 (GET)<br>
 - Update: 수정 (PUT)<br>
 - Delete: 삭제 (DELETE)<br></h5>


<h3>flask 로 REST API 구현 방법</h3><br>
<h5>특정한 URI를 요청하면 JSON 형식으로 데이터를 반환하도록 만든다.</h5>
<h5>웹주소(URI) 요청에 대한 응답(Response)를 JSON 형식으로 작성<br>
Flask에서는 dict(사전) 데이터를 응답 데이터로 만들고,<br> 
이를 jsonify() 메서드를 활용해서 JSON 응답 데이터로 만들 수 있음<br></h5>