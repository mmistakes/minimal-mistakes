# 📘 블로그 빠른 시작 가이드 (Quick Start)

## 🚀 5분만에 시작하기

### 1단계: 포스트 파일 만들기 (1분)

```bash
# 오늘 날짜로 파일 생성
touch _posts/2026-01-10-내-첫-포스트.md
```

### 2단계: 기본 내용 작성 (2분)

파일을 열고 다음을 복사해서 붙여넣기:

```markdown
---
title: "내 첫 번째 포스트"
date: 2026-01-10T14:00:00+09:00
categories: [블로그, 테스트]
tags: [첫포스트, 테스트]
excerpt: "안녕하세요! 첫 포스트입니다."
---

## 안녕하세요!

Orange Labs 블로그에 오신 것을 환영합니다.

### 오늘 배운 것

- Jekyll 블로그 사용법
- 마크다운 문법
- Git 기본 명령어

## 다음 계획

더 많은 기술 글을 작성하겠습니다!
```

### 3단계: Git 올리기 (2분)

```bash
git add _posts/2026-01-10-내-첫-포스트.md
git commit -m "Add: 내 첫 포스트"
git push
```

### 4단계: 확인하기

1-2분 후 https://o5l3.github.io/OrangeLabs_blog/ 접속!

---

## 📝 자주 쓰는 템플릿

### 기술 튜토리얼 템플릿

```markdown
---
title: "[기술명] 설치 및 사용 가이드"
date: YYYY-MM-DDTHH:MM:SS+09:00
categories: [Development, Backend]
tags: [기술명, 설치, 튜토리얼]
excerpt: "[기술명]을 설치하고 기본 사용법을 알아봅니다."
---

## 개요

[기술 간단 소개]

## 사전 요구사항

- 요구사항 1
- 요구사항 2

## 설치 단계

### 1. 첫 번째 단계

\```bash
명령어
\```

### 2. 두 번째 단계

설명...

## 사용법

\```언어
코드 예제
\```

## 결론

정리 및 다음 단계
```

### 문제 해결 템플릿

```markdown
---
title: "[문제] 해결 방법"
date: YYYY-MM-DDTHH:MM:SS+09:00
categories: [System, Troubleshooting]
tags: [문제해결, 에러, 해결방법]
excerpt: "[문제]를 해결한 경험을 공유합니다."
---

## 문제 상황

무슨 문제가 발생했는지...

## 증상

- 증상 1
- 증상 2

## 원인 분석

원인 설명...

## 해결 방법

### 방법 1: XXX

\```bash
해결 명령어
\```

### 방법 2: YYY

대안 방법...

## 결과

해결 후 상태...

## 재발 방지

예방 방법...
```

### 코드 리뷰/분석 템플릿

```markdown
---
title: "[주제] 코드 분석"
date: YYYY-MM-DDTHH:MM:SS+09:00
categories: [Development, Backend]
tags: [코드리뷰, 분석, 최적화]
excerpt: "[주제] 코드를 분석하고 개선점을 찾아봅니다."
---

## 배경

왜 이 코드를 분석하게 되었는지...

## 기존 코드

\```python
기존 코드
\```

## 문제점

- 문제 1
- 문제 2

## 개선된 코드

\```python
개선된 코드
\```

## 성능 비교

| 항목 | 기존 | 개선 |
|------|------|------|
| 속도 | 10s  | 2s   |

## 결론

배운 점...
```

---

## 🎨 카테고리 선택 가이드

### 어떤 카테고리를 써야 할까?

```
프로그래밍 관련
→ [Development, Backend/Frontend/Mobile]

서버/배포 관련
→ [Infrastructure, DevOps/Cloud]

시스템 분석/최적화
→ [System, Performance/Troubleshooting]

데이터베이스/데이터 처리
→ [Data, Database/Analytics]

일반적인 글
→ [블로그, 공지사항/튜토리얼]
```

### 태그 선택 팁

1. **기술명**: Kubernetes, Docker, Python
2. **도구명**: Jenkins, GitHub Actions, VSCode
3. **키워드**: 최적화, 튜토리얼, 에러해결
4. **플랫폼**: AWS, GCP, Linux

---

## 🖼️ 이미지 추가 빠른 가이드

### 1. 이미지 저장

```bash
# 폴더 생성
mkdir -p assets/images/posts/2026-01

# 이미지 복사
cp ~/Downloads/screenshot.png assets/images/posts/2026-01/
```

### 2. 포스트에 삽입

```markdown
![설명](/assets/images/posts/2026-01/screenshot.png)
```

### 3. Git에 추가

```bash
git add assets/images/posts/2026-01/screenshot.png
```

---

## ⚡ 자주 쓰는 마크다운

### 제목
```markdown
## 큰 제목
### 중간 제목
#### 작은 제목
```

### 강조
```markdown
**굵게**
*기울임*
`코드`
~~취소선~~
```

### 리스트
```markdown
- 항목 1
- 항목 2
  - 하위 항목

1. 첫 번째
2. 두 번째
```

### 코드 블록
````markdown
```python
def hello():
    print("Hello!")
```
````

### 링크
```markdown
[Orange Labs](https://o5l3.notion.site/)
```

### 테이블
```markdown
| 항목 | 값 |
|------|-----|
| CPU  | 80% |
| 메모리 | 4GB |
```

### 인용
```markdown
> 중요한 내용
> 인용문
```

---

## 🔧 문제 해결

### 포스트가 안 보여요

✅ **체크리스트:**
- [ ] 파일명이 `YYYY-MM-DD-제목.md` 형식인가?
- [ ] Front Matter가 `---`로 감싸져 있나?
- [ ] `git push` 했나?
- [ ] GitHub Actions 성공했나?
- [ ] 날짜가 미래가 아닌가?

### 이미지가 안 보여요

✅ **체크리스트:**
- [ ] 경로가 `/assets/images/`로 시작하나?
- [ ] 이미지 파일을 Git에 추가했나?
- [ ] 파일명에 공백이나 한글이 없나?

### 스타일이 이상해요

```bash
# 브라우저 캐시 삭제
Ctrl + Shift + R (Windows)
Cmd + Shift + R (Mac)
```

---

## 📞 도움말

### 더 자세한 가이드

- `BLOG_GUIDE.md` - 완벽 가이드
- `POSTING_GUIDE.md` - 포스트 작성 상세 가이드

### 공식 문서

- Jekyll: https://jekyllrb.com/
- Minimal Mistakes: https://mmistakes.github.io/minimal-mistakes/

### 연락처

- Notion: https://o5l3.notion.site/

---

**문서 버전**: 1.0
**최종 수정**: 2026-01-02
