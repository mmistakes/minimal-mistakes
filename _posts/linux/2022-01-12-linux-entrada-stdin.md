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

* Además de los **argumentos** , un comando **UNIX/Linux** tiene definidos unos canales **(ficheros)** de entrada **(stdin)** y otros de salida **(stdout)**

### Entrada Estándar (stdin)

* **stdin** = **standard input**
  
  * ( Por defecto el teclado )

* Redirigir entrada estándar

  ``comando < fichero``

  * El contenido del fichero entra en la ejecución del comando

  ``wc < cancelar``

```bash
# Ejemplo: 
wc < cancelar
... # Ejecución 
cancelar # Si escribes esta palabra se termina la ejecución del comando 
```

* Otro Ejemplo:

```bash
# Ejemplo: 
wc < fin
Comprobación de la entrada estándar # Texto añadido 1
por teclado de un comando # Texto añadido 2
fin # Si escribes esta palabra se termina la ejecución del comando 
```

### Resumen General

```bash
--------------------------------------------------
| Por defecto |    < file      |    << END       |
--------------------------------------------------
| Teclado     |   Entrada      |    Entrada      |
|             |   desde        |    en la        |
|             |   fichero      |    misma línea  |
|             |                |    de comandos  |
|             |                |    hasta la     |
|             |                |    marca END    |
--------------------------------------------------       
```
