---
id: 80
title: Learning experience with git push
date: 2014-07-03T12:42:42+00:00
author: edgriebel
guid: http://www.edgriebel.com/?p=80
permalink: /learning-experience-with-git-push/
image: /wp-content/uploads/2014/07/gitlogo.jpg
categories:
  - Uncategorized
tags:
  - git
---
TL;DR, #1: merges in all branches in a directory/local repo will be pushed regardless of the current branch when push is done, #2 use a new clone “every” time you make a change, #3 git pull is an implicit merge without a commit and shows up in the shared remote repo when local is pushed

So I’ve been doing my merges from our release branch to master in a clone in directory /work. This directory is “clean”, no development taking place or changing files, so I have been reusing this directory, probably not the best practice as I'm about to find out.
<!--more-->

Another developer, "Joe", and I were doing some experimentation, so I went to /work because I knew it was clean and checked out Joe's branch “A”, then did a merge of branch “B” into it to see if we could see changes between the two branches. 

Later on I wanted to move some files from one of my dev branches into  a new branch, so in my clean /work directory I did a git checkout -b new-branch, copied the files over, did git add and git commit of these. Then did a git push origin. 

Turns out, doing a push from the new branch doesn’t only commit the changes on the branch I’m in but in all branches in the local repo that I was sitting in. So the merge I did that was not supposed to be pushed to the repo at all ended up being pushed. Fortunately the merge changes are independent of Joe's existing code on A so no major harm done.
