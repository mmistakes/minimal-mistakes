---
layout: single
title: Linux - Comparación de Archivos
date: 2021-12-18
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
  - linux-comparacion
page_css: 
  - /assets/css/mi-css.css
---

## Archivos de Comparación

### cmp - Compara 2 archivos (usualmente archivos binarios) , byte por byte

```bash
cmp archivo1.txt archivo2.txt
archivo-ubuntu.txt archivo-ubuntu2.txt differ: byte 1, line 1
```

### diff - Compara 2 archivos usualmente archivos ASCII , línea por línea

```bash
cmp archivo1.txt archivo2.txt
1c1
< Hola
---
> Adios
```

### kompare - Compara 2 archivos gráficamente

* Es un programa gráfico que necesita ser instalado


