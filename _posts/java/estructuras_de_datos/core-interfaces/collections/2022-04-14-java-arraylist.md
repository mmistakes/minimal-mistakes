---
layout: single
title: Java - ArrayList
date: 2022-07-04
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
  - java-core-interface
  - java-arraylist
  - java-collections
page_css: 
  - /assets/css/mi-css.css
---

## Clase - ArrayList

* Clase implementada por ``interface List``

* Implementa la ``interface Set``

* **Estructura de datos** subyacente para ``HashSet`` es una ``hashtable``

* **No permite** valores duplicados

* No garantiza que los ``objetos`` que inserte en ``HashSet`` se inserten en el mismo orden
  * Los objetos se insertan en función de su código ``hash``

* Permiten elementos ``null`` en ``HashSet``

* ``HashSet`` también implementa ``inferfaces`` serializables y clonables

### Definición

```java

  List<Integer> lista = new ArrayList<Integer>();
 
  for (int i = 0; i < 5; i++) {
   lista.add(Integer.valueOf(i));
  }

```
