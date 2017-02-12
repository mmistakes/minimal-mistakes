---
title: "Install GIT"
related: true
header:
  overlay_color: "#333"
  overlay_filter: "0.5"
  overlay_image: /assets/images/caspar-rubin-224229.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/caspar-rubin-224229.jpg
categories:
  - Linux
tags:
  - Git
---

### Useful commands


https://orga.cat/posts/most-useful-git-commands


gitg


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

- Set core editor
```bash
git config --global core.editor "vim"
```

git stash
git stash apply

git graph -a

git log 

rename branch 

git branch -m old new
- M

create branch 
- git co -b


git reset HEAD~1 --hard

cherry-pick

git rebase develop



git config remote.origin.url git@github.com:your_username/your_project.git

https://gist.github.com/jexchan/2351996
git config user.name "jls"
git config user.email "j.luccisano@evs.com"

git fetch

git branch -a

git push --force

git push --set-upstream origin feature/jls-INGFUN-1219-StoryboardLoggingBadVolumeId

git rebase --interactive --root

git commit --amend --date="Sun Feb 12 17:22 2017 +0100"

#### Travis

ssh-keygen -t rsa -b 4096 -C "joseph.luccisano@gmail.com"

gem install travis

/root/.gem/ruby/2.4.0/gems/travis-1.8.8/bin/travis encrypt-file deploy_key --add

