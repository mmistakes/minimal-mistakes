---
layout: single
title: Git - Clone
date: 2021-12-8
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-clone
  - git-comandos
tags:
  - git-basico
  - git-manual
---

## Git - Clone

* Se utiliza para descargarse una copia completa del proyecto , datos del servidor e historial que esté almacenado libremente en el **Repositorio** de GITHUB

``git clone https://github.com/RVSWeb/Blog101.git`` → Este comando nos descarga todo el proyecto en el directorio actual donde lo ejecutemos

* Si queremos crear un directorio concreto donde almacenar el proyectos , solamente tenemos que añadir al comando el nombre del directorio donde se almacenará todo el contenido del proyecto

``git clone https://github.com/RVSWeb/Blog101.git`` **mi-nuevo-proyecto**

* Cuando clonas 1º vez todos los archivos estarán **{Tracked/Rastreados}** y **{Unmodified/No Modificados}** porque **GIT** los acaba de comprobar y no has editado nada sobre ellos

---

* También se puede clonar proyectos que se encuentra en el directorio de trabajo de sistema operativo

```bash
git clone <ruta completa hasta el directorio del proyecto git>
```

* Ejemplo

```bash
git clone /home/usuario/Documents/proyectos-git/repositorio
```
