---
layout: single
title: Linux - Instalación
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
  - linux-instalación
page_css: 
  - /assets/css/mi-css.css
---

## Instalar desde la fuente

### Sistema ./configure

```bash
./configure <app>
```

### Comando make

```bash
make
```

```bash
make install
```

### Instalar paquetes (dpkg) desde Debian

```bash
dpkg -i pkg.deb 
```

### Instalar paquetes (dpkg) desde RPM

```bash
rpm -Uvh pkg.rpm 
```
