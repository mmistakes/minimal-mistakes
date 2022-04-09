---
layout: single
title: Java - Inteface
date: 2022-03-23
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-inteface
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Java - Inteface

* Son un tipo especial de clase que se usa para implmentar dependiendo de la necesidad un **método** o la invocación de una ``Constantes``

* Contienen una colección de **métodos abstractos** ``sin implementar`` y **propiedades/atributos** ``Constantes`` definidos
  * Se utilizan para indicar que **hacer** pero **no su implementación**

* Las **clases** que hereden de las **intefaces** serán las que implementen la lógica de los **métodos abstractos** que invoquen dentro de ellas

* Una utilidad sería disponer de distintas implementaciones de la misma clase de la que herede la interfaz principal

* Estructura
  * Como buena practica deben empezar la **clase interface** con la letra mayúscula I y el nombre de la clase que vayamos a usar 
    * Ejemplo : IControlador , IConnector , IBase , IRemote , IDataBaseLocal , IRoot 

```java
public inteface <NombreInterface> { ... } 
```

* Ejemplo

```java
public inteface IControlador {
} 
```


