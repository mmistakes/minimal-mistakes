---
layout: single
title: Java - Super
date: 2022-04-19
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
  - java-super
  - java-constructor
page_css: 
  - /assets/css/mi-css.css
---

## Palabra Clave - super

* Hace referencia al **Constructor Padre** ``heredado/extendidas`` por las **clases Hijas** para asignarles **argumentos** definidos por los **atributos/estados** la **clase Padre** y así invocar o utilizar tanto sus atributos como métodos

* También se pueden usar en los **métodos de instancia** de una **clase** para invocar **métodos** de la **clase Padre**

```java
/**
 * Clase Concreta - Padre
 * 
 * Contiene todos los valores más generalizados con los que vamos a trabajar
 * 
 */
public class Padre {

// Atributos de Instancia de la propia 
// clase para almacenas los valores de los objetos que vayamos creando
 public int edad;

 public String nombre;

 public String apellidos;

 public double peso;

 /**
  * Constructor por defecto de la clase Padre
  * 
  * Se usa para inicializar los objetos de la clase Padre
  */
 public Padre() {
  edad = 0;
  nombre = null;
  apellidos = null;
  peso = 0.0;
 }

 /**
  * Constructor parametrizado de la clase Padre
  * 
  * Se usa para inicializar los objetos de la clase Padre
  * 
  * @param edad
  * @param nombre
  * @param apellidos
  * @param peso
  */
 public Padre(int edad, String nombre, String apellidos, double peso) {
  this.edad = edad;
  this.nombre = nombre;
  this.apellidos = apellidos;
  this.peso = peso;
 }

 /**
  * Metodo de instancia
  * 
  * @return Devuelve edad
  */
 public int getEdad() {
  return edad;
 }

 /**
  * Procedimiento de instancia
  * 
  * @param edad - Establece la edad
  */
 public void setEdad(int edad) {
  this.edad = edad;
 }

 /**
  * Metodo de instancia
  * 
  * Procedimiento de instancia
  * 
  * @return - Devuelve nombre
  */
 public String getNombre() {
  return nombre;
 }

 /**
  * Procedimiento de instancia
  * 
  * @param nombre - Establece Nombre
  */
 public void setNombre(String nombre) {
  this.nombre = nombre;
 }

 /**
  * Metodo de instancia
  * 
  * @return - Devuelve apellidos
  */
 public String getApellidos() {
  return apellidos;
 }

 /**
  * Procedimiento de instancia
  * 
  * @param apellidos - Establece apellidos
  */
 public void setApellidos(String apellidos) {
  this.apellidos = apellidos;
 }

 /**
  * Metodo de instancia
  * 
  * @return - Devuelve peso
  */
 public double getPeso() {
  return peso;
 }

 /**
  * Procedimiento de instancia
  * 
  * @param peso - Establece peso
  */
 public void setPeso(double peso) {
  this.peso = peso;
 }

 /**
  * Metodo heredado de la Clase Base Object para mostrar todos los valores que
  * hemos ido añadiendo a los objetos que hemos instanciado
  */
 @Override
 public String toString() {
  return "Nombre: " + getNombre() + " Apellidos: " + getApellidos() + " Edad: " + getEdad() + " Peso: "
    + getPeso();
 }
}
```

* **Clase Hijo** descendiente de la **Clase Padre** la cual puede invocar al constructor de la **Clase Padre** mediante la palabra clave ``super`` y así añadir los atributos e invocar los métodos de la clase de la que hereda

