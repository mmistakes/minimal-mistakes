---
layout: single
title: Git - Working Tree & Working Directory 
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
  - git-working tree
  - git-working directory
---

## Arbol de Trabajo (Working Tree)

* Los archivos descargados desde el **\[Repositorio Local\]** y que no han sido modificados o alterados desde su origen se encuentra en el estado **Untracked** esperando a ser modificados o eliminados.  

* **(Working Tree)** es como un directorio **(Espejo)** del **\[Repositorio Local\]** donde se almacena los archivos y directorios con los que vamos a trabajar.

* Este directorio copía los archivos que tiene el __\[Repositorio Local\]__ y que se utilizan para trabajar con ellos sin modificar los archivos originales que se descargaron desde el __\|Repositorio Remoto\|__ y se almacenaron en el directorio del __\[Repositorio Local\]__ que es el directorio **.git/** el cual entre todos sus directorios contiene **(BD/Objetos/Snapshot)** que utiliza el proyecto para poder utilizarse.

Resumen:

> Directorio del proyecto (archivos/carpetas) contiene reflejo del [Repositorio Local]

## Directorio de trabajo (Working Directory)

* Lugar donde se ejecuta el comando ``git status`` para comprobar el estado de los archivos y subdirectorios del proyecto, esta dentro del **(Working Tree)** ; lugar donde se almacenan los archivos que se están ejecutando o utilizando.

Resumen:

> Es donde están los archivos que editas, los nuevos que añades y los que se eliminan cuando no son necesarios

* * *

> Cualquier cambio en el **(Working Tree)** es anotado por el *{Indice}* → **Fase Temporal** del **{Stage}** (Se mostrará como archivo modificado) después de hacer ``git add <archivo>`` y ``git commit -m "mensaje"`` se pasa al estado *{UnModified}* del **{Staged}**

* * *

> Sí por algún casual se modifica de nuevo el contenido del archivo; este pasará al estado *{Modified}* del **{Staged}** y necesitará volver a realizar otra vez ``git add <archivo>`` para que el archivo se vuelva a confirmar y volver a pasar al estado *{UnModified}* donde los archivos estarán otra vez sin modificar desde el último cambio