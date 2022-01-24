---
layout: single
title: Git - remote
date: 2022-01-20
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-remote
  - git-comandos
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Git - remote

* Se utiliza para

  * Subir al **»Repositorio Remoto«** todos cambios que se han hecho al proyecto desde el **directorio de trabajo (Working Directory)** y que fueron registrado en los **commits** que se fueron creando mediante el comando ``git commit -m "Mensaje"``

  * Sincronizar la rama del **[Repositorio local]** con la rama del **»Repositorio Remoto«**

* Muestra los **»Repositorio Remotos«** definidos en un **[Repositorio Local]**

```git
#         Elemento Opcional
#            ↓
git remote [-v]
```

* Este comando se utiliza para sincronizar un **[Repositorio local]** con otro **»Repositorio Remoto«** dentro de la plataforma **GITHUB**

```git
#             Almacena toda la URL del »Repo.Remoto« para su sincronización
#                ↓
#                ↓
git remote add origin https://github.com/usuario/nombre_repositorio.git
```

* Borra la ``<rama>`` que sincroniza el **[Repositorio Local]** con la rama **»Repositorio Remoto«**

```git
#                 Rama utilizada para sincronización entre 
#                   ↓  **[Repo.Local]** y **»Repo.Remoto«** 
#                   ↓
#                   ↓
#                   ↓
git remote remove <rama>
```

* Ver las ramas locales que están sincronizadas con las **»Ramas Remotas«** y demás datos sobre las ramas **[Remote-Tracking-Branches]**

```bash
git remote show origin
```
