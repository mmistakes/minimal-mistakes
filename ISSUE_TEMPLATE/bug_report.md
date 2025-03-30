name: 🐞 버그 리포트
description: 버그를 신고하고 문제를 설명합니다.
title: "[BUG] "
labels: [bug]
assignees: ''

body:
  - type: markdown
    attributes:
      value: |
        아래 항목들을 최대한 자세히 작성해주세요 🙏

  - type: checkboxes
    id: type
    attributes:
      label: 문제 유형
      options:
        - label: 예상한 동작과 다르게 작동함
        - label: 특정 기능이 작동하지 않음

  - type: textarea
    id: reproduction-steps
    attributes:
      label: 재현 방법
      description: 문제를 어떻게 재현할 수 있는지 단계별로 적어주세요.
      placeholder: |
        1. 이 명령어를 실행합니다: `python script.py`
        2. 다음 오류가 발생합니다:
           ```
           Error: File not found.
           ```

  - type: textarea
    id: expected
    attributes:
      label: 기대한 동작
      description: 원래 기대했던 동작을 적어주세요.

  - type: input
    id: environment
    attributes:
      label: 환경 정보
      placeholder: OS, 언어 버전 등 (예: Ubuntu 22.04, R 4.1.2)
