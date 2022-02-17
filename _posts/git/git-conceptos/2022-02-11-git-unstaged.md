---
layout: single
title: Git - Unstaged
date: 2022-02-16
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-grafo-de-commits
  - git-grafo
  - git-commits
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---
 
## Git - Unstaged

* Es una parte de **{Index/Staging Area/Staged}** donde se mueven los archivos que hemos sacado de un commit mediante el comando ``git reset <commit>``

  * Se considera como una zona intermedia para los archivos que pueden ser modificados y vueltos a añadir al **{Index/Staging Area/Staged}** mediante ``git add <archive>`` o totalmente descartados mediante ``git restore <archive>``
