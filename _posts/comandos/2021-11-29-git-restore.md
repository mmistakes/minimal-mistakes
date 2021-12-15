---
layout: single
title: Git - Restore
date: 2021-11-29
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-restore
  - git-comandos
tags:
  - git-basico
  - git-manual
---

## Git - restore

> Descarta todos los cambios que le hayamos hecho a los archivos dentro del (Working Directory)

Restablece el contenido del archivo que tenía después de ejecutar los comandos "git add" y "git commit"

* Creamos un archivo y lo añadimos al estado **{Staging Area/Index}** mediante el comando ``git add <archive>``

* Luego lo confirmamos mediante ``git commit`` para que pase al estado **[Repo.Local]** y desde ese momento el archivo quedara marcado dentro del **historial de commits** con el contenido que tenía de un principio

* Estando el archivo en el **[Repo.Local]** esperando a ser enviado al **»Repo.Remoto«** modificamos su contenido interno

* Si ejecutamos ``git status``; **Git** nos informará que el contenido original del archivo estando en el **[Repo.Local]** y registrado en el historial de commit fue cambiado desde el estado **(Working Directory)** y nos dará la opción de restaurarlo a la versión inicial que teniamos de él en el momento que hicimos ``git add`` y ``git commit`` o podremos añadir los nuevos cambios al archivo ejecutando ``git add`` de nuevo

<!-- Descarta los cambios que se hicieron en los archivos cuando se enviaron al **{Staging Area/Index}** mediante ``git add <archive>`` y ``git commit -m "Mensaje"`` para almacenarlos de nuevo en el **(Working Directory)** con el contenido que tenía el archivo de un principio antes de ejecutar los comandos anteriores -->

## Posible usos del comando

* ``git restore <archivo>`` → Deshace/Descarta todos los cambios hechos dentro del archivo desde el **(Working Directory)** después de ser agregado al **{Staging Area/Index}** mediante el comando ``git add <archivo>``

* ``git restore <archivo>`` → Deshace/Descarta todos los cambios hechos dentro del archivo desde el **(Working Directory)** después de que el archivo fuera agregado y confirmado mediante ``git add`` y ``git commit``

```git
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
```

* ``git restore --staged <archivo>`` → Deshace los cambios del archivo dentro del estado **{Staging Area/Index}** pero no los cambios de los archivos dentro del **{Working Directory}** del **último commit**

  * Tambien se usa para indicarle a **Git** que desmarque el estado de **{Staging Area/Index}** al archivo que se lo indiquemos

```git
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   archive.txt
```

> Ejecutando esto el archivo deja de estar preparado {Staging Area/Index}

Significa que **Git** coge el archivo y lo devuelve al estado **(Working Directory)** y lo marca como **(Sin Seguimiento/Untracked)** dentro del **[Repositorio]**
