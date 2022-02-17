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

* Mueve el puntero **HEAD** del grafo de **commits** según donde le indiquemos y mantiene los datos que contenía el commit en el **{UnStaged}** hasta que los modifiquemos y lo volvamos a añadir al **grafo de commits** mediante ``git add <archivo>`` o los descartemos del todo mediante el comando ``git restore <archivo>``

  * Si ejecutamos el comando ``git restore <archivo>`` elimina todos los anteriores datos que tuviera registrado el **commit** de anteriores **commits** y solo se mostrará los que tenga en la posición actual en el que se encuentre.

### Funciones básicas  

* **Restaura** a un estado anterior o **Elimina** los cambios dependiendo del ``commit`` que le indiquemos dentro del **árbol de grafos** de ``commits`` dentro del **[Repositorio Local]**

  * Cuando elimina el **commit** que le hemos indicado y también elimina los **commits** que haya por detrás al que le indiquemos

* Extrae los ficheros del **{Staging Area/Staged/Indice/Index}**

  * Revierte el ``git add <archive>``

* Este comando mueve la **rama** y el **commit** según le indique el puntero **[HEAD]**

  * Si **[HEAD]** esta apuntando a la **rama master** y ejecutamos el comando
  
```bash
git checkout <identificador commit anterior>
```

* Hará que la **rama master** apunte al **commit** que le hayamos indicado dentro de su **[Repo.Local]**

* Deshacer los **cambios locales** y de los **commits** trayendo la **última versión** del servidor **GITHUB** y apuntar a la copia local principal

```bash
git reset
```

* Cambia de posición el **[HEAD]** que esta apuntando a un **commit** determinado dentro del **grafo de commits** y se mueve hasta el **commit** que le indiquemos eliminando todos los **commits antecesores** de la rama en la que nos encontremos

```bash
git reset --hard <commit>
```

* Se utiliza para **eliminar** todos los cambios que tenga el **commit** en el que se encuentre el **[HEAD]**

```bash
git reset --hard origin/master
```

* Para mover el puntero **[HEAD]** según el **commit** que le indiquemos , para así extraer sus **ficheros/documentos** del **[Repositorio local]** y enviarlos al estado **{UnStaged}** , una vez en el estado **{Unstaged}** ; los archivos estarán a la espera de ser **modificados** y añadidos al **{Staging Area/Index}** o eliminados mediante el comando ``git restore``

  * Resumen :
    * Mueve el puntero **[HEAD]** y deja el archivo **{UnStaged}** hasta que lo volvamos a añadir mediante ``git add <archivo>`` o eliminemos los cambios definitivamente mediante ``git restore <archivo>``

```bash
git reset <commit>
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
#                 Ancestro
#                    ↓
git reset --soft HEAD~
```

* "Es un paso atrás en el historial de commit"
  * **En caso de error se puede recuperar el commit deshecho**

* Eliminar el antepenúltimo **commit** del **grafo de commits** del **[Repositorio Local]**

```bash
# Elimina el "commit ancestro" que va detrás del último commit dentro del grafo de commits del [Repo.Local] 
git reset --soft HEAD~1 
```

### Opciones de reset

* Restablecer una rama a un commit anterior

```bash
git reset <opciones> <COMMIT>
```

Opciones disponibles al comando anterior

* ``--soft`` : No restablece el fichero **{Index}** o del árbol de trabajo , pero restablece [HEAD] para commit

  * Cambia todos los archivos a "Cambios a ser commited*

* ``--mixed`` : Restablece el **{Index}** pero no el árbol de trabajo e informa de lo que no se ha actualizado

* ``--hard`` : Restablece el ``commit`` , **{Index}** y el ``directorio de trabajo``

  * Cualquier cambio en los archivos rastreados en el árbol de trabajo desde el commit son descartados

* ``--merge`` : Restablece el **{Index}** y actualiza los archivos en el arbol de trabajo que son diferentes entre le commit y HEAD pero mantiene los que son diferentes entre el **{Index}**

* ``--keep`` : Restablece las entradas del **{Index}** , actualiza los archivos en el árbol de trabajo que son diferentes entre ``commit`` y **[HEAD]**

  * Si un archivo que es diferente entre un ``commit`` y el [HEAD] tiene cambios locales , el reinicio se aborta

#### (Directorio de Trabajo/Working Directory)

* Deshace todos los cambios hechos en los archivos desde su **último commit** hasta el **(Working Directory/Workspace)**

```bash
git reset --hard HEAD~
```

* Deja el archivo en su estado original antes de que fuera **modificado** , **agregado** mediante **``git add``** y confirmado con el comando **``git commit``** al historial de **commits**
  
  * Este es el comando más peligroso ya que en caso de error no se podrá recuperar los cambios o commits sobre los archivos**

#### {Staging Area/Staged/Index}

* Deshace los cambios hechos en el archivo desde su **último commit** hasta el **{Unstaged}** lo que significa que deshará los cambios realizados en el archivos después del ``git add``
  
```bash
git reset [--mixed] HEAD~
```

* "Vuelve el archivo al estado antes de hacerle ``git add``"

* **En caso de error se puede recuperar el commit deshecho**
