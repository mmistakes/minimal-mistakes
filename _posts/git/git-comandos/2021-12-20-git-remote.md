---
layout: single
title: Git - Remote
date: 2021-12-20
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

  * Permite asociar un identificador a una **URL**

  * Subir al **Repositorio Remoto** todos cambios que se han hecho al proyecto desde el **directorio de trabajo (Working Directory)** y que fueron registrado en los **commits** que se fueron creando mediante el comando ``git commit -m "Mensaje"``

  * Sincronizar la rama del **[Repositorio local]** con la rama del **Repositorio Remoto**

* Muestra los **Repositorio Remoto** definidos en un **[Repositorio Local]**

```bash
#         Elemento Opcional
#            ↓
git remote [-v]
```

* Este comando se utiliza para sincronizar un **[Repositorio local]** con otro **Repositorio Remoto** dentro de la plataforma **GITHUB**

  * Por regla general se llamará ``origin`` pero se puede añadir cualquier otro nombre

```bash
#             Almacena toda la URL del **|Repo.Remoto|** para su sincronización
#                ↓
#                ↓
git remote add origin https://github.com/usuario/nombre_repositorio.git
#             Otro nombre
                 ↓
git remote add teamone https://github.com/usuario/nombre_repositorio.git
```

* Renombrar una referencia **remota** desde el **Repositorio Remoto**

```bash
git remote rename <nombre-remote> <nuevo-nombre-remote>
# Ejemplo
git remote rename rama-antigua rama-nueva
```

* Actualizar la información de las ramas remotas almacenadas en el **Repositorio Remoto**

```bash
git remote update
```

* Borra la ``<rama>`` que sincroniza el **[Repositorio Local]** con la rama **Repositorio Remoto**

```bash
#                 Rama utilizada para sincronización entre 
#                   ↓  **[Repo.Local]** y **Repositorio Remoto**
#                   ↓
git remote remove <rama>
```

* Otra forma de borrar una ``<rama>`` que se sincroniza con otra rama del **Repositorio Remoto** es mediante el argumento ``rm``

```bash
git remote rm <rama>
```

* Para poder ver las **[Ramas Locales]** que están sincronizadas con las **Repositorio Remoto** y demás datos sobre las ramas **[Remote-Tracking-Branches]**

```bash
git remote show origin
```

* Eliminar las **ramas remotas** dentro del **[Repo.Local]**

```bash
git push --delete <nombre-referencia> <nombre-rama-remota>
```

* Eliminar las **ramas remotas** dentro del **[Repo.Local]**
  * Ejemplo básico

```bash
git branch --all
  develop
* feature-a
  master
  remotes/origin/feature-a
  remotes/origin/master

# Para eliminar la rama remota "feature-a"  

git push --delete origin feature-a
```

* Eliminar las ramas que ya no existen en el |Repo.Remote|

```bash
git remote prune <rama>
```
