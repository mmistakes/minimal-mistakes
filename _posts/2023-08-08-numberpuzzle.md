---
layout: single
title:  "숫자퍼즐"
categories : html, js
tag : [프로젝트]
search: true #false로 주면 검색해도 안나온다.
---

아래와 같이 코딩해서 숫자 배치(왼쪽 위에서 오른쪽 아래로 오름차순 정렬) 및  Start버튼 새팅을 해준다.

```html
puzzle.jsp

...
<body>
<!--margin top bottom 이 auto이면 0으로 잡는다-->
<table style="border-right:hidden; border-left:hidden; border-top:hidden; border-bottom:hidden; margin-top:100px;  margin-left:auto; margin-right:auto;">
	<tr>
		...
		<td>
			<table style="border:1px solid black">
				...	
				<%
				for(int i=0;i<4;i++)
				{				
				%>
					<tr>	
					<%
					for(int j=0;j<4;j++)
					{	
						int idx= ((i*4)+j+1);
						///my_project/src/main/webapp/number
						//http://localhost:9090/my_project/number/%02d.jpg
						//	"./number/%02d.jpg"
						String filepath = String.format("./r_number/%02d.jpg", (i*4)+j+1);
					%>
						<td style="border:1px solid black">				
							<button type="button" id=<%=idx%> onclick="move(<%=idx%>)"disabled="disabled">
								<img class=<%=idx%> src=<%=filepath%> width=100; height=100;>
							</button>
						</td>						
				  <%}%>
					</tr>		
			  <%}%>
				<tr>
					<td style="border:1px solid black" height="50" align="center" colspan="4">
						<input id="start" style="width:100%;height:100%; font-size:30px; background-color:#54d5ff" type="button"onclick="start()" value="Start"></input>	
					</td>				
				</tr>
				...	 
			</table>							
		</td>			
	</tr>			
</table>
...
</body>   
...    
```

<input id="start" ... onclick="start()" value="Start"></input>로 정의한 버튼을 누르면 start함수가 실행된다.	

	puzzle.jsp
	...
	<script type="text/javascript">
	...
	function start() 
	{	
		/*
			setInterval(func, delay)	
			func => delay(밀리초)마다 실행되는 function이다. 
					첫 번째 실행은 delay(밀리초) 후에 발생한다.		
			delay => 타이머가 지정된 함수 또는 코드 실행 사이에 지연해야 
						하는 밀리초(1/1000초) 단위의 시간이다. 
					 지정하지 않으면 기본 값은 0이다.
			참고 : https://developer.mozilla.org/ko/docs/Web/API/setInterval
		*/
		$("#start").attr("disabled", true);
		$("#end").attr("disabled", false);
	    timer = setInterval
	    (
	    function()
	     {
	       time++;
	       min = Math.floor(time/60);
	       hour = Math.floor(min/60);
	       sec = time%60;
	       min = min%60;
	
	       var th = hour;
	       var tm = min;
	       var ts = sec;
	       if(th<10){
	       th = "0" + hour;
	       }
	       if(tm < 10){
	       tm = "0" + min;
	       }
	       if(ts < 10){
	       ts = "0" + sec;
	       }
	       $('#time').html(th + ":" + tm + ":" + ts);
	       //document.getElementById("time").innerHTML = ;
	       	       
	       //99:59:59가 되면 자동으로 종료된다.
	       if(th == 99 && tm == 59 && ts == 59)
	       {
	    	   end();    	   
	       };
	     }, 1000);		
	  
		mix();
		
		var incre=0;
		for(var i=1; i<16; i++)
		{	
			cur = $("."+i).attr("src");
			cur_loc = cur.match(regex);
			if(cur_loc == i)
			{
				incre +=1;					
			}
		}
		
		//만에하나 mix()를 수행하였음에도, 숫자판을 섞기 전과 같은 결과일 경우를 대비해
		//아래와 같이 재귀함수를 사용한다.
		if(incre == 15)
		{
			start(); 		
		}		
	}
	...
	</script>
	...
