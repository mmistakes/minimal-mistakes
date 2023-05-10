---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록12"
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
    - 검색어의 개수에 따른 동작 구현
        - MainService.java에 영화를 검색하는 로직 작성
        - MainServiceController 관련 코드 작성
        - searvicePage.html, compareServicePage.html thymeleaf 코드 작성
        - 에러 페이지 제작
<br>

# 이번에 해야할 목록

- 네이버 영화 페이지에서 리뷰 정보 크롤링 해오기
    - MainService 크롤링 관련 코드 작성
    - MainServiceController 관련 코드 추가
    - servicePage, compareServicePage 코드 추가

## 구상

영화의 기본적인 정보 뿐만 아니라 구체적인 관람객들의 평점과 리뷰가 있어야 비교가 되기 때문에 크롤링을 통해서 리뷰 정보를 가져오기로 했다.<br>
리뷰 정보를 가져온 후 서비스 페이지에 제대로 뿌려주기만 하면 된다.

## build.gradle

```gradle
implementation 'org.jsoup:jsoup:1.15.3' // 크롤링을 위해 필요한 라이브러리
```
- jsoup은 자바로 만들어진 HTML Parser로, 자바 언어로 HTML을 다루기 쉽게 강력한 기능을 제공한다.
    - URL, 파일, 문자열을 소스로 하여 HTML을 파싱할 수 있다.
    - 문서내의 HTML 요소, 속성, 텍스트를 조작할 수 있다.
    - 깔끔한 형태의 html을 출력할 수 있는 등등 많은 기능들이 제공된다.
    
## MainService - reviewCrawlLogic()

```java
    ...
    /*
     * 리뷰 크롤링 작업
     * 검색에 필요한 링크를 파라미터로 필요
     * 사이트 URL을 통해서 필요한 정보를 뽑아서 Controller에 리턴 해주는 역할
     * */
    public MainServiceDto reviewCrawlLogic(String movieLink) {

        /*
         * 링크에 대한 커넥션 받기
         * 관람객 한줄평을 받아올 때 사용
         * */
        Connection basicConn = Jsoup.connect(movieLink);

        /*
         * 기본 링크에서 부분만 수정하여 리뷰 페이지에 대한 URL을 만들고 커넥션 받기
         * 평점 더보기를 클릭할 시 실제 네이버 사이트로 이동시켜야 하기 때문에 해당 링크를 model을 통해 넘겨줌1
         * */
        String reviewLink = movieLink.replace("basic", "point");
        Connection reviewConn = Jsoup.connect(reviewLink);

        // 한줄평에 대한 정보들을 list에 저장 후 model로 넘겨줌
        List<MovieReviewDto> reviewList = new ArrayList<>();
        try {
            Document basicDocument = basicConn.get(); // 관람객의 한줄평 정보를 가져올 수 있음
            Document reviewDocument = reviewConn.get(); // 평론가의 리뷰 정보를 가져올 수 있음

            /*
             * 관람객의 한줄평 리뷰에 대한 정보
             * */
            Elements citizenReviewElements = basicDocument.select("div.score_reple > p"); // 관람객 한줄평 텍스트
            Elements citizenScoreElements = basicDocument.select("div.score_result > ul > li > div.star_score > em"); // 관람객 한줄평 텍스트

            for(int i = 0; i < citizenReviewElements.size(); i++) {
                String review = citizenReviewElements.get(i).text(); // 관람객 한줄평
                String score = citizenScoreElements.get(i).text(); // 관람객이 준 점수
                MovieReviewDto reviewDto = new MovieReviewDto(score, review);
                reviewList.add(reviewDto); // 한줄평 정보를 list에 저장(추후에 model로 넘김)
            }

            /*
             * 기자, 평론가의 리뷰에 대한 정보를 html로 가져와서 그대로 model을 통해 넘겨줌
             * 사진이 없는 기자, 평론가에 대한 리뷰는 html이 다르기 때문에 둘 다 가져와서 뿌려줘야 함
             * */
            Elements reporterHtmlElements = reviewDocument.select("div.reporter"); // 기자, 평론가 리뷰(사진 포함)
            String reporterHtml = reporterHtmlElements.html(); // 기자, 평론가 관련 리뷰를 html 형식으로 저장

            // 사진 없는 기자, 평론가 리뷰
            Elements ReporterScoreElements = reviewDocument.select("div.score140 > div.score_result > ul > li > div.star_score > em"); // 점수
            Elements ReporterRepleElements = reviewDocument.select("div.score140 > div.score_result > ul > li > div.score_reple > p"); // 리뷰
            Elements ReporterNameElements = reviewDocument.select("div.score140 > div.score_result > ul > li > div.score_reple > dl"); // 이름

            List<ReporterReviewDto> noPic_reporterList = new ArrayList<>();
            for(int i = 0; i < ReporterRepleElements.size(); i++) {
                String reporter_score = ReporterScoreElements.get(i).text();
                String reporter_review = ReporterRepleElements.get(i).text();
                String reporter_name = ReporterNameElements.get(i).text();

                ReporterReviewDto reporterReviewDto = new ReporterReviewDto(reporter_score, reporter_review, reporter_name);
                noPic_reporterList.add(reporterReviewDto); // 기자, 평론가 관련 리뷰(사진 X)를 list에 저장
            }

            /*
             * return 값
             * reviewLink : 리뷰 더보기 클릭시 사용할 링크값
             * reviewList : 관람객 한줄평에 대한 정보 list
             * reporterHtml : 기자, 평론가의 리뷰에 대한 정보(사진 포함)
             * noPic_reporterList: 기자, 평론가의 리뷰에 대한 정보(사진 미포함)
             * */
            return new MainServiceDto(reviewLink, reviewList, reporterHtml, noPic_reporterList);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    ...
```
- `MainServiceController`를 통해서 영화 링크를 파라미터로 받는다.
- jsoup으로 넘겨 받은 링크의 커넥션을 생성한다.
- 링크의 메인 화면에서는 관람객의 평점밖에 없기 때문에 더 많은 리뷰를 보기 위해서는 한 단계 더 들어가야 한다. 그래서 링크의 중간 부분만 수정하여 `reviewLink`라는 이름으로 저장했다.
- `document.select()`메소드를 사용해 가져오고 싶은 부분의 html 태그를 입력하면 해당 부분의 정보를 가져온다.
- 관람객, 사진이 있는 기자/평론가의 리뷰는 html로 읽어온 값을 text로 반환하여 DTO에 넣고, list에 저장 했다.
- 리뷰를 보면 사진은 없고 리뷰만 있는 기자/평론가의 리뷰가 있는데, 해당 부분은 html태그를 그대로 가져와서 저장했다.
- 최종적으로 모든 정보(html 태그, text로 반환한 정보 등)를 한번 더 DTO(`MainServiceDto`)로 감싸서 리턴해주었다.

