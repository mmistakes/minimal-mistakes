---
layout: single
title: Java - Enum
date: 2022-04-12
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

## Tipo Especial - Enum

* Es un **tipo de dato especial** el cual se puede equiparar de cierta manera como una ``clase`` que permite que una **variable** declarada en esta ``clase`` sea un **conjunto de constantes** predefinidas
  * Un tipo enum puede estar compuesto por ``atributos`` , ``constructores`` , ``métodos``
  
* Dentro de la ``clase`` puede incluir  ``métodos static`` que devuelven un array que contiene todos los valores enumerados en el orden que estén declarados
  
  * Recuerda : Todas las **variables constantes** se deben de poner en mayúsculas
  
    * ``private static final String CONSTANTE;``

* Definimos el **tipo de dato especial** mediante usando la palabra clave ``keyword``

* Debes utilizar los tipos enumerados ``enum`` siempre que necesites representar un conjunto fijo de **constantes**
  * Esto incluye **tipos de enumerados** de tipo ``String`` o **conjuntos de datos** en los que se conocen todos los valores posibles en tiempo de compilación
    * Ejemplo
      * Opciones de un menu que hayamos definido
      * ``flags`` de un comando desde la línea de comandos que se pasan como argumentos

### Ejemplo de Código

```java
// Definimos una clase del tipo enum con los días de la semana
public enum Day{
  SUNDAY , MONDAY , TUESDAY , WEDNESDAY , THURSDAY , FRIDAY , SATURDAY
}
```

```java
// Clase principal
public class EnumTest{
  Day day;

// Constructor de la clase principal que invoca como parámetro un tipo de dato enum de la clase enum Day 
  public EnumTest(Day day){
    this.day = day;
  }

// Método para mostrar los datos tipos enum
public void getDay(){
  switch(day){
    case MONDAY:
    System.out.println("MONDAY");
    break;
    case TUESDAY:
    System.out.println("TUESDAY");
    break;
    case WEDNESDAY:
    System.out.println("WEDNESDAY");
    break;
    case THURSDAY:
    System.out.println("THURSDAY");
    break;
    case FRIDAY:
    System.out.println("FRIDAY");
    break;
    case SATURDAY:
    System.out.println("SATURDAY");
    break;
    case SUNDAY:
    System.out.println("SUNDAY");
    break;
default: 
    System.out.println("No hay más días");
    break;
  }
}

public static void main(String[] args){
  // Invocamos los datos del tipo enum mediante su clase y llamando a sus propiedades
  EnumTest primerDia = new EnumTest(Day.MONDAY);
  primerDia.getDay();
  EnumTest segundoDia = new EnumTest(Day.TUESDAY);
  primerDia.getDay();
  EnumTest tercerDia = new EnumTest(Day.WEDNESDAY);
  primerDia.getDay();
  // . . . Así hasta el último valor definido en el caso que queramos hacerlo
  }
}
```
