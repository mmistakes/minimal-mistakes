---
layout: single
title: Git - Restore
date: 2021-11-29
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-restore
  - git-comandos
tags:
  - git-basico
  - git-manual
---

## Git - restore

> Revierte el comando git add <archivo> 

Descarta los cambios que se hicieron en los archivos cuando se enviaron al **{Staging Area/Index}** mediante ``git add <archive>`` y ``git commit -m "Mensaje"`` para almacenarlos de nuevo en el **(Working Directory)** con el contenido que tenía el archivo de un principio antes de ejecutar los comandos anteriores

Comando :

```git
git restore <archivo> 
```

* Restaura solo los archivos en el **{Staging Area/Index}** pero no los archivos dentro del **{Working Directory}** del **último commit** mediante

```git
git restore --staged <archivo> 
```

Significa que Git coge el archivo y lo devuelve al estado **(Working Directory)** y lo marca como **(Sin Seguimiento/Untracked)** dentro del **[Repositorio]**
