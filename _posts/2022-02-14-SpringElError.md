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
