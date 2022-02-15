---
layout: single
title: Git - cat-file
date: 2022-02-15
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-cat-file
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Git - Cat-File

* Este comando se utiliza para ver el contenido de un objeto comprimido ``object`` y su contenido **(blob , tree , commit)** a partir del nombre del objeto en cuestión o su **(hash SHA-1)** , o su **(fracción única - unique fractions)** o su **(etiqueta-tags later)**

```bash
git cat-file --opción <commit>
```

* Mostrar el tipo de objeto que es

```bash
git cat-file -t d6c6521
commit
```

* Mostrar el tamaño del objeto

```bash
 git cat-file -s d6c6521
173
```

* Mostrar todo el contenido del objeto

```bash
git cat-file -p d6c6521
tree 169b460b1d9a7d1275c24bd75dbe8868cfeb5042
author usuario <correo@gmail.com> 1644928954 +0100
committer usuario <correo@gmail.com> 1644928954 +0100
```
