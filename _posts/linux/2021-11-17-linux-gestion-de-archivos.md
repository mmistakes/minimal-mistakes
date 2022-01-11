---
layout: single
title: Linux - Gestion de Archivos
date: 2021-12-17
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
  - linux-comunicacion
page_css: 
  - /assets/css/mi-css.css
---

## Comandos

### cat

* Concatenar cadenas de texto o mostrar archivos de texto

```bash
cat # Concatenar cadenas de texto o mostrar archivos de texto 
```

#### Ejemplo

```bash
cat abecedario.txt
a-97
 b-98
 c-99
 d-100
 e-101
 f-102
 g-103
 h-104
 i-105
 j-106
 k-107
 l-108
 m-109
 n-110
 o-111
 p-112
 q-113
 r-114
 s-115
 t-116
 u-117
 v-118
 w-119
 x-120
 y-121
 z-122
```

### cd

* Cambiar a otro directorio

```bash
cd ~ # Volver al directorio 'home' del usuario
cd - # Vuelve a la anterior ruta en la que nos encontrábamos antes de cambiarla
cd -- # Te envía al directorio 'home'
cd ../../ # Bajan 2 niveles desde el directorio padre del sistema de archivos
```

### addgroup

* Crea un grupos

```bash
addgroup # Crea un grupo llamado 'migrupo'
```

#### Ejemplo

```bash
sudo addgroup migrupo # Crea un grupo llamado 'migrupo'
Adding group `migrupo' (GID 1000) ...                                           
Done. 
```

### chgrp

* Cambiar el acceso a grupo al que pertenece un archivo

```bash
chgrp # Cambiar el acceso a grupo al que pertenece un archivo
chgrp # [OPTION]… GROUP FILE…
chgrp # [OPTION]… –reference=RFILE FILE…
chgrp migrupo archivo.txt # Cambia la propiedad del grupo de un archivo
-rw-rw-r-- 1 sysadmin migrupo      0 Dec 17 13:43 archivo.txt    
```

#### Ejemplo

```bash
chgrp migrupo archivo.txt # Cambia la propiedad del grupo de un archivo
-rw-rw-r-- 1 sysadmin migrupo      0 Dec 17 13:43 archivo.txt    
```

### chmod

* Cambiar el modo de acceso  

```bash
chmod # Cambiar el modo de acceso  
```

#### Ejemplo

```bash
chmod go-rwx file1 # Hace visible a otros usuarios
```

### stat

* Para mostrar toda la información del nodo-i de un archivo

```bash
stat archivo.ext
```

### chown

* Cambia el propietario del archivo

```bash
chown # Cambia el propietario del archivo
```

#### Ejemplo

```bash
chown root archivo.txt
-rw-rw-r-- 1 root     migrupo      0 Dec 17 13:43 archivo.txt
```

### cp

* Copia el archivo

```bash
cp # Copia el archivo
```

#### Ejemplo

```bash
cp archivo1 archivo2
```

### hd

* Vuelca el contenido de un archivo mostrando las versiones hexadecimal y ASCII

```bash
hd # Volcar el contenido de un archivo mostrando las versiones hexadecimal y ASCII
hd list.txt # Volcar el contenido de un archivo mostrando las versiones hexadecimal y ASCII
00000000  61 2d 39 37 0a 20 62 2d  39 38 0a 20 63 2d 39 39  |a-97. b-98. c-99|
00000010  0a 20 64 2d 31 30 30 0a  20 65 2d 31 30 31 0a 20  |. d-100. e-101. |
00000020  66 2d 31 30 32 0a 20 67  2d 31 30 33 0a 20 68 2d  |f-102. g-103. h-|
00000030  31 30 34 0a 20 69 2d 31  30 35 0a 20 6a 2d 31 30  |104. i-105. j-10|
00000040  36 0a 20 6b 2d 31 30 37  0a 20 6c 2d 31 30 38 0a  |6. k-107. l-108.|
00000050  20 6d 2d 31 30 39 0a 20  6e 2d 31 31 30 0a 20 6f  | m-109. n-110. o|
00000060  2d 31 31 31 0a 20 70 2d  31 31 32 0a 20 71 2d 31  |-111. p-112. q-1|
00000070  31 33 0a 20 72 2d 31 31  34 0a 20 73 2d 31 31 35  |13. r-114. s-115|
00000080  0a 20 74 2d 31 31 36 0a  20 75 2d 31 31 37 0a 20  |. t-116. u-117. |
00000090  76 2d 31 31 38 0a 20 77  2d 31 31 39 0a 20 78 2d  |v-118. w-119. x-|
000000a0  31 32 30 0a 20 79 2d 31  32 31 0a 20 7a 2d 31 32  |120. y-121. z-12|
000000b0  32 0a 20                                          |2. |
000000b3
```

### head  

* Mostrar las primeras líneas de un archivo

```bash
head # Mostrar las primeras líneas de un archivo
```

#### Ejemplo

```bash
head abecedario.sh                              

#!/bin/sh                                                                       
for i in $(seq 97 122); do                                                      
   printf "\\$(printf %o $i)-$i\n "                                             
done   
```

### less

* Mostrar un archivo por pagina

```bash
less # Mostrar un archivo por pagina
ls -lha | less # Utilizar este comando acompañado de otros que se usen para listar directorios o archivos 
```

### ln

* Crea un enlace simbolico hacia el archivo al que apunte 'ambos elementos comparten el mismo contenido'

```bash
ln # Crea un enlace simbolico hacia el archivo al que se referencie 'ambos elementos comparten el mismo contenido'
ln abecedario.txt otro-abecedario.txt # Ahora "otro-abecedario.txt" apuntará al mismo contenido que "abecedario.txt"
```

### mkdir

* Crear un directorio

```bash
mkdir # Crear un directorio
mkdir nuevo_directorio
```

### mv

* Mover y Renombrar archivo

```bash
mv # Mover y Renombrar archivo
mv archivo1 ../ # Subir un nivel desde el directorio padre en el sistema de archivo
mv archivo1 archivo2 # Renombrar el archivo1 al nombre del archivo2
```

### pwd

* Mostrar la ruta absoluta de donde me encuentro en el directorio de trabajo (Working Directory)

```bash
pwd # Mostrar la ruta absoluta de donde me encuentro en el directorio de trabajo (Working Directory)
```

### rm

* Eliminar archivos

```bash
rm # Eliminar archivos
rm -fr archivo # Borra de forma recursiva y forzada un archivo
```
