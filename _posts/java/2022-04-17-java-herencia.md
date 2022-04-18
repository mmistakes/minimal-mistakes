---
layout: single
title: Java - Herencia
date: 2022-04-17
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-herencia
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Palabra Clave - Herencia

* Cuando una ``clase hija`` **hereda** las características **'atributos y metodos'** de una ``clase padre`` y extiende esas características a la propia ``clase hija`` u otras clases descendientes de esta usaremos la palabra clave ``extends`` desde la ``clase hija``

```java
/**
 * Clase Principal - Padre
 * 
 * Define una serie de caracteristicas que heredará sus clases desdencientes
 * como será la clase Hija
 * 
 * @author RVS
 *
 */
public class Padre {

 /**
  * Atributo de instancia : Define el nombre del objeto persona que se instancie
  */
 private String nombre;

 /**
  * Atributo de instancia : Define la edad del objeto persona que se instancie
  */
 private int edad;

 /**
  * Atributo de instancia : Define la altura del objeto persona que se instancie
  */
 private double altura;

 /**
  * Constructor por defecto de la Clase Persona
  * 
  */
 public Padre() {
  this.nombre = "Anónimo";
  this.edad = 0;
  this.altura = 0.0;
 }

 /**
  * Constructor para instanciar objetos de la Clase Persona
  * 
  * @param nombre
  * @param edad
  * @param altura
  */
 public Padre(String nombre, int edad, double altura) {
  this.nombre = nombre;
  this.edad = edad;
  this.altura = altura;
 }

 /**
  * Establece un nombre del objeto
  *
  * @param nombre que se le asigna al objeto
  */
 public void setNombre(String nombre) {
  this.nombre = nombre;
 }

 /**
  * Devuelve el nombre del objeto
  */
 public String getNombre() {
  return nombre;
 }

 /**
  * Establece la edad del objeto
  * 
  * @param edad que se le asigna al objeto
  */
 public void setEdad(int edad) {
  this.edad = edad;
 }

 /**
  * Devuelve la edad del objeto
  */
 public int getEdad() {
  return edad;
 }

 /**
  * Establece la altura del objeto
  * 
  * @param altura que se le asigna al objeto
  */
 public void setAltura(int altura) {
  this.altura = altura;
 }

 /**
  * Devuelve la altura del objeto
  */
 public double getAltura() {
  return altura;
 }

 /**
  * 
  */
 @Override
 public String toString() {
  return "Nombre: " + getNombre() + " Edad: " + getEdad() + " Altura: " + getAltura();
 }
}
```

* La **clase Hija** heredará todas las características de la **clase Padre** y añadirá las suyas propias

