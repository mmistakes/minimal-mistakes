# CHANGELOG.MD - HouuYa's Blog 변경 이력

이 문서는 HouuYa's Blog의 주요 변경 사항을 기록합니다.
[Semantic Versioning](https://semver.org/lang/ko/)을 따릅니다.

---

## [Unreleased] - 계획 중인 변경사항

### 예정된 작업
- 홈페이지 레이아웃 전면 개편
- 타이포그래피 개선 (가독성 향상)
- 반응형 디자인 최적화
- 성능 최적화 (이미지, JS 번들)

---

## [1.2.0] - 2025-01-XX (Homepage Redesign v2)

### Added (추가)
- 히어로 섹션 및 Feature Rows 홈페이지에 추가
- 모던 커스텀 CSS 스타일 추가 (`assets/css/main.scss`)
  - 카드 호버 효과
  - 버튼 그래디언트
  - 유리 변형(Glassmorphism) 마스트헤드
  - 타이틀 그래디언트 효과
- 전역 트랜지션 효과 (0.3s ease)

### Changed (변경)
- 테마 스킨 변경: `air` → `dark`
- 네비게이션 메뉴 구조 개선
- 사이트 설정 및 메타데이터 개선
- README.md 업데이트

### Related Commits
- `77ecf06` Update README.md
- `69a20b5` Merge pull request #1 (homepage-redesign-v2)
- `03146ab` Improve site configuration and metadata
- `ab79e84` Add custom CSS for modern and polished design
- `ca9298a` Improve navigation menu structure
- `4848ae5` Add hero section and feature rows to homepage
- `d590482` Change theme skin from 'air' to 'dark'

---

## [1.1.0] - 2025-XX-XX (콘텐츠 업데이트)

### Added
- Non-coding 프로젝트 포스트 추가
- About 페이지 내용 보강

### Changed
- 프로필 이미지 업데이트
- 포스트 내용 수정

### Related Commits
- `08374e3` Update about.md
- `57f92b9` Update 2025-04-22-non-coding projects.md
- `2a9f591` Update KmGGCvtknK.png

---

## [1.0.0] - 초기 버전

### 기반 설정
- **테마**: Minimal Mistakes Jekyll Theme 4.24.0
- **스킨**: Dark
- **언어**: 한국어 (ko-KR)

### 포함된 콘텐츠
- 블로그 포스트 41개
  - AI 규제 및 정책
  - 제품 안전 관리
  - 기술 표준
  - 독서 리뷰
- 정적 페이지 25개
- 이미지 자산 89개

### 설정된 기능
- Google Analytics (GA4): G-LJKDH2835N
- Google Search Console 인증
- Naver 웹마스터 인증
- Lunr.js 클라이언트 측 검색
- RSS/Atom 피드
- 사이트맵

### 테마 커스터마이징
- 다크 모드 색상 체계
- 사이안(#00adb5) 강조색
- 한글 폰트 지원 (Pretendard 웹 폰트)

---

## 버전 관리 가이드

### 버전 번호 규칙
- **MAJOR.MINOR.PATCH** 형식 사용
- **MAJOR**: 대규모 디자인 변경, 호환성 영향
- **MINOR**: 새 기능 추가, 레이아웃 변경
- **PATCH**: 버그 수정, 작은 스타일 조정

### 변경 유형
- **Added**: 새로운 기능 추가
- **Changed**: 기존 기능 변경
- **Deprecated**: 향후 제거 예정 기능
- **Removed**: 제거된 기능
- **Fixed**: 버그 수정
- **Security**: 보안 취약점 수정

### 커밋 메시지 컨벤션 (권장)
```
<type>: <subject>

<body>

<footer>
```

**Type 종류:**
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅 (동작 변경 없음)
- `refactor`: 코드 리팩토링
- `perf`: 성능 개선
- `test`: 테스트 추가
- `chore`: 빌드/설정 변경

**예시:**
```
feat: 홈페이지에 히어로 섹션 추가

- overlay 이미지와 CTA 버튼 포함
- 반응형 디자인 적용
- 접근성 라벨 추가

Closes #123
```

---

## 브랜치 전략

### 주요 브랜치
- `main`: 프로덕션 배포 브랜치 (GitHub Pages)
- `develop`: 개발 통합 브랜치
- `claude/*`: Claude AI 작업 브랜치

### 브랜치 네이밍
```
<type>/<description>-<issue-number>

예시:
feature/homepage-redesign-v3
fix/card-layout-mobile
style/typography-improvement
```

---

## 릴리즈 체크리스트

배포 전 확인 사항:

- [ ] 로컬 빌드 성공 (`bundle exec jekyll build`)
- [ ] 로컬 서버 테스트 (`bundle exec jekyll serve`)
- [ ] 반응형 디자인 점검 (모바일, 태블릿, 데스크톱)
- [ ] 브라우저 호환성 확인 (Chrome, Firefox, Safari, Edge)
- [ ] 링크 깨짐 확인
- [ ] 이미지 로딩 확인
- [ ] SEO 메타데이터 점검
- [ ] CHANGELOG.MD 업데이트
- [ ] 커밋 메시지 정리
- [ ] PR 생성 및 리뷰

---

## 관련 문서

- [CLAUDE.MD](./CLAUDE.MD) - 프로젝트 가이드
- [TODO.MD](./TODO.MD) - 개선 작업 목록
- [README.md](./README.md) - 프로젝트 소개

---

*마지막 업데이트: 2026-02-04*
