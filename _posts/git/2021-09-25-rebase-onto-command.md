---
title: "[Git] git rebase --onto command"

categories:
  - git 
tags:
  - [git,branch,rebase]

toc: true
toc_sticky: true

---

[깃 브랜치 전략](https://chanhyukpark-tech.github.io/git/branch-strategy/)

# Rebase 의 기초

> Rebase 는 보통 리모트 브랜치에 커밋을 깔끔하게 적용하고 싶을 때 사용한다. 아마 이렇게 Rebase 하는 리모트 브랜치는 직접 관리하는 것이 아니라 그냥 참여하는 브랜치 일 것이다. Rebase와 Merge 두개는 비슷하면서 다르다. 언제 어떤것을 사용할지는 그때의 상황에 따라서 선택하면 된다. 필자는 자신의 Commit을 팀구성원에게 굳이 알릴 필요가 없이 깔끔하게 남기고 싶은 경우에는 rebase를 아니고, 상황상황의 Commit 들을 남기고 싶다면 merge 를 추천한다. Rebase 를 하든지 , Merge 를 하든지 최종 결과물은 같고 커밋 히스토리만 다르다는 것이 중요하다 Rebase 의 경우는 브랜치의 변경사항을 순서대로 다른 브랜치에 적용하면서 합치고 Merge 의 경우는 두 브랜치의 최종 결과만을 가지고 합친다.

# Git --onto command

The correct syntax to rebase B on top of A using git rebase –onto
> Git rebase –onto <newparent> <oldparent>

```bash 
$ git checkout B
$ git rebase –onto A B
```

>To better understand difference between git rebase and git rebase –
onto it is good to know what are the possible behaviors for both
commands. Git rebase allow us to move our commits on top of the
selected branch

![image](https://user-images.githubusercontent.com/69495129/134707748-f7bca28d-3eae-4c4a-8ad4-ddf0978f6281.png)


`git rebase –onto` is more **precises**. It allows us to choose `specific
commit` where we want to start and also where we want to finish.


***


🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우 언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

  





