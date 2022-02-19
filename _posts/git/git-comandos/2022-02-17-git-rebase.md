---
layout: single
title: Git - Rebase
date: 2022-02-16
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-rebase
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Git - Rebase

* Este comando que se utiliza para cambiar la **base** de una rama determinada , así permitir la **integración de un commit** en desarrollo con otro **commit** y fusionar sus contenidos una vez solucionados los posibles conflictos entre ambos **commits** mediante un editor de código

  * Cambiar la base de una **rama** permite integrar desarrollos lineales pero **elimina** la **historia** de las **ramas** utilizadas e integradas

  * Se suele utilizar como punto de unión el **último commit** de la **rama** para hacer la fusión de los **commits**

### Ejemplos prácticos

* Eliminar un **commit** especifico y por ende los cambios que se le hicieran a archivo especifico dentro del **grafo de commits** del **[Repositorio Local]**

  * Elegimos un **commit** que se encuentre por debajo del **commit** que nos interese

  * Para este ejemplo eliminaremos el **commit b11da63** el cual tiene un archivo con unos datos específicos que son diferente respecto al **commit** que le sigue

```bash
* 66fe18b (HEAD -> master)(origin/master, origin/HEAD) x^2 button A
* b11da63  x^2 button
| 
|  
* 30bf0aa Readme & License
```

* Ejecutamos el comando para situarnos en el **commit** anterior al que queremos eliminar y deshacer los cambios en el archivo especifico

git rebase -i 30bf0aa

```bash
* 66fe18b (HEAD -> master)(origin/master, origin/HEAD) x^2 button A
* b11da63  x^2 button
|
|  
* 30bf0aa Readme & License # Ahora no encontramos en esta posición dentro del grafo de commits
```

* **GIT** nos pedirá que editemos los **commits** del **grafo de commits** de nuestro **[Repositorio Local]** el cual contiene los archivos que queremos eliminar del **grafo de commits**

  * Para ello accederemos al archivo de configuración del **grafo de commits** utilizando un editor estándar que nos mostrará el comando

  * Dentro de este archivo nos aparecerá la lista de **commit** que componen el **grafo de commits** del **[Repositorio Local]** y una serie de posible opciones a configurar que vendrán descritas por debajo del archivo

```bash
# pick 66fe18b x^2 button A
# pick b11da63 x^2 button # Este commit es el que me interesa eliminar
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

* Tenemos 2 opciones posibles
  * Eliminar el commit que me interesa
  * Añadirle ``drop`` al commit que me interesa

Para este ejemplo que haremos será añadirle ``drop``` al commit que quiero eliminar del grafo de commits

```bash
# pick 66fe18b x^2 button A
# drop b11da63 x^2 button # Este commit es el que me interesa eliminar
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

* Ahora el **commit** ``b11da63 x^2 button`` esta virtualmente eliminado , solo falta confirmarlo dentro del **grafo de commits**

* Añadimos la **nueva versión** del archivo que tenia antes de que fuera modificado mediante la eliminación del **commit** que le indicamos

```bash
git add calculator.html
```

* Ejecutamos el comando ``git rebase --continue`` para que el cambio y la eliminación de **commits** se confirme dentro del **grafo de commits** y se mantenga solo los cambios del archivo del commit ``pick 66fe18b x^2 button A`` dentro de la nueva modificación realizada

```bash
git rebase --continue
```

* Si ejecutamos el comando ``git log --online --graph --decorate`` veremos que el commit ``b11da63  x^2 button`` ha sido eliminado junto con el archivo que tenía las modificaciones

* Ahora tenemos los **commits** con los nuevos cambios que tenía el **último commit** ``66fe18b x^2 button A`` y se ha eliminado el **commit** ``b11da63 x^2 button`` con los cambios que tenían dentro el archivo

```bash
* 80f891b (HEAD -> master) x^2 button A # El cambio ha generado un nuevo commit
* 30bf0aa Readme & License
```
