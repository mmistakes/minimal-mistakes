---
layout: single
title: Linux - Variables Shell
date: 2022-01-14
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/linux/tux.jpg
categories:
  - linux
  - linux-variables-shell
tags:
  - linux-concepto-de-comandos
page_css: 
  - /assets/css/mi-css.css
---

## Selección de la shell

* Cada usuario tiene una ``shell`` por defecto para interactuar con el sistema operativo

* La shell por defecto en Ubuntu ``20.04`` es ``/bin/bash``
  * Se puede ver en la última línea de registro del usuario en el fichero ``/etc/passwd``

* Se puede cambiar la ``shell`` por defecto usando la ``chsh``

## Inicialización de la shell

* Los ficheros de inicialización de la ``shell`` residen en el directorio ``base del usuario``

* Existen ficheros de **inicialización globales** para todos los usuarios

* Tienen nombres predeterminados e inicialización de sesión para el usuario
  * Ejemplo ``$HOME/.profile``
  ``/home/usuario/.profile``

* Inicialización de sesión común para todos
  * ``/etc/profile``

## Inicialización en bash

Ficheros para la configuración de la sesión

* Inicialización global para login shells
``/etc/profile``

* Configuración global
``/etc/basrc``

* Ejecuta al comienzo de sesión
``$HOME/.bash_profile``

* Ejecuta al comienzo de una shell
``$HOME/.bashrc``

* Particulariza el fin de sesión
``$HOME/.bash_logout``

## Variables Shell

* Utilizadas por la ``shell`` o los **comandos/programas** que se estén ejecutando en la **terminal**

  * Permite la asignación y la consulta de valores asignados a las variables

  * Los valores de las variables son cadenas alfanuméricos
  
  * Cualquier palabra seguido de un número , carácter o dígito es un identificador de una variable

### Asignación básica

* En ``sh`` y ``bash``

```bash
# Asignación
nombre = GNU
```

```bash
# Uso
echo $nombre 
GNU # Salida
echo "${nombre}/Linux"
GNU/Linux
```

### Tipos de Variables

* Tipos básicos

  * Variables ordinarias
  
  * Variables de entorno

  * Variables especiales de la shell

#### Variables ordinarias

* Variables locales de propósito general

#### Variables de entorno

* Describen el entorno de ejecución y se heredan del sistema UNIX/Linux

```bash
TERM # Tipo de terminal
xterm
PATH: # Contiene la lista de directorios por defecto donde se encuentran los comandos  
/home/usuario/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games 
HOSTNAME # Nombre de la máquina
ubuntu 
USER # Nombre del usuario
user 
SHELL # Shell por defecto
/bin/bash
HOME # Directorio base del usuario
/home/usuario
```

* Asignación

```bash
$ TERM=vt100; export TERM
$ PATH=$PATH:/home/usuario; export
$ PATH
$ export PATH=$PATH:/home/usuario
```

* Consulta

```bash
$ echo $PATH
/home/usuario/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:
/usr/games:/usr/local/games:/home/usuario:/home/usuario 
$ printenv # Imprime el valor de las variables especificadas del entorno
```

#### Variables especiales de la shell

* Se utilizan para configurar el entorno de la propia shell

* Variables para parámetros posicional en la invocación de comandos

#### Variables posicionales

* Albergan los parámetros de entrada a los comandos

```bash
$ <comando> <arg1> arg2> ...
$0 $1 $2 ...
$ cc -o programa parte1.c parte2.c
$0= cc
$1= -o
$2= programa
$3= parte1.c
$4= parte2.c
```

#### Evaluación de variables

```bash
echo $var # Valor de la variable "var" está definida
echo ${var} # Variable definida pero delimitada por el nombre de la variable cuando está se inserta en una cadena mayor
echo ${var-valor} # Si el valor de la variable "var" esta definida muestra su anterior valor. 
                  # Si la variable 'var' no tiene valor se usa valor
echo ${var=valor} # Si el valor de la variable "var" está definida muestra su valor. 
                  # Si no se usa "valor" y se asigna valor a "var"
echo ${var?mensaje} # Valor de la variable "var" si está definida. 
                    # Si no imprime mensaje en salida de error
echo ${var+valor} # Usa valor si la variable "var" está definida
```
