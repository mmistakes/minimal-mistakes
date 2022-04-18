---
layout: single
title: Java - Constructor
date: 2022-04-18
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-constructor
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Java - Constructor

* Es un **método especial** que se utiliza para inicializar los **atributos/elementos** de un objeto y asi definir su ``estado`` o ``"elementos internos"``

* Las ``variables`` de **instancia/miembros de la clase** se establecen cuando **instanciamos/creamos** un **objeto** a través de los **atributos definidos** en su interior o a través de los **parámetros** del **método constructor**

### Ejemplo de Constructor Por Defecto

* ``Constructor por defecto``
  * Define un **objeto** con una serie de **parámetro predeterminado**
  * Cuando se **instancie** el **objeto** tendrá los valores que se le haya asignado dentro del interior del objeto

```java
public class Padre{

// Atributos de instancia
  private String nombre;
  private int edad;
  private double altura;

/**
* Constructor que acepta parametros
*
*/
 public Padre() {
  //  Valores que definirá el objeto que se instancie
  this.nombre = "Anónimo";
  this.edad = 0;
  this.altura = 0.0;
 }

public static void main(String[] args){
  // Instanciación del objeto tendra por defecto los siguientes valores
 Padre padre = new Padre();
  // nombre = "Anónimo";
  // edad = 0;
  // altura = 0.0;
  }
}
```

### Ejemplo de Constructor Recibe Parámetros

* ``Constructor con parámetros para inicializar objetos``
  * Define un **objeto** con una serie de **parámetros** definidos en la **inicialización** del **objeto**

```java
public class Padre{

  private String nombre;
  private int edad;
  private double altura;

/**
* Constructor que acepta parametros
*
* @param nombre String - Nombre del objeto Padre
* @param edad - int - Edad del objeto Padre
* @param altura - double - Altura del objeto Padre
*/
 public Padre(String nombre, int edad, double altura) {
  this.nombre = nombre;
  this.edad = edad;
  this.altura = altura;
 }

public static void main(String[] args){
  // El objeto instanciado le asignamos una serie de parámetros que nos los define los parámetros del constructor
 Padre padre = new Padre("David" , 32 , 180);
  // nombre = "David";
  // edad = 32;
  // altura = 180;
  }
}
```

* Ahora tenemos 2 objetos instanciados

Un **objeto** definido en su interior por los valores por **defecto del constructor**

```java
  Padre padre = new Padre();
```  

Un **objeto** definido por los valores por pasados por **parámetros del constructor**

```java
  Padre padre = new Padre("David" , 32 , 180);
```
