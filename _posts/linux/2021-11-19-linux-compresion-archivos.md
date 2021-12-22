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

## Compresión de Archivos

### bzip2

* Comprimir un archivo con la extensión .bz2

#### Ejemplo

```bash
bzip2 #
```

### bunzip2

* Descomprimir un archivo .bz2

#### Ejemplo

```bash
bunzip2 #
```

### compress

* Comprimir un archivo, produciendo un archivo .Z

#### Ejemplo

```bash
compress #
```

### uncompress

* Descompresor de la extensión .Z

#### Ejemplo

```bash
uncompress #
```

### gunzip

* Descomprimir cualquier archivo .gz o la extensión .Z

#### Ejemplo

```bash
gunzip # 
```

### gzip

* Comprimir un archivo con la extensión .gz

#### Ejemplo

```bash
gzip # Comprimir archivo
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

```bash
* Puede usar caracteres comodín como '*' , '?'
* c # Crear un archivo
* v # Ver ampliado el contexto
* f # La salida a un archivo seguidamente nombre.
```

#### Sintaxis

```bash
tar cvf tarfile.tar <file1.extension> <file1.extension> ... # Comprime y almacena los archivos <file1> <file2> en el archivo tarfile.tar
```

#### Opciones

```bash
-j # Se utiliza para filtrar el archivo a través de bzip2.
-v # Ejecute el comando en modo detallado para mostrar el progreso del archivo de almacenamiento.
-f # Especifique el nombre del archivo de almacenamiento.
-W # Se utiliza para verificar un archivo de almacenamiento.
-z # Filtrar un archivo a través de la herramienta gzip.
-t # Se utiliza para ver el contenido del archivo de almacenamiento.
-c # Crea un nuevo archivo que contiene los elementos especificados.
-r # Se utiliza para agregar o actualizar un archivo existente con archivos o directorios
-t # Muestra el contenido de un archivo en stdout.
-u # Como -r, pero las nuevas entradas se agregan solo si tienen una fecha de modificación más reciente que la entrada correspondiente en el archivo.
-x # Extrae el archivo de almacenamiento al disco.
```

#### Ejemplo

```bash
tar cvf /media/usb/backup.usuario.jan.tar /suphys/usuario
c # create - crear el archivo
v # verbose - detalles de la creación
f # file - 
```


