---
layout: single
title: Linux - MetaCaracteres Entrada / Salida
date: 2021-12-16
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/linux/tux.png
categories:
  - linux
tags:
  - linux-manual
  - linux-metacaracteres
  - linux-entrada
  - linux-salida
page_css: 
  - /assets/css/mi-css.css
---

## Metacaracteres Entrada / Salida

### Standard input (stdin)

* Redirecciona la entrada del comando para leer el fichero.
  * Todo lo que contenga el fichero se vera por la terminal

```bash
comando < fichero 
```

* Ejemplo

```bash
cat < file.txt # Todo el contenido se muestra por pantalla 
```

### Standard output (stdout)

* Redirecciona la salida del comando para que todo lo que se escriba quede almacenado en el archivo

```bash
comando > fichero 
```

* Ejemplo

```bash
cat > file.txt # Todo lo que escriba quedará almacenado dentro del archivo 
```

### Ejecutar programa en el 'background'

Programa puede ser ejecutado **de fondo** por añadiendo el simbolo **&** a la línea de comandos

```bash
gv doc.ps &
```
