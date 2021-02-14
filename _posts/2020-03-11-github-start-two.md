---
title: "Github 블로그 Tips (2) - 자주 사용하는 포스팅 기능"
categories:
  - Github Blog
tags:
  - HowToStart
  - toc
  - image
  - text color
toc: true
toc_sticky: true
---

## 2. 자주 사용하는 포스팅 기능

### 2.1 TOC 추가하기

TOC (**table of contents**) 글자 뜻 그대로 포스트 내의 항목들을 보여준다(아래 그림 참고). 

<figure style="width: 90%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/2020-04-16-toc.png" alt="">
</figure>

**minimal-mistakes** 테마에서는 아래 코드와 같이 포스트 상단에 `toc: true` 항목을 추가해주는 것으로 포스트 내에 TOC를 추가할 수 있고, 웹페이지 기준으로 오른쪽 공간 (모바일 기준 페이지 상단)에 위치하는 것을 볼 수 있다. 추가로 `toc_sticky: true` 옵션을 추가할 경우, 페이지를 아래로 스크롤 할 때 TOC 도 동일하게 스크롤 되는 것을 확인할 수 있을 것이다 (**웹페이지 기준**).

>본 테마에서 제공하는 TOC 는 포스트 내의 마크다운 헤더(제목 문단)를 기준으로 자동 생성된다.

```yaml
---
title: "post title"
categories:
  - category A
tags:
  - tag 1
  - tag 2
toc: true
toc_sticky: true
---
```

---

### 2.2 이미지 삽입하기

필자의 경우 아래의 코드를 이용해서 이미지를 삽입한다. **minimal-mistakes** 테마를 이용하는 경우 본인 블로그 폴더 안에 `assets` 라는 폴더가 있을텐데, 다시 그 안에 들어가보면 `images`라는 폴더가 있다. 아래의 코드를 이용해서 이미지를 삽입하고자 하는 경우, 해당 폴더 내에 `my-image-A.png` 라는 이름의 이미지를 넣어두어야 한다.

**Notice:** 이미지 소스 (**img src**) 정보에는 파일의 위치와 이름 뿐 아니라 포맷까지도 포함되기 때문에 본인이 삽입하고자 하는 이미지의 포맷도 제대로 확인한 뒤에 명시해줘야 한다 (**.png, .jpg, .jpeg, .JPG, .bmp**)
{: .notice--warning}

```html
<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/2020-01-07-bellagio.png" alt="">
</figure>
```

<figure style="width: 100%">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/2020-01-07-bellagio.png" alt="">
</figure>

`figure style` 항목에서 `width` 값을 `100%` 로 설정할 경우 화면 폭을 기준으로 이미지의 너비를 결정해준다(<span style="color:#8A0829"><b>원본 이미지의 크기가 기준이 아니다</b></span>). 
>해당 옵션에 대해 픽셀 값으로 (**e.g.** `500 px`) 설정해줄수도 있지만, 위와 같이 화면 비율을 기준으로 설정해놓으면 모바일에서 볼 때나, 페이지 사이즈가 작아져도 이미지 비율을 유지할 수 있다.

또한 다음의 코드처럼 `figure` 옵션에 `class="align-center"` 를 입력해주면 이미지 위치를 지정해줄 수 있고, `figcaption` 옵션을 이용해 간단하게 캡션을 추가할 수도 있다.

```html
<figure style="width: 85%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/2020-01-07-bellagio.png" alt="">
  <figcaption>캡션: Bellagio - Las Vagas</figcaption>
</figure> 
```

<figure style="width: 85%" class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/assets/images/2020-01-07-bellagio.png" alt="">
  <figcaption>캡션: Bellagio - Las Vagas</figcaption>
</figure>

---

### 2.3 글자색 입히기

github 포스트 내의 글자색을 변경하기 위해서는 다음과 같이 `html` 의 기능을 이용해야한다. 

```html
<span style="color:#088A68">글자색 입히기</span>
```

`결과 값:` <span style="color:#088A68">글자색 입히기</span>

본인이 원하는 색상에 대한 코드 값은 **[HTML 컬러 차트](https://html-color-codes.info/Korean/)** 와 같은 사이트에서 고를 수 있다. 다소 불편하기는 하지만 이와 같은 방식을 이용하면 github 포스트에서도 글자 색을 원하는 대로 변경할 수 있다.
>필자의 경우 아래 코드와 같이 특정 문구의 색을 변경할 때, 굵은 글씨체 (**bold**)로 표기해주곤 한다.

```html
<span style="color:#088A68"><b>글자색 입히기</b></span>
```

`결과 값:` <span style="color:#088A68"><b>글자색 입히기</b></span>