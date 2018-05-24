---
title: "Install GIT"
related: true
header:
  overlay_image: /assets/images/6-30-12_Git.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/6-30-12_Git.jpg
categories:
  - Linux
tags:
  - Git
---

### Useful commands

[Most useful git commands](https://orga.cat/posts/most-useful-git-commands)

#### My useful commands

```bash
gitg
```
```bash
git graph -a
```

- Rename last commit

```bash
git commit --amend
```
or
```bash
git rebase -i HEAD~1
```

- Squash 2 commits in one

```bash
git rebase -i HEAD~2
```
```bash
git rebase --interactive --root
```

- Set core editor

```bash
git config --global core.editor "vim"
```

- Stash

```bash
git stash
```

```bash
git stash apply
```

```bash
git log 
```

- Rename branch 

```bash
git branch -m old new
```

- Create branch 

```bash
- git checkout -b
```
- Revert last commit

```bash
git reset HEAD~1 --hard
```

- Rebase commit history

```bash
git rebase develop
```

- Config

```bash
git config remote.origin.url git@github.com:your_username/your_project.git
git config user.name "foo"
git config user.email "foo@bar.com"
```

[Most useful git config commands](https://gist.github.com/jexchan/2351996)

- List all branch

```bash
git branch -a
```

- Force overwrite origin

```bash
git push --force
```

- Push and track local branch to origin

```bash
git push --set-upstream origin feature/jls-INGFUN-1219-StoryboardLoggingBadVolumeId
```

- Rewrite commit information

```bash
git commit --amend --date="Sun Feb 12 17:22 2017 +0100"
```

```bash
git filter-branch -f --env-filter "GIT_AUTHOR_NAME='username' GIT_AUTHOR_EMAIL='foo@bar.com'; GIT_COMMITTER_NAME='username'; GIT_COMMITTER_EMAIL='foo@bar.com'"
```

```bash
git filter-branch -f --env-filter 'export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"'
```

```bash
git filter-branch -f --env-filter "GIT_AUTHOR_NAME='username' GIT_AUTHOR_EMAIL='foo@bar.com'; GIT_COMMITTER_NAME='username'; GIT_COMMITTER_EMAIL='foo@bar.com';GIT_COMMITTER_DATE='Sun Feb 12 17:22 2017 +0100';GIT_AUTHOR_DATE='Sun Feb 12 17:22 2017 +0100'"
```

- Checkout a remote branch

```bash
git checkout -b develop origin/develop
```

- Show full log information

```bash
git log --format=fuller
```