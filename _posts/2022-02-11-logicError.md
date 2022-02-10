---
layout: post
title: "ini와 date_list 로직 충돌"
---
![image](https://user-images.githubusercontent.com/86642180/153457507-cf59a6a6-f48f-4369-bdac-eae99550ec3f.png)
문제의 두 테이블  

<br>
# 현재 상황
initiative 테이블에 데이터를 추가하려면  
😜클라이언트 : ob_code, ini_content, startdate, enddate, period, weekorder, ✌date✌, monthdate  
저만큼의 정보를 클라이언트에서 받는다  
💻컨트롤러 : 클라이언트에서 받은 값 + 전체기간 등을 계산  
service layer에 전달 - mapper에 전달되어 initiative 테이블에 insert됨  

<br>
# 문제점  
클라이언트에서 받은 date(요일 목록)를 먼저 저장 뒤, initiative insert를 진행하려해도  
initiative_code가 date_list 테이블에서도 중요한거라 NULL 넣는것도 안됨  
만약 NULL 허용해주면 나중에 난잡해질 확률 10000%  

<br>

결론 : 저 두 테이블의 선행관계가 정립도 안되고 데이터 저장하는데 문제가 있다..  
이도저도 안되는 상황!  

<br>

# 해결방안 1 (??)
days table 생성  
![image](https://user-images.githubusercontent.com/86642180/153460403-616be1b3-7e51-47a3-89b0-2a84a51cee95.png)
😜 : date 외 데이터 전달  
💻 : (1) 클라이언트가 준 데이터 받음  
(2) date 목록을 받고 변수에 저장  
(3) 클라이언트가 입력한 목록 == db에 있는 목록인 days 코드를 select  
(4) days 코드를 컨트롤러로 가져온 뒤 insert initiative 실행  
👉 이러면 컨트롤러 + service layer쪽 코드가 아주 길어질거같다...  
그리고 days에 2^7에 해당하는 데이터 입력 必  

<br>

# 해결방안 2 (??)
days table 생성 동일(단 date_list_code 없음)  
😜 : date 외 데이터 전달  
💻 : (1) 클라이언트가 준 데이터 받음  
(2) date 목록을 days에 저장  
(3) days에서 가장 최근에 저장된 목록 코드 컨트롤러까지 가져옴  
(4) ini insert 진행  
👉 요일 목록이 과도하게 많이 생성될수도 있음  
가장 최근에 저장된 목록 코드를 가져올 때  
- A와 B가 작업을 진행할 때 작업을 먼저한 A의 코드 대신 B의 코드가 들어와서 혼선 생길수도?  

<br>

잘 모르겠다..

<br>

# 일단 적용
해결방안 1을 한번 시도해보자  
- 그전에 내가 헷갈리는 거  
hash map에서 value는 전부 string인데 mapper에서 입력할 때는 타입 에러 없네?  

<br>

### (1) temp 테이블 생성  
![image](https://user-images.githubusercontent.com/86642180/153473587-4de52ffc-bd73-4f28-95d3-a07d62f8e10f.png)
월수금, 매일 체크 데이터 있음  

<br>

### (2) controller, service, serviceImpl, mapper에 메소드 선언  
💻 mapper
```
    String dateListTest(Map<String, String> params);
```
💻 serviceImpl  
```
private final DateListMapper dateListMapper;
    @Override
    public String dateListTest(Map<String, String> params) throws ParseException{
        return dateListMapper.dateListTest(params);
    }
```
💻service
```
    String dateListTest(Map<String, String> params) throws  ParseException;
```
💻controller
```
    iniService.dateListTest(params);
```
<br>

### (3) 쿼리 작성  
```
    <select id="dateListTest" parameterType="hashMap" resultType="String">
        SELECT day_code from temp
        where mon = IFNULL(#{mon}, 0) AND
              tue = IFNULL(#{tue}, 0) AND
              wed = IFNULL(#{wed}, 0) AND
              thu = IFNULL(#{thu}, 0) AND
              fri = IFNULL(#{fri}, 0) AND
              sat = IFNULL(#{sat}, 0) AND
              sun = IFNULL(#{sun}, 0);
    </select>
```
<br>

### (4) controller에서 값 받기  
```
        String dateListCode = iniService.dateListTest(params);
        System.out.println("dateList 결과");
        System.out.println(dateListCode);
```
![image](https://user-images.githubusercontent.com/86642180/153478574-be17ae43-975b-4a11-8016-35971068f245.png)
![image](https://user-images.githubusercontent.com/86642180/153478619-7af3a851-1a5c-4357-b7bb-9115292b6ce8.png)
일단 여기까지는 성공!  

<br>

### (5) insert initiative
현재 client에서 전달 받은 파라미터에 (4)의 값 추가  
`params.put("dateListCode", dateListCode);`  
쿼리 수정 뒤 실행하면  
![image](https://user-images.githubusercontent.com/86642180/153479413-dfb04ffc-5a1a-4a93-be87-cfca5bf01ce8.png)
그럼 그렇지 한번에 될 일이 없다  

<br>

엉뚱한 값이 들어가서 (3)의 쿼리를 insert 부분 서브쿼리로 활용해서 다시 실행  

<br>
🤦‍♀️ 30분 동안 삽질했는데 dateList를 duration쪽에 넣어서 값이 이상하게 들어감..  
실제로는 잘 작동한다!  

<br><br>

# 최종 결론
(1) temp 테이블 생성 - 요일에 대한 조합 데이터를 가지고 있음 128개ㅎ  
(2) 서브쿼리를 통해 사용자가 선택한 요일에 해당하는 코드 찾고 insert  
```
SELECT day_code from temp
                 where mon = IFNULL(#{mon}, 0) AND
                     tue = IFNULL(#{tue}, 0) AND
                     wed = IFNULL(#{wed}, 0) AND
                     thu = IFNULL(#{thu}, 0) AND
                     fri = IFNULL(#{fri}, 0) AND
                     sat = IFNULL(#{sat}, 0) AND
                     sun = IFNULL(#{sun}, 0)
```
가장 큰 문제 : 128개 조합 데이터 
