---
categories: "TIL-codestates"
tag: [ "codestates", "html", "css"]
---



원래 전 포스팅에서 다 쓰려고 했는데 내용이 많아질거 같기도 해서 나눴습니다.

# HTML

---

> "저 HTML 로 코딩하는데요?"

개발자 깔깔유머집 발췌본입니다. HTML 은 프로그래밍 언어가 아니라 마크업 언어입니다. 물론 정의에 따라서 프로그래밍 언어로 인식될 때가 있지만, 본질적으로는 **"태그를 통해서 웹페이지에 글을 적는 언어"** 입니다.

하지만 웹개발을 위한 개발자가 되기 위해 HTML 은 필수입니다. 저도 개발자의 길을 선택하게 된 계기가 이 HTML 인데요. 지금으로부터 딱 1년 전, 한창 OAC 보병학교에서 교육을 받고 있을 때였습니다. 작전명령을 작성하기 위해선 단대호를 넣어야 했었습니다.

![image-20230412131817641](../../images/2023-04-12-[codestates] HTML, CSS/image-20230412131817641.png)

​		*단대호란 이런겁니다.*

그런데 이걸 그리기 위해서 한쇼를 써서 하나하나 그려야 했습니다. 위에 그림은 간단해보이지만 증강/감소, 임무, 활동 등도 모두 넣어줘야 해서 기존 한쇼파일에서 계속 변경한 뒤 캡처 후 사용해야 했습니다. 조별과제를 하면 단대호를 그리는 인원이 따로 있을 정도였습니다. 잘못 그려서 틀리는 경우도 많았구요.

어느날 그리다가 귀찮음을 느끼고 좀 더 자동화되고 규격화된 방법이 없을까 이것저것 찾아보다가 HTML 에 이미지를 불러와서 조합하면 되겠다고 생각했습니다. 그래서 열심히 구글링을 해서 HTML + JS 를 통해서  inputbox 와 selectbox 로 상급부대, 부대, 병과, 규모, 증강/감소 등등 정보를 넣으면 Img 파일로 저장할 수 있도록 만들었습니다. 적다보니 기억났는데 JS 도 들어갔었네요. 저의 첫 프로그램이자 HTML 프로그램입니다.

해당 프로그램을 만든 로컬 위치가 학교에서 지급한 노트북이어서 안타깝게도 첫 웹앱은 남아있지 않습니다. 노트북이 폐쇄망이었거든요. 지금 만들려면 하루이틀이면 만들 수 있을 것 같긴 합니다. 그때는 쉬는 시간에 틈틈히 한다고 2주일 걸렸던거같습니다. ***중요한 건  IDE 따위 폐쇄망에 없어서 메모장으로 만들었습니다 ㅠㅠ***(오늘 구민상님께서 직장에서 메모장으로 코딩하는 상사분을 보고 도망치셨다고 했을 때 뜨끔했습니다.) chrome 인가 Explorer 였는데 거기에 개발자도구가 뭔지도 몰랐던 때입니다. 

근데 이 프로그램을 만들 때 정말 재밌었고 시간가는 줄 몰랐습니다. 프로그램을 남겨두고 싶었지만 교육이 끝나면 노트북 포맷이 기본에, 따로 옮길 곳도 없던터라 그대로 지워져버렸습니다. 아마 1년이 지난 지금도 후배들은 한쇼로 그리고 있을 겁니다. 

얘기가 딴데로 샜습니다. 오늘은 다시 HTML 을 배웠습니다.

## HTML 을 사용해봅시다.

HTML 의 기본 구조 예시입니다.

```html
<!DOCTYPE html>
<html>
    <head>
    	<title>title입니다.</title>
    </head>
    <body>
        <h1>Hello world!</h1>
        <div>HTML 로 프로그래밍해봐요!</div>
    </body>
</html>
```

HTML 은 트리구조로 이루어져있습니다. html 태그 하위의 head 와 body 태그가 있고 head 와 body 도 각각의 태그를 하위에 가지고 있습니다.

