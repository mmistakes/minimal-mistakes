---
layout: single
title: Java - HashSet
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
  - java-collection
tags:
  - java-Set
  - java-HashSet
page_css: 
  - /assets/css/mi-css.css
---

## Clase HashSet

> **Interfaces que implementa esta clase**<br> 
`` Serializable, Cloneable, Iterable<E>, Collection<E>, Set<E>``

### Jerarquía de Clase

```java
// Jerarquía de clases
java.lang.Object

java.util.AbstractCollection<E>

java.util.AbstractSet<E>

java.util.HashSet<E>
```

* Clase implementada por ``interface Set`` que esta respaldada por una ``tabla hash`` que en realidad es una instancia de ``HashMap``
  * **Estructura de datos** subyacente para ``HashSet`` es una ``hashTable``

* Clase respaldada por la tabla **hash** de la ``clase HashMap<K,V>``

* **No permite** valores duplicados

* No garantiza que los **objetos** que se inserte en la clase ``HashSet`` se haga en el mismo orden ni tampoco que los itere de forma ordenada

  * Los **objetos** se insertan en **función** de su código según la tabla ``hash``

* Permiten elementos **null/nulos** en ``HashSet``

* Iterar sobre un conjunto de elementos requiere un tiempo proporcional a la suma del número de elementos y a la capacidad otorgada a ``Map``

### Ejemplo

```java
HashSet<String> hashSet = new HashSet<String>();
```
