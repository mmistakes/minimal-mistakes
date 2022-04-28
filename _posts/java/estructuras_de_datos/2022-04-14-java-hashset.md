---
layout: single
title: Java - HashSet
date: 2022-04-14
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-clase
  - java-collections
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Clase - HashSet

* Clase implementada por ``interface Set`` que respaldada por una ``tabla hash`` en realidad es una instancia de ``HashMap``
* Implementa la ``interface`` Set
* Estructura de datos subyacente para ``HashSet`` es una ``hashtable``
* No permite valores duplicados
* No garantiza que los ``objetos`` que inserte en ``HashSet`` se inserten en el mismo orden
  * Los objetos se insertan en función de su código ``hash``
* Permiten elementos ``null`` en ``HashSet``
* ``HashSet`` también implementa ``inferfaces`` serializables y clonables

### Definición

```java
HashSet<String> hashSet = new HashSet<String>();
```
