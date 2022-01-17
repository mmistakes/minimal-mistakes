---
layout: single
title: Linux - Comando grep
date: 2022-01-13
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/linux/tux.jpg
categories:
  - linux
  - linux-comando
  - linux-grep
tags:
  - linux-concepto-de-comandos
page_css: 
  - /assets/css/mi-css.css
---

## Comando - grep

* Busca en un cadena de palabras el patrón que le pasemos como argumentos al comando

* Tenemos un archivo textos llamado ``textos``

```bash
Soy un archivo de texto 
con un conjunto de palabras
que se utilizan como prueba
en este sistema
```

* Ejecuto el comando

```bash
grep "pala" textos
# Sale en rojo la palabra "pala" pero lo puse entrecomillas para que se entienda mejor pero en un sistema real no se muestra así
con un conjunto de "pala"bras 
```

### Opciones

``-w``

* Selecciona sólo aquellas líneas que coincida exactamente que formen las palabras enteras.
  * La coincidencia de la cadena correspondiente debe estar al principio de la línea,  o precedida por un carácter constituyente no-palabra.
  * Debe ser al final de la línea o seguido por un carácter constituyente por una no-palabra.  
  * Los caracteres constitutivos de palabra son letras, dígitos y guiones bajos.
  * Esta opción no tiene efecto si también se especifica ``-x``

```bash
# Ejemplo :
grep -w "palabra" fichero.txt
# Aparece la linea donde aparece la coincidencia
con un conjunto de "palabras" # Las comillas no aparece por defecto , se han añadido para que el ejemplo se vea más claro
```

* Combinación de 2 comandos para buscar y mostrar el numero de líneas que aparece la palabra

```bash
# Ejemplo :
grep -w "palabra" fichero.txt | wc -l
1 # Aparece una vez
```
