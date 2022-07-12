---
layout: single
title: Librerías
date: 2022-07-11
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/libro/libro.jpg
categories:
  - conceptos
tags:
  - framework
  - librerías
  - libraries
---

## Librerías y Frameworks

* Son herramientas de **desarrollo** que se utilizan para agilizar el trabajo en la codificación de un sistema concreto

* Dependiendo del objetivo que queramos alcanzar se utiliza una herramienta u otra

* Otra gran diferencia definitoria entre una **librería** y un **framework** es la inversión de control lo cual significa

  *  Cuando llamas a una **librería** tienes el ``control de la ejecución`` **(necesitas realizar una acción y la llevas a cabo para conseguir ese fin)**

  *  En el **Framework** , el ``control se invierte`` el **framework** te llama **(cuando el ``framework`` necesite hacer algo dentro de la aplicación te lo pedirá de forma sutil o funcional)**
    * Si no tiene **inversión de control** , no es un **framework**

* Todo el **flujo de control** ya está en el framework y solo hay un montón de elementos predefinidos que puede completar con su código
 
* Una **librería** , por otro lado, es una **colección de funcionalidades** a las que puede llamar cuando quieras en quien parte de tu proyecto

### Librería ( Library )

* Fragmentos de códigos elaborados en su mayoría por terceros y que sirve para solucionar un problema concreto dentro del proyecto mediante operaciones especificas y bien definidas

* Suelen ser la implementación de una **API** la cual contiene el código compilado que ejecuta las funciones y protocolos que la componen

* Su objetivo es de ampliar las funcionalidades del proyecto mediante un código definido , probado , testeado y automatizado

* Las librerías están empaquetadas , son reutilizables y con operaciones independientes

* Se usan para una o varias tareas concretas y son comunes dentro del proyecto que estamos desarrollando

* Tiene un uso muy especifico aunque hay **librerías** que se utilizan de forma general en proyectos porque tienen funcionalidades muy genéricas

* En la mayoría de los casos suelen ser **funciones/métodos** las cuales realizan **tareas repetitivas** y evitan que tengamos que estar creándolas o definiéndolas de forma constante

* Estas funciones se encuentran bien empaquetadas dentro de las librerías las cuales contienen **bloques de código** que les otorga las funcionalidades que necesitamos

* Se suele usar de forma recurrente en el código de nuestro proyecto , llamándola y pasándole los datos que necesitemos

* Ahorra tiempo codificado una determinada acción que necesitamos agregar a nuestro proyecto **"evita reinventar la rueda"**

#### Uso de Librería

* Si tuviéramos que desarrollar un carrito de la compra y estuviéramos repitiendo código para realizar ciertas tareas sería más sencillo crear una librería que ejecutará todas esas tareas repetitivas de una vez
 
 * No necesitamos repetir el código , cada vez que necesites agregar un producto al carrito , ejecutarás esta función

```java
/**
* Le pasamos un objeto (tipo producto) como parametro ( identificador , precio) 
*/
public static void addToCard(Object obj){
  // Implementación para añadir elementos al carrito
}
```

* Sigues desarrollando la funcionalidad del carrito de la compra y realizas una serie de ajustes para que avise al stock de que no hay más productos así que creas una nueva implementación dentro de la misma funcionalidad

```java
/**
* Le pasamos un objeto (tipo producto) como parametro ( identificador , precio) 
*/
public static void addToCard(Object obj){
  // Implementación para añadir elementos al carrito
  // Implementación para validar elementos en el stock → setValidateStock();
}
```

* Nos piden que contabilicemos los productos añadidos al carrito

```java
/**
* Le pasamos un objeto (tipo producto) como parametro ( identificador , precio) 
*/
public static void addToCard(Object obj){
  // Implementación para añadir elementos al carrito
  // Implementación para validar elementos en el stock → setValidateStock();
  // Implementación para contabilizar todos los productos → getAllProducts();
}
```

* Agregamos una nueva funcionalidad para eliminar los productos que se han ido vendiendo del stock

```java
/**
* Le pasamos un objeto (tipo producto) como parametro ( identificador , precio) 
*/
public static void addToCard(Object obj){
  // Implementación para añadir elementos al carrito
  // Implementación para validar elementos en el stock → setValidateStock();
  // Implementación para contabilizar todos los productos → getAllProducts();
  // Implementación para eliminar productos del stock → setProductStock();
}
```

* El ejemplo del carrito de la compra solo nos servirá para este proyecto concreto

* Hemos creado una función que invoca a otras muchas funciones o funcionalidades para realizar unas tareas concretas y bien definidas dentro de nuestro proyecto ( tenemos toda una serie de funcionalidades en un solo lugar )

* Si necesitamos modificar alguna funcionalidad concreta solamente tenemos que llamar a una función interna que necesites usar , sin volver a repetir código o sin tener que desarrollarlo de nuevo

  * Tenemos empaquetadas funcionalidades creando una librería concreta  

### Ejemplos Generales de Librerías

* Protocolos de red, compresión de datos , manipulación de imágenes, utilidades de cadenas de caracteres , evaluación de expresiones regulares,
operaciones matemáticas dentro del código de la aplicación.

### Ejemplos Concretos de Librerías

* ``JQuery`` 
  * Era la librerías más conocida pero desde las nuevas versiones de ``Javascript`` las cuales implementan de forna nativa las funcionalidades que ofrecía esta librería están en desuso

* ``React``
  * Librería que se usa para aplicaciones web como para desarrollo de aplicaciones de dispositivos , escrita y usada en ``Javascript``

* ``Log4j2``
  * Librería de ``Java`` para depurar y testear código en el desarrollo de un software, especialmente en su etapa de producción

### Lo bueno de las librerías

* Pequeñas soluciones que se añaden individualmente conforme se van necesitando en el proyecto

* Son flexibles a la hora de integrarlas a nuestro proyecto y potencialmente más eficientes

* Suele ser código relacionado que se puede intercambiar a voluntad para realizar tareas a nivel de clase

* Se pueden añadir dependiendo de la necesidad , de una en una o varias a la vez **"si lo permite la compatibilidad"**

* Permiten combinarse entre ellas si las especificaciones y la compatibilidad de estas lo aprueban

 * Ejemplo

   *  Necesito una **librería** que me ayude a manejar las fechas (usas la librería de fechas - **Jodatime** de ``Java``)
   
   * Necesito una **librería** que haga **drag and drop** (usas la librería **drag and drop** de ``Javascript``)
   
   * Necesito una **librería** para manejar el ``DOM`` (uso una librería ``DOM`` de ``Javascript``)

### Lo malo de las librerías

* Los desarrolladores necesitan diseñar una arquitectura y crear pruebas antes de la implementación

* Solucionan un problema concreto lo cual el resto de elementos de nuestro proyecto lo tenemos que desarrollar nosotros mismos

* Tienes que ir armando tu proyecto funcionalidad a funcionalidad agregando cada **librería** una a una dependiendo de lo que necesitemos crear

* Necesitas asegurar la compatibilidad entre las **librerías** que vayas añadiendo y además crearte tu propio entorno de trabajo a mano