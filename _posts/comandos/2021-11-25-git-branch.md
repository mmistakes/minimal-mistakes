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

> Representa una especie de línea de tiempo que va marcando los distintos cambios que le vamos haciendo a los archivos del proyecto a través de los ``git add <archive>`` y los ``git commit -m "Mensaje"`` que vamos ejecutando sobre el repositorio principal

* Solo se creará nuestra **primera linea de tiempo funcional** cuando hagamos nuestro **primer commit** la cual estará establecida en la rama ``master`` si no hemos creado una rama distinta y nos hemos cambiado a ella mediante ``git checkout <nombre de la rama>``
  
* Si intentamos cambiarnos de ``rama/branch`` mediante el comando ``git checkout <rama>`` sin que esta ``rama/branch`` exista; nos aparecerá el siguiente mensaje :

> fatal: error: pathspec 'rama-x' did not match any file(s) known to git

Para saber en que ``rama/branch`` nos encontramos podemos ejecutar los comandos :

``git status`` → On branch master

```git
git branch
* master → Indica la rama en la que nos encontramos
  nueva-rama-proyecto
```

* * *

* En esta imagen podemos ver un ejemplo del funcionamiento y desarrollo de las ``ramas``

![Alt texto](/assets/images/graficos/snapshot-3.jpg "Concepto de Repositorio")

* La rama por defecto se llama ``master`` y se crea de forma automática por el sistema ``git`` con el primer ``commit``
* Los nuevos ``commits`` se añaden al final de la rama
* Los ``commits`` de las ramas están ordenados por fecha
* Se pueden ``crear`` , ``eliminar`` tantas ``ramas`` como se necesiten para cada momento

Comando para mostrar las ``ramas`` que tienen disponible el proyecto

``git branch``

**Salida:**

```git
    develop
    * master
```

Crear una nueva ``rama``

```git
git branch nueva-rama-proyecto
```

**Salida:**

```git
develop
* master
nueva-rama-proyecto
```

Eliminar la una nueva rama

```git
git branch -d nueva-rama-proyecto
```

**Salida:**

```git
Deleted branch nueva-rama-proyecto (was 5c2b6a9)
```

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

### Aclaraciones

> Lo comentado en esta sección no es una obligación pero si entra en las buenas prácticas a la hora de gestionar un proyecto de ambito general con **GIT** y **GITHUB** además de que es flexible a las necesidades de cada caso o proyecto.

* * *

> Considerarse como unas pautas básicas libres de seguir pero importante a tener en cuenta ya que cada empresa , equipo de desarrollo o ambito profesional tendrán sus propias reglas , estandar de desarrollo y demás condiciones de uso en este ambito del desarrollo de software.

### Breve Resumen Final (Rama/Branch)

* La rama por defecto es la llamada rama **master** ; se crea de forma automática por el sistema ``git`` pero se configurar para que no sea así

* Los **nuevos commits** se añaden al final del **historial de commits** de la rama en la que nos encontremos trabajando

* Los **commits** de las ramas siempre están ordenados por fecha

* Se pueden crear y eliminar tantas **ramas** como se necesiten para cada momento del desarrollo del proyecto
