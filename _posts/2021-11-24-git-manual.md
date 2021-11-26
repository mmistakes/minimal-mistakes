---
layout: single
title: Git - Configuración Básica
date: 2021-11-24
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
tags:
  - git-basico
  - git-manual
---

## Git Manual Básico

`git init` : Parametro `init` inicializa el directorio actual para poder trabajar con **Git**

`git init --help` : Equivale a git help init y muestra toda la ayuda al comando git `init`

## Consultar el valor de todas las opciones configuradas

Configurar usuario y correo para subir cambios al repositorio principal

`git config --global user.name "usuario"`

`git config --global user.email "email@example.com"`

## Mostrar el usuario configurado por terminal

`git config --list`

    user.name=usuario
    user.email=email@example.com
    color.ui=true

## Consultar el valor de forma individual del usuario

`git config user.name` -> Usuario establecido

`git config user.email` -> Correo establecido
