---
layout: single
title: Git - Bisect
date: 2022-03-16
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-bisect
tags:
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## GIT Bisect

* Comando que se usa para realizar una **búsqueda binaria ordenada** dentro del **historial de commits** para ir descartando los **commits** y descubrir que **commit** contiene el **archivo** o el **código** que hace que la aplicación o programa funcione mal o de forma incorrecta

<!-- * Este **comando** se usa para **buscar** dentro del **historial de commits** un **commit** en el cual tiene una **modificación** de código o un archivo que produce un error y hace que el programa no funcione correctamente como hacía antes de que se introdujera ese commit con el código o archivo erróneo -->

* Para empezar con la **búsqueda binaria** tenemos que ejecutar el comando de inicio

```bash
git bisect start  
```

* Ahora tendremos que indicarle al comando ``git bisect`` un **commit especifico** donde se produjo el **1º error** que sirva como **punto de partida** en la **búsqueda binaria** la cual podamos ir navegando por los **commits** tanto hacía arriba como hacía abajo en el **historial de commits**
  
  * Dependiendo de los **archivos** o **códigos** que nos vaya mostrando el **comando** tenemos que ir comprobar los archivos para encontrar el **error** o el **archivo erroneo** para arreglarlo

```bash
git bisect bad <commit>
```

* Indicamos también en que **commit** la aplicación funcionaba para acotar la **búsqueda de errores** , si el **commit** correcto por debajo del error , el comando empezar a buscar desde el **commit** con el error hacia abajo hasta llegar al **commit** bueno referenciado por ``good``

```bash
git bisect good <commit>
```

* Delimitados todos los **commits** desde ese rango y empieza a preguntarnos si el **commit** en el que estamos es bueno ``good`` o malo ``bad``

  * Si el código que posee el **commit** en el que estamos da error al ejecutarlo el código entonces es un commit malo ``bad``

```bash
git bisect bad
```

* Iremos revisando **commits** y marcándolos como malos **bad** mediante las comprobaciones de su **código** hasta que lleguemos al **commit** que el código que posea haga que la aplicación o el programa funcione correctamente
  * En ese punto  escribiremos

```bash
#Nos mostrará el código correcto
git bisect good 
```

* La idea de este comando es ir comprobando cada **commit** con **código** hasta que el **código** o los **archivos** que poseen pasen de dar **error** a una **ejecución correcta**

* Cuando encontremos el **código** que funcione después del **error** entonces ese **código** será el **commit correcto** y el **anterior commit** será el que tenía el **problema o el error** el cual tendremos que corregir

* Terminada la **búsqueda** ejecutamos el siguiente **comando** para salir el sistema de búsqueda del **comando** ``git bisect``

```bash
git bisect reset
```
