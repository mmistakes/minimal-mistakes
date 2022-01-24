---
layout: single
title: Linux - Concepto de Comandos
date: 2022-01-12
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
  - linux-concepto-de-comandos
page_css: 
  - /assets/css/mi-css.css
---

## Comandos de UNIX/Linux

* Se divide en una matriz de cadenas 'string' llamadas [Argumentos]

> Un comando en UNIX/Linux es un transformador de información que captura un flujo de entrada y lo transforma en un flujo de salida
> La fuente de información de entrada pueden ser entre otros elementos argumentos del comando u otros comandos

* **Comando** (**orden**):
  * Tiene definido canales **(ficheros)** de :
    * Entrada estándar **(Teclado)**
    * Salida estándar **(Pantalla de la terminal)**
    * Salida estándar de errores **(Pantalla de la terminal)**

![Argumento](https://github.com/rvsweb/guia-basica-git-github/blob/master/assets/images/linux/argumentos/argumentos_comando_shell.jpg?raw=true "Ejemplo de comandos")

* **Cadena de caracteres** que indican a la **shell** de **UNIX/Linux** la ejecución de una **acción específica**

  * La **acción** es la búsqueda de un **programa/software** o **shell script** en el sistema de archivos y su ejecución o interpretación

  * Pueden admitir **opciones** y **argumentos**

  * Suele el nombre de un fichero en el sistema de archivos
    * Ejemplo :
      * Path absoluta del comando ``ls`` : ``/bin/ls``
      * Búsqueda en la variable PATH : ``ls``

### Sintaxis de los comandos de shell de UNIX/Linux

```bash
#  Acción
#    ↓     Modificadores
#    ↓          ↓        Datos de Entrada
#    ↓          ↓              ↓            Complementos
#    ↓          ↓              ↓                 ↓
$ comando  [opciones...]  [argumentos...]   <recursos>
```

#### [Opciones]

* Modificadores de la **acción** o **comportamiento básico** que realizado por el comando

  * Vienen precedidas de :
    * Un guión: ``-``
    * Un carácter: ``-a``

  * Permite la fusión de 2 o más opciones
    * Ejemplo : ``ls -l -a → ls -la``

* Nota : Cuando se pone **[elementos...]** se indica que puede ir más **elementos** del mismo tipo dentro de los corchetes

#### [Flags]

* Parecida a las **opciones** pero no posee **argumentos** en si mismo
  * Actúan como valores **boolean** (**true** / **false**)
  * Al añadirlos a un comando se activa o se desactivan cierta **acciones/funciones** de los comandos
  * Generalmente no toman **argumentos**
    * **(Por defecto : false)**
  
  * Ejemplos : ``--verbose``, ``--output`` , ``-ngame`` , ``-c``

#### [Parametros]

* Es un **[Argumento]** que proporciona información al **comando** o a algunas de sus **opciones**
  * Ejemplo : ``-o file``

```bash
-o # Es la opción
file # Es el parámetro de la opción -o
```

* A diferencia de las opciones cuyos posibles valores están codificados en los programas , los parámetros no suelen ser por lo que el usuario es libre de utilizar cualquier cadena que se adapte a sus necesidades

* Si necesita pasar un parámetro que parece una opción pero que no debe ser interpretado como tal puede separarlo del principio de la línea de comandos con un doble guión ``--``

```bash
$ ls -la /tmp /var/tmp
parameter1= /tmp
parameter2= /var/tmp
```

```bash
$ ls -l -- -a
option1 = -l
parameter1 = -a
```

* Un ``parámetro`` del ``shell`` también es cualquier cosa que almacene un valor en el contexto del ``shell``

* Parámetros posicionales ``( $1 , $2 )``

* Carácter especial ``($foo , $bar)``

* Caracteres Especiales ``($@)``

``Funciones/Comandos`` (se utilizan como metacomandos) que incorporan varios comandos independientes como ``busybox`` , ``git`` , ``apt-get`` , ``openssl``

* Pueden tener ``opciones globales`` que preceden al ``subcomando`` y las ``opciones especificas`` del subcomando que siguen al subcomando

* A diferencia de los ``parámetros`` la lista de posible ``subcomandos`` esta codificada por el propio ``comando``

```bash
busybox ls -l  
busybox # Comando (Herramienta multiusos para los sistemas embebidos)
ls # Subcomando
-l # Opción del subcomando
```

* * *

```bash
$ git --git-dir=a.git --work-tree=b -C c status -s
git # Comando  
--git-dir=a.git # 1º Opción Comando   
--work-tree=b # 2º Opción Comando
-C c # 3º Opción Comando 
status # Subcomando 
-s # 1º Opción Subcomando  
```

* Los comandos como ``test``, ``tar``, ``dd`` y ``find`` tienen una sintaxis de análisis de [Argumentos] más compleja que la descrita anteriormente y pueden tener algunos o todos sus [Argumentos] analizados como ``expresiones``, ``operadores``, ``keys`` y componentes de comandos específicos

* Las asignaciones de ``variables opcionales`` y las ``redirecciones`` a pesar de ser procesado por el ``Bash Shell`` para la expansión de la tilde la expansión de parámetros ``~`` , la sustitución de los comandos, la expansión aritmética y la eliminación de comillas, al igual que otros ``parámetros`` de la línea de comandos no se tienen en cuenta porque han desaparecido cuando se llama al comando y se le pasan sus [Argumentos]

  * ``Expansión aritmética`` permite la evaluación de una expresión aritmética y la sustitución del resultado

    * Ejemplo : El formato para la expansión aritmética es:
      ``$(( expression ))``

#### [Argumentos]

* Se utiliza para especificarle al comando **sobre donde** y **sobre que actuar**

  * Se le suele indicar la **fuente de información de entrada** o **de destino** de los resultados de salida del comando

  * Complementos que mejoran la acción de los comandos los cuales pueden ser :

    * **ficheros**
    * **Directorios**
    * **Usuarios**
    * **Nombres de dispositivos**
    * **Hosts**
    * **Datos de conexiones**

  * Ejemplos de **[Argumentos]** :
  
    * Muestra la **ruta absoluta** del comando
  
 ```bash
 # comando
 #   ↓   [Argumento 1º]
 #   ↓       ↓
   which comando
   which pwd
 ```
  
* Muestra el **fichero** a partir del **directorio** indicado

```bash
# Comando que busca y muestra en una sola línea de forma secuencial todas las coincidencias que existan del archivo index.html dentro del directorio actual 
# Importante mantener el orden de las <Opciones> y <Argumentos>
# 
# Comando
#   ↓    [Argumento 1º]   [Opción] [Argumento 2º]  [Opción]  
#   ↓       ↓                ↓          ↓             ↓
   find     .              -name    index.html     -print
```

### Entradas del comando

* Opciones y Argumentos
  * Son la entrada básica y explicita de información para el comando
    * Ficheros predefinidos :
      * De personalización de sesión : (.login)
      * De configuración del comando : (.exrc del editor VI)
    * Variables de entorno
      * TERM , PATH , PAGER
    * Entrada estándar

### Salidas del comando

* Ficheros
  * Nombre dado como **argumento** del comando
    * Ejemplo

```bash
#Comando
#  ↓    [1-Argumento]
#  ↓     ↓       [Opción]
#  ↓     ↓        ↓    [2-Argumento]
#  ↓     ↓        ↓     ↓
$ gcc programa.c -o  programa
```

* Nombre por defecto en la salida del comando

```bash
#Comando
#  ↓    [1-Argumento]
#  ↓     ↓       
#  ↓     ↓       
#  ↓     ↓       
$ gcc programa.c 
# Salida al finalizar la ejecución del comando
a.out # Resultado de la compilación
```

### Análisis del comando

```bash
find   → Comando/orden que busca un archivo según se indique
.      → Argumento que le indica al comando en que parte del sistema buscar

-name  → Opción que le indica que el siguiente elemento será el nombre del elemento el cual buscar 

index.html → Argumento que sirve para indicarle a la opción el nombre del elemento que tiene que buscar,

-print → Opción que imprime los resultados en una línea mostrando la ruta absoluta de ellos
```

* Muestra las diferencias entre 2 ficheros de texto separados por una linea
  * Arriba el 1º fichero seguida de una línea de separación y luego el 2º fichero

```bash
# comando
#   ↓ [Argumento 1º]
#   ↓    ↓ [Argumento 2º]
#   ↓    ↓     ↓                    
   diff file1 file2
```

* Conectar a un dispositivo

```bash
# comando
#   ↓ [Opción]
#   ↓    ↓   [Argumento]
#   ↓    ↓        ↓                    
   ssh  -T   git@github.com
```

#### Resumen de conceptos

```bash
# Prompt - Caracter en la línea de comandos para indicar que está esperando órdenes.
$ 
```

```bash
# Programa/Software/App a ejecutar
comando 
```

```bash
 # Modificadores o datos de entrada 
# Se usa para especificar algo sobre lo que el comando debe actuar
[argumentos...]
```

```bash
# Modificadores o datos de entrada 
# Se usa para modificar el comportamiento de un comando.
[opciones...] 
```

```bash
# Activa o desactiva funciones/acciones de los comandos 
# Generalmente no toman argumentos
# Por defecto tienen el valor false
[flags...] 
```

```bash
# Elementos o información complementaria para la ejecución del comando
<recursos> 
```

#### Composición de comandos

* Secuencia de comandos
  * Ejecuta los comandos secuencialmente
  ``comando1 ; comando2``
  * Ejemplo
  ``date ; who``

* Encadenamiento de comandos con un solo flujo de información **(pipeline)**
  ``comando1 | comando2``
  * Ejemplo
  ``ls -lha | less``
