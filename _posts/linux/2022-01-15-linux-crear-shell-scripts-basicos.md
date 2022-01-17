---
layout: single
title: Linux - Crear Shell Scripts Básicos
date: 2022-01-15
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/linux/tux.jpg
categories:
  - linux
  - linux-shell-script
tags:
  - linux-concepto-de-comandos
page_css: 
  - /assets/css/mi-css.css
---

## Crear Shell Scripts Básicos

* Creamos un fichero que contenga el código del script  

```bash
vi script-basico
```

* Contenido del script-basico

```bash
#!/bin/bash                                                                     
echo "Mensaje de Hola"    
```

* Le damos permiso de ejecución al fichero

```bash
chmod +x script-basico
```

* Depurar , ejecutar y probar el **script**

  * La validación del comando utilizando el propio lenguaje de **shell bash**

    * Con la opción ``-x`` se ejecutará el **comando** en modo paso a paso y trazando en la pantalla la ejecución del comando , **imprimirá los comandos** y sus **argumentos** a medida que se ejecutan.

```bash
bash -x script-basico [opciones] [argumentos]
```

* Ejecutar el script

```bash
script-basico [opciones] [argumentos]
```

## Argumento del shell script

* Las **variables posicionales** de los shell se utilizan para pasar **[Opciones]** y **[Argumentos]** a un shell script

```bash
$ <comando> <arg1> <arg2> 
 ```

* Shell Script estas cadenas se pueden utilizar mediante
  * ``$0`` (1º - Nombre del comando)
  * ``$1`` (2º - Nombre del comando)
  * ``$2`` (3º - Nombre del comando)

* Variables Especiales
  * $* - Todos los **argumentos** de un string
  * $? - Valor de **retorno** del **último comando** ejecutado
  * $# - Número de **argumentos**
