---
layout: single
title: Java - Clase Abstracta
date: 2022-04-10
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-clase
  - java-abstractas
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Clases Abstractas

* Son un tipo de **clases especiales** que tienen algunos **métodos** implementados porque sabemos que tarea tienen **que hacer** y también contienen otros **métodos que no** están implementado ``(Todavía no tenemos claro que harán de cara al futuro esos métodos sin implementar)``

  * Ejemplo

```java
/**
 *  Clase Básica Abstracta
 */
public abstract class ClaseAbstractaEjemplo implements InterfaceEjemplo{
. . .
}
```

* Si una ``clase hija`` hereda de una ``clase abstracta`` se tiene que indicar con la palabra clave ``extends``

  * Esta clase heredará todos los **atributos/propiedades** y **métodos** tanto implementados como sin implementar de la **clase abstracta**

```java
/**
 *  Clase Básica Abstracta
 */
public class ClaseHija extends ClaseAbstractaEjemplo {
}
```

* Solo se puede heredar de una clase Padre o Abstracta y se puede implementar de tantas interfaces se necesite

```java
/**
 *  Clase Básica Abstracta
 */
public class ClaseHija extends ClaseAbstractaEjemplo implements InterfaceEjemplo1 , InterfaceEjemplo2 {
  . . .
}
```
