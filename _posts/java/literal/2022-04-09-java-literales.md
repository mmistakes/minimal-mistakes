---
layout: single
title: Java - Literal
date: 2022-05-21
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-manual
tags:
  - java-literal
page_css: 
  - /assets/css/mi-css.css
---

## Literales

* Representación de un valor en el código fuente
* Tipos de variables que podremos asignar unos valores u otros
  * ``char , bytes , short , int , long , double , float , boolean , String``

### Literales Enteros

* Cualquier valor numérico es un literal entero
* Los elementos literales enteros se consideran del tipo ``int``
* Para especificar que es un literal es de tipo ``long`` añadirle el sufijo la letras ``L`` o ``l``
  * Literales del tipo ``int`` : ``12`` , ``34`` , ``0`` , ``-50``
  * Literales del tipo ``long`` : ``9223372036L`` , ``25L`` , ``-1L``
* Representar diferentes bases
  * ``int variableBinarias = 011010;``
  * ``int variablesHexadecimal = 0x1a;``
  
### Literales Reales

* Cualquier valor numérico decimal con parte fraccionaria
* Literales reales se consideran del tipo ``double D , d``
* Literal del tipo ``float`` , añadir el sufijo la letra ``F`` o ``f``
* Literales del tipo double ``1.23D`` , ``3.456`` , ``-2.0d`` , ``3.25E+12`` , ``2.7e-5``
* Literales del tipo float ``2.75f`` , ``-4.567f`` , ``2.0F`` , ``6.73e+2f``
  
> Representar un literal real en notación cientifica se utiliza la letra ``E`` o ``e`` para expresar la potencia de 10

``3.25E+12`` representa a ``3.25x10^12``
``2.7E-5`` representa a ``2.7x10^-5``

### Literales Boolean

* Literal boolean son : ``true`` o ``false``

### Literales de Caracteres

* Consiste de un único caracter encerrado dentro de un par de comillas simples
  * Tipo de literales ``char`` : ``'a'`` , ``'1'`` , ``'$'`` , ``'\u00F1'``
* Una secuencia de escape es un conjunto de caracteres ``'\n'`` , ``'\t'``

### Literales de Cadenas

* Literal de cadenas consiste en un conjunto de caracteres encerrados entre comillas dobles
* Literales del tipo String
  * ``"Hola Mundo"`` , ``"Bienvenido a Java"`` , ``"Espa\u00F1a"``
* Caracteres del tipo de dato ``char`` (cadenas del tipo de datos String contiene un caracteres UNICODE UTF-16)

### literal de Subrayado

* Separación entre números para una mejor visualización
  * ``long tarjetaCredito = 1234_5678_9012_3456L;``
