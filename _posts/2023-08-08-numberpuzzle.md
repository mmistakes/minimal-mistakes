---
layout: single
title:  "숫자퍼즐"
categories : html, js
tag : [프로젝트]
search: true #false로 주면 검색해도 안나온다.
---

아래와 같이 코딩해서 숫자를 왼쪽 위에서 오른쪽 아래로 오름차순 정렬하고 Start버튼 새팅을 해준다.

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

<input id="start" ... onclick="start()" value="Start"></input>로 코딩한 버튼을 누르면 start함수가 실행된다. start함수에서 setInterval를 이용해 초시계를 구현해 준다.

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

start함수에서 setInterval 실행 뒤 mix함수를 실행해서 1~15까지의 숫자를 섞어준다.

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

mix함수에서 숫자판을 섞는 작업을 한 후, 만에 하나라도 초기 숫자의 배치와 같은 경우가 생긴다면, start함수를 다시 실행해준다.

```js
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
```

아래를 보면 "<button type="button" id=<%=idx%> onclick="move(<%=idx%>)" disabled="disabled">...</button>"라 코딩이 되어 있기에, 숫자 이미지를 클릭한다면, move 함수가 실행된다.

```html
puzzle.jsp
...
<body>
...
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
			...		 
			</table>							
		</td>			
	</tr>			
</table>
...
</body>
```

공백칸 옆의 숫자 이미지를 클릭하면, 공백과 숫자의 위치를 바꿔준다.

```js
puzzle.jsp
...
<script type="text/javascript">
...
	//img태그 src값에서 숫자만 추출하기 위한 정규식
	const regex = /\d{2}/;

	function move(cur_idx)
	{
		var cur;
		var next;
		var cur_loc;
		var next_loc_confirm;
		var idx = cur_idx-1;
		
		cur = $("."+cur_idx).attr("src");
		cur_loc = cur.match(regex);
		//alert(cur_loc);
		
		//클릭한 숫자판의 위치가 사각형 맨 좌측면에 접하지 않는경우
		if (idx % 4 != 0) 
		{
			var next_loc = cur_idx-1;
			next = $("."+next_loc).attr("src");
			
			if (next.match("16")) 
			{
				$("."+cur_idx).attr("src", next);	
				$("."+next_loc).attr("src", cur);
				$("button#"+cur_idx).attr("disabled", true);	
				$("button#"+next_loc).attr("disabled", false);		
				next_loc_confirm = next_loc;
			}
		}
		
		//클릭한 숫자판의 위치가 사각형 맨 우측면에 접하지 않는경우
		if (idx % 4 != 3)
		{
			var next_loc = cur_idx+1;
			next = $("."+next_loc).attr("src");
			
			if (next.match("16")) 
			{
				$("."+cur_idx).attr("src", next);	
				$("."+next_loc).attr("src", cur);
				$("button#"+cur_idx).attr("disabled", true);	
				$("button#"+next_loc).attr("disabled", false);			
				next_loc_confirm = next_loc;
			}
		}
		
	 	//주의
		//몫을 구하기 위해서 parseInt(idx/4)와 같은 형태로 해주어야 정상 동작한다.
		//안그러면 몫이되는 정수부분만 구해지지 않는다.	
		
		//클릭한 숫자판의 위치가 사각형 맨 위측면에 접하지 않는경우
	 	if (parseInt(idx/4) != 0) 
		{
			var next_loc = cur_idx-4;
			next = $("."+next_loc).attr("src");
			
			if (next.match("16")) 
			{
				$("."+cur_idx).attr("src", next);	
				$("."+next_loc).attr("src", cur);
				$("button#"+cur_idx).attr("disabled", true);	
				$("button#"+next_loc).attr("disabled", false);				
				next_loc_confirm = next_loc;
			}
		}
	 	
	 	//클릭한 숫자판의 위치가 사각형 맨 아랫면에 접하지 않는경우
	 	if (parseInt(idx/4) != 3) 
		{
			var next_loc = cur_idx+4;
			next = $("."+next_loc).attr("src");
			
			if (next.match("16")) 
			{
				$("."+cur_idx).attr("src", next);	
				$("."+next_loc).attr("src", cur);
				$("button#"+cur_idx).attr("disabled", true);	
				$("button#"+next_loc).attr("disabled", false);				
				next_loc_confirm = next_loc;				
			}
		}
    	...
	}
...
</script>
...    
```

