---
layout: single
title: Git - Switch
date: 2022-03-15
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-switch
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## GIT Switch

* Su **función principal** es cambiar a una **rama específica**

* El **(Working Tree/Arbol de trabajo)** y el **{Staging Area/Indice}** se actualizan para que coincidan con la **rama** , todos los nuevos commits se agregarán al final de esta rama

```bash
git switch <nueva-rama>
```

* Crear una **rama local** que sirva de **rama tracking** y que se sincronice con la **rama principal** de una **rama remota**

```bash
git switch -c <rama-local> --track <rama-remota>/<rama-principal>
```
