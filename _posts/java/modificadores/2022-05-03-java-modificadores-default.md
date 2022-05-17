---
layout: single
title: Java - Modificadores
date: 2022-05-03
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-default
tags:
  - java-modificadores
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Modificador - default

* Elementos que se ponen delante de la declaración de un elemento
  * **Clases** , **Objetos** , **Métodos** , **Atributos**

* Modificador ``default``
  * ``Modificador por defecto`` , no tiene un modificador asignado delante del la ``clase`` , ``atributo`` o ``método``
    * Una ``clase sin modificador`` sera accesible solo por las otras ``clases`` del ``paquete/package``
    * Un ``atributo`` sin modificador sera accesible solo desde el mismo ``paquete/package`` , a diferencia de un ``atributo protected`` el cual no tendrá visibilidad en las ``clases hijas`` salvo que estén en el mismo ``paquete/package``

### Ejemplo de Código

```java
/**
 * Modificador Default / Package
 * 
 * Cuando no usamos ninguna palabra clave explícitamente Java establecerá un
 * acceso por defecto a una determinada clase, método o propiedad.
 * 
 * El modificador de acceso por defecto también se llama
 * "package/paquete"-"private/privado", lo que significa que todos los miembros
 * son visibles dentro del mismo "package/paquete" pero no son accesibles desde
 * otros "package/paquete"
 * 
 */
class ModificadorDefault {

 /**
  * Atributos de instancia
  * 
  * Visibles dentro del mismo paquete pero no son accesibles desde otros paquetes
  * 
  */
 int x;

 /**
  * Constructor por defecto
  * 
  * Visibles dentro del mismo paquete pero no son accesibles desde otros paquetes
  */
 ModificadorDefault() {
  this.x = 0;
 }

 /**
  * Constructor por parametros
  * 
  * Visibles dentro del mismo paquete pero no son accesibles desde otros paquetes
  * 
  * @param x
  */
 ModificadorDefault(int x) {
  this.x = x;
 }

 /**
  * Método de instancia
  * 
  * Visibles dentro del mismo paquete pero no son accesibles desde otros paquetes
  * 
  * @return x
  */
 int getX() {
  return x;
 }

 /**
  * Procedimiento de instancia
  * 
  * Visibles dentro del mismo paquete pero no son accesibles desde otros paquetes
  * 
  * @param x
  */
 void setX(int x) {
  this.x = x;
 }
}

```