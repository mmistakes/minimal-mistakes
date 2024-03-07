---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록10"
categories: Project
tag: [web, server, DB, spring boot, spring mvc, java, JPA]
toc: true
toc_sticky: true
author_profile: false
sidebar:
    nav: "docs"
---

<br>

# 현재까지 진행 상황

- 회원가입 기능 완료
    - BaseTimeEntity 생성 완료
    - User Entity 생성 완료
    - UserRepositoryImpl, UserService를 통해서 DB에 저장되는지 Test Code로 확인.
    - 중복 회원 검증
    - 회원가입 관련 html thymeleaf 적용해서 동적인 코드로 변경
    - 회원가입시 사용할 error code 생성
    - 회원가입시 검증기를 통한 text 출력
    - Controller 생성 후 연결해서 화면에서 확인
- 로그인 기능 완료
    - 로그인시 사용할 Dto 생성
    - 로그인 Service 생성
    - 로그인 Controller에서 로그인 처리
    - 로그인 관련 HTML 동적인 코드로 변경(+오류 코드)
- 게시판 Entity, DTO, Repository 개발    
    - 게시판 관련 Entity 생성
    - 필요한 정보만 받아올 DTO 생성
    - Error Code 작성
    - 게시판 관련 Repository 개발
    - 게시판 Repository Test Code 작성
- 게시판 Controller, Service 개발
    - 게시판 비즈니스 로직 구현
    - 비즈니스 로직 테스트 코드 작성
    - 컨트롤러 제작
    - 게시판 html을 thymeleaf를 통해 동적인 코드로 수정
    - 실제 실행 테스트
- 로그인된 사용자만 특정 사이트에 들어갈 수 있도록 인터셉터 제작
- 오류 페이지 적용
- 로그인 후 모든 페이지에서 사용자가 로그인된 상태인 것을 인지할 수 있도록 로직 수정
- 게시판 검색기능 기능 추가
    - Repository, Service, Controller 코드 수정
    - 테스트 코드 작성
    - 검색기능 tymeleaf 추가
- 메인 서비스 개발
    - 임시 메인 서비스 화면 제작
    - `NaverMovieApiService` 개발(네이버 API를 활용한 값 읽어오기)
<br>

# 이번에 해야할 목록

- AutoComplete 기능 개발
    - MainService 로직 개발
    - 서비스 페이지에 ajax 코드 추가
    - AutoComplete 관련 Controller 코드 작성

## 구상

영화의 제목을 통해서 검색하기 때문에 제목이 겹치면 모두 검색되어 정확한 정보를 찾을 수가 없다.<br>(ex. 공조를 검색하면 공조1 ~ 2, 또 다른 영화해서 3개의 결과값이 나온다.)
<br>
그렇기 때문에 정확한 영화의 제목을 입력할 수 있도록 유도하고, 그 과정을 통해서 정확한 결과를 도출할 수 있도록 검색 시 autoComplete 기능을 사용할 수 있도록 구현하기로 했다.

## MainService.java - autoSearchService()

