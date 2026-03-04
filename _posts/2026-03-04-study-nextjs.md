---
layout: post
title: "Next.js 서버 컴포넌트(Server Components) 완벽 이해하기"
date: 2026-03-04 10:03:59 +0900
categories: [nextjs]
tags: [study, nextjs, react, frontend, automation]
---

## 왜 이 주제가 중요한가?

Next.js 13 이후 서버 컴포넌트는 React의 패러다임을 바꿨습니다. 실제 프로젝트에서 성능, 보안, 번들 크기를 동시에 개선할 수 있는 핵심 기술입니다.

클라이언트에서 처리하던 데이터 페칭과 렌더링을 서버로 옮기면서 불필요한 JavaScript를 줄일 수 있습니다. 이는 초기 로딩 속도와 사용자 경험을 크게 향상시킵니다.

## 핵심 개념

- **서버 컴포넌트(Server Component)**
  기본적으로 서버에서만 실행되며 클라이언트에 JavaScript를 보내지 않습니다. 데이터베이스 접근, API 키 보호, 대용량 라이브러리 사용에 최적화되어 있습니다.

- **클라이언트 컴포넌트(Client Component)**
  'use client' 지시어로 명시하며 브라우저에서 실행됩니다. 상태 관리, 이벤트 리스너, 훅(useState, useEffect 등)이 필요한 경우 사용합니다.

- **컴포넌트 경계(Component Boundary)**
  서버와 클라이언트 컴포넌트는 명확히 분리되어야 합니다. 서버 컴포넌트는 클라이언트 컴포넌트를 자식으로 가질 수 있지만, 역은 불가능합니다.

- **데이터 페칭 패턴**
  서버 컴포넌트에서 직접 async/await로 데이터를 가져옵니다. 클라이언트 컴포넌트는 useEffect나 라이브러리(SWR, React Query)를 사용합니다.

- **점진적 마이그레이션**
  기존 프로젝트에서 모든 컴포넌트를 한 번에 바꿀 필요 없습니다. 필요한 부분부터 서버 컴포넌트로 전환할 수 있습니다.

## 실습 예제

### 1단계: 기본 서버 컴포넌트 작성

```typescript
// app/posts/page.tsx - 서버 컴포넌트 (기본값)
async function PostsList() {
  const response = await fetch('https://api.example.com/posts', {
    cache: 'revalidate',
    next: { revalidate: 3600 }
  });
  const posts = await response.json();

  return (
    <div>
      <h1>게시물 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
```

### 2단계: 클라이언트 컴포넌트 추가

```typescript
// app/components/PostFilter.tsx
'use client';

import { useState } from 'react';

export function PostFilter() {
  const [filter, setFilter] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="검색..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <p>현재 필터: {filter}</p>
    </div>
  );
}
```

### 3단계: 서버와 클라이언트 조합

```typescript
// app/posts/page.tsx - 수정된 버전
import { PostFilter } from '@/app/components/PostFilter';

async function PostsList() {
  const response = await fetch('https://api.example.com/posts');
  const posts = await response.json();

  return (
    <div>
      <h1>게시물 목록</h1>
      <PostFilter />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
```

이 예제에서 PostsList는 서버에서 데이터를 가져오고, PostFilter는 클라이언트에서 상태를 관리합니다.

## 흔한 실수

- **서버 컴포넌트에서 훅 사용**
  useState, useEffect, useContext 등은 클라이언트 컴포넌트에서만 사용 가능합니다. 'use client'를 빼먹으면 런타임 에러가 발생합니다.

- **클라이언트 컴포넌트에서 서버 함수 직접 호출**
  서버 전용 함수(데이터베이스 접근 등)를 클라이언트 컴포넌트에서 직접 사용할 수 없습니다. API 라우트나 Server Action을 거쳐야 합니다.

- **Props로 직렬화 불가능한 객체 전달**
  서버 컴포넌트에서 클라이언트 컴포넌트로 함수나 Date 객체를 직접 전달하면 에러가 발생합니다. 직렬화 가능한 데이터만 전달해야 합니다.

- **과도한 서버 컴포넌트 중첩**
  서버 컴포넌트가 많을수록 초기 렌더링 시간이 늘어날 수 있습니다. 필요한 부분만 서버 컴포넌트로 유지하세요.

- **캐싱 전략 무시**
  fetch 옵션에서 cache와 revalidate를 설정하지 않으면 예상치 못한 동작이 발생할 수 있습니다.

## 오늘의 실습 체크리스트

- [ ] Next.js 프로젝트에서 app 디렉토리 구조 확인하기
- [ ] 기본 서버 컴포넌트 작성하고 데이터 페칭 테스트하기
- [ ] 'use client' 지시어를 사용한 클라이언트 컴포넌트 작성하기
- [ ] 서버 컴포넌트에서 클라이언트 컴포넌트로 props 전달해보기
- [ ] 브라우저 DevTools에서 번들 크기 비교 (서버 vs 클라이언트 컴포넌트)
- [ ] 하나의 페이지에서 서버와 클라이언트 컴포넌트를 함께 사용하는 예제 구현하기
