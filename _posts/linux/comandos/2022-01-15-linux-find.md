---
layout: single
title: Linux - Comando find
date: 2022-01-15
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/linux/tux.jpg
categories:
  - linux
  - linux-comando
  - linux-find
tags:
  - linux-concepto-de-comandos
page_css: 
  - /assets/css/mi-css.css
---

## Comando - find

* Busca en la ruta que le indique la **palabra** o las **palabras** que coincidan con el patrón de búsqueda que le hayamos indicado

  * Acepta **comodines/wildcard** para mejorar la búsqueda

### Opciones

``-name``

* Busca y muestra por pantalla todos los archivos del **directorio actual** y **subdirectorios** que tenga por extensión ``.html``

``find . -name "*.html" -print``

``-mtime``

* Busca y muestra por pantalla todos los archivos del **directorio actual** y **subdirectorios** que tenga por extensión ``.html`` y su tiempo de modificación sea de un día

``find . -name "*.html" -mtime 1``
