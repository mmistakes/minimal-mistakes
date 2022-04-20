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
  - git-comandos
tags:
  - git-basico
  - git-branch
  - git-working directory
---

## Git - commit - (confirmar)

* Genera un **nuevo commit** con el contenido registrado en el **{Indice/Index}**

### Commit

* Instantánea/Captura **(snapshot)** del **estado** o **modificaciones** de los archivos del proyecto que se guardan en el **[Repositorio Local]** a la espera de ser enviados al **Repositorio Remoto** para fusionarse con el resto de archivos del proyecto.

  * Siempre pertenecen a una **(rama/branch)**
  
  * Los **commit** pueden restaurarse dentro del **[Repositorio Local]** para inspeccionarse o reutilizarse

#### Ejemplo

* Guardar un nuevo commit que sera almacenado en el **log del árbol** de **commits** del **Repositorio Remoto** del proyecto y abre un editor para añadirle un mensaje

``git commit -m "mensaje"``

* Guardar un nuevo commit y añadirle un mensaje que sera almacenado en el **log del árbol** de **commits** del repositorio del proyecto

``git commit -m "mensaje"``

* Modifica el **último commit** que haya registrado el **log del árbol** de **commits** además de cambiar el **ID** del **commits**

``git commit --amend -m "..."``
