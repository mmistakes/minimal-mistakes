---
title: "[Git] Git merge check"

categories:
  - git
tags:
  - [git,branch,merge]

toc: true
toc_sticky: true


---

[깃 브랜치 전략](https://chanhyukpark-tech.github.io/git/branch-strategy/)
브랜치를 많이 만들다 보면 어떤 브랜치가 이미 merge 가 일어났고, 어떤 브랜치가 아직 merge 가 안되있는지 헷갈리는 경우가 생긴다. 그럴때 특정브랜치 기준으로 어떤 브랜치가 merge가 일어났는지 안일어났는지 check하는 방법을 설명하도록 한다.

git branch 명령은 단순히 브랜치를 만들고 삭제하는 것이 아니다. 아무런 옵션 없이 실행하면 브랜치의 목록을 보여준다
```bash
$ git branch
  iss53
* master
  testing
```
(*) 기호가 붙어 있는 master 브랜치는 현재 Checkout 해서 작업하는 브랜치를 나타낸다. 즉 지금 수정한 내용을 커밋하면 `master` 브랜치에 커밋되고 포인터가 앞으로 한 단계 나아간다.

## check merged?

각 브랜치가 지금 어떤 상태인지 확인하기에 좋은 옵션도 있다. 현재 Checkout 한 브랜치를 기준으로 `--merged` 와 `--no-merged` 옵션을 사용하여 Merge 된 브랜치인지 그렇지 않은지 체크해볼 수 있다.
> git branch --no-merged 
명령을 사용한다.

```bash
$ git branch --merged
  iss53
* master
```

`iss53` 브랜치는 앞에서 이미 Merge 했기 때문에 목록에 나타낸다. (*) 기호가 붙어 있지 않은 브랜치는 git branch -d 명령으로 삭제해도 되는 브랜치다(이미 머지가 완료되었으므로) 삭제해도 정보를 잃지 않는다.

반대로 현재 Checkout한 브랜치에 Merge 하지 않은 브랜치를 살펴보려면 git branch --no-merged 명령을 사용한다

```bash
$ git branch --no-merged
  testing
```

```위에서는 보이지 않았던 브랜치가 보인다. 이 두가지 명령어를 수행하기전에 iss53에서의 commit 내용은  master branch 로 merge 하였고 testing branch 에서 commit 한 내용은 아직 master branch 로 merge 하지 않았다.```

merge 하지 않은 브랜치를 삭제하려면 일반적인 git branch -d [branch] 명령어로는 error 가 발생하기 때문에 
```git branch -D [branch]``` 옵션을 사용하면 강제로 삭제가 가능하다


***


🌜 주관적인 견해가 담긴 글입니다. 다양한 의견이 있으실 경우
언제든지 댓글 혹은 메일로 지적해주시면 감사하겠습니다! 😄

  