숫자의 위치를 바꾼 후 퍼즐 완성 여부를 확인하고, 완성되었다면,  ajax로 비동기 통신을 한다.


```js
puzzle.jsp
...
<script type="text/javascript">
...
	function move(cur_idx)
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
		var time_r = $('#time').html()
		
	 	//퍼즐 완성여부 검사
	 	if(incre == 15)
	 	{
			$.ajax
			({
				type: 'POST',
				url: './Time_record',
				data: 
				{
					id : '<%=id%>',
					gname : 'puzzle',
					time : time,
					mod : 0
				}		
			});	
            ...
	 	}        
	}
...
</script>
...   	
```
비동기 통신으로 받은 id,gname,time,mod값을 이용해 

"new Time_record_DAO().time_record_renewal(id,gname,time);"를 수행한다.


```java
Time_record.java
 
package games;
...
@WebServlet("/Time_record")
public class Time_record extends HttpServlet
{
	private static final long serialVersionUID = 1L;
	...
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		actionDo(request, response);
	}

	private void actionDo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html; charset=UTF-8");
			
		HttpSession session	= request.getSession();	
		
		String id = (request.getParameter("id") != null) 
				? request.getParameter("id") : "";
		
		String gname  = (request.getParameter("gname") != null) 
						? request.getParameter("gname") : "";		
		
		int time  = (request.getParameter("time") != null) 
					? Integer.parseInt(request.getParameter("time")) : 0;
		int current_page = (request.getParameter("current_page") == null)?
				1:Integer.parseInt(request.getParameter("current_page"));		
		int mod  = Integer.parseInt(request.getParameter("mod"));


		RankingList list;
		
		//새로새운 기록 올리기
		if(mod == 0)
		{
			new Time_record_DAO().time_record_renewal(id,gname,time);				
		}
		...	
	}
}	
```

"time_record_renewal(String ID, String GAME, int TIME)"함수에서 조건에 맞게 sql문을 실행하고 오라클에 기록을 올린다.

```java
Time_record_DAO.java

package games;
...
public class Time_record_DAO 
{
	private Connection conn = null;
	private PreparedStatement pstmt = null;
	private ResultSet rs = null;
	static String sql;
	
	static int time;
	static int hour;
	static int min;
	static int sec;
	static int id_rank;	
	
	static RankingList result_T;
	public Time_record_DAO() 
	{
		try 
		{
			Class.forName("oracle.jdbc.driver.OracleDriver");
			String url = "jdbc:oracle:thin:@localhost:1521:xe";
			conn = DriverManager.getConnection(url,"koreait","1011");	
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
		}
	}
	
	public int time_record_renewal(String ID, String GAME, int TIME)
	{	
		Timestamp timestamp;
		try 
		{
			String sq1 = "select TIME from TIMERECORD where ID=? and GNAME=?"; 	
			pstmt = conn.prepareStatement(sq1);
			pstmt.setString(1, ID);
			pstmt.setString(2, GAME);
			rs = pstmt.executeQuery();
			
			//이전의 게임기록이 존재하는 경우
			if(rs.next())
			{
				int prev_time_record = rs.getInt("TIME");
				
				//현재의 기록이 이전의 것보다 더 좋은경우
				if(prev_time_record > TIME)
				{
					
					timestamp = new Timestamp(System.currentTimeMillis());
					String sql2 = "update TIMERECORD set TIME=?, WRITEDATE=? where ID=? and GNAME=?";
					pstmt = conn.prepareStatement(sql2);
					pstmt.setInt(1, TIME);
					pstmt.setTimestamp(2,timestamp);					
					pstmt.setString(3, ID);
					pstmt.setString(4, GAME);		
					pstmt.executeUpdate();
				}
			}
			
			//이전의 게임기록이 없는경우
			else
			{
				String sql3 = "insert into TIMERECORD(ID,GNAME,TIME) values(?,?,?)";
				pstmt = conn.prepareStatement(sql3);
				pstmt.setString(1, ID);
				pstmt.setString(2, GAME);
				pstmt.setInt(3, TIME);
				pstmt.executeUpdate();	
			}
			
			conn.close();
			pstmt.close();
			rs.close();
		} 
		catch (SQLException e) 
		{
			e.printStackTrace();
		}
			
		return 0;	
	}
}
```

오라클에 기록을 올린 뒤, 결과를 보여주는 모달창을 뜨워준다. 그리고 end함수를 실행한다.


