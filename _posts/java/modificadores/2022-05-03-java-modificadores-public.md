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
  - java-public
tags:
  - java-modificadores
  - java-manual
page_css: 
  - /assets/css/mi-css.css
---

## Modificador - public

* Elementos que se ponen delante de la declaración de un elemento
  * **Clases** , **Objetos** , **Métodos** , **Atributos**

* Modificador ``public``
  * ``Clases``
    * Cada fichero ``.java`` solo puede tener una **clase pública**
    * Se aplica tanto a **clases** como a **miembros** de la propia **clase**
    * Todas las **clases públicas** estarán disponibles en todo el **paquete** del proyecto
  * ``Atributos de Instancia y Clase``
    * Permite que los **atributos/estados** de una clase sean accesible desde la ``propia clase``
      * También permite que otras ``Clases Hijas`` mediante la **herencia** de la ``Clase Padre``  puedan usarlas mediante el modificador ``extends``
        * Evitar siempre crear **Atributos de Instancia** o de **Clase** con el identificador ``public`` , usar el modificador ``private`` para acceder a ellos mediante los métodos de ``instancia`` o de ``clase`` que serán privados

### Herencia

* Los métodos declarados como ``public`` en la **clase Padre** deben ser también ``public`` en todas las **clases Hijas** o subclases descendientes

### Ejemplo de Código

```java
 /**
  * Clase Pública
  * 
  * Permite que se puedan acceder a ella desde dentro o fuera del
  * "package/paquete"  
  * 
 */
 public class Ejemplo {

  /**
   * Variables de Instancia - Evitar poner el modificador "public"  
   *
   * Preferible usar el modificador "private" para evitar la modificación directamente desde las variables
   */
  public int x;

  /**
   * Variables de Instancia - Evitar poner el modificador "public" 
   * 
   * Preferible usar el modificador "private" para evitar modificación directamente desde las variables
   */
  public int y;

  /**
   * Constructor publico
   * 
   * Para que puedan instanciar objetos desde la misma clase o desde otra clase que la herede o la invoque mediante la importación
   * 
   */
  public Ejemplo() {
   this.x = 0;
   this.y = 0;
  }

  /**
   * Constructor publico parametrizado
   * 
   * Para que puedan instanciar objetos desde la misma clase u otra clase que la herede o la invoque mediante la importación de su "package/paquete"
   * 
   * @param x
   * @param y
   */
  public Ejemplo(int x, int y) {
   this.x = x;
   this.y = y;
  }

  /**
   * Procedimiento de Instancia
   * 
   * Modificador public
   * 
   * Para que se pueda usar en cualquier objeto que se instancie su propia clase
   * 
   * Permite modificar el valor de las "variables de instancia" mediante métodos público invocados desde los objetos instanciados de la propia clase 
   * Este modificador protege las "variables de instancia" de modificaciones erróneas y respetando el principio de "Encapsulamiento"
   * 
   * 
   * @param x
   */
  public void setX(int x) {
   this.x = x;
  }

  /**
   * Método de Instancia
   * 
   * public → Para que se pueda usar en cualquier objeto que instancie su propia
   * clase
   * 
   * @return - int x
   */
  public int getX() {
   return x;
  }

  /**
   * Procedimiento de Instancia
   * 
   * public → Para que se pueda usar en cualquier objeto que instancie su propia
   * clase
   * 
   * @param y
   */
  public void setY(int y) {
   this.y = y;
  }

  /**
   * Método de Instancia
   * 
   * public → Para que se pueda usar en cualquier objeto que instancie su propia
   * clase
   * 
   * @return y
   */
  public int getY() {
   return y;
  }
 }
}
```
