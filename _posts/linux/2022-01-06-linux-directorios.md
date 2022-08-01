---
layout: single
title: Linux - Directorios
date: 2022-01-06
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
  - linux-directorio
page_css: 
  - /assets/css/mi-css.css
---

### Crear directorio

* Creamos un directorio

```bash
mkdir <nombre-directorio>
```

### Crear listado de directorios

```bash
mkdir -p <nombre-directorio>
```

### Crear directorio con permisos

* Creamos un directorio y le agregamos los todos los permisos a (usuario,grupo,otros)

```bash
mkir -m 777 /directorio/subdirectorio
```

### Listar Directorios

* Listar ficheros contenidos en el directorio actual o nombrados explicítamente como argumentos

* Sintaxis básica

```bash
ls [opciones] [ficheros]
```

#### Opciones

* Listado en formato largo , incluye permisos , propietario , tamaño , última modificación

```bash
ls -l 
```

* Listar por orden de fecha/hora de la última modificación , el primero al más creciente

```bash
ls -t
```

* Listar en orden inverso

```bash
ls -r 
```

* Lista que incluye el número del nodo-i

```bash
ls -a 
```

```bash
ls -i 
```
