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

숫자의 위치가 바뀐 후 퍼즐 완성 여부를 확인하고, 완성되었다면,  ajax로 비동기 통신을 한다.


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
...
</script>
...  
```
