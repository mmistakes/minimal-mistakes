---
layout: single
title: Git - Repositorio Local
date: 2021-12-02
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-repositorio-local
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Git Repositorio Local

Ruta del directorio

``project/.git/objects``

### Directorio .git

* Es un ``directorio oculto`` llamado **.git** que contiene todos los archivos necesarios para que funcione el sistema **Git**

* Es la zona donde se almacenan todos los archivos que se añadieron ``git add`` desde el **{Staging Area}** al [Repo.Local] cuando ejecutamos el comando ``git commit``

* Esta area es donde se guarda todos los archivos creados o modificados :
  
* El [Repo.Local] compara su **último commit** que tiene almacenado y **{Rastreado/Tracked}** con los **nuevos commits** creados que también tiene **{Rastreados/Tracked}** y así ver si las diferencias entre los archivos ayudan a mejorar el proyecto o no

Resumen :

> Utiliza los commits del {Staging Area} y del último commit registrado del [Repo.Local] como punto de control y así poder ver las diferencias entre ambos archivos

* En su interior abarca una estructura básica de archivos y directorios que permite el buen funcionamiento del mismo

```bash
.git/ → Directorio (Repositorio)
```
