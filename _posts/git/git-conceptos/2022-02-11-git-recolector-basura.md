---
layout: single
title: Git - Recolector Basura
date: 2022-02-11
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

## Recolector Basura ( Garbage Collection)

* Un proyecto por lo general tiene miles de **archivos o directorios** que vamos **modificando** a medida que vamos depurando errores o mejorando el software ; **GIT** y **GITHUB** no registrará todos los **archivos o directorios** en cada confirmación **{commit}** que realicemos , lo que realmente realiza son pequeñas **copias** en su **base de datos** de los **archivos o directorios** que hemos ido modificado , eliminando o añadiendo.

* Este tipo de tareas pueden generar cientos de cambios a **nivel interno/plumbing** de **GIT** sobre todo en los elementos **blog**

* Periódicamente **GIT** realiza la **recolección de basura** en el [Repositorio] , este proceso de empaquetar los objetos en un solo objeto que comprende solo los **'BLOB'** originales y sus deltas posteriores **(partes internas del funcionamiento del GIT)**

* Para ganar eficiencia , el proceso de recolección de basura **(garbage collection)** y se puede forzar a realizar en cualquier momento mediante el siguiente comando

```bash
git gc
```