```java
package conceptos.super_ejemplo;

/**
 * Sublase de la clase Padre la cual hereda todos los elementos de la clase
 * Padre y ademas añade elementos propios para implementar los objetos según las
 * necesidades de las reglas de negocio
 * 
 *
 */
public class Hijos extends Padre {

// Atributos de la Clase Hijo para almacenar 
// los elementos que vayamos añadiendo 
// a los objetos que vayamos creando
 public String colorPelo;

 public String colorOjos;

 public double estatura;

 public boolean estudiante;

 /**
  * Constructor por defecto
  * 
  * Este Constructor invoca mediante la palabra "super" al constructor de la que
  * desciende llamada "Clase Padre" para implementar sus objetos con los
  * atributos y metodos que esta clase posee
  */
 public Hijos() {
  super(0, "Non-Name", "Non-SubName", 0.0); // Invoca al constructor de la clase PADRE para implementar con sus
             // atributos los objetos de la clase descendiente llamada 'Clase
             // Hija'
  this.colorPelo = null;
  this.colorOjos = null;
  this.estatura = 0.0;
  this.estudiante = false;
 }

 /**
  * Constructor parametrizado de la clase Hijo
  * 
  * Este Constructor invoca mediante la palabra "super" al constructor de la que
  * desciende llamada "Clase Padre" para implementar sus objetos con los
  * atributos y metodos que esta clase posee
  * 
  * @param colorPelo  - Atributo de la clase Hijo - Almacena un String con el
  *                   color de pelo
  * @param colorOjos  - Atributo de la clase Hijo - Almacena un String con el
  *                   color de ojos
  * @param estatura   - Atributo de la clase Hijo - Almacena un numero decimal
  *                   para estatura
  * @param estudiante - Atributo de la clase Hijo - Almacena un booleano para los
  *                   estudios
  * 
  *                   Aqui se encuentran los ATRIBUTOS heredado de la clase Padre
  *                   para complementar los objetos de la clase Hijo
  * 
  * @param nombre     - Atributo heredado de la clase Padre - Almacena un String
  *                   con el nombre
  * @param apellidos  - Atributo heredado de la clase Padre - Almacena un String
  *                   con el apellidos
  * @param edad       - Atributo heredado de la clase Padre - Almacena un numero
  *                   con la edad
  * @param peso       - Atributo heredado de la clase Padre - Almacena un decimal
  *                   con el peso
  */
 public Hijos(String colorPelo, String colorOjos, double estatura, boolean estudiante, int edad, String nombre,
   String apellidos, double peso) {
  super(edad, nombre, apellidos, peso); // Invoca al constructor de la clase PADRE para implementar con sus
            // atributos los objetos de la clase descendiente llamada 'Clase Hija'
            // Cada objeto que vayamos a crear tendran tantos atributos y metodos de
            // la propia clase como de la clase superior llamada Clase Padre para
            // tener una mayor implementación , diseño de las reglas de negocios y
            // reutilización del código
  this.colorPelo = colorPelo;
  this.colorOjos = colorOjos;
  this.estatura = estatura;
  this.estudiante = estudiante;
 }

 /**
  * Metodo de instancia de la clase Hijo
  * 
  * @return - Devuelve un String con el color de ojos del objeto instanciado por la clase Hijo
  */
 public String getColorPelo() {
  return colorPelo;
 }

 /**
  * Procedimiento de instancia de la clase Hijo
  * 
  * @param colorPelo - Establece el String sobre el color de ojos que tendrá el objeto Hijo
  */
 public void setColorPelo(String colorPelo) {
  this.colorPelo = colorPelo;
 }

 /**
  * Metodo de instancia de la clase Hijo
  * 
  * @return - Devuelve un String con el color de ojos del objeto instanciado por la clase Hijo
  */
 public String getColorOjos() {
  return colorOjos;
 }

 /**
  * Procedimiento de instancia de la clase Hijo 
  * 
  * @param colorOjos - Establece mediante argumentos el color de ojos del objeto de la clase Hijo
  */
 public void setColorOjos(String colorOjos) {
  this.colorOjos = colorOjos;
 }

 /**
  * Metodo de instancia de la clase Hijo
  *
  * @return - Devuelve la altura del objeto instanciado por la clase Hijo
  */
 public double getEstatura() {
  return estatura;
 }

 /**
  * Procedimiento de instancia de la clase Hijo
  *
  * @param estatura - Establece mediante argumentos la estatura del objeto de la clase Hijo
  */
 public void setEstatura(double estatura) {
  this.estatura = estatura;
 }

 /**
  * Metodo de instancia de la clase Hijo
  * 
  * @return - Devuelve la altura del objeto instanciado por la clase Hijo
  */
 public boolean getEstudiante() {
  return estudiante;
 }

 /**
  * Procedimiento de instancia de la clase Hijo
  * 
  * @param estudiante - Establece mediante argumentos si el objeto de la clase Hijo es estudiante
  */
 public void setEstudiante(boolean estudiante) {
  this.estudiante = estudiante;
 }

 /**
  * Procedimiento de instancia heredado de la clase Padre  
  *
  * @param estudiante - Establece mediante argumentos el nombre del objeto de la clase Hijo
  */
 @Override
 public void setNombre(String nombre) {
  // Atributos heredados por la clase Padre para implementar los objetos que vayamos a crear desde la clase Hijo
  super.setNombre(nombre);
 }

 /**
  * Metodo de instancia heredado de la clase Padre 
  *
  * @return - Devuelve el nombre del objeto de la Clase Hijo
  */
@Override
 public String getNombre() {
  // Atributos heredados por la clase Padre para implementar los objetos que vayamos a crear desde la clase Hijo
  return super.getNombre();
 }

 /**
  * Procedimiento de instancia heredado de la clase Padre - Establece mediante argumentos
  *
  * @param - Establece mediante argumentos el apellido del objeto de la clase Hijo
  */
 @Override
 public void setApellidos(String apellidos) {
  // Atributos heredados por la clase Padre para implementar los objetos que vayamos a crear desde la clase Hijo
  super.setApellidos(apellidos);
 }

 /**
  * Metodo de instancia heredado de la clase Padre
  * 
  * @return - Devuelve el apellido del objeto de la Clase Hijo
  */
@Override
 public String getApellidos() {
  // Atributos heredados por la clase Padre para implementar los objetos que vayamos a crear desde la clase Hijo
  return super.getApellidos();
 }

 /**
  * Procedimiento de instancia heredado de la clase Padre - Establece mediante argumentos
  *
  * @param - Establece mediante argumentos la edad del objeto de la clase Hijo
  */
 @Override
 public void setEdad(int edad) {
  // Atributos heredados por la clase Padre para implementar los objetos que vayamos a crear desde la clase Hijo
  super.setEdad(edad);
 }

 /**
  * Metodo de instancia heredado de la clase Padre
  * 
  * @return - Devuelve la edad del objeto de la Clase Hijo
  */
@Override
 public int getEdad() {
  // Atributos heredados por la clase Padre para implementar los objetos que vayamos a crear desde la clase Hijo
  return super.getEdad();
 }


 /**
  * Procedimiento de instancia heredado de la clase Padre - Establece mediante argumentos el peso que tendrá el objeto Hijo 
  *
  * @param - Establece mediante argumentos el peso del objeto de la clase Hijo
  */
 @Override
 public void setPeso(double peso) {
  // Atributos heredados por la clase Padre para implementar los objetos que vayamos a crear desde la clase Hijo
  super.setPeso(peso);
 }

 /**
  * Metodo de instancia heredado de la clase Padre
  *
  * @return - Devuelve la edad del objeto de la Clase Hijo
  */
 @Override
 public double getPeso() {
  // Atributos heredados por la clase Padre para implementar los objetos que vayamos a crear desde la clase Hijo
  return super.getPeso();
 }

 /**
  * Metodo heredado de la Clase Base Object para mostrar todos los valores que
  * hemos ido añadiendo a los objetos que hemos instanciado
  * 
  */
 @Override
 public String toString() {
  return " Nombre: " + getNombre() + " Apellidos: " + getApellidos() + " Edad: " + getEdad() + " Peso: "
    + getPeso() + " Color Ojos: " + getColorOjos() + " Color Pelo: " + getColorPelo() + " Estudiante: "
    + getEstudiante();
 }
}
```

* Clase usada para **crear** e **implementar** los **objetos** de las **Clase Concreta Padre** y la **Clase Concreta Hijo**

```java
/**
*
* Creamos la clase para instanciar todos los objetos tanto de la Clase Padre como de la Clase Hija
*/
public class PadreHijo {

 public static void main(String[] args) {

  System.out.println("👨 Clase Padre - ");

// Creamos los objetos de la clase Padre
  Padre padreAnonimo = new Padre();
  Padre primerPadre = new Padre(30, "David", "Perez Martin", 96);

  System.out.println("Padre Anonimo → " + padreAnonimo.toString());
  System.out.println("Primer Padre → " + primerPadre.toString());

  System.out.println("👦 Clase Hijo - ");

// Creamos los objetos de la clase Hijo
  Hijos hijoAnonimo = new Hijos();
  Hijos primerHijo = new Hijos("Pelirrojo", "Verdes", 154, true, 12, "Juan", "Perez Garcia", 45);

  System.out.println("Hijo Anonimo → " + hijoAnonimo.toString());
  System.out.println("Primer Hijo → " + primerHijo.toString());

 }
}
```
