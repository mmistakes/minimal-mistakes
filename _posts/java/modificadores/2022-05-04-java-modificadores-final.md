---
layout: single
title: Java - Modificadores final
date: 2022-05-04
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-final
tags:
  - java-modificadores
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Modificador - final

* Este modificador hace que una ``clase`` , ``atributo`` o ``método`` no se pueda modificar

* Los **atributos** y **métodos** no permiten el uso de la etiqueta ``@Override``

### Clases Finales

* No se pueden ``extender`` a otras ``clases hijas``
  * No permiten ``crear subclases`` a partir de una ``clase final``

### Métodos Finales

* No pueden ser ``@Override`` por ninguna de sus subclases

### Atributos Finales

* Las **variables finales** (``atributos`` y (``parámetros``) sólo pueden ser inicializadas una vez
  * Si la **variable final** es una ``referencia`` a un **objeto** esta **variable no se podrá referenciar** con otro ``objeto``

* Se pueden cambiar los **datos** dentro del ``objeto`` pero **no podemos** hacer que ``apunte`` a ``otro objeto``

```java
public void restar(final int a , final int b){
//  Produce un error en tiempo de ejecución
  a -= b; 
}
```
