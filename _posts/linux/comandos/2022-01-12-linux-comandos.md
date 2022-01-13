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

* **Comando** (**orden**):
  * Tiene definido canales **(ficheros)** de :
    * Entrada estándar **(Teclado)**
    * Salida estándar **(Pantalla de la terminal)**
    * Salida estándar de errores **(Pantalla de la terminal)**

![argumento](/assets/images/linux/argumentos/argumentos_comando_shell.jpg)

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

* **[Opciones]**

  * Modificadores de la acción o compartimiento básico realizado por el comando
    * Vienen precedidas de :
      * Un guión: ``-``
      * Un carácter: ``-a``

  * Permite la fusión de ambos de 2 o más opciones
    * Ejemplo : ``ls -l -a → ls -la``

* Nota : Cuando se pone **[elementos...]** se indica que puede ir más **elementos** del mismo tipo dentro de los corchetes

* **[Argumentos]**

  * Se utiliza para especificarle al comando sobre donde y que actuar
    * Suele indicarle la fuente de información de entrada o de destino de los resultados de salida del comando

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

      * Análisis del comando

    ```bash
       find  → Comando/orden que busca un archivo según se indique
        .    → Argumento que le indica al comando en que parte del sistema buscar
       -name → Opción que le indica que el siguiente elemento será el nombre del elemento el cual buscar 
       index.html → Argumento que sirve para indicarle a la opción el nombre del elemento que tiene que buscar,
       -print → Opción que imprime los resultados en una línea mostrando la ruta absoluta de ellos
      ```

    * Muestra las diferencias entre 2 ficheros de texto linea a linea

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
<recursos> # Elementos o información complementaria para la ejecución del comando
```

#### Composición de comandos

* Secuencia de comandos
  ``comando1 ; comando2``
  ``date ; who``

* Encadenamiento de comandos con un solo flujo de información (pipeline)
  ``comando1 | comando2``
  ``ls -lha | less ``
