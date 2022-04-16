# 2022. 4. 12. 수업내용 정리 
## 코드위주로 

<br>

+ HTML? <br>
  HTML이란 **'Hyper Text Markup Language'**, 즉 웹페이지를 만드는 데 사용하는 언어입니다. 
  웹페이지를 HTML 문서라고도 부르며, HTML 태그로 구성됩니다.<br>
  
  ![image description](https://thumbs.dreamstime.com/b/html-css-javascript-programming-language-web-code-syntax-closeup-concept-technology-business-178233471.jpg)
  
  <br><br><br><br><br>


+ HTML 기본구조 <br>
  HTML의 기본 구조는 아래의 이미지와 같습니다.<br>
  
  ```html

  <!DOCTYPE html>       <!--현재 문서가 HTML5(현재버전)임을 명시합니다.-->
  <html lang="en">      <!--HTML의 루트와 언어를 명시합니다.-->
  <head>                <!--HTML문서의 메타데이터(metadata)를 정의합니다.-->
                        <!--메타데이터는 문서에 대한 정보로 웹 브라우저에는 직접적으로 표현되지 않는 정보를 의미합니다. <title>,<style>,<meta>,<link>,<scripot>,<base>태그
                        등이 이에 속합니다.-->

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>          <!--HTML문서의 제목을 정의하며, 웹 브라우저의 툴바에 표시됩니다. 또한, 즐겨찾기에 추가할 떄 즐겨찾기의 제목이 되고 검색 엔진의 결과 페이지에 
                                     제목으로 표시됩니다.-->
  </head>
  <body>         <!--웹 브라우저를 통해 보이는 내용 부분입니다.-->

  </body>
  </html>

  ```

  <br><br><br><br><br>
  
+ 기본태그 (수업내용에 한해서..) <br>

  * h1 ~ h6 : 제목을 나타내고 1~6까지 순으로 크기를 조정할 수 있습니다.

  ``` html

  <h1>h tag</h1> <!--h1-->
  <h2>h tag</h2> <!--h2-->
  <h3>h tag</h3> <!--h3-->
  <h4>h tag</h4> <!--h4-->
  <h5>h tag</h5> <!--h5-->
  <h6>h tag</h6> <!--h6-->

  ```

  * p : 단락(paragraph)을 나타냅니다.

  ```html

  <p>p tag</p> <!--p-->

  ```

  * b : 글자를 진하게 나타냅니다. 
 
  ```html

  <b>b tag</b> <!--b-->

  ```

  * em : 강조의 의미로 글자를 기울여서 나타냅니다.
  
  ```html

  <em>em tag</em> <!--em-->

  ```

  * img : 이미지를 가져오는 태그로 src에 주소를 입력해 가져올 수 있습니다

  ```html

  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDmaBfX-GN0cUBEoRh8XAnU4NEW8KI1EtDmA&usqp=CAU" alt="치와와 사진">

  <!--img-->
  <!--src는 경로, alt는 이미지 설명-->

  ``` 

  <br>

  ↓↓↓↓↓ 코드 실행 후 웹에서 나오는 이미지 ↓↓↓↓↓ <br>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDmaBfX-GN0cUBEoRh8XAnU4NEW8KI1EtDmA&usqp=CAU"> 
  
  <br><br><br><br><br>

+ 상대경로 vs 절대경로
  * 절대경로 : 절대 변하지 않는 경로로 'http, C, D'와 같이 변하지 않는 경로를 말합니다. <br>
   <img src="https://velog.velcdn.com/images%2Fwlsdnjs156%2Fpost%2Fe35cfb3d-67b3-420c-ab60-f02d4b9d24f1%2Fimage.png">  <br><br>
  
     - "http(https)" : 주소 값이 고정적으로 지정 되어 있음. <br>
     - "/(//)" : 최상위 루트를 의미. <br><br>
    
    > 현재 나의 위치: sub01.html <br>
    > 내가 찾고자 하는 파일: ceo.jpg <br>
    > 알맞은 경로: ```<img src = "http//127.0.0.1:5500/sub/img/ceo.jpg">``` <br>
   
    > 현재 나의 위치: left_menu.html <br>
    > 내가 찾고자 하는 파일: ceo.jpg <br>
    > 알맞은 경로: ``` <img src = "http//127.0.0.1:5500/sub/img/ceo.jpg">``` <br>
    
  * 상대경로 : 기준점에 따라 변하는 경로로 파일의 위치에 따라 변경이 가능합니다. <br>
   <img src="https://velog.velcdn.com/images%2Fwlsdnjs156%2Fpost%2Fe35cfb3d-67b3-420c-ab60-f02d4b9d24f1%2Fimage.png">  <br><br>
   
     - "./"  : 내 주변 폴더에서 찾음 <br>
     - "../" : 나의 상위 폴더로 이동해서 찾음 <br><br>
    
    > 현재 나의 위치: index.html <br>
    > 내가 찾고자 하는 파일: ceo.jpg <br>
    > 알맞은 경로: ```<img src="./sub/img/ceo.jpg">``` <br>
    
    > 현재 나의 위치: left_menu.html <br>
    > 내가 찾고자 하는 파일:logo.jpg <br>
    > 알맞은 경로: ```<img src="../../img/logo.jpg">``` 
    
    <br><br><br><br><br>

+ 끝으로.. <br>
  첫 번째 수업은 오리엔테이션과 더불어 간단한 워밍업이었기 때문에 크게 힘든 것은 없었다. <br>
  다만, 앞으로 다가올 수업이 험난한 것은 확실했으나 그걸 극복한다면 좋은 결과가 있을 것이라는 확신이 들었다. <br>
  부족할지라도 개인프로젝트와 병행하면서 협업프로젝트 및 정보처리기사는 7월달에 응시해보기로..? 확정은 아니다. <br> 
