---
layout: single
title:  "[Project_Report] 프로젝트 진행 기록9"
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
<br>

# 이번에 해야할 목록

- 메인 서비스 개발
    - 임시 메인 서비스 화면 제작
    - `NaverMovieApiService` 개발(네이버 API를 활용한 값 읽어오기)

## 구상

만들 메인 서비스는 검색어를 비교해주는 기능이다.<br>
현재는 네이버 API를 통한 영화 비교만 할 생각이고, 추후에 식당이나, 책 등 더 많은 것을 비교할 수 있게 늘려갈 생각이다.

## 임시 서비스 화면 제작

최종적인 디자인은 추후에 다시 하고, 현재는 당장 쓸 수 있도록 뼈대만 만들어 놓을 것이다.<br>
필요한 페이지는 사용자가 검색어를 하나만 입력할 때와 둘 다 입력했을 때 총 2개이다.

### 검색어 1

![servicePage](/images/Project_Report/servicePage.png)

### 검색어 2

![compareServicePage](/images/Project_Report/compareServicePage.png)

현재는 뼈대만 만들고, 값이 잘 들어가는지 확인만 할 것이기 때문에 html, css 코드는 생략하고, 추후에 어느정도 완성되었을 때 게시할 예정이다.

## NaverMovieApiService

우선 사전적으로 `json-simple` 라이브러리를 등록해주었다.

`build.gradle`
```gradle
implementation group: 'com.googlecode.json-simple', name: 'json-simple', version: '1.1.1'
```
- `json-simple`은 간단한 JSON 데이터를 처리하기에 적합한 라이브러리이다.
- 기본적으로 API를 통해서 값을 읽어오면 문자열로 받아오게 되는데, 이를 json 형태로 바꾼뒤에 원하는 값만 뽑아서 Map형태로 만들 예정이다.

### NaverMovieApiService - search()

```java
@Service
public class NaverMovieApiService {

    final String baseUrl = "https://openapi.naver.com/v1/search/movie.json?query=";

    /*
    * 네이버 영화 검색 API를 통해서 검색어에 따른 결과 검색
    * */
    public String search(String _url) {
        HttpURLConnection con = null;
        String result = "";
        int display = 100; // 한번에 표시할 검색 결과의 수
        
        try{
            // query 값을 받은 뒤 baseUrl과 연결
            URL url = new URL(baseUrl + _url + "&display=" + display);
            con = (HttpURLConnection) url.openConnection();

            // GET방식으로 가져오며 지급받은 id, secret을 넘겨준다.
            con.setRequestMethod("GET");
            con.setRequestProperty("X-Naver-Client-Id", NaverApiClientInfo.client_id);
            con.setRequestProperty("X-Naver-Client-Secret", NaverApiClientInfo.client_secret);

            // 응답 코드가 200이면 값을 읽어오고, 아니라면 예외 발생
            int responseCode = con.getResponseCode();
            if(responseCode == HttpURLConnection.HTTP_OK)
                result = readBody(con.getInputStream());
            else
                result = readBody(con.getErrorStream());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return result;
    }

    ...
```
- baseUrl : 네이버 영화 API에서 주어지는 기본 url
- `search(String _url)` : 매개변수에는 사용자가 입력한 검색어가 들어간다.
    - `display`는 한번에 검색할 숫자를 의미하는데, 단어가 포함만 되도 모두 검색되어 버리기 때문에 그 안에서도 못찾을 경우를 대비해 최대치로 설정해두었다.(테스트로 괴물을 검색했더니 괴물이 들어간 단어가 100개가 넘었다..)
    - 기본 url과 추가하고 싶은 설정을 합쳐서 새로운 URL로 만들어준다.(display 추가)
    - 지급받은 id와 secret을 통해서 응답 코드를 받아오고, 응답 코드가 200이라면 `readBody()`를 통해서 값을 읽어온다.
    - 최종적으로 `readBody()`를 통해서 가져온 String형태의 JSON 값을 리턴해준다.

### NaverMovieApiService - readBody()

```java
    ... search()

    private String readBody(InputStream inputStream) {

        try(BufferedReader lineReader = new BufferedReader(new InputStreamReader(inputStream))){
            StringBuilder stringBuilder = new StringBuilder();
            String line;
            while((line = lineReader.readLine()) != null) {
                stringBuilder.append(line).append("\n");
            }
            return stringBuilder.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }
```
- API를 통해서 값을 읽어오는 메서드이며, `BufferedReader`를 통해 값을 읽어온다.
- `BufferedReader`를 통해 null이 아닐때까지 한줄씩 값을 가져온 뒤, `StringBuilder`에 값을 쌓아두고 한번에 리턴해준다.

### NaverMovieApiService - getResultMapping()

필요한 값만 매핑해서 반환해주는 메소드
```java
    ... search(), readBody()

    public Map<String, Object> getResultMapping(String response, String[] fields) {

        Map<String, Object> rtnObj = new HashMap<>();

        try{
            JSONParser parser = new JSONParser();
            JSONObject result = (JSONObject) parser.parse(response);
            rtnObj.put("total", result.get("total"));

            // 검색된 items JSONArrays로 변환해서 값 저장
            JSONArray items = (JSONArray) result.get("items");
            List<Map<String, Object>> itemList = new ArrayList<>();

            for(int i = 0; i < items.size(); i++) {
                // JSONArrays에서 item값을 하나씩 꺼냄
                JSONObject item = (JSONObject) items.get(i);
                Map<String, Object> itemMap = new HashMap<>();

                // 넘겨준 field값을 통해서 item에서 원하는 값만 꺼내서 Map에 저장한다.
                for(String field : fields) {
                    itemMap.put(field, item.get(field));
                }
                itemList.add(itemMap);
            }
            // 최종적으로 매핑한 item 결과를 result라는 이름으로 Map에 저장
            rtnObj.put("result", itemList);
        } catch (ParseException e) {
            e.printStackTrace();
            log.info("getResult Error -> " + "Parsing Error, " + e.getMessage());
        }
        return rtnObj;
    }
}
```
- `readBody()`에서 받아온 값과, 필요한 값의 key 값인 `fields[]`가 매개변수로 들어간다.
- String 형태의 JSON값을 JSONObject 형태로 만들어준다.
- `result.get("items")`는 검색된 결과가 들어있는데, 결과값이 하나가 있을 수도 있고, 여러개가 들어있을 수도 있기 때문에, 우선 JSONArray형태로 다시 바꿔준다.
- 다시 JSONArray에서 값을 하나씩 꺼내서 JSONObject 형태로 만들어주고, 넘겨받은 fields[]값을 통해서 Map형식으로 만들어준다.
- 마지막으로 `result`라는 key값으로 map에 넣어서 최종적으로 매핑한 결과인 `itemList`를 넘겨준다.

> 여기까지 하면 API를 통해서 사용자가 입력한 값에 따른 결과값을 가져온 후, 필요한 정보(제목, 감독 등..)만 매핑하여 리턴받게 된다.