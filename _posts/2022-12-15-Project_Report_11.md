---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록11"
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
    - AutoComplete 기능 개발
        - MainService 로직 개발
        - 서비스 페이지에 ajax 코드 추가
        - AutoComplete 관련 Controller 코드 작성
<br>

# 이번에 해야할 목록

- 검색어의 개수에 따른 동작 구현
    - MainService.java에 영화를 검색하는 로직 작성
    - MainServiceController 관련 코드 작성
    - searvicePage.html, compareServicePage.html thymeleaf 코드 작성
    - 에러 페이지 제작

## 구상

이제 실제로 검색어를 입력하면 메인 서비스 화면으로 이동해서 정보를 제공해주면 된다. 먼저 검색어가 하나인지 둘인지 확인 하고, 그에 따른 동작을 구현해주면 될거 같다.
<br>
우선 검색어에 따른 영화 정보를 매핑하는 로직을 먼저 작성하고, 컨트롤러에서는 검색어 개수 구분 후 동작하는 코드를 작성할 예정이다.

## MainService - movieSearchService()

```java
...(생략)

    /*
    * 사용자가 입력한 검색어에 대한 영화를 검색하는 로직
    * searchItem : 사용자가 입력한 영화 제목
    * itemLink : 검색한 영화에 대한 네이버 영화 link(autoSearch 여부에 따라 없을 수도 있음)
    * model : 검색 후 필요한 정보는 model을 통해 servicePage에 넘겨줌
    * */
    public Map<String, Object> movieSearchService(String searchItem, String itemLink) {
        String[] fields = {"title", "link", "image", "pubDate", "director", "actor", "userRating"};

        List<Map<String, Object>> movies = getApiResult(searchItem, fields);

        /*
         * 검색어에 대한 정보를 가져온 뒤 필요한 값만 넘겨주는 작업
         * 검색시 autoSearch를 통해 정확한 검색어를 입력하지 않아도, 검색어가 하나밖에 없을 경우에는 동일하게 동작한다.
         * 검색어를 찾을 수 없거나 검색어가 많을 경우 오류 페이지 송출
         * */
        for(Map<String, Object> movie : movies) {
            if (movies.size() == 1) { // 검색 결과가 하나만 나온 경우
                itemLink = String.valueOf(movie.get("link")); // 리뷰 정보를 가져오기 위해 필요한 링크 받기
                String title = replace_Title(movie); // 제목 정보를 가져올 때 <b></b>가 붙어있기 때문에 제거해주는 작업

                movie.put("title", title);

                return movie;
            } else if (!itemLink.equals("")) { // 검색 결과가 여러개가 나오지만, 링크를 가지고 있는 경우(autoSearch 사용)
                if (String.valueOf(movie.get("link")).equals(itemLink)) { // item을 통해서 가져오는 link 정보와 autoSearch를 통해 넘겨받은 link 정보를 매치
                    String title = replace_Title(movie); // 제목 정보를 가져올 때 <b></b>가 붙어있기 때문에 제거해주는 작업

                    movie.put("title", title);
                    return movie;
                }
            }

            /*
            * 에러페이지 송출을 위한 로직
            * MainServiceController에서 link값을 확인하기 때문에 에러 페이지 정보를 링크에 넣어서 리턴
            * */
            movie.put("link", "tooManyResultsError"); // 검색된 결과가 너무 많다면 link에 메시지를 적어서 controller에 전달

            return movie;
        }
        
        // 모든 조건문에 걸리지 않았다면 결국 아무값도 찾지 못했다는 것이므로 map을 하나 따로 만들어서 위와 같이 link에 메시지를 넣고 리턴
        Map<String, Object> errorMap = new HashMap<>();
        errorMap.put("link", "notFoundError");
        return errorMap;
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
...
```
- 컨트롤러에서 검색어(searchItem)와 영화 링크(itemLink)가 넘어오면 검색어와 준비해둔 fields[]를 통해 영화 정보를 가져온다.
- 영화 리스트를 하나씩 확인하면서 결과가 하나라면 더 진행할 필요가 없기 때문에 제목에 붙은 강조 태그를 제거하고, map형태로 리턴해준다.
- 결과가 여러개가 나오더라도, 검색 시 autoComplete를 사용했다면 영화 링크(itemLink)가 같이 넘어오기 때문에 이를 활용하여 리스트 중에 같은 링크가 있는지 확인이 되면 그 영화 정보를 map형태로 리턴해준다.
- 위 2개의 조건문에 걸리지 않았다면 검색 결과는 많지만, 영화 링크도 가지고 있지 않아 영화를 찾을 수 없는 것이기 때문에 link(key)에 error message를 담아서 반환해준다.
    - 컨트롤러에서는 map에 들어있는 link를 확인해서 사용하기 때문에 link에 에러 메시지를 넣는 것이다.
