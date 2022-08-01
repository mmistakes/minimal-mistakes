---
layout: single
title: Java - Depuración con Eclipse
date: 2022-07-28
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/java/logo-java-2.jpg
categories:
  - java
  - java-manual
  - java-basico
  - java-eclipse
tags:
  - java-clase
  - java-depuración
page_css: 
  - /assets/css/mi-css.css
---

## Depuración con Eclipse

* Botón : ``Debug <nombre de la clase>``

![](/assets/images/depuracion_imagenes/Depuracion_Debug_Basico.png)

* Ejecuta el modo depuración del IDE Eclipse

  * Botón ``F5`` : **Step Into**  

![](/assets/images/depuracion_imagenes/Depuracion_F5_Step_Into.png)

* **Entra** en el **elemento actual** el cual se este **ejecutando** dentro del **depurador**
  * Puede ser un **método** , una **expresión** , una **clase** , un **array**, etc.

* Botón ``F6`` : **Step Over**

![](/assets/images/depuracion_imagenes/Depuracion_F6_Step_Over.png)

* **Avanza una línea** dentro del **código** que tengamos escrito dentro del programa
  * ``Salta la pausa producida por el Debug y continua con la siguiente línea``

* Botón ``F8`` : **Resume** 

![](/assets/images/depuracion_imagenes/Depuracion_F6_Step_Over.png)

* **Salta** al **siguiente punto de interrupción - ``breakpoint``**  ejecutando todas las líneas de código que se encuentre hasta llegar al siguiente **punto de interrupción - ``breakpoint``** del programa

* Botón ``Ctrl + Alt + B`` : **Skip All BreakPoint** 

![](/assets/images/depuracion_imagenes/Eliminar_todos_los_puntos.png)

* Salta todos los puntos de interrupción ``breakpoint`` , mantiene la pausa realizada por el depurador pero si pulsamos ``F8`` : **Resumen** ejecuta el programa de forma automáticamente hasta su fin

  * Si vuelves a pulsar el botón : **Skip All BreakPoint** o el atajo de teclado ``Ctrl + Alt + B`` se vuelve a activar los **puntos de interrupción → ``breakpoint``**

### Secciones del Depurador

* **Panel de Variables**
  * Contiene todas las **variables** que hemos ido declarando en nuestro programa , su inicialización en los espacios internos de la memoria ya sean del **tipo objeto** o del **tipo primitivo** que estemos usando en nuestro programa

```java
Name        Value
args        String[0] (id=Numero gestionado por la memoria)
```

### Punto de Interrupción ``Breakpoint`` Condicionales

* Esta **opción** hará detener la **ejecución** de su programa en un **puntos de interrupción → ``breakpoint``** el cual necesitara del cumplimiento de una ``condición - Conditional`` que le hayamos indicado en el panel de opciones de las **herramientas de depuración** para que continue con su ejecución

* Los ``condicionales - Conditional`` que le hemos añadido a los **puntos de interrupción → ``breakpoint``** siempre se ejecutaran en el **tiempo de depuración** cuando las **variables** del **tipo primitivo** u **objetos** que componen el programa valgan lo mismo que lo que le hayamos indicado en los ``condicionales``
  
* **Si la condición** añadida **no vale** lo que le hemos indicado en sus **parámetros** , ese **punto de interrupción no se ejecutará** en el **tiempo de depuración**

  * Una vez detenido el programa en el **punto de interrupción → ``breakpoint``**  podemos reanudar la **ejecución** pulsando las siguientes opciones :

    * Botón ``F8`` : **Resume**
  
    * Botón ``F6`` : **Step Over → Pasar Por Encima**

### Expresiones

* Es un fragmento de **código de programación** que se utiliza para comprobar
  
  * Que **valor** puede tomar una **variable**

  * Que **posición** puede tomar dentro de un **array**
  
  * Que **condición** puede tomar una **estructura condicional**

* Dentro del **panel de depuración** viene definido por la frase
  
  * ``Add new expression``

    * Añadimos una expresión del tipo ``num_array[7]`` al valor de la sentencia de nuestro código cuando ocurra dentro del programa
      * Comprobamos si esa expresión se ejecuta alguna vez en ese programa
