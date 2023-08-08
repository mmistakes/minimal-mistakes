---
layout: single
title:  "숫자퍼즐"
categories : html, js
tag : [프로젝트]
search: true #false로 주면 검색해도 안나온다.
---

아래와 같이 코딩해서 숫자 배치(왼쪽 위에서 오른쪽 아래로 오름차순 정렬) 및  Start버튼 새팅을 해준다.

```html
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
							<button type="button" id=<%=idx%> onclick="move(<%=idx%>)" disabled="disabled">
								<img class=<%=idx%> src=<%=filepath%> width=100; height=100;>
							</button>
						</td>						
				  <%}%>
					</tr>		
			  <%}%>
				<tr>
					<td style="border:1px solid black" height="50" align="center" colspan="4">
						<input id="start" style="width:100%;height:100%; font-size:30px; background-color:#54d5ff" type="button" onclick="start()" value="Start"></input>	
					</td>				
				</tr>
				...	 
			</table>							
		</td>			
	</tr>			
</table>
```
