# Rust Curriculum Handoff

## Snapshot

- 목적: Rust 시리즈 전체 구조와 예약 발행 상태를 유지한다.
- 현재 상태: Rust 01~08 발행 완료, Rust 09~13 예약 발행 완료
- 다음 우선순위: 코어 로드맵은 채워졌고, 다음 확장 후보는 Rust 14
- 바로 다음 실행 메모: `HANDOFF_NEXT_RUST_POST.md`

## Current State

현재 Rust 시리즈는 아래처럼 두 구간으로 관리한다.

### 공개 완료

1. `Rust 01. 설치와 Hello World 실행하기`
   KOR: `_posts/2026-04-07-rust-install-hello-world.md`
   ENG: `_posts/2026-04-07-rust-install-hello-world-en.md`
2. `Rust 02. rust-analyzer와 CodeLLDB로 디버깅하기`
   KOR: `_posts/2026-04-08-rust-debugging-with-rust-analyzer.md`
   ENG: `_posts/2026-04-08-rust-debugging-with-rust-analyzer-en.md`
3. `Rust 03. 변수, 타입, 제어흐름, 함수 기초`
   KOR: `_posts/2026-04-09-rust-variables-types-control-flow-functions.md`
   ENG: `_posts/2026-04-09-rust-variables-types-control-flow-functions-en.md`
4. `Rust 04. Ownership, Borrowing, Lifetime 기초`
   KOR: `_posts/2026-04-10-rust-ownership-borrowing-lifetimes.md`
   ENG: `_posts/2026-04-10-rust-ownership-borrowing-lifetimes-en.md`
5. `Rust 05. Structs, Enums, Pattern Matching, Traits 기초`
   KOR: `_posts/2026-04-12-rust-structs-enums-pattern-matching-traits.md`
   ENG: `_posts/2026-04-12-rust-structs-enums-pattern-matching-traits-en.md`
6. `Rust 06. Generics, Error Handling, Closures, Iterators 기초`
   KOR: `_posts/2026-04-13-rust-generics-error-handling-closures-iterators.md`
   ENG: `_posts/2026-04-13-rust-generics-error-handling-closures-iterators-en.md`
7. `Rust 07. Modules, Smart Pointers, Concurrency, Async 기초`
   KOR: `_posts/2026-04-14-rust-modules-smart-pointers-concurrency-async.md`
   ENG: `_posts/2026-04-14-rust-modules-smart-pointers-concurrency-async-en.md`
8. `Rust 08. Vec, String, &str, HashMap 기초`
   KOR: `_posts/2026-04-15-rust-vec-string-str-hashmap.md`
   ENG: `_posts/2026-04-15-rust-vec-string-str-hashmap-en.md`

### 예약 발행 완료

9. `Rust 09. Crate, Package, 프로젝트 구조 이해하기`
   date: `2026-04-16 09:00:00 +0900`
   KOR: `_posts/2026-04-16-rust-crates-packages-project-layout.md`
   ENG: `_posts/2026-04-16-rust-crates-packages-project-layout-en.md`
10. `Rust 10. Rust 테스트 기초`
    date: `2026-04-17 09:00:00 +0900`
    KOR: `_posts/2026-04-17-rust-testing-basics.md`
    ENG: `_posts/2026-04-17-rust-testing-basics-en.md`
11. `Rust 11. 파일 I/O와 커맨드라인 입력`
    date: `2026-04-18 09:00:00 +0900`
    KOR: `_posts/2026-04-18-rust-file-io-and-cli-input.md`
    ENG: `_posts/2026-04-18-rust-file-io-and-cli-input-en.md`
12. `Rust 12. Serde로 JSON/TOML 다루기`
    date: `2026-04-19 09:00:00 +0900`
    KOR: `_posts/2026-04-19-rust-serde-json-toml-basics.md`
    ENG: `_posts/2026-04-19-rust-serde-json-toml-basics-en.md`
13. `Rust 13. 작은 CLI 프로젝트 만들기`
    date: `2026-04-20 09:00:00 +0900`
    KOR: `_posts/2026-04-20-rust-build-a-small-cli-project.md`
    ENG: `_posts/2026-04-20-rust-build-a-small-cli-project-en.md`

## Coverage Summary

- 환경과 첫 실행: 01, 02
- 언어 기초와 Rust 고유 개념: 03, 04, 05
- 추상화와 구조: 06, 07
- 실용 데이터 구조: 08
- 실용 프로젝트 전환: 09, 10, 11, 12, 13

현재 시리즈는 `입문 -> 언어 핵심 -> 프로젝트 구조 -> 검증 -> 파일 입력 -> 데이터 포맷 -> 작은 CLI 결과물`까지 이어지는 기본 학습 경로를 갖췄다.

## Scheduling Note

- 2026-04-15 작업 기준으로 새로 작성한 Rust 09~13은 `2026-04-16`부터 `2026-04-20`까지 하루 간격으로 예약했다.
- 예약 시간은 모두 `09:00 +0900`로 통일했다.
- 기존 비-Rust 미래 글은 그대로 유지했다.
- 저장소에는 `.github/workflows/refresh-scheduled-posts.yml`가 있으며, `master` 브랜치 기준 정기 재빌드를 수행하므로 미래 날짜 포스트가 날짜 도달 후 반영될 수 있다.

## Metadata Rules For All Future Rust Posts

- `_posts` 바로 아래에 파일을 둘 것
- KOR/ENG 한 쌍으로 발행할 것
- 같은 `translation_key` 공유
- `section: development`
- `topic_key: rust`
- `categories: Rust`
- `sidebar.nav: "sections"`
- `search: true`
- front matter에 `description`도 함께 넣을 것
- 영어 글에는 명시적 `permalink` 추가
- `_data/seo_descriptions.yml`에 같은 `translation_key`로 설명 추가

## Style Guidance For Future Rust Posts

- 초급 독자를 기준으로 쓸 것
- 설명은 "개념 정의 -> 짧은 코드 -> 왜 필요한지 -> 적용 범위" 순서가 안정적이다
- 사실, 직접 재현, 해석을 섞지 말 것
- 최신성 민감 내용은 `검증 기준일`을 넣을 것
- 버전 의존 내용은 `테스트 환경`, `테스트 버전`을 적을 것
- 이미지가 없어도 되는 글은 코드 중심으로 유지해도 된다

## Validation Checklist Per Post

- `bundle exec jekyll build`
- KOR 포스트 URL 확인
- ENG 포스트 URL 확인
- `/development/rust/` 아카이브 노출 확인
- `/en/development/rust/` 아카이브 노출 확인
- language switch 연결 확인
- `_data/seo_descriptions.yml` 적용 확인
- 검색 페이지에서 제목/핵심 태그 검색 확인

## Optional Next Topics

- `Rust 14. Traits Deep Dive and Trait Objects`
- `Rust 15. Lifetimes in Real APIs`
- `Rust 16. Error Types with thiserror and anyhow`
- `Rust 17. Async Rust with Tokio`
- `Rust 18. Web Basics with Axum or Actix`

코어 입문 로드맵은 13편까지 채워졌으므로, 이후에는 위 확장 주제 중 하나를 선택해 이어 가면 된다.

## Execution Priority

1. 예약된 Rust 09~13이 일정대로 공개되는지 확인
2. 공개 후 아카이브와 language switch 노출 상태를 다시 점검
3. 시리즈를 이어 간다면 Rust 14 초안 작성

## Current Required Action

- 필수 코어 액션 없음
- 다음 새 초안이 필요하면 `Rust 14`부터 시작

## Related File

- `HANDOFF_NEXT_RUST_POST.md`
