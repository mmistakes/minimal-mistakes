---
layout: single
title: Java - Package
date: 2022-03-27
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-package
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Package

* Es un directorio especial dentro de los componentes de **Java** que almacena todas las **clases** y demás elementos importantes de un proyecto **Java**

* Si queremos compilar un proyecto que contiene un **package** se tiene hacer desde la ruta principal del proyecto

```java
* Proyecto
|___ package
        |____ Clase
```

* Desde la **línea de comandos** se escribiría el siguiente comando para poder **compilar** el archivo **Java** dentro de un ``package``

```java
javac package/Clase.java
```

* Para ejecutar el programa **Java** que hemos **compilado** se escribiría la siguiente línea

```java
java package.Clase
```