```js
puzzle.jsp
...
<script type="text/javascript">
...
	function move(cur_idx)
	{
		...	
	 	//퍼즐 완성여부 검사
	 	if(incre == 15)
	 	{
			...	 		
	 	 	//setTimeout(function() {함수의 내용}, 시간(밀리초));
	 	 	//특정 시간이 지난후 함수의 내용을 실행한다.
	 	 	
	 	 	//setTimeout을 사용하지 않으면, 마지막 버튼이 옮겨진 후 전체 
	 	 	//퍼즐이 완성된 모습이 보이기전 정답을 알리는 메시지가 뜬다. 		
		 	setTimeout(function() 
		 	{	 		
				$('#messageType').html('퍼즐을 완성했습니다.');
				$('#messageContent').html("기록 : " + time_r);
				$('#messageCheck').attr('class', 'modal-content panel-success'); 
				//팝업 창을 띄운다.
				$('#messageModal').modal('show');		
	 			end();			
		 	}, 100);	 	 	
	 	}
	}
...
</script>
...   		
```
end함수에서 Start버튼을 활성화, Quit버튼을 비활성화 한다.

```js
puzzle.jsp
...
<script type="text/javascript">
...
    function end() 
    {
        clearInterval(timer);
        $('#time').html("00:00:00");
        time = 0;		
    
    	//Start버튼 활성화한다.
        $("#start").attr("disabled", false);
    
    	//Quit버튼 비활성화한다.
        $("#end").attr("disabled", true);

        //숫자를 오름차순으로 배치해 둔다.
    	//버튼 완성전 Quit버튼 눌렀을 때를 위해 필요하다.
        <%
        for(int i=1;i<16;i++)
        {
            String filepath = String.format("./r_number/%02d.jpg", i);%>	
            var num = <%=i%>;
            $("button#"+num).attr("disabled", true);	
            $("."+num).attr("src", '<%=filepath%>');		
      <%}%>
        $("button#"+16).attr("disabled", true);	
        $(".16").attr("src", "./r_number/16.jpg");	
    }
...
</script>
...  
```

Start버튼 클릭후 버튼 완성 전 Quit버튼을 누른다면 'onclick="end()"'에 의해 end함수가 실행된다.

```jsp
puzzle.jsp
...
<body>
<table style="border-right:hidden; border-left:hidden; border-top:hidden; border-bottom:hidden; margin-top:100px;  margin-left:auto; margin-right:auto;">
	<tr>
		...
		<td>
			<table style="border:1px solid black">
			...
				<tr>
					<td style="border:1px solid black" height="50" align="center" colspan="4">
						<input id="end" style="width:100%;height:100%; font-size:30px; 
						background-color:#ffa1b9" type="button" onclick="end()" value="Quit" disabled=true>							</input>	
					</td>			
				</tr>		 
			</table>							
		</td>			
	</tr>			
</table>
</body>
```

실행화면

![res1](../../images/2023-08-08-numberpuzzle/res1.png){: width="100%" height="100%"}

전체코드