```java
...

private final NaverMovieApiService naverMovieApiService;

    public JSONArray autoSearchService(String searchItem) {
        // 가져오고 싶은 정보
        String[] fields = {"title", "image", "link"};

        List<Map<String, Object>> items = getApiResult(searchItem, fields);

        JSONArray jsonArray = new JSONArray();
        JSONObject jsonObject = null;
        // 메인화면에서 검색시 autocomplete에서 사용할 값 가공
        for (Map<String, Object> item : items) {
            jsonObject = new JSONObject();

            /*
             * 제목 값만 가져온 뒤 필요하지 않은 문자 제거
             * 제목과 일치한 부분은 강조(<b>, </b>)표시가 같이 출력되기 때문에 제거
             * */
            String title = replace_Title(item);

            // 수정된 제목과 이미지를 받아와서 jsonObject에 넣은 뒤 jsonArray에 추가
            jsonObject.put("title", title);
            jsonObject.put("img", item.get("image"));
            jsonObject.put("link", item.get("link"));

            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    /*
    * 사용자가 입력한 검색어에 대한 영화를 검색하고, 필요한 정보만 매핑해서 리턴해주는 로직
    * searchItem : 사용자가 입력한 검색어
    * fields : 필요한 정보를 매핑할 때 사용할 key값
    * */
    private List<Map<String, Object>> getApiResult(String searchItem, String[] fields) {

        String url = null;
        List<Map<String, Object>> items = null;
        try {
            url = URLEncoder.encode(searchItem, "UTF-8");
            String result = naverMovieApiService.search(url);
            // 가져오고 싶은 정보 매핑
            Map<String, Object> mappingResult = naverMovieApiService.getResultMapping(result, fields);

            items = (List<Map<String, Object>>) mappingResult.get("result");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return items;
    }

        // 검색해온 제목에서 불필요한 문자 제거 후 반환
    private String replace_Title(Map<String, Object> item) {
        String title = String.valueOf(item.get("title"));
        title = title.replaceAll("<b>", "");
        title = title.replaceAll("</b>", "");
        return title;
    }
```
- autoSearch 기능을 사용하려면 우선 사용자의 검색어에 대한 영화 정보를 리스트로 보여줘야 하기 때문에 네이버 영화 API를 사용해서 검색, 필요한 정보 매핑을 먼저 했다.
    - URL 인코딩과, 정보 매핑 등은 모두 `getApiResult()`에서 수행할 수 있도록 따로 분리했다.
- 매핑된 결과를 꺼내서 확인해보면 제목으로 검색해서 제목에 강조 태그가 붙어서 출력되는데, 이를 제거 하기 위한 메소드(`replace_Title()`)도 만들어주었다.
    - Ex.\<b\>공조\</b\>
    - replace를 사용하여 강조 태그를 모두 지우고 리턴해주었다.
- 모든 결과를 JsonArray로 만들어서 로직을 호출한 Controller에 넘겨주었다.

## mainPage.html - Ajax 적용

Ajax(Asynchronous JavaScript and XML)는 빠르게 동작하는 동적인 웹 페이지를 만들기 위한 개발 기법중 하나이다.<br>
Ajax는 웹 페이지 전체를 다시 로딩하지 않고도 웹 페이지의 일부분만을 갱신할 수 있다. 즉 Ajax를 이용하면 백그라운드 영역에서 서버와 통신하여 그 결과를 웹 페이지의 일부분에 표시할 수 있는데, 이런 특징을 이용하여 autoSearch 기능을 만드는 것이다.

