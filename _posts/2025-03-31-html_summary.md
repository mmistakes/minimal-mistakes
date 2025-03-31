# HTML
## 기본 구조
```
<!DOCTYPE html>
<html>
<head>
    <title>내 웹페이지</title>
</head>
<body>
    <h1>안녕하세요! 환영합니다.</h1>
    <p>이것은 나의 첫 번째 웹페이지입니다.</p>
</body>
</html>
```
## 주요 태그
```
<h1>제목 1</h1>
<h2>제목 2</h2>
<p>이것은 단락입니다.</p>
<strong>굵은 텍스트</strong>
<em>기울어진 텍스트</em>
```
## 동영상 추가하기 (YouTube)
```
<iframe width="640" height="360" 
        src="https://www.youtube.com/embed/5l8gIRUfhjc" 
        frameborder="0" allowfullscreen>
</iframe>
```

## 사진 추가하기
- 사진은 assets 폴더에 image 안에 저장 후 해당 이미지 파일 이름을 수정해서 넣기 
```
<!-- 사진 -->
    <img src="me.jpg" alt="내 사진" width="300">
```

## 버튼을 통해 링크 이동
```
<h2>Notion</h2>
<a href="https://www.notion.so/b8b512d45f214d69be0c6b680fa541b8?pvs=4" class="button">Notion</a>
```

# CSS
- HTML의 디자인 담당 (색상, 크기, 레이아웃 조정)
- 깃허브에서 assets/css 폴더에서 파일 업로드 하기

## CSS 버튼 스타일 예제 (1. CSS 파일 저장)
- 해당 내용을 css폴더에서 따로 저장한다.
  
```
/* 버튼 기본 스타일 */
.button {
  display: inline-block;
  padding: 12px 24px;
  font-size: 18px;
  color: #fff;
  background-color: #4CAF50;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* 마우스 올렸을 때 효과 */
.button:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

/* 클릭했을 때 */
.button:active {
  transform: scale(0.98);
}
```

## CSS 버튼 스타일 예제 (2. HTML 코드 수정)
- 아래 코드를 html 파일에 입력한다.

```
    <!-- 블로그 버튼 추가 -->
    <h2>Blog</h2>
    <a href="/blog/" class="button">📚 Blog</a>
```
