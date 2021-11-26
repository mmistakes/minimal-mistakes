---
layout: single
title: Git - Branch (Concepto Ampliado)
date: 2021-11-25
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-branch
tags:
  - git-basico
  - git-manual
  - git-branch
---

## Branch (Rama)

* La rama por defecto se llama **master** y se crea de forma automática por el sistema ``git`` con el primer commit
* Los nuevos commits se añaden al final de la rama
* Los commits de las ramas están ordenados por fecha
* Se pueden crear , eliminar tantas ramas como se necesiten para cada momento

Comando para mostrar las ramas que tiene disponible el proyecto

    git branch 

**Salida:**

    develop
    * master

Crear una nueva rama

    git branch nueva-rama-proyecto

**Salida:**

    develop
    * master
    nueva-rama-proyecto

## Ramas necesarias para un proyecto

* * *

Para ciertos tipos de proyectos existen unas ramas básicas:

* **master** → Rama Principal , predefinida y estandar **(No tocar)**

  * Sobre esta **rama** nunca se trabajará ya que es donde se van a integrar todos los cambios las demas ramas que vayamos haciendo en el proyecto

  * Es la rama de sólo y para **Producción**

  * Lo recomendable a la hora de trabajar con nuestro proyecto es crear una rama a partir de esta rama llamada __master__ como puede ser la rama _developer_ y fusionarle los cambios que sean correcto a la rama __master__ mediante un __pull request__

* **developer** → Rama Secundaria **[Rama Padre : Master]**

  * Creada a partir de la rama **master** en la mayoria de lo casos

  * En la mayoria de los casos tiene las funcionalidades de la aplicación , website , no es aconsejable hacer **commits** desde esta rama, solo para pequeños cambios; ejemplo : Cambiar el texto. 

* **release** → Rama Terciaria **[Rama Padre : Master]**

  * Creada a partir de la rama **master** en la mayoria de lo casos

  * Se utiliza para entregar en __Producción__ , su propósito es habilitar pruebas de clientes con ellas , cuando se terminen las pruebas y estén correctas dichas pruebas se fusionarán con la **rama master**  

* **hotfix** → Rama Terciaria **[Rama Padre : Master]**

  * Creada a partir de la rama **master** en la mayoria de lo casos

  * Esta rama se usa para la solución de incidentes urgentes sobre todo en ambientes de producción que necesitan una rápida respuesta.

* **feature** → Rama Terciaria **[Rama Padre : Developer]**

  * Creada a partir de la rama **developer** en la mayoria de lo casos

  * Es la rama donde se crean nuevas funcionalidades para la aplicación con la que estemos trabajando , una vez terminada y comprobada que funciona correctamente se fusiona con la rama developer y se elimina mediante el comando

    * ``git branch -d <feature>``

  * A la vez pueden existir varias ramas que iremos llamando :

    * **feature 1** o **feature A** o **feature Access-DB** → Todo dependiendo de la necesidad

## Aclaraciones

> Lo comentado en esta sección no es una obligación pero si entra en las buenas prácticas a la hora de gestionar un proyecto de ambito general con __GIT__ y __GITHUB__ además de que es flexible a las necesidades de cada caso o proyecto.

* * *

> Considerarse como unas pautas básicas libres de seguir pero importante a tener en cuenta ya que cada empresa , equipo de desarrollo o ambito profesional tendrán sus propias reglas , estandar de desarrollo y demás condiciones de uso en este ambito del desarrollo de software.
