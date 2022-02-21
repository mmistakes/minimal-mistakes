---
layout: single
title: Git - Terminologia básica
date: 2021-11-29
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-terminología
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Git - Terminologia basica

Directorios principales del proyecto

    public: Directorio donde almacenar recursos Web
    bin:    Directorio donde almacenar programas ejecutables
    lib:    Directorio con las librerías de software utilizadas
    test:   Directorio con las pruebas de funcionamiento correcto

*  *  *

* Directorio oculto:  **.git**:
  * Contiene los directorios y archivos más importantes del software del control de versiones entre ellos el grafo de cambios entre las distintas versiones del proyecto

*  *  *

* Fichero **.gitignore**:
  * Indica los ficheros a ignorar cada vez que lanzamos el comando ``git push``

*  *  *

* Issues → **Propuestas**

## Git - Estados

* **Commit** (Confirmado) : Datos están almacenados en la base de datos local

* **Modified** (Modificado) : Has cambiado el contenido del archivo pero todavía no lo has confirmado **(Commit)** en tu base de datos local

* **Staged** (Preparado) : Significa que has marcado un archivo modificado **(Modified)** en su versión actual para que vaya en tu próxima confirmación **(Commit)**

## Git - Secciones

* **(Working Directory - Directorio de TRABAJO)**
  * Es una copia de una versión del proyecto
  * Archivos son sacados de la base de datos comprimida del directorio de GIT y se almacenan en el directorio para ser usados y modificados
    * Ruta : ``/project/``

* **(Staging Area - Area de PREPARACION / INDEX)**
  * Archivo almacenado en el directorio GIT **[Repo.Local]** que almacena información acerca de lo que va ir en tu ``próximo commit``
  * También se llama ``{INDEX}`` pero se esta convirtiendo en estandar llamarlo {Area de Preparación}
    * Ruta : ``/project/.git/index``

* **(Git Directory - Directorio GIT o Repositorio Local)**
  * Donde se almacenan los **metadatos** y la **base de datos** de los objetos del proyecto
  * Parte más importante de GIT porque es donde se copia los archivos cuando clonas un **|Repositorio Remoto|** dentro de tu ordenador
    * Ruta : ``/project/.git/objects``

## Git - Opciones

* **origin** → Representa la URL del **|Repositorio Remoto|** que apunta al proyecto dentro de la plataforma **GITHUB**
  * Se refiere también al **|Repositorio Remoto|** desde donde se clonó.
  * Se utiliza entre otras muchas opciones para sincronizar el **proyecto local** con el proyecto dentro de la **plataforma GITHUB**
    * **origin** ←→ https://github.com/RVSWeb/Blog101

## HEAD - [Repo.Local]

* Es una referencia al ``último commit`` en la rama actualmente comprobada o revisada

## Partes de un [Repo.Local]

### • Commit - (Snapshot) - Instantánea/Captura

![Alt texto](/assets/images/graficos/snapshot-1.jpg "Concepto de Repositorio")

Commit - Instantánea/Captura (Snapshot) de los archivos / directorios

* Cada vez que se ejecuta un ``git commit -m "Mensaje"`` se crea un nuevo circulo **○** que contiene los ultimos cambios que hayamos hecho en el proyecto  

* Son pequeñas versiones de los **(archivos / directorios / subdirectorios)** guardados en el **Repositorio**
  * Un ``commit`` puede restaurarse en el **(Working Directory)** para inspeccionar su contenido o para reutilización de este

### • Branch (Rama) - Apuntador/Puntero

* Una especie de línea de tiempo de los cambios del proyecto a través de los ``git commit -m "Mensajes"``

* Todos los **commits** pertenecen a una rama sea la principal principal , secundaria , alternativa
  * Las secuencias de **commits** siempre están ordenados por la fecha más reciente
  * Los nuevos **commits** se añaden siempre al final de la **rama**

![Alt texto](/assets/images/graficos/commit-rama-repositorio.jpg "Concepto de Repositorio")

Un ejemplo sobre las ``ramas`` que actuan como "Punteros" y los ``commit`` como "Contenedor" de archivos y datos

![Alt texto](/assets/images/graficos/snapshot-2.jpg "Concepto de Repositorio")

Cada vez que realizamos un ``git commit -m "Mensaje"`` se crea un nuevo circulo **○** y el puntero **↑** de la ``rama`` avanza con él

## Git - WorkFlow (flujo de trabajo)

Es el sistema básico que recomienda usar **GIT** sobre como trabajar de forma estandarizada y correcta

![Alt texto](/assets/images/graficos/snapshot-4.jpg "Concepto de Repositorio")

## Working Tree Clean

* Significa que tienes limpio el **(Working Directory)** , ninguno de sus archivos rastreados **(Tracked)** están modificados **{Modified}**, tampoco ve ningún archivo no rastreado **(UnTracked)** aparecería o estaría listado aquí
