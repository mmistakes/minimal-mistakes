---
layout: single
title: Git - Origin
date: 2022-02-16
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-grafo-de-commits
  - git-grafo
  - git-commits
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---
 
## Git - Origin

* Abreviatura y nombre predeterminado por **GITHUB** para indicar el lugar donde enviar el código al **Repositorio Remoto** para almacenarlo

  * Al clonar un proyecto desde **GITHUB** se crea por defecto dentro del **[Repositorio Local]**

  * Se usa como **referencia** en lugar de la **URL** del **Repositorio Remoto** subido a **GITHUB**

Este nombre se puede cambiar mediante el comando ``git remote set-url``

```bash
# Si ejecutamos este comando nos aparecerá la referencia del nombre con la URL del Repo.Remoto
git remote -v
# Vemos las referencias de la referencia que apunta a la URL del |Repo.Remoto|
#
# (Nombre por Defecto)
#  ↓
#  ↓    URL que apunta al |Repo.Remoto|
#  ↓     ↓                                               (Traer)
origin  https://github.com/Directorio/Nombre-Repositorio (fetch)
#  ↓     ↓                                               (Empujar)
origin  https://github.com/Directorio/Nombre-Repositorio (push)

# Comando para cambiar el nombre por defecto
git remote rename <anterior-nombre> <nuevo-nombre>
# Ejemplo  
git remote rename origin nueva-referencia
# Si ejecutamos el comando para ver las referencias
git remote -v
# Podemos ver el cambio de referencia al repositorio
#  ↓                                                               (Traer)
nueva-referencia  https://github.com/Directorio/Nombre-Repositorio (fetch)
#  ↓                                                               (Empujar)
nueva-referencia  https://github.com/Directorio/Nombre-Repositorio (push)
```  
