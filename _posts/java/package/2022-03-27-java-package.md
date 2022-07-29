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
  - java-manual
tags:
  - java-package
page_css: 
  - /assets/css/mi-css.css
---

## Package

* Elemento raíz que contiene un proyecto y se crea a partir del nombre completo de la ``URL`` de la empresa cliente o de la desarrolladora en ``orden inverso``

### Ejemplo

* Estructura básica

```java
dominio.empresa.ejemplo
```

* Estructura definida

```java
// Ejemplo 1
com.rvsweb.app.tutorial
// Ejemplo 2
com.cocacola.app.cliente
```

### Definición

* Es un **directorio especial** dentro de los componentes de **Java** que almacena todas las **clases** y demás componentes de un proyecto **Java**

* Si queremos compilar un proyecto que contiene un **package** se tiene hacer desde la **ruta principal** del proyecto

```java
* Proyecto
|___ package
        |____ Clase
```

### Ejecución línea de comandos

* Desde la **línea de comandos** se escribiría el siguiente comando para poder **compilar** el archivo **Java** dentro de un ``package``

```java
javac package/Clase.java
```

* Para ejecutar el programa **Java** que hemos **compilado** se escribiría la siguiente línea

```java
java package.Clase
```