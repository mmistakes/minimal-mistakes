---
layout: single
title: Git - Reset
date: 2021-12-1
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-reset
  - git-comandos
tags:
  - git-basico
  - git-manual
---

## Git - reset

* Extrae los ficheros del {Indice/Index}
  * Reinvierte el ``git add <archive>``

* Este comando mueve la **rama** según le indique el puntero **[HEAD]**

  * Si **[HEAD]** esta apuntando a la **rama master** y ejecutamos el comando ``git reset <identificador commit anterior>`` hará que la **rama master** apunte al **commit** que le hayamos indicado dentro de su **[Repo.Local]**

* Deshacer los **cambios locales** y los **commits** trayendo la última versión del servidor **GITHUB** y apuntar a la copia local principal

  ``git reset --hard origin/master``

> `git reset` → Se utiliza para deshacer cambios

* `git reset` → Extrae los ficheros del **{Staging Area/Index}** al __(WorkSpace/Working Directory)__

* `git reset <archivo>` → Extrae el ``<archivo>`` de **{Staging Area/Index}** para enviarlo al estado **(Working Directory)**

* `git reset .` → Extrae del **{Staging Area/Index}** todos los ficheros para enviarlo al estado **(Working Directory)**

Dependiendo de los argumentos que le añadamos puede afectar al :

* [Arbol de Commit / Commit Tree (HEAD)]

  * ``git reset --soft HEAD~`` → Deshace el **último commit** posicionando la rama actual y con el [HEAD] en el commit anterior a este modificando la versión de los archivo que pudiera tener.

    * "Es un paso atrás en el historial de commit"

    * **En caso de error se puede recuperar el commit deshecho**

* {Staging Area/Index}

  * ``git reset [--mixed] HEAD~`` → Deshace los cambios hechos en el archivo desde su **último commit** hasta el **{Unstaged}** lo que significa que deshará los cambios realizados en el archivos después del ``git add``

    * "Vuelve el archivo al estado antes de hacerle ``git add``"

    * **En caso de error se puede recuperar el commit deshecho**

* (Directorio de Trabajo / Working Directory)
  * ``git reset --hard HEAD~`` → Deshace todos los cambios hechos en los archivos desde su **último commit** hasta el **(Working Directory/Workspace)**

    * Deja el archivo en su estado original antes de que fuera **modificado** , **agregado** mediante **``git add``** y confirmado con el comando **``git commit``** al historial de **commits**

    * **Este es el comando más peligroso ya que en caso de error no se podrá recuperar los cambios o commits sobre los archivos**
