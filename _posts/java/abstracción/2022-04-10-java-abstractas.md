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

  * No se permite crear **objetos** a partir de una **clase abstracta** pero si desde sus **clases hijas descendientes**

  * Implementará lo que sepa cómo hacer y dejará que sean **clases hijas** (abstractas o especificas) quienes terminen de implementar lo que aún se desconoce que deben de hacer

### Modificador abstract

* Elementos **abstractos** que no están implementados
  * Si una clase es abstracta (necesita ser extendida) y **no puede ser final** (este Modificador ``no permite que sea extendida`` por las **clases hijas** de esta)
* Los ``métodos abstractos`` no están implementados , ``se implementarán`` en una ``clase hija``
  * Si una ``clase`` contiene un ``método abstracto`` , ha de ser una ``clase abstracta``
  * Cuando declaremos un ``método abstracto`` , **no lo implementaremos** entre llaves , solo declararemos la cabecera con el punto y coma al final

```java
  public abstract metodoAbstracto();
```

### Ejemplo

```java
/**
 *  Clase Básica Abstracta
 */
public abstract class ClaseAbstractaEjemplo implements InterfaceEjemplo{
. . .
}
```

* Si una ``clase hija`` hereda de una ``clase abstracta`` se tiene que indicar con la palabra clave ``extends``

  * Esta **clase** heredará todos los **atributos/propiedades** y **métodos** tanto **implementados** como **sin implementar** de la **clase abstracta**

```java
/**
 *  Clase Básica Abstracta
 */
public class ClaseHija extends ClaseAbstractaEjemplo {
}
```

* Solo se puede heredar de una **clase Padre** o **abstracta** y se puede implementar de tantas **interfaces** se necesite

```java
/**
 *  Clase Básica Abstracta
 */
public class ClaseHija extends ClaseAbstractaEjemplo implements InterfaceEjemplo1 , InterfaceEjemplo2 {
  . . .
}
```
