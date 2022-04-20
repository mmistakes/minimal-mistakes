---
layout: single
title: Git - Repositorio Bare
date: 2022-01-19
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-repositorio-bare
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Repositorios Bare - (vació/simple)

* Son repositorios donde no se desarrolla los proyectos , solo se suben cambios realizados en el

* No tiene un **(Directorio de Trabajo/Working Directory)**

* Es un **repositorio simple** sin una copia de trabajo, el contenido de **.git** es de nivel superior para ese directorio.

  * **Solo es un lugar de almacenamiento (no puedes desarrollar allí)**

* Este repositorio no tiene un ``repositorio de origen remoto`` predeterminado

  * Cuando se crea este repositorio **Git** asumirá que el ``repositorio bare`` se usará como ``repositorio origin`` para varios ``usuarios remotos`` por lo que no creará el ``origen remoto predeterminado``
  
  * Las **operaciones básicas** de ``git pull`` y ``git push`` **no funcionarán** en este **repositorio**
    * **Git** asume que sin un **Workspace/Espacio de trabajo** no tendrás la intención de realizar ningún cambio en el **Repositorio Bare**

  * Se suele alojar en **Servidores Remotos** en Internet

  * Se utilizan para compartir desarrollos entre varios desarrolladores , guardar **backups** o **partes de código**

* Se crean con ``git init`` o ``git clone`` usando la opción ``--bare``

* Ejemplo

  ``git bare --init``
  ``git init --bare``
