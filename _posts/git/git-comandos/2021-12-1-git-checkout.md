---
layout: single
title: Git - Checkout
date: 2021-12-1
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-checkout
  - git-comandos
tags:
  - git-basico
  - git-manual
---

## Git - checkout

* **Switch branches or restore working tree files**
  * Cambiar de rama o restaurar archivos de **(árbol de trabajo-working tree files)**

> Todo los cambios que hagamos sobre un archivo que esta **{Tracked/Rastreado}** se realizan desde el **(Working Directory)**

* Elimina los cambios de ``<file>`` que pasan de **{Modified}** a **{Unmodified}**
  * Los cambios que se hagan en **{Modified}** cuando se ejecute este comando se perderán

``git checkout <file>``

* Elimina los cambios de todos los ficheros **{Modified}** desde el estado **(Working Directory)** que pasan a **{Unmodified}** dentro del **{Staging Area/Index}**

``git checkout .``

Cambia **[HEAD]** en si mismo de lugar al que apunta

Reemplazar los cambios locales

* Reemplaza los cambios del **(Working Directory/wd)** con el último contenido del **[HEAD]** , los cambios que ya han sido agregados al **{Staging Area/Index}** como los nuevos archivos , se mantendrán sin cambios

```bash
            flag = Parecida a las opciones pero no posee argumentos en si mismo
              ↓    Actúan como valores boolean (true / false) 
              ↓    Al añadirlo se activa o se desactivan cierta acciones del 
              ↓    comando (por defecto : false) 
              ↓    Ej: --verbose, --output , -name , -c
              ↓    
git checkout -- <archivo>
```
