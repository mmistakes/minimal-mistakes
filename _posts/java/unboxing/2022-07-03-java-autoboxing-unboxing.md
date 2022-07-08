---
layout: single
title: Java - AutoBoxing & UnBoxing
date: 2022-07-08
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
  - java-AutoBoxing
  - java-UnBoxing
page_css: 
  - /assets/css/mi-css.css
---

## AutoBoxing & UnBoxing

* Conversión de valores del **tipo primitivos** a **objetos** cuando utilizamos estructuras de datos como core-colecciones

```java
public class Autoboxing {
 /**
  * Muestra una lista de objetos de tipo númericos usando la interface List y se
  * implementa con la <p>clase ArrayList</p>
  */
 public static void showListSinAutoboxing() {
// List → Interface (Collections) - Colección ordenada
  List<Integer> lista = new ArrayList<Integer>();
// Recorre una 4 veces
  for (int i = 0; i < 5; i++) {
// Formato antiguo de conversion de valores
// Había que convertir el tipo primitivo al tipo objeto
   lista.add(Integer.valueOf(i));
  }
 }

 /**
  * Muestra una lista de objetos de tipo númericos usando la interface List y se
  * implementa con la <p>clase ArrayList</p>
  */
 public static void showListConAutoboxing() {
  // List → Interface (Collections) - Colección ordenada
  List<Integer> lista = new ArrayList<Integer>();
//Recorre una 4 veces
  for (int i = 0; i < 5; i++) {
// Formato Autoboxing de conversion de valores - El compilador hace la conversión
// Directamente se convierte el tipo primitivo a objeto sin usar el casteo/casting 
   lista.add(i);
  }
 }
```

### Autoboxing 

* No hace falta llamar a un metodo de la ``clase Wrapper`` para hacer la conversión de **objeto** a **tipo primitivo**

```java
		List<Integer> lista = new ArrayList<>();
		for (int i = 0; i < 5; i++) {
			System.out.println("Conversion lista.add : " + lista.add(i) + " i " + i);
		}
// "-- AutoBoxing : No hace falta llamar a un metodo de la clase Wrapper para hacer la conversión de objeto a tipo primitivo --"
		int res = 0;
		for (Integer i : lista) {
			res += i;
			System.out.println("i " + i + " Acumulado: " + res);
		}


```

### UnBoxing

* Necesita de un metodo de la ``clase Wrapper`` para poder operar con el **tipo primitivo** desde un objeto

```java
		List<Integer> lista = new ArrayList<>();
		for (int i = 0; i < 5; i++) {
			System.out.println("Conversion lista.add : " + lista.add(i) + " i " + i);
		}
// "-- UnBoxing : Necesita de un metodo de la clase Wrapper para poder operar con el tipo primitivo --"
		int res1 = 0;
		for (Integer i : lista) {
// intValue() o doubleValue()			
			res1 += i.intValue();
			System.out.println("i " + i + " Acumulado: " + res1);
		}
```