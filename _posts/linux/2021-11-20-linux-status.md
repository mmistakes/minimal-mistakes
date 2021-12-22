---
layout: single
title: Linux - Status 
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
  - linux-status
page_css: 
  - /assets/css/mi-css.css
---

### Comandos - Status

### df

* Mostrar la capacidad y el uso de cada partición

#### Sintaxis

```bash
df [option]... [file]...
```

#### Ejemplo

```bash
Filesystem     1K-blocks     Used Available Use% Mounted on
udev             1962360        0   1962360   0% /dev
tmpfs             399020     1952    397068   1% /run
/dev/sda5       40503552 17972300  20444084  47% /
tmpfs            1995096    46236   1948860   3% /dev/shm
tmpfs               5120        4      5116   1% /run/lock
tmpfs            1995096        0   1995096   0% /sys/fs/cgroup
```

### du

* Mostrar el tamaño de todos los subdirectorios

* Se puede utilizar para rastrear los archivos y directorios que consumen una cantidad excesiva de espacio en la unidad de disco duro.

#### Sintaxis

```bash
du [option]... [file]...
du [option]... --files0-from=F
```

#### Ejemplo

```bash
du /home/mandeep/test
```

* * *

```bash
1576    ./pdf
64      ./dire2/dire/dire2
68      ./dire2/dire
132     ./dire2
16      ./abecedario/abc
52      ./abecedario
12      ./tranferir
64      ./dire/dire2/dire/dire2
68      ./dire/dire2/dire
132     ./dire/dire2
140     ./dire
16      ./ejem
2184    .
```

### env

* Mostrar todas las variables de entorno del sistema

#### Ejemplo

```bash
SHELL=/bin/bash                                                                 
TERM=xterm                                                                      
HUSHLOGIN=FALSE                                                                 
OLDPWD=/home/sysadmin                                                           
USER=sysadmin    
```

### kill

* Terminar un programa en ejecución

* Las señales se pueden especificar de tres formas:
  * Por número (por ejemplo, **-5**)
  * Con prefijo **SIG** (por ejemplo, **-SIGkill**)
  * Sin prefijo **SIG** (por ejemplo, **-kill**)

* Los valores **PID negativos** se utilizan para indicar el **ID** del grupo de procesos.

  * Si pasa un **ID** de **grupo de proceso**, todo el **proceso** dentro de ese grupo recibirá la señal.

* Un **PID** de **-1** es muy especial ya que indica todos los procesos excepto **kill** e **init**, que es el proceso padre de todos los procesos del sistema.

* Para mostrar una lista de procesos en ejecución, use el comando **ps** y esto le mostrará los procesos en ejecución con su número **PID**.

  * Para especificar qué proceso debe recibir la señal de interrupción, debemos proporcionar el **PID**.

#### Recuerda

* Los valores **PID negativos** se utilizan para indicar el **ID** del **grupo de procesos**
  * Si pasa un **ID** de **grupo de proceso**, todo el **proceso** dentro de ese grupo recibirá la señal.

* Un **PID** de **-1** es muy especial ya que indica todos los **procesos** excepto **kill** e **init**, que es el **proceso padre** de todos los procesos del sistema.

* Para mostrar una lista de procesos en ejecución, use el comando **ps** y esto le mostrará los **procesos** en ejecución con su número **PID**
  * Para especificar qué **proceso** debe recibir la señal de interrupción, debemos proporcionar el **PID**.

```bash
ps # Ver todos los procesos , tty = nombre de fichero de la terminal de la entrada estándar. , tiempo y comando relacionado
  PID TTY          TIME CMD                                                     
   86 pts/0    00:00:00 bash                                                    
  111 pts/0    00:00:00 ps    
```

```bash
kill pid # Para mostrar cómo usar un PID con el comando kill
kill 111 # Elimina el proceso ps de la ejecución (Es un ejemplo)
```

```bash
kill -s # Para mostrar cómo enviar señales a los procesos.
kill {-signal | -s signal} pid 
```

```bash
kill -L # Para mostrar cómo enviar señales a los procesos.
kill {-l | --list[=signal] | -L | --table} 
```

#### Ejemplo

```bash
kill -l # Para mostrar todas las señales disponibles, puede usar la siguiente opción de comando
kill -9 10283
```

### renice

* Alterar la prioridad de un programa en ejecución

#### Sintaxis

```bash
renice prioridad [[-p] pid ...] [[-g] pgrp ...] [[-u] user ...]
```

* Los siguientes parámetros son interpretados como

  * **ID** de proceso, **ID** de grupo de proceso, o nombres de usuario.

    * Aplicar **renice** a un grupo de procesos provoca que todos los procesos del grupo de procesos vean alterada su prioridad de planificación.

    * Aplicar **renice** a un usuario hace que todos sus procesos vean la prioridad de planificación alterada.  

* Los **procesos** se especifican a partir de su **ID** de **proceso**

* Las **opciones** soportadas por **renice** son:

```bash
-g # Forzar que los parámetros quién sean interpretados como IDs de grupo de proceso.

-u # Forzar que los parámetros quién sean interpretados como nombres de usuario.

-p # Reinicia la interpretación de quién para que sea la de ID de proceso (por defecto).
```

* Cambiaría la prioridad de los procesos con **ID** 987 y 32, y todos los procesos de los usuarios **daemon** y **root**.

* Cada usuario, excepto el **superusuario**, sólo podrá alterar la prioridad de sus **procesos** y solo podrá incrementar su ``valor nice`` entre el rango **0** a **PRIO_MAX (20)**
  
  * (Esto evita saltarse los mandatos administrativos.)  

* El superusuario podrá modificar la prioridad de cualquier **proceso** y poner la prioridad en cualquier valor en el rango **PRIO_MIN** **(-20)** a **PRIO_MAX**

* Prioridades útiles son:
  * 20 (los procesos afectados solo correrán cuando ningún otro lo desee en el sistema)

  * 0 (la prioridad de planificación **base**), cualquier cosa negativa (para hacer que las cosas vayan rápidas).

#### Ejemplo

```bash
renice +1 987 -u daemon root -p 32
```

### ps

* Mostrar todos los programas en ejecución

#### Sintaxis

```bash
 ps [-] [lujsvmaxScewhrnu] [txx] [O[+|-]k1[[+|-]k2...]] [pids]
```

* Opciones

```bash
--sortX[+|-]key[,[+|-]key[,...]]
--help
--version
```

#### Ejemplo

```bash
   PID  TTY          TIME CMD
  6564  pts/6    00:00:00 bash
365313  pts/6    00:00:00 ps
```