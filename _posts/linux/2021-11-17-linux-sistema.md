---
layout: single
title: Linux - Comandos de Sistema
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
  - linux-sistema
page_css: 
  - /assets/css/mi-css.css
---

## Comandos de sistema

* Todo **comando** o **shell script** que se encuentre en el directorio ``bin`` del sistema **GNU/Linux**

  * Si creamos un **shell script** o un **comando** y no se encuentra en la variable de directorio **PATH** del sistema el comando no se podrá ejecutar para eso tenemos que incluirla en el directorio ``bin``

### Gestión Básica de paquetes

> Distribución Ubuntu 20.04

* Actualizar el sistema

```bash
sudo apt update -y
```

* Actualizar la listar todos los posibles paquetes que se instalaran en el sistema

```bash
sudo apt list
```

* Después de ver la lista de los posibles paquetes que podemos instalar , los instalamos mediante el comando
  * **Atención** : Antes de instalar los paquetes actualizados **SE TIENE QUE HACER UNA INVESTIGACIÓN SOBRE QUE PAQUETES NOS INTERESA INSTALAR** dependiendo de las características de nuestro sistema y necesidad para **EVITAR PROBLEMAS DE INCOMPATIBILIDADES CON EL SISTEMA**

```bash
sudo apt dist-upgrade -y
```

* Eliminar los paquetes no necesario de las actualizaciones
  * **Atención** : Antes de instalar los paquetes actualizados **SE TIENE QUE HACER UNA INVESTIGACIÓN SOBRE QUE PAQUETES NOS INTERESA ELIMINAR** dependiendo de las características de nuestro sistema y necesidad para **EVITAR PROBLEMAS DE INCOMPATIBILIDADES CON EL SISTEMA**

```bash
sudo apt autoremove
```

* Indicar que paquete se desea eliminar

```bash
apt-get remove --auto-remove <package-name>
```

* Indicar específicamente que paquete instalar

```bash
apt-get install <package name>=<version>
# Ejemplo
sudo apt-get install apache2=2.3.35-4ubuntu1
```

### Ver Nombre de usuario dentro del sistema

```bash
whoami # Identificador de usuario
who am i # Identificador de usuario más detallados
```

### Ver caracteristicas del sistema GNU/Linux que se esta utilizando

```bash
cat /etc/*release

DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=20.04
DISTRIB_CODENAME=focal
DISTRIB_DESCRIPTION="Ubuntu 20.04.3 LTS"
NAME="Ubuntu"
VERSION="20.04.3 LTS (Focal Fossa)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 20.04.3 LTS"
VERSION_ID="20.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=focal
UBUNTU_CODENAME=focal
```

### Información CPU

```bash
cat /proc/cpuinfo
```

### Información Memoria

```bash
cat /proc/memoinfo
```

### Versión de la distribución de GNU/Linux que se esta utilizando

```bash
lsb_release -a

No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 20.04.3 LTS
Release:        20.04
Codename:       focal
```

### Historial del sistema

* Ver el historial de comando ejecutados en el sistema

```bash
history
```

* Eliminar el historial de comando ejecutados en el sistema

```bash
history -c
```

### Información del Kernel

```bash
uname -a
Linux ubuntu 5.11.0-44-generic #48~20.04.2-Ubuntu SMP Tue Dec 14 15:36:44 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
```

```bash
uname -r
5.11.0-43-generic
```

### Muestra el uso del espacio disponible en disco duro

```bash
df
```

### Muestra el uso espacio ocupado por el subarbol del sistema de archivos

```bash
du
```

### Muestra memoria y espacio 'swap'

```bash
free
```

### Muestra las posibles rutas donde se ubica la app/software/comando que ejecutemos

```bash
whereis <app/sw/comando>
```

### Muestra cual app/software/comando se ejecutara

```bash
which <app/sw/comando>
```

### Nombre del anfitrión 'host'

```bash
hostname # Nombre del anfitrión en el que estoy trabajando 
```

### Imprime todas las variables ejecutadas en un programa de un entorno modificado

```bash
printenv
```

* Otra opción

```bash
env
```

* Ejemplo - Mostrar la lista de directorios y filtrar mediante el comando PATH  

```bash
printenv | grep -w PATH 
PATH=/home/sysadmin/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:
/bin:/usr/games:/usr/local/games    
```

### Comando Export

* Se utiliza para indicarle al sistema que la nueva variable llamada VARIABLE estará disponible en todo el sistema y en otras ``shell`` del sistema

```bash
export VARIABLE=VALOR
```

* Exportar un ``shell script`` o un comando a la ``PATH`` del sistema para que se pueda ejecutar en cualquier directorio distinto al **directorio de binarios** ``/bin/`` del sistema

  1. Creamos el **script básico** en un directorio distinto al directorio ``/bin/``

```bash
usuario@ubuntu:~/directorio-comun$ touch script-basico
```

  2. Agregamos el código al ``shell script`` para su ejecución

```bash
#!/bin/bash
echo "Mensaje de Bienvenida"
```

  3. Añadimos el archivo ``shell script`` a la ``PATH`` para que se pueda ejecutar en cualquier **directorio del sistema**

```bash
PATH=$PATH:/home/usuario/directorio-comun$
```

### Comando - xterm

* Se utiliza para lanzar una 2º ``shell`` y mediante el simbolo ``&`` le indicamos que se ejecutará en el background de forma que la nueva ``shell`` devolverá el ``Prompt`` y ejecutará en un 2º proceso

```bash
xterm &
```
