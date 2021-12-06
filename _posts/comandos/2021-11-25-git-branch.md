---
layout: single
title: Git - Branch
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
  - git-comandos
tags:
  - git-basico
  - git-manual
---

## Branch (Rama)

> Es una especie de línea de tiempo que va marcando los distintos cambios que le vamos haciendo al proyecto a través de los ``git commit -m "Mensaje"`` que vamos ejecutando sobre él

* Solo se creará nuestra **primera linea de tiempo funcional** cuando hagamos nuestro **primer commit** la cual estará establecida en la rama ``master``
  
* Si intentamos cambiar de ``rama`` mediante el comando ``git checkout <rama>`` nos aparecerá el siguiente mensaje :

> fatal: error: pathspec 'rama-x' did not match any file(s) known to git

Aunque si hacemos un ``git status`` nos dirá en cual ``rama`` estamos situados

* * *

* En esta imagen podemos ver un ejemplo del funcionamiento y desarrollo de las ``ramas``

![Alt texto](/assets/images/graficos/snapshot-3.jpg "Concepto de Repositorio")

* La rama por defecto se llama ``master`` y se crea de forma automática por el sistema ``git`` con el primer ``commit``
* Los nuevos ``commits`` se añaden al final de la rama
* Los ``commits`` de las ramas están ordenados por fecha
* Se pueden ``crear`` , ``eliminar`` tantas ``ramas`` como se necesiten para cada momento

Comando para mostrar las ``ramas`` que tienen disponible el proyecto

    git branch 

**Salida:**

    develop
    * master

Crear una nueva ``rama``

    git branch nueva-rama-proyecto

**Salida:**

    develop
    * master
    nueva-rama-proyecto

## Ramas necesarias para un proyecto

* * *

Para ciertos tipos de proyectos existen unas ``ramas`` básicas:

Como son las ramas típicas : **master** , **feature** , **developer** , **hotfix** , **release** que se puede ir creando dependiendo de las necesidades del proyecto

## Descripción de las Ramas

* **master** → Rama Principal , predefinida y estandar **(No tocar)**

  * Sobre esta **rama** nunca se trabajará ya que es donde se van a integrar todos los cambios las demas ``ramas`` que vayamos haciendo en el proyecto

  * Es la rama de sólo y para **Producción**

  * Lo recomendable a la hora de trabajar con nuestro proyecto es crear una ``rama`` a partir de esta ``rama`` llamada __master__ como puede ser la ``rama developer`` y fusionarle los cambios que sean correcto a la ``rama master`` mediante un ``pull request``

* **developer** → Rama Secundaria **[Rama Padre : Master]**

  * Creada a partir de la rama **master** en la mayoria de lo casos

  * En la mayoria de los casos tiene las funcionalidades de la aplicación , website , no es aconsejable hacer **commits** desde esta rama, solo para pequeños cambios; ejemplo : Cambiar el texto

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

## Ejemplo

![Alt texto](/assets/images/graficos/snapshot-2.jpg "Concepto de Repositorio")

## Aclaraciones

> Lo comentado en esta sección no es una obligación pero si entra en las buenas prácticas a la hora de gestionar un proyecto de ambito general con __GIT__ y __GITHUB__ además de que es flexible a las necesidades de cada caso o proyecto.

* * *

> Considerarse como unas pautas básicas libres de seguir pero importante a tener en cuenta ya que cada empresa , equipo de desarrollo o ambito profesional tendrán sus propias reglas , estandar de desarrollo y demás condiciones de uso en este ambito del desarrollo de software.
