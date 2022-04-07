---
layout: post
title: "[object Object] error"
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

하지만 코드 복붙해서 구현하려는데 ajax에서 데이터를 제대로 넘기지 못하고 있따..

<br> <br> <br>
와일드카드`*`는 mysql에서 조회할 때만 쓰기  
왜냐면 와일드카드로 데이터를 조회하면 다른 사람들은  
내가 어떤 컬럼들을 조회하는지 정확히 알지 못할 수 있기 때문이다
