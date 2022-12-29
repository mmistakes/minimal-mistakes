# Building RESTful APIs

## RESTful API
  - Representational State Transfer API
  <br/> → 자원을 설명으로 구분하여 해당 자원의 상태를 주고 받는 모든 것을 의미
  -API 시스템을 구현하ㅣ 위한 다양한 아키텍처 중에 가장 널리 사용되는 형식
  -RESTful API는 다른 아키텍처보다 직관적이고 쉽기때문에 우리나라에서 가장 넓게 사용됩니다.
  
  장점 : 그 자체만으로 API의 목적을 쉽게 알 수 있음  <br/>
  단점 : 표준 규약이 없어 안티 패턴으로 작성 되는 경우가 흔함
  
## 설계원칙
 - 구성요소(클라이언트와 서버 등) 사이의 인터페이스는 일관되어야한다.<br/>
 - URI는 동사를 제외한, 명사로 구성 <br/>
   - [GET]/find/user/1 → [GET]/user/1 <br/>
 - Resoure에 대한 행위를 HTTP메소드만으로 표현 <br/>
 - Resource 사이에 연관 관계 및 계층 관계가 있는 경유 '/' 사용 <br/>
 - -URI 마지막 문자로 '/'를 포함하지않음 <br/>
 - URI가 길어지는 경우 '-'을 사용하여 가독성을 높임 <br/>
 - 파일 확장자는 URI에 포함하지 않고 파일의 확장자는 Headers에 포함 <br/>

## Pathparameter와 Queryparameter
 ### Pathparameter
  -  '/'를 사용하여 경로를 찾아가는 parameter <br/>
  -  각 메소드 patch는 부분 수정, put은 전체 수정에 사용된다. <br/>
  → https://github.com/Jangchan0/Jangchan0.github.io/new/master/_posts <br/>

 ### Queryparameter
  -  Query : 질문, 질의 <br/>
  -  filtering : GET/product ? price=3000원 & name=사과 <br/>
      → '3000원'에 해당하는 '사과' product만 보여준다. <br/>
  -ordering : product ? order  <br/>
      →
  - pagination : GET/product ? offset=0 & limit=100 <br/>
      → offset은 출발선 limit는 갯수. 데이터베이스에서 0번째부터 100번째까지의 데이터를 호출 <br/>
  -Serching : GET /user, GET /user?search=홍길동 <br/>
      필터랑 다른 점은 서칭 키워드에 관련된 데이터도 같이 가져올 수 있음 <br/>


## Pathparameter와 Queryparameterse 차이점
response <br/>
{
id = 3 <br/>
product = apple <br/>
price = 3000 } <br/>
<br/>
pathparameter => get/product/3 <br/>
Queryparameter => get/product?id=3 <br/>
Queryparameter는 [filtering, Sorting, Searching 해야하는 경우에 사용]
