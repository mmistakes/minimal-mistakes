---
layout: single
title: "[JS] Input type='file' 동일값 에러"
categories: JS
tag: [JS, React, Next.JS]
toc: true
---

<img src="/img/2023-07-27/main.jpeg" alt="파일 업로드 이미지">

# 발단

---

LMS 강의 수강 시스템 제작 프로젝트를 진행하면서, 파일의 드래그 앤 드롭 공용 컴포넌트를 제작하면서 생긴 문제였다.
테스트 중, input에 올려둔 파일을 삭제하고, 동일한 파일을 다시 올릴 경우, 파일이 올라가지 않는 문제가 발생했다.

# 원인

---

여러 테스트를 거친 결과, 아래와 같은 결론이 났다.

- 초기 파일 업로드 : onChange 이벤트 발생 O
- 업로드 된 파일 삭제 후, 다른 파일 업로드 : onChange 이벤트 발생 O
- 업로드 된 파일 삭제 후, 동일 파일 업로드 : onChange 이벤트 발생 X

# 해결 방법

---

구글링을 통해 찾아 본 결과,  
onChange 이벤트는 실질적인 내용의 변화가 있을 경우에만 trigger 된다.  
따라서 파일 업로드를 한 후, 동일한 파일을 업로드 한다면 실질적인 파일의 변화가 없기 때문에 이벤트 자체가 발생하지 않는다.  
따라서 이벤트가 발생한 input의 value를 reset 해줘야 한다.

```ts
const onChangeByClick = (e: ChangeEvent<HTMLInputElement>) => {
  storeFiles(e.target.files);
  e.target.value = "";
};
```

## 생각해보기

input 태그에 올려둔 파일을 삭제했을 경우, 이미 발생한 이벤트의 내용 자체는 기억하고 있기 때문에, UI적으로만 사라지고 동일한 파일을 올려도 변화가 없다고 반응하는게 아닌가 하는 생각을 해본다.

### 참고자료

- [jjhstoday.log : [JS] input type="file" 동일 값 업로드하기!](https://velog.io/@jjhstoday/JS-input-typefile-%EB%8F%99%EC%9D%BC-%EA%B0%92-%EC%97%85%EB%A1%9C%EB%93%9C%ED%95%98%EA%B8%B0)
- [raverana96.log : [react] input (file)에 같은 파일 다시 올리기 (+image preview)](https://velog.io/@raverana96/react-input-file%EC%97%90-%EA%B0%99%EC%9D%80-%ED%8C%8C%EC%9D%BC-%EB%8B%A4%EC%8B%9C-%EC%98%AC%EB%A6%AC%EA%B8%B0-image-preview)
