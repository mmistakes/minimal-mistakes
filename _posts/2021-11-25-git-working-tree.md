---
layout: single
title: Git - Working Tree 
date: 2021-11-25
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-working tree
  - git-working directory
tags:
  - git-basico
  - git-manual
---

## Arbol de Trabajo (Working Tree)

* Los archivos descargados desde el **[Repositorio Local]** y que no han sido modificados o alterados desde su origen se encuentra en el estado **Untracked** esperando a ser modificados o eliminados.  

* **(Working Tree)** es como un directorio **(Espejo)** del **[Repositorio Local]** donde se almacena los archivos y directorios con los que vamos a trabajar.

* Este directorio copia los archivos que tiene el **[Repositorio Local]** y que se utilizan para trabajar con ellos sin modificar los archivos originales que se descargaron desde el **«Repositorio Remoto»** y se almacenaron en el directorio del **[Repositorio Local]** que es el directorio **.git/** el cual entre todos sus directorios contiene **(BD/Objetos/Snapshot)** que utiliza el proyecto para poder utilizarse.

Resumen:

> Directorio del proyecto (archivos/carpetas) contiene reflejo del [Repositorio Local]

* * *

* Directorio donde se crean las versiones del proyecto : codigo fuente, datos , archivos del proyecto y etc.

* **(Workspace)** : Se le conoce como **Working Directory** o **espacio de trabajo**

* **(Codebase)** : Conocido como **base de codigo** el cual es una colección completa de _código fuente_ usada para construir una aplicación o componente particular

* Los archivos descargados desde el **[Repositorio Local]** y que no han sido modificados o alterados desde su origen se encuentra en el estado **Untracked** esperando a ser modificados o eliminados.  

* **(Working Tree)** es como un directorio **(Espejo)** del **[Repositorio Local]** donde se almacena los archivos y directorios con los que vamos a trabajar.

* Este directorio copia los archivos que tiene el **[Repositorio Local]** y que se utilizan para trabajar con ellos sin modificar los archivos originales que se descargaron desde el **«Repositorio Remoto»** y se almacenaron en el directorio del **[Repositorio Local]** que es el directorio **.git/** el cual entre todos sus directorios contiene **(BD/Objetos/Snapshot)** que utiliza el proyecto para poder utilizarse.

Resumen:

> Directorio del proyecto (archivos/carpetas) contiene reflejo del [Repositorio Local]

* * *

Datos Ampliados:

* **Codebase**

        El codebase de un proyecto esta típicamente almacenado en un repositorio de control de fuentes.

        Un repositorio del código fuente es un lugar en donde son guardadas grandes cantidades de código fuente, tanto públicamente como privada. 
        
        Son frecuentemente usados por proyectos de multi-desarrolladores para manejar, de una manera organizada, varias versiones y los conflictos que se presentan con los desarrolladores sometiendo modificaciones conflictivas. 
        
        Subversion y Mercurial son herramientas populares usadas para manejar este flujo de trabajo, y son comunes en proyectos de fuente abierta.
