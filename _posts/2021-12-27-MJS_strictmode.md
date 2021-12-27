---
layout: single
title: "[MJS] this"
categories: Javascript
tag: [MJS, Javascript, strict mode]
toc: true
author_profile: true
sidebar:
  nav: "docs"
---

# Javascript 개념

**모던 자바스크립트 딥 다이브 정리**

## strict mode

### strict mode

#### **strict mode란?**

> 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.

ESLint 툴을 이용하면 더 강력한 효과(strict mode가 제한하는 오류 + 코딩 컨벤션을 설정 파일로 정의하여 강제)를 얻을 수 있다.

- strict mode 적용

  strict mode 적용은 전역 가장 맨 위, 함수의 가장 맨 위 “use strict”를 추가함으로써 적용할 수 있다.
  strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

  ```jsx
  // 즉시 실행 함수의 선두에 strict mode 적용
  (function () {
    "use strict";

    // Do something...
  })();
  ```

  <br>

- strict mode 에러

  - 암묵적 전역: var, let, const로 선언하지 않아 전역 객체로 정의되어 암묵적 전역이 된 변수 참조할 시 Error
  - 변수, 함수, 매개변수의 삭제: delete 연산자로 변수, 함수, 매개변수를 삭제하면 Error
  - 매개변수 이름의 중복: 중복된 매개변수 이름을 사용하면 Error

<br>

- strict mode 적용 후 변화
  - 일반 함수에서의 this: this에 undefined가 바인딩된다. (non-strict mode 에서는 전역 객체)
  - arguments 객체: 전달된 인수를 재할당해도 반영되지 않는다.
