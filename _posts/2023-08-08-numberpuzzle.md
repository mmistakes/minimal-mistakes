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

<input id="start" ... onclick="start()" value="Start"></input>로 코딩한 버튼을 누르면 start함수가 실행된다.	

start함수에서 setInterval를 이용해 초시계를 구현해 준다.

```js
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
    //Start 버튼 비활성화 한다.
	$("#start").attr("disabled", true);
    
    //Quit버튼 활성화 한다.
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
         
       //99:59:59가 되면 자동으로 종료된다.
       if(th == 99 && tm == 59 && ts == 59)
       {
           end();    	   
       };
     }, 1000);		
  	...	
}
...
</script>
...
```

start함수에서 setInterval 실행뒤 mix함수를 실행해서 1~15까지의 숫자를 섞어준다.

```js
puzzle.jsp
...
<script type="text/javascript">
...
    function start() 
    {	
        ...
        mix();
        ...	
    }
...
</script>
...        
```

```js
puzzle.jsp
...
<script type="text/javascript">
...
    function mix()
    {

        var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        //var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 13, 14, 15];

        //number배열의 값들을 섞는 코드
        for(var i = 0; i < 1000; i++) 
        {
            //Math.floor(Math.random() * 11); 	>>	0 <= 난수 <= 10 
            //Math.floor(Math.random() * 5);	>> 	0 <= 난수 <= 4 		
            //Math.floor(Math.random() * 11) + Math.floor(Math.random() * 5) + 1
            //>> 1 <= 난수 <= 15
            //var r = Math.floor(Math.random() * 11) + Math.floor(Math.random() * 5) + 1;
            var r = Math.floor(Math.random() * 15) + 1;
            var temp = numbers[0];
            numbers[0] = numbers[r];
            numbers[r] = temp;		
        }
		
    	//이미지 재배치한다.
        for(var j=1;j<17;j++)
        {
            var miexd_num = numbers[j-1];
            var path;
            if(parseInt(miexd_num/10)==0)
            {
                path = "./r_number/0"+miexd_num+".jpg";			
            }
            else
            {
                path = "./r_number/"+miexd_num+".jpg";			
            }
            $("."+j).attr("src", path);		

            //버튼 활성화 설정
            if(miexd_num != 16)
            {
                $("button#"+j).attr("disabled", false);			
            }
            else
            {
                $("button#"+j).attr("disabled", true);				
            }
        }
    }	
...
</script>
...       
```

mix함수에서 숫자판을 섞는 작업을 한후, 만에 하나라도 초기 숫자의 배치와 같은 경우가 생긴다면, start함수를 다시 실행해준다.

	puzzle.jsp
	...
	<script type="text/javascript">
	...
	    function start() 
	    {	
	    	...
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