태그는 무조건 열리면 닫아줘야 합니다. 그래서 항상 <div> 를 반복하다가 닫는 걸 하나 놓치는 불상사가 일어나기도 합니다. (물론 리액트를 써보니 컴파일에러로 잡아줍니다.) 모든 코딩이 그렇듯 HTML 도 가독성을 높이기 위해 들여쓰기가 중요하고, 들여쓰기를 통해 태그가 잘 닫혔는지 확인할 수 있습니다.

또한 태그를 시작하자마자 닫을 수도 있습니다.

- `<input type="text" id="test" class="test" spaceholder="what??" /> `: input 태그는 적을 내용이 없으니 이렇게 `/>` 를 사용하여 바로 닫아줍니다. self-closing 입니다. (HTML 은 input 에 닫는게 없어도 되더군요. 다른 문법이랑 헷갈립니다.)

## 자주 쓰이는 태그

**<div>** : 웹페이지의 한 줄을 모두 차지하는 태그입니다.

- 블록 레벨 요소이므로 블록 레벨 요소 안에 다른 블록 레벨 요소나 인라인 요소들을 포함할 수 있습니다. 
- 주로 페이지 전체를 나누는 컨테이너 역할을 하거나, 특정한 요소를 그룹화하는데 사용됩니다.



**<span>** : 웹페이지에서 컨텐츠의 해당 공간만큼만 차지하는 태그입니다. 

- 인라인 요소이므로 텍스트의 특정 부분을 묶어서 스타일을 적용하거나, 특정 부분에 이벤트를 적용할 때 사용됩니다. 
- **또한 다른 인라인 요소 내부에 포함될 수 있습니다.** (만약에 블록레벨 요소를 사용하고 싶다면 `<div>`를 사용하는 것이 적절합니다. )

**<img>** : image 를 삽입하는 태그입니다. 

- `<img src="test.jpg" alt="test">` 와 같이 사용합니다. img 가 로드안될 수도 있으니 alt 를 넣어줍니다. (alternative 인가요?)
- img src 에는 PNG, JPEG, GIF, BMP 등이 있습니다. 특히 gif 로 움짤 등 첨부 가능합니다.

<a href> : 링크를 삽입하는 태그입니다.

- `<a href="https://socceranalyst.net">socceranalyst</a>` 로 적습니다.
- a 태그와 href 는 단짝이니 같이 썼습니다.

**`<ul>, <ol>, <li>`** : 리스트를 나열하는 태그입니다.

ul 은 unOrderedList, ol 은 OrderedList 입니다. 이름에서 나오듯이 순서가 있냐 없냐 입니다.

<ul>
    <li>ul 의 li 1</li>
    <li>ul 의 li 2</li>
    <li>ul 의 li 3</li>
</ul>
<ol>
 	<li>ol 의 li 1</li>
    <li>ol 의 li 2</li>
    <li>ol 의 li 3</li>
</ol>

위 표현이 아래의 HTML 코드입니다.

```html

<ul>
    <li>ul 의 li 1</li>
    <li>ul 의 li 2</li>
    <li>ul 의 li 3</li>
</ul>
<ol>
 	<li>ol 의 li 1</li>
    <li>ol 의 li 2</li>
    <li>ol 의 li 3</li>
</ol>
```

**<input>** :  input 박스입니다. 여러가지 input type을 받을 수 있습니다.

- text : 텍스트를 입력받습니다. <input type="text">

- password : 암호를 입력받습니다. 타이핑하면 `*` 로 보입니다. <input type="password">

- checkbox : 체크박스를 넣습니다. <input type="checkbox">

- radio : 그룹을 설정해서 그룹 중 1개만 선택할 수 있습니다.

  - <div>
        <input type="radio" name="test">Option A
        <input type="radio" name="test">Option B
    </div>

  - name 을 똑같이 넣어줘야 그룹설정이 됩니다.

  - ```html
    <div>
        <input type="radio" name="test">Option A
        <input type="radio" name="test">Option B
    </div>
    ```

