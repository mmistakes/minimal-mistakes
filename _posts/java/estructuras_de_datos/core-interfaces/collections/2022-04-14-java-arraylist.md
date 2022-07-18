---
layout: single
title: Java - List
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
  - java-collections
tags:
  - java-core-interface
  - java-arraylist
page_css: 
  - /assets/css/mi-css.css
---

## Clase - ArrayList

### Jerarquía 

```java
java.lang.Object

java.util.AbstractCollection<E>

java.util.AbstractList<E>

java.util.ArrayList<E>
```

* Desciende de la ``interface List<E>`` 

* ArrayList implementa la ``interface List<E>``

* Permite nulos ``null``

* Array redimensionables **"se ajusta al número de elementos que le vayamos añadiendo"**

* No esta sincronizado como la ``clase Vector``

 * Util para la programación concurrente **(varios usuarios o programas podrían estar estar manipulando los datos)**

 * **Complejidad constante**

 * No depende de **N**

```java
int cantidad = 0;
```

* De los **métodos** ``size`` , ``isEmpty`` , ``get`` , ``set`` al igual que con los **métodos** de **iteradores** no dependerá del número de elementos de la **lista** , **añadir elementos** costará tanto como elementos queramos añadir
  
* **Complejidad lineal → N^2**

```java
  for( int i = 0 ; i < N ; i++){
    cantidad = 0;
  }
```

* El resto de **operaciones** y **métodos**





 