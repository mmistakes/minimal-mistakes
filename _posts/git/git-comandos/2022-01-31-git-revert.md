---
layout: single
title: Git - Revert
date: 2022-01-31
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-revert
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Git Revert

* Deshace los cambios realizados en un **commit** determinado y creando un **nuevo commit** si alterar el **historial de commits**

* Al ejecutar este comando se crea un **nuevo commit** indicándole por **parámetro** un **commit anterior** al que nos encontramos actualmente y lo compara con el **último commit** de la misma **rama** donde se ejecuto el comando **sin alterar** el historial de **commits** del grafo de **commits**

```bash
git revert [--[no-]edit] [-n] [-m parent-number] [-s] [-S[<keyid>]] <commit>…
git revert --continue
git revert --quit
git revert --abort
```

### Opciones

* ``-e`` o ```--edit``
  * Opción por defecto y no necesita ser establecida explícitamente
    * Abre el editor de texto y te permite editar el nuevo mensaje antes del ``commit``
    * Esta opción hace

* ``--no-edit``
  * Evita que deshaga un **commit anterior** y cree uno nuevo
    * En lugar de crear un **nuevo commit**

* ``-n``
  * Deshará los cambios del **commit anterior** y los añadirá al **{Staging Area/Index/Staged}** y al **(Working Directory)**
