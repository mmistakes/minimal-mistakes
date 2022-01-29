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

> Descarta todos los cambios que le hayamos hecho a los archivos dentro del {Staging Area/Index} desde el (Working Directory)

Una función que tiene es :

* Restablece el contenido del archivo que tenía después de ejecutar los comandos "git add" y "git commit"

  * Creamos un archivo y lo añadimos al estado **{Staging Area/Index}** mediante el comando ``git add <archive>``

  * Luego lo confirmamos mediante ``git commit`` para que pase al estado **[Repo.Local]** y desde ese momento el archivo quedara marcado dentro del **historial de commits** con el contenido que tenía en un principio

  * Estando el archivo en el **[Repo.Local]**  modificamos su contenido

  * Si ejecutamos ``git status``; **Git** nos informará que el contenido original del archivo estando en el **[Repo.Local]** y registrado en el **historial de commit** fue cambiado desde el estado **(Working Directory)** y nos dará la opción de restaurarlo a la versión inicial que teniamos de él en el momento que hicimos ``git add`` y ``git commit`` o podremos añadir los nuevos cambios al archivo ejecutando ``git add`` de nuevo

## Usos del comando

### 1º Uso

* ``git restore <archivo>`` → Deshace/Descarta todos los cambios que hayamos hecho dentro del archivo desde el **(Working Directory)** después de ser agregado al **{Staging Area/Index}** mediante el comando ``git add <archivo>``

### 2º Uso

* ``git restore <archivo>`` → Deshace/Descarta todos los cambios que hayamos hechos dentro del archivo desde el **(Working Directory)** después de que el archivo fuera **preparado/agregado** mediante el comando ``git add`` al **{Staging Area/Index}** y fuera añadido al **historial de commits** usando el comando ``git commit``

```git
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed) → Actualiza lo que será 'confirmado'
  (use "git restore <file>..." to discard changes in working directory) → Descarta los cambios dentro (Working Directory)
```

``git restore --staged <archivo>`` →  Despues de crear un archivo , agregarlo al **{Staging Area/Index}** mediante ``git add``, confirmarlo usando ``git commit`` ; si modificamos este archivo nos dará la posibilidad de hacerle ``git restore <archive>`` pero si en vez de eso hacemos de nuevo ``git add`` para agregar los nuevos cambios ; Git nos dará la oportunidad de deshacer esos nuevos cambios una vez más utilizando el comando ``git restore --staged <archive>`` si ejecutamos este comando los sacará del estado **{Staging Area/Index}** y nos dará la posibilidad de realizarle de nuevo un ``git restore <archive>`` para que así el archivo vuelva a tener el contenido original que tenía cuando le hicimos el ``git commit`` por primera vez

> Sacamos el archivo del estado **{Staging Area/Index}** para que vuelva a tener el contenido del **último commit**

* ``git restore --staged <archivo>`` → Se puede utilizar también para sacar un archivo del estado **{Staging Area/Index}** cuando se añade mediante el ``git add``

  * Este comando le indica a **Git** que desmarque el estado de **{Staging Area/Index}** al archivo que se lo indiquemos mediante parametros

```git
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   archive.txt
```

> Ejecutando este comando el archivo saldra del {Staging Area/Index} ; dejara de estar preparado y así podremos restituir a su anterior versión del commit

Esto significa que **Git** coge el archivo y lo devuelve al estado **(Working Directory)** y lo marca como **(Sin Seguimiento/Untracked)** dentro del **[Repositorio]**

### Resumen

* ``git restore <file>`` → Se usa para deshacer los cambios que se realizaron al archivo el cual después de estar almacenado en el **historial de commits** mediante los comandos ``git add`` y ``git commit`` están a la espera de ser enviado al **|Repo.Remoto|**

  * El archivo en el **[HEAD/último commit]** , modificara su contenido desde el **(Working Directory)** del archivo dejandolo en el estado **{Modified}** del **{Staging Area/Index}** y a la espera de volver a añadir los cambios ejecutando otra vez ejecutando el comando ``git add`` o deshaciendolos mediante este comando

```git
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   file.txt

no changes added to commit (use "git add" and/or "git commit -a")
```

* ``git restore --staged <file>`` → Se usa para deshacer los cambios que se hicieron a un archivo después de agregarlo al **{Staging Area/Index}** , añadirlo al **historial de commits** para después modificarlo y volverlo a añadir al **{Staging Area/Index}** ejecutando otra vez el comando ``git add``

```git
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   file.txt
```