- textarea : 텍스트를 입력받습니다. 줄바꿈이 가능합니다. <input type="textarea">

- button : 버튼을 생성합니다. <input type="button">

  



# CSS

---

다음은 css 입니다. 백엔드와 프론트엔드의 선택에서 2번째로 영향을 준 요소입니다... 저는 디자인 감각이 꽝이거든요. 물론 공부하다보니 디자인은 디자이너가 하는거라고 하지만, 그래도 프론트엔드도 어느정도 있어야겠죠? 저는 아마 안될겁니다 하하.. 그래도 이번에 css 기초를 공부하고 제 토이프로젝트 좀 꾸며봐야겠습니다.

**CSS 는 웹 페이지 스타일 및 레이아웃을 정의하는 스타일시트 언어입니다.** 

그전에 UI 와 UX 를 살펴봅시다.

## UI / UX

UI 는 User Interface 로, 프론트가 만드는 클라이언트 사이드라고 볼 수 있겠습니다.

UX 는 User eXperience 로, 사용자가 특정 서비스를 사용하고 경험하면서 직/간접적으로 느끼는 종합적인 만족도를 의미합니다.

즉 좋은 UI 를 통해 UX(만족도) 를 높여야 하고, 이를 위해서 CSS 를 사용합니다.

## CSS 적용하기1

css 를 적용할 HTML 입니다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Modern CSS</title>
    <link rel="stylesheet" href="index.css" />
    <link rel="stylesheet" href="layout.css" />

  </head>
  <body>
    <header>This is the header.</header>
    <div class="container">
      <nav>
        <h4>This is the navigation section.</h4>
        <ul>
          <li>Home</li>
          <li>Mac</li>
          <li>iPhone</li>
          <li>iPad</li>
        </ul>
      </nav>
      <main>
        <h1>This is the main content.</h1>
        <p>...</p>
      </main>
      <aside>
        <h4>This is an aside section.</h4>
        <p>...</p>
      </aside>
    </div>
    <footer>
      <ul>
        <li>개인정보 처리방침</li>
        <li>이용 약관</li>
        <li>법적 고지</li>
      </ul>
    </footer>
  </body>
</html>

