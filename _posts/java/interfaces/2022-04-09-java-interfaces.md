---
layout: single
title: Java - Inteface
date: 2022-04-09
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
  - java-clase
  - java-inteface
page_css: 
  - /assets/css/mi-css.css
---

## Interfaces

> Es un **elemento de tipo abstracto** que te dicen que hacer pero **no como hacerlo**

* Son un tipo **especial de tipo abstracta** que se usa para definir sólo la **"cabecera/protocolo/la forma de cooperar"** de los  **método** o las **constantes** que implementarán las **clases concretas** que las implementen mediante su invocación

* Contienen **métodos ``sin implementar/cabeceras``** y **propiedades/atributos** **``constantes`` bien definidos**
  * Se utilizan para indicar que **hacer** pero **no contienen la implementación en código**

* Las **clases concretas** que implementen las **interfaces** serán las que le añadan el código con la lógica o funcionamiento de los **métodos abstractos** que se invoquen dentro de ellas
  
  * Recuerda : Las **interfaces** no pueden **crear o instanciar objetos**, sólo pueden implementar las **clases concretas** las cuales hereden de ellas los métodos mediante el modificador `implements`

* Una utilidad sería disponer de distintas implementaciones de la misma **clase** de las que herede la **interfaz principal**

* Una **clase** del tipo **abstracta** no tiene límite a la hora de recibir **interfaces**

```java
Interface interface = new ClaseImplementaInterface();
```

### Estructura

* Como buena practica deben empezar la **interface** con la letra mayúscula **I** y el nombre de la clase que vayamos a usar
  * Ejemplo : **IControlador** , **IConnector** , **IBase** , **IRemote** , **IDataBaseLocal** , **IRoot**

```java
public interface <NombreInterface> { ... } 
```

#### Ejemplo

```java
public interface IControlador {

  private static final int ID_CONTROLADOR = 132435;

  int getControlador(); 

  void setControlador(Controlador controlador);

  boolean isControlador(Controlador controlador);
} 
```

### En Resumen

> Se utiliza como previsión de lo que podremos hacer de cara al futuro en nuestra aplicación mediante las clases que hereden de las **Interfaces** que creamos o invoquemos dentro de ella

### Recuerda

* Cuando una clase ``abstracta`` o ``concreta`` implemente una ``interface`` utilizará la palabra clase ``implements``
