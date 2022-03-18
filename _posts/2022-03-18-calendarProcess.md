---
layout: post
title : "캘린더 전체프로세스"
---

# 흐름
1. 사용자가 캘린더 페이지 접속  
2. JS에서 자동으로 오늘 날짜 보여주고 ajax로 오늘 날짜 컨트롤러에 전달
3. DB에서 to_do, ini에서 오늘 날짜 조회 뒤 맞는 데이터 select
4. 브라우저에 데이터가 보일 수 있게 thymeleaf 출력   

<br>

# 1. 캘린더 페이지
지금까지는 큰 문제 없음

<br>

# 2. ajax 전달
![image](https://user-images.githubusercontent.com/86642180/158941780-805d7dcc-7473-4ce3-989b-24d382151228.png)
계속 undefined가 나와서 ajax 전달이 안되는 중이다  
이유를 찾아보니ㅎ..  
`var selectedDate = document.getElementById("selected-date").innerText;`  
"selected-date"라는 p태그에서 값을 가져오는건데  
처음에 `.value`를 작성해서 값을 가져오지 못한 것이었다.  

<br>

innerText로 고치니  
![image](https://user-images.githubusercontent.com/86642180/158942018-4ee25774-ef28-406a-a0cb-82aefa7177f7.png)
값을 가져오는 것은 잘 되나 ajax 통신이 여전히 안된다  

<br>

이것도 어노테이션 문제였던 것으로 보인다  
```
 @Transactional
 @RequestMapping(value="/readCalendar", produces="text/html;charset=UTF-8")
 @ResponseBody
 @PostMapping
```
기존에 컨트롤러 안에 있던 메소드에 어노테이션을 이렇게 작성했던 것을  
밑처럼 수정하니 js에서 컨트롤러까지 통신 O

<br>

```
@Transactional
@RequestMapping(value="/readCalendar", produces="text/html;charset=UTF-8", method = RequestMethod.POST)
@ResponseBody
```
`@PostMapping`이나 `@ReqeustMapping(method = RequestMethod.POST`는 같은 것인데  
왜 위처럼 작성한 것은 안되는지 정확하게 모르겠다  
Mapping 관련 어노테이션이 두 개여서 그런가..?  

<br>

```
@Transactional
    @RequestMapping(value="/readCalendar", produces="text/html;charset=UTF-8", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView readCalendar(@RequestParam Map<String, String> param) throws ParseException {

        String selectedDate = param.get("selectedDate");
        System.out.println(selectedDate);

        ModelAndView modelAndView = new ModelAndView("calendar");
        return modelAndView;
    }
```
<br>

# 3 DB에서 데이터 select하기
어쩐지 또 잘되나 했으나 값이 null로만 나온다  
```
@Transactional
    @RequestMapping(value="/readCalendar", produces="text/html;charset=UTF-8", method = RequestMethod.POST)
    @ResponseBody
    public ModelAndView readCalendar(@RequestParam Map<String, String> param) throws ParseException {

        String selectedDate = param.get("selectedDate");
        System.out.println(selectedDate);
        List<Calendar> result = calendarService.getTodoList(selectedDate);

        System.out.println(result);

        ModelAndView modelAndView = new ModelAndView("calendar");
        return modelAndView;
    }
```
Map으로 리턴 타입 바꾸니까 안되서 다시 List<CalendarDTO>로 리턴으로 되돌리니까 잘 된다  
이런 경우는 처음본다  
  
![image](https://user-images.githubusercontent.com/86642180/158947763-05ceb15b-f343-43bc-9d71-54f7cd187b81.png)
  
<br>

# 4. 
