---
layout: single
title: Git - Commit & Branch (Conceptos Básicos)
date: 2021-11-24
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-commit
  - git-branch
  - git-working directory
tags:
  - git-basico
  - git-manual
  - git-commit
  - git-branch
---

## Commit (Confirmar​)

* Instantánea/Captura (snapshot) de todos los archivos o ficheros de un proyecto guardado en un respositorio en el momento de ejecutar el propio comando
* Siempre pertenecen a una rama (branch) predeterminada
* Los commit pueden restaurarse dentro del directorio del proyecto para inspeccionarse o reutilizarse

Ejemplo:

    git commit -m "mensaje"

El Mensaje que sera almacenado en el log del árbol de commit del repositorio del proyecto

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