> [Ajax 개념 참고 사이트](http://www.tcpschool.com/ajax/ajax_intro_basic)

```html
<!doctype html>
<html xmlns:th="http://www.thymeleaf.org">
<html lang="ko">
    <head>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="/css/main_style.css">
        <link rel="stylesheet" type="text/css" href="/css/common.css">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    </head>

    <body>
        ...(중략)
            <div class="search_area">
                <form th:action="@{/mainService}" name="post_form" method="get">
                    <ul>
                        <li>
                            <input type="text" id="autocompleteText" name="searchItem1" placeholder="검색어를 입력하세요."
                                   aria-label="Search">
                            <!--hidden을 통해서 선택된 item의 link값을 넘겨줌-->
                            <input type="hidden" name="itemLink1" value="">
                        </li>
                        <li>
                            <input type="text" id="autocompleteText2" name="searchItem2" placeholder="검색어를 입력하세요."
                                   aria-label="Search">
                            <input type="hidden" name="itemLink2" value="">
                        </li>
                        <li>
                            <input type="submit" id="search_btn" value="검색">
                        </li>
                    </ul>
                </form>
            </div>

            <!--메인 화면의 첫번째 검색 창-->
            <script>
                $(document).ready(function() {
                    $( "#autocompleteText" ).autocomplete({
                        source : function( request, response ) {
                            $.ajax({
                                type : 'get',
                                url: "autoSearch",
                                dataType: "json",
                                data: {
                                  searchValue: request.term // 사용자가 입력하는 값
                                },
                                success: function( data ) {
                                    response(
                                        $.map( data, function( item ) {
                                            return {
                                                label: item.title, // 목록에 표시되는 값
                                                value: item.title, // 선택 시 input창에 표시되는 값
                                                avatar: item.img,
                                                url_link: item.link
                                            }
                                        })
                                    );
                                }
                            });
                        },
                        select : function(event, ui) { // 이벤트 선택시 위에서 선언한 hidden에 link값을 value에 넣어준다.
                            document.post_form.itemLink1.value = ui.item.url_link;
                        },
                        focus : function(event, ui) { // 포커스 시 이벤트
                            return false; // 방향키로 바로 선택 방지(enter시 선택)
                        },
                        minLength: 1,
                        delay : 1000, // 입력창에 글자가 써지고나서 autocomplete 이벤트 발생될 때 까지 지연 시간(ms)
                        close : function(event) { // 자동완성 창 닫아질 때의 이벤트
                            console.log(event);
                        }
                    }).autocomplete('instance')._renderItem = function(ul, item) { // UI 변경 부
                        return $('<li>') //기본 tag가 li
                        .append('<div>' +
                                    '<img id="autocomplete-image" src="' + item.avatar + '"/>' +
                                     '<span id="autocomplete-title">' + item.label + '</span>' + '</div>') // 원하는 모양의 HTML 만들면 됨
                        .appendTo(ul);
                    };
                });
            </script>

            <!--메인 화면의 두번째 검색 창-->
            <script>
                $(document).ready(function() {
                    $( "#autocompleteText2" ).autocomplete({
                        source : function( request, response ) {
                            $.ajax({
                                type : 'get',
                                url: "autoSearch",
                                dataType: "json",
                                data: {
                                  searchValue: request.term // 사용자가 입력하는 값
                                },
                                success: function( data ) {
                                    response(
                                        $.map( data, function( item ) {
                                            return {
                                                label: item.title, // 목록에 표시되는 값
                                                value: item.title, // 선택 시 input창에 표시되는 값
                                                avatar: item.img,
                                                url_link: item.link
                                            }
                                        })
                                    );
                                }
                            });
                        },
                        select : function(event, ui) { // 이벤트 선택시 위에서 선언한 hidden에 link값을 value에 넣어준다.
                            document.post_form.itemLink2.value = ui.item.url_link;
                        },
                        focus : function(event, ui) { // 포커스 시 이벤트
                            return false; // 방향키로 바로 선택 방지(enter시 선택)
                        },
                        minLength: 1,
                        delay : 1000, // 입력창에 글자가 써지고나서 autocomplete 이벤트 발생될 때 까지 지연 시간(ms)
                        close : function(event) { // 자동완성 창 닫아질 때의 이벤트
                            console.log(event);
                        }
                    }).autocomplete('instance')._renderItem = function(ul, item) { // UI 변경 부
                        return $('<li>') //기본 tag가 li
                        .append('<div>' +
                                    '<img id="autocomplete-image" src="' + item.avatar + '"/>' +
                                     '<span id="autocomplete-title">' + item.label + '</span>' + '</div>') // 원하는 모양의 HTML 만들면 됨
                        .appendTo(ul);
                    };
                });
            </script>
        </div>    
    </body>
</html>
```

### <head>

기존에 적용하던 css외에 jQuery를 사용하기 위한 코드들을 추가해 주었다.
<br>
jQuery는 자바스크립트 언어를 간편하게 사용할 수 있도록 단순화시킨 오픈 소스 기반의 자바스크립트 라이브러리이다.<br>
Ajax 응용 프로그램 및 플러그인도 jQuery를 활용하여 빠르게 개발할 수 있다.

### div.search_area

메인 페이지에 검색할 수 있는 text box 2개, 검색 버튼 하나를 배치했다. 둘 다 입력해서 검색하게 되면 두개의 결과가 동시에 나오면서 비교를 할 수 있도록 하고, 하나만 입력하게 되면 영화의 정보만 뿌려줄 것이다.
<br>
각각의 text box에는 name(searchItem1, searchItem2)을 지정해주고, hidden을 통해서 영화의 link값도 넣어 파라미터를 통해 같이 보낼 예정이다.<br>
(영화의 제목이 동일할 수도 있기 때문에, 고유값인 링크값을 넘김으로써 구별할 수 있도록 해줄것이다.)
<br>
text box의 id값은 밑의 ajax코드에서 사용된다.

### \<script\> - Ajax

text box에 부여해준 id값을 통해서 autoComplete 기능을 부여할 text box를 지정해준다.<br>
Ajax관련 코드는 JS를 잘 모르기 때문에 여러 예제에서 가져와서 써보고, 부분부분 시행착오를 겪으면서 코드를 여러번 수정해 보았다.<br>
아직도 코드의 100%는 이해가 되지 않았지만, 중간중간 주석을 써 넣으면서 이 코드에 대해 조금씩 이해하다 보니 어디를 건드려야 원하는 동작이 나올지 짐작할 수 있었고, 그 부분을 조금씩 수정해나가니 원하는 결과를 도출할 수 있었다.

#### $.ajax(..)

- `url : autoSearch` - autoSearch가 동작하게 되면 지정해준 url로 http 통신을 한다.
    - controller를 통해서 동작
- `searchValue: request.term` - searchValue는 통신할 때 파라미터 이름이며, request.term은 사용자가 입력한 값을 즉각적으로 반응해서 값을 읽어온다. 따라서, 즉각적으로 값을 읽어오면서 이 값을 searchValue라는 파라미터 이름을 통해서 controller에 넘겨주는 것이다.
- `$.map()`의 return 값을 보면 `MainService`에서 영화 검색 후 제목, 이미지, 링크를 매핑했는데, 그 결과가 여기로 들어오게 되는 것이다.

나머지 코드는 주석을 잘 달아놔서 나중에 봐도 이해하는데 문제는 없을 것 같다.<br>
비즈니스 로직보다 이걸 구현하는데 시간이 더 오래 걸렸다..<br>
값을 입력할 수 있는 칸이 2개이다 보니 하나의 코드로 어떻게 할 수 없을까 하다가, 결국 방법을 찾지 못하고, 코드 2개를 써버렸다.

## MainServiceController - searchItem()

autoComplete 동작을 위한 컨트롤러 코드
```java
...

private final MainService mainService;

    /*
    * 검색어 입력에 따라 사용자가 원하는 정보를 가져오는 로직
    * MainService에서 NaverMovieApiService의 search 메소드를 통해서 정보를 검색한다.
    * */
    @GetMapping(value = "/autoSearch", produces = "application/json; charset=UTF-8")
    @ResponseBody
    public void searchItem(HttpServletRequest request, HttpServletResponse response) {

        String searchItem = request.getParameter("searchValue");

        try{
            JSONArray jsonArray = mainService.autoSearchService(searchItem);

            response.setCharacterEncoding("UTF-8");
            PrintWriter pw = response.getWriter();
            pw.print(jsonArray);
            pw.flush();
            pw.close();

        } catch (IOException e) {
            // encoding error
            e.printStackTrace();
        }
    }
```
- `searchValue`파라미터로 넘어온 값을 `searchItem`에 저장(영화의 제목)
- MainService의 `autoSearchService()`메소드에 매개변수로 영화 제목을 넘겨주면 매핑한 결과를 JsonArray 형식으로 받게 된다.(제목, 이미지, 링크)
- 반환받은 JsonArray 형식의 값을 `PrintWriter`를 통해서 출력하게 되면 html의 Ajax부분에서 설정해둔 html 모양대로 리스트가 출력되면서 동작이 마무리 된다.

## 실행 화면

![autoSearch](/images/Project_Report/autoSearch.png)

## 정리

autoSearch를 통해서 보다 더 정확한 영화 제목을 입력할 수 있게 되었고, 제목이 동일한 영화가 있더라도, 고유 값인 영화 링크값을 같이 넘겨주면서 이런 문제도 해결할 수 있도록 해주었다.<br>
네이버 API 예제부터 따로 작성하고, Ajax 예제, API와 Ajax를 합친 예제 등 프로젝트에 적용할 수 있을만큼 예제를 작성하고, 그 뿐만 아니라 코드를 이해하기가 쉽지않아서 이 부분은 시간을 많이 들인 것 같다.<br>
다음에는 영화의 기본 정보를 메인 서비스 화면에 출력해주고, 크롤링을 통해서 영화 리뷰를 보여주는 작업을 할 것 같다.