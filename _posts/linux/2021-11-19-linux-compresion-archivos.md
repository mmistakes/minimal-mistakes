---
layout: single
title: Linux - Compresión de Archivos
date: 2021-12-19
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
  - linux-comprimir-archivos
page_css: 
  - /assets/css/mi-css.css
---

## Algoritmos de Compresión de Archivos

### bzip2

* Comprimir un archivo con la extensión .bz2

#### Ejemplo - bzip2

```bash
bzip2 
```

### bunzip2

* Descomprimir un archivo .bz2

#### Ejemplo - bunzip2

```bash
bunzip2
```

### compress

* Comprimir un archivo, produciendo un archivo .Z

#### Ejemplo - compress

```bash
compress
```

### uncompress

* Descompresor de la extensión .Z

#### Ejemplo - uncompress

```bash
uncompress
```

### gunzip

* Descomprimir cualquier archivo .gz o la extensión .Z

#### Ejemplo - gunzip

```bash
gunzip
```

### gzip

* Comprimir un archivo con la extensión .gz

#### Ejemplo - gzip

```bash
gzip
```

#### Ejemplo - Descomprimir archivo

```bash
gzip -d file.gz 
```

* Descomprimir un archivo con la extensión .gz

```bash
gunzip # Descomprimir archivo
```

### tar

* Compresor por excelencia para muchos archivos

```bash
tar # Tape ARchive
```
