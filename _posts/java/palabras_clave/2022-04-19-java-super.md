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
  - java-operadores
tags:
  - java-super
  - java-extends
  - java-herencia
  - java-constructor
page_css: 
  - /assets/css/mi-css.css
---

## Palabra Clave - super

* Hace referencia al **Constructor Padre** ``heredado/extendidas`` por las **clases Hijas** para asignarles **argumentos** definidos por los **atributos/estados** la **clase Padre** y así invocar o utilizar tanto sus atributos como métodos

* También se pueden usar en los **métodos de instancia** de una **clase** para invocar **métodos** de la **clase Padre**

### Ejemplo de código

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
  super(0, "Non-Name", "Non-Surnames", 0.0); // Invoca al constructor de la clase PADRE para implementar con sus
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

  System.out.println("👨 Clase Padre ");

// Creamos los objetos de la clase Padre
  Padre padreAnonimo = new Padre();
  Padre primerPadre = new Padre(30, "David", "Perez Martin", 96);

  System.out.println("Padre Anonimo → " + padreAnonimo.toString());
  System.out.println("Primer Padre → " + primerPadre.toString());

  System.out.println("👦 Clase Hijo ");

// Creamos los objetos de la clase Hijo
  Hijos hijoAnonimo = new Hijos();
  Hijos primerHijo = new Hijos("Pelirrojo", "Verdes", 154, true, 12, "Juan", "Perez Garcia", 45);

  System.out.println("Hijo Anonimo → " + hijoAnonimo.toString());
  System.out.println("Primer Hijo → " + primerHijo.toString());

 }
}
```

### Super Invocando Atributos y Métodos

* Dentro de un **constructor** de una **clase descendiente** se pueden **añadir** de forma explicita los **atributos** y **métodos** de la **clase principal** de la que herede para establecer una serie los valores que queramos de forma predeterminada

```java
/**
 * Clase Concreta Padre
 * 
 * Define una serie de atributos y metodos que podrá heredar la "SubClase Hija"
 * llamada "Clase Hijo"
 *
 */
class Padre {

// Atributos de instancia de clase Padre para almacenar los valores
 public String nombre;
 public String apellidos;
 public int edad;

 /**
  * Constructor por defecto
  */
 public Padre() {
  this.nombre = "Non-Names";
  this.apellidos = "Non-Surnames";
  this.edad = 0;
 }

 /**
  * Constructor parametrizado
  * 
  * @param nombre    - String - Define el nombre del objeto que instanciemos por
  *                  la clase Padre
  * @param apellidos - String - Define los apellidos del objeto que instanciemos
  *                  por la clase Padre
  * @param edad      - int - Define la edad del objeto que instanciemos por la
  *                  clase Padre
  */
 public Padre(String nombre, String apellidos, int edad) {
  this.nombre = nombre;
  this.apellidos = apellidos;
  this.edad = edad;
 }

 /**
  * Procedimiento de instancia
  * 
  * @param apellidos - Establece el valor del atributo apellido
  */
 public void setApellidos(String apellidos) {
  this.apellidos = apellidos;
 }

 /**
  * Metodo de instancia
  * 
  * @return - String - Devuelve el valor del atributo apellido
  */
 public String getApellidos() {
  return apellidos;
 }

 /**
  * Procedimiento de instancia
  * 
  * @param edad - Establece el valor del atributo edad
  */
 public void setEdad(int edad) {
  this.edad = edad;
 }

 /**
  * Metodo de instancia
  * 
  * @return - Devuelve el valor del atributo edad
  */
 public int getEdad() {
  return edad;
 }

 /**
  * Metodo de instancia
  * 
  * @return - Devuelve el valor del atributo nombre
  */
 public String getNombre() {
  return nombre;
 }

 /**
  * Procedimiento de instancia
  * 
  * @param nombre - Establece el valor del atributo nombre
  */
 public void setNombre(String nombre) {
  this.nombre = nombre;
 }

 /**
  * Metodo de instancia
  * 
  * Heredado por la Super Clase Object que muestra los atributos que le pasemos
  * dentro de cuerpo del metodo
  * 
  */
 @Override
 public String toString() {
  return "Nombre: " + getNombre() + " Apellidos: " + getApellidos() + " Edad: " + getEdad();
 }

}

/**
 * Subclase Hijo que hereda todos los atributos y metodos de la clase Padre
 *
 */
class Hijo extends Padre {

// Atributos de instancia de clase Padre para almacenar los valores 
 public double altura;
 public double peso;

 /**
  * Constructor por defecto
  * 
  * Inicaliza todos atributos de la Subclase Hijo
  */
 public Hijo() {
  this.altura = 0.0;
  this.peso = 0.0;
// Hemos invocado de forma explitica mediante la palabra "super" el atributo "apellidos" 
// de la clase Padre para que cuando creamos un objeto de tipo Hijo se le asigne de
// forma automática el valor preestablecido  
  super.apellidos = "Perez Sainz";
 }

