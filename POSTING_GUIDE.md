# Orange Labs 블로그 포스트 작성 가이드

## 📝 포스트 파일 생성

### 파일명 규칙
```
_posts/YYYY-MM-DD-제목.md
```

**예시:**
- `_posts/2026-01-02-도커-컨테이너-최적화.md`
- `_posts/2026-01-15-쿠버네티스-배포-가이드.md`
- `_posts/2026-02-01-파이썬-성능-개선.md`

**주의사항:**
- 날짜는 `YYYY-MM-DD` 형식 필수
- 제목은 한글 또는 영문 가능
- 띄어쓰기는 하이픈(`-`)으로 대체
- 확장자는 `.md` (Markdown)

---

## 🎯 Front Matter (포스트 설정)

파일 맨 위에 `---`로 감싸서 작성합니다.

### 기본 템플릿
```yaml
---
title: "포스트 제목"
date: 2026-01-02T15:00:00+09:00
categories: [카테고리1, 카테고리2]
tags: [태그1, 태그2, 태그3]
excerpt: "포스트 미리보기 텍스트 (150자 이내 권장)"
---
```

### 상세 설명

#### 1. `title` (필수)
- 포스트 제목
- 따옴표로 감싸야 함
```yaml
title: "Docker 컨테이너 최적화 가이드"
```

#### 2. `date` (필수)
- 작성 날짜 및 시간
- 형식: `YYYY-MM-DDTHH:MM:SS+09:00` (한국 시간)
```yaml
date: 2026-01-02T15:30:00+09:00
```

#### 3. `categories` (선택)
- 대분류 카테고리
- 배열 형식 `[카테고리1, 카테고리2]`
- 최대 2개 권장
```yaml
categories: [DevOps, Docker]
categories: [Backend, Python]
categories: [Frontend, React]
```

#### 4. `tags` (선택)
- 세부 태그
- 배열 형식, 여러 개 가능
- 검색 및 필터링에 사용
```yaml
tags: [Docker, Container, 최적화, DevOps]
tags: [Python, 성능개선, 프로파일링]
```

#### 5. `excerpt` (선택)
- 카드에 표시될 요약 텍스트
- 없으면 본문 첫 부분 자동 사용
```yaml
excerpt: "Docker 컨테이너의 크기를 줄이고 성능을 개선하는 5가지 방법을 소개합니다."
```

#### 6. `header` (선택)
- 썸네일 이미지 설정
```yaml
header:
  teaser: /assets/images/docker-optimization.jpg
  overlay_image: /assets/images/docker-header.jpg
```

---

## 📂 카테고리 분류 체계

### 추천 카테고리 구조

```
개발 (Development)
├── Backend
├── Frontend
├── Mobile
└── Full Stack

인프라 (Infrastructure)
├── DevOps
├── CI/CD
├── Cloud
└── Monitoring

시스템 (System)
├── Linux
├── Windows
├── Performance
└── Troubleshooting

데이터 (Data)
├── Database
├── BigData
├── Analytics
└── ML/AI

기타
├── 블로그
├── 공지사항
├── 튜토리얼
└── 리뷰
```

### 카테고리 사용 예시

```yaml
# DevOps 관련
categories: [Infrastructure, DevOps]
tags: [Kubernetes, Docker, CI/CD, Jenkins]

# 백엔드 개발
categories: [Development, Backend]
tags: [Python, Django, API, REST]

# 성능 분석
categories: [System, Performance]
tags: [CPU, 메모리, 프로파일링, 최적화]

# 데이터베이스
categories: [Data, Database]
tags: [PostgreSQL, 쿼리최적화, 인덱싱]
```

---

## ✍️ 본문 작성 (Markdown)

### 기본 문법

#### 제목
```markdown
## 대제목 (H2)
### 중제목 (H3)
#### 소제목 (H4)
```

#### 텍스트 스타일
```markdown
**굵게**
*기울임*
~~취소선~~
`인라인 코드`
```

#### 리스트
```markdown
- 순서 없는 리스트
- 항목 2
  - 하위 항목

1. 순서 있는 리스트
2. 항목 2
3. 항목 3
```

#### 링크
```markdown
[텍스트](https://example.com)
[Orange Labs](https://o5l3.notion.site/)
```

#### 이미지
```markdown
![대체 텍스트](/assets/images/image.jpg)
![아키텍처 다이어그램](/assets/images/architecture.png)
```

#### 인용
```markdown
> 이것은 인용문입니다.
> 여러 줄도 가능합니다.
```

