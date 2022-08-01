---
layout: single
title: Linux - Salida (Stdout)
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
  - linux-salida
  - linux-stdout
page_css: 
  - /assets/css/mi-css.css
---

## Concepto General

* Los argumentos de un comando suelen indicar la fuente de información de entrada ( o el destino de los resultados de salida )

* Además de los argumentos , un comando **UNIX/Linux** tiene definidos unos canales **(ficheros)** de entrada **(stdin)** y otros de salida **(stdout)**

## Salida Estándar (stdout)

* **stdout** = ``standard output``

  * ( Por defecto la pantalla )

* ``>`` - Redirigir la salida estándar

  ``comando > fichero``
  
  * Crea un nuevo archivo llamado calendario y escribe en el la salida del comando

```bash
# Ejemplo: 
cal > calendario 
          Enero 2022
    do lu ma mi ju vi sá  
                      1  
    2  3  4  5  6  7  8  
    9 10 11 12 13 14 15  
    16 17 18 19 20 21 22  
    23 24 25 26 27 28 29  
    30 31
```

* ``>>`` - Redirigir y añadir la salida a un fichero preexistente
  
  * Crea un nuevo archivo si no existe
  
  * Añade el contenido a continuación del anterior contenido en el caso de que el fichero existiera

```bash
echo "Mensaje 1" > texto # Crea un nuevo archivo con el mensaje "Mensaje 1"
cat texto # Ejecutamos cat para el contenido del mensaje 
Mensaje 1 # Muestra este texto
echo "Mensaje 2" >> texto # Ejecutamos los 2 >> para añadir otro texto más al fichero
cat texto # Ejecutamos cat para el contenido del mensaje 
Mensaje 1 # Muestra en anterior texto
Mensaje 2 # Y además muestra a continuación el nuevo contenido 
```

```bash
comando >> fichero
# Ejemplo: 
cal >> calendario
          Enero 2022
    do lu ma mi ju vi sá  
                      1  
    2  3  4  5  6  7  8  
    9 10 11 12 13 14 15  
    16 17 18 19 20 21 22  
    23 24 25 26 27 28 29  
    30 31
# Añade a continuación la nueva salida de la ejecución del comando cal
          Enero 2022
    do lu ma mi ju vi sá  
                      1  
    2  3  4  5  6  7  8  
    9 10 11 12 13 14 15  
    16 17 18 19 20 21 22  
    23 24 25 26 27 28 29  
    30 31
```



* Redirigir salida estándar **(stdout)** a salida de error **(stderr)**
  * Comando ``>&2``

```bash
# Mostrará por pantalla la salida del comando
echo "Error" >&2
```

## Salida Estándar de errores (stderr)

* **stderr** = standard error
  * ( Por defecto la pantalla )

### Resumen General

```bash
-----------------------------------------------------------------
| Por defecto |    > file      |    >> file      |    >&2       |
-----------------------------------------------------------------
| Pantalla    |   Redirigir    |    Añadir al    |  Combinar    |
|             |   al file      |    file         |  con stderr  |
-----------------------------------------------------------------       
|             |  >! Machaca    |  >>! Crea       |              |
|             |     file       |      un         |              |
|             |     si         |      file       |              |
|             |     existe     |      si no      |              |
|             |                |      existe     |              |
-----------------------------------------------------------------
```

#### Salida con Valor de Retorno a la shell

* Por defecto el valor ``0`` significa ejecución con éxito

  * Cualquier valor mayor que ``0`` significa **Error**

    * El comando **exit** equivale a ``0``

#### Redirección de Entrada/Salida

* Canales de  **(entrada-stdin)/(salida-stdout)** estándar de un comando se asocian a la **terminal de usuario** pero puede asociarse a cualquier fichero (redirección de **entrada/salida**)

##### Pipeline

* La salida estándar de un comando puede enviarse con la entrada estándar de otro comando para obtener resultados diferentes o más completos
  * Ejemplo : ``ls -lha | less``
