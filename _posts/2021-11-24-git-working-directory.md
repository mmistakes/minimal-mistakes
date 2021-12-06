---
layout: single
title: Git - Working Directory / Workspace
date: 2021-11-24
classes: wide
toc: true
toc_label: "Tabla de contenido"
toc_icon: "clipboard-list"
header:
  teaser: /assets/images/llama.jpg
categories:
  - git
  - git-working tree
  - git-working directory
tags:
  - git-basico
  - git-manual
---

## Directorio de trabajo (Working Directory/Workspace)

Ruta del directorio

``project/``

* * *

* Cada archivo del **(Working Directory)** puede tener 2 estados :

### {Tracked}

* Archivos rastreados son archivos que están en la última instantánea **(snapshot)** , así como cualquier archivo recientemente preparado **{Staged}** como pueden ser **{Unmodified-No Modificados}**, **{Modified-Sin Modificar}** y **{Staged-Preparados}**

  * En resumen : Los archivos rastreados **{Tracked File}** son los archivos que están dentro del **{Staging Area/Index}**

### (Untracked)

* Cualquier archivo en su **(Working Directory)** que no estuviera en su última instantánea **(snapshot)** y no se encuentra en tu **{Staging Area/Index}**

  * Cuando clonas un **[Repositorio]** por primera vez todos sus archivos serán rastreados **(Tracked)** y no modificados **{UnModified}** , Git los comprobará y no editará ninguno

  * Cuando editas archivos, Git los ve como modificados **{Modified}**, porque los has cambiado desde su **"confirmación"** o  **último commit** ; mientras trabajas , se preparan ``git add`` estos archivos modificados **{Modified}** y luego se confirman ``git commit`` con todos esos cambios preparados dentro del **{Staging Area/INDEX}**

    {% include figure image_path="assets/images/graficos/ciclo-archivo-rastreado.jpg" alt="Sencillo gráfico del sistema de gestión de archivos git" caption="Sencillo gráfico del sistema de gestión de archivos git" %}

* * *

## Working Directory

* Lugar donde se ejecuta el comando ``git status`` para comprobar el estado de los archivos y subdirectorios del proyecto, esta dentro del **(Working Tree)** ; lugar donde se almacenan los archivos que se están ejecutando o utilizando.

## Workspace

Espacio de Trabajo; archivos locales posicionados en una rama

Resumen:

> Es donde están los archivos que editas, los nuevos que añades y los que se eliminan cuando no son necesarios

* * *

> Cualquier cambio en el **(Working Tree)** es anotado por el *{Indice}* → **Fase Temporal** del **{Stage}** (Se mostrará como archivo modificado) después de hacer ``git add <archivo>`` y ``git commit -m "mensaje"`` se pasa al estado *{UnModified}* del **{Staged}**

* * *

> Sí por algún casual se modifica de nuevo el contenido del archivo; este pasará al estado *{Modified}* del **{Staged}** y necesitará volver a realizar otra vez ``git add <archivo>`` para que el archivo se vuelva a confirmar y volver a pasar al estado *{UnModified}* donde los archivos estarán otra vez sin modificar desde el último cambio