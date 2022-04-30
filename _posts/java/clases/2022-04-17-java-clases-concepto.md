---
layout: single
title: Java - Clase
date: 2022-04-17
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-clase
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Clase

* Se entiende como un archivo del tipo ``.java`` cuyo interior tiene definida una **estructura básica** sobre las características las cuales tendrá un elemento concreto dentro del **sistema** o **programa** que vamos a crear o diseñar
  * Se podría decir que es una especie de :
    * **Patrón** ←→ **Molde** ←→ **Modelo** ←→ **Ejemplo**
  
* Todas las ``clases`` que construyamos o usemos de la ``API oficial`` de ``Java`` heredan de la ``clase principal`` llamada ``Clase Object``

### Ejemplo de Clase

```java
/**
* Diseño del Patrón de la Clase Persona
* 
* De esta clase podremos sacar/instanciar tantas copias "objetos" con distintos valores como necesitemos
*
*/
public class Persona{
// Atributo de instancia : Define el nombre del objeto persona que se instancia
 private String nombre;
// Atributo de instancia : Define la edad del objeto persona que se instancia
 private int edad;
// Atributo de instancia : Define la altura del objeto persona que se instancia
 private double altura;

/**
* Constructor de la Clase Persona por defecto
* 
*/
public Persona(){
  this.nombre = "Anónimo";
  this.edad = 0;
  this.altura = 0.0;
  }
}
```