- for문에 들어가지 못한 것은 애초에 검색된 결과가 없다는 것이기 때문에 map을 하나 새로 만들어주고, 위와 동일하게 link라는 key값에 error message를 담아서 반환해준다.

## MainServiceController - mainService()

```java
...
    /*
    * 메인화면에서 넘겨준 영화의 제목이 하나인지 둘인지 먼저 확인
    * 확인되면 개수에 따라 필요한 화면 출력
    * */
    @GetMapping("/mainService")
    public String mainService(String searchItem1, String searchItem2, String itemLink1, String itemLink2, Model model) {

        String error; // MainService에서 넘겨준 에러 링크 확인용

        if(searchItem1.equals("") && searchItem2.equals("")) {
            return "error/notFoundError";
        } else if (!searchItem1.equals("") && !searchItem2.equals("")) {
            // 두개의 검색어로 검색했을 시 동작
            Map<String, Object> movieInfo1 = mainService.movieSearchService(searchItem1, itemLink1);
            Map<String, Object> movieInfo2 = mainService.movieSearchService(searchItem2, itemLink2);

            itemLink1 = String.valueOf(movieInfo1.get("link"));
            error = check_serviceError(itemLink1); // 검색된 결과에서 정상적인 link값이 들어있지 않고, MainService에서 넘겨준 에러 메시지가 담겨 있다면 error 페이지로 리턴
            if (error != null) return error;

            itemLink2 = String.valueOf(movieInfo2.get("link"));
            error = check_serviceError(itemLink2); // 검색된 결과에서 정상적인 link값이 들어있지 않고, MainService에서 넘겨준 에러 메시지가 담겨 있다면 error 페이지로 리턴
            if (error != null) return error;

            model.addAttribute("movieInfo1", movieInfo1);
            model.addAttribute("movieInfo2", movieInfo2);

            return "service/compareServicePage";
        }

        /*
        * 위 if문을 지나서 그밖에 조건
        * 하나의 검색어만 입력할 시 동작
        * searchItem1, searchItem2 중 어디로 들어올지 모르기 때문에 하나로 합쳐줌
        * itemLink1, itemLink2도 마찬가지..
        * 여기서 searchItem은 무조건 값이 들어가지만, itemLink는 autoSearch 사용 여부에 따라 값이 들어가지 않을 수도 있다.
        * */
        String searchItem, itemLink;
        if(!searchItem1.equals("")) {
            searchItem = searchItem1;
            itemLink = itemLink1;
        } else {
            searchItem = searchItem2;
            itemLink = itemLink2;
        }

        Map<String, Object> movieInfo = mainService.movieSearchService(searchItem, itemLink);// 영화 정보 검색
        itemLink = String.valueOf(movieInfo.get("link"));
        error = check_serviceError(itemLink); // 검색된 결과에서 정상적인 link값이 들어있지 않고, MainService에서 넘겨준 에러 메시지가 담겨 있다면 error 페이지로 리턴
        if (error != null) return error;

        model.addAttribute("movie", movieInfo);

        return "service/servicePage";
    }

    /*
    * MainService에서 넘겨준 에러를 확인하는 로직
    * 검색결과에 따라 에러가 발생해야 한다면 link값에는 정상적인 값이 아닌 MainService에서 넘겨준 에러 메시지가 담겨져 있다.
    * */
    private String check_serviceError(String itemLink) {
        if(itemLink.equals("notFoundError"))
            return "error/notFoundError";
        else if(itemLink.equals("tooManyResultsError"))
            return "error/tooManyResultsError";
        return null;
    }
...
```
- mainPage.html에서 넘겨주는 영화의 제목과, 링크를 모두 파라미터로 받고 시작한다.
- 조건문은 하나도 입력하지 않았을 때와 둘다 입력했을 때로 두어 나머지는 자동적으로 하나만 입력했을 때를 의미하게 된다.
- 하나도 입력하지 않았다면 오류 페이지를 반환하고 끝.

### 두 개의 검색어를 입력했을 경우

- 둘 다 입력했을 때는 우선 넘어온 map의 링크값을 열어보고, `check_serviceError()`메소드를 통해서 link값이 에러메시지인지 아닌지 판단한다.
    - 에러 메시지가 들어있다면 곧바로 오류 페이지를 반환하고 동작을 끝낸다.
- 모든 조건문에 걸리지 않았다면, 매핑되어온 영화 정보를 model에 넣고, `compareServicePage.html`을 호출한다.

### 하나의 검색어만 입력했을 경우

