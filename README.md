# qoxmfaktmxj.github.io

개발 블로그 자동화 저장소입니다.

- 매일 AI 뉴스 요약 글 1개 자동 생성
- 매일 개발 학습 글 1개 자동 생성(주제 순환)
- Hashnode 스타일 그리드 레이아웃
- 좌측 검색: 제목/본문 검색 후 클릭 이동

## 현재 카테고리

- `AI Daily News`
- `Python`
- `Next.js`
- `Java`
- `SQL` (Oracle/PostgreSQL/MySQL/Redis)
- `Data Infra` (Elasticsearch/Kafka)

## 1회 설정

1. 저장소 시크릿/변수
- `Settings -> Secrets and variables -> Actions`
- `Repository secrets`에 `ANTHROPIC_API_KEY` 추가
- `Repository secrets`에 `TG_BOT_TOKEN`, `TG_CHAT_ID` 추가 (댓글/실패 알림용)
- 선택: `Repository variables`에 `ANTHROPIC_MODEL` 추가
  - 기본값: `claude-haiku-4-5-20251001`

2. GitHub Pages
- `Settings -> Pages`
- Build and deployment -> Source: `GitHub Actions`
- 기본 브랜치는 `main`으로 운영

3. 배포
- `main` 브랜치에 push
- `pages-deploy.yml`: 사이트 배포
- `auto-post.yml`: 매일 `00:00 UTC` 자동 실행 (= KST 09:00) + 수동 실행 가능
- `giscus-comment-alert.yml`: 새 giscus 댓글 발생 시 텔레그램 알림

### 브랜치 운영 정책 (중요)
- 블로그 운영/배포 기준 브랜치는 **main only** 입니다.
- 자동화 워크플로(`auto-post.yml`, `pages-deploy.yml`)도 `main` 기준으로 동작합니다.
- 예외적으로 `main`이 아닌 브랜치를 사용할 경우, PR/커밋/작업 지시에 **대상 브랜치를 명시**해야 합니다.

## 댓글(giscus) 설정

giscus는 GitHub Discussions 기반 댓글입니다.

1. `Settings -> General`에서 Discussions 활성화
2. https://giscus.app/ 에서 레포 선택 후 설정 생성
3. 출력된 값 중 아래를 `_config.yml`에 반영
- `comments.giscus.repo_id`
- `comments.giscus.category`
- `comments.giscus.category_id`
4. 새 댓글 알림은 `.github/workflows/giscus-comment-alert.yml`이 담당합니다.
   - `TG_BOT_TOKEN`, `TG_CHAT_ID`가 있어야 텔레그램 전송 가능
   - `discussion_comment` 이벤트는 기본 브랜치(`main`)에 워크플로가 있어야 동작합니다.

`category_id`가 비어 있으면 댓글 영역에 안내 문구가 표시됩니다.

## 방문자 수(GoatCounter)

정적 블로그이므로 방문자 수는 GoatCounter를 사용합니다.

1. https://www.goatcounter.com/ 에서 사이트 생성
2. 사이트 설정에서 **visitor counts 공개 사용 허용** 활성화
3. 발급받은 코드(예: `example-blog`)를 `_config.yml`의 아래 값에 입력

```yml
goatcounter:
  code: "example-blog"
```

적용 위치:
- 추적 스크립트: `_layouts/default.html`
- 홈 통계 표시: `_includes/visitor-stats.html`, `_layouts/home.html`

## 로컬 테스트

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
export ANTHROPIC_API_KEY=your_key
python scripts/auto_post.py
```

Windows PowerShell:

```powershell
py -3 -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r scripts/requirements.txt
$env:ANTHROPIC_API_KEY="your_key"
py -3 scripts/auto_post.py
```

## 네이버 블로그 이전

네이버 블로그(`qoxmfaktmxj`) 글을 markdown으로 가져옵니다.

```powershell
pip install -r scripts/requirements.txt
py -3 scripts/import_naver_blog.py --blog-id qoxmfaktmxj
```

옵션:
- `--limit 10`: 최신 10개만 이전
- `--no-skip-existing`: 기존 파일이 있어도 다시 생성

