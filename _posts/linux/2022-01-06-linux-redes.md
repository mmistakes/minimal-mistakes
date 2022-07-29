---
layout: single
title: Linux - Redes
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
  - linux-redes
page_css: 
  - /assets/css/mi-css.css
---

### Comprobar la disponibilidad

* Envia un paquete al host indicado para comprobar su disponibilidad

```bash
ping <host> 
```

### Obtener Información de un Host

* Muestra un listado con todos los datos del servidor

```bash
whois <host.domain>  
```

#### Ejemplo

```bash
whois linux.org 
```

### Obtener información del DNS

```bash
dig <host.domain> 
```

#### Ejemplo

```bash
dig linux.org
```

### Obtener información del host de búsqueda inversa

```bash
dig -x <host.domain>  
```

### Descargar archivo de Internet

```bash
wget <file>  
```

##### Ejemplo

```bash
wget https://wordpress.org/latest.tar.gz
```

#### Continuar con una descarga detenida

```bash
wget -c <file>  
```