### MainServiceDto

```java
@Getter
public class MainServiceDto {
    private String reviewLink; // 평점 링크
    private List<MovieReviewDto> reviewList; // 한줄평 정보
    private String reporter_html; // 기자, 평론가 리뷰 정보(사진 포함)
    private List<ReporterReviewDto> noPic_reporterList; // 기자, 평론가 리뷰 정보(사진 미포함)

    public MainServiceDto(String reviewLink, List<MovieReviewDto> reviewList, String reporter_html, List<ReporterReviewDto> noPic_reporterList) {
        this.reviewLink = reviewLink;
        this.reviewList = reviewList;
        this.reporter_html = reporter_html;
        this.noPic_reporterList = noPic_reporterList;
    }
}
```

## MainServiceController - mainService() +

```java
@Controller
@RequiredArgsConstructor
public class MainServiceController {

    private final MainService mainService;
    private final RecordService recordService;

    (...)
    
    /*
    * 메인화면에서 넘겨준 영화의 제목이 하나인지 둘인지 먼저 확인
    * 개수에 따라 알맞은 화면 출력
    * */
    @GetMapping("/mainService")
    public String mainService(String searchItem1, String searchItem2, String itemLink1, String itemLink2, Model model,
                              HttpServletRequest request) {

        String error; // MainService에서 넘겨준 에러 링크 확인용

        User loginUser = LoginSessionCheck.check_loginUser(request);

        if(searchItem1.equals("") && searchItem2.equals("")) {
            return "error/notFoundError";
        } else if (!searchItem1.equals("") && !searchItem2.equals("")) {
            // 두개의 검색어로 검색했을 시 동작
            return compare_movies(searchItem1, searchItem2, itemLink1, itemLink2, model, request, loginUser);
        }

        /*
        * 하나의 검색어만 입력할 시 동작
        * searchItem1, searchItem2 중 어디로 들어올지 모르기 때문에 하나로 합쳐줌(itemLink1, itemLink2도 마찬가지)
        * 여기서 searchItem은 값이 무조건 들어가지만, itemLink는 autoSearch 사용 여부에 따라 값이 들어가지 않을 수도 있다.
        * */
        return offer_movieInfo(searchItem1, searchItem2, itemLink1, itemLink2, model, request, loginUser);
    }

    private String offer_movieInfo(String searchItem1, String searchItem2, String itemLink1, String itemLink2, Model model, HttpServletRequest request, User loginUser) {
        String error;
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

        MainServiceDto mainServiceDto = mainService.reviewCrawlLogic(itemLink); // 리뷰 정보를 크롤링 후 DTO에 넣어준 결과를 받음

        /*
         * 검색한 영화의 제목과 사용자 정보를 같이 저장
         * 회원 정보 조회시 최근 검색어에서 사용
         * */
        if (loginUser != null) {
            recordService.saveMovie(searchItem, loginUser);
        }

        LoginSessionCheck.check_loginUser(request, model);

        model.addAttribute("movie", movieInfo);
        model.addAttribute("mainServiceDto", mainServiceDto);

        return "service/servicePage";
    }

    private String compare_movies(String searchItem1, String searchItem2, String itemLink1, String itemLink2, Model model, HttpServletRequest request, User loginUser) {
        String error;
        Map<String, Object> movieInfo1 = mainService.movieSearchService(searchItem1, itemLink1);
        Map<String, Object> movieInfo2 = mainService.movieSearchService(searchItem2, itemLink2);

        itemLink1 = String.valueOf(movieInfo1.get("link"));

        // 검색된 결과에서 정상적인 link값이 들어있지 않고, MainService에서 넘겨준 에러 메시지가 담겨 있다면 error 페이지로 리턴
        error = check_serviceError(itemLink1);
        if (error != null) return error;

        itemLink2 = String.valueOf(movieInfo2.get("link"));

        // 검색된 결과에서 정상적인 link값이 들어있지 않고, MainService에서 넘겨준 에러 메시지가 담겨 있다면 error 페이지로 리턴
        error = check_serviceError(itemLink2);
        if (error != null) return error;

        MainServiceDto movieInfoDto1 = mainService.reviewCrawlLogic(itemLink1);
        MainServiceDto movieInfoDto2 = mainService.reviewCrawlLogic(itemLink2);

        /*
        * 검색한 영화의 제목과 사용자 정보를 같이 저장
        * 회원 정보 조회시 최근 검색어에서 사용
        * */
        if (loginUser != null) {
            String searchItem = (searchItem1 + ", " + searchItem2); // 두 개인 검색 결과를 하나의 문자열로 합쳐서 저장
            recordService.saveMovie(searchItem, loginUser);
        }

        LoginSessionCheck.check_loginUser(request, model);

        model.addAttribute("movieInfo1", movieInfo1);
        model.addAttribute("movieInfo2", movieInfo2);
        model.addAttribute("movieInfoDto1", movieInfoDto1);
        model.addAttribute("movieInfoDto2", movieInfoDto2);

        return "service/compareServicePage";
    }

    // MainService에서 넘겨준 에러를 확인
    private String check_serviceError(String itemLink) {
        if(itemLink.equals("notFoundError"))
            return "error/notFoundError";
        else if(itemLink.equals("tooManyResultsError"))
            return "error/tooManyResultsError";
        return null;
    }
}
```
- 기존에 있던 코드에 `reviewCrawlLogic()`을 사용하여 모든 정보가 담겨있는 DTO를 받고 이를 model을 통해 html에 넘겨주는 코드만 추가되었다.
- 비즈니스 로직에서 api를 사용해 값을 읽어오고, 크롤링 작업까지 모두 해주기 때문에 컨트롤러에서는 해당 함수를 사용하고, model에 값을 넣어 html에 보내주기만 하면 된다.

