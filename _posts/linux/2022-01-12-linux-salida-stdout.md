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

* Redirigir la salida estándar

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

* Redirigir y añadir salida a un fichero preexistente
  * Realiza la misma tarea que ``>`` pero sin reescribir los datos que tenía y añadiendo lo que ejecuta el comando a continuación

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
