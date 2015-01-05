---
layout: post
title: "Measuring Your Shell History"
modified:
categories: ['code']
excerpt: A quick command line demo that shows you how you have used your shell in the past
tags: ['shell', 'awk', 'command-line']
image:
  feature:
date: 2013-11-10T13:54:40-07:00
---

I've had this edition of my macbook pro for 8 months or so and wanted to check out my command line usage. awk to the rescue!

The whole command is along the lines of

`history|awk '{print $2}'|awk 'BEGIN {FS="|"} {print $1}'|sort|uniq -c|sort -n`

Let's break it down. history shows your command line history. In zsh `echo $HISTSIZE` shows 10000, and I'm at about 7500 or so currently. Nice.

Piping it to `awk` with the `{print $2}` command (actually an inline awk program) trims the output of history from `1402 cd dev/project` to `cd`, with `$2` being the second word of each line. Ezpz.

Piping to awk `'BEGIN {FS="|"} {print $1}'` splits the remaining command on pipe, and returns the first part. This gives us the primary command, pre-pipe and sans flags that was used.

`sort` and `uniq` do what you'd expect, with the `-c` flag adding a count before each term, and the `-n` flag sorting numerically.

If you throw a tail on the end, my output looks like this:

<pre>
 127 sed
 151 github
 153 node
 156 cd
 158 brew
 200 hist
 200 subl
 206 cat
 224 heroku
 225 npm
 244 ..
 318 grunt
 438 be
 531 gs
 917 ls
1905 git
</pre>