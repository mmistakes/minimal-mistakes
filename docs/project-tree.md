# Jekyll 구조 정리 요약

| 폴더            | 역할                           |
| --------------- | ------------------------------ |
| `.jekyll-cache` | 빌드 캐시                      |
| `_data`         | 사이트/컨텐츠 데이터           |
| `_includes`     | 재사용 가능한 HTML 조각        |
| `_layouts`      | 레이아웃 템플릿                |
| `_pages`        | 정적 페이지 Markdown           |
| `_posts`        | 블로그 포스트 Markdown         |
| `_sass`         | SCSS 소스                      |
| `assets`        | CSS, JS, 이미지 같은 정적 파일 |
| `_site`         | 빌드 결과 (배포용)             |

- _pages > _layouts > _includes
  - `_pages/**.md` 파일 생성 > `layout: --` 설정
    - `_layouts/--.html` 파일과 연결
  - `_layouts/--.html` 파일 내에 `{% include ++.html %}`
    - `_includes/++html` 파일과 연결

<br>

## 1️⃣ 최상위 관련 폴더

- `.jekyll-cache/` → Jekyll 빌드 시 사용하는 **캐시 파일**

  - Markdown 변환, 변환 모듈 등 빌드 속도를 위해 임시 저장

- `.ruby-lsp/` → Ruby 언어 서버 관련 설정/캐시

## 2️⃣ 사용자 콘텐츠 & 데이터

- `_data/` → YAML/CSV/JSON 데이터 파일

  - 예: UI 텍스트, 사이트 설정값, 외부 데이터

- `_includes/` → **재사용 가능한 HTML 조각**

  - analytics-providers, comments-providers, footer, head, search 등
  - `{% include file.html %}`로 삽입 가능

- `_layouts/` → 페이지/포스트 레이아웃 템플릿

  - 예: `default.html`, `single.html`, `archive.html`

- `_pages/` → 정적 페이지

  - 예: 소개 페이지, About, Contact 등

- `_posts/` → 블로그 포스트 Markdown 파일

  - 파일명 형식: `YYYY-MM-DD-title.md`

- `_sass/` → **SCSS 소스 파일**

  - `_sass/minimal-mistakes/` → 테마 SCSS
  - skins, vendor(library) 폴더 포함

## 3️⃣ 정적 자원

- `assets/` → 이미지, CSS, JS 같은 정적 파일

  - `css/`, `images/`, `js/`
  - JS 안에 `lunr/`(검색), `plugins/`, `vendor/jquery/` 포함

## 4️⃣ 빌드 결과

- `_site/` → **빌드 후 생성되는 최종 사이트**

  - 브라우저에 배포되는 HTML, CSS, JS, 이미지가 들어 있음
  - Jekyll이 `_posts`, `_pages`, `_layouts`, `_includes`를 처리하여 생성
