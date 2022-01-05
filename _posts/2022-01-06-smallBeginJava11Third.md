---
layout: post
title: "small begin java 11 설정"
---

# 13. 작동 테스트(컨트롤러 작성 전)
컨트롤러 작동 전 예전에 Thymeleaf 잘 작동 안했던 것이 기억났다.  
그래서 일단 return 할때 html 파일이 아니라  
데이터를 list 타입으로 리턴할때  
뷰에서 잘 나오는지 확인했다. (좀 늦은 감이 있지만)  
![image](https://user-images.githubusercontent.com/86642180/148247766-31718f02-1bab-485d-9173-0843cbca1efa.png)
결과는 스프링 부트 실행도 안됨  

<br>

jdbc url 문제라고 하니 application.properties 문제가 확실했다.  
프로젝트 설정 기록을 읽어보니 내가 잘 못 이해한 것이 있었다.  
인텔리제이에서 Database 연결을 쉽게 할 수 있어서 좋다고 생각했다.  
그리고 IDE에서 연결이 되면 당연히 스프링부트와도 연결이 되는 줄 알았는데  
우측에 Database 연결이 됐다고 스프링부트에서 별 다른 설정 없이  
DB에 접근하고 다양한 처리를 하는 것이 아니었다.  

<br>

그러므로 빼먹은 코드를 application.properties에 추가한다.  
```
spring.datasource.url=jdbc:mysql://엔드포인트/DB명
spring.datasource.username=
spring.datasource.password=s비밀번호
```
코드 추가 뒤 잘 작동한다.  
![image](https://user-images.githubusercontent.com/86642180/148249066-5f3b9538-febe-44ce-bb07-b0cc9b82c3bd.png)

<br>

# 14. Controller
```
package com.project.smallbeginjava11.controller;

import com.project.smallbeginjava11.DTO.Category;
import com.project.smallbeginjava11.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/getAllCategory")
    public String getAllCategory(Model model){
        List<Category> category = categoryService.getAllCategory();
        model.addAttribute("category", category);
        return "categoryTest";
    }

    @GetMapping("/hello")
    public String test(){
        return "test";
    }
}
```

문제는 내가 Thymeleaf 의존성을 추가했다는 것이다.  
실행 결과  
![image](https://user-images.githubusercontent.com/86642180/148254328-eb27f71e-6545-48ac-bb93-80b9585e8eaf.png)
![image](https://user-images.githubusercontent.com/86642180/148254679-d5e89b69-d66a-41f5-9d52-2c4c76870e31.png)  

`getAllCategory`를 주소창에 입력했을 때 나오는 오류  
`ERROR 3412 --- [nio-9090-exec-3] o.a.c.c.C.[.[.[/].[dispatcherServlet]    : Servlet.service() for servlet [dispatcherServlet] in context with path [] threw exception [Request processing failed; nested exception is org.apache.ibatis.binding.BindingException: Invalid bound statement (not found): com.project.smallbeginjava11.mapper.CategoryMapper.getAllCategory] with root cause`  
= categoryMapper.java에서 getAllCategory를 못찾고 뭐 사용 못하겠는데  


<br>

# 15. Thymeleaf 사용



<br>
<br>
참고자료  
⭐ https://limjunho.github.io/2021/08/12/JAVA-Bean.html  
⭐ https://velog.io/@lsj8367/Spring-Mybatis  
https://dev-overload.tistory.com/26?category=898124  
https://otrodevym.tistory.com/entry/spring-boot-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-31-Mybatis-%EC%84%A4%EC%A0%95-%EB%B0%8F-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95  
