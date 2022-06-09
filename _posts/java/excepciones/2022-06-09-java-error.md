---
layout: single
title: Java - Excepciones
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
  - java-error
  - java-throwable
  - java-excepciones
page_css: 
  - /assets/css/mi-css.css
---

## Error

> ``Errores Irrecuperables``

* Clase descendiente de **Throwable**

* Son aquellos problemas que ocurren debido a algún problema con la disponibilidad de recursos de los cuales el sistema es responsable, como la excepción de  ``'memoria virtual / memory exception'``.

* Dado que estos ``errores`` ocurren debido a la falta de fallas del sistema, no son recuperables.

Para cada  ``thread/subproceso`` en **Java**, **JVM** crea una ``pila de tiempo de ejecución / runtime stack`` .

El **método** en el que ocurre la **excepción** es responsable de manejar la **excepción**.

Si no hay un controlador de ``excepciones definido``, **JVM** finaliza el proceso de forma anormal llamando al controlador de excepciones predeterminado de **Java** y elimina el **proceso** de la ``pila/stack``

### Ejemplos de Clases

``StackOverflowError``
Se produce por una **recursividad** infinita

``OutOfMemoryError``
Se lanza cuando la **máquina virtual de Java** no puede asignar un objeto porque no tiene ``memoria`` y el ``recolector de basura`` no utilizados no puede proporcionar más memoria

La ``máquina virtual`` puede construir objetos OutOfMemoryError como si la supresión estuviera deshabilitada y/o no se pudiera escribir en el seguimiento de la pila

``AssertionError``
Lanzado para indicar que una aserción ha fallado.
Los siete constructores públicos de un argumento proporcionados por esta clase aseguran que el error de aserción devuelto por la invocación:

``NoClassDefFoundError``
Error de configuración de **classpath**

``NoSuchMethodError/NoSuchFieldError``
Se produce por una  **versión incorrecta** de una **clase** que se está cargando