## .html 코드 추가

### servicePage.html

**검색어가 하나인 화면**
```html
...(기본 정보 출력 부분 생략)

    <div class = "review_area">
        <div class="score_board">
            <strong class="board">
                <span class="title">
                    <em class="blind">관람객 한줄평</em>
                </span>
                <span class="sp">|</span>
                <a th:href="${mainServiceDto.reviewLink}" class="link_more">더보기
                    <span class="ico_more"> ></span>
                </a>
            </strong>
        </div>
        <div class="score_result">
            <ul>
                <li th:each="review : ${mainServiceDto.reviewList}">
                    <!--점수에 대한 별점 이미지와 실제 점수 text 출력-->
                    <div class="star_score">
                        <img class="star_image" th:src="@{img/} + ${review.score} + '.jpg'">
                        <em th:text="${review.score}"></em>
                    </div>

                     <!--관람객이 남긴 한줄평 출력-->
                    <div class="score_reple">
                        <p th:text="${review.reple_text}"></p>
                     </div>
                 </li>
             </ul>
        </div>

        <!--기자, 평론가 관련 html-->
        <div class="score_board">
            <Strong class="board">
                <span class="title">
                    <em class="blind">기자, 평론가 평점</em>
                </span>
            </Strong>
        </div>
        <div class="reporter">
            <script th:inline="javascript">
                document.write([[${mainServiceDto.reporter_html}]]);
            </script>
        </div>

        <!--기자, 평론가 사진X 리뷰-->
        <div th:if="${not #strings.isEmpty(mainServiceDto.noPic_reporterList)}">
            <div class="score_result">
                <ul>
                    <li th:each="reporter_Review : ${mainServiceDto.noPic_reporterList}">
                    <!--점수에 대한 별점 이미지와 실제 점수 text 출력-->
                        <div class="star_score">
                            <img class="star_image" th:src="@{img/} + ${reporter_Review.score} + '.jpg'">
                            <em th:text="${reporter_Review.score}"></em>
                        </div>

                        <!--관람객이 남긴 한줄평 출력-->
                        <div class="score_reple">
                            <p th:text="${reporter_Review.reple_text}"></p>
                            <dl>
                                <dt th:text="${reporter_Review.name}"></dt>
                            </dl>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        ...
```
- `MainServiceController`에서 model을 통해서 넘긴 `MainServiceDto`에서 필요한 정보를 하나씩 꺼내서 출력하기만 하면 된다.
- 처음에 이미지를 출력하는 부분이 잘 안되서 시간이 좀 걸렸다..
- html을 그대로 넘긴 부분은 \<script\>안에서 `document.write()`를 사용해서 html 코드를 그대로 출력하도록 했다.
    - 값을 하나씩 text로 받아서 넘기기에는 값이 너무 많고, 변수가 많아서 html 코드를 그대로 사용하는 걸 택했다.