```java
/**
 * Clase Hija que hereda algunas caracteristicas de la clase Padre
 * 
 * Caracteristicas (Atributos/Metodos) a heredar de la clase Padre serán :
 * 
 * String - Nombre
 * 
 * int - Edad
 * 
 * double - Altura
 * 
 * @author RVS
 *
 */
public class Hija extends Padre {

 /**
  * Atributo de instancia - Define el peso del objeto
  */
 private double peso;

 /**
  * Atributo de instancia - Define el sexo del objeto
  */
 private String colorOjos;

 /**
  * Atributo de instancia - Define el lugar de nacimiento del objeto
  */
 private String lugarDeNacimiento;

 /**
  * Constructor por defecto
  * 
  * Define unas caracteristicas por defecto del objeto que instanciemos
  * 
  */
 public Hija() {
  super();
  this.peso = 0;
  this.colorOjos = "";
  this.lugarDeNacimiento = "";
 }

 /**
  * Constructor que permite definir al objeto que instanciemos una serie de
  * valores y el cual define unas caracteristicas establecidas heredades del
  * constructor Padre
  * 
  * @param peso
  * @param sexo
  * @param lugarDeNacimiento
  */
 public Hija(double peso, String ojos, String lugarDeNacimiento) {
  super("Maria", 20, 160);
  this.peso = peso;
  this.colorOjos = ojos;
  this.lugarDeNacimiento = lugarDeNacimiento;
 }

 /**
  * Metodo de la clase Padre heredado por la clase Hija
  * 
  * Permite obtener el nombre de la clase Hija
  */
 @Override
 public String getNombre() {
  // TODO Auto-generated method stub
  return super.getNombre();
 }

 /**
  * Metodo de la clase Padre heredado por la clase Hija
  * 
  * Permite establecer el nombre de la clase Hija
  */
 @Override
 public void setNombre(String nombre) {
  // TODO Auto-generated method stub
  super.setNombre(nombre);
 }

 /**
  * Metodo de la clase Padre heredado por la clase Hija
  * 
  * Permite establecer la edad de la clase Hija
  * 
  */
 @Override
 public int getEdad() {
  // TODO Auto-generated method stub
  return super.getEdad();
 }

 /**
  * Metodo de la clase Padre heredado por la clase Hija
  * 
  * Permite establecer la edad de la clase Hija
  * 
  */
 @Override
 public void setEdad(int edad) {
  // TODO Auto-generated method stub
  super.setEdad(edad);
 }

 /**
  * Metodo de la clase Padre heredado por la clase Hija
  * 
  * Permite obtener la altura de la clase Hija
  * 
  */
 @Override
 public double getAltura() {
  // TODO Auto-generated method stub
  return super.getAltura();
 }

 /**
  * Metodo de la clase Padre heredado por la clase Hija
  * 
  * Permite establecer la altura de la clase Hija
  * 
  */
 @Override
 public void setAltura(int altura) {
  // TODO Auto-generated method stub
  super.setAltura(altura);
 }

 /**
  * Obtener el peso del objeto hija
  * 
  * @return Peso en kilogramos
  */
 public double getPeso() {
  return peso;
 }

 /**
  * Establecer el peso del objeto hija
  * 
  * @param peso
  */
 public void setPeso(double peso) {
  this.peso = peso;
 }

 /**
  * Obtener el ojos del objeto hija
  * 
  * @return
  */
 public String getColorOjos() {
  return colorOjos;
 }

 /**
  * Establecer los ojos del objeto hija
  * 
  * @param ojos
  */
 public void setOjos(String ojos) {
  this.colorOjos = ojos;
 }

 /**
  * Obtener el lugar de nacimiento del objeto hija
  * 
  * @return
  */
 public String getLugarDeNacimiento() {
  return lugarDeNacimiento;
 }

 /**
  * Establecer el lugar de nacimiento del objeto hija
  * 
  * @param lugarDeNacimiento
  */
 public void setLugarDeNacimiento(String lugarDeNacimiento) {
  this.lugarDeNacimiento = lugarDeNacimiento;
 }

 /**
  * this.peso = 0; this.colorOjos = ""; this.lugarDeNacimiento = "";
  * 
  */
 @Override
 public String toString() {
  return "Nombre: " + getNombre() + " Edad: " + getEdad() + " Altura: " + getAltura() + " Peso: " + getPeso()
    + " kg " + " Color de Ojos: " + getColorOjos() + " Lugar de Nacimiento: " + getLugarDeNacimiento();
 }
}
```

* Desde la clase principal crearemos los objetos de las distintas clases Padre e Hija y ejecutaremos los metodos que nos muestren los valores almacenados dentro de los mismos

```java

public class HerenciaPadreHijaMain {

 public static void main(String[] args) {

  Padre padreAnonimo = new Padre();
  System.out.println("• " + padreAnonimo.toString());

  Padre padre = new Padre("David", 32, 180);
  System.out.println("•• " + padre.toString());

  Hija hija1 = new Hija();
  System.out.println("♦ " + hija1.toString());

  Hija hija2 = new Hija(56, "azules", "Madrid");
  System.out.println("♦♦ " + hija2.toString());

 }
}
```

* La clase main donde ejecutaremos el código

```java
public class HerenciaPadreHijaMain {

 public static void main(String[] args) {

//  Creamos un objeto Padre desde el constructor por defecto el cual tenía definidos una serie de valores básicos dentro del constructor
  Padre padreAnonimo = new Padre();
  System.out.println("• " + padreAnonimo.toString());

//  Creamos un objeto Padre desde un constructor que tiene definido una serie de parametros los cuales le darán valores que almacenara el nuevo objeto padre que vayamos a crear
  Padre padre = new Padre("David", 32, 180);
  System.out.println("•• " + padre.toString());

//  Creamos un objeto Hija desde un constructor por defecto el cual tenía definidos una serie de valores básicos dentro del constructor 
  Hija hija1 = new Hija();
  System.out.println("♦ " + hija1.toString());

//  Creamos un objeto Hija desde un constructor que tiene definidos una serie de parametros los cuales le darán valores que almacenara el nuevo objeto padre que vayamos a crear
  Hija hija2 = new Hija(56, "azules", "Madrid");
  System.out.println("♦♦ " + hija2.toString());

 }
}

```

* La salida del codigo es :

```java
• Nombre: Anónimo Edad: 0 Altura: 0.0
•• Nombre: David Edad: 32 Altura: 180.0
♦ Nombre: Anónimo Edad: 0 Altura: 0.0 Peso: 0.0 kg  Color de Ojos:  Lugar de Nacimiento: 
♦♦ Nombre: Maria Edad: 20 Altura: 160.0 Peso: 56.0 kg  Color de Ojos: azules Lugar de Nacimiento: Madrid
```
