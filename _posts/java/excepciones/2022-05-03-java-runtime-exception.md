---
layout: single
title: Java - Runtime Exception
date: 2022-05-16
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
  - java-excepciones
  - java-runtime-exception
page_css: 
  - /assets/css/mi-css.css
---

## Runtime Exception

* Es la **superclase** de aquellas ``excepciones`` que se pueden lanzar durante el funcionamiento normal de la **máquina virtual de Java**.
  
  * ``RuntimeException`` y sus **subclases** son **excepciones no verificadas**
  
  * Las ``excepciones`` no comprobadas no necesitan declararse en la cláusula ``throws`` de un ``método`` o ``constructor`` si pueden generarse mediante la ejecución del ``método`` o ``constructor`` y propagarse fuera del límite del ``método`` o ``constructor``

* Son **excepciones** que se pueden dejar sin tratar hasta el último momento ya que el programador no tiene la obligación de tratarlo , se pueden controlar pero el problema lo genera situaciones fuera del ámbito del usuario , están enfocadas a errores provocados por el programa

### Ejemplos de Runtime Exceptions

#### **NumberFormatException**

* Lanzado para indicar que la aplicación ha intentado convertir una cadena a uno de los tipos numéricos, pero que la cadena no tiene el formato adecuado

* Este error se produce cuando se da un formateo erróneo a un elemento del tipo String y se realiza una conversión a un tipo entero

  * El formato numérico como elemento del tipo String esta mal editado o escrito lo que hace imposible su conversión

```java
  String s = "984,,321";
  int num = Integer.parseInt(s);
  empleado.setSalario(num);
```

#### **NullPointerException**

* Se lanza esta excepción cuando se intenta acceder a una posición de memoria de un elemento tanto del tipo **String** como del tipo **array** y en ella no se encuentra ningún elemento

* Ejemplo tipo String

```java
String s = null;
s.toString();
```

* Ejemplo tipo Array

```java
int[] ar = { 1, 2, 3, 4, 5 };
System.out.println(ar[6]);
```

##### Consejo sobre Excepciones

* Lanzar una **Excepciones** de un tipo distinto a la que hemos capturado , no olvidemos pasarte a esta nueva excepción a la excepciones capturadas para no perder nunca la causa original del problema

* Ejemplo Incorrecto

```java
 /**
  * No añadimos la variable 'npe' al catch
  * 
  * @throws Exception
  */
 public static void lanzarExcepcionSinDetalle() throws Exception {
  Nulo3 nulo = null;
  try {
   nulo.loQueSea();
  } catch (NullPointerException npe) {
// " MALA PRACTICA " - No le pasamos la variable 'npe' a la Excepción original para que se muestre el error 
   throw new Exception();
  }
 }
```

* Ejemplo Correcto

```java
 /**
  * añadimos la variable 'npe' al catch
  * 
  * @throws Exception
  */
 public static void lanzarExcepcionConDetalle() throws Exception {
  Nulo3 nulo = null;
  try {
   nulo.loQueSea();
  } catch (NullPointerException npe) {
// " BUENA PRACTICA " - Le pasamos la variable 'npe' a la Excepción original para que se muestre el error 
   throw new Exception(npe);
  }
 }
```