 /**
  * Constructor parametrizados
  * 
  * Establecemos mediante argumentos los valores que contendra el objeto de la
  * clase Hijo que instanciemos
  * 
  * @param altura - Establece la altura que tendra los objetos que instanciemos
  *               desde la Subclase Hijo
  * @param peso   - Establece el peso que tendra los objetos que instanciemos
  *               desde la Subclase Hijo
  */
 public Hijo(double altura, double peso) {
  this.altura = altura;
  this.peso = peso;
// Hemos invocado de forma explitica mediante la palabra "super" el atributo "nombre" 
// de la clase Padre para que cuando creamos un objeto de tipo Hijo se le asigne de
// forma automática el valor preestablecido 
  super.nombre = "David";
 }

 /**
  * Constructor parametrizado
  * 
  * Establecemos mediante argumentos los valores que contendra el objeto de la
  * clase Hijo que instanciemos
  * 
  * @param altura
  * @param peso
  * @param nombre
  */
 public Hijo(double altura, double peso, String nombre) {
  this.altura = altura;
  this.peso = peso;
// Podemos utilizar el metodo heredado de la propia clase Padre invocado con la palabra clave "super" para
// establecerle el valor que queramos a los objetos que instanciemos desde la Subclase llamada Clase Hijo
  super.setNombre(nombre);
 }

 /**
  * Metodo de instancia
  * 
  * @return - Devuelve el valor de la altura establecido dentro del objeto
  *         instanciado
  */
 public double getAltura() {
  return altura;
 }

 /**
  * Procedimiento de instancia
  * 
  * @param altura - Establece el valor de la altura que tendra el objeto
  *               instanciado
  */
 public void setAltura(double altura) {
  this.altura = altura;
 }

 /**
  * Metodo de instancia
  * 
  * @return - Devuelve el valor del peso establecido dentro del objeto
  *         instanciado
  */
 public double getPeso() {
  return peso;
 }

 /**
  * Procedimiento de instancia
  * 
  * @param peso - Establece el valor del peso que tendra el objeto instanciado
  */
 public void setPeso(double peso) {
  this.peso = peso;
 }

 /**
  * Metodo de instancia
  * 
  * Creamos un método que invoque explícitamente el atributo de la clase Padre llamado 'edad' mediante la palabra super para así asignarle un valor con el que establecer un nuevo calculo 
  * 
  * @return peso * edad
  */
 public double getPesoPorEdad(){
  // En este caso invocamos el atributo de la Clase Padre para hacer un calculo con otro atributo propio de la Subclase Hijo
  super.edad = 14; // Invocación del directa del atributo edad de la clase Padre
  return peso * edad;
 }

 /**
  * Metodo de instancia
  * 
  * Heredado de la Super Clase Object y modificado explicitamente para mostrar
  * los valores que le hemos ido asignado a todos los objectos que hayamos ido
  * instanciando en nuestro programa
  * 
  */
@Override
	public String toString() {
		return " Nombre: " + super.nombre + " Apellidos: " + super.getApellidos() + " Altura: " + getAltura()
				+ " Peso: " + getPeso() + " Peso Por Edad: " + getPesoPorEdad();
	}
}

/**
 * Clase Concreta para ejecutar el código
 */
public class SuperComoAtributos {

 public static void main(String[] args) {
// Definimos el objeto de la Clase Padre
  Padre padre = new Padre("Juan", "Sainz Vazquez", 43);
// Mostramos los valores que contiene el 
// objeto invocando el metodo sobreescrito toString() de la super Clase Object
  System.out.println(padre.toString());

// Definimos un objeto de la Subclase Hijo   
  Hijo hijoSinParametros = new Hijo();
// Mostramos los valores del objeto de la Clase Hijo utilizando el metodo toString() de la SuperClase Object
  System.out.println(hijoSinParametros.toString());
// Definimos un objeto de la Subclase Hijo el cual internamente tiene definido el atributo "nombre" el cual asigna un valor al objeto de forma automática
  Hijo hijoSegundoConstructorParametrizado = new Hijo(154, 45);
// Mostramos los valores del objeto de la Clase Hijo utilizando el metodo toString() de la SuperClase Object
  System.out.println(hijoSegundoConstructorParametrizado.toString());
// Definimos un objeto de la Subclase Hijo el cual internamente tiene definido el atributo "nombre" mediante la llamada al metodo de la Clase Padre 
// el cual asigna un valor de forma automática al objeto 
  Hijo hijoTercerConstructorParametrizado = new Hijo(145, 39, "Felipe");
// Mostramos los valores del objeto de la Clase Hijo utilizando el metodo toString() de la SuperClase Object
  System.out.println(hijoTercerConstructorParametrizado.toString());
 }
}
```

### Resumen

* La palabra clave ``super`` se usa para invocar de forma remota en el ``constructor`` y metodos de la **SubClase Hija** de la que se herede , en caso de no existir una **Clase Padre**/**Clase Base**/**Clase Principal** de la que se herede , **Java** automáticamente hará que ``super`` herede de la **superclase Object**
