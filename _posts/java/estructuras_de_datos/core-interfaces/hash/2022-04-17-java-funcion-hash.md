---
layout: single
title: Java - Función Hash
date: 2022-04-17
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-manual
  - java-clase
tags:
  - java-HashSet
  - java-HashMap
  - java-HashTable
  - java-función-hash
page_css: 
  - /assets/css/mi-css.css
---

## Función Hash

* Funciones **resumen** o **de compresión**

* Son algoritmos que **toman un dato** y **generan un valor calculado** con un tamaño determinado de elementos
  
  * El **mismo dato de entrada** tendremos **un mismo dato de salida**
    * Si cambiamos el **dato de entrada** ``cambiará`` **el dato de salida**

### Funciones hash mediante el algoritmo CRC32

```text
Algoritmo   Entrada       Salida Hash       
crc32     - abracadabra → d84b6d23
crc32     - palacio     → a070e606
crc32     - pala        → 95271ebe
crc32     - pata        → d4ff0724
crc32     - pato        → de5f8918
```

### Colisiones

* Cuando varios datos de entrada generen el mismo valor de salida
  * **Muy difícil que suceda** pero a veces sucede

### Usos

* Gestión de identificadores y contraseñas
  * En lugar de almacenar datos introducidos se almacena los resultados ``hash`` que son los que usarán en la aplicación , esto evita que los datos reales queden expuestos

* Si no envían un fichero y el ``checksum`` obtenido mediante la **función checksum** obtenido aplicando una función ``hash`` , es posible comprobar la integridad de dicho fichero volviendo a aplicar la función hash y comparando los resultados con el checksum recibido

* El checksum podemos usarlo para identificar los ficheros.
  * Sistema de almacenamiento en la nube

* Los antivirus usan las funciones hash para determinar la firma de los virus para detectarlos y distinguirlos

* También se usan para la firma digital , en la parte de criptografía pero no en el cifrado

* La ``función hash`` determina el rendimiento de las estructuras de datos que la usen
  * En las estructuras de datos se suelen utilizar las funciones ``hash`` implementadas y adaptadas a la longitud necesaria según el tamaño de la estructura en cuestión