```html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="games.PuzzleGameActionListener"%>

<%@ page import="java.util.*"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">

<title>퍼즐</title>

<link rel="stylesheet" href="./css/bootstrap.css">
<link rel="stylesheet" href="./css/codinglearning.css">
<link rel="stylesheet" href="./css/custom.css">
<link rel="icon" href="./images/favicon.png">
<script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="./js/bootstrap.js"></script>


<script type="text/javascript">
	<%	
	int mods_n = (request.getParameter("mods") == null) ? 
		   0 : Integer.parseInt(request.getParameter("mods")); 
	String keyword = (request.getParameter("keyword") == null) ? 
		   "" : (String)(request.getParameter("keyword"));
	String mods = "?mods=" + mods_n + "&keyword="+keyword;
	String id = ((String)session.getAttribute("id") != "" && (String)session.getAttribute("id") != null) 
	? (String)session.getAttribute("id") : "";
	if(id == null || id=="") 
	{
	%>
		$(location).attr("href","http://localhost:9090/my_project/loginForm.jsp");
	<%}%>
	var md = '<%=mods%>';	
	var md_n = <%=mods_n%>;
	var timer;
	var time = 0;
	var flag = false;
	var buttons=[];
	$("#end").attr("disabled", true);
	//img태그 src값에서 숫자만 추출하기 위한 정규식
	const regex = /\d{2}/;
	
	function log_out() 
	{
		/*
		아래 네비게이션에서와 유사하게 session.setAttribute("id","");와 
		같이 처리 하면, 로그인 페이지에서 다시 메인으로 돌아올 경우 
		여전히 로그인 된 상태로 보여지게 된다.(서버에서 해석후 없어지는 코드다)
		세션을 다루려면 귀찮더라도 ajax등으로 서버와 통신해야 한다.
		참고 : https://okky.kr/articles/849041
		*/
		$.ajax
		({
			type: 'POST',
			url: './LogOUT',
			success: function() 
			{
				//현재 페이지를 새로고침한다.
				location.reload(true);			
			},
			error: function() 
			{
				alert('요청실패');
			}
		});
		//return값이 true이어야 href에 있는 경로로 이동이 된다.
		return true;
	}
	
	function move_to(current_page) 
	{
		$.ajax
		({
			type: 'POST',
			url: './GetList',
			data: 
			{
				mods : md_n,
				current_page : current_page,	
				keyword : '<%=keyword%>'
			},
			success: function() 
			{
				//현재 페이지를 새로고침한다.
				//location.reload(true);	
				//$(location).attr("href","http://localhost:9090/my_project/board.jsp");	
				var addr="http://localhost:9090/my_project/board.jsp";
				//addr += md;
				$(location).attr("href",addr);	
				//location.replace(addr);
			}
		});	
		return true;
	}
	
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
			
			//버튼 활성화
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
	
	function start() 
	{	
		/*
			setInterval(func, delay)	
			func => delay(밀리초)마다 실행되는 function이다. 첫 번째 실행은 delay(밀리초) 후에 발생한다.		
			delay => 타이머가 지정된 함수 또는 코드 실행 사이에 지연해야 하는 밀리초(1/1000초) 단위의 시간이다. 
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
	
	function end() 
	{
	    clearInterval(timer);
	    $('#time').html("00:00:00");
	    time = 0;		
	    $("#start").attr("disabled", false);
	    $("#end").attr("disabled", true);
	    
	    //퍼즐을 원상태로 바꾸어 놓는다.
	    <%
		for(int i=1;i<16;i++)
		{
			String filepath = String.format("./r_number/%02d.jpg", i);%>	
			var num = <%=i%>;
			$("button#"+num).attr("disabled", true);	
			$("."+num).attr("src", '<%=filepath%>');		
	  <%}%>
		$("button#"+16).attr("disabled", true);	
		$(".16").attr("src", "./r_number/16.jpg");	
	}
	
	function move(cur_idx)
	{
		var cur;
		var next;
		var cur_loc;
		var next_loc_confirm;
		var idx = cur_idx-1;
		
		cur = $("."+cur_idx).attr("src");
		cur_loc = cur.match(regex);
		//alert(cur_loc);
		
		//클릭한 숫자판의 위치가 사각형 왼쪽면에 접하지 않는경우
		if (idx % 4 != 0) 
		{
			var next_loc = cur_idx-1;
			next = $("."+next_loc).attr("src");
			
			if (next.match("16")) 
			{
				$("."+cur_idx).attr("src", next);	
				$("."+next_loc).attr("src", cur);
				$("button#"+cur_idx).attr("disabled", true);	
				$("button#"+next_loc).attr("disabled", false);		
				next_loc_confirm = next_loc;
			}
		}
		
		//클릭한 숫자판의 위치가 사각형 오른쪽면에 접하지 않는경우
		if (idx % 4 != 3)
		{
			var next_loc = cur_idx+1;
			next = $("."+next_loc).attr("src");
			
			if (next.match("16")) 
			{
				$("."+cur_idx).attr("src", next);	
				$("."+next_loc).attr("src", cur);
				$("button#"+cur_idx).attr("disabled", true);	
				$("button#"+next_loc).attr("disabled", false);
				
				next_loc_confirm = next_loc;
			}
		}
		
	 	//주의
		//몫을 구하기 위해서 parseInt(idx/4)와 같은 형태로 해주어야 정상 동작한다.
		//안그러면 몫이되는 정수부분만 구해지지 않는다.	
		
		//클릭한 숫자판의 위치가 사각형 위쪽면에 접하지 않는경우
	 	if (parseInt(idx/4) != 0) 
		{
			var next_loc = cur_idx-4;
			next = $("."+next_loc).attr("src");
			
			if (next.match("16")) 
			{
				$("."+cur_idx).attr("src", next);	
				$("."+next_loc).attr("src", cur);
				$("button#"+cur_idx).attr("disabled", true);	
				$("button#"+next_loc).attr("disabled", false);
				
				next_loc_confirm = next_loc;
			}
		}
	 	
	 	//클릭한 숫자판의 위치가 사각형 아래쪽면에 접하지 않는경우
	 	if (parseInt(idx/4) != 3) 
		{
			var next_loc = cur_idx+4;
			next = $("."+next_loc).attr("src");
			
			if (next.match("16")) 
			{
				$("."+cur_idx).attr("src", next);	
				$("."+next_loc).attr("src", cur);
				$("button#"+cur_idx).attr("disabled", true);	
				$("button#"+next_loc).attr("disabled", false);
				
				next_loc_confirm = next_loc;
				
			}
		}
	 		 	
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
		var time_r = $('#time').html()
		
	 	//퍼즐 완성여부 검사
	 	if(incre == 15)
	 	{
			$.ajax
			({
				type: 'POST',
				url: './Time_record',
				data: 
				{
					id : '<%=id%>',
					gname : 'puzzle',
					time : time,
					mod : 0
				}		
			});	
	 		
	 	 	//setTimeout(function() {함수의 내용}, 시간(밀리초));
	 	 	//특정 시간이 지난후 함수의 내용을 실행한다.
	 	 	
	 	 	//setTimeout을 사용하지 않으면, 마지막 버튼이 옮겨진 후 전체 
	 	 	//퍼즐이 완성된 모습이 보이기전 정답을 알리는 메시지가 뜬다. 		
		 	setTimeout(function() 
		 	{	 		
	 			//alert("정답입니다.");
	 			//alert("기록 : " + time);
				$('#messageType').html('퍼즐을 완성했습니다.');
				$('#messageContent').html("기록 : " + time_r);
				$('#messageCheck').attr('class', 'modal-content panel-success'); 
				//팝업 창을 띄운다.
				$('#messageModal').modal('show');		
	 			end();			
		 	}, 100);
	 	 	
	 	}
	}
	
	//로그인, 로그아웃 후 뒤로가기 또는 앞으로가기 
	//버튼 누를때, 변경된 사항을 표시하려고, pageshow메서드에 
	//reload()를 바인딩 한다.
	$(window).bind("pageshow", function (event) 
	{
		if(event.originalEvent.persisted) 
		{
			//console.log('BFCahe로부터 복원됨');
			document.location.reload();
		}
	});
	
	//페이지에서 떠나기전(창을 닫거나 다른 곳으로 이동) 
	//setInterval 메서드를를 종료시킨다('beforeunload'이용)
	window.addEventListener('beforeunload', (event) => 
	{
		 clearInterval(timer);
	});
	
	window.addEventListener('mousewheel', function (event) { event.preventDefault (); }, {passive: false});
	window.addEventListener('DOMMouseScroll', function (event) { event.preventDefault (); }, {passive: false});

</script>
</head>

<body>
	<!--navbar-fixed-top => 네비게이션바 상단에 고정-->
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" 
					aria-expanded="false">
					<span class="sr-only"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="Home.jsp">미니게임월드</a>
			</div>
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
							기록<span class="caret"></span>
						</a>	
						<ul class="dropdown-menu">		
							<li><a href="ranking.jsp">시간기록</a></li>
							<li><a href="ranking_s.jsp">점수기록</a></li>						
						</ul>	
					</li>				
				
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
							게임<span class="caret"></span>
						</a>
						<ul class="dropdown-menu">
							<li><a href="puzzle.jsp">퍼즐맞추기</a></li>
							<li><a href="maze.jsp">미로찾기</a></li>
							<li><a href="sudoku_easy.jsp">스도쿠</a></li>
							<li><a href="rythmking.jsp">리듬킹</a></li>
						</ul>
					</li>
					<li>
						<a href="javascript:void(0);" onclick="move_to(1)">게시판</a>
					</li>				
				</ul>
	 			<form class="navbar-form navbar-left">
					<div class="form-group">
						<input type="text" class="form-control" placeholder="검색할 내용을 입력하세요"/>
					</div>
					<button type="button" class="btn btn-default">검색</button>
				</form>
				<div class="nav navbar-nav navbar-right">
					<li class="dropdown">
						<a id="status" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">	
						<%if((String)session.getAttribute("id") != "" && (String)session.getAttribute("id") != null)
						{%>
							<%=(String)session.getAttribute("id") + "님"%><span class="caret"></span>				
						<%
						}
						%>	
						<%if((String)session.getAttribute("id") == "" || (String)session.getAttribute("id") == null)
						{%>	
							접속하기<span class="caret"></span>									
						<%
						}
						%>										
						</a>
						<ul class="dropdown-menu">
						<%if((String)session.getAttribute("id") != "" && (String)session.getAttribute("id") != null)
						{%>
							<!--a태그 안에서 href가 동작은 하지만 href="javascript:void(0);"
							으로 사실상 동작을 안 하는 것처럼 보이고 onclick이 실행된다.-->
							<!--<li><a id="status_dependent1" href="loginForm.jsp">로그아웃</a></li>-->
							<li><a id="status_dependent1" href="javascript:void(0);" onclick="log_out()">로그아웃</a></li>									
							<li><a id="status_dependent2" href="personal_info.jsp">개인정보</a></li>						
						<%
						}
						%>		
															
						<%if((String)session.getAttribute("id") == "" || (String)session.getAttribute("id") == null)
						{%>
							<li><a id="status_dependent1" href="loginForm.jsp">로그인</a></li>
							<li><a id="status_dependent2" href="registerForm.jsp">회원가입</a></li>
						<%
						}
						%>	
						</ul>					
					</li>
				</div>
			</div>
		</div>
	</nav>	
	
	<!--margin top bottom 이 auto이면 0으로 잡는다-->
	<table style="border-right:hidden; border-left:hidden; border-top:hidden; border-bottom:hidden; margin-top:100px;  margin-left:auto; margin-right:auto;">
		<tr>
			<td>
				<img src='shared/h_t_p/h_t_p_p.png', width="600" height="600" >			
			</td>
			<td>
				<table style="border:1px solid black">
					<tr>
						<td style="border:1px solid black" height="100" align="center" colspan="4">
							<font size="10" id="time">00:00:00</font>			
						</td>
					</tr>		
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
					<tr>
						<td style="border:1px solid black" height="50" align="center" colspan="4">
							<input id="end" style="width:100%;height:100%; font-size:30px; background-color:#ffa1b9" type="button" onclick="end()" value="Quit" disabled=true></input>	
						</td>			
					</tr>		 
				</table>							
			</td>			
		</tr>			
	</table>
		
	<!-- 정답 메시지 모달 팝업 창 -->
	<div class="modal fade" id="messageModal" role="dialog" aria-hidden="true">
		<div class="vertical-alignment-helper">
			<div class="modal-dialog vertical-align-center">
				<div id="messageCheck" class="modal-content panel-info">
					<div class="modal-header panel-heading">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">&times;</span>
							<span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="messageType">
							
						</h4>
					</div>
					<div class="modal-body" id="messageContent">
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-dismiss="modal">확인</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- class="navbar-fixed-bottom" => 화면 하단에 footer가 고정  -->
	<footer class="navbar-fixed-bottom" style="background-color: #000000; color: #ffffff">
	<!--container-fluid => 화면크게에 맞게 컴포넌트가 배열-->
	<!--container => 화면크게에 무관하게 컴포넌트가 배열-->
		<div class="container-fluid">
			<br/>
			<div class="row">
				<div class="col-sm-2" style="text-align: center;">
					<h5>Copyright &copy;</h5>
					<h5>홍길동(Hong gil dong)</h5>
				</div>
				<div class="col-sm-4">
					<h5>대표자 소개</h5>
					<h5>저는 날로 먹는 코딩의 대표 홍길동 입니다. 부트스트랩을 사용해서 웹디자인을 하고 있습니다.</h5>
				</div>
				<div class="col-sm-2" style="text-align: center;">
					<h5>내비게이션</h5>
					<div class="list-group">
						<a href="index5.jsp" class="list-group-item">소개</a>
						<a href="instructor.jsp" class="list-group-item">강사진</a>
						<a href="lecture.jsp?lectureName=C" class="list-group-item">강의</a>
					</div>
				</div>
				<div class="col-sm-2" style="text-align: center;">
					<h5>SNS</h5>
					<div class="list-group">
						<a href="#" class="list-group-item">페이스북</a>
						<a href="#" class="list-group-item">유튜브</a>
						<a href="#" class="list-group-item">네이버TV</a>
					</div>
				</div>
				<div class="col-sm-2">
					<h5  style="text-align: center;">
						<span class="glyphicon glyphicon-ok"></span>&nbsp;by 홍길동
					</h5>
				</div>
			</div>
		</div>
	</footer>	
</body>
</html>
```

