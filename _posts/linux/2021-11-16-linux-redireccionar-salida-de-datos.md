---
layout: single
title: Linux - MetaCaracteres Entrada / Salida
date: 2021-12-16
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
  - linux-metacaracteres
  - linux-entrada
  - linux-salida
page_css: 
  - /assets/css/mi-css.css
---

## Comandos - Metacaracteres de Entrada / Salida

### Standard input (stdin)

```bash
comando < fichero # Redirecciona la entrada del comando para leer el fichero.
```

> Todo lo que contenga el fichero se vera por la terminal

#### Ejemplo - (stdin)

```bash
cat < file.txt # Todo el contenido se muestra por pantalla 
```

### Standard output (stdout)

```bash
comando > fichero # Redirecciona la salida del comando para que todo lo que se escriba quede almacenado en el archivo 
```

#### Ejemplo - (stdout)

```bash
cat > file.txt # Todo lo que escriba quedará almacenado dentro del archivo 
```

### gv

* Ejecutar programa en el 'background' o en6 2º plano

```bash
gv doc.ps & # Programa puede ser ejecutado **de fondo** o en 2º plano añadiendo el simbolo **&** a la línea de comandos
```
