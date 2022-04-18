---
layout: single
title: Java - Objeto
date: 2022-04-14
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-clase
  - java-objeto
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Clase - Objeto

* Todos los **objetos** heredan de la **clase Object**

* Es un **tipo de variable** que apunta a una **dirección de memoria** especifica asignada por el operador ``new``

* Cuando creamos un **nuevo objeto** se reserva **espacio en memoria** para ese **objeto**

* Apunta al **constructor** de la **clase** lo que está ``instanciando/creando``

* Almacena el valor recibido por parte del **constructor** en el caso de que lo tengas asignados

* Se utiliza para invocar los **métodos** que contenta la **clase** a la que este apuntando

### Sintaxis

```java
//   
//   Tipo de dato especifico
//    ↓
//    ↓   Variable que apunta a una dirección de memoria
//    ↓    ↓
//    ↓    ↓   Reserva espacio en la memoria para el objeto que se va a crear (HEAP)
//    ↓    ↓    ↓
//    ↓    ↓    ↓    Constructor : Método especial que crea el objeto 
//    ↓    ↓    ↓     ↓           (Mediante el método instanciado invocamos sus métodos)
//    ↓    ↓    ↓     ↓
//    ↓    ↓    ↓     ↓
    Coche c1 = new Coche();
//         ↓             ↑
//         ↓             ↑
//         → → APUNTA → →   
//               AL
//           CONSTRUCTOR
// 
```
