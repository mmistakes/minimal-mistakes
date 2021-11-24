---
layout: single
title: Git - Working Tree & Working Directory 
date: 2021-11-24
classes: wide
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - working tree
  - working directory
tags:
  - git-basico
  - git-manual
  - working tree
  - working directory
---

## Arbol de Trabajo (Working Tree)

* Directorio (Espejo) del __\[Repositorio Local\]__ donde se almacena los archivos y directorios del proyecto.

* Son una copía de los archivos que tiene el __\[Repositorio Local\]__ y que se utilizan para trabajar con ellos sin modificar los archivos originales que se descargaron desde el __\||Repositorio Remoto\||__ y se almacenaron en el __\[Repositorio Local\]__ que es el directorio **.git/** el cual entre todos sus directorios contiene **(BD/Objetos/Snapshot)** que utiliza el proyecto.

Resumen:

> Directorio del proyecto (archivos/carpetas) contiene reflejo del [Repositorio Local]

## Directorio de trabajo (Working Directory)

* Lugar donde se ejecuta el comando ``git status`` para comprobar el estado de los archivos y subdirectorios del proyecto , esta dentro del **(Working Tree)** ; lugar donde se almacenan los archivos que se están ejecutando o utilizando.
