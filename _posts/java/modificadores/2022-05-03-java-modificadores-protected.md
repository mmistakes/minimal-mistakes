---
layout: single
title: Java - Modificadores
date: 2022-05-03
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-protected
tags:
  - java-modificadores
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Modificador - protected

* Modificador ``protected``
  * Se aplica a :
    * **Atributos** de **clase** o de **instancia**
    * **Métodos** de **clase** o de **instancia**
  * Un atributo con el modificador ``protected`` solo es accesible desde
    * Desde la **clase** de su **paquete/package** y desde las **subclases** este en el mismo **paquete/package** o no
  * Suelen ser útiles para hacer **pruebas Unitarias**

### Herencia

* Métodos declarados como ``protected`` en la **clase Padre** podrán ser ``protected`` o ``public`` en las **clases Hijas** o **subclases** pero no podrán tener el modificador ``private``

### Ejemplo de Código

```java
/**
* Si declaramos un método, propiedad o constructor con la 
* palabra clave  protected, podemos acceder a los miembros de la clase desde 
* el mismo paquete (al igual que los modificadores de acceso "private/privado" del "package/paquete") 
* y además desde todas las "Subclases" de su clase, incluso 
* si se encuentran en otros "package/paquete"
*/ 
public class ModificadorProtected {

 /**
  * Atributo de instancia
  * 
  * Modificador protected
  * 
  * Accesible desde las clases de su "package/paquete" 
  * y de sus subclase "Clases Hijas" 
  * (estén o no en el mismo package/paquete)
  */
 protected String nombre;

 /**
  * Constructor por defecto
  * 
  * Modificador protected
  * 
  * Accesible desde las clases de su "package/paquete" 
  * y de sus subclase "Clases Hijas" 
  * (estén o no en el mismo package/paquete)
  * 
  */
 protected ModificadorProtected() {
  this.nombre = null;
 }

 /**
  * Constructor parametrizado
  * 
  * Modificador protected
  * 
  * Accesible desde las clases de su "package/paquete" 
  * y de sus subclase "Clases Hijas" 
  * (estén o no en el mismo package/paquete)
  * 
  * @param nombre
  */
 protected ModificadorProtected(String nombre) {
  this.nombre = nombre;
 }

 /**
  * Método de instancia
  * 
  * Modificador protected
  * 
  * Accesible desde las clases de su "package/paquete" 
  * y de sus subclases "Clases Hijas" 
  * (estén o no en el mismo package/paquete)
  * 
  * @return nombre
  */
 protected String getNombre() {
  return nombre;
 }

 /**
  * Procedimiento de instancia
  * 
  * Modificador protected
  * 
  * Accesible desde las clases de su "package/paquete" 
  * y de sus subclases "Clases Hijas" 
  * (estén o no en el mismo package/paquete)
  * 
  * @param nombre
  */
 protected void setNombre(String nombre) {
  this.nombre = nombre;
   }
  }
}
```
