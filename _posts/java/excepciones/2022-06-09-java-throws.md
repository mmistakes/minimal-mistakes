---
layout: single
title: Java - Throws
date: 2022-06-09
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
  - java-throws
  - java-excepciones
page_css: 
  - /assets/css/mi-css.css
---

## Palabra clave : throws

* La palabra clave ``throws`` (que no debe confundirse con la palabra clave ``throw``) se usa en las declaraciones de ``métodos`` para indicar que el ``método`` puede lanzar el tipo de **excepción** dado.

* Las declaraciones ``throws`` le indican que debe estar preparado para detectar ``excepciones`` de tipo el cual el hayamos indicado en la cabecera del **método** declarado

```java
class Ejemplo {

public static void lanzarThrows() throws NullPointerException {
  Object n = null;
   n.toString();
  }
 }
}
```

* Se pueden especificar varios tipos de **excepción**

```java
class Ejemplo {

void lanzarThrows() throws NullPointerException , InterruptedException, TimeOutException {
// ..
 }
}
```

Las **excepciones** comprobadas que se lanzan en el **método** deben declararse en la cláusula ``throws`` a menos que estén atrapadas dentro del **método**.

Las **excepciones no verificadas** no tienen este requisito y, por lo tanto, no deben mencionarse en la declaración ``throws``
