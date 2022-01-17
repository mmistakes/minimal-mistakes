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

## Inicialización en shell Bash

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

## Uso de comillas simples y dobles

## Comillas simples

* Convierte todo lo que hay entre las comillas como una cadena de caracteres **(string)** de texto plano sin realizar ninguna acción más que mostrar lo que almacena

```bash
#!/bin/bash
variable1='usuario'
variable2=' ubuntu'
echo $variable1 $variable2
usuario ubuntu # Muestra este resultado
```

## Comillas dobles

* Identifica el contenido la variable y muestra el valor que tenga almacenado
  * Guardan el contenido que dentro de ellas

* Creamos el shell script

```bash
touch usuario
```

* Añadimos el contenido

```bash
#!/bin/bash
variable1=GNU/Linux
variable2="usuario $variable1"
echo $variable2
```

* Ejecutamos el shell script

```bash
sh usuario
usuario GNU/Linux # Resultado de la ejecución
```

## Comillas inclinadas

* Identifica el contenido que alberga entre las comillas y si es un comando lo ejecuta

```bash
echo `date`
lun 17 ene 2022 15:02:01 CET # Resultado de la ejecución
```

* Shell script sencillo
  
> Recuerda en crear el shell script en un archivo y ejecutarlo mediante el comando sh

```bash
#!/bin/bash
fecha=`date;cal`
echo "Fecha:\n$fecha"
```

* Shell script sencillo de ejemplo
  * Lista y muestra el total de archivos del directorio actual

```bash
#!/bin/bash
ficheros=`find . -maxdepth 1 -type f | wc -l`
echo "Hay $ficheros ficheros"
```

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
# Representa el nombre del script
$0= cc
# $1 al $9 - Representa nueve argumentos que se pasan a un shell script 
$1= -o
$2= programa
$3= parte1.c
$4= parte2.c
```

* Pasar argumentos a nuestro script

```bash
#!/bin/bash
echo $1
```

#### Variables Especiales

* Número de argumentos que se pasan a un shell script

```bash
$# 
echo $# 
0 # En este ejemplo 
```

* Todos los argumentos que se han pasado al shell script 

```bash
$@
echo $@
  # No muestra nada para este ejemplo
```

* Salida del último proceso que se ha ejecutado

```bash
$? 
130
```

* ID del proceso del script

```bash
$$ 
183214
```

* Nombre del usuario que ha ejecutado el shell script

```bash
$USER 
echo $USER
usuario
```

* Se refiere al hostname de la máquina en la que se está ejecutando el script

```bash
$HOSTNAME
echo $HOSTNAME 
ubuntu
```

* Se refiere al tiempo transcurrido desde que se inició elscript, contabilizado en segundos

```bash
$SECONDS
echo $SECONDS
8952
```

* Devuelve un número aleatorio cada vez que se lee esta variable.

```bash
$RANDOM
echo $RANDOM
8443 
```

* Indica el valor que es el **número** de **línea del comienzo** del comando actual
  * Esta variable de entorno es bastante complicada de usar

```bash
$LINENO 
echo .1 $LINENO #
1. 8
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
