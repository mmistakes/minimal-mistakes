---
layout: single
title: Java - Override
date: 2022-04-28
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-herencia
  - java-override
tags:
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Anotación - @Override

* Su significado real de esta palabra al español sería
  * ``anular invalidar cancelar desactivar escuchar``

* Aunque muchos tutoriales , manuales y libros indican que la anotación **@Override** significa ``Sobrescritura``

### Función

* Se utiliza para ``reescribir/sobrescribir`` los métodos que heredamos de una **Super Clase** , **Clase Padre** , **Clase Base** dentro de una Clase Hija que extienda dicha clase

### Ejemplo de @Override

* Aquí vemos como heredamos el **método toString** de la ``Super Clase Object`` de la librería de Java y nos indica que podemos modificar su funcionamiento para que se ajustes a nuestras necesidades mediante la anotación ``@Override``

```java
 @Override
 public String toString() {
  // TODO Auto-generated method stub
  return super.toString();
 }
```
