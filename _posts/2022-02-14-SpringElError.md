---
layout: post
title: "SpringEl 에러 해결"
---

이것도 결국은 타입에러였다.  
```
    @RequestMapping("/objective")
    public ModelAndView objectivePage(HttpServletRequest request){
        String code = request.getParameter("code");
        System.out.println("Controller : code parameter "+code);

        List<Category> code4Ob = categoryService.selectCategory(code);
        System.out.println("Controller"+code4Ob);
        ModelAndView modelAndView = new ModelAndView("objective");
        modelAndView.addObject("category", code4Ob);
        return modelAndView;
    }
```
문제의 컨트롤러  
저기서 addObject가 안되고 타임리프에 NULL로 보내져서 에러가 났다  

<br>

어차피 DB에서 받아온 파라미터 값과 카테고리 코드가 일치하는 값만 가져오는거라  
List타입은 맞지 않음  
그래서 `Category code4Ob = categoryService.selectCategory(code);` 로 변경하니 문제 해결

<br>
기타 문제 해결을 위해 찾아본 자료  
- form없이 컨트롤러에 데이터 넘기기(자바스크립트에서 form hidden 생성뒤 넘겨줌)  
https://amongthestar.tistory.com/178  
<br>
- 타임리프 @{링크}설정 방법  
https://developer-rooney.tistory.com/181  
<br>
- 스프링부트 파라미터 전달법(스프링과 큰 차이는 없음)  
https://youngjinmo.github.io/2021/01/spring-request-parameter/  
