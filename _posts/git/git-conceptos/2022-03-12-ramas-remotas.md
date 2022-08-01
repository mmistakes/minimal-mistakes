---
layout: single
title: Ramas Remotas
date: 2022-03-12
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/logo-java-2.jpg
categories:
  - git
  - git-ramas 
  - git-remotas 
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---
 
## Rama Remotas

* Todas las ramas remotas indica cual era la posición de una rama en un repositorio remoto la última vez que nos conectamos con ella

* Se puede identificar mediante

```bash
<remote>/<branch>
# Ejemplo
origin/master
```

* Muestra en donde se encontraba la **rama master** en el **Repositorio Remoto** la última vez que actualizamos el puntero

```bash
                          origin/master
                               |
                               |
                               ↓                              
 ______        ______        ______        ______ 
|  C1  | <--- |  C2  | <--- |  C3  | <--- |  C4  |
|______|      |______|      |______|      |______|
                                              ↑
                                              |
                                            master
```
