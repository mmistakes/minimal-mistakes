---
layout: single
title: "React Query란?"
published: true
---

# React Query란

프론트 개발을 하며 API 호출 이후에 데이터를 효과적으로 관리하기 위한 방법을 찾던 중, React Query를 찾았다.
이에 대해 몇 번 스쳐들었을 뿐이기에 이번 포스트를 통해 정확히 어떤 개념인지 알아보자.

<!-- 이미지 -->

[공식문서](https://tanstack.com/query/v5/docs/framework/react/overview)에선 React Query를 다음과 같이 설명하고 있다.

> React Query는 fetching, caching, 서버 데이터와의 동기화를 지원하는 라이브러리

즉, React 환경에서 서버와 지속적으로 동기화 하도록 지원한다.

비동기 데이터를 불러오는 과정에서 발생하는 문제를 해결하는 건데, 어떤 문제들을 어떻게 해결하는지 확인해보자.

# 캐
