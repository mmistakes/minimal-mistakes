---
layout: single
title: Git - Restore & Rm
date: 2021-12-14
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-comandos
  - git-restore
  - git-rm
tags:
  - git-basico
  - git-manual
---

## Git - restore

* Deshace todos los cambios que se hicieron en el archivo desde el **(Working Directory)** después de añadirlo al estado **{Staging Area/Index}**

```git
Changes not staged for commit:
  (use "git restore <file>..." to discard changes in working directory)
```

> El comando indica que los cambios se han realizado desde el (Working Directory) y se han deshecho de ellos en esa zona

## Git - rm

* Saca el archivo del **{Staging Area/Index}** y lo envian al **(Working Directory)** dejando el archivo sin seguimiento/rastreo **(Untracked)**

``git rm --cached h.txt``