- 하나만 입력했을 경우 searchItem1, searchItem2중 어느곳에 검색어를 입력할지 모르기 때문에, searchItem, itemLink 변수를 만들어서 하나로 통합해주었다.
- 그후에는 두 개의 검색어를 입력했을 때와 동일하게 영화 정보를 검색 후 매핑된 정보를 받고, link를 확인하여 에러 페이지 송출 여부를 판단 후 문제가 없다면 model에 정보를 넣고 `servicePage.html`을 호출한다.

## servicePage.html 코드 수정

```html
    ...(생략)

    <div class="title"><h1 th:text="${movie.title}">검색어 제목</h1></div>
    <div class = "info_area">
        <img id="service_picture" th:src="${movie.image}">
        <div class = result_info>
            <div class = "info_since">
                <span>개봉 연도: </span>
                <b><span th:text="${movie.pubDate}"></span></b>
            </div>
            <div class = "info_director">
                <span>감독: </span>
                <b><span th:text="${movie.director}"></span></b>
            </div>
            <div class = "info_actor">
                <span>출연진: </span>
                <b><span th:text="${movie.actor}"></span></b>
            </div>
            <div class = "info_review">
                <span>평점: </span>
                <b><span th:text="${movie.userRating}"></span></b>
            </div>
        </div>
    </div>

    ...(생략)
```
- `MainServiceController`에서 movie라는 이름으로 영화의 정보를 model을 통해 보냈다.
- map안에 매핑되어 있던 정보들을 꺼내서 위치시켰다.

![servicePage_info](/images/Project_Report/servicePage_info.png)

## compareServicePage.html 코드 수정

```html
    ...(생략)

    <div class = "service_left">
        <div class = "info_area">
            <img class = "service_picture" th:src="${movieInfo1.image}">
            <div class = result_info>
                <div class = "info_title">
                    <span>제목: </span>
                    <b><span th:text="${movieInfo1.title}"></span></b>
                </div>
                <div class = "info_since">
                    <span>개봉 연도: </span>
                    <b><span th:text="${movieInfo1.pubDate}"></span></b>
                </div>
                <div class = "info_director">
                    <span>감독: </span>
                    <b><span th:text="${movieInfo1.director}"></span></b>
                </div>
                <div class = "info_actor">
                    <span>출연진: </span>
                    <b><span th:text="${movieInfo1.actor}"></span></b>
                </div>
                <div class = "info_review">
                    <span>평점: </span>
                    <b><span th:text="${movieInfo1.userRating}"></span></b>
                </div>
            </div>
        </div>

    ...(생략)   

    <div class = "service_right">
        <div class = "info_area">
            <img class = "service_picture" th:src="${movieInfo2.image}">
            <div class = result_info>
                <div class = "info_title">
                    <span>제목: </span>
                    <b><span th:text="${movieInfo2.title}"></span></b>
                </div>
                <div class = "info_since">
                    <span>개봉 연도: </span>
                    <b><span th:text="${movieInfo2.pubDate}"></span></b>
                </div>
                <div class = "info_director">
                    <span>감독: </span>
                    <b><span th:text="${movieInfo2.director}"></span></b>
                </div>
                <div class = "info_actor">
                    <span>출연진: </span>
                    <b><span th:text="${movieInfo2.actor}"></span></b>
                </div>
                <div class = "info_review">
                    <span>평점: </span>
                    <b><span th:text="${movieInfo2.userRating}"></span></b>
                </div>
            </div>
        </div>

    ...(생략)
```
- `servicePage.html`과는 `MainServiceController`에서 model을 통해서 넘겨준 값이 2개라는 것 외에는 다른게 없다.

![compareServicePage_info](/images/Project_Report/compareServicePage_info.png)

## 에러 페이지 제작

기존에는 홈페이지에서 다운로드 받은 에러 페이지를 사용하고 있었지만, 사이트만의 고유한 에러 페이지를 만들어 교체하는 작업을 진행했다.
<br>
이 과정에서 홈페이지 로고도 제작했고, 그 로고를 활용하여 오류 페이지도 같이 만들었다.

### notFoundError.html

![notFoundError](/images/Project_Report/notFoundError.png)

### tooManyResultsError.html

![tooManyResultsError](/images/Project_Report/tooManyResultsError.png)

### 404.html

![404_error](/images/Project_Report/404_error.png)

## 정리

검색어를 통해 영화의 정보를 검색 후 서비스 페이지에 나타내주는 것 까지는 구현이 되었다.<br>
남은 것은 리뷰 정보를 크롤링 해서 서비스 페이지 밑으로 리뷰 정보를 출력해주는 것이다.<br>
여기까지 하면 어느정도 구현은 다 될 것 같다.