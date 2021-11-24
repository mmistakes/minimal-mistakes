---
layout: single
title: Git Commit & Branch - Conceptos Básicos
date: 2021-11-24
classes: wide
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - commit
  - branch
  - working directory
tags:
  - git-basico
  - git-manual
  - git-commit
  - git-branch
---

## Commit (Confirmar​)

* Instantánea/Captura (snapshot) de todos los archivos en el momento de ejecutar el comando
* Siempre pertenecen a una rama (branch) predeterminada

Ejemplo:

    git commit -m "mensaje"

El Mensaje que sera almacenado en el log del árbol de commit del repositorio del proyecto

## Branch (Rama)

* La rama por defecto se llama **master** y se crea de forma automática por el sistema ``git`` con el primer commit
* Los nuevos commits se añaden al final de la rama
* Los commits de las ramas están ordenados por fecha
* Se pueden crear , eliminar tantas ramas como se necesiten

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
















































