#### 구분선
```markdown
---
```

---

## 💻 코드 블록

### 기본 코드 블록
````markdown
```python
def hello_world():
    print("Hello, World!")
```
````

### 지원 언어
- `python` - Python
- `javascript` - JavaScript
- `bash` - Shell/Bash
- `yaml` - YAML
- `json` - JSON
- `sql` - SQL
- `java` - Java
- `go` - Go
- `rust` - Rust
- `dockerfile` - Dockerfile

### 예시

**Python:**
````markdown
```python
import pandas as pd

df = pd.read_csv('data.csv')
print(df.head())
```
````

**JavaScript:**
````markdown
```javascript
const fetchData = async () => {
  const response = await fetch('/api/data');
  return response.json();
};
```
````

**Bash:**
````markdown
```bash
docker build -t myapp:latest .
docker run -p 8080:8080 myapp:latest
```
````

---

## 🖼️ 이미지 추가

### 1. 이미지 저장 위치
```
assets/images/posts/
```

### 2. 이미지 추가 방법
```markdown
![이미지 설명](/assets/images/posts/screenshot.png)
```

### 3. 이미지 크기 조절
```markdown
![이미지](이미지경로){: width="500"}
![이미지](이미지경로){: .align-center}
```

---

## 📋 완전한 포스트 예시

```markdown
---
title: "Kubernetes 클러스터 구축 완벽 가이드"
date: 2026-01-02T15:00:00+09:00
categories: [Infrastructure, DevOps]
tags: [Kubernetes, K8s, 클러스터, Docker, 컨테이너]
excerpt: "Kubernetes 클러스터를 처음부터 구축하는 방법을 단계별로 설명합니다."
header:
  teaser: /assets/images/posts/k8s-guide.jpg
---

## 개요

Kubernetes는 컨테이너화된 애플리케이션의 배포, 확장 및 관리를 자동화하는 오픈소스 플랫폼입니다.

## 사전 요구사항

- Docker 설치
- Linux 서버 3대 이상
- 최소 2GB RAM

## 설치 단계

### 1. Docker 설치

```bash
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
```

### 2. Kubernetes 설치

```bash
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
sudo apt-get install -y kubelet kubeadm kubectl
```

### 3. 클러스터 초기화

```bash
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```

## 결과

![클러스터 상태](/assets/images/posts/k8s-status.png)

클러스터가 정상적으로 구축되었습니다.

## 참고 자료

- [Kubernetes 공식 문서](https://kubernetes.io/docs/)
- [Docker 문서](https://docs.docker.com/)

---

**작성자**: Orange Labs DevOps Team
**최종 수정**: 2026-01-02
```

---

## 🚀 포스트 게시하기

### 1. Git에 추가
```bash
git add _posts/2026-01-02-새포스트.md
```

### 2. 커밋
```bash
git commit -m "Add: 새 포스트 제목"
```

### 3. 푸시
```bash
git push
```

### 4. 확인
- GitHub Actions가 자동으로 빌드 (1-2분 소요)
- https://o5l3.github.io/OrangeLabs_blog/ 에서 확인

---

## 📌 팁과 권장사항

### 1. 제목 작성
- 명확하고 구체적으로
- 30-60자 이내 권장
- 키워드 포함

### 2. 카테고리와 태그
- 카테고리: 대분류 (최대 2개)
- 태그: 세부 키워드 (3-7개)
- 일관성 유지

### 3. 가독성
- 짧은 문단 (2-3줄)
- 적절한 제목 계층
- 리스트 활용
- 코드 블록 적절히 사용

### 4. 이미지
- 용량 최적화 (500KB 이하 권장)
- 명확한 파일명
- 적절한 대체 텍스트

### 5. SEO
- 의미 있는 파일명
- 적절한 excerpt 작성
- 키워드 자연스럽게 포함

---

## 🔍 자주 묻는 질문

### Q: 포스트가 블로그에 안 보여요
A: 다음을 확인하세요:
- 파일명이 `YYYY-MM-DD-제목.md` 형식인가?
- Front Matter가 올바른가?
- Git push를 했는가?
- GitHub Actions 빌드가 성공했는가?

### Q: 카테고리 페이지가 비어있어요
A: 카테고리는 소문자로 통일하고, 띄어쓰기 없이 작성하세요.

### Q: 이미지가 안 보여요
A: 이미지 경로를 확인하세요. `/assets/images/`로 시작해야 합니다.

---

**작성일**: 2026-01-02
**버전**: 1.0
**문의**: Orange Labs Team
