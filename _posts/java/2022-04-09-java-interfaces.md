---
layout: single
title: Java - Clase Inteface
date: 2022-04-09
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-clase
  - java-inteface
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Clases Interfaces

> La **clase** te dicen que hacer pero **no como hacerlo**

* Son un tipo **especial de clase** que se usa para definir sólo la cabecera de los  **método** o las ``constantes`` que implementarán las **clases** que las invoque

* Contienen **métodos** ``sin implementar`` y **propiedades/atributos** ``constantes`` bien definidos
  * Se utilizan para indicar que **hacer** pero **no su implementación**

* Las **clases** que implementen de las **interfaces** serán las que le den la lógica o funcionamiento de los **métodos abstractos** que se invoquen dentro de ellas
  
  * Recuerda : Las **clases interfaces** no pueden **crear o instanciar objetos**, sólo pueden implementar las clases las cuales hereden de ellas los métodos mediante el modificador `implements`

* Una utilidad sería disponer de distintas implementaciones de la misma **clase** de las que herede la **interfaz principal**

* Una **clase normal** como **abstracta** no tiene límite a la hora de recibir **clases interfaces**

```java
Interface interface = new ClaseImplementaInterface();
```

### Estructura

* Como buena practica deben empezar la **clase interface** con la letra mayúscula **I** y el nombre de la clase que vayamos a usar
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

>
> > Se utiliza como previsión de lo que podremos hacer de cara al futuro en nuestra aplicación mediante las clases que hereden de las Interfaces que creamos o invoquemos dentro de ella

### Recuerda

* Cuando una clase ``abstracta`` o ``normal`` implemente una ``interface`` utilizará la palabra clase ``implements``
