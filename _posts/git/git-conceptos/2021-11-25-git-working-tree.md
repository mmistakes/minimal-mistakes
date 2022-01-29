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

* Es la zona o sección donde se almacenan los nuevos archivos creados o añadidos al **[Repositorio Local]** del proyecto **GIT** , se encuentra en el estado **(Untracked)** esperando a ser agregados al **{Staging Area/Preparados}** mediante el comando ``git add`` y pasar del estado **(Untracked/Sin Rastrear)** al estado **{Tracked/Rastreado}** de la zona **{Staging Area/Preparados}**

  * Si eliminas un archivo **(Untracked/Sin Rastrear)** del **[Repositorio Local]** no lo registrará a diferencia de un archivo que si estuviera **{Tracked/Rastrear}**

* Cuando añadimos o creamos un archivo al [Repo.Local] y hacemos ``git add`` el archivo pasa del estado **(Working Tree)** al **{Staging Area}**  

* **(Working Tree)** es como un directorio **(Espejo)** del **[Repositorio Local]** donde se almacena todos los archivos y directorios con los que vamos a trabajar pero cuyo contenido esta **(Untracked/Sin Rastrear)** y están a la espera de ser rastreado **{Tracked/Rastreado}** mediante el comando ``git add <archive>``

* Este **sección o area** copia los archivos que tiene el **[Repositorio Local]** y los utilizan para trabajar con ellos sin modificar los archivos originales que se descargaron desde el **|Repositorio Remoto|** y se almacenaron en el directorio del **[Repositorio Local]** que esta dentro del directorio **.git/** el cual entre todos sus directorios contiene **(BD/Objetos/Snapshot)** que utiliza el proyecto para poder utilizarse.

Resumen:

> Directorio del proyecto (archivos/carpetas) contiene reflejo del [Repositorio Local]

* * *

* Directorio donde se crean o modifican las versiones de los archivos que va a tener el proyecto : codigo fuente, datos , archivos del proyecto y etc.

* **(Workspace)** : Como una especie area o sección donde están los archivos replicados del **[Repo.Local]**

* **(Codebase)** : Conocido como **base de codigo** el cual es una colección completa de _código fuente_ usada para construir una aplicación o componente particular

* Los archivos descargados desde el **[Repositorio Local]** y que no han sido modificados o alterados desde su origen se encuentra en el estado o area de **(Untracked)** esperando a ser modificados o eliminados.  

* Este directorio copia los archivos que tiene el **[Repositorio Local]** y que se utilizan para trabajar con ellos sin modificar los archivos originales que se descargaron desde el **|Repositorio Remoto|** y se almacenaron en el directorio del **[Repositorio Local]** que es el directorio **.git/** el cual entre todos sus directorios contiene **(BD/Objetos/Snapshot)** que utiliza el proyecto para poder utilizarse.

Resumen:

> Working Tree es una especie de area donde se almacenan los nuevos archivos (Untracked/Sin Rastrear)  esperando a ser {Tracked/Rastreados} por GIT

* * *

Datos Ampliados:

* **Codebase**

El codebase de un proyecto esta típicamente almacenado en un repositorio de control de fuentes.

Un repositorio del código fuente es un lugar en donde son guardadas grandes cantidades de código fuente, tanto públicamente como privada.

Son frecuentemente usados por proyectos de multi-desarrolladores para manejar, de una manera organizada, varias versiones y los conflictos que se presentan con los desarrolladores sometiendo modificaciones conflictivas.