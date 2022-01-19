---
layout: single
title: Git - Checkout
date: 2021-12-1
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-checkout
  - git-comandos
tags:
  - git-basico
  - git-manual
---

## Git - checkout

> Todo los cambios que hagamos sobre un archivo que esta **{Tracked/Rastreado}** se realizan desde el **(Working Directory)**

* Elimina los cambios de ``<file>`` que pasan de **{Modified}** a **{Unmodified}**
  * Los cambios que se hagan en **{Modified}** cuando se ejecute este comando se perderán

``git checkout <file>``

* Elimina los cambios de todos los ficheros **{Modified}** desde el estado **(Working Directory)** que pasan a **{Unmodified}** dentro del **{Staging Area/Index}**

``git checkout .``

Cambia **[HEAD]** en si mismo de lugar al que apunta

Reemplazar los cambios locales

* Reemplaza los cambios del **(Working Directory/wd)** con el último contenido del **[HEAD]** , los cambios que ya han sido agregados al **{Staging Area/Index}** como los nuevos archivos , se mantendrán sin cambios

```bash
            flag
              ↓    
git checkout -- <archivo>
```
