---
layout: single
title: Java - Excepciones - Throwable
date: 2022-04-18
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-apis
  - java-manual
tags:
  - java-excepciones
  - java-throwable
page_css: 
  - /assets/css/mi-css.css
---

## Excepciones - Clase Throwable

* **API** principal de las **Excepciones** producidas en Java
  * Son **clases** que contienen ``constructores`` , ``métodos`` y ``atributos``
* **Clase Padre** la cual heredan las demás clases hijas ``Error`` y ``Exception``

### Constructores

* ``Throwable()``
  * No proporciona ningún detalle sobre la excepción que la produjo

* ``Throwable(String message)``
  * Recibe un String que será un mensaje del error con el detalle del error mismo

* ``Throwable(String message , Throwable cause)``
  * Recibe un String que será un mensaje de error y otro que sería la causa original de la excepción

### Métodos

* ``getMessage()``
  * Devuelve el mensaje de la excepción que estará definido dentro del constructor Throwable

* ``getLocalizedMessage()``
  * Realiza la misma acción que getMessage() a no ser que una clase hija lo haya sobrescrito para producir un mensaje especifico en una clase Locale en concreto

    * ``Locale`` nos indica la configuración de idioma y el país del sistema operativo con el que estamos trabajando
  
* ``getCause()``
  * Devuelve la excepción ``Throwable`` que causo la excepción
  * Nos muestra la causa del problema
  
* ``toString()``
  * Devuelve el nombre de la excepción y el mensaje
  * Más completo que ``getMessage()`` ya que ayuda a conocer el nombre y el mensaje de la excepción para comprender lo sucedido

* ``printStackTrace()``
  * Muestra por pantalla la salida de error estandar (terminal o archivo logs) la ``stack trace`` (la ``pila/stack`` de ``trazas/tracker``) de la excepción
  * ``stack trace`` : Es la lista con todos los **métodos** a los que se ha llamado para llegar hasta a la ejecución del error que produjo la **excepciones**
    * Pertenece a la clase ``printStackTrace()``
