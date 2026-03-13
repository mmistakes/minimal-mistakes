---
layout: post
title: "Next.js 서버 컴포넌트(Server Components) 마스터하기"
date: 2026-03-13 10:04:59 +0900
categories: [nextjs]
tags: [study, nextjs, react, frontend, automation]
---

## 왜 이 주제가 중요한가?

Next.js 13+ 버전에서 도입된 서버 컴포넌트는 현대적인 웹 개발의 핵심입니다.

실제 프로젝트에서 서버 컴포넌트를 제대로 활용하면 번들 크기를 줄이고, 데이터베이스에 직접 접근하며, 민감한 정보를 안전하게 관리할 수 있습니다.

클라이언트 컴포넌트와의 경계를 명확히 이해하지 못하면 성능 저하와 예상치 못한 버그가 발생합니다.

## 핵심 개념

- **서버 컴포넌트의 기본 원리**
  기본적으로 모든 컴포넌트는 서버에서 렌더링됩니다. 클라이언트 전용 기능이 필요할 때만 'use client' 지시어를 사용합니다.

- **클라이언트 컴포넌트와의 차이**
  서버 컴포넌트는 상태와 이벤트 리스너를 사용할 수 없지만, 데이터베이스 쿼리와 API 호출을 직접 수행할 수 있습니다.

- **하이브리드 구조의 활용**
  서버 컴포넌트 내에서 클라이언트 컴포넌트를 자식으로 포함할 수 있으며, 이를 통해 최적의 성능을 달성합니다.

- **데이터 페칭 패턴**
  async/await를 서버 컴포넌트에서 직접 사용하여 데이터를 가져오고, 클라이언트에 필요한 데이터만 전달합니다.

- **캐싱과 재검증**
  Next.js는 자동으로 서버 컴포넌트의 결과를 캐시하며, revalidateTag()를 통해 필요시 재검증할 수 있습니다.

## 실습 예제

### 기본 서버 컴포넌트

```javascript
// app/posts/page.js (기본값: 서버 컴포넌트)
export default async function PostsPage() {
  const response = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }
  });
  const posts = await response.json();

  return (
    <div>
      <h1>블로그 포스트</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

위 코드는 서버에서 데이터를 가져오고 렌더링합니다. 클라이언트에는 최종 HTML만 전송됩니다.

### 클라이언트 컴포넌트 포함하기

```javascript
// app/components/LikeButton.js
'use client';

import { useState } from 'react';

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <button onClick={handleLike}>
      좋아요 {likes}
    </button>
  );
}
```

이 컴포넌트는 상태와 이벤트를 사용하므로 'use client' 지시어가 필요합니다.

### 서버 컴포넌트에서 클라이언트 컴포넌트 사용

```javascript
// app/posts/[id]/page.js
import LikeButton from '@/app/components/LikeButton';

export default async function PostDetail({ params }) {
  const response = await fetch(
    `https://api.example.com/posts/${params.id}`,
    { next: { revalidate: 3600 } }
  );
  const post = await response.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <LikeButton postId={params.id} />
    </article>
  );
}
```

서버 컴포넌트에서 데이터를 가져온 후, 인터랙티브한 부분만 클라이언트 컴포넌트로 분리합니다.

## 자주 하는 실수

- **'use client'를 최상위에 작성하기**
  전체 페이지에 'use client'를 붙이면 서버 컴포넌트의 이점을 모두 잃습니다. 인터랙티브한 부분만 클라이언트 컴포넌트로 만드세요.

- **서버 컴포넌트에서 useState 사용하기**
  서버 컴포넌트는 상태를 가질 수 없습니다. 이 코드는 런타임 에러를 발생시킵니다.

- **클라이언트 컴포넌트에서 데이터베이스 직접 접근**
  민감한 데이터베이스 연결 정보가 클라이언트에 노출될 수 있습니다. 항상 서버 컴포넌트나 API 라우트를 거쳐야 합니다.

- **props로 함수 전달하기**
  서버 컴포넌트에서 클라이언트 컴포넌트로 함수를 props로 전달할 수 없습니다. 대신 Server Action을 사용하세요.

- **캐싱 설정을 무시하기**
  fetch 요청에 캐싱 옵션을 명시하지 않으면 예상치 못한 성능 문제가 발생할 수 있습니다.

## 오늘의 실습 체크리스트

- [ ] 새로운 Next.js 프로젝트에서 app 디렉토리 구조 확인하기
- [ ] 기본 서버 컴포넌트 작성하고 데이터 페칭 테스트하기
- [ ] 'use client' 지시어를 사용한 클라이언트 컴포넌트 작성하기
- [ ] 서버 컴포넌트 내에서 클라이언트 컴포넌트를 자식으로 포함하기
- [ ] fetch 요청에 revalidate 옵션 추가하여 캐싱 동작 확인하기
- [ ] 브라우저 개발자 도구에서 번들 크기 비교하기 (서버 vs 클라이언트)
- [ ] 실수 섹션의 5가지 사항 각각 테스트해보기
