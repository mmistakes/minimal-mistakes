---
layout: single
title: Git - Untracked
date: 2021-12-07
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-untracker
tags:
  - git-basico
  - git-manual
page_css: 
  - /assets/css/mi-css.css
---

## Git Untracked

### (Untracked)

> Un archivo dentro de estado (Untracked) del (Working Directory) se puede modificar tantas veces que se quieran sin tener que ejecutar ningún comando de preparación (git add) o confirmación (git commit)

* Archivos no rastreados **(Untracked)** es cualquier archivo del **(Working Directory)** no se encuentra en en el estado **{Staging Area/Index}** ni en su última instantánea **(snapshot/commit)**

  * Cuando clonas un **[Repositorio]** por primera vez todos sus archivos serán rastreados **(Tracked)** y no modificados **{UnModified}** porque **GIT** acaba de comprobarlos y no has editado ninguno todavía

  * Cuando editas los archivos, **GIT** los ve como modificados **{Modified}**, porque los has cambiado desde su **"confirmación"** o  **último commit**.
  
    * A medida mientras trabajas con ellos , se preparan **{Staged}** selectivamente estos archivos modificados **{Modified}** mediante el comando ``git add`` y luego se confirman ``git commit`` con todos esos cambios preparados dentro del **{Staging Area/INDEX}**

    {% include figure image_path="assets/images/graficos/ciclo-archivo-rastreado.jpg" alt="Sencillo gráfico del sistema de gestión de archivos git" caption="Sencillo gráfico del sistema de gestión de archivos git" %}

* * *

Es un estado donde los archivos están **(Sin Seguimiento / Untracked)** , a la espera de ser agregado ``git add <archive>`` y confirmados ``git commit -m "Mensaje"`` para fusionarlos a los archivos del **Repositorio Remoto**

Para saber GIT si un archivo esta **(Tracked)** o no rastreado **(Untracked)** los compará con los archivos que tiene descargados desde el **Repositorio Remoto** ; si ese archivo no esta entre los archivos **{Modified}** , **{UnModified}** , **{Staged/Preparado}** de su **último snapshot / captura** entonces lo considera **(Untracked)**

```git
Your branch is up-to-date with 'origin/master'. → Encabezado
Untracked files: → Indica que el archivo esta sin seguimiento
(use "git add <file>..." to include in what will be committed) → Instrucciones para agregar los archivos que sera confirmados
```

Significa que **GIT** ve un archivo que no tenía en el último snapshot **(commit)** y que aún no ha sido puesto en el **{Staging Area/INDEX}** , no será incluido en el **commit** hasta que se lo indiques a hacerlo mediante **git add <archivo>** y **git commit -m "Mensaje"**

Ejemplo :

```git
$ echo 'My Project' > README
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
(use "git add <file>..." to include in what will be committed)
README
nothing added to commit but untracked files present (use "git add" to track)
```
