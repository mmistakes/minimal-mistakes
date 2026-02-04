# CLAUDE.MD - HouuYa's Blog 프로젝트 가이드

## 프로젝트 개요

**HouuYa's Blog**는 Jekyll 기반의 개인 블로그로, AI 규제, 제품 안전, 기술 표준 분야의 전문 지식을 공유하는 플랫폼입니다.

- **URL**: https://houuya.github.io
- **테마**: Minimal Mistakes 4.24.0 (Dark Skin)
- **소유자**: Seungho Bae (배승호)
- **언어**: 한국어 (ko-KR)

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| 정적 생성기 | Jekyll 4.x |
| 테마 | Minimal Mistakes 4.24.0 |
| CSS 전처리기 | SCSS/SASS |
| 그리드 시스템 | Susy 3.x |
| JavaScript | jQuery 3.6.0 |
| 검색 | Lunr.js (클라이언트 측) |
| 호스팅 | GitHub Pages |
| 분석 | Google Analytics (GA4) |

---

## 디렉토리 구조

```
HouuYa.github.io/
├── _config.yml          # 메인 설정 파일 (★ 핵심)
├── _data/               # 데이터 파일
│   ├── navigation.yml   # 네비게이션 메뉴 설정
│   └── ui-text.yml      # UI 텍스트 (다국어)
├── _includes/           # HTML 컴포넌트 (51개)
│   ├── head.html        # <head> 섹션
│   ├── masthead.html    # 상단 네비게이션
│   ├── footer.html      # 푸터
│   ├── author-profile.html # 저자 프로필
│   └── ...
├── _layouts/            # 레이아웃 템플릿 (14개)
│   ├── default.html     # 기본 레이아웃
│   ├── home.html        # 홈페이지 레이아웃
│   ├── single.html      # 개별 포스트
│   ├── splash.html      # 스플래시 페이지
│   └── ...
├── _pages/              # 정적 페이지 (25개)
│   ├── home.md          # 홈페이지
│   ├── about.md         # 소개 페이지
│   └── ...
├── _posts/              # 블로그 포스트 (41개)
├── _sass/               # SCSS 스타일
│   └── minimal-mistakes/
│       ├── _variables.scss    # 변수 정의
│       ├── skins/_dark.scss   # 다크 테마 색상
│       └── ...
├── assets/
│   ├── css/main.scss    # 커스텀 스타일 진입점 (★ 중요)
│   ├── js/              # JavaScript
│   └── images/          # 이미지 (89개)
├── Gemfile              # Ruby 의존성
└── package.json         # NPM 설정
```

---

## 주요 설정 파일

### _config.yml
```yaml
# 테마 스킨 변경
minimal_mistakes_skin: "dark"  # 가능: default, air, aqua, contrast, dark, dirt, mint, neon, plum, sunrise

# 사이트 기본 정보
title: "HouuYa's Blog"
subtitle: "AI Regulation & Product Safety Insights"
locale: "ko-KR"
url: "https://HouuYa.github.io"

# 저자 정보
author:
  name: "Seungho Bae"
  avatar: "/assets/images/seungho1.jpg"
  bio: "Deputy Director at **KATS**"
```

### assets/css/main.scss
- 커스텀 스타일의 진입점
- 테마 스킨 import 후 커스텀 CSS 추가
- **현재 커스터마이징**: 카드 스타일, 버튼 그래디언트, 마스트헤드 효과

---

## 색상 체계 (Dark Theme)

```scss
// _sass/minimal-mistakes/skins/_dark.scss
$background-color: #252a34;     // 배경색 (진한 회색-파란색)
$text-color: #eaeaea;           // 텍스트 (연한 회색)
$primary-color: #00adb5;        // 주 강조색 (사이안)
$link-color: mix($primary-color, $text-color, 40%);
```

---

## 빌드 및 배포

### 로컬 개발
```bash
# 의존성 설치
bundle install

# 로컬 서버 실행
bundle exec jekyll serve --livereload

# 접속: http://localhost:4000
```

### 배포
- GitHub Pages 자동 배포 (main 브랜치 push 시)
- GitHub Actions 워크플로우 사용

---

## 레이아웃 사용법

### 포스트 작성
```yaml
---
title: "포스트 제목"
categories:
  - Category Name
tags:
  - tag1
  - tag2
layout: single
author_profile: true
toc: true              # 목차 표시
toc_sticky: true       # 스티키 목차
---

본문 내용...
```

### 페이지 작성
```yaml
---
title: "페이지 제목"
layout: single         # 또는 splash, archive 등
permalink: /page-url/
---
```

---

## 현재 문제점 요약

### 1. 홈페이지 UI/UX
- 프로필, 카드, 포스트 목록이 과밀하게 배치됨
- 카드 텍스트 가독성 저하 (폰트 크기, 행간)
- 레이아웃 정돈 필요

### 2. 디자인 일관성
- 섹션 간 여백 불균형
- 카드 크기/스타일 불일치
- 반응형 대응 미흡

### 3. 기능적 문제
- 불필요한 테스트 페이지 존재
- 소셜 링크 미설정
- 댓글 시스템 미활성화

### 4. 성능
- JavaScript 번들 크기 (119.5KB)
- 이미지 최적화 필요

---

## 개발 시 주의사항

1. **커스텀 스타일**: `assets/css/main.scss`에서만 추가
2. **테마 파일 수정 금지**: `_sass/minimal-mistakes/` 직접 수정 지양
3. **이미지 최적화**: WebP 포맷 권장, 적절한 크기로 리사이징
4. **Liquid 문법**: `{% %}` 태그 사용 시 공백 주의
5. **YAML Front Matter**: 들여쓰기 2칸 사용

---

## 참고 자료

- [Minimal Mistakes 공식 문서](https://mmistakes.github.io/minimal-mistakes/)
- [Jekyll 공식 문서](https://jekyllrb.com/docs/)
- [Liquid 템플릿 문법](https://shopify.github.io/liquid/)

---

*마지막 업데이트: 2026-02-04*
