# Font Style



### 01. font family

`font-family`는 폰트 스타일을 지정하는 속성입니다.

```css
#title {
  font-family: Georgia, "Times New Roman", Times, serif;
}
```

Georgia, "Times New Roman", Times, serif 라는 값을 해석해보자면,

- 브라우저가 Georgia 라는 폰트를 지원해주면 Georgia 폰트로 적용
- Georgia 폰트가 지원되지 않으면, "Times New Roman"을 적용,
- 이것도 지원되지 않으면 Times을 적용
- 앞의 세 가지 폰트가 전부 없으면 serif라는 폰트를 사용하겠다는 뜻입니다.

**주의) "Times New Roman"만 ""(쌍따옴표)로 감싸져 있는데, 폰트 이름에 띄워쓰기가 되어있으면 ""(쌍따옴표)를 사용해야합니다**.

사용자가 어떤 브라우저를 사용할지 모르기 때문에 font-family 값에는 보통 여러가지 폰트를 나열합니다. 가장 뒤에 위치한 serif같은 폰트는 모든 브라우저에서 지원하는 폰트입니다.



### 02. font size

.big-size-font {
  font-size: 50px;
}

`font-size` 는 폰트의 크기를 지정해 줍니다. 폰트 크기 단위는 'px', 'em', 'pt'등 여러가지 있습니다. 

`h1~h5` 태그는 heading(제목)을 주로 작성하는 태그입니다. 1에서 5로 숫자가 커질수록 글씨크기가 점점 작아집니다. 하지만 css에서 폰트크기를 바꿀 수 있습니다.



### 03. font weight

.bold-font {
  font-weight: bold;
}

`font-weight` 는 글씨 두께를 조절하는 property입니다.

- normal, bold, 100, 200, ... 900 등의 값이 지정될 수 있습니다.
- 숫자 400과 normal은 같은 두께입니다.
- 숫자 700과 bold는 같은 두께입니다.
- 보통은 두껍거나 or 아니거나 두가지 경우면 되므로 간편하게 bold 값을 지정합니다.



### 04. font style

a {
  font-style: italic;
}

`font-style` 을 이용하여 글씨 스타일을 바꿀 수 있습니다. italic이라는 값을 지정하면 *이탤릭체*로 변하게 됩니다.



### 05. color

.pink {
  color: pink;
}
.yellow {
  color: yellow;
}

`color`라는 property는 글씨 색깔을 변경해줍니다.

- pink, yellow처럼 텍스트로 누구나 알아보기 쉬운 색깔을 지정할 수 있습니다.
- blue, red, deepskyblue 등 다양한 텍스트 색상이 있습니다.

색상을 표현하는 방법에는 여러가지가 있습니다.

- hex 색상코드: 여섯자리로 표현 - #eb4639
- rgb 값: 빨강, 초록, 파랑으로 표현 - rgb(235, 70, 57),
- hsl: 색상, 채도, 명도*(hue*, *saturation*, *lightness)*로 표현 - hsl(4, 82%, 57%)

아래 세가지는 모두 같은 색입니다.

h1 {
 color: #eb4639;
}
h1 {
 color: rgb(235, 70, 57);
}
h1 {
 color: hsl(4, 82%, 57%);
}