```

먼저 css 를 적용하려면 html 문서의 head 에 link 태그를 추가합니다. **(관심사 분리를 위해 html 에 넣지 않습니다.)**

```html
<link rel="stylesheet" href="index.css" />
<link rel="stylesheet" href="layout.css" />
```

css 파일은 주로 xxx.css 파일로 따로 저장합니다. 아래는 예시입니다.

```css
body {
  margin: 0;
  padding: 0;
  background: #fff;
  color: #4a4a4a;
}
header, footer {
  font-size: large;
  text-align: center;
  padding: 0.3em 0;
  background-color: #4a4a4a;
  color: #f9f9f9;
}
nav {
  background: #eee;
}
main {
  background: #f9f9f9;
}
aside {
  background: #eee;
}
```

셀렉터는 모두 태그입니다. 각각 body, header, footer, nav, main, aside 태그에 적용했습니다. 

margin, padding, background, color 등등 모르는 속성은 없네요. 하지만 font-size 와 text-align 은 사용하려고 할 때마다 까먹습니다. 영어를 읽기는 가능한데 쓰는 건 어려운거랑 비슷하다고 해야할까요.

**px, em 의 차이**

`px`는 고정된 크기를 지정할 때 사용하며, `em`은 부모 요소의 크기를 기준으로 크기를 지정할 때 사용합니다.

- px : `font-size: 16px;`는 글자 크기를 16px로 고정합니다. 
- em 
  - `font-size: 1em;`은 부모 요소의 글자 크기를 기준으로 크기를 지정합니다. 부모 요소의 글자 크기가 16px일 경우에는 1em이 16px이 되고, 부모 요소의 글자 크기가 20px일 경우에는 1em이 20px이 됩니다.
  - **이처럼 `em`은 화면 크기에 따라 유동적으로 조절되기 때문에 반응형 웹 디자인에 매우 유용합니다.**

## CSS 적용하기2

다음은 아래와 같은 css 를 적용해봅시다.

```css
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.container {
  display: flex;
  flex: 1;
}
main {
  flex: 1;
  padding: 0 20px;
}
nav {
  flex: 0 0 180px;
  padding: 0 10px;
}
aside {
  flex: 0 0 130px;
  padding: 0 10px;
}
```

모르는 부분만 하나씩 살펴봅시다.

**body**

```cs
body {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
```

- min-height 에 vh 를 사용했습니다.
  - `px` : 고정적인 크기 값을 의미합니다. `px`는 화면 해상도와 관련되어 있으며, 동일한 `px`값을 가지는 요소라도 디바이스 해상도에 따라 크기가 다르게 표시됩니다.
  - `vh` : 뷰포트의 높이에 대한 비율을 나타내며, `100vh`는 현재 보이는 화면의 높이와 같습니다. 이러한 속성을 사용하여 뷰포트 높이를 기반으로 컨텐츠의 높이를 설정할 수 있습니다.
  - 예를 들어, `height: 100px`는 항상 100 픽셀의 높이를 갖는 요소를 만듭니다. 반면에 `height: 100vh`는 화면 높이에 대한 비율을 기반으로 하는 뷰포트 높이에 따라 요소의 높이가 변경됩니다.
  - 모두의 선생님 Egoing 님은 px 는 웬만하면 쓰지 말라고 했었는데요. 제 toyProject 에는 px 가 남발되어있습니다. 다음에 리팩토링할 때 변경해봅시다.
- display: flex; flex-direction: column;
  - `display: flex;` 는 컨테이너를 Flex Container로 만들어줍니다. 
  - `flex-direction: column;` 은 Flex Container 안의 Flex Items들을 세로로 배치하라는 의미입니다.
- flex 관한 설정은 https://hobeen-kim.github.io/learning/css2/ 에서 확인합시다 (과거의 제가 적은 css 정리본입니다. 저만 알아볼 수 있게 정리되어있습니다... ㅎㅎ)

**.container**

```css
.container {
  display: flex;
  flex: 1;
```

- container 클래스의 컨테이너를 Flex Container로 만들어줍니다. 
- `flex-direction` 은 default 값이 row 입니다. 인라인처럼 한 줄로 정렬됩니다.
- `flex : 1;` : 해당 요소가 부모 컨테이너의 높이와 너비를 모두 채우도록 설정합니다. 즉, body 태그의 높이와 너비 중 남는 공간을 모두 채웁니다. header 와 footer 가 가진 공간을 제외하고 다 가진다고 생각하면 됩니다.

**main, nav, aside**

```css
main {
  flex: 1;
  padding: 0 20px;
}
nav {
  flex: 0 0 180px;
  padding: 0 10px;
}
aside {
  flex: 0 0 130px;
  padding: 0 10px;
}
```

모르는 것만 적으려고 했는데 다 적었네요. 네, 다 몰랐습니다.

- `main` 요소는 `flex: 1` 속성을 가지므로, 남은 공간을 모두 차지합니다. 이 요소는 20px의 왼쪽/오른쪽 패딩값을 갖습니다.
- `nav` 요소는 `flex: 0 0 180px` 속성을 가지므로, 고정된 180px의 너비를 갖습니다. 이 요소는 10px의 왼쪽/오른쪽 패딩값을 갖습니다.
- `aside` 요소는 `flex: 0 0 130px` 속성을 가지므로, 고정된 130px의 너비를 갖습니다. 이 요소도 10px의 왼쪽/오른쪽 패딩값을 갖습니다.

flex 는 다음과 같이 설정할 수 있습니다.

```css
flex: <flex-grow> <flex-shrink> <flex-basis>;
```

위 코드는 CSS에서 Flexbox 레이아웃을 사용하여 요소들의 크기와 위치를 조절하는 예시입니다. 각 요소의 flex 속성은 다음과 같이 해석됩니다.

- `main` 요소는 `flex: 1` 속성을 가지므로, 남은 공간을 모두 차지합니다. 이 요소는 20px의 왼쪽/오른쪽 패딩값을 갖습니다.
- `nav` 요소는 `flex: 0 0 180px` 속성을 가지므로, 고정된 180px의 너비를 갖습니다. 이 요소는 10px의 왼쪽/오른쪽 패딩값을 갖습니다.
- `aside` 요소는 `flex: 0 0 130px` 속성을 가지므로, 고정된 130px의 너비를 갖습니다. 이 요소도 10px의 왼쪽/오른쪽 패딩값을 갖습니다.

**`flex` 속성은 아래와 같은 형태로 사용됩니다.**

```css
flex: <flex-grow> <flex-shrink> <flex-basis>;
```

- `flex-grow`: 요소가 늘어나는 비율을 지정합니다. 1 이상의 값이면, 해당 요소는 남은 공간을 모두 채우게 됩니다.
- `flex-shrink`: 요소가 줄어드는 비율을 지정합니다. 1 이상의 값이면, 해당 요소는 다른 요소들보다 빠르게 줄어듭니다.
- `flex-basis`: 요소의 기본 크기를 지정합니다. 기본값은 `auto`이며, 컨텐츠 크기에 따라 자동으로 결정됩니다.

즉, nav 와 aside 는 flex-basis 가 고정된 130px 의 값입니다.

**padding 속성은 아래와 같은 형태로 사용됩니다.**

```css
padding: 10px;
padding: 0 10px;
padding: 10 0px;
```

공부하면서 알았습니다... padding-right, padding-left 를 따로 사용하던 저는 바보였습니다. ㅎㅎ

- `padding: 0 10px;`는 `padding-left: 10px; padding-right: 10px;`와 같은 의미입니다. 
- `padding: 10 0px;`는 `padding-top: 10px; padding-bottom: 10px;`와 같은 의미입니다. 

즉, 좌우 / 상하를 따로 구분해서 사용하고 싶을 때 이렇게 사용합니다.

## 셀렉터 사용

### id 에 스타일링 적용

```html
<!--html-->
<h4 id="title">programming with html</h4>

<!--css-->
<style>
    #title {
      color: red;
    }
</style>
```

- 위와 같이 id 값 앞에 `# ` 를 붙여서 id 값에 대한 css 임을 나타냅니다.
- id는 하나의 HTML 문서 안에서 유일한 값이므로 id 값을 통한 스타일 적용 시 주의해야 합니다.

### class 에 스타일링 적용

```html
<!--html-->
<h4 class="title">programming with html</h4>

<!--css-->
<style>
    .title {
      color: red;
    }
</style>
```

- 위와 같이 id 값 앞에 `# ` 를 붙여서 class 값에 대한 css 임을 나타냅니다.

## 텍스트 꾸미기

글이 너무 길어지고 있으니 아는 내용은 빼면서 가겠습니다.

텍스트를 꾸밀 때도 여러가지 속성을 사용할 수 있는데, 속성만 나열해보겠습니다.

- color : 글자 색상을 변경합니다. `color: rgb(255,255,255)` 

  - 'red', '#ff0000' 로도 사용할 수 있습니다. 저는 rgba 를 선호합니다.

- font-family : 글꼴을 변경합니다. `  font-family: "SF Pro KR", "MalgunGothic", "Verdana";`

  - https://fonts.google.com/ 에 방문해서 글꼴을 @import 해옵시다.

    - ```css
      #아무거나 클릭했습니다. Anuphan 글꼴입니다.
      @import url('https://fonts.googleapis.com/css2?family=Anuphan:wght@100&display=swap');
      .title {
      	font-family: 'Anuphan', sans-serif;
      }
      ```

- font-size: 크기입니다. `font-size: 24rem;` 

  - `rem` vs `em`
    - rem은 root em을 나타내는 단위로, html 요소의 font-size를 기준으로 합니다. em은 부모 요소의 font-size를 기준으로 합니다.
    - rem은 루트(html) 요소의 font-size를 기준으로 크기가 결정되므로, **브라우저에서 사용자가 설정한 글꼴 크기를 변경해도 영향을 받지 않습니다.**
    - em은 부모 요소의 font-size를 기준으로 크기가 결정되므로, 부모 요소의 크기가 변경되면 영향을 받습니다. **예를 들어, 만약 부모 요소의 font-size가 14px이고, 자식 요소의 font-size가 1.5em이라면, 자식 요소의 font-size는 21px이 됩니다. 하지만 만약 부모 요소의 font-size가 16px로 변경된다면, 자식 요소의 font-size도 24px로 변경됩니다.**

- text-align : 텍스트 정렬입니다. left, right, center, justify (양쪽 정렬) 이 있습니다.

- font-weight : 텍스트 굵기입니다. `font-weight  값은 normal, bold, bolder, lighter, 100~900까지의 숫자 값이 올 수 있습니다. 

- text-decoration : 밑줄, 가로줄 등입니다. 값은 underline, overline, line-through, none 등이 올 수 있습니다.

- letter-spacing : 자간 값입니다. 값으로 px, em, rem 등이 올 수 있습니다.

- line-height : 행간 값입니다. 값으로 px, em, rem 등이 올 수 있습니다.

- text-shadow : 텍스트에 그림자 효과를 추가하는 CSS 속성입니다. 텍스트 주위에 그림자를 만들 수 있으며, 그림자는 여러 개 추가할 수 있습니다.

  - ` text-shadow: 2px 3px 4px #000;` : 오른쪽으로 2px, 아래로 3px 떨어진 곳에 그림자 크기가 4px 인 검은색 그림자 추

## 박스 모델

웹페이지의 모든 컨텐츠(태그) 는 고유 영역을 가지고 있습니다. 이 영역을 박스라고 부릅니다.

이 박스는 block, inline, inline-block 으로 구분됩니다.

- **block** 태그는 한 줄 전체를 차지하는 블록 형태의 태그입니다. 대표적인 태그로는 `<div>`, `<p>`, `<h1>`~`<h6>` 등이 있습니다.
- **inline** 태그는 블록 형태가 아니라, 가로 폭만큼만 차지하는 태그입니다. 대표적인 태그로는 `<span>`, `<a>`, `<img>` 등이 있습니다.
- **inline-block** 태그는 inline 태그와 block 태그의 속성을 모두 가지고 있는 태그입니다. 가로 폭만큼 차지하면서, 세로 폭을 지정할 수 있습니다. 대표적인 태그로는 `<input>`, `<button>`, `<label>` 등이 있습니다.

## 박스 사이즈

박스를 구성하는 요소는 Content(내용), Padding, Border, Margin 로 나뉩니다.

**Padding** 

-  안쪽 여백입니다. padding 과 margin 이 헷갈릴 때는 padding 을 입는다고 생각하면 쉽습니다. 패딩은 몸(content) 와 바로 붙어있잖아요? 다른 물체와의 여백인 margin 보다 안쪽입니다.
- 다음과 같이 사용할 수 있습니다.
  - `padding : 10px 20px 30px 40px(상 우 하 좌)` 앞으로 특별한 일 없다면 이렇게 사용하는 게 편할 거 같습니다.

**Border**

- 경계선입니다. `border: 1px solid red;` 과 같이 사용합니다. border-width, border-style, border-color 순서입니다.

- border-style 은 다음과 같은 속성값을 사용할 수 있습니다.

  - `dotted`: 점선
  - `dashed`: 파선
  - `double`: 이중선
  - `groove`: 3D형태의 홈이 파인 듯한 효과
  - `ridge`: 3D형태의 돌출이 파인 듯한 효과
  - `inset`: 3D형태의 내부로 가는 듯한 효과
  - `outset`: 3D형태의 바깥쪽으로 나가는 듯한 효과

- 또한 border 의 top, right, bottom, left 를 따로 구분할 수 있습니다. (당연한건데 쓰면서 생각해보진 않았네요.)

  - ```css
    .title{
        border-top: 2px dashed blue; 
        border-right: 3px dotted green; 
        border-bottom: 4px double purple; 
        border-left: 5px groove orange;
    }
    ```

**Margin**

- border 바깥쪽의 여백입니다. css 는 padding 과 똑같이 적용하면 됩니다.

**박스를 벗어나는 콘텐츠 처리(overflow)**

- 해당 컨테이너에서 `overflow:auto` 속성을 줘서 박스를 벗어나는 콘텐츠는 스크롤처리 할 수 있습니다.
- 속성값은 아래와 같습니다.
  - `overflow: visible`: 요소의 크기보다 커져도 숨기지 않고 보여줍니다. (기본값)
  - `overflow: hidden`: 요소의 크기를 벗어나는 부분을 잘라내고 보여주지 않습니다.
  - `overflow: scroll`: 요소의 크기를 벗어나는 부분을 잘라내고, 스크롤바를 추가해 사용자가 스크롤을 할 수 있도록 합니다.
  - `overflow: auto`: 내용이 요소의 크기보다 커지면 `scroll`과 같이 스크롤바를 추가해주고, 내용이 요소의 크기보다 작으면 `visible`과 같이 스크롤바 없이 내용을 보여줍니다.

### 박스의 크기 측정

중요한 부분입니다. 박스의 크기를 `width : 300px;` 로 해도 크기가 300px 를 넘어갈 수 있습니다. 이유는 크기 측정이 content + padding + border 으로 측정되기 때문입니다.(margin 기본적으로 width 에 포함되지 않습니다.) 300px 는 오직 content 에 대한 크기입니다.

따라서 해당 박스에 `  box-sizing: border-box;` 를 추가하여 width 속성을 border 까지 포함한 box 전체 크기로 변경합니다.

```css
.title{
	width:100px;
	box-sizing: border-box; /* default : content-box */
	padding : 10px;
	border : 5px solid red;
	margin : 10px;
}
```

 Q. 여기서 content-box 일 때와 border-box 일 때 각각의 사이즈는? A. 130px(100+10+10+5+5), 100px 입니다.

<u>**default 값은 content-box 지만 border-box 를 사용하도록 합시다.**</u>



# 추가 : chatGPT

오늘 마지막 시간은 chatGPT 를 활용해 트위터와 비슷한 html 및 css 를 구현하는 거였습니다. 주로 질문을 통해 코드를 구성하는 법을 배웠는데요. 추가로 강의 중간에 openAI 의 API 를 활용한 웹앱 개발이 들어가면 좋겠다고 생각했습니다. 

3주 전인가? 유튜버 조코딩님의 live 강의로 openAI API 를 활용해서 운세보는 웹앱을 만드는 방법을 봤었는데요. Node.js 가 익숙하지는 않았지만 결론적으로는 API 를 활용해서 핵심 로직은 쉽게 따라 만들 수 있었습니다. css 에서부터 개념만 들었구요(디자인 혐오증이 있습니다.) 

일단 저는 chatGPT 가 개발자의 자리를 뺏는 것이 아닌 더욱 발전시켜줄거라 생각하기 때문에 chatGPT 와 GitCopilot 까지 적극 활용하고 있습니다. Test code 는 잘 짜주지만 가끔 바로 위에 있는 대답조차 연결안될 때는 답답하긴 합니다. ㅎㅎ gpt3.5 버전보다 gpt4 버전이 나은 점은 사과를 잘한다는 점이 있습니다.

