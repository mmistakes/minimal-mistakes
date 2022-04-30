---
layout: single
title: Java - Override
date: 2022-04-28
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-herencia
  - java-override
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Anotación - @Override

* Su significado real de esta palabra al español sería
  * ``anular invalidar cancelar desactivar escuchar``

* Aunque muchos tutoriales , manuales y libros indican que la anotación **@Override** significa ``Sobrescritura``

### Función

* Se utiliza para ``reescribir/sobrescribir`` los métodos que heredamos de una **Super Clase** , **Clase Padre** , **Clase Base** dentro de una Clase Hija que extienda dicha clase

### Ejemplo de @Override

* Heredamos el **método toString** de la ``Super Clase Object`` de la **librería** de **Java** y nos indica que podemos modificar su funcionamiento para que se ajusten a nuestras necesidades mediante la anotación ``@Override``

```java
 @Override
 public String toString() {
  // TODO Auto-generated method stub
  return super.toString();
 }
```

* El método estándar ``toString()`` heredado de la **Clase Object** tiene esta sintaxis

```java
// Nombre de la clase         Código Hexadecimal(Código Hash)
//             ↓                           ↓        ↓
 getClass().getName() + '@' + Integer.toHexString(hashCode())
```

* Necesitamos modificarlo para que se adapten a nuestras necesidades

### Ejemplo con Clase de @Override

```java
// Ejemplo de Clase
public class EjemploOverride {

public static void main(String[] args) {
  // Instanciación de la Clase Coche
  Coche coche1 = new Coche(4, 4, "Mercedes", "300 SL");
  System.out.println(coche1.toString());
 }
}

// Clase coche
class Coche {
// Atributo de instancia de la Clase Coche
 private int ruedas = 0;
 private int puertas = 0;
 private String nombre = null;
 private String modelo = null;

 /**
  * Constructor por defecto
  */
 public Coche() {
  ruedas = 0;
  puertas = 0;
  nombre = null;
  modelo = null;
 }

 /**
  * Constructor parametrizado
  *
  * @param ruedas
  * @param puertas
  * @param nombre
  * @param modelo
  */
 public Coche(int ruedas, int puertas, String nombre, String modelo) {
  this.ruedas = ruedas;
  this.puertas = puertas;
  this.nombre = nombre;
  this.modelo = modelo;
 }

/**
* Procedimiento de instancia
*/
 public void setRuedas(int ruedas) {
  this.ruedas = ruedas;
 }

/**
* Método de instancia
*/
 public int getRuedas() {
  return ruedas;
 }

/**
* Procedimiento de instancia
*/
public void setPuertas(int puertas) {
  this.puertas = puertas;
 }

/**
* Método de Instancia
*/
 public int getPuertas() {
  return puertas;
 }

/**
* Procedimiento de instancia
*/
 public void setModelo(String modelo) {
  this.modelo = modelo;
 }

/**
* Método de instancia
*/
 public String getModelo() {
  return modelo;
 }

/**
* Procedimiento de instancia
*/
 public void setNombre(String nombre) {
  this.nombre = nombre;
 }

/**
* Método de instancia
*/
 public String getNombre() {
  return nombre;
 }

/**
* Método de instancia
* LA anotación @Override redefine el "método toString" heredado de la "clase Object" para que muestre los valores de los objetos de la "clase Coche" que los invoque y se muestren por consola
*  
*/
@Override
public String toString() {
 return "• Nombre: ".concat(getModelo()) + " Modelo: ".concat(getModelo()) + " Puertas: " + getPuertas()
    + " Ruedas: " + getRuedas();
}
```
