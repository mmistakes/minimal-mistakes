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
  - git-basico
  - git-comandos
tags:
  - git-branch
  - git-commit
  - git-working directory
---

## Git - commit (confirmar)

### Commit

* Instantánea/Captura **(snapshot)** del estado o modificaciones de los archivos del proyecto que se guardan en el **[Repositorio Local]** a la espera de ser enviados al »Repositorio Remoto« para fusionarse con el resto de archivos del proyecto.

  * Siempre pertenecen a una (rama/branch)
  
  * Los commit pueden restaurarse dentro del [Repositorio Local] para inspeccionarse o reutilizarse

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
