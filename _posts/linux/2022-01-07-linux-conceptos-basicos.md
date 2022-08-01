---
layout: single
title: Linux - Conceptos Básicos
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

## Conceptos Básicos de UNIX/Linux

### Shell (Concepto)

* **Programa informático**
  * Interpreta **ordenes/comandos** a través de una interfaz de usuario para proporcionar al usuario y a otros programas los **servicios** del S.O  

#### Shell (Historia)

* 1º shell en crearse fue la ``shell`` de **Ken Thompson** para las **versiones 1 hasta la 6** de **Unix** llamada ``sh → shell``en 1971 y 1975 en los laboratorios de **Bell Labs**

* **Stephen Bourne** creo otra shell para la **versión de 7** de **Unix** llamada ``Bourne shell → sh`` distribuida en 1979 y la cual añadía muchas más mejoras y conceptos nuevos

* **Brian Fox** creo la **Bourne-Again shell** ``(bash)``como parte del **proyecto GNU** la cual proporcionaba un mayor subconjunto de funcionalidades que la anterior ``Bourne shell → sh`` y la cual fue instalada por defecto en muchos sistemas **Linux**

### Shell Bash

* Programa informático el cual es :
  * **Interfaz de usuario** de **línea de comandos**
  * **Lenguaje de scripting**

### Tipos de Fichero

Se establece cuando se crea el **fichero/archivo** y no se puede cambiar

* Fichero normal **(-)**

* Directorio **(d)**

* Fichero pipe **(p)**

* Enlace simbólico **(|)**

* Dispositivo de almacenamiento por caracteres **(c)**

* Dispositivo de almacenamiento por bloques **(b)**

### Directorio de trabajo (Working Directory / wd)

> Directorio sobre el cual se ejecutan los comandos indicado por simbolo $ de la terminal de UNIX/LINUX

#### Ejemplo ( Working Directory / wd )

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

### Información usuario - Pública

* Unix/Linux mantiene la información básica de los usuarios autorizados en los ficheros públicos

```bash
/etc/passwd
```

#### Ejemplo de Información Pública

```bash
/etc/passwd
bin:x:2:2:bin:/bin:/usr/sbin/nologin                                            
sys:x:3:3:sys:/dev:/usr/sbin/nologin                                            
sync:x:4:65534:sync:/bin:/bin/sync                                              
games:x:5:60:games:/usr/games:/usr/sbin/nologin                                 
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin   
```

* Sintaxis

```bash
<usuario>:<password>:<uid>:<gid>:<nombre>:<home>:<shell>
```

### Información Usuario - Con Contraseña Cifrada

* Unix/Linux mantiene la información Contraseña cifrada de los usuarios autorizados

```bash
/etc/shadow
```

#### Ejemplo - Información Pública

```bash
/etc/shadow
bin:*:17507:0:99999:7:::                                                        
sys:*:17507:0:99999:7:::                                                        
sync:*:17507:0:99999:7:::                                                       
games:*:17507:0:99999:7:::                                                      
man:*:17507:0:99999:7:::   
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

### Árbol de Directorios

* Directorio raíz 'root' donde sistema mantiene todos los componentes que permite el funcionamiento del sistema operativo

```bash
/ 
```

* Administración del sistema
  * Directorio donde se almacena los archivos de configuración del sistema operativo , programas , componentes y aplicaciones
  * Solo debe tener archivos de configuración
  * No debe contener archivos binario

```bash
/etc 
```

* Directorio temporal que almacena los archivos del sistema operativo y demas  aplicaciones

```bash
/tmp
```

* Directorio donde se almacenan los comandos básicos del sistema
  * Contiene los archivos binarios que permite el correcto funcionamiento del sistema a cualquier nivel de ejecución

 ```bash
/bin
# Alternativa
/usr/bin
```

* Contiene todo los dispositivos conectados al sistema sean discos duros , tarjeta de red , particiones , CD-ROM , USB de memoria y que pueda entenderlo como un volumen lógico de almacenamiento
  * Cualquier volumen (partición o dispositivo externo) que este conectado al sistema tendrá asociado el directorio ``/dev``

```bash
/dev
```Concepto de Comandos 

* Contiene los puntos de montaje pero no la información real de los volúmenes montado

```bash
/media
```

* Directorio donde se almacena los comandos propios de la instalación local

```bash
/usr/local
```
