---
layout: single
title: Java - Tablas Hash
date: 2022-04-17
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-manual
  - java-clase
tags:
  - java-HashSet
  - java-HashMap
  - java-HashTable
  - java-tablas-hash
page_css: 
  - /assets/css/mi-css.css
---

## Tablas Hash

* Son una estructuras de datos que asocian **claves/keys** con **valores/values**

* Se implementada con una lista estática de tamaño fijo → ``array`` junto a listas enlazadas ``LinkedList`` cuando se requieran

* Una **lista enlazadas** ``LinkedList`` es una **lista construida** mediante **enlaces** entre sus elementos , siendo mucho más flexible que un **array**

* La **clave** con el **valor** es una **tupla** y sera la que colocaremos en una **tabla**
  * El **criterio** de **colocación** sera el resultado de aplicar la **función hash** sobre la clave
  