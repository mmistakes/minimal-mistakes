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

## Clases Intefaces

> Te dicen que hacer pero no como hacerlo

* Son un tipo especial de clase que se usa para implmentar dependiendo de la necesidad un **método** o la invocación de una ``Constantes``

* Contienen una colección de **métodos abstractos** ``sin implementar`` y **propiedades/atributos** ``Constantes`` definidos
  * Se utilizan para indicar que **hacer** pero **no su implementación**

* Las **clases** que hereden de las **intefaces** serán las que implementen la lógica de los **métodos abstractos** que invoquen dentro de ellas
  
  * Recuerda : Las **clases Interfaces** no pueden **crear o instanciar objetos**, sólo pueden implementar las clases las cuales hereden de ellas los métodos mediante el modificador `implements`

* Una utilidad sería disponer de distintas implementaciones de la misma clase de la que herede la interfaz principal

```java
Interface interface = new ClaseImplementaInterface();
```

### Estructura

* Como buena practica deben empezar la **clase interface** con la letra mayúscula **I** y el nombre de la clase que vayamos a usar
  * Ejemplo : **IControlador** , **IConnector** , **IBase** , **IRemote** , **IDataBaseLocal** , **IRoot**

```java
public inteface <NombreInterface> { ... } 
```

#### Ejemplo

```java
public inteface IControlador {

  private static final int ID_CONTROLADOR = 132435;

  int getControlador(); 

  void setControlador(Controlador controlador);

  boolean isControlador(Controlador controlador);
} 
```

> En Resumen
>
> > Se utiliza como previsión de lo que podremos hacer de cara al futuro en nuestra aplicación mediante las clases que hereden de las Interfaces que creamos o invoquemos dentro de ella
