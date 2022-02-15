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

* **Rehace** o **Elimina** los cambios dependiendo del ``commit`` que le indiquemos dentro del **árbol de grafos** de ``commits`` dentro del **[Repositorio Local]**

  * Elimina el commit que le indiquemos y también los commits que haya por delante al que le indiquemos 

* Extrae los ficheros del **{Staging Area/Staged/Indice/Index}**

  * Revierte el ``git add <archive>``

* Este comando mueve la **rama** y el **commit** según le indique el puntero **[HEAD]**

  * Si **[HEAD]** esta apuntando a la **rama master** y ejecutamos el comando
  
```bash
git reset <identificador commit anterior>
```

* Hará que la **rama master** apunte al **commit** que le hayamos indicado dentro de su **[Repo.Local]**

* Deshacer los **cambios locales** y de los **commits** trayendo la **última versión** del servidor **GITHUB** y apuntar a la copia local principal

```bash
git reset
```

* Se utiliza para deshacer cambios sobre archivo

```bash
git reset --hard origin/master
```

* Extrae los ficheros del **{Staging Area/Index}** al **(WorkSpace/Working Directory)**

```bash
git reset
```

* Extrae el ``<archivo>`` de **{Staging Area/Index}** para enviarlo al estado **(Working Directory)**

```bash
git reset <archivo>
```

* Extrae del **{Staging Area/Index}** todos los ficheros para enviarlo al estado **(Working Directory)**

```bash
git reset .
```

* Extraer archivos del **{Staging Area/Staged/Index}** para enviarlos de nuevo al **(Working Directory)**
  * Los cambios que has hecho seguirán en el archivo , el comando solo saca los archivos del **{Staging Area/Staged/Index}**

```bash
git reset HEAD <archivos>
```

Dependiendo de los argumentos que le añadamos puede afectar al :

* **[Árbol de Commit / Commit Tree (HEAD)]**

  * Deshace el **último commit** posicionando la rama actual y con el **[HEAD]** en el commit anterior a este modificando la versión de los archivo que pudiera tener.

```bash
git reset --soft HEAD~
```

* "Es un paso atrás en el historial de commit"
  * **En caso de error se puede recuperar el commit deshecho**

### Opciones de reset

* Restablecer una rama a un commit anterior

```bash
git reset <opciones> <COMMIT>
```

Podemos añadirle las siguientes opciones al comando anterior

* --soft : No restablece el fichero **{Index}** o del árbol de trabajo , pero restablece [HEAD] para commit

  * Cambia todos los archivos a "Cambios a ser commited*

* --mixed : Restablece el **{Index}** pero no el árbol de trabajo e informa de lo que no se ha actualizado

* --hard : Restablece el ``commit`` , **{Index}** y el ``directorio de trabajo``

  * Cualquier cambio en los archivos rastreados en el árbol de trabajo desde el commit son descartados

* --merge : Restablece el **{Index}** y actualiza los archivos en el arbol de trabajo que son diferentes entre le commit y HEAD pero mantiene los que son diferentes entre el **{Index}**

* --keep : Restablece las entradas del **{Index}** , actualiza los archivos en el árbol de trabajo que son diferentes entre ``commit`` y **[HEAD]**

  * Si un archivo que es diferente entre un ``commit`` y el [HEAD] tiene cambios locales , el reinicio se aborta

**(Directorio de Trabajo / Working Directory)**

* Deshace todos los cambios hechos en los archivos desde su **último commit** hasta el **(Working Directory/Workspace)**

```bash
git reset --hard HEAD~
```

* Deja el archivo en su estado original antes de que fuera **modificado** , **agregado** mediante **``git add``** y confirmado con el comando **``git commit``** al historial de **commits**
  
  * Este es el comando más peligroso ya que en caso de error no se podrá recuperar los cambios o commits sobre los archivos**

**{Staging Area/Staged/Index}**

* Deshace los cambios hechos en el archivo desde su **último commit** hasta el **{Unstaged}** lo que significa que deshará los cambios realizados en el archivos después del ``git add``
  
```bash
git reset [--mixed] HEAD~
```

* "Vuelve el archivo al estado antes de hacerle ``git add``"

* **En caso de error se puede recuperar el commit deshecho**
