---
layout: single
title: Git - Archive
date: 2022-03-16
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-archive
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Git Archive

* Crear un archivo comprimido del tipo que sea con los elementos que le indiquemos de una rama o toda la rama en si usando un comando de **Git**

* Ejemplo

```bash
# Crear un fichero ``gzip`` con el contenido de la rama master
#           Nombre de la rama que queremos comprimir 
#             ↓        
#             ↓      Tipo de compresor    
#             ↓        ↓        
#             ↓        ↓    Nombre del archivo comprimido    
#             ↓        ↓        ↓
git archive master | gzip > nombre.tgz
```

* Podemos añadirle un ``prefijo`` a todos los archivos que vayamos comprimiendo para identificarlos mejor

```bash
# Prefijo que se le añadirá a todos los ficheros que se vayan comprimiendo
#                       ↓
git archive master --prefix='proyecto' | gzip > nombre.tgz
```

* Elegir el formato de compresión usando la opción ``--format``

```bash
# Prefijo que se le añadirá a todos los ficheros que se vayan comprimiendo
#                       ↓
git archive master --prefix='proyecto' --format=zip > nombre.zip
```
