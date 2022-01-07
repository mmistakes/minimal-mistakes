---
layout: single
title: Linux - Conceptos
date: 2022-01-07
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
  - linux-conceptos
page_css: 
  - /assets/css/mi-css.css
---

## Conceptos

### Sintaxis de comandos de Shell de Unix/Linux

```bash
$ comando [argumentos...] [opciones...] <recursos>
```

```bash
$ # Prompt - Caracter en la línea de comandos para indicar que está esperando órdenes.
```

```bash
comando # Programa/Software/App a ejecutar
```

```bash
[argumentos...] # Modificadores o datos de entrada 
                # Se usa para especificar algo sobre lo que el comando debe actuar
```

```bash
[opciones...] # Modificadores o datos de entrada 
              # Se usa para modificar el comportamiento de un comando.
```

```bash
<recursos> # 
```



### Directorio de trabajo (Working Directory / wd)

> Directorio sobre el cual se ejecutan los comandos indicado por simbolo $ de la terminal de UNIX/LINUX

#### Ejemplo (Working Directory / wd)

```bash
$ ls # Lista todos los ficheros del (Working Directory / Directorio de Trabajo)
$ ls dir1 # Lista todos los ficheros dentro del directorio 'dir1' del (Working Directory / Directorio de Trabajo)
$ ls ../dir2 # Lista todos los ficheros dentro del directorio padre 'dir2' del (Working Directory / Directorio de Trabajo)
$ ls /home/usuario/dir3 # Lista todos los ficheros de la ruta absoluta del (Working Directory / Directorio de Trabajo)
$ nano fichero.txt # Edita el fichero.txt si existe y si no lo crea usando el programa editor de texto : nano
$ vi fichero.txt #  Edita el fichero.txt si existe y si no lo crea usando el programa editor de texto : vi
```

### Entorno (Environment)

* La clave para la ejecución de un programa es saber su **$PATH**
  * Se trata de una **variable de entorno** que los programas que ejecutas buscan en la **$PATH** para poderse activar
  * Si un programa con un nombre especifico no se encuentra aquí mostrará un mensaje 'Command not found'

```bash
echo $PATH
/home/sysadmin/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
```

* Ver todas las variables de entorno de nuestro sistema

```bash
printenv
```

### Información usuario

* Unix/Linux mantiene la información básica de los usuarios autorizados en los ficheros públicos

```bash
/etc/passwd
/etc/shadow
```

* Sintaxis

```bash
<usuario>:<password>:<uid>:<gid>:<nombre>:<home>:<shell>
```

#### Ejemplo

```bash
daemon:*:17507:0:99999:7:::                                                     
bin:*:17507:0:99999:7:::                                                        
sys:*:17507:0:99999:7:::                                                        
sync:*:17507:0:99999:7:::                                                       
games:*:17507:0:99999:7:::                                                      
man:*:17507:0:99999:7:::                                                        
lp:*:17507:0:99999:7:::
```
