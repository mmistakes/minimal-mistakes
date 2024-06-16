---
layout: single
title: "git (fatal: refusing-to-merge-unrelated-histories)"
published: true
classes: wide
category: Git
---

# refusing-to-merge-unrelated-histories 에러

로컬 저장소에 있는 프로젝트를 GitHub 저장소로 push할 때, 아래와 같은 에러 메시지가 나타날 수 있다.

```
C:\Users\minho\react-masterclass>
To https://github.com/minhoo03/react-masterclass.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'https://github.com/minhoo03/react-masterclass.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```



이는 현재 로컬 브랜치의 커밋이 원격 저장소의 브랜치보다 뒤처져 있어 발생하는 문제다.

이 문제를 해결하려면 push하기 전에 먼저 pull을 실행하여 원격 저장소의 변경 사항을 로컬 저장소와 병합해야 한다.
이렇게 하면 두 저장소의 이력이 통합되어 이후 push가 성공적으로 이루어질 수 있다.

하지만 pull을 실행해도 아래와 같은 문구가 나오는 경우가 있다.

```
refusing to merge unrelated histories
```

이 경우 다음 명령어를 실행하면 해결된다.

```
git pull origin 브랜치 --allow-unrelated-histories
```

'--allow-unrelated-histories' 옵션은 서로 관련 기록이 없는 두 프로젝트의 이력을 병합할 때 사용된다.

기본적으로 git은 이질적인 두 프로젝트를 병합하는 것을 거부하지만, 이 옵션을 사용하면 이를 허용하여 병합할 수 있다.
