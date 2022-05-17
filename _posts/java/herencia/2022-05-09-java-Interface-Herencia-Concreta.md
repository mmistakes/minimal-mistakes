---
layout: single
title: Java - Sistema en Cascada de Implementación y Herencia  
date: 2022-05-09
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-Interface 
  - java-Herencia 
  - java-Clase
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Sistema en Cascada de Implementación y Herencia

* La implementación mediante la **Interface** y la **Herencia** se realiza como si fuera una cascada de elementos descendentes

### Resumen del funcionamiento de las Interfaces , Herencias y Clases Concretas

* Todo funciona como un **flujo continuo en forma descendente** de elementos **como si fuera una cascada** que van implementando cada uno de los elementos que van sucediendo a continuación

* Cada vez que va ``heredando`` de una **Clase Padre** , la siguiente **Clase Hija** va ``concreta`` aun más el propósito de la ``clase`` anterior generando una ``especialización mayor`` dentro del contexto del desarrollo del software
  
  * Ejemplo :
    * **Clase Padre** : ``Vehículo``
      * **Clase Hija** de la anterior y **Clase Padre** de la siguiente : ``Coche``
        * **Clase Hija** de la anterior y **Clase Padre** de la siguiente : ``Turismo``
          * **Clase Hija** de la anterior y **Clase Padre** de la siguiente : ``Mercedes``

**Interface** → ``IPlanta``

* Define las **constantes** y la firma de los ``métodos`` que se irán implementando en las demás **clases descendientes o hijas**
  
**Clase Abstracta** → ``Planta``

* **Clase abstracta** implementa la **Interface anterior** ``IPlanta``

* Pueden invocar las **constantes** de la **Interface** declarada anteriormente

* Implementan según la necesidad los **métodos** recibidos que necesitemos por la **Interface IPlanta**

* Declara y define sus **atributos propios** para almacenar los **valores devueltos** por los **métodos** tanto los de su **propia clase** como los **métodos** de la **Interface**

* La **clase abstracta** no puede **instanciar objetos** , solo lo permiten las **clases hijas** descendiente de la **clases abstractas** para hacerlo

**Clase Abstracta** → ``PlantaFruto``

* **Clase abstracta** descendiente de la anterior **clase abstracta** ``Planta``

* Extiende la **clase abstracta** ``Planta`` e implementados **métodos heredados**

* Hereda el **constructor** de la **clase abstracta** ``Planta``

* Añade y puede invocar todos los **atributos** y **métodos** de las demás **clases abstracta**

**Clase Concreta** → ``Tomate``

* **Clase concreta** que descendiente de la anterior **clase abstracta** ``PlantaFruto``

* Clase que hereda los **métodos** de la **clase abstracta** ``Planta`` y de la clase abstracta ``PlantaFruto``

* Invocar al **constructor** de la **clase abstracta** ``PlantaFruto`` para definir el objeto

* Dentro del objeto tenemos **atributos** definidos en la interface ``IPlanta`` e implementados en la **clase abstracta** ``PlantaFruto``

**Clase Concreta** → ``TomateCherry``

* **Clase concreta** que descendiente de la anterior **clase concreta** ``Tomate``

* Hereda todas las **constantes** , **atributos** y **métodos** de las anteriores clases tanto **abstractas** ``Planta`` , ``PlantaFruto`` como de clases **concretas** ``Tomate``

* El **constructor** de esta **clase** está implementado por los **constructores** heredados de las anteriores **clases**

### Ejemplos

```java
/**
 * Clase Principal - Padre
 * 
 * Define una serie de características que heredará sus clases descendientes
 * como será la clase Hija
 * 
 * @author RVS
 *
 */
public class Padre {

 /**
  * Atributo de instancia : Define el nombre del objeto persona que se instancia
  */
 private String nombre;

 /**
  * Atributo de instancia : Define la edad del objeto persona que se instancia
  */
 private int edad;

 /**
  * Atributo de instancia : Define la altura del objeto persona que se instancia
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
  * Método heredado de la clase Object para mostrar datos
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
 * Clase Hija que hereda algunas características de la clase Padre
 * 
 * Características (Atributos/Métodos) a heredar de la clase Padre serán :
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
  * Define unas características por defecto del objeto que instanciamos
  * 
  */
 public Hija() {
  super();
  this.peso = 0;
  this.colorOjos = "";
  this.lugarDeNacimiento = "";
 }

 /**
  * Constructor que permite definir al objeto que instanciamos una serie de
  * valores y el cual define unas características establecidas heredades del
  * constructor Padre
  * 
  * @param peso
  * @param sexo
  * @param lugarDeNacimiento
  */
 public Hija(double peso, String ojos, String lugarDeNacimiento) {
  // Palabra clave - super → Hace referencia al constructor padre heredado por la clase Hija para asignarles ciertos parámetros definidos por la clase Padre
  super("Maria", 20, 160);
  this.peso = peso;
  this.colorOjos = ojos;
  this.lugarDeNacimiento = lugarDeNacimiento;
 }

 /**
  * Método de la clase Padre heredado por la clase Hija
  * 
  * Permite obtener el nombre de la clase Hija
  */
 @Override
 public String getNombre() {
  // TODO Auto-generated method stub
  return super.getNombre();
 }

 /**
  * Método de la clase Padre heredado por la clase Hija
  * 
  * Permite establecer el nombre de la clase Hija
  */
 @Override
 public void setNombre(String nombre) {
  // TODO Auto-generated method stub
  super.setNombre(nombre);
 }

 /**
  * Método de la clase Padre heredado por la clase Hija
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
  * Método de la clase Padre heredado por la clase Hija
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
  * Método de la clase Padre heredado por la clase Hija
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
  * Método de la clase Padre heredado por la clase Hija
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

* Desde la clase Principal ``main`` crearemos los objetos de las distintas clases ``Padre`` e ``Hija`` y ejecutaremos los ``métodos`` que nos muestren los valores almacenados dentro de los mismos

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

* La **clase main** donde ejecutaremos el código

```java
public class HerenciaPadreHijaMain {

 public static void main(String[] args) {

//  Creamos un objeto Padre desde el constructor por defecto el cual tenía definidos una serie de valores básicos dentro del constructor
  Padre padreAnonimo = new Padre();
  System.out.println("• " + padreAnonimo.toString());

//  Creamos un objeto Padre desde un constructor que tiene definido una serie de parámetros los cuales le darán valores que almacenara el nuevo objeto padre que vayamos a crear
  Padre padre = new Padre("David", 32, 180);
  System.out.println("•• " + padre.toString());

//  Creamos un objeto Hija desde un constructor por defecto el cual tenía definidos una serie de valores básicos dentro del constructor 
  Hija hija1 = new Hija();
  System.out.println("♦ " + hija1.toString());

//  Creamos un objeto Hija desde un constructor que tiene definidos una serie de parámetros los cuales le darán valores que almacenara el nuevo objeto padre que vayamos a crear
  Hija hija2 = new Hija(56, "azules", "Madrid");
  System.out.println("♦♦ " + hija2.toString());

 }
}
```

* La salida del código es :

```java
• Nombre: Anónimo Edad: 0 Altura: 0.0
•• Nombre: David Edad: 32 Altura: 180.0
♦ Nombre: Anónimo Edad: 0 Altura: 0.0 Peso: 0.0 kg  Color de Ojos:  Lugar de Nacimiento: 
♦♦ Nombre: Maria Edad: 20 Altura: 160.0 Peso: 56.0 kg  Color de Ojos: azules Lugar de Nacimiento: Madrid
```
