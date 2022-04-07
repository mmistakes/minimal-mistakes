---
layout: post
title: "[object Object] error 해결"
---

# 문제 분석
서버로 보낼 데이터 data와 서버에서 받을 데이터가 같게 나옴  
왜????  
👉 이건 뭐 내가 코드를 제대로 이해를 못했다..  
```
 $.ajax({
        url : '/readCalendar',
        type : "post",
        contentType: 'application/json',
        dataType : "json",
        data : {selectedDate : selectedDate},
        success : function(result){
            console.log(JSON.stringify(this.data));
        }
```
`this.data`면 서버로 보낸 데이터를 말하는거니까 당연히 그런 결과가 나오지  

<br>

그리고 /readCalednar로 매핑된 컨트롤러는  
```
    public RedirectView readCalendar(@RequestParam Map<String, String> param, RedirectAttributes re) throws ParseException {

        //String selectedDate = param.get("selectedDate");
        System.out.println("param - readCalendar");
        System.out.println(param);
        
        // 이제 됨
        re.addAttribute("param", param.get("selectedDate"));
        System.out.println("addAttribute");
        System.out.println(re);
        return new RedirectView("/calendar");
    }
```
ajax에게 바로 데이터 날리는게 아니라 다른 컨트롤러로 리다이렉트 뒤  
리다이렉트 된 컨트롤러에서 object를 html로 바로 전달하는 것
결국 ajax에게 직접적으로 컨트롤러에서 전달되는게 없어서 계속 Object object 에러가 뜨는 것이 아닐까?  

<br>
결국 타임리프를 활용하지 않고 ajax - controller - ajax로 데이터 출력을 구현 시작  

![image](https://user-images.githubusercontent.com/86642180/161923954-099f1350-8381-45b9-8b45-3a8975569335.png)

<br>

하지만 코드 복붙해서 구현하려는데 ajax에서 데이터를 제대로 넘기지 못하고 있다  

# 해결
컨트롤러
```
    @Transactional
    @RequestMapping(value="/readCalendar")
    @ResponseBody
    public List<Todo> readCalendar(@RequestParam Map<String, String> param) {

        System.out.println("Got the param");
        System.out.println(param);
        String selectedDate = param.get("selectedDate");
        System.out.println("selectedDate : "+ selectedDate);

        List<Todo> todo = calendarService.getTodoList(selectedDate);
        System.out.println("todo : "+ todo);
        return todo;
    }
```

<br>
ajax
```
function reshowingList(selectedDate){
    $.ajax({
        url : '/readCalendar',
        type : "post",
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : "json",
        data : {selectedDate : selectedDate},
        success : function(resp){
            console.log(this.data);
            console.log(resp);
        },
        error : function(err, resp){
            console.log(err+"에러발생");
            console.log(resp);
        }
    });
}
```
<br>

결과
![image](https://user-images.githubusercontent.com/86642180/162214158-69c85a85-9714-4e65-a7f4-49e3f5f0d1f0.png)

<br>

이유가 가관이다  
가다듬은 프로세스 (ajax - controller - ajax 타임리프 안거치고)  
잘 맞게 했는데 이전 코드를 그대로 사용한다면서 복붙을 했다  
그때 컨트롤러에서 `String selectedDate = param.get("param");`으로 했으니  
자바에서 selectedDate 변수에 null이 계속 들어갔다ㅋㅋㅋㅋㅋ  
ajax에서 보낼 때 `{selectedDate : selectedDate}`로 보냈는데 key 값이 안맞으니까 그렇지..  
그리고 컨트롤러 어노테이션 부분도 문제였다 이건 정확히 이유를 설명하지는 못하겠다  
`@RequestMapping(value="/readCalendar", produces="text/html;charset=UTF-8", method = RequestMethod.POST)`  
에서 produces와 method를 삭제하니 정상적으로 ajax 데이터를 잘 받았다  
method 부분은 ajax와 post를 중복으로 써서인건가?  
produces는 ajax에서 요청하는 데이터 타입이 json인데 text로 되서??  
잘 모르겠다.. 더 공부해야지  

<br> <br> <br>

# 기타사항
와일드카드`*`는 mysql에서 조회할 때만 쓰기  
왜냐면 와일드카드로 데이터를 조회하면 다른 사람들은  
내가 어떤 컬럼들을 조회하는지 정확히 알지 못할 수 있기 때문이다
