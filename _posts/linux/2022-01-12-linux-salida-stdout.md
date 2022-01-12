---
layout: single
title: Linux - Salida (Stdout)
date: 2022-01-12
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/linux/tux.jpg
categories:
  - linux
  - linux-manual
tags:
  - linux-salida
  - linux-stdout
page_css: 
  - /assets/css/mi-css.css
---

## Concepto General

* Los argumentos de un comando suelen indicar la fuente de información de entrada ( o el destino de los resultados de salida )

* Además de los argumentos , un comando **UNIX/Linux** tiene definidos unos canales **(ficheros)** de entrada **(stdin)** y otros de salida **(stdout)**

## Salida Estándar (stdout)

* **stdout** = standard output
  * ( Por defecto la pantalla )

## Salida Estándar de errores (stderr)

* **stderr** = standard error

### Resumen General

```bash
-----------------------------------------------------------------
| Por defecto |    > file      |    >> file      |    >&2       |
-----------------------------------------------------------------
| Pantalla    |   Redirigir    |    Añadir al    |  Combinar    |
|             |   al file      |    file         |  con stderr  |
-----------------------------------------------------------------       
|             |  >! Machaca    |  >>! Crea       |              |
|             |     file       |      un         |              |
|             |     si         |      file       |              |
|             |     existe     |      si no      |              |
|             |                |      existe     |              |
-----------------------------------------------------------------
```
