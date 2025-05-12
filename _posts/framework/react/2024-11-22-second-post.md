---
layout: single
title: "📘[REACT] Styled Components..."
toc: true
toc_sticky: true
toc_label: "목차"
categories: web
excerpt: "Styled Components 란?"
tag: [react]
---

## 1️⃣ Styled Components란?

**Styled Components**는 `CSS-in-JS` 라이브러리입니다.  
React 컴포넌트 내부에 **직접 스타일을 작성**할 수 있게 도와줍니다.

### 🔍 핵심 특징
- ✅ **컴포넌트 기반** 스타일링  
- ✅ **고유한 클래스 네임** 자동 생성 (해시 기반)  
- ✅ **스타일 충돌 없음**  
- ✅ **JavaScript의 동적 기능** 100% 활용  


---

## 2️⃣ 설치 방법

```bash
npm install --save styled-components
```

또는 Yarn 사용 시

```bash
yarn add styled-components
```

---

## 3️⃣ 주요 장점 

### 💡 1. 컴포넌트 스타일 캡슐화
- 스타일과 UI 로직이 **같은 파일**에 있어 유지보수가 쉬움

### 💡 2. 클래스 네임 충돌 방지
- 자동으로 생성된 해시 class 덕분에 **전역 스타일 간섭 없음**

### 💡 3. 동적 스타일링 지원
- `props`를 활용한 **조건부 스타일** 적용이 가능

```jsx
background: ${props => props.primary ? "blue" : "gray"};
```

### 💡 4. 완전한 JavaScript 사용
- if 문, 변수, 계산 등 자유롭게 사용 가능

### 💡 5. TypeScript와 호환가능
- 타입 안정성과 **자동완성** 제공

---

## 4️⃣ 기본 사용 예제

```jsx
import styled from 'styled-components';

const Button = styled.button\`
  background: \${props => props.primary ? "blue" : "gray"};
  color: white;
  font-size: 1rem;
  padding: 0.6em 1.2em;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.85;
  }
\`;

export default function App() {
  return (
    <>
      <Button primary>Primary Button</Button>
      <Button>Default Button</Button>
    </>
  );
}
```

---