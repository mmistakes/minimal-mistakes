---
layout: single
title: Git - Terminología básica
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
page_css: 
  - /assets/css/mi-css.css
---

## Git - Terminología básica

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
  * indica los ficheros a ignorar cada vez que lanzamos el comando ``git push``

*  *  *

## Git - Opciones

* origin → Representa la URL del **«Repositorio Remoto»** que apunta al proyecto dentro de la plataforma **GITHUB**
  * Se utiliza entre otras muchas opciones para sincronizar el __proyecto local__ con el proyecto dentro de la **plataforma GITHUB**
    * origin ←→ https://github.com/RVSWeb/Blog101