- 넘겨받은 값을 꺼내서 출력만 하면 되기 때문에 어려운건 많이 없었다.

### compareServicePage.html

**검색어가 두개인 화면**
```html
    ...

    <div class = "service_left">
        ...(기본 정보 출력 부분 생략)
        <div class = "review_area">
            <div class="score_board">
                <strong class="board">
                    <span class="title">
                        <em class="blind">관람객 한줄평</em>
                    </span>
                    <span class="sp">|</span>
                    <a th:href="${movieInfoDto1.reviewLink}" class="link_more">더보기
                        <span class="ico_more"> ></span>
                    </a>
                </strong>
            </div>
            <div class="score_result">
                <ul>
                    <li th:each="review : ${movieInfoDto1.reviewList}">
                        <div class="star_score">
                            <img class="star_image" th:src="@{img/} + ${review.score} + '.jpg'">
                            <em th:text="${review.score}"></em>
                        </div>
    
                        <div class="score_reple">
                            <p th:text="${review.reple_text}"></p>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 기자, 평론가 html -->
            <div class="score_board">
                <strong class="board">
                    <span class="title">
                        <em class="blind">기자, 평론가 평점</em>
                    </span>
                </strong>
            </div>
            <div class="reporter">
                <script th:inline="javascript">
                    document.write([[${movieInfoDto1.reporter_html}]]);
                </script>
            </div>

            <!--기자, 평론가 사진X 리뷰-->
            <div th:if="${not #strings.isEmpty(movieInfoDto1.noPic_reporterList)}">
                <div class="score_result">
                    <ul>
                        <li th:each="reporter_Review : ${movieInfoDto1.noPic_reporterList}">
                            <!--점수에 대한 별점 이미지와 실제 점수 text 출력-->
                            <div class="star_score">
                                <img class="star_image" th:src="@{img/} + ${reporter_Review.score} + '.jpg'">
                                <em th:text="${reporter_Review.score}"></em>
                            </div>

                            <!--관람객이 남긴 한줄평 출력-->
                            <div class="score_reple">
                                <p th:text="${reporter_Review.reple_text}"></p>
                                <dl>
                                    <dt th:text="${reporter_Review.name}"></dt>
                                </dl>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <div class = "service_right">
        ...(기본 정보 출력 부분 생략)
        <div class = "review_area">
            <div class="score_board">
                <strong class="board">
                    <span class="title">
                        <em class="blind">관람객 한줄평</em>
                    </span>
                    <span class="sp">|</span>
                    <a th:href="${movieInfoDto2.reviewLink}" class="link_more">더보기
                        <span class="ico_more"> ></span>
                    </a>
                </strong>
            </div>
            <div class="score_result">
                <ul>
                    <li th:each="review : ${movieInfoDto2.reviewList}">
                        <div class="star_score">
                            <img class="star_image" th:src="@{img/} + ${review.score} + '.jpg'">
                            <em th:text="${review.score}"></em>
                        </div>

                        <div class="score_reple">
                            <p th:text="${review.reple_text}"></p>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 기자, 평론가 html -->
            <div class="score_board">
                <strong class="board">
                    <span class="title">
                        <em class="blind">기자, 평론가 평점</em>
                    </span>
                </strong>
            </div>
            <div class="reporter">
                <script th:inline="javascript">
                    document.write([[${movieInfoDto2.reporter_html}]]);
                </script>
            </div>

            <!--기자, 평론가 사진X 리뷰-->
            <div th:if="${not #strings.isEmpty(movieInfoDto2.noPic_reporterList)}">
                <div class="score_result">
                    <ul>
                        <li th:each="reporter_Review : ${movieInfoDto2.noPic_reporterList}">
                            <!--점수에 대한 별점 이미지와 실제 점수 text 출력-->
                            <div class="star_score">
                                <img class="star_image" th:src="@{img/} + ${reporter_Review.score} + '.jpg'">
                                <em th:text="${reporter_Review.score}"></em>
                            </div>

                            <!--관람객이 남긴 한줄평 출력-->
                            <div class="score_reple">
                                <p th:text="${reporter_Review.reple_text}"></p>
                                <dl>
                                    <dt th:text="${reporter_Review.name}"></dt>
                                </dl>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    ...
```
- 왼쪽, 오른쪽으로 나뉜 것 빼고는 `servicepage.html`과 매커니즘은 완전히 같다.
- 다른건 다 괜찮지만 html에서 디자인 부분을 처리하는게 힘들었다.
    - 리뷰의 수가 다르기 때문에 하나는 길고, 하나는 다른 하나에 비해 짧기 때문에 화면이 짤리는 문제가 있어서 css를 한참 고쳤다.
    - 확인결과 html, body 태그 부분을 `height: 100%;`로 설정해둔게 문제가 되었다.
    - 이 부분을 수정하고 조금 더 보완하니 나름 괜찮은 화면이 되었다.

## 실행 화면

### servicePage.html

![servicePage_run](/images/Project_Report/servicePage_run.png)

### compareServicePage.html

![compareServicePage_run](/images/Project_Report/compareServicepage_run.png)

## 정리

메인 서비스를 구현하는건 거의 완성된거 같고, 문제는 보여지는 디자인인데...<br>
html, css를 어느정도 다룰 순 있지만 평소에도 디자인에 대한 부분은 약해서 어려움이 많다.(이럴때는 프론트엔드와 협업해서 하면 좋을 것 같다는 생각이..)<br>
지금까지는 css로 뼈대만 잡아놓았고, 디자인을 잘 못하기 때문에 bootstrap을 사용하거나 참고해서 디자인을 해야겠다.
<br>
그리고 현재는 로컬 환경에서만 돌렸기 때문에 h2 데이터 베이스를 사용했는데 MySQL로 변경도 해야한다.