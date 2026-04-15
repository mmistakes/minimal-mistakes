# AGENTS.md

- 이 파일은 `_posts` 바로 아래의 기술 블로그 글에 적용한다.
- 새 글이나 개정 글은 `templates/post-template.md`를 기본 골격으로 쓰고, 상세 기준은 `docs/blog-style.md`를 따른다.

## 필수 front matter

- `title`, `date`, `lang`, `translation_key`, `section`, `tags`, `description`를 넣는다.
- `section` 값은 `security`, `development`, `life`만 사용한다.
- 태그 키는 `tag:`가 아니라 `tags:`를 사용한다.
- 영어 미러 글은 `lang: en`과 명시적 `permalink`를 넣는다.
- KOR/ENG 쌍은 같은 `translation_key`를 공유하고, 제목·요약·본문 구조를 크게 어긋나지 않게 맞춘다.

## 필수 본문 섹션

- `## 요약`
- `## 문서 정보`
- `## 문제 정의`
- `## 확인된 사실`
- `## 직접 재현한 결과`
- `## 해석 / 의견`
- `## 한계와 예외`
- `## 참고자료`

## 검증 규칙

- 사실은 출처와 연결하고, 직접 실험은 환경과 결과를 적고, 의견은 의견임을 표시한다.
- 최신성 민감 내용은 `검증 기준일`을 적는다.
- 버전 의존 내용은 `테스트 환경`과 `테스트 버전`을 적는다.
- 검증하지 못한 내용은 삭제하거나 불확실성을 표시한다.

## 저장소 특화 규칙

- 새 글은 `_posts` 바로 아래에 둔다.
- `POSTS` 사이드바가 필요한 글은 `sidebar.nav: "sections"`를 유지한다.
- 시리즈 글은 `topic_key`를 안정적으로 유지해 허브 연결이 끊기지 않게 한다.
- 이미지 alt는 `image`, `img`, `images` 같은 일반 문구 대신 화면 의미가 드러나는 설명형 문구를 쓴다.
- Rust 시리즈의 번호, 제목, permalink, 순서가 바뀌면 `project-docs/handoff/` 아래 관련 문서도 함께 갱신한다.
