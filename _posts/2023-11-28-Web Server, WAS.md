![이미지](/assets/blog1.jpg)

## Web Server
- 브라우저의 http 요청을 받아서 jpg, html과 같은 정적페이지를 브라우저에 제공하는 서버

#### 정적페이지란
- 요청인자(request parameter)값에 따라 결과값이 바뀌지 않는 페이지
- 어느 사용자의 요청이든 항상 동일한 컨텐츠

##### 요청인자란
-클라이언트가 서버에 요청하는 정보

## WAS(Web Application Server)
- 브라우저의 http요청을 받아서 php와 같은 동적페이지를 브라우저에 제공하는 서버

##### 동적페이지란
- 요청인자(request parameter)값에 따라 결과값에 바뀌는 페이지
- 각 사용자의 요청에 따라 변화할 수 있는 컨텐츠

#### WAS 구조
![이미지](/assets/was_structure.jpg)
- Web Server는 브라우저의 요청을 container에 전달, container의 결과값을 client에 전달
- Web Container는 client의 요청을 처리하고 결과값을 web Server에 반환
- WAS는 정적페이지인 Web Server가 있어서 사실 WAS만으로 정적페이지와 동적페이지를 모두 브라우저에 제공할 수 있다.

##### WAS와 Web Server를 모두 사용하는 이유
- 정적페이지는 Web Server가 처리하고 동적페이지는 WAS가 처리함으로써 책임분할을 통한 서버부하 방지
