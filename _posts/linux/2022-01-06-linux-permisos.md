---
layout: single
title: Linux - Permisos
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
  - linux-permisos
page_css: 
  - /assets/css/mi-css.css
---

## Permisos de Archivos

* Cambiar los permisos de los archivos al sistema **'octal'**
  * Los cual son separadamente :
    * usuario - **(owner)**
    * grupo - **(group)**
    * otros - **(others)**

* Asignar permisos mediante numeración

* 4 - **read** (r)
* 2 - **write** (w)
* 1 - **execute** (x)

```bash
# Todos los permisos
chmod 777 # leer (r) , escribir (w) , ejecutar (x)
```

```bash
# El usuario actual tiene todos los permisos sobre el archivo
chmod 777 <archive/directorio> # leer (r) , escribir (w) , ejecutar (x)
```

```bash
chmod 755 <archive/directorio> 
# (rwx) - owner → Todos los permisos - leer (r) , escribir (w) , ejecutar (x)
# (rx) - group → Tiene los permisos - leer (r) , ejecutar (x)
# (rx) - others → Tiene los permisos - leer (r) , ejecutar (x)
